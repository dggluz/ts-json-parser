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

type JsonNull = {
    tag: 'json-null';
};

type JsonBoolean = {
    tag: 'json-boolean';
    value: boolean;
};

type TuplaS <T> = [string, T];

const TuplaS: (s: string) => <T> (x: T) => TuplaS<T> =
    s => x =>
        [s, x]
;

const saraza = null as any;

const mapTuplaS: <A, B> (fn: (x: A) => B) => (t: TuplaS<A>) => TuplaS<B> =
    fn => ([s, x]) =>
        TuplaS (s) (fn (x))
;

type FunctionS <T> = (input: string) => T;

const mapFunctionS: <A, B> (fn: (x: A) => B) => (fs: FunctionS<A>) => FunctionS<B> =
    fn => fs =>
        s => fn (fs (s))
;

type Parser <T> = FunctionS<MayFail<TuplaS<T>>>;

type Result<T> = {
    tag: 'success';
    value: T;
};

type Failure = {
    tag: 'failure';
    error: string;
};

type MayFail <T> = 
    Result<T>
    | Failure
;

const Result: <T> (x: T) => Result<T> =
    value => ({
        tag: 'success',
        value
    })
;

const Failure: (error: string) => Failure =
    error => ({
        tag: 'failure',
        error
    })
;

const isResult = <T> (mf: MayFail <T>): mf is Result <T> =>
    mf.tag === 'success'
;

const mapMayFail: <A, B> (fn: (x: A) => B) => (mf: MayFail<A>) => MayFail<B> =
    fn => mf =>
        isResult (mf) ?
            Result (fn (mf.value)) :
            mf
;


export const parserS: <S extends string> (expected: S) => Parser<S> = expectedString => input => {
    const expectedLength = expectedString.length;
    const firstChunk = input.slice (0, expectedLength);
    const remaining = input.slice (expectedLength);

    const errorMessage = input.length < expectedLength ?
        'Unexpected end of input' :
        `Unexpected "${input}"`
    ;

    return firstChunk === expectedString ?
        Result (TuplaS (remaining) (expectedString)) :
        Failure (errorMessage)
    ;
};

const mapParser: <A, B> (fn: (x: A) => B) => (p: Parser<A>) => Parser<B> =
    fn => p =>
        mapFunctionS (mapMayFail (mapTuplaS (fn))) (p)
;

const JsonNull = (): JsonNull => ({
    tag: 'json-null'
});

export const nullParser: Parser<JsonNull> = mapParser (JsonNull) (parserS ('null'));


const falseParser = parserS ('false');
const trueParser = parserS ('true');

const JsonBoolean = (value: 'true' | 'false'): JsonBoolean => ({
    tag: 'json-boolean',
    value: value === 'true'
});

const orP: <A> (p1: Parser<A>) => <B> (p2: Parser<B>) => Parser <A | B> =
    p1 => p2 =>
        input => {
            const result1 = p1(input);
            return isResult (result1) ?
                result1 :
                p2 (input)
        }
;

export const booleanParser: Parser<JsonBoolean> = mapParser (JsonBoolean) (orP (falseParser) (trueParser));


const anyP: {
    <A, B, C, D, E, F> (ps: [Parser<A>, Parser<B>, Parser<C>, Parser<D>, Parser<E>, Parser<F>]): Parser<A | B | C | D | E | F>;
    <A, B, C, D, E> (ps: [Parser<A>, Parser<B>, Parser<C>, Parser<D>, Parser<E>]): Parser<A | B | C | D | E>;
    <A, B, C, D> (ps: [Parser<A>, Parser<B>, Parser<C>, Parser<D>]): Parser<A | B | C | D>;
    <A, B, C> (ps: [Parser<A>, Parser<B>, Parser<C>]): Parser<A | B | C>;
    <A, B, C> (ps: [Parser<A>, Parser<B>, Parser<C>]): Parser<A | B | C>;
    <A, B> (ps: [Parser<A>, Parser<B>]): Parser<A | B>;
    <A> (ps: [Parser<A>]): Parser<A>;
    <T> (ps: Parser<T>[]): Parser<T>;
} =
    <T> (ps: Parser<T>[]) =>
        ps.reduce ((accumParser, aParser) => orP (accumParser) (aParser))
;

export const jsonParser: Parser<JsonValue> = anyP ([nullParser, booleanParser]);

const flatParser: <T> (outsideParser: Parser<Parser<T>>) => Parser<T> =
    outsideParser =>
        input => {
            const outsideResult = outsideParser (input);

            if (isResult (outsideResult)) {

                const [ outsideRemaining, insideParser ] = outsideResult.value;

                return insideParser (outsideRemaining);
            }
            return outsideResult;
        }
;

const applyParser = <A, B> (parserFn: Parser<(x: A) => B>) => (parserX: Parser<A>): Parser<B> =>
    flatParser (mapParser ((fn: (x: A) => B) => mapParser (fn) (parserX)) (parserFn))
;

const liftA2Parser: <A, B, C> (fn: (x: A) => (y: B) => C) => (p1: Parser<A>) => (p2: Parser<B>) => Parser<C> =
    fn => p1 => p2 =>
        applyParser (mapParser (fn) (p1)) (p2);
;

const concatParsers = liftA2Parser;

const concatStringParsers: (p1: Parser<string>) => (p2: Parser<string>) => Parser<string> =
    p1 => p2 =>
        concatParsers ((x: string) => (y: string) => x + y) (p1) (p2)
;

export const Parser: <T> (x: T) => Parser<T> =
    x =>
        input =>
            Result (TuplaS (input) (x))
;

