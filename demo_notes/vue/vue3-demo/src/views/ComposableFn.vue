<script setup>
  import { useMouse } from './useFn';
  const el = ref(null);
  // 由于DOM只有在mounted后才能ref引用到，而 useXXX 只能在顶层调用，所以只能传入ref保持响应性，不能直接传入ref.value，在 useXXX 内使用该DOM/组件ref时也要注意
  const { x, y } = useMouse(el);
</script>

<template>
  <div ref="el" class="">
    <h2><a target="_blank" href="../src/views/useFn.js">组合式函数</a></h2>
    <p>鼠标坐标：{{ x }}, {{ y }}</p>
    <p>组合式函数(Composables)是一个利用 Vue 的组合式 API 来封装和复用有状态逻辑的函数，就像 React 中的 hooks 一样，注意这里是有状态逻辑，对于无状态逻辑的公共函数我们通常称为工具函数
      （即内部状态不会因时间空间变化而变化，内部只会处理传入的指定输入），<span class="color-red">所以组合函数都尽量在顶层作用域调用，某些请情况下也可以在像 onMounted() 这样的生命周期钩子中调用</span>，
      因每一个调用组合函数的实例会创建其独有的组合函数内相关局部状态的拷贝，故多处复用互不影响，<span class="color-orange">且组合函数内也可以嵌套其他组合函数</span>，
      一般都将组合函数提取到一个单独的外部JS文件中。
    </p>
    <p><code>toValue(pram)</code> 方法是v3.3+提供的一个API，其作用是将传入的参数规范化为值，以便处理较多参数为响应式/非响应式/getter函数混用的取值场景：<br>
      1、若参数 pram 是一个<span class="color-orange">ref响应式数据</span>，它会返回该ref的值；<br>
      2、若函数 pram 是一个<span class="color-orange">getter(即有返回值的函数)</span>，则会调用该函数并返回其返回值；<br>
      3、若参数 pram 是一个非以上两种情况的其他值，则会原样返回该参数
    </p>
    <p>关于组合式函数的一些<span class="color-red">约定和最佳实践</span>：<br>
      1、组合式<span class="color-orange">函数名以`use`开头</span>的小驼峰式命名；<br>
      2、<span class="color-orange">使用 toValue() 处理参数</span>，以提高兼容性；<br>
      3、返回值采用<span class="color-orange">返回一个包含多个ref的普通的非响应式对象</span>，以便使用时解构赋值仍保持响应性，若想用对象属性的形式访问返回的各状态，
      也可以使用reactive()包装一次组合函数的返回对象，这样其中的ref会自动解包(无需进一步.value)：<code>const obj = reactive(useXXX())</code>；<br>
      4、若副作用要访问DOM，则应在 <code>onMounted()</code> 等<span class="color-orange">可访问到DOM的相关生命周期钩子</span>中执行副作用，同时应确保在 <code>onUnmounted()</code> 时清理副作用；<br>
      5、<span class="color-orange">只能同步调用</span>（&lt;script setup> 是唯一在调用`await`之后仍可调用组合式函数的地方，编译器会在异步操作后自动恢复当前的组件实例），<span class="color-orange">某些情况下也可以在像 onMounted() 这样的生命周期钩子中调用</span>
    </p>
  </div>
</template>

<style lang="scss" scoped>

</style>
