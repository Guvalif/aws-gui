/**
 * @file Data signing functions
 * @author Kazuyuki TAKASE <takase@plen.jp>
 * @copyright PLEN Project Company Inc, and all authors
 * @license The MIT License (See also : http://opensource.org/licenses/mit-license.php)
 */

import CryptoJS = require('crypto-js');


export function sign(signature_key: CryptoJS.WordArray, message: string): string
{
    const hash = CryptoJS.HmacSHA256(message, signature_key);

    return hash.toString(CryptoJS.enc.Hex);
}

export function sha256(message: string): string
{
    const hash = CryptoJS.SHA256(message);

    return hash.toString(CryptoJS.enc.Hex);
}

export function signatureKey(key: string, date: any, region: string, service: string): CryptoJS.WordArray
{
    const signed_date    = CryptoJS.HmacSHA256(date, 'AWS4' + key);
    const signed_region  = CryptoJS.HmacSHA256(region, signed_date);
    const signed_service = CryptoJS.HmacSHA256(service, signed_region);
    const signature_key  = CryptoJS.HmacSHA256('aws4_request', signed_service);

    return signature_key;
}