/**
 * @file Image viewer component
 * @author Kazuyuki TAKASE <takase@plen.jp>
 * @copyright PLEN Project Company Inc, and all authors
 * @license The MIT License (See also : http://opensource.org/licenses/mit-license.php)
 */

import { cloud_gui } from '../app.module';
import MBS = require('../services/msg-bridge.service');


const view: string = `
<img id="display" ng-src="{{ $ctrl.vm_src }}">
`;

class Controller
{
    public vm_src: string = './assets/img/color-bar.png';

    static $inject: string[] = [
        MBS.SERVICE_NAME
    ];
    constructor(mbs: MBS.MessageBridgeService)
    {
        mbs.messageObservable()
            .subscribe(
                x => this.vm_src = x.data.image,
                e => console.log(e)
            );
    }
};

const COMPONENT_NAME: string = 'display';

const COMPONENT_DEFINITION = {
    bindings: {},
    template: view,
    controller: Controller
};

cloud_gui.component(COMPONENT_NAME, COMPONENT_DEFINITION);