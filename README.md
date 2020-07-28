# Demo Tailwind CSS

See https://tailwindcss.com/

See https://tailwindui.com/


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

Create any directory names you want for your source files and destination files:

```sh
mkdir src
mkdir build
```


## Add Tailwind

Install:

```sh
npm install tailwindcss
```

Initialize:

```sh
npx tailwindcss init
```

```sh
   tailwindcss 1.4.6
  
   ✅ Created Tailwind config file: tailwind.config.js
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

For simple projects or for just giving Tailwind a spin, you can use the Tailwind CLI tool to process your CSS:

```sh
npx tailwindcss build src/styles.css -o build/output.css
```

```sh
   tailwindcss 1.4.6
  
   🚀 Building... src/styles.css
  
   ✅ Finished in 2.24 s
   📦 Size: 1.79MB
   💾 Saved to build/output.css
```


## Add Gulp, PostCSS, and Tailwind PostCSS plugin

Install:

```sh
npm install --save-dev gulp-cli
npm install --save-dev gulp
npm install --save-dev gulp-postcss 
npm install --save-dev autoprefixer 
```

Create `gulpfile.js`:

```js
const gulp = require('gulp');

gulp.task('css', function () {
  const postcss = require('gulp-postcss')
  return gulp.src('src/styles.css')
    .pipe(postcss([
      require('tailwindcss'),
      require('autoprefixer'),
    ]))
    .pipe(gulp.dest('dist/'))
})
```

Run:

```sh
npx gulp css
```

Verify the results contain any kind of Tailwind text, such as:

```sh
grep -m1 Tailwind build/styles.css
```

```css
 * Tailwind custom reset styles
```
