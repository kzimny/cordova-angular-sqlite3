import { Subject, Observable } from 'rxjs';
import { CordovaEvent } from '../models/cordova.events';

export class CordovaService {

    private listeningSource: Subject<CordovaEvent> = new Subject<CordovaEvent>();
    cordovaEvent: Observable<CordovaEvent> = this.listeningSource.asObservable();

    isCordova = false;
    cordova: any;

    constructor() {
    }

    sendEvent(event: CordovaEvent): void {
        this.listeningSource.next(event);
    }
}
