import asyncio
import os
import sys
from datetime import datetime

# Add the notebooklm-venv site-packages to sys.path if needed
# This allows running the script from outside the venv if the paths are correct
# But it's safer to run from the venv directly.

try:
    from notebooklm import NotebookLMClient
    from notebooklm.rpc import ReportFormat
except ImportError:
    print("Error: notebooklm-py not found. Please run this script using the virtual environment:")
    print(r".\notebooklm-venv\Scripts\python.exe notebooklm_syndicate.py")
    sys.exit(1)

async def run_syndicate_audit(business_name, industry, target_url=None):
    """
    Automates a deep-dive research session and generates a 'Syndicate Strategy' report.
    """
    print(f"[INIT] Initializing Syndicate Research for: {business_name} ({industry})")
    
    async with await NotebookLMClient.from_storage() as client:
        # 1. Create a specialized Syndicate Notebook
        notebook_title = f"Syndicate Audit: {business_name} | {datetime.now().strftime('%Y-%m-%d')}"
        print(f"[PROCESS] Creating notebook: {notebook_title}...")
        nb = await client.notebooks.create(notebook_title)
        print(f"[SUCCESS] Notebook created with ID: {nb.id}")

        # 2. Add Sources
        # Add the global platform context source
        context_file = os.path.join(os.path.dirname(__file__), "syndicate_platform_context.md")
        if os.path.exists(context_file):
            print(f"[CONTEXT] Adding Syndicate Platform context from: {context_file}...")
            with open(context_file, "r", encoding="utf-8") as f:
                context_text = f.read()
            await client.sources.add_text(nb.id, "Syndicate Platform Blueprint", context_text)
        
        # Add the target business sources
        if target_url:
            print(f"[LINK] Adding primary source: {target_url}...")
            await client.sources.add_url(nb.id, target_url, wait=True)
        else:
            # Fallback: Add a research brief as a text source
            print("[TEXT] No URL provided. Adding industry context as a text source...")
            research_brief = f"""
            Industry Research Context: {industry} in Portland, Oregon.
            Market Dynamics: High competition, focus on local SEO, requirement for high-trust social proof.
            Primary Goal: Identify how AI, automation, and lead generation syndication can disrupt the current market leaders.
            Target Business: {business_name}
            """
            await client.sources.add_text(nb.id, "Syndicate Research Brief", research_brief)

        # 3. Generate the 'Syndicate Solution roadmap'
        print("[AI] Generating AI Syndicate Audit Report...")
        
        # Enhanced instructions using the platform context
        custom_instructions = """
        ACT AS: An elite AI Agency Strategist.
        TASK: Create a 'Syndicate Domination Roadmap' for this business.
        
        REQUIRED SOLUTION SET (The Syndicate Platform):
        - Every 'Revenue Leak' identified MUST be mapped to a feature of our platform:
            1. Unified Communication (Inbox for SMS/Email/Social)
            2. Marketing Automation (Email/SMS/Voice Drop workflows)
            3. CRM & Pipeline Tracking
            4. High-Compression Funnels & Websites
        
        STRUCTURE:
        1. REVENUE LEAKAGE: Where are they losing money by not using AI/Automation?
        2. THE SYNDICATE ENGINE: How our specific platform (CRM, Automation, Unified Inbox) fixes these leaks.
        3. COMPETITIVE DISRUPTION: How to out-muscle the top 5 competitors in Portland using our funnels and speed-to-lead.
        4. THE GUARANTEE: What kind of performance-based offer should we give them?
        
        TONE: Aggressive, high-confidence, professional, 'Hot Rod' muscle car energy.
        """
        
        # Generate the report
        status = await client.artifacts.generate_report(
            nb.id, 
            report_format=ReportFormat.CUSTOM,
            custom_prompt=custom_instructions
        )
        print(f"[WAIT] Waiting for AI generation (Task ID: {status.task_id})...")
        
        # Wait for completion
        await client.artifacts.wait_for_completion(nb.id, status.task_id)
        
        # 4. Download Results
        output_dir = "results"
        if not os.path.exists(output_dir):
            os.makedirs(output_dir)
            
        timestamp = datetime.now().strftime("%H%M%S")
        filename = f"{business_name.lower().replace(' ', '_')}_syndicate_audit_{timestamp}.md"
        filepath = os.path.join(output_dir, filename)
        
        print(f"[DOWNLOAD] Downloading audit report to: {filepath}...")
        await client.artifacts.download_report(nb.id, filepath)
        
        print("\n" + "="*50)
        print(f"[RESULT] AUDIT COMPLETE: {business_name}")
        print(f"[FILE] Report File: {filepath}")
        print("="*50)
        
        return filepath

if __name__ == "__main__":
    # Handle command-line arguments
    # Usage: python notebooklm_syndicate.py "Business Name" "Industry" "URL"
    if len(sys.argv) > 2:
        BUSINESS = sys.argv[1]
        INDUSTRY = sys.argv[2]
        URL = sys.argv[3] if len(sys.argv) > 3 and sys.argv[3] else None
    else:
        # Default example fallback
        BUSINESS = "Portland Power Roofing"
        INDUSTRY = "Roofing / Construction"
        URL = None
    
    # Run the audit
    asyncio.run(run_syndicate_audit(BUSINESS, INDUSTRY, target_url=URL))
