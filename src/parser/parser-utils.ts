import { Failure, isResult, Result } from './may-fail';
import { keepLeftParser, keepRightParser, Parser } from './parser';
import { TuplaS } from './tupla-s';

const unexpectedFailure = (unexpected: string) => (minLength: number) =>
    Failure (unexpected.length < minLength ?
        'Unexpected end of input' :
        `Unexpected "${unexpected}"`
    )
;

export const parserS: <S extends string> (expected: S) => Parser<S> = expectedString => input => {
    const expectedLength = expectedString.length;
    const firstChunk = input.slice (0, expectedLength);
    const remaining = input.slice (expectedLength);

    return firstChunk === expectedString ?
        Result (TuplaS (remaining) (expectedString)) :
        unexpectedFailure (input) (expectedLength)
    ;
};


const span: <T> (predicate: (x: T) => boolean) => (xs: T[]) => [T[], T[]] =
    predicate => xs => {
        const pivot = xs.findIndex (x => !predicate (x));

        return pivot === -1 ?
            [xs, []] :
            [xs.slice (0, pivot), xs.slice(pivot)];
    }
;

export const spanP: (predicate: (char: string) => boolean) => Parser<string> =
    predicate =>
        input => {
            const [parsedChars, remainingChars] = span (predicate) (input.split(''));

            return Result (TuplaS (remainingChars.join('')) (parsedChars.join('')))
        }
;

export const nonEmptyParser: (parser: Parser<string>) => Parser<string> =
    parser =>
        input => {
            const parserResult = parser (input);

            if (isResult (parserResult)) {
                const [remaining, parsed] = parserResult.value;

                if (parsed === '') {
                    return unexpectedFailure (remaining) (1);
                }
            }
            return parserResult;
        }
;

export const keepMiddleParser: (leftParser: Parser<unknown>) => <T> (middleParser: Parser<T>) => (rightParser: Parser<unknown>) => Parser<T> =
    leftParser => middleParser => rightParser =>
        keepRightParser (leftParser) (keepLeftParser (middleParser) (rightParser))
;

export const whiteSpaceParser = spanP (char => char === ' ');

export const separatorParser = keepMiddleParser (whiteSpaceParser) (parserS(',')) (whiteSpaceParser);
