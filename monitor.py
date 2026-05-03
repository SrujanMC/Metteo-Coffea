import requests
import time
from datetime import datetime

URL = "https://roaring-jelly-97fdd5.netlify.app/"

def check_site():
    try:
        r = requests.get(URL)
        if r.status_code == 200:
            print(f"[{datetime.now()}] ✅ Site Live")
        else:
            print(f"[{datetime.now()}] ⚠️ Issue: {r.status_code}")
    except:
        print(f"[{datetime.now()}] ❌ Site Down")

while True:
    check_site()
    time.sleep(60)
