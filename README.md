# Demo Tailwind CSS

<img src="README.png" alt="Objective" style="width: 100%;"/>

Demonstration of:

* [Tailwind CSS](https://tailwindcss.com/) utility-first style framework

* [Tailwind UI](https://tailwindui.com/) collection of UI components

* [Gulp.js](https://gulpjs.com/) toolkit to automate workflows

* [Alpine.js](https://alpinejs.dev/) minimal framework for DOM updates


## Setup


### Create a project

If you're new to Node, Gulp, or PostCSS, then first see [demo_gulp_postcss_autoprefixer](https://github.com/joelparkerhenderson/demo_gulp_postcss_autoprefixer)

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
mkdir build
```

Create the project:

```sh
mkdir demo
cd demo
git init
curl https://github.com/github/gitignore/blob/master/Node.gitignore -o .gitignore
npm init -y
```

Create any directory names you want for your input source files and output build files:

```sh
mkdir src
mkdir build
```


## Add Tailwind


Install Tailwind and its peer autoprefixer:

```sh
npm install --save tailwindcss@^2
npm install --save autoprefixer@^10
```

Initialize:

```sh
npx tailwindcss init
```

Output:

```sh
Created Tailwind CSS config file: tailwind.config.js
```

File:

```js
module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
```


## Add Tailwind directives


Create `src/styles.css` and add Tailwind directives:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

h1 {
    color: red;
}
```


## Run Tailwind CLI

For simple projects you can use the Tailwind CLI tool to process your CSS.

Use the `-i` input option and `-o` output option:

```sh
npx tailwindcss build -i src/styles.css -o build/styles.css
```

Verify the output file contains Tailwind CSS:

```sh
cat build/styles.css
```


## Create HTML

Create a demonstration HTML file, such as `src/demo.html`, with some demo code, such as red text:

```html
<html>
    <head>
        <title>Demo Tailwind CSS</title>
        <link rel="stylesheet" href="styles.css">
    </head>
    <body>
        <p class="text-red-500">This is a demo.</p>
    </body>
</html>
```

Copy the file to the output build directory, such as:

```sh
cp src/demo.html build/demo.html
```

You can open the file in any typical web browser. You will 
We will automate the workflow next.


## Add Tailwind plugins

Tailwind has a variety of optional plugins that we like to use.

Install:

```sh
npm install --save @tailwindcss/forms
npm install --save @tailwindcss/line-clamp
npm install --save @tailwindcss/typography
```

Update the file `tailwind.config.js`:

module.exports = {
  //…
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/typography'),
    //…
  ],
}

Demo plugins HTML file that shows code as described below:

* [demo-plugins.html](demo-plugins.html)


### forms

[@tailwindcss/forms](https://www.npmjs.com/package/@tailwindcss/forms) : a plugin that provides a basic reset for form styles that makes form elements easy to override with utilities.

Example that shows a rounded red checkbox:

```html
<form>
  <input type="checkbox" class="rounded text-red-500" />
</form>
```


### line-clamp

[@tailwindcss/line-clamp](https://www.npmjs.com/package/@tailwindcss/line-clamp) :a plugin that provides utilities for visually truncating text after a fixed number of lines.

Example that shows a maximum of two lines of text:

```html
<p class="line-clamp-2">
  Lorem ipsum with lots more text …
</p>
```


### typography

[@tailwindcss/typography](https://www.npmjs.com/package/@tailwindcss/typography) : a plugin that provides a set of prose classes you can use to add beautiful typographic defaults to any vanilla HTML you don't control (like HTML rendered from Markdown, or pulled from a CMS).

Example that show the `prose` class that adds sensible styles:

```html
<article class="prose lg:prose-xl">
  <h1>Lorum ipsum</h1>
  <p>Dolor sit amet.</p>
  <p>Consectetur adipiscing elit.</p>
</article>
```


## Add Gulp, PostCSS, and workflow tooling


Install:

```sh
npm install --save-dev gulp
npm install --save-dev gulp-all
npm install --save-dev gulp-cli
npm install --save-dev gulp-postcss
npm install --save-dev pino
npm install --save-dev npm-check-updates
```

Create `gulpfile.js`:

```js
const logger = require('pino')()
const fs = require('fs');
const gulp = require('gulp');
const gulp_all = require('gulp-all')
logger.info('Gulp...');

gulp.task('default', ['css', 'html']);

gulp.task('css', function () {
  const postcss = require('gulp-postcss')
  return gulp.src('./src/**/*.css')
    .pipe(postcss([
      require('tailwindcss'),
      require('autoprefixer'),
      require('@tailwindcss/forms'),
      require('@tailwindcss/line-clamp'),
      require('@tailwindcss/typography')
    ]))
    .pipe(gulp.dest('build/'))
})

gulp.task('html', function() {
    return gulp.src('./src/**/*.html')
      .pipe(gulp.dest('build/'))
});
```

Remove any existing build files:

```sh
rm build/*
```

Run:

```sh
npx gulp
```

Verify the output build directory includes the styles CSS file and demo HTML file:

```sh
cat build/styles.css
cat build/demo.html
```


## Alpine JS

Alpine is a lightweight JavaScript library for UI/UX effects, such as showing and hiding a div.

See https://alpinejs.dev/

Alpine is optional. We like it because it helps with effects, and is lighter than jQuery, and easy to add to HTML.

Install Alpine JS:

```sh
npm install --save-dev alpinejs
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