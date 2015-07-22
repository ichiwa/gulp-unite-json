# gulp-unite-json
> union-all-json plugin for [gulp](https://github.com/wearefractal/gulp)

This will unite json files like UNION ALL of SQL.

## Usage

First, install `gulp-unite-json` as a development dependency:

```shell
npm install --save-dev gulp-unite-json
```

After that, add it to your `gulpfile.js`:

## Code Example

```javascript
var gulp_unite_json = require('gulp-unite-json');

gulp.src("./src/*.json")
	.pipe(gulp_unite_json("result.json")
	.pipe(gulp.dest("./dest"));
```
./src/test1.json
```javascript
{"key1":"value1"}
```
./src/test2.json
```javascript
{"key2":"value2"}
```
./dest/result.json
```javascript
{"key1":"value1","key2":"value2"}
```

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)
