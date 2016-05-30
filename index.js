"use strict";

var _        = require('underscore');
var through2 = require('through2');
var util     = require('util');
var gutil    = require('gulp-util');

var PluginError = gutil.PluginError;
var File        = gutil.File;
var format      = util.format;
var PLUGIN_NAME = 'gulp-unite-json';

module.exports = function (resultFileName) {
  if (!resultFileName) {
    throw new PluginError(PLUGIN_NAME, 'Missing fileName option for ' + PLUGIN_NAME);
  }
  var jsonObject = {};
  var firstFile = null;
  var hasError = false;
  function transform(file, encode, callback) {
    if (file.isStream()) {
      this.emit('error', new PluginError(PLUGIN_NAME,  'Streaming not supported'));
      callback();
      return;
    }
    if (!firstFile) {
      firstFile = file;
    }

    var self = this;
    var content = JSON.parse(file.contents.toString());
    _.each(content, function(value, key, obj){
      if (!_.has(jsonObject, key)){
        jsonObject[key] = value;
      } else {
        hasError = true;
        self.emit('error', new PluginError(PLUGIN_NAME, format('Key "%s" is duplicated in file %s', key, file.path)));
      }
    });
    callback();
  }
  function flush(callback){
    if (hasError || !firstFile) return;
    var output = new gutil.File({
      cwd:  firstFile.cwd,
      base: firstFile.base,
      path: firstFile.base + resultFileName
    });
    output.contents = new Buffer(JSON.stringify(jsonObject));
    this.push(output);
  }
  return through2.obj(transform, flush);
};
