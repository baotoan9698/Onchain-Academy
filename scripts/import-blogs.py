"""One-time migration of the 15 public articles owned by On-chain Academy.
Requires: python -m pip install requests beautifulsoup4
Usage: python scripts/import-blogs.py --output PATH_TO_PROJECT
"""
import argparse
import hashlib
import json
import re
from datetime import datetime, timezone
from pathlib import Path
from urllib.parse import urljoin, urlparse
import xml.etree.ElementTree as ET
import requests
from bs4 import BeautifulSoup, Comment

BASE = 'https://on-chain.academy'
EXTRA = {
 'buoi-tap-huan-ung-dung-blockchain-tai-san-ma-hoa-trong-ifc-tu-chinh-sach-den-thuc-tien': ('July 18, 2025', 'Xu8EkyWtFkCah5xtxcTmjV47fg.png'),
 'workshop-recap-from-blockchain-to-ifc-a-new-direction-for-vietnam-s-business-sector': ('July 15, 2025', 'fZg3oEblr0CUPJcXKTAeOSkyrhg.png'),
 'workshop-tu-blockchain-den-trung-tam-tai-chinh-quoc-te-huong-di-moi-cho-doanh-nghiep-viet': ('July 9, 2025', 'Irl33AcUaGOa4AVg2SOW6eBSY9U.jpg'),
 'is-on-chain-economy-just-a-fad': ('June 15, 2025', 'YvGXqDFHg8R3WeZZzGiat2lfxc.jpg'),
 'the-evolution-of-the-digital-economy': ('May 20, 2025', 'HXOVfzDrRiAC28BG2u39kEpE.png'),
 'the-on-chain-economy-is-coming': ('May 1, 2025', 'lzszAclO9ZwMbtTUhYRkzO1s.png'),
}
parser = argparse.ArgumentParser()
parser.add_argument('--output', type=Path, default=Path(__file__).resolve().parents[1])
root = parser.parse_args().output.resolve()
(root / 'data').mkdir(parents=True, exist_ok=True)
(root / 'public/images/blogs').mkdir(parents=True, exist_ok=True)
session = requests.Session()

def fetch(url):
    response = session.get(url, timeout=45)
    response.raise_for_status()
    return response

images = {}
def local_image(url, alt=''):
    url = urljoin(BASE, url).split('?')[0]
    if urlparse(url).hostname not in {'framerusercontent.com', 'i.ytimg.com'}:
        raise ValueError(f'Unexpected image host: {url}')
    if url in images:
        return images[url]['path']
    response = fetch(url)
    if not response.headers.get('content-type', '').startswith('image/'):
        raise ValueError(f'Not an image: {url}')
    name = hashlib.sha256(url.encode()).hexdigest()[:10] + '-' + Path(urlparse(url).path).name
    path = '/images/blogs/' + name
    (root / 'public' / path.lstrip('/')).write_bytes(response.content)
    images[url] = dict(path=path, source_url=url, alt=alt, mime_type=response.headers['content-type'].split(';')[0], bytes=len(response.content))
    return path

listing = BeautifulSoup(fetch(BASE + '/blogs').content, 'html.parser')
metadata = {}
for anchor in listing.find_all('a', href=True):
    if '/blogs/' not in anchor['href'] or not anchor.find('h4'):
        continue
    slug = anchor['href'].strip('/').split('/')[-1]
    paragraphs = anchor.find_all('p')
    metadata[slug] = dict(date=paragraphs[0].get_text(' ', strip=True), cover=anchor.find('img')['src'])
for slug, (date, name) in EXTRA.items():
    metadata[slug] = dict(date=date, cover='https://framerusercontent.com/images/' + name)

def clean_body(body, page_url):
    for comment in body.find_all(string=lambda value: isinstance(value, Comment)):
        comment.extract()
    allowed = {'p', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'li', 'strong', 'b', 'em', 'i', 'u', 's', 'a', 'img', 'br', 'hr', 'blockquote', 'figure', 'figcaption', 'table', 'thead', 'tbody', 'tr', 'th', 'td', 'pre', 'code'}
    for tag in list(body.find_all(True)):
        if tag.parent is None:
            continue
        if tag.name in {'script', 'style', 'button', 'svg', 'noscript'}:
            tag.decompose()
            continue
        if tag.name == 'iframe':
            href = tag.get('src', '')
            if urlparse(href).hostname in {'www.youtube.com', 'www.youtube-nocookie.com', 'youtube.com'}:
                link = BeautifulSoup('', 'html.parser').new_tag('a', href=href)
                link.string = 'Watch the video on YouTube'
                tag.replace_with(link)
            else:
                tag.decompose()
            continue
        if tag.name not in allowed:
            tag.unwrap()
            continue
        attrs = {}
        if tag.name == 'img':
            src = tag.get('src')
            if not src:
                tag.decompose()
                continue
            attrs = {'src': local_image(src, tag.get('alt', '')), 'alt': tag.get('alt', ''), 'loading': 'lazy'}
        elif tag.name == 'a':
            href = urljoin(page_url, tag.get('href', ''))
            if urlparse(href).scheme in {'https', 'http', 'mailto'}:
                if href.startswith(BASE + '/blogs/'):
                    href = urlparse(href).path.rstrip('/')
                attrs = {'href': href}
        elif tag.name in {'td', 'th'}:
            attrs = {key: tag[key] for key in ('colspan', 'rowspan') if str(tag.get(key, '')).isdigit()}
        tag.attrs = attrs
    return body.decode_contents()

sitemap = ET.fromstring(fetch(BASE + '/sitemap.xml').content)
urls = [el.text for el in sitemap.iter() if el.tag.endswith('loc') and '/blogs/' in (el.text or '')]
if len(urls) != 15:
    raise ValueError(f'Expected 15 articles, found {len(urls)}. Review sitemap before importing.')
posts = []
for url in urls:
    soup = BeautifulSoup(fetch(url).content, 'html.parser')
    slug = url.rstrip('/').split('/')[-1]
    title = soup.find('h1').get_text(' ', strip=True)
    containers = soup.select('[data-framer-component-type="RichTextContainer"]')
    body = max(containers, key=lambda el: len(el.get_text()))
    intro_node = soup.find('h1').find_parent(attrs={'data-framer-component-type': 'RichTextContainer'}).find_next_sibling(attrs={'data-framer-component-type': 'RichTextContainer'})
    if intro_node is None or len(intro_node.get_text()) > 2000:
        intro_node = soup.find('h1').find_next('p')
    intro = intro_node.get_text(' ', strip=True)
    raw_text = body.get_text(' ', strip=True)
    if len(raw_text) < 500:
        raise ValueError(f'Article body too short: {slug}')
    post = dict(slug=slug, title=title, published_at=datetime.strptime(metadata[slug]['date'], '%B %d, %Y').strftime('%Y-%m-%d'), excerpt=intro, cover=local_image(metadata[slug]['cover'], title), body_html=clean_body(body, url), source_url=url, reading_minutes=max(1, round(len(raw_text.split()) / 220)))
    posts.append(post)
    print(f'{len(posts):02d}: {slug} | {len(raw_text)} characters', flush=True)

posts.sort(key=lambda item: item['published_at'], reverse=True)
payload = dict(imported_at=datetime.now(timezone.utc).isoformat(), posts=posts, images=list(images.values()))
(root / 'data/blog-seed.json').write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding='utf-8')
print(f'Saved {len(posts)} posts and {len(images)} local images to {root}', flush=True)
