/**
 * @file Servo angle changer component
 * @author Kazuyuki TAKASE <takase@plen.jp>
 * @copyright PLEN Project Company Inc, and all authors
 * @license The MIT License (See also : http://opensource.org/licenses/mit-license.php)
 */

import { cloud_gui } from '../app.module';
import MBS = require('../services/msg-bridge.service');


const view: string = `
<input
  id="servo-slider"
  type="range" min="25" max="125" step="5"
  ng-change="$ctrl.onChange()" ng-model="$ctrl.vm_pwm"
>
`;

class Controller
{
    public vm_pwm: number = 75;

    static $inject: string[] = [
        MBS.SERVICE_NAME
    ];
    constructor(private mbs: MBS.MessageBridgeService)
    {
        // No opeartions.
    }

    onChange(): void
    {
        this.mbs.send({
            sender: 'raspberry-pi-cloud-gui',
            target: this.mbs.clientID(),
            data: this.vm_pwm
        });
    }
};

const COMPONENT_NAME: string = 'servoSlider';

const COMPONENT_DEFINITION = {
    bindings: {},
    template: view,
    controller: Controller
};

cloud_gui.component(COMPONENT_NAME, COMPONENT_DEFINITION);