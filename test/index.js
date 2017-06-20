const Metalsmith = require('metalsmith');
const shortcodes = require('../');
const assert = require('assert');
const equal = require('assert-dir-equal');

describe("Metalsmith shortcode parser", () => {

	const testFixture = (fix, opts, done) => {
		
		Metalsmith(__dirname + '/fixtures/' + fix)
			.source('src')
			.destination('build')
			.use(shortcodes(opts))
			.build((err) => {
				if (err) throw err;
				equal(
					__dirname + '/fixtures/' + fix + '/build',
					__dirname + '/fixtures/' + fix + '/expected'
				);
				done();
			});
	}

	it('Should generate image from single tag', (done) => {
		testFixture(
			'image',
			{
				shortcodes: {
					image: function (buf, opts) {
						return '<img src="this/is/a/test.png">';
					},
				},
			},
			done
		);
	});

	it('Should generate uppercase from closing tag', (done) => {
		testFixture(
			'uppercase',
			{
				shortcodes: {
					uppercase: function (buf, opts) {
						return buf.toUpperCase();
					},
				},
			},
			done
		);
	});

	it('Should make text bold with closing tag and option', (done) => {
		testFixture(
			'bold',
			{
				shortcodes: {
					bold: function (buf, opts) {
						if (opts.upper) buf = buf.toUpperCase();
						return '<strong>' + buf + '</strong>';
					},
				},
			},
			done
		);
	});

	it('Should render multiple shortcodes', (done) => {
		testFixture(
			'multi',
			{
				shortcodes: {
					uppercase: function (buf, opts) {
						return buf.toUpperCase();
					},
					image: function (buf, opts) {
						return '<img src="this/is/a/test.png">';
					},
				},
			},
			done
		);
	});

});

