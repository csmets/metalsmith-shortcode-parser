# Metalsmith Shortcode Parser
[![Build Status](https://travis-ci.org/csmets/metalsmith-shortcode-parser.svg?branch=master)](https://travis-ci.org/csmets/metalsmith-shortcode-parser)

Metalsmith wrapper for [shortcode-parser](https://www.npmjs.com/package/shortcode-parser)

Since the other shortcodes for metalsmith no longer work or are for jade/pug
templating only, I've had to create this.

### Usage

```
npm install metalsmith-shortcode-parser
```

```javascript
const shortcodes = require('metalsmith-shortcode-parser');

Metalsmith(__dirname)
    .use(shortcodes({
        files: ['.html', '.md'],
        shortcodes: {
            bold: function (buf, opts) {
                if (opts.upper) buf = buf.toUpperCase();
                return '<strong>' + buf + '</strong>';
            },
        },
    }))
```
