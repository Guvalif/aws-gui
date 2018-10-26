/**
 * @file MQTT over WebSocket Service
 * @author Kazuyuki TAKASE <takase@plen.jp>
 * @copyright PLEN Project Company Inc, and all authors
 * @license The MIT License (See also : http://opensource.org/licenses/mit-license.php)
 */

import { Observable, Subject } from 'rxjs';
import moment = require('moment');
import Paho = require('paho-mqtt');

import Sv4 = require('../models/sig-v4-utils');
import { IAWSConfig, AWS_CONFIG, MQTT_TOPIC } from '../models/aws-config';
import { cloud_gui } from '../app.module';


export class MQTTBridgeService
{
    private _client: Paho.Client;
    private _message_subject$: Subject<JSON>;

    static $inject: string[] = [];
    constructor()
    {
        const websocket_endpoint = this.webSocketEndPoint(AWS_CONFIG);
        const client_id          = this.uniqueID('raspberry-pi-cloud-gui');

        this._client = new Paho.Client(websocket_endpoint, client_id);

        this._client.connect({
            useSSL: true,
            timeout: 3,
            mqttVersion: 4,
            onSuccess: () => this._client.subscribe(MQTT_TOPIC)
        });

        this._client.onMessageArrived = (message: Paho.Message) =>
        {
            try {
                const json = JSON.parse(message.payloadString);

                this._message_subject$.next(json);
            }
            catch (e)
            {
                console.log(e);
            }
        };

        this._client.onConnectionLost = e => console.log(e);

        this._message_subject$ = new Subject<any>();
    }

    private webSocketEndPoint(aws_config: IAWSConfig): string
    {
        const utc  = moment.utc();
        const date = utc.format('YYYYMMDD');

        const amazon_date   = `${date}T${utc.format('HHmmss')}Z`;
        const service       = 'iotdevicegateway';
        const algorithm     = 'AWS4-HMAC-SHA256';
        const method        = 'GET';
        const canonical_uri = '/mqtt';

        const scope = `${date}/${aws_config.region}/${service}/aws4_request`;

        const canonical_query = [
            'X-Amz-Algorithm=AWS4-HMAC-SHA256',
            `&X-Amz-Credential=${encodeURIComponent(`${aws_config.access_id}/${scope}`)}`,
            `&X-Amz-Date=${amazon_date}`,
            '&X-Amz-SignedHeaders=host'
        ].join('');

        const canonical_header = `host:${aws_config.endpoint}`;

        const canonical_request = [
            method,
            canonical_uri,
            canonical_query,
            canonical_header,
            '',
            'host',
            ''
        ].join('\n') + Sv4.sha256('');

        const request = [
            algorithm,
            amazon_date,
            scope,
            ''
        ].join('\n') + Sv4.sha256(canonical_request);

        const signature_key = Sv4.signatureKey(aws_config.access_key, date, aws_config.region, service);

        const signature = Sv4.sign(signature_key, request);

        return `wss://${aws_config.endpoint}${canonical_uri}?${canonical_query}&X-Amz-Signature=${signature}`;
    }

    private uniqueID(prefix: string): string
    {
        const unique_id = `000000000000${Math.round(Math.random() * 999999999999)}`.slice(-12);

        return `${prefix}-${unique_id}`;
    }

    send(content: string): void
    {
        let message = new Paho.Message(content);

        message.destinationName = MQTT_TOPIC;

        this._client.send(message);
    }

    messageObservable(): Observable<any>
    {
        return this._message_subject$.asObservable();
    }
};

export const SERVICE_NAME: string = 'MQTTBridgeService';

cloud_gui.service(SERVICE_NAME, MQTTBridgeService);