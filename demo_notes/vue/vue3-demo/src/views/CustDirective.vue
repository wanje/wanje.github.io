<script setup>
  // 在模板中启用 v-focus
  const vFocus = {
    mounted: (el) => el.focus()
  };
</script>

<template>
  <div class="">
    <h2><a target="_blank" href="../src/views/CustDirective.vue">自定义指令</a></h2>
    <p>自定义指令主要是为了<span class="color-orange">重用涉及普通元素的底层DOM访问的逻辑</span>，其由一个包含<span class="color-orange">类似组件生命周期钩子</span>的对象来定义，
      在 <code>&lt;script setup></code> 中，<span class="color-orange">任何以 v 开头的小驼峰命名的变量都被当作一个自定义指令，</span>
      选项式API下与vue2一样通过`directives`选项注册局部指令，全局指令则通过 <code>app.directive()</code> 方法注册（选项式和全局注册名无需以`v`开头）
    </p>
    <p>自动聚焦指令：<input type="text" v-focus /></p>
    <p>对象全量钩子(都可选)，钩子参数中除了`el`外其他都是只读的，不能更改，若需要在不同钩子建共享信息，可通过元素原生的dataset attribute来实现，下面的变量名 myDirective 若非用作值的传递，则应以`v`开头：</p>
    <div>
      <img src="@/assets/customDirective.jpg" alt="customDirective" height="440" class="vt" />
      <img src="@/assets/customDirectiveHookPrams.jpg" alt="customDirectiveHookPrams" height="440" class="vt" />
    </div>
    <p>与内置指令类似，自定义指令的参数也可以是动态的：<code>&lt;div v-example:[arg]="value">&lt;/div></code>，这里指令的参数会基于组件的`arg`数据属性响应式地更新，
      <span class="color-red">另外，指令的value值可以是任何合法的JS表达式和数据类型，包括对象和数组等</span>
    </p>
    <p>很多时候我们的自定义指令可能只需要在`mounted`和`updated`时调用且实现相同的行为，不需要其他钩子，此时就可以简化为用一个函数而非对象形式来定义指令：<code>const vFoo = (el, binding) => { /* 该函数会在 mounted 和 updated 时调用 */ }</code></p>
    <p class="color-red">组件一般用于原生元素上，若用于组件则会始终应用于组件的根节点，但对于多根节点的组件就会抛出警告，且指令不能通过`$attrs`传递，所以不推荐在组件上使用指令</p>
  </div>
</template>

<style lang="scss" scoped>

</style>
