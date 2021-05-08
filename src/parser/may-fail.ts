export type Result<T> = {
    tag: 'success';
    value: T;
};

export type Failure = {
    tag: 'failure';
    error: string;
};

export type MayFail <T> = 
    Result<T>
    | Failure
;

export const Result: <T> (x: T) => Result<T> =
    value => ({
        tag: 'success',
        value
    })
;

export const Failure: (error: string) => Failure =
    error => ({
        tag: 'failure',
        error
    })
;

export const isResult = <T> (mf: MayFail <T>): mf is Result <T> =>
    mf.tag === 'success'
;

export const mapMayFail: <A, B> (fn: (x: A) => B) => (mf: MayFail<A>) => MayFail<B> =
    fn => mf =>
        isResult (mf) ?
            Result (fn (mf.value)) :
            mf
;
