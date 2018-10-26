/**
 * @file AngularJS application's module definition & bootstrap
 * @author Kazuyuki TAKASE <takase@plen.jp>
 * @copyright PLEN Project Company Inc, and all authors
 * @license The MIT License (See also : http://opensource.org/licenses/mit-license.php)
 */

import angular = require('angular');


export const APP_MODULE: string = 'RaspberryPiCloudGUI';
export const cloud_gui: ng.IModule = angular.module(APP_MODULE, []);

// @attention If you use Batarang, you should disable "strictDi" property.
angular.element(document).ready(() =>
{
    angular.bootstrap(document.body, [APP_MODULE], { strictDi: true });
});