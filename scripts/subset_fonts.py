import os
import subprocess
import glob

# Ensure output directory exists
src_dir = "public/fonts/originals"
dest_dir = "public/fonts"

# Unicode ranges to split
ranges = {
    "latin": "U+0020-007F",
    "latin1": "U+00A0-00FF",
    "symbols": "U+2000-27FF"
}

# Find all original woff2 fonts
font_files = glob.glob(os.path.join(src_dir, "*.woff2"))

if not font_files:
    print("No font files found in originals directory.")
    exit(1)

for font_path in font_files:
    font_name = os.path.basename(font_path)
    base_name = font_name.replace(".woff2", "")
    
    for slice_name, unicode_range in ranges.items():
        out_name = f"{base_name}.{slice_name}.woff2"
        out_path = os.path.join(dest_dir, out_name)
        
        print(f"Subsetting {font_name} -> {out_name} ({unicode_range})")
        
        cmd = [
            "python3", "-m", "fontTools.subset",
            font_path,
            f"--unicodes={unicode_range}",
            "--flavor=woff2",
            f"--output-file={out_path}"
        ]
        
        result = subprocess.run(cmd, capture_output=True, text=True)
        if result.returncode != 0:
            print(f"Error subsetting {font_name}: {result.stderr}")
        else:
            orig_sz = os.path.getsize(font_path)
            new_sz = os.path.getsize(out_path)
            print(f"  Success: {orig_sz/1024:.1f}KB -> {new_sz/1024:.1f}KB")

print("All font subsets generated successfully!")
