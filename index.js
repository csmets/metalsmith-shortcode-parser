/*
 * Metalsmith Shortcode Parser
 * ===========================
 *
 * This is a wrapper plugin for npm module shortcode-parser. Current metalsmith
 * shortcode parsers are broken or using jade/pug only. Plus they are very old.
 *
 * Have wordpress like shortcodes for your metalsmith project
 */

const parser = require('shortcode-parser');
const path = require('path');

const wrapper = opts =>
    (files, metalsmith, done) => {
        setImmediate(done);

        const shortcodeOpts = opts || {};

        if (shortcodeOpts.shortcodes !== undefined) {
            Object.keys(shortcodeOpts.shortcodes).forEach((shortcode) => {
                parser.add(shortcode, shortcodeOpts.shortcodes[shortcode]);
            });
        } else {
            console.log('No Shortcodes given');
        }

        Object.keys(files).forEach((file) => {
            let ext = path.extname(file);
            if(!shortcodeOpts.files || (shortcodeOpts.files && shortcodeOpts.files.indexOf(ext) != -1)) {
                const out = parser.parse(files[file].contents.toString('utf8'));
                files[file].contents = Buffer.from(out, 'utf8');
            }
        });
    };

module.exports = wrapper;
