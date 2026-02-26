import requests
from bs4 import BeautifulSoup
import json
import os
from supabase import create_client, Client
from dotenv import load_dotenv

# Load environment variables from .env
load_dotenv()

class AgencyTools:
    def __init__(self):
        self.results_dir = "results"
        if not os.path.exists(self.results_dir):
            os.makedirs(self.results_dir)
        
        # Supabase Configuration (loaded from env)
        url = os.environ.get("SUPABASE_URL")
        key = os.environ.get("SUPABASE_KEY")
        if url and key:
            self.supabase: Client = create_client(url, key)
            print("[SYNC] Supabase Cloud connected.")
        else:
            self.supabase = None
            print("[INFO] Supabase credentials missing (check your .env file). Results will only be saved locally.")

    def audit_website(self, url):
        """Perform a basic 'State-of-the-Art' audit on a prospective client site."""
        print(f"[AUDIT] Starting: {url}...")
        try:
            # Disable SSL verification for broader compatibility in outreach/scraping
            import urllib3
            urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)
            
            response = requests.get(url, timeout=10, verify=False)
            soup = BeautifulSoup(response.text, 'html.parser')
            
            # Check for social media metadata
            has_og = bool(soup.find('meta', attrs={'property': 'og:title'}))
            has_twitter = bool(soup.find('meta', attrs={'name': 'twitter:card'}))
            
            # Basic SEO and UX detection
            has_meta_desc = bool(soup.find('meta', attrs={'name': 'description'}))
            has_3d = bool(soup.find('canvas'))
            
            # Simple check for responsiveness (viewport meta tag)
            responsive = bool(soup.find('meta', attrs={'name': 'viewport'}))
            
            # Simple check for common analytics (tracking IDs)
            has_analytics = any(term in response.text.lower() for term in ['ua-', 'gtm-', 'ga-', 'fbevents.js'])

            report = {
                "url": url,
                "status": "Insecure" if not url.startswith("https") else "Secure",
                "seo": {
                    "has_description": has_meta_desc,
                    "title": soup.title.string if soup.title else "Missing",
                    "has_og": has_og,
                    "has_twitter": has_twitter
                },
                "ux_wow_factor": {
                    "has_3d_canvas": has_3d,
                    "responsive": responsive
                },
                "marketing": {
                    "has_analytics": has_analytics
                }
            }
            
            # Save Locally
            filename = os.path.join(self.results_dir, f"audit_{url.replace('https://', '').replace('/', '_')}.json")
            with open(filename, 'w') as f:
                json.dump(report, f, indent=4)
            
            # Save to Cloud (Supabase)
            if self.supabase:
                try:
                    self.supabase.table("audits").insert(report).execute()
                    print(f"[SYNC] Audit synced to Supabase.")
                except Exception as ex:
                    print(f"[ERROR] Cloud sync failed: {ex}")
            
            print(f"[DONE] Audit complete. Saved to {filename}")
            return report
            
        except Exception as e:
            print(f"[ERROR] Failed to audit {url}: {e}")
            return None

if __name__ == "__main__":
    import sys
    tools = AgencyTools()
    
    if len(sys.argv) > 1:
        target_url = sys.argv[1]
        tools.audit_website(target_url)
    else:
        print("Agency Tools Initialized.")
        print("Usage: python agency_tools.py <url>")
        print("Example: python agency_tools.py https://google.com")
