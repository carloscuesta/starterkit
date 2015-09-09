# Carlos Cuesta Starter Kit

A simple starterkit that I use to realize my front end development projects. 

## Technologies 

- [Gulp](http://gulpjs.com) - Automate and enhance your workflow
- [Jade](http://jade-lang.com) - Terse language for writing HTML templates.
- [SASS](http://sass-lang.com) - CSS with superpowers.
- [NodeJS](https://nodejs.org) - JavaScript runtime built on Chrome's V8 JavaScript engine.

## Use 

```bash
git clone https://github.com/carloscuesta/starterkit.git && cd starterkit/ && npm install
gulp 
```

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