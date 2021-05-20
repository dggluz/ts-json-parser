import { JsonValue, jsonParser } from '../json-parser';
import { mapParser, Parser, separatedByParser } from '../parser/parser';
import { keepMiddleParser, parserS, commaSeparatorParser, whiteSpaceParser } from '../parser/parser-utils';

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
        (keepMiddleParser (whiteSpaceParser) (parserS ('[')) (whiteSpaceParser))
        (separatedByParser
            (commaSeparatorParser)
            ((x) => jsonParser (x))
        )
        (keepMiddleParser (whiteSpaceParser) (parserS (']')) (whiteSpaceParser))
    )
;
