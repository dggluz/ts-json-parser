export type TuplaS <T> = [string, T];

export const TuplaS: (s: string) => <T> (x: T) => TuplaS<T> =
    s => x =>
        [s, x]
;

export const mapTuplaS: <A, B> (fn: (x: A) => B) => (t: TuplaS<A>) => TuplaS<B> =
    fn => ([s, x]) =>
        TuplaS (s) (fn (x))
;
