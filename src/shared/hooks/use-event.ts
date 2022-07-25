import { useRef, useLayoutEffect, useCallback } from 'react';

type Fn<ARGS extends any[], R> = (...args: ARGS) => R;

function useEvent<A extends any[], R>(handler: Fn<A, R>) {
  const handlerRef = useRef<Fn<A, R>>(handler);
  //移除方法
  useLayoutEffect(() => {
    handlerRef.current = handler;
  });

  //返回“稳定”状态的方法
  return useCallback((...args: A): R => {
    const fn = handlerRef.current;
    return fn(...args);
  }, []);
}

export default useEvent;
