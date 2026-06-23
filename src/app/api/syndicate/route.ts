import { NextRequest, NextResponse } from "next/server";
import { execFile } from "child_process";
import path from "path";
import fs from "fs";

// Allowed characters: letters, numbers, spaces, hyphens, ampersands, apostrophes, periods, commas
const SAFE_INPUT = /^[a-zA-Z0-9 \-&'.,/]+$/;

function sanitize(value: string, maxLen = 100): string | null {
    const trimmed = value.trim().slice(0, maxLen);
    return SAFE_INPUT.test(trimmed) ? trimmed : null;
}

export async function POST(req: NextRequest): Promise<NextResponse> {
    try {
        const { businessName, industry, url } = await req.json();

        if (!businessName || !industry) {
            return NextResponse.json({ error: "Business name and industry are required" }, { status: 400 });
        }

        // Sanitize all user inputs — reject anything with shell-special characters
        const safeName = sanitize(businessName);
        const safeIndustry = sanitize(industry);
        const safeUrl = url ? sanitize(url, 200) : "";

        if (!safeName || !safeIndustry) {
            return NextResponse.json({ error: "Invalid characters in input" }, { status: 400 });
        }

        const scriptPath = path.join(process.cwd(), "notebooklm_syndicate.py");

        const pythonExe = process.platform === "win32"
            ? path.join(process.cwd(), "notebooklm-venv", "Scripts", "python.exe")
            : "python";

        const actualExe = fs.existsSync(pythonExe) ? pythonExe : "python";

        // execFile passes args as an array — never interpolated into a shell string
        const args = [scriptPath, safeName, safeIndustry, safeUrl ?? ""];

        console.log(`Running Syndicate Engine: ${actualExe}`, args);

        return new Promise<NextResponse>((resolve) => {
            execFile(actualExe, args, (error, stdout, stderr) => {
                if (error) {
                    console.error(`Syndicate Engine Error: ${error}`);
                    resolve(NextResponse.json({ error: "Failed to run Syndicate Research Engine" }, { status: 500 }));
                    return;
                }

                const resultMatch = stdout.match(/\[FILE\] Report File: (.*)/);
                const reportPath = resultMatch ? resultMatch[1].trim() : null;

                resolve(NextResponse.json({
                    message: "Syndicate Research Complete",
                    reportPath,
                    output: stdout
                }));
            });
        });

    } catch (error) {
        console.error("Syndicate API Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}