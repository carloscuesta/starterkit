# Carlos Cuesta Starter Kit

A simple starterkit that I use to realize my front end static development projects. 

## Technologies 

- [**Gulp**](http://gulpjs.com) - Automate and enhance your workflow
- [**Jade**](http://jade-lang.com) - Terse language for writing HTML templates.
- [**SASS**](http://sass-lang.com) - CSS with superpowers.
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

## Features

- ```gulp```: Runs the **default task** including the following tasks :
- ```scss```: SCSS compiling to CSS.
- ```jade```: Jade compiling and rendering to HTML.
- ```scripts```: Scripts minification and concatenation in a single file.
- ```image```: Image compression.
- ```browser-sync```: Starts a server at ```./dist/``` with all your compiled files, looking for file changes and 

```gulp deploy```: 

If you want to use the **deploy** feature, you will have to edit the [gulpfile.js](https://github.com/carloscuesta/starterkit/blob/master/gulpfile.js#L48) lines between 48-54, the following properties [host](https://github.com/carloscuesta/starterkit/blob/master/gulpfile.js#L51),  [user](https://github.com/carloscuesta/starterkit/blob/master/gulpfile.js#L52) and [password](https://github.com/carloscuesta/starterkit/blob/master/gulpfile.js#L53) for your ftp ones.


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
│   ├── /img/                # Images non compressed.
│   ├── /jade/               # Templating Jade files.
│   │   └── _includes/       # Templating Jade partials.
│   ├── /scss/               # SCSS style files.
│   │   └── _includes/       # Templating SCSS partials.
└── gulpfile.js              # Gulp automatization file.
```

## License

The code is available under the [MIT](https://github.com/carloscuesta/starterkit/blob/master/LICENSE) license.