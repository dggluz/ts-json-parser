import { mapParser, Parser } from '../parser/parser';
import { keepMiddleParser, parserS, spanP } from '../parser/parser-utils';

export type JsonString = {
    tag: 'json-string';
    value: string;
};

const JsonString = (value: string): JsonString => ({
    tag: 'json-string',
    value
});

export const stringParser: Parser<JsonString> = mapParser (JsonString) (keepMiddleParser (parserS ('"')) (spanP (char => char !== '"')) (parserS ('"')));
