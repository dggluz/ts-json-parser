import { JsonValue, jsonParser } from '../json-parser';
import { keepLeftParser, liftA2Parser, mapParser, Parser, separatedByParser } from '../parser/parser';
import { keepMiddleParser, parserS, commaSeparatorParser, whiteSpaceParser, colonSeparatorParser } from '../parser/parser-utils';
import { JsonString, stringParser } from './string';

// { "ddsfdf": true, "rtert": false }

export type JsonObject = {
    tag: 'json-object';
    value: ([string, JsonValue])[];
};

const JsonObject = (value: ([string, JsonValue])[]): JsonObject => ({
    tag: 'json-object',
    value
});

const pairParser = <T> (parser1: Parser<T>) => <U> (parser2: Parser<U>): Parser<[T, U]> =>
    liftA2Parser ((x: T) => (y: U): [T, U] => [x, y]) (parser1) (parser2)
;

const keyValueParser: Parser<[string, JsonValue]> =
    pairParser
        (keepLeftParser
            (mapParser ((s: JsonString) => s.value) (stringParser))
            (colonSeparatorParser)
        )
        ((x) => jsonParser (x))
;

export const objectParser: Parser<JsonObject> = mapParser
    (JsonObject)
    (keepMiddleParser
        (keepMiddleParser (whiteSpaceParser) (parserS ('{')) (whiteSpaceParser))
        (separatedByParser
            (commaSeparatorParser)
            (keyValueParser)
        )
        (keepMiddleParser (whiteSpaceParser) (parserS ('}')) (whiteSpaceParser))
    )
;
