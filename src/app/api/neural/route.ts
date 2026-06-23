import { NextRequest } from "next/server";
import { spawn } from "child_process";
import path from "path";
import fs from "fs";

// URLs: allow http/https with standard domain/path characters
const SAFE_URL = /^https?:\/\/[a-zA-Z0-9\-._~:/?#[\]@!$&'()*+,;=%]+$/;

function sanitizeUrl(value: string): string | null {
    const trimmed = value.trim().slice(0, 500);
    return SAFE_URL.test(trimmed) ? trimmed : null;
}

export async function POST(req: NextRequest) {
    try {
        const { url } = await req.json();

        if (!url) {
            return new Response("URL is required", { status: 400 });
        }

        const safeUrl = sanitizeUrl(url);
        if (!safeUrl) {
            return new Response("Invalid URL format", { status: 400 });
        }

        const scriptPath = path.join(process.cwd(), "scripts", "neural_research.py");
        const pythonExe = process.platform === "win32"
            ? path.join(process.cwd(), "notebooklm-venv", "Scripts", "python.exe")
            : "python";

        const stream = new ReadableStream({
            start(controller) {
                const actualExe = fs.existsSync(pythonExe) ? pythonExe : 'python';
                const pythonProcess = spawn(actualExe, [scriptPath, safeUrl]);

                pythonProcess.stdout.on('data', (data) => {
                    controller.enqueue(data);
                });

                // Log stderr server-side only — never expose to client
                pythonProcess.stderr.on('data', (data) => {
                    console.error(`[neural stderr]: ${data}`);
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
