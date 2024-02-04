//组合函数内也可以使用其他组合函数

// 按照惯例，组合式函数名以`use`开头
export function useMouse(el) {
  // 被组合式函数封装和管理的状态
  const x = ref(0)
  const y = ref(0)

  // 组合式函数可以随时更改其状态。
  function update(event) {
    x.value = event.pageX
    y.value = event.pageY
  }

  // 一个组合式函数也可以挂靠在所属组件的生命周期上来启动和卸载副作用
  // 由于DOM通过ref引用，而 useXXX 只能在顶层调用，所以只能传入ref保持响应，不能是ref.value
  onMounted(() => (toValue(el) || window).addEventListener('mousemove', update))
  onUnmounted(() => (toValue(el) || window).removeEventListener('mousemove', update))

  // 通过返回值暴露所管理的状态（响应式对象，而非直接返回.value，以确保响应性）
  return { x, y }
}

// 异步状态和接收响应式状态
// 经处理这里可接收3中传参方式：1、useFetch('/path')；2、useFetch(refObj)；3、useFetch(() => `/path/${props.id}`)
export function useFetch(url) {
  const data = ref(null)
  const error = ref(null)

  const fetchData = () => {
    // 请求前重置状态
    data.value = null
    error.value = null

    // 异步操作
    /**
     * toValue() 方法是v3.3+提供的一个API，其作用是将传入的参数规范化为值：
     * 1、若参数是一个ref响应式数据，它会返回该ref的值；
     * 2、若函数是一个getter(即有返回值的函数)，则会调用该函数并返回其返回值；
     * 3、若参数是一个非以上两种情况的其他值，则会原样返回该参数
     */
    fetch(toValue(url))
      .then((res) => res.json())
      .then((json) => (data.value = json))
      .catch((err) => (error.value = err))
  }

  // 若 url 是一个响应式状态，则这里就会根据其值的变动重新发起请求
  // 因为 toValue 算是在这里 watchEffect 的参数内部调用的，所以保证了 toValue 访问的响应式依赖会被侦听器自动收集，若不是一个响应式数据这里的effect也只会执行一次
  watchEffect(fetchData)

  return { data, error }
}