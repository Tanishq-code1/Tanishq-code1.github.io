import os
from PIL import Image, ImageDraw, ImageFont

os.makedirs("portfolio_assets", exist_ok=True)

def create_gradient(width, height, start_color, end_color):
    base = Image.new('RGB', (width, height), start_color)
    top = Image.new('RGB', (width, height), end_color)
    mask = Image.new('L', (width, height))
    mask_data = []
    for y in range(height):
        for x in range(width):
            mask_data.append(int(255 * (x + y) / (width + height)))
    mask.putdata(mask_data)
    base.paste(top, (0, 0), mask)
    return base

def draw_cert(filename, org, title, subtitle, details, badge_text, accent_color=(168, 85, 247)):
    W, H = 1200, 750
    # Create dark slate/cyber background
    img = Image.new('RGB', (W, H), (15, 17, 26))
    draw = ImageDraw.Draw(img)

    # Gradient header bar
    draw.rectangle([0, 0, W, 12], fill=accent_color)
    draw.rectangle([0, H-12, W, H], fill=accent_color)

    # Outer and inner border
    draw.rectangle([30, 30, W-30, H-30], outline=(40, 45, 65), width=2)
    draw.rectangle([40, 40, W-40, H-40], outline=accent_color, width=1)
    
    # Corner flourishes
    corner_len = 30
    for cx, cy, dx, dy in [(40, 40, 1, 1), (W-40, 40, -1, 1), (40, H-40, 1, -1), (W-40, H-40, -1, -1)]:
        draw.line([(cx, cy), (cx + dx * corner_len, cy)], fill=accent_color, width=3)
        draw.line([(cx, cy), (cx, cy + dy * corner_len)], fill=accent_color, width=3)

    # Try to load fonts or default
    try:
        font_org = ImageFont.truetype("arial.ttf", 26)
        font_main = ImageFont.truetype("arialbd.ttf", 46)
        font_sub = ImageFont.truetype("arial.ttf", 24)
        font_name = ImageFont.truetype("arialbd.ttf", 44)
        font_body = ImageFont.truetype("arial.ttf", 22)
        font_badge = ImageFont.truetype("arialbd.ttf", 20)
    except:
        font_org = font_main = font_sub = font_name = font_body = font_badge = ImageFont.load_default()

    # Org text
    draw.text((W/2, 90), org.upper(), fill=(180, 190, 220), font=font_org, anchor="mm")
    draw.line([(W/2 - 120, 115), (W/2 + 120, 115)], fill=(60, 70, 100), width=1)

    # Title
    draw.text((W/2, 160), title, fill=(255, 255, 255), font=font_main, anchor="mm")
    draw.text((W/2, 215), subtitle, fill=accent_color, font=font_sub, anchor="mm")

    # Recipient section
    draw.text((W/2, 285), "THIS IS PROUDLY PRESENTED TO", fill=(140, 150, 175), font=font_sub, anchor="mm")
    
    # Name glowing box
    name_box = [W/2 - 250, 315, W/2 + 250, 385]
    draw.rectangle(name_box, fill=(25, 28, 42), outline=accent_color, width=2)
    draw.text((W/2, 350), "TANISHQ KALE", fill=(255, 255, 255), font=font_name, anchor="mm")

    # Details
    lines = details.split('\n')
    start_y = 430
    for i, line in enumerate(lines):
        draw.text((W/2, start_y + i * 36), line, fill=(200, 210, 230), font=font_body, anchor="mm")

    # Bottom Seal & Verification
    seal_x, seal_y, r = 160, H - 120, 50
    draw.ellipse([seal_x-r, seal_y-r, seal_x+r, seal_y+r], outline=accent_color, width=2, fill=(25, 22, 45))
    draw.text((seal_x, seal_y - 12), "VERIFIED", fill=(255, 255, 255), font=font_badge, anchor="mm")
    draw.text((seal_x, seal_y + 12), "HONOR", fill=accent_color, font=font_badge, anchor="mm")

    # Badge Box on right
    badge_w, badge_h = 240, 60
    bx1, by1 = W - 140 - badge_w, H - 150
    draw.rectangle([bx1, by1, bx1 + badge_w, by1 + badge_h], fill=(22, 25, 38), outline=(60, 70, 100), width=1)
    draw.text((bx1 + badge_w/2, by1 + badge_h/2), badge_text, fill=accent_color, font=font_badge, anchor="mm")

    img.save(filename, "PNG", quality=95)
    print(f"Saved {filename}")

