# @ldu-devtools/gulpfunctions

## BuildFunctions

Build Functions for you can build your project, and for easy manage Gulpfile.js build tasks. To use it, you can import it in your Gulpfile.js

``` js
const buildFn = require('@ldu-devtools/gulpfunctions').buildFn;
```

### cleanFolder

Cleans the folder content (files and subfolders recursively) under given path

``` js
buildFn.cleanFolder('temp/path');
// NOTE: you can chain this with another Gulp Task
```

### concatFiles

Concats the given source files to one given file and copy it to the given destination path

``` js
buildFn.concatFiles([
    'temp/source/one.js',
    'temp/source/*.js'
], 'temp/dist', 'output.js');
// produces: all given js files concatenated and copied to ./temp/dist/output.js
// NOTE: you can chain this with another Gulp Task
```

### copyFiles

Copies the given source files to the given destination path

``` js
buildFn.copyFiles([
    'temp/source/*.html',
    'temp/source/one.js',
    'temp/source/two.css'
], 'temp/dist');
// produces: ./temp/source/index.html,one.js,two.css copied to ./temp/dist/index.html,one.js,two.css
// NOTE: you can chain this with another Gulp Task
```

### createFile

Creates a file with the given content and informations

``` js
buildFn.createFile('temp/dist', 'my-file', '.php', '<?php echo php_info()?>', callBack);
// produces: ./temp/dist/my-file.php with content - '<?php echo php_info()?>'
// NOTE: this is an async call
// NOTE: you can chain this with another Gulp Task
```

### minifyImages

Minifies the given source images and copies they to the given destination path

``` js
buildFn.minifyImages([
    'temp/images',
    'temp/icons'
], 'temp/dist');
// produces: all given image and icon minified and copied to ./temp/dist
// NOTE: you can chain this with another Gulp Task
```

### minifyJSON

Minifies the given source JSON Objects and copies they to the given destination path

``` js
buildFn.minifyJSON(([
    'temp/configs/server*-config.json',
    'temp/configs/profile*-config.json'
], 'temp/dist/configs');
// produces: all given JSON minified and copied to ./temp/dist/configs
// NOTE: you can chain this with another Gulp Task
```

### zipping

Zip the given source path content into the given destination path with the given project informations

``` js
buildFn.zipping(('temp/dist/**/*', 'test-project', '1.0.0-SNAPSHOT', 'temp/build');
// produces: test-project-1.0.0-SNAPSHOT-yyyymmddHHMMss.zip file under ./temp/build/
// NOTE: you can chain this with another Gulp Task
```

## CSSFunctions

CSS Functions for you can easy manage Gulpfile.js build tasks for *.css* files. To use it, you can import it in your Gulpfile.js

``` js
const cssFn = require('@ldu-devtools/gulpfunctions').cssFn;
```

### concatCSS

Compiles and concats style files and copies they to given destination path

``` js
cssFn.concatCSS('temp/*.scss', 'temp/dist');
// produces: a compiled and concatenated ./temp/dist/styles.css file
// NOTE: you can chain this with another Gulp Task
```

### minifyCSS

Minifies style files and copies they to given destination path

``` js
cssFn.minifyCSS('temp/dist/styles.css', 'temp/dist');
// produces: a minified ./temp/dist/styles.min.css file
// NOTE: you can chain this with another Gulp Task
```

## HTMLFunctions

HTML Functions for you can easy manage Gulpfile.js build tasks for *.html* files. To use it, you can import it in your Gulpfile.js

``` js
const htmlFn = require('@ldu-devtools/gulpfunctions').htmlFn;
```

### minifyHTML

Minifies HTML files and copies they to given destination path

``` js
htmlFn.minifyHTML([
    'temp/dist/views/*.html',
    'temp/dist/pages/*.html'
], 'temp/dist');
// produces: minified .html files under ./temp/dist/views/*.html and ./temp/dist/pages/*.html
// NOTE: you can chain this with another Gulp Task
```

## JSFunctions

JS Functions for you can easy manage Gulpfile.js build tasks for *.js* files. To use it, you can import it in your Gulpfile.js

``` js
const jsFn = require('@ldu-devtools/gulpfunctions').jsFn;
```

### concatJS

Compiles and concats script files and copies they to given destination path

``` js
jsFn.concatJS('temp/*.ts', 'temp/dist');
// produces: a compiled and concatenated ./temp/dist/scripts.js file
// NOTE: you can chain this with another Gulp Task
```

### minifyJS

Minifies script files and copies they to given destination path

``` js
jsFn.minifyJS('temp/dist/scripts.js', 'temp/dist');
// produces: a minified ./temp/dist/scripts.min.js file
// NOTE: you can chain this with another Gulp Task
```

## PHPFunctions

PHP Functions for you can easy manage Gulpfile.js build tasks for *.php* files. To use it, you can import it in your Gulpfile.js

``` js
const phpFn = require('@ldu-devtools/gulpfunctions').phpFn;
```

### concatPHP

Concats PHP files and copies they to given destination path

``` js
phpFn.concatPHP('temp/*.php', 'temp/dist');
// produces: a compiled and concatenated ./temp/dist/includes.php file
// NOTE: you can chain this with another Gulp Task
```

### minifyPHP

Minifies PHP files and copies they to given destination path

``` js
phpFn.minifyPHP('temp/dist/includes.php', 'temp/dist');
// produces: a minified ./temp/dist/includes.min.php file
// NOTE: you can chain this with another Gulp Task
```

## Development

### Install

Installs all of the dependencies for this project

``` sh
npm install
```

### Build

Builds this project to the **dist** folder and creates a zip package from the dist content into the **build** folder

``` sh
gulp build
```

## Further Help

To get more informations about this project, or if you have any question or suggestion, please send an email to [me](mailto:info@lildutils.hu)

## 

Thanks :)
