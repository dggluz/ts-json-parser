import { mapParser, Parser } from '../parser/parser';
import { parserS } from '../parser/parser-utils';

export type JsonNull = {
    tag: 'json-null';
};

const JsonNull = (): JsonNull => ({
    tag: 'json-null'
});

export const nullParser: Parser<JsonNull> = mapParser (JsonNull) (parserS ('null'));
