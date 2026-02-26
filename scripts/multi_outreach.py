import sys
import json
import os
import random

class MultiChannelOutreach:
    def __init__(self):
        self.hooks_file = os.path.join(os.path.dirname(__file__), "..", "data", "hooks.json")
        self.hooks = self._load_hooks()

    def _load_hooks(self):
        try:
            with open(self.hooks_file, 'r') as f:
                return json.load(f)
        except:
            return ["Improving your digital presence"]

    def generate(self, audit_file):
        with open(audit_file, 'r') as f:
            data = json.load(f)
        
        url = data.get('url')
        domain = url.replace('https://', '').replace('http://', '').strip('/')
        
        subject = random.choice(self.hooks)
        
        templates = {
            "email": {
                "subject": subject,
                "body": f"Hi,\n\nI was just looking at {domain} and noticed some interesting opportunities. Specifically, your site seems to be {'performing well' if data.get('ux_wow_factor', {}).get('responsive') else 'missing mobile responsiveness'}, and the lack of 3D elements is a missed chance for engagement.\n\nI've already mocked up a 3D demo for {domain}. Can I send it over?\n\nBest,\nYour Agency"
            },
            "linkedin_dm": {
                "message": f"Hey! Noticed {domain} is doing some cool things with SEO, but I saw a 'wow factor' gap that 3D interactive elements could fix instantly. Just built a demo for you—worth a 2-minute look?"
            },
            "instagram_dm": {
                "message": f"Love the brand at {domain}! Just scanned the site and I have a way to make it pop with 3D canvas tech. DM me 'DEMO' if you want to see what I built for you!"
            }
        }
        
        print(f"\nMULTI-CHANNEL CAMPAIGN FOR {domain}")
        for channel, content in templates.items():
            print(f"\n--- {channel.upper()} ---")
            for k, v in content.items():
                print(f"{k.capitalize()}: {v}")
        
        return templates

if __name__ == "__main__":
    if len(sys.argv) > 1:
        mco = MultiChannelOutreach()
        mco.generate(sys.argv[1])
    else:
        print("Usage: python scripts/multi_outreach.py <audit_json>")
