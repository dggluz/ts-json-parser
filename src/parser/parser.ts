import { FunctionS, mapFunctionS } from './function-s';
import { isResult, mapMayFail, MayFail, Result } from './may-fail';
import { mapTuplaS, TuplaS } from './tupla-s';

export type Parser <T> = FunctionS<MayFail<TuplaS<T>>>;

export const mapParser: <A, B> (fn: (x: A) => B) => (p: Parser<A>) => Parser<B> =
    fn => p =>
        mapFunctionS (mapMayFail (mapTuplaS (fn))) (p)
;

export const Parser: <T> (x: T) => Parser<T> =
    x =>
        input =>
            Result (TuplaS (input) (x))
;

export const flatParser: <T> (outsideParser: Parser<Parser<T>>) => Parser<T> =
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

export const applyParser = <A, B> (parserFn: Parser<(x: A) => B>) => (parserX: Parser<A>): Parser<B> =>
    flatParser (mapParser ((fn: (x: A) => B) => mapParser (fn) (parserX)) (parserFn))
;

export const liftA2Parser: <A, B, C> (fn: (x: A) => (y: B) => C) => (p1: Parser<A>) => (p2: Parser<B>) => Parser<C> =
    fn => p1 => p2 =>
        applyParser (mapParser (fn) (p1)) (p2);
;

export const orP: <A> (p1: Parser<A>) => <B> (p2: Parser<B>) => Parser <A | B> =
    p1 => p2 =>
        input => {
            const result1 = p1(input);
            return isResult (result1) ?
                result1 :
                p2 (input)
        }
;

export const anyP: {
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
