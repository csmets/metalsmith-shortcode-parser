const Metalsmith = require('metalsmith');
const shortcodes = require('../');

Metalsmith(__dirname)
    .source('fixtures/source')
    .destination('fixtures/build')
    .use(shortcodes({
        shortcodes: {
            bold: function (buf, opts) {
                if (opts.upper) buf = buf.toUpperCase();
                return '<strong>' + buf + '</strong>';
            },
        },
    }))
    .build((err) => {
        if (err) throw err;
    });

