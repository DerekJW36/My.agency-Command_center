import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
    try {
        const { audit } = await req.json();

        if (!audit) {
            return NextResponse.json({ error: "Audit data is required" }, { status: 400 });
        }

        const { url, seo, ux_wow_factor, status } = audit;

        // Use OpenAI to generate a high-conversion agency pitch
        const response = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                {
                    role: "system",
                    content: "You are a state-of-the-art AI Marketing Agency founder specialized in 3D WebGL websites and high-conversion UX systems. Your goal is to write a short, aggressive, but professional 'Ethertecsys DCG' style pitch to a potential client based on their website audit."
                },
                {
                    role: "user",
                    content: `
            Analyze this audit data and write a short outreach email:
            - URL: ${url}
            - Security: ${status}
            - SEO Title: ${seo?.title}
            - Meta Description: ${seo?.has_description ? "Found" : "Missing"}
            - OpenGraph Tags: ${seo?.has_og ? "Present" : "Missing"}
            - Twitter Cards: ${seo?.has_twitter ? "Present" : "Missing"}
            - 3D/Canvas Tech: ${ux_wow_factor?.has_3d_canvas ? "Detected" : "Not found"}
            - Mobile Responsive: ${ux_wow_factor?.responsive ? "Yes" : "No"}

            Focus on how their current site lacks the "WOW Factor" and prestige of elective 3D environments, and how that's costing them conversions. Refer to our "Ethertecsys DCG" 3D landing environment as a baseline for comparison. Keep it under 200 words.
          `
                }
            ],
            temperature: 0.7,
        });

        const pitch = response.choices[0].message.content?.trim();

        return NextResponse.json({ pitch });

    } catch (error) {
        console.error("OpenAI Pitch API Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
