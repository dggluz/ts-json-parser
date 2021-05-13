import { inspect } from 'util';
import { jsonParser } from './json-parser';

export const log = (x: any) =>
    console.log (inspect (x, {
        showHidden: false,
        depth: null,
        colors: true,
    }))
;

export const parse = (x: string) =>
    log (jsonParser (x))
;
