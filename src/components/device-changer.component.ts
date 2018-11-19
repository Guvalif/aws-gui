/**
 * @file Device changer component
 * @author Kazuyuki TAKASE <takase@plen.jp>
 * @copyright PLEN Project Company Inc, and all authors
 * @license The MIT License (See also : http://opensource.org/licenses/mit-license.php)
 */

import { cloud_gui } from '../app.module';
import MBS = require('../services/msg-bridge.service');


const view: string = `
<div id="device-changer">
  <b>IoT Device ID: </b>
  <input
    type="input" ng-change="$ctrl.onChange()" ng-model="$ctrl.vm_id"
  >
</div>
`;

class Controller
{
    public vm_id: number = 0;

    static $inject: string[] = [
        MBS.SERVICE_NAME
    ];
    constructor(private mbs: MBS.MessageBridgeService)
    {
        // No opeartions.
    }

    onChange(): void
    {
        this.mbs.client_id = this.vm_id;
    }
};

const COMPONENT_NAME: string = 'deviceChanger';

const COMPONENT_DEFINITION = {
    bindings: {},
    template: view,
    controller: Controller
};

cloud_gui.component(COMPONENT_NAME, COMPONENT_DEFINITION);