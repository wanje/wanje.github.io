import { ref, computed, watch } from 'vue'
import { createPinia, defineStore } from 'pinia'

const pinia = createPinia();  // 创建一个Pinia根实例，一方面用于Vue应用实例app安装Pinia，另一方面其也包含后续所有全局状态的管理和基于Pinia扩展的插件安装
console.log('Pinia实例：', pinia);

/**
 * !defineStore() 方法定义全局状态管理，其接收两个参数：
 * *参数1：一个全局唯一的字符串ID，可看作是一个模块名；
 * *参数2：状态管理定义主体内容，可接受两类值：Setup函数或Option对象；
 * !接收该方法返回值的变量命名可以任意，但是一般约定按 useXxxStore 的格式，即以`use`开头，`Store`结尾，直观表达其是状态管理用途
 * !Store实例化后相关state也都会在pinia根实例中同步变化
 */

/** 用法一，option选项式 */
// 选项式下pinia中有三个概念，state、getters 和 actions（不再有mutations），这些概念相当于vue2组件中的 data、computed 和 methods
export const useNumStore = defineStore('num', {
  state: () => ({ count: 0 }),
  getters: {
    double: (state) => state.count * 2,
  },
  actions: {
    increment() {
      this.count++
    }
  }
})

/** 用法二，setup函数组合式 */
// 第二个参数为函数时就类似 setup(){} 组件，可按组合式方式编写(别忘记显式return)
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

/** 全局监听 State（区分于每个Store中单独订阅） */
watch(pinia.state, (state) => {
  // 变化后的统一操作，例如每当状态发生变化时，将整个 state 持久化到本地存储
  console.log('pinia根实例监听全局状态变化：', state);
},{
  deep: true  // 深度监听
})

export default pinia