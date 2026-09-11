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

    def _compute_presence_score(self, seo, ux, marketing, has_gbp, secure):
        """Score 0-100 based on digital presence signals."""
        score = 0
        if secure:            score += 15
        if has_gbp:           score += 20
        if seo["has_description"]: score += 10
        if seo["title"] != "Missing": score += 5
        if seo["has_og"]:     score += 10
        if seo["has_twitter"]: score += 5
        if ux["responsive"]:  score += 15
        if ux["has_3d_canvas"]: score += 5
        if marketing["has_analytics"]: score += 15
        return min(score, 100)

    def _auto_tags(self, seo, ux, marketing, has_gbp, secure):
        """Return tags describing what the site is missing."""
        tags = []
        if not secure:               tags.append("No_HTTPS")
        if not has_gbp:              tags.append("No_GBP")
        if not seo["has_description"]: tags.append("No_MetaDesc")
        if not seo["has_og"]:        tags.append("No_OG")
        if not ux["responsive"]:     tags.append("Not_Mobile")
        if not marketing["has_analytics"]: tags.append("No_Analytics")
        if not tags:                 tags.append("Well_Optimized")
        return tags

    def audit_website(self, url):
        """Audit a prospect site and sync enriched data to Supabase."""
        print(f"[AUDIT] Starting: {url}...")
        try:
            import urllib3
            urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

            response = requests.get(url, timeout=10, verify=False)
            soup = BeautifulSoup(response.text, 'html.parser')
            html = response.text.lower()

            # SEO signals
            has_meta_desc = bool(soup.find('meta', attrs={'name': 'description'}))
            has_og        = bool(soup.find('meta', attrs={'property': 'og:title'}))
            has_twitter   = bool(soup.find('meta', attrs={'name': 'twitter:card'}))
            title         = soup.title.string.strip() if soup.title and soup.title.string else "Missing"

            # UX signals
            has_3d     = bool(soup.find('canvas'))
            responsive = bool(soup.find('meta', attrs={'name': 'viewport'}))

            # Marketing signals
            has_analytics = any(t in html for t in ['ua-', 'gtm-', 'ga-', 'fbevents.js', 'gtag'])

            # GBP (Google Business Profile) detection
            has_gbp = (
                'maps.google.com' in html or
                'google.com/maps' in html or
                '"localbusiness"' in html or
                '"@type":"localbusiness"' in html.replace(' ', '') or
                bool(soup.find('iframe', src=lambda s: s and 'google.com/maps' in s))
            )

            secure = url.startswith("https")

            seo        = {"has_description": has_meta_desc, "title": title, "has_og": has_og, "has_twitter": has_twitter}
            ux         = {"has_3d_canvas": has_3d, "responsive": responsive}
            marketing  = {"has_analytics": has_analytics}

            score = self._compute_presence_score(seo, ux, marketing, has_gbp, secure)
            tags  = self._auto_tags(seo, ux, marketing, has_gbp, secure)

            report = {
                "url": url,
                "status": "NEW",
                "seo": seo,
                "ux_wow_factor": ux,
                "marketing": marketing,
                "has_gbp": has_gbp,
                "digital_presence_score": score,
                "tags": tags,
            }

            # Save locally
            safe_name = url.replace("https://", "").replace("http://", "").replace("/", "_")
            filename = os.path.join(self.results_dir, f"audit_{safe_name}.json")
            with open(filename, 'w') as f:
                json.dump(report, f, indent=4)

            # Sync to Supabase (upsert on url)
            if self.supabase:
                try:
                    self.supabase.table("audits").upsert(report, on_conflict="url").execute()
                    print(f"[SYNC] Audit synced to Supabase. Score: {score}/100 | GBP: {has_gbp} | Tags: {tags}")
                except Exception as ex:
                    print(f"[ERROR] Cloud sync failed: {ex}")

            print(f"[DONE] Audit complete → {filename}")
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
