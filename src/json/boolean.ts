import { mapParser, orP, Parser } from '../parser/parser';
import { parserS } from '../parser/parser-utils';

export type JsonBoolean = {
    tag: 'json-boolean';
    value: boolean;
};

const falseParser = parserS ('false');
const trueParser = parserS ('true');

const JsonBoolean = (value: 'true' | 'false'): JsonBoolean => ({
    tag: 'json-boolean',
    value: value === 'true'
});

export const booleanParser: Parser<JsonBoolean> = mapParser (JsonBoolean) (orP (falseParser) (trueParser));
