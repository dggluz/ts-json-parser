import { booleanParser, JsonBoolean } from './json/boolean';
import { JsonNull, nullParser } from './json/null';
import { anyP, liftA2Parser, Parser } from './parser/parser';

// JSON parser en TypeScript (just for fun)
// Parser: texto -> AST (Abstract Syntax Tree)

type JsonValue =
    JsonNull
    | JsonBoolean
    // | JsonNumber
    // | JsonString
    // | JsonArray
    // | JsonObject
;

const saraza = null as any;

export const jsonParser: Parser<JsonValue> = anyP ([nullParser, booleanParser]);

const concatParsers = liftA2Parser;

const concatStringParsers: (p1: Parser<string>) => (p2: Parser<string>) => Parser<string> =
    p1 => p2 =>
        concatParsers ((x: string) => (y: string) => x + y) (p1) (p2)
;
