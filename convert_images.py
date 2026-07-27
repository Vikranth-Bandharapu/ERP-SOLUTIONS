from PIL import Image
import os

images = [
    (r"C:\Users\admin\.gemini\antigravity\brain\8937ef72-1bf9-4f4b-8108-237791e685dd\hero_dashboard_1785065347852.jpg", r"C:\Users\admin\Desktop\ERP Solutions\assets\images\hero_dashboard.webp"),
    (r"C:\Users\admin\.gemini\antigravity\brain\8937ef72-1bf9-4f4b-8108-237791e685dd\about_team_1785065368157.jpg", r"C:\Users\admin\Desktop\ERP Solutions\assets\images\about_team.webp")
]

for src, dest in images:
    if os.path.exists(src):
        img = Image.open(src)
        # Resize to max 1200 width to save space
        img.thumbnail((1200, 1200))
        # Save with quality optimization
        img.save(dest, 'webp', quality=60, method=6)
        print(f"Saved {dest}, Size: {os.path.getsize(dest) / 1024:.2f} KB")
