import { NextRequest } from "next/server";
import { spawn } from "child_process";
import path from "path";

// Allowlist: letters, numbers, spaces, hyphens, commas, periods, ampersands
const SAFE_INPUT = /^[a-zA-Z0-9 \-,.'&]+$/;

function sanitize(value: string, maxLen = 100): string | null {
    const trimmed = value.trim().slice(0, maxLen);
    return SAFE_INPUT.test(trimmed) ? trimmed : null;
}

export async function POST(req: NextRequest) {
    try {
        const { niche, location } = await req.json();

        if (!niche || !location) {
            return new Response("Niche and Location are required", { status: 400 });
        }

        const safeNiche = sanitize(niche);
        const safeLocation = sanitize(location);

        if (!safeNiche || !safeLocation) {
            return new Response("Invalid characters in input", { status: 400 });
        }

        const scriptPath = path.join(process.cwd(), "scripts", "lead_gen.py");

        const stream = new ReadableStream({
            start(controller) {
                const pythonProcess = spawn('python', [scriptPath, safeNiche, safeLocation]);

                pythonProcess.stdout.on('data', (data) => {
                    controller.enqueue(data);
                });

                // Log stderr server-side only — never expose to client
                pythonProcess.stderr.on('data', (data) => {
                    console.error(`[lead_gen stderr]: ${data}`);
                });

                pythonProcess.on('close', (code) => {
                    controller.enqueue(new TextEncoder().encode(`\n[PROCESS EXITED WITH CODE ${code}]`));
                    controller.close();
                });

                pythonProcess.on('error', (err) => {
                    controller.enqueue(new TextEncoder().encode(`\n[PROCESS ERROR: ${err.message}]`));
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
