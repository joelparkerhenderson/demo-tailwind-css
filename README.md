# Demo Tailwind CSS

See https://tailwindcss.com/

See https://tailwindui.com/

See [screenshot](README.png)


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


## Add Gulp, PostCSS, and Tailwind PostCSS plugin

Install development tooling:

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

gulp.task('css', function () {
  const postcss = require('gulp-postcss')
  return gulp.src('src/styles.css')
    .pipe(postcss([
      require('tailwindcss'),
      require('autoprefixer'),
      require('@tailwindcss/aspect-ratio'),
      require('@tailwindcss/forms'),
      require('@tailwindcss/line-clamp'),
      require('@tailwindcss/typography')
    ]))
    .pipe(gulp.dest('build/'))
})
```

Run:

```sh
npx gulp css
```

Verify the output file contains Tailwind CSS:

```sh
cat build/styles.css
```



## Add Tailwind plugins

Tailwind has a variety of optional plugins that we like to use.

Install:

```sh
npm install --save @tailwindcss/aspect-ratio
npm install --save @tailwindcss/forms
npm install --save @tailwindcss/line-clamp
npm install --save @tailwindcss/typography
```

Update the file `tailwind.config.js`:

module.exports = {
  //…
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/typography'),
    //…
  ],
}


### aspect-ratio

[@tailwindcss/aspect-ratio](https://www.npmjs.com/package/tailwindcss-aspect-ratio) : a plugin providing a composable API for giving elements a fixed aspect ratio.

Example configuration using file `tailwind.config.js`:

```js
module.exports = {
  theme: {
    aspectRatio: { 
      'none': 0,
      'square': [1, 1],
      'landscape': [16, 9],
      'portrait': [9, 16]
    },
  //…
}
```

Example that shows a square layout:

```html
<div class="aspect-ratio-square">
  Lorem ipsum …
</div>  
```


### forms

[@tailwindcss/forms](https://www.npmjs.com/package/@tailwindcss/forms) : a plugin that provides a basic reset for form styles that makes form elements easy to override with utilities.

Example that shows a rounded red checkbox:

```html
<input type="checkbox" class="rounded text-red-500" />
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


## Alpine JS

Alpine is a lightweight JavaScript library for UI/UX effects, such as showing and hiding a div.

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