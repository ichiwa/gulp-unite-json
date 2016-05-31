"use strict";

var fs           = require("fs");
var	event_stream = require("event-stream");
var should       = require('should');
var gutil        = require("gulp-util")
var unite_json = require('../index');

describe('unite_json', function () {
    it('result should be expected.', function (done) {
	    var expectedFile = new gutil.File({
			path: "test/expected/test1.json",
			cwd: "test/",
			base: "test/expected",
			contents: fs.readFileSync("test/expected/test1.json")
		});
		var fakeFile1 = new gutil.File({
			contents: new Buffer(JSON.stringify({"key1" : "value1"}))
		});
		var fakeFile2 = new gutil.File({
			contents: new Buffer(JSON.stringify({"key2" : "value2"}))
		});
		var stream = unite_json("test");
		stream.on("error", function(err) {
			should.exist(err);
			done(err);
		});
		stream.on("data", function (newFile) {
			should.exist(newFile);
			should.exist(newFile.contents);
			String(newFile.contents).should.equal(String(expectedFile.contents));
			done();
		});
		stream.write(fakeFile1);
		stream.write(fakeFile2);
		stream.end();
	});
	it('should get error of duplicate key.', function (done) {
		var fakeFiles = [
			new gutil.File({ contents: new Buffer(JSON.stringify({"key1" : "value1"}))}),
			new gutil.File({ contents: new Buffer(JSON.stringify({"key1" : "value2"}))}),
		];
		var count  = 0;
		var stream = unite_json("test");
		stream.on("error", function(err){
			done();
		})
		stream.on("end", function () {
			throw new Error("something wrong.");
		});
		stream.write(fakeFiles[0]);
		stream.write(fakeFiles[1]);
		stream.end();
	});
});