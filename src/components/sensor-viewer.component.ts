/**
 * @file Sensor value viewer component
 * @author Kazuyuki TAKASE <takase@plen.jp>
 * @copyright PLEN Project Company Inc, and all authors
 * @license The MIT License (See also : http://opensource.org/licenses/mit-license.php)
 */

import { flatMap, filter } from 'rxjs/operators';

import { cloud_gui } from '../app.module';
import MBS = require('../services/msg-bridge.service');


const view: string = `
<div id="sensor-viewer">
  <div class="sensor-viewer-element">Light: {{ $ctrl.vm_json.light }}</div>
  <div class="sensor-viewer-element">Thermo: {{ $ctrl.vm_json.thermo }}</div>
  <div class="sensor-viewer-element">Volume: {{ $ctrl.vm_json.volume }}</div>
  <div class="sensor-viewer-element">Motion: {{ $ctrl.vm_json.motion }}</div>
</div>
`;

class Controller
{
    public vm_json: any = {
        light: '---',
        thermo: '---',
        volume: '---',
        motion: '---'
    };

    static $inject: string[] = [
        '$http',
        MBS.SERVICE_NAME
    ];
    constructor($http: ng.IHttpService, mbs: MBS.MessageBridgeService)
    {
        mbs.messageObservable()
            .pipe(
                filter<any>(x => location.href.indexOf(mbs.clientID(true)) !== -1),
                flatMap<any, any>(x => $http.get(x.data.sensor))
            )
            .subscribe(
                x => this.vm_json = x.data,
                e => console.log(e)
            );
    }
};

const COMPONENT_NAME: string = 'sensorViewer';

const COMPONENT_DEFINITION = {
    bindings: {},
    template: view,
    controller: Controller
};

cloud_gui.component(COMPONENT_NAME, COMPONENT_DEFINITION);