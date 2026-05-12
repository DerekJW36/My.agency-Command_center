import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const file = searchParams.get("file");

    if (!file) {
        return NextResponse.json({ error: "File parameter is required" }, { status: 400 });
    }

    // Security: Only allow files from the results directory
    // The path from the script is likely absolute or relative to the script
    // We'll try to find it in the 'results' folder of the project root
    const resultsDir = path.join(process.cwd(), "results");
    const fileName = path.basename(file);
    const filePath = path.join(resultsDir, fileName);

    if (!fs.existsSync(filePath)) {
        // Try the sibling results folder (from earlier run)
        const siblingResultsDir = path.join(process.cwd(), "..", "results");
        const siblingPath = path.join(siblingResultsDir, fileName);

        if (fs.existsSync(siblingPath)) {
            const content = fs.readFileSync(siblingPath, "utf-8");
            return new NextResponse(content, {
                headers: {
                    "Content-Type": "text/markdown",
                    "Content-Disposition": `attachment; filename="${fileName}"`,
                },
            });
        }

        return NextResponse.json({ error: "File not found" }, { status: 404 });
    }

    const content = fs.readFileSync(filePath, "utf-8");
    return new NextResponse(content, {
        headers: {
            "Content-Type": "text/markdown",
            "Content-Disposition": `attachment; filename="${fileName}"`,
        },
    });
}
