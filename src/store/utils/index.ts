export const onFetching = <A>(action: A): A => `${action}_${'PENDING'}` as unknown as A;
export const onSuccess = <A>(action: A): A => `${action}_${'FULFILLED'}` as unknown as A;
export const onError = <A>(action: A): A => `${action}_${'REJECTED'}` as unknown as A;
