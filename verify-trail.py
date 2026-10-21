"""Validate the buildless portfolio's local links and accessible structure."""
from html.parser import HTMLParser
from pathlib import Path

class Page(HTMLParser):
    def __init__(self):
        super().__init__()
        self.ids, self.links, self.files = [], [], []
        self.h1_count = 0

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if 'id' in attrs:
            self.ids.append(attrs['id'])
        self.h1_count += tag == 'h1'
        if tag == 'img':
            assert 'alt' in attrs, 'Image missing alt text'
        if tag == 'button':
            assert attrs.get('type') == 'button', 'Button type must be explicit'
        for key in ('href', 'src'):
            value = attrs.get(key, '')
            if value.startswith('#'):
                self.links.append(value[1:])
            elif value and not value.startswith(('http', 'mailto:', 'data:')):
                self.files.append(value.split('?')[0])

root = Path(__file__).parent
page = Page()
page.feed((root / 'index.html').read_text())
assert len(page.ids) == len(set(page.ids)), 'Duplicate IDs'
assert page.h1_count == 1, 'Expected one main heading'
assert all(link in page.ids for link in page.links), 'Broken section link'
assert all((root / name).is_file() for name in page.files), 'Missing local asset'
assert (root / 'assets/trail-landscape.webp').is_file(), 'Missing landscape'
print('PASS: heading, image alt text, button types, unique IDs, section links and local assets')
