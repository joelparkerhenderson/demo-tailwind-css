# Demo Tailwind CSS

<img src="README.png" alt="Objective" style="width: 100%;"/>

This is a demonstration of 
[Tailwind CSS](https://tailwindcss.com/), 
[Gulp.js](https://gulpjs.com/), 
[Alpine.js](https://alpinejs.dev/), 
and more.

Contents:

* [Introduction](#introduction)
* [Setup](#setup)
* [Add Tailwind](#add-tailwind)
* [Add Tailwind directives](#add-tailwind-directives)
* [Run Tailwind CLI](#run-tailwind-cli)
* [View Tailwind using HTML](#view-tailwind-using-html)
* [Add Tailwind plugins](#add-tailwind-plugins)
* [Add Gulp, PostCSS, and workflow tooling](#add-gulp-postcss-and-workflow-tooling)
* [Alpine JS](#alpine-js)
* [Maintenance](#maintenance)


## Introduction

This is a demonstration of:

* [Tailwind CSS](https://tailwindcss.com/) utility-first style framework

* [Gulp.js](https://gulpjs.com/) toolkit to automate workflows

* [Alpine.js](https://alpinejs.dev/) minimal framework for DOM updates

Tailwind, Gulp, and Alpine all have excellent documentation areas, and we suggest you read them. This page is our work to show how all of these relate and work together to create HTML pages and CSS styles.


## Setup

If you're new to Node, Gulp, or PostCSS, then you may want to first read our demo of these: [demo-gulp-postcss-autoprefixer](https://github.com/joelparkerhenderson/demo-gulp-postcss-autoprefixer)

Create the project:

```sh
mkdir demo
cd demo
git init
curl https://github.com/github/gitignore/blob/master/Node.gitignore -o .gitignore
npm init -y
```

Create any directory names you want for your input source files and output distribution files:

```sh
mkdir src
mkdir dist
```


## Add Tailwind

Install Tailwind and its peer autoprefixer:

```sh
npm install --save-dev tailwindcss@^3.0.24
npm install --save-dev autoprefixer@^10.4.4
```

Initialize:

```sh
npx tailwindcss init
```

Output:

```sh
Created Tailwind CSS config file: tailwind.config.js
```

File `tailwind.config.js` is:

```js
module.exports = {
  content: [],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

Edit to add content:

```js
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
  },
  plugins: [],
}
```



## Add Tailwind directives

Create file `src/style.css` and add Tailwind directives:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```


## Run Tailwind CLI

For simple projects you can use the Tailwind CLI tool to process your CSS.

Use the `-i` input option and `-o` output option:

```sh
npx tailwindcss -i ./src/style.css -o ./dist/style.css --watch
```

Verify the output file contains Tailwind CSS:

```sh
cat dist/style.css
```


## View Tailwind using HTML

Create a demonstration HTML file, such as file `src/demo.html`, with some demo code, such as red text:

```html
<!doctype html>
<html>
    <head>
        <base href="">
        <meta charset="UTF-8">
        <title>Demo Tailwind CSS</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="style.css">
    </head>
    <body>
        <p class="text-3xl font-bold underline">This is a demo.</p>
    </body>
</html>
```

If you prefer, use the demo file in this repo:

* [src/demo.html](src/demo.html)

Copy the demo file from the source diretory to the distribution directory, such as:

```sh
cp src/demo.html dist/demo.html
```

You can open the file in any typical web browser. You will 
We will automate the workflow next.


## Add Tailwind plugins

Tailwind has a variety of optional plugins that we like to use.

Install:

```sh
npm install --save-dev @tailwindcss/forms
npm install --save-dev @tailwindcss/typography
```

Update the file `tailwind.config.js`:

```js
module.exports = {
  //…
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    //…
  ],
}
```

See the demo file with HTML code that uses the plugins as described below:

* [src/demo-plugins.html](src/demo-plugins.html)

[@tailwindcss/forms](https://www.npmjs.com/package/@tailwindcss/forms) is a plugin that provides a basic reset for form styles that makes form elements easy to override with utilities, for example:

```html
<form>
  <input type="checkbox" class="rounded-full text-red-500" />
</form>
```

[@tailwindcss/typography](https://www.npmjs.com/package/@tailwindcss/typography) is a plugin that provides a set of prose classes you can use to add beautiful typographic defaults to any vanilla HTML you don't control (like HTML rendered from Markdown, or pulled from a CMS), for example:

```html
<article class="prose lg:prose-xl">
  <h1>Lorum ipsum</h1>
  <p>Dolor sit amet.</p>
  <p>Consectetur adipiscing elit.</p>
</article>
```


## Install Gulp 4

<https://gulpjs.com>

Gulp is toolkit to automate & enhance your workflow. You can leverage gulp and
the flexibility of JavaScript to automate slow, repetitive workflows and compose
them into efficient build pipelines.

Install Gulp into the project:

```sh
npm install --save-dev gulp@4
```

Create file `gulpfile.js` with this:

```js
function defaultTask(cb) {
  // place code for your default task here
  cb();
}

exports.default = defaultTask
```

If you ever want to use Gulp promises with private functions:

```sh
npm install --save-dev gulp-all
```


## Install Gulp CLI 2

Gulp CLI is the Gulp command line interface tool. We prefer to install Gulp CLI globally

Install Gulp CLI:

```sh
npm install --global gulp-cli@2
```

Verify Gulp is working by running:

```sh
gulp
```

You should see output that shows Gulp diagnostics.


## Create Gulp tasks

Edit file `gulpfile.js` and add these typical tasks:

```js
const gulp = require('gulp');

function css(cb) {
  gulp
    .src('./src/**/*.css')
    .pipe(gulp.dest('dist/'));
  cb();
}

function html(cb) {
  gulp
    .src('./src/**/*.html')
    .pipe(gulp.dest('dist/'));
  cb();
}

exports.css = gulp.series(css);
exports.html = gulp.series(html);

exports.build = gulp.parallel(css, html);
exports.default = gulp.parallel(css, html);
```

Run this to verify:

```sh
gulp
```

You should see output that shows Gulp calling the tasks 'css' and 'html':

```sh
Using gulpfile …/gulpfile.js
Starting 'default'...
Starting 'css'...
Starting 'html'...
Finished 'css' after 3.86 ms
Finished 'html' after 6 ms
Finished 'default' after 15 ms
```

Remove any existing distribution files:

```sh
rm dist/*
```

Run:

```sh
npx gulp
```

Verify the distribution directory includes the style CSS file and demo HTML file:

```sh
ls dist
```

Output:

```sh
index.html
style.css
```


## Add PostCSS

PostCSS is a post-processor for cascading style sheets.

Install:

```sh
npm install --save-dev gulp-postcss@^9.0.1
```

If you also want the PostCSS command line interface:

```sh
npm install --save-dev postcss-cli@^8.3.1
```

Edit `gulpfile.js` to replace the function `css` with this:

```js
function css(cb) {
  const postcss = require('gulp-postcss')
  gulp
    .src('./src/**/*.css')
    .pipe(postcss([
      require('tailwindcss'),
      require('autoprefixer'),
      require('@tailwindcss/forms'),
      require('@tailwindcss/typography')
    ]))
    .pipe(gulp.dest('dist/'));
  cb();
}
```

Run:

```sh
npx gulp
```

Verify the distribution style.css file has a bunch of Tailwind code in it:

```sh
cat dist/style.css
```

Output:

```text
/*
! tailwindcss v3.0.24 | MIT License | https://tailwindcss.com
*/
…
```

## Add logging (optional)

We like to use logging in our projects, in order to help with diagnostics, troubleshooting, etc.

For simple logging, we like the use the `pino` package.

Install:

```sh
npm install --save-dev pino
```

Edit `gulpfile.js` and add:

```js
const logger = require('pino')()
logger.info('Gulp and pino are working...');
```

Run:

```sh
npx gulp
```

You should see output that includes the logger info.


## Add workflow tooling

Install:

```sh
npm install --save-dev npm-check-updates
```


## Alpine JS

Alpine is a lightweight JavaScript library for UI/UX effects, such as showing and hiding a div.

See https://alpinejs.dev/

Alpine is optional. We like it because it helps with effects, and is lighter than jQuery, and easy to add to HTML.

Install Alpine JS:

```sh
npm install --save-dev alpinejs@^3.10.1
```

To use Alpine via CDN, one way is to add this to your HTML `<head>` section:

```html
<script src="//unpkg.com/alpinejs" defer></script>
```

Example to show or hide a div:

```html
<div @click.away="open = false" x-data="{ open: false }">
    <div>
        <button @click="open = !open">
            Hello
        </button>
    </div>
    <div x-show="open">
        World
    </div>
</div>
```


## Maintenance


Update:

```sh
npm audit fix
npm --save update
npx browserslist@latest --update-db
```

Upgrade:

```sh
npx npm-check-updates --upgrade 
```

Redo:

```sh
rm package-lock.json 
rm -rf node_modules 
npm cache clean --force t
npm install
```