# CordovaAngularSqlite3

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.0.1.

## Clone project from git

Run `npm install @angular/cli -g`

Run `npm install cordova -g`

Run `git clone https://github.com/kzimny/cordova-angular-sqlite3.git`

Run `cordova platform add android`

Run `npm run build-run-android`


## Create project from scratch

Run `npm install @angular/cli -g`

Run `npm install cordova -g`

Run `ng new cordova-angular-sqlite3`

Run `cd cordova-angular-sqlite3`

Run `npm install sqlite3 --save`

Add folders: hooks, plugins, platforms and www

Copy config.xml from cordova project into cordova-angular-sqlite3 folder

Add cordova section to package.json:

`
    "cordova": {
        "plugins": {
        },
        "platforms": [
        ]
    }
`

Add two scripts to package.json:

`
	"scripts": {
	"cordova-android": "cordova run android",
	"build-run-android": "npm run build && npm run cordova-android"
	}
`

Change the compiler options in tsconfig.json as follow:
`
	{
		"compileOnSave": false,
		"compilerOptions": {
			"baseUrl": "./",
			"outDir": "./dist/out-tsc",
			"sourceMap": true,
			"declaration": false,
			"module": "es2015",	<<<<<<<<<<<<<<<<<<<<<<<<<<
			"moduleResolution": "node",
			"emitDecoratorMetadata": true,
			"experimentalDecorators": true,
			"importHelpers": true,
			"target": "es5", <<<<<<<<<<<<<<<<<<<<<<<<<<<<<
			"typeRoots": [
			  "node_modules/@types"
			],
			"lib": [
			  "es2018",
			  "dom"
			]
		}
	}

`

Run `cordova platform add android`

Run `cordova plugin add cordova-plugin-device`

Run `cordova plugin add cordova-sqlite-storage`

Run `cordova plugin add cordova-plugin-app-version`

Change the outputPath in angular.json from `dist/cordova-angular-sqlite3` to `www`:

`
    "options": {
        "outputPath": "www"
    }
`
Add cordova script reference after the <app-root></app-root> selector of src/index.html as follow:
`
    <body>
        <app-root></app-root>
        <script type="text/javascript" src="cordova.js"></script>
    </body>
`

Change base path in src/index.html file to:
`
	<base href="./">
`

Start your Android emulator

Run `npm run build-run-android`
