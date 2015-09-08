# Carlos Cuesta Starter Kit

A simple starterkit that I use to realize my front end development projects. 

## Technologies 

- [Gulp](http://gulpjs.com) - Automate and enhance your workflow
- [Jade](http://jade-lang.com) - Terse language for writing HTML templates.
- [SASS](http://sass-lang.com) - CSS with superpowers.

## Use 

```
git clone https://github.com/carloscuesta/starterkit.git 
cd starterkit/
gulp 
```

## Project Structure

```
.
├── /dist/                   # Minified, optimized and compiled files                
│   ├── /assets/             # Assets folder                        
│   │   ├── /css/            # CSS style files.            
│   │   ├── /files/          # Static files.         
│   │   │   └── img/         # Images folder.      
│   │   └── /js/             # JS files.      
│   └── index.html           # Rendered and compiled HTML from jade.                     
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

The code is available under the [MIT](https://github.com/carloscuesta/starterkit/blob/master/license.txt) license.