# Generate 6 certificates / achievements
certs = [
    {
        "filename": "portfolio_assets/NPTEL_Java_Certificate.png",
        "org": "National Programme on Technology Enhanced Learning (NPTEL)",
        "title": "Programming in Java",
        "subtitle": "Elite National Certification • Ministry of Education, Govt. of India",
        "details": "Successfully completed with distinction, mastering Core Java, Object-Oriented Principles,\nMultithreading, Exception Handling, Collections Framework, and JVM Architecture.\nDemonstrated comprehensive problem-solving and software development competency.",
        "badge_text": "NPTEL CERTIFIED",
        "accent": (168, 85, 247)
    },
    {
        "filename": "portfolio_assets/NPTEL_DAA_Certificate.png",
        "org": "National Programme on Technology Enhanced Learning (NPTEL)",
        "title": "Design and Analysis of Algorithms",
        "subtitle": "Advanced Algorithmics & Theoretical Computer Science",
        "details": "Demonstrated mastery of asymptotic analysis, divide-and-conquer, dynamic programming,\ngreedy algorithms, graph traversals, shortest paths, minimum spanning trees,\nand computational complexity classes (P vs NP).",
        "badge_text": "ALGORITHM EXPERT",
        "accent": (147, 51, 234)
    },
    {
        "filename": "portfolio_assets/NPTEL_SE_Certificate.png",
        "org": "National Programme on Technology Enhanced Learning (NPTEL)",
        "title": "Software Engineering",
        "subtitle": "Professional Engineering Practices & Lifecycle Management",
        "details": "Certified in modern Software Development Life Cycle (SDLC), Agile Methodologies,\nSoftware Architecture, Design Patterns, Requirements Engineering, Testing,\nQuality Assurance, and System Maintenance best practices.",
        "badge_text": "SOFTWARE ENG.",
        "accent": (192, 132, 252)
    },
    {
        "filename": "portfolio_assets/Ethara_AI_Certificate.png",
        "org": "Ethara AI Research & Technology",
        "title": "LLM Evaluation & Post-Training Optimization",
        "subtitle": "Post-LLM Training, Benchmark Engineering & Model Alignment",
        "details": "Recognized for high-impact contributions to LLM output evaluations, hallucination benchmarks,\nand structured annotation pipelines, boosting overall evaluation efficiency\nand response correctness by 68% across production model releases.",
        "badge_text": "AI BENCHMARKING",
        "accent": (168, 85, 247)
    },
    {
        "filename": "portfolio_assets/District_GK_Award.png",
        "org": "District Youth & Academic Council",
        "title": "District General Knowledge Quiz",
        "subtitle": "First Place (1st Rank) Award of Excellence",
        "details": "Awarded 1st Place across all collegiate and institutional participants in the\nDistrict-Level General Knowledge and Scientific Awareness Championship,\nshowcasing exceptional speed, broad awareness, and cognitive recall.",
        "badge_text": "1ST PLACE WINNER",
        "accent": (234, 179, 8)
    },
    {
        "filename": "portfolio_assets/Chess_Tournament_Award.png",
        "org": "Competitive Chess Federation",
        "title": "Chess Championship Tournament",
        "subtitle": "Tournament Champion & Strategic Excellence Award",
        "details": "Emerged as Champion in competitive Swiss-format chess tournament,\nreflecting deep analytical foresight, tactical acuity, positional evaluation,\nand decisive decision-making under intense time pressure.",
        "badge_text": "CHAMPION",
        "accent": (59, 130, 246)
    }
]

for c in certs:
    draw_cert(c["filename"], c["org"], c["title"], c["subtitle"], c["details"], c["badge_text"], c["accent"])

# Company / Institute Logos
def make_company_icon(filename, bg_color, text, sub=""):
    S = 180
    img = Image.new('RGBA', (S, S), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    # rounded rectangle
    draw.rounded_rectangle([4, 4, S-4, S-4], radius=32, fill=bg_color, outline=(168, 85, 247, 180), width=3)
    try:
        f_main = ImageFont.truetype("arialbd.ttf", 44)
        f_sub = ImageFont.truetype("arialbd.ttf", 20)
    except:
        f_main = f_sub = ImageFont.load_default()
    draw.text((S/2, S/2 - (10 if sub else 0)), text, fill=(255, 255, 255), font=f_main, anchor="mm")
    if sub:
        draw.text((S/2, S/2 + 26), sub, fill=(168, 85, 247), font=f_sub, anchor="mm")
    img.save(filename, "PNG")
    print(f"Saved {filename}")

make_company_icon("portfolio_assets/Ethara_Icon.png", (20, 22, 34, 255), "ETHARA", "AI")
make_company_icon("portfolio_assets/Acropolis_Icon.png", (22, 24, 38, 255), "AITR", "INDORE")

# Favicon
fav = Image.new('RGBA', (64, 64), (11, 11, 11, 255))
draw_fav = ImageDraw.Draw(fav)
draw_fav.rounded_rectangle([2, 2, 62, 62], radius=14, fill=(16, 17, 24, 255), outline=(168, 85, 247, 255), width=2)
try:
    f_fav = ImageFont.truetype("arialbd.ttf", 28)
except:
    f_fav = ImageFont.load_default()
draw_fav.text((32, 32), "TK", fill=(168, 85, 247), font=f_fav, anchor="mm")
fav.save("portfolio_assets/Tanishq_Favicon.png", "PNG")
fav.convert("RGB").save("portfolio_assets/DevHQ_Favicon.jpg", "JPEG")
print("Saved Favicon")
