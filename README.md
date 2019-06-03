# Cordova + Angular 8 + Sqlite3 + cordova-sqlite-storage

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.0.1.

### <a name="clonegit"></a>Clone project from git

Run `npm install @angular/cli -g`

Run `npm install cordova -g`

Run `git clone https://github.com/kzimny/cordova-angular-sqlite3.git`

Run `cordova platform add android`

Run `npm run build-run-android`


### <a name="scratch"></a>Create project from scratch

Run `npm install @angular/cli -g`

Run `npm install cordova -g`

Run `ng new cordova-angular-sqlite3`

Run `cd cordova-angular-sqlite3`

Run `npm install sqlite3 --save`

Add folders: hooks, plugins, platforms and www

Copy config.xml from cordova project into cordova-angular-sqlite3 folder

```xml
<?xml version='1.0' encoding='utf-8'?>
<widget id="com.example.xyz" version="1.0.0" xmlns="http://www.w3.org/ns/widgets" xmlns:cdv="http://cordova.apache.org/ns/1.0">
    <name>ClassroomViewer</name>
    <description>
		Project combines cordova, angular, sqlite3 and cordova-sqlite-storage.
    </description>
    <author email="info@znf.ch" href="https://www.znf.ch">
        Krzysztof Zimny, ZNF GmbH
    </author>
    <content src="index.html" />
    <access origin="*" />
    <allow-intent href="http://*/*" />
    <allow-intent href="https://*/*" />
    <allow-intent href="tel:*" />
    <allow-intent href="sms:*" />
    <allow-intent href="mailto:*" />
    <allow-intent href="geo:*" />
    <platform name="android">
        <allow-intent href="market:*" />
    </platform>
    <platform name="ios">
        <allow-intent href="itms:*" />
        <allow-intent href="itms-apps:*" />
    </platform>
    <plugin name="cordova-plugin-whitelist" spec="^1.3.3" />
</widget>
```

Add cordova section to package.json:

```
    "cordova": {
        "plugins": {
        },
        "platforms": [
        ]
    }
```

Add two scripts to package.json:

```
	"scripts": {
	"cordova-android": "cordova run android",
	"build-run-android": "npm run build && npm run cordova-android"
	}
```

Change the compiler options in tsconfig.json as follow:

```
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
```

Run `cordova platform add android`

Run `cordova plugin add cordova-plugin-device`

Run `cordova plugin add cordova-sqlite-storage`

Run `cordova plugin add cordova-plugin-app-version`

Change the outputPath in angular.json from `dist/cordova-angular-sqlite3` to `www`:

```
    "options": {
        "outputPath": "www"
    }
```

Add cordova script reference after the <app-root></app-root> selector of src/index.html as follow:

```
    <body>
        <app-root></app-root>
        <script type="text/javascript" src="cordova.js"></script>
    </body>
```

Change base path in src/index.html file to:

```
	<base href="./">
```

Start your Android emulator

Run `npm run build-run-android`

Finally the app should work as follow:

![Alt Text](https://github.com/kzimny/cordova-angular-sqlite3/blob/master/20190603_145238.gif)
