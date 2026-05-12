import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { supabase } from "@/lib/supabase";

export async function POST(req: NextRequest) {
    try {
        const resultsDir = path.join(process.cwd(), "results");
        const files = await fs.readdir(resultsDir);
        const jsonFiles = files.filter(f => f.endsWith(".json"));

        let totalSynced = 0;

        for (const file of jsonFiles) {
            const filePath = path.join(resultsDir, file);
            const content = await fs.readFile(filePath, "utf-8");
            const leads = JSON.parse(content);

            // Assuming leads is an array of objects
            for (const lead of leads) {
                // Map local scraper format to database format
                // Scraper format: { "to": "...", "subject": "...", "body": "...", "demo_link": "..." }
                // Database format: { url, seo, ux_wow_factor, status, demo_link }

                // We need to extract the domain/url from the demo_link or email
                const url = lead.demo_link?.replace("https://demo.antigravity.agency/", "https://") ||
                    lead.to.split("@")[1] || "unknown";

                const { data, error } = await supabase
                    .from("audits")
                    .upsert({
                        url,
                        demo_link: lead.demo_link,
                        status: "NEW", // Default status for synced leads
                        // We don't have full SEO/UX audit data from the summarized leads file,
                        // but we can pre-populate if needed.
                        created_at: new Date().toISOString()
                    }, { onConflict: 'url' })
                    .select();

                if (error) {
                    console.error(`Error syncing lead ${url}:`, error);
                } else {
                    totalSynced++;
                }
            }
        }

        return NextResponse.json({
            message: "Sync complete",
            totalSynced
        });

    } catch (error) {
        console.error("Sync API Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
