import { Failure, Result } from './may-fail';
import { Parser } from './parser';
import { TuplaS } from './tupla-s';

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
