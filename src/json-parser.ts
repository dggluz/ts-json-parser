import { arrayParser, JsonArray } from './json/array';
import { booleanParser, JsonBoolean } from './json/boolean';
import { JsonNull, nullParser } from './json/null';
import { JsonNumber, numberParser } from './json/number';
import { JsonString, stringParser } from './json/string';
import { anyP, Parser } from './parser/parser';

// JSON parser en TypeScript (just for fun)
// Parser: texto -> AST (Abstract Syntax Tree)

export type JsonValue =
    JsonNull
    | JsonBoolean
    | JsonNumber
    | JsonString
    | JsonArray
    // | JsonObject
;

export const jsonParser: Parser<JsonValue> = anyP ([nullParser, booleanParser, numberParser, stringParser, arrayParser]);
