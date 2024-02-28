import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

/**
 * !defineStore() 方法定义全局状态管理，其接收两个参数：
 * *参数1：一个全局唯一的字符串ID，可看作是一个模块名；
 * *参数2：状态管理定义主体内容，可接受两类值：Setup函数或Option对象；
 * !接收该方法返回值的变量命名可以任意，但是一般约定按 useXxxStore 的格式，即以`use`开头，`Store`结尾，直观表达其是状态管理用途
 */

/** 用法一，option选项式 */
// 选项式下pinia中有三个概念，state、getters 和 actions（不再有mutations），这些概念相当于vue2组件中的 data、computed 和 methods
export const useNumStore = defineStore('num', {
  state() {
    return { count: 0 }
  },
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
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  return { count, doubleCount, increment }
})
