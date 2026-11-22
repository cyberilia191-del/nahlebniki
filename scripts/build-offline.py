"""Package the shop and its media into one self-contained HTML file."""
import base64
import json
import mimetypes
import re
from pathlib import Path

dist = Path(__file__).resolve().parents[1] / "dist"


def data_uri(asset_path):
    path = dist / asset_path
    media_type = mimetypes.guess_type(path.name)[0] or "application/octet-stream"
    data = base64.b64encode(path.read_bytes()).decode("ascii")
    return f"data:{media_type};base64,{data}"


html = (dist / "index.html").read_text()
css = (dist / "style.css").read_text()
css = re.sub(r"url\('(?P<path>assets/[^']+)'\)",
             lambda match: f"url('{data_uri(match['path'])}')", css)
html = re.sub(r'src="(assets/[^"]+)"',
              lambda match: f'src="{data_uri(match[1])}"', html)
pictures = {path.stem: data_uri(path.relative_to(dist))
            for path in (dist / "assets").glob("*.jpg")
            if path.stem not in {"guide-sandwich", "hero"}}
html = re.sub(r'<link rel="stylesheet" href="style\.css[^"]*">', lambda _: f"<style>{css}</style>", html)
images = f'<script type="application/json" id="menu-images">{json.dumps(pictures)}</script>'
html = html.replace('<script src="app.js', images + '\n<script src="app.js', 1)


def inline_script(match):
    return "<script>" + (dist / match[1]).read_text() + "</script>"


html = re.sub(r'<script src="([a-z-]+\.js)(?:\?[^"]*)?"></script>', inline_script, html)
(dist / "nahlebniki-offline.html").write_text(html)
