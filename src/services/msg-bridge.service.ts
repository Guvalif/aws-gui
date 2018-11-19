/**
 * @file WebSocket Service
 * @author Kazuyuki TAKASE <takase@plen.jp>
 * @copyright PLEN Project Company Inc, and all authors
 * @license The MIT License (See also : http://opensource.org/licenses/mit-license.php)
 */

import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

import { cloud_gui } from '../app.module';


export class MessageBridgeService
{
    private _client$: WebSocketSubject<any>;

    public client_id: number = 0;

    static $inject: string[] = [];
    constructor()
    {
        this._client$ = webSocket('wss://raspberry-pi-cloud.herokuapp.com/msg-bridge');
    }

    send(content: any): void
    {
        this._client$.next(content);
    }

    messageObservable(): Observable<any>
    {
        return this._client$.asObservable()
            .pipe(
                filter<any>(x => x.sender === this.clientID()),
                map<any, any>(x =>
                {
                    var x_fixed = {
                        sender: x.sender,
                        target: x.target,
                        data: {
                            image: this.fixedURI(x.data.image),
                            sensor: this.fixedURI(x.data.sensor)
                        }
                    };

                    return x_fixed;
                })
            );
    }

    clientID(number_only = false): string
    {
        return ((number_only)? '' : 'raspberry-pi-') + `00${this.client_id}`.slice(-2);
    }

    fixedURI(uri: string): string
    {
        return `http://raspberry-pi-cloud-${this.clientID(true)}.s3-website-ap-northeast-1.amazonaws.com/${uri}`;
    }
};

export const SERVICE_NAME: string = 'MessageBridgeService';

cloud_gui.service(SERVICE_NAME, MessageBridgeService);