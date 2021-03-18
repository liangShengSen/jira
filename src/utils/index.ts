import { useEffect, useState } from "react";

export const isFalsy = (value: unknown): boolean =>
  value === 0 ? false : !value;

export const cleanObject = (object: object) => {
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    // @ts-ignore
    const value = result[key];
    if (isFalsy(value)) {
      // @ts-ignore
      delete result[key];
    }
  });
  return result;
};

export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
  }, []);
};

// export const debounce = (func, delay) => {
// 	let timeout;
// 	return (...params) => {
// 		if (timeout) {
// 			clearTimeout(timeout);
// 		}
// 		timeout = setTimeout(() => {
// 			func(...params);
// 		}, delay);
// 	};
// };
// const log = debounce(() => console.log("log"), 5000);
// log()
// log()
// log()

export const useDebounce = <V>(value: V, delay?: number) => {
  const [debounceValue, setDebounceValue] = useState(value);
  useEffect(() => {
    // 每次在value变化后，设置一个定时器
    const timeout = setTimeout(() => setDebounceValue(value), delay);
    // 每次在上一个useEffect处理完成以后再运行
    return () => clearTimeout(timeout);
  }, [value, delay]);
  return debounceValue;
};
