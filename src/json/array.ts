import { JsonValue, jsonParser } from '../json-parser';
import { mapParser, Parser, separatedByParser } from '../parser/parser';
import { keepMiddleParser, parserS, separatorParser, spanP } from '../parser/parser-utils';

export type JsonArray = {
    tag: 'json-array';
    value: JsonValue[];
};

const JsonArray = (value: JsonValue[]): JsonArray => ({
    tag: 'json-array',
    value
});

export const arrayParser: Parser<JsonArray> = mapParser
    (JsonArray)
    (keepMiddleParser
        (parserS ('['))
        (separatedByParser
            (separatorParser)
            ((x) => jsonParser (x))
        )
        (parserS(']'))
    )
;
