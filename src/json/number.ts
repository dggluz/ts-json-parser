import { altP, anyP, liftA2Parser, mapParser, Parser } from '../parser/parser';
import { nonEmptyParser, parserS, spanP } from '../parser/parser-utils';

export type JsonNumber = {
    tag: 'json-number';
    value: number;
};

const JsonNumber = (value: number): JsonNumber => ({
    tag: 'json-number',
    value
});

const unsignedIntParser = mapParser (parseInt) (nonEmptyParser (spanP (char => '9876543210'.includes (char))));

const signParser = anyP ([
    mapParser (() => 1) (parserS ('+')),
    mapParser (() => -1) (parserS ('-')),
    Parser (1)
]);

const intParser = liftA2Parser ((sign: number) => (unsignedNumber: number) => sign * unsignedNumber) (signParser) (unsignedIntParser);

export const numberParser: Parser <JsonNumber> = mapParser (JsonNumber) (intParser);
