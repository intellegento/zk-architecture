const curry = fn => {
  let curried = (...args) => {
    if (args.length >= fn.length)
      return fn(...args)
    else
      return (...rest) => curried(...args, ...rest)
  }
  return curried
}

export default curry;