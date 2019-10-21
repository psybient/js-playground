export const lib = (function () {
  let State = {};
  let Store = [];

  const setState = (state) => State.push(state);
  const getState = () => State[state];

  return {
    "partial": (fn, ...args) => {
      return (...otherArgs) => {
        return fn(...args, ...otherArgs)
      };
    },
    "head": (array) => {
      const [first, ...rest] = array;
      return {
        0: first,
        1: rest
      };
    },
    "log": (...args) => {
      console.log(args);
    },
    "assign": (...args) => {
      if (typeof args === undefined)
        return {};
      // return {
      //   ...args.map(v => v)
      // }

      return Object.assign({}, args)
    },
    // "modal": {
    //   //
    // },
    
  }
}());
