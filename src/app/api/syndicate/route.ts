import { NextRequest, NextResponse } from "next/server";
import { exec } from "child_process";
import path from "path";
import fs from "fs";

export async function POST(req: NextRequest): Promise<NextResponse> {
    try {
        const { businessName, industry, url } = await req.json();

        if (!businessName || !industry) {
            return NextResponse.json({ error: "Business name and industry are required" }, { status: 400 });
        }

        const scriptPath = path.join(process.cwd(), "notebooklm_syndicate.py");

        // Platform-safe Python path (matches neural/route.ts pattern)
        const pythonExe = process.platform === "win32"
            ? path.join(process.cwd(), "notebooklm-venv", "Scripts", "python.exe")
            : "python";

        const actualExe = fs.existsSync(pythonExe) ? pythonExe : "python";
        const command = `"${actualExe}" "${scriptPath}" "${businessName}" "${industry}" "${url || ""}"`;

        console.log(`Running Syndicate Engine: ${command}`);

        return new Promise<NextResponse>((resolve) => {
            exec(command, (error, stdout, stderr) => {
                if (error) {
                    console.error(`Syndicate Engine Error: ${error}`);
                    resolve(NextResponse.json({ error: "Failed to run Syndicate Research Engine", details: stderr }, { status: 500 }));
                    return;
                }

                console.log(`Syndicate Engine Output: ${stdout}`);

                const resultMatch = stdout.match(/\[FILE\] Report File: (.*)/);
                const reportPath = resultMatch ? resultMatch[1].trim() : null;

                resolve(NextResponse.json({
                    message: "Syndicate Research Complete",
                    reportPath: reportPath,
                    output: stdout
                }));
            });
        });

    } catch (error) {
        console.error("Syndicate API Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}