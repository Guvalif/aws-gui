/**
 * @file AWS IoT Core configurations
 * @author Kazuyuki TAKASE <takase@plen.jp>
 * @copyright PLEN Project Company Inc, and all authors
 * @license The MIT License (See also : http://opensource.org/licenses/mit-license.php)
 */

declare const IOT_ENDPOINT: string;
declare const IOT_ACCESS_KEY_ID: string;
declare const IOT_SECRET_ACCESS_KEY: string;


export interface IAWSConfig
{
    region: string,
    endpoint: string,
    access_id: string,
    access_key: string
};

export const AWS_CONFIG: IAWSConfig = {
    region: 'ap-northeast-1',
    endpoint: IOT_ENDPOINT,
    access_id: IOT_ACCESS_KEY_ID,
    access_key: IOT_SECRET_ACCESS_KEY
};

export const MQTT_TOPIC: string = 'raspberry-pi-cloud/mqtt-bridge';