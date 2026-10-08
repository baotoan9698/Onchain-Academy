"""Import the owner's original solution content and media. Requires requests and beautifulsoup4."""
import argparse
import json
from pathlib import Path
from urllib.parse import urlparse, urljoin
import requests
from bs4 import BeautifulSoup

parser = argparse.ArgumentParser()
parser.add_argument('--output', type=Path, default=Path(__file__).resolve().parents[1])
root = parser.parse_args().output
base = 'https://on-chain.academy'
images = {}

def fetch(url):
    r = requests.get(url, timeout=45)
    r.raise_for_status()
    return r

def image(url):
    url = url.split('?')[0]
    assert urlparse(url).hostname == 'framerusercontent.com'
    if url not in images:
        path = '/images/solutions/' + Path(urlparse(url).path).name
        target = root / 'public' / path.lstrip('/')
        target.parent.mkdir(parents=True, exist_ok=True)
        r = fetch(url)
        assert r.headers.get('content-type', '').startswith('image/')
        target.write_bytes(r.content)
        images[url] = path
    return images[url]

posts = []
for slug in ['customized-training', 'research-development', 'onchain-hub']:
    source = base + '/solution/' + slug
    soup = BeautifulSoup(fetch(source).content.decode('utf-8'), 'html.parser')
    title = soup.find('h1').get_text(' ', strip=True)
    description = soup.select_one('.framer-1rcek2g').get_text(' ', strip=True)
    body = soup.select_one('.framer-4elbq3')
    assert body and len(body.get_text()) > 200
    before = list(soup.find_all('img'))
    first_body_image = body.find('img')
    partner_images = before[3:before.index(first_body_image)]
    partners = [image(i['src']) for i in partner_images]
    cover = image(first_body_image['src'])
    for tag in list(body.find_all(True)):
        if tag.name not in {'p', 'h2', 'h3', 'h4', 'h5', 'ul', 'ol', 'li', 'strong', 'b', 'em', 'i', 'a', 'img', 'br'}:
            tag.unwrap()
            continue
        attrs = {}
        if tag.name == 'img':
            attrs = {'src': image(tag['src']), 'alt': tag.get('alt') or title, 'loading': 'lazy'}
        elif tag.name == 'a':
            href = urljoin(source, tag.get('href', ''))
            if urlparse(href).scheme in {'https', 'http', 'mailto'}:
                attrs['href'] = href.replace(base + '/solution/', '/solution/')
        tag.attrs = attrs
    posts.append(dict(slug=slug, title=title, description=description, cover=cover, partners=partners, bodyHtml=body.decode_contents(), source=source))
(root / 'data').mkdir(exist_ok=True)
(root / 'data/solutions.json').write_text(json.dumps(posts, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
(root / 'data/solution-images.json').write_text(json.dumps(images, indent=2) + '\n', encoding='utf-8')
print(f'Imported {len(posts)} solutions and {len(images)} original images.')
