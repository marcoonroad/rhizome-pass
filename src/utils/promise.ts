export interface IDeferred<A> {
  promise: Promise<A>,
  resolve: ((value : A) => void),
  reject: ((reason : Error) => void)
}

const defer : <A>() => IDeferred<A> = <A>() => {
  const deferred : any = {}

  deferred.promise = new Promise((resolve, reject) => {
    deferred.resolve = resolve
    deferred.reject = reject
  })

  const result : IDeferred<A> = deferred

  return result
}

export default { defer }
