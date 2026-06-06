import sys
try:
    from PIL import Image, ImageDraw
except ImportError:
    import subprocess
    subprocess.check_call([sys.executable, "-m", "pip", "install", "Pillow"])
    from PIL import Image, ImageDraw

def crop_to_circle(input_path, output_path):
    try:
        img = Image.open(input_path).convert("RGBA")
        width, height = img.size
        min_dim = min(width, height)
        
        mask = Image.new('L', (min_dim, min_dim), 0)
        draw = ImageDraw.Draw(mask)
        draw.ellipse((0, 0, min_dim, min_dim), fill=255)
        
        left = (width - min_dim) / 2
        top = (height - min_dim) / 2
        right = (width + min_dim) / 2
        bottom = (height + min_dim) / 2
        img = img.crop((left, top, right, bottom))
        
        result = Image.new('RGBA', (min_dim, min_dim), (0, 0, 0, 0))
        result.paste(img, (0, 0), mask=mask)
        
        result.save(output_path, "PNG")
        print(f"Successfully saved {output_path}")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    crop_to_circle("e:/تحميلات/web app/web/public/logo.png", "e:/تحميلات/web app/web/public/logo-circle.png")
