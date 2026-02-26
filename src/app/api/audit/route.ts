import { NextRequest, NextResponse } from "next/server";
import { exec } from "child_process";
import path from "path";

export async function POST(req: NextRequest) {
    try {
        const { url } = await req.json();

        if (!url) {
            return NextResponse.json({ error: "URL is required" }, { status: 400 });
        }

        // Path to the python script
        const scriptPath = path.join(process.cwd(), "scripts", "agency_tools.py");

        return new Promise((resolve) => {
            exec(`python "${scriptPath}" ${url}`, (error, stdout, stderr) => {
                if (error) {
                    console.error(`exec error: ${error}`);
                    resolve(NextResponse.json({ error: "Failed to run audit script" }, { status: 500 }));
                    return;
                }

                console.log(`stdout: ${stdout}`);
                console.error(`stderr: ${stderr}`);

                // The script saves to Supabase and results/ dir. 
                // We can just return success and let the dashboard refresh.
                resolve(NextResponse.json({ message: "Audit started", output: stdout }));
            });
        });

    } catch (error) {
        console.error("API Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
