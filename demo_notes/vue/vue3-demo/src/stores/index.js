import { ref, computed, watch } from 'vue'
import { createPinia, defineStore } from 'pinia'

// 创建一个Pinia根实例，一方面用于Vue应用实例app安装Pinia和在应用app中注入该pinia实例，另一方面其也包含后续所有全局状态的管理和基于Pinia扩展的插件安装
const pinia = createPinia();
console.log('Pinia实例：', pinia);

/**
 * !defineStore() 方法定义全局状态管理，其接收两个参数：
 * *参数1：一个全局唯一的字符串ID，可看作是一个模块名；
 * *参数2：状态管理定义主体内容，可接受两类值：Setup函数或Option对象；
 * *参数3：可选，当参数2为setup函数时，该参数3用于传入额外的自定义选项（参数2是option对象时可直接在其中增加自定义属性就无需参数3）
 * !接收该方法返回值的变量命名可以任意，但是一般约定按 useXxxStore 的格式，即以`use`开头，`Store`结尾，直观表达其是状态管理用途
 * !Store实例化后相关state也都会在pinia根实例中同步变化
 */

/** 用法一，option选项式 */
// 选项式下pinia中有三个概念，state、getters 和 actions（不再有mutations），这些概念相当于vue2组件中的 data、computed 和 methods
export const useNumStore = defineStore('num', {
  state: () => ({ count: 0 }),  //! 若在定义state的函数中用到了外部组合式函数处理后返回的值(如vueuse库提供的)，一定要保证此值若用于最终返回的state对象下的属性要是可写的
  getters: {
    // getter 函数接收 state 为第一个参数
    double: (state) => state.count * 2,
    // 使用常规函数定义时，其中的this指向的是当前的 store 实例，从而可访问该store下的所有内容
    treble(state) {
      return state.count + this.double
    },
    // 由于 getter 实际是一个计算属性，而不是对外的一个函数调用（同对象属性的get/set），只提供访问，不能传参调用，若要传参调用就需要返回一个函数，通过该返回函数来传参
    passParams: (state) => {
      // 外部访问getter实际是访问这里的返回值，而非调用getter的声明函数，所以要传参可以返回一个函数让外部调用
      // 返回函数就使得无法自动缓存之前的getter计算值，但可以自己在此处getter本身中先缓存一些结果，亦可提升部分性能
      const activeUsers = state.users.filter((user) => user.active);  // 这里属于getter本身范围内，数据是会缓存的
      return (userId) => activeUsers.find((user) => user.id === userId) // 返回的函数中的计算值不会缓存
    }
  },
  actions: {
    // action 实际就是 method 调用，其无默认接收参数，可自行根据需要定义参数传入
    increment() {
      // 可通过 this 访问当前 store 实例下的所以内容
      this.count++
    },
    // 异步action
    async getSth() {
      const response = await fetch(`./favicon.ico?id=${this.count}`);
      const data = await response.blob();
      return data
    }
  }
})

/** 用法二，setup函数组合式 */
// 第二个参数为函数时就类似 setup(){} 组件，可按组合式方式编写，自由度就可完全自行控制(别忘记显式return)
//!此时 ref() 就是 state 属性，computed() 就是 getters function() 就是 actions 属性， 其他Vue3的组合式API也都可使用
export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const double = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  //! 别忘记return
  return { count, double, increment }
})

console.log(pinia.state)
/** 全局监听 State（区分于每个Store中单独订阅），这里因为 pinia.state 本身是响应式的，所以无需使用getter形式 */
watch(pinia.state, (state) => {
  // 变化后的统一操作，例如每当状态发生变化时，将整个 state 持久化到本地存储
  console.log('pinia根实例监听全局状态变化：', state, '字符化：', JSON.stringify(state));
},{
  deep: true  // 深度监听
})

export default pinia