export type FunctionS <T> = (input: string) => T;

export const mapFunctionS: <A, B> (fn: (x: A) => B) => (fs: FunctionS<A>) => FunctionS<B> =
    fn => fs =>
        s => fn (fs (s))
;
