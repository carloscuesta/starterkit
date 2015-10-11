# Carlos Cuesta Starter Kit

[![Dependency Status](https://img.shields.io/david/dev/carloscuesta/starterkit.svg?style=flat-square)](https://david-dm.org/carloscuesta/starterkit#info=devDependencies)
[![GitHub release](https://img.shields.io/github/release/carloscuesta/starterkit.svg?style=flat-square)](https://github.com/carloscuesta/starterkit/releases)

<p align="center">
	<img src="https://cloud.githubusercontent.com/assets/7629661/9838465/89626e74-5a5e-11e5-9b7d-e0ce76856732.gif" alt="Carlos Cuesta Starterkit"/>
</p>

> A simple starterkit that I use to realize my front end static development projects. If you have comments or suggestions feel free to give me a shout on [Twitter](http://twitter.com/crloscuesta)!

## Technologies 

- [**Gulp**](http://gulpjs.com) - Automate and enhance your workflow
- [**Jade**](http://jade-lang.com) - Terse language for writing HTML templates.
- [**SASS**](http://sass-lang.com) - CSS with superpowers.
- [**Babel**](https://babeljs.io) - Use next generation JavaScript, today (ES5 => ES6).
- [**NodeJS**](https://nodejs.org) - JavaScript runtime built on Chrome's V8 JavaScript engine.

## Requirements and Use 

### Requirements

- [Node.js](https://nodejs.org/en/)
- [Gulp](http://gulpjs.com)

```bash
$ npm install -g gulp
```

### Use 

```bash
$ git clone https://github.com/carloscuesta/starterkit.git
$ cd starterkit/ && npm install
$ gulp 
```

## Tasks

```gulp```: Runs the **default task** including the following ones :

- ```styles```: SCSS compiling to CSS, css minification and autoprefixing.
- ```templates```: Jade compiling and rendering to HTML.
- ```scripts```: ES6 to ES5 with babel, scripts minification and concatenation into a single file.
- ```images```: Image compression.
- ```browser-sync```: Starts a server at ```./dist/``` with all your compiled files, looking for file changes and injecting them into your browser.
- ```beautify```: Beautify your preproduction files at ```./dist/```.

```gulp optimize```: Optimizes your project using [uncss](https://github.com/giakki/uncss) (removes unused css).

```gulp deploy```: Deploy your ```dist``` folder into your server.

If you want to use the **deploy** task, you will have to edit the [```gulpfile.js```](https://github.com/carloscuesta/starterkit/blob/master/gulpfile.js#L50) lines between 52-56 with your ftp connection info: [```host```](https://github.com/carloscuesta/starterkit/blob/master/gulpfile.js#L53) | [```user```](https://github.com/carloscuesta/starterkit/blob/master/gulpfile.js#L54) | [```password```](https://github.com/carloscuesta/starterkit/blob/master/gulpfile.js#L55)

Once you setup ```ftpCredentials```, you will have to choose a directory of your server where the deploy will go: [```ftpUploadsDir```](https://github.com/carloscuesta/starterkit/blob/master/gulpfile.js#L46)

Now you will be able to use ```gulp deploy``` and your ```/dist/``` folder will go up to your ftp server!


## Project Structure

```
.
├── /dist/                   # Minified, optimized and compiled files.
│   ├── /assets/             # Assets folder.
│   │   ├── /css/            # CSS style files.
│   │   ├── /files/          # Static files.
│   │   │   └── img/         # Images folder.
│   │   └── /js/             # JS files.
│   └── *.html               # Rendered and compiled HTMLs from jade.
├── /node_modules/           # Node modules dependencies and packages.
├── /src/                    # Source files.
│   ├── /images/             # Images non compressed.
│   ├── /scripts/            # JavaScript files.
│   ├── /styles/             # SCSS style files.
│   │   └── _includes/       # Styles SCSS partials.
│   ├── /templates/          # Templating Jade files.
│   │   └── _includes/       # Templating Jade partials.
└── gulpfile.js              # Gulp automatization file.
```

## Demo

![starterkit-terminal](https://cloud.githubusercontent.com/assets/7629661/10411914/803cb756-6f75-11e5-82c3-b0832b425b77.gif)

## License

The code is available under the [MIT](https://github.com/carloscuesta/starterkit/blob/master/LICENSE) license.
