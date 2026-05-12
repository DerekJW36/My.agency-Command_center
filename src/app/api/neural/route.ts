import { NextRequest } from "next/server";
import { spawn } from "child_process";
import path from "path";
import fs from "fs";

export async function POST(req: NextRequest) {
    try {
        const { url } = await req.json();

        if (!url) {
            return new Response("URL is required", { status: 400 });
        }

        const scriptPath = path.join(process.cwd(), "scripts", "neural_research.py");
        // Securely use the dedicated virtual environment if it exists
        const pythonExe = process.platform === "win32"
            ? path.join(process.cwd(), "notebooklm-venv", "Scripts", "python.exe")
            : "python";

        const stream = new ReadableStream({
            start(controller) {
                const actualExe = fs.existsSync(pythonExe) ? pythonExe : 'python';
                const pythonProcess = spawn(actualExe, [scriptPath, url]);

                pythonProcess.stdout.on('data', (data) => {
                    controller.enqueue(data);
                });

                pythonProcess.stderr.on('data', (data) => {
                    controller.enqueue(data);
                });

                pythonProcess.on('close', (code) => {
                    controller.enqueue(new TextEncoder().encode(`\n[NEURAL LINK TERMINATED WITH CODE ${code}]`));
                    controller.close();
                });

                pythonProcess.on('error', (err) => {
                    controller.enqueue(new TextEncoder().encode(`\n[NEURAL LINK ERROR: ${err.message}]`));
                    controller.close();
                });
            }
        });

        return new Response(stream, {
            headers: {
                "Content-Type": "text/plain",
                "Cache-Control": "no-cache",
                "Connection": "keep-alive",
            },
        });
    } catch (error) {
        console.error("API Error:", error);
        return new Response("Internal Server Error", { status: 500 });
    }
}
