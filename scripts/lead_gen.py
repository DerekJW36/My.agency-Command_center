import requests
from bs4 import BeautifulSoup
import json
import os
import sys
from agency_tools import AgencyTools

class LeadGenerator:
    def __init__(self):
        self.tools = AgencyTools()
        self.headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
        }

    def search_businesses(self, niche, location, count=5):
        """Search for businesses using DuckDuckGo (free, no API key needed)."""
        print(f"[SEARCH] Finding {niche} in {location}...")
        query = f"{niche} {location} website"
        url = f"https://duckduckgo.com/html/?q={query}"
        
        try:
            response = requests.get(url, headers=self.headers)
            soup = BeautifulSoup(response.text, 'html.parser')
            
            links = []
            for a in soup.find_all('a', class_='result__url'):
                href = a.get('href')
                if href and "http" in href:
                    # Clean the DuckDuckGo redirect link if necessary
                    links.append(href.strip())
                if len(links) >= count:
                    break
            
            print(f"[FOUND] {len(links)} potential leads.")
            return links
        except Exception as e:
            print(f"[ERROR] Search failed: {e}")
            return []

    def run_campaign(self, niche, location):
        """Search for leads and automatically audit them."""
        leads = self.search_businesses(niche, location)
        
        for lead_url in leads:
            print(f"\n--- Processing: {lead_url} ---")
            self.tools.audit_website(lead_url)

if __name__ == "__main__":
    generator = LeadGenerator()
    
    if len(sys.argv) > 2:
        niche = sys.argv[1]
        location = sys.argv[2]
        generator.run_campaign(niche, location)
    else:
        print("Lead Generator Initialized.")
        print("Usage: python lead_gen.py <niche> <location>")
        print("Example: python lead_gen.py 'dentist' 'Portland, OR'")
