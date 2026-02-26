import os
import sys
import json
import random
from agency_tools import AgencyTools

class OutreachManager:
    def __init__(self):
        self.tools = AgencyTools()
        self.hooks_file = os.path.join(os.path.dirname(__file__), "..", "data", "hooks.json")
        self.hooks = self._load_hooks()

    def _load_hooks(self):
        """Load marketing hooks from the library."""
        try:
            if os.path.exists(self.hooks_file):
                with open(self.hooks_file, 'r') as f:
                    return json.load(f)
            return ["Improving your digital presence"] # Fallback
        except Exception:
            return ["Improving your digital presence"]

    def generate_email_draft(self, audit_file):
        """Generate a personalized outreach email based on audit results."""
        with open(audit_file, 'r') as f:
            data = json.load(f)
        
        url = data.get('url')
        seo = data.get('seo', {})
        ux = data.get('ux_wow_factor', {})
        
        # Select a random punchy hook
        subject = random.choice(self.hooks)
        
        body = f"Hi,\n\nI was just reviewing {url} and noticed some huge opportunities for growth.\n\n"
        
        if not seo.get('has_description'):
            body += "- Your SEO meta tags are missing, which means you're losing easy organic traffic.\n"
        
        if not ux.get('has_3d_canvas'):
            body += "- Your site is missing modern interactive 3D elements, which can increase time-on-page by 40%.\n"
            
        body += "\nI've already built a 3D prototype that would look incredible on your homepage. Would you be open to a 5-minute chat to see it?\n\nBest,\nYour Agency Team"
        
        print(f"\n--- Email Draft for {url} ---")
        print(f"Subject: {subject}")
        print("-" * 20)
        print(body)
        print("-" * 20)
        
        return {"subject": subject, "body": body}

if __name__ == "__main__":
    outreach = OutreachManager()
    
    if len(sys.argv) > 1:
        audit_path = sys.argv[1]
        if os.path.exists(audit_path):
            outreach.generate_email_draft(audit_path)
        else:
            print(f"File not found: {audit_path}")
    else:
        print("Outreach Manager Initialized.")
        print("Usage: python outreach.py <path_to_audit_json>")
