import { Component, OnInit, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, NgZone } from '@angular/core';
import { CordovaService } from 'src/services/cordova.service';
import { CordovaEvent, TUser } from 'src/models/index';

declare var cordova: any;  // <--declare "cordova"
declare var window: any;    // <--declare "window"

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [ CordovaService ]
})
export class AppComponent implements OnInit, AfterViewInit {

    title = 'cordova-angular-sqlite3';
    db: any = null;
    userList: TUser[];

    constructor(
        private cordovaService: CordovaService,
        private ngZone: NgZone,
        private cdRef: ChangeDetectorRef) { }

    ngOnInit(): void {
        console.log('OnInit test');
        this.userList = [];
    }

    ngAfterViewInit(): void {
        console.log('AfterViewInit');
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    }

    public onDeviceReady(): void {

        console.log('on device ready');
        // store "cordova" in a service
        this.cordovaService.cordova = cordova;
        // store in a variable in a service if I'm in cordova or not
        this.cordovaService.isCordova = true;

        cordova.getAppVersion.getVersionNumber().then(version => {
            console.log(version);
        });

        window.sqlitePlugin.echoTest(function() {
            console.log('ECHO test OK');
          });

        // we can control the 'pause','resume',backbutton...
        document.addEventListener('pause', this.onPause.bind(this), false);
        document.addEventListener('resume', this.onResume.bind(this), false);
        document.addEventListener('backbutton', this.onBackKeyDown.bind(this), false);

        // initialize database
        this.initDataBase();

        // get users
        this.getUsers();
      }

    public onPause(): void {
        console.log('onpause');
        this.cordovaService.sendEvent(CordovaEvent.Pause);
    }

    public onResume(): void {
        console.log('on resume');
        this.cordovaService.sendEvent(CordovaEvent.Resume);
    }

    public onBackKeyDown(e: any): void {
        console.log('on backbutton');
        this.cordovaService.sendEvent(CordovaEvent.BackButton);
        e.preventDefault();
        e.stopPropagation();
    }

    private initDataBase() {
        this.db = window.sqlitePlugin.openDatabase({name: 'database.db', location: 'default'});
        this.db.transaction(transaction => {
            const sql =
            'create table TUser(ID_User INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, ' +
            'FirstName VARCHAR NOT NULL, ' +
            'LastName VARCHAR NOT NULL, ' +
            'CONSTRAINT UQ_PK_TUser UNIQUE (ID_User))';
            transaction.executeSql(sql);
        });
    }

    public getUsers(): void {
        if (this.db) {
        // **
            this.db.transaction(
                trx => {
                    trx.executeSql('select ID_User, FirstName, LastName from TUser', [],
                    (ignored: any, resultSet: any) => {
                        console.log('records: ' + resultSet.rows.length);
                        const data = [];

                        for (let index = 0; index < resultSet.rows.length; index++) {
                            data.push(
                                {
                                    ID_User: resultSet.rows.item(index).ID_User,
                                    FirstName: resultSet.rows.item(index).FirstName,
                                    LastName: resultSet.rows.item(index).LastName
                                } );
                        }
                        this.ngZone.run(() => {
                            this.userList = data;
                            this.cdRef.markForCheck();
                        });
                    });
                },
                (error: any) => {
                    console.log('select error: ' + error.message);
                });
        // **
        }
    }

    public addUser(): void {
        if (this.db) {
        // **
            this.db.transaction(
                trx => {
                    trx.executeSql('insert into TUser(FirstName, LastName) values(?,?)', ['First', 'Last']);
                },
                error => {
                    console.log('INSERT error: ' + error.message);
                },
                () => {
                    console.log('INSERT OK');
                    this.getUsers();
                });
        // **
        }
    }

    public deleteAllUsers(): void {
        if (this.db) {
        // **
            this.db.transaction(
                trx => {
                    trx.executeSql('delete from TUser');
                    trx.executeSql('delete from sqlite_sequence where name=\'TUser\'');
                },
                error => {
                    console.log('DELETE error: ' + error.message);
                },
                () => {
                    console.log('DELETE OK');
                    this.getUsers();
                });
        // **
        }
    }
}
