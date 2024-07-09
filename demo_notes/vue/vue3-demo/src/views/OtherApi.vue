<script setup>
  //* readonly()
  const originalReactive = reactive({ count: 0 });
  const originalObj = { count: 0 };
  const copyReactive = readonly(originalReactive);
  const copyObj = readonly(originalObj);
  watchEffect(() => {
    // 因 copyReactive 原始值是一个响应式对象，故其也会被响应性追踪，而 copyObj 的原始值是普通对象故不会被追踪
    console.log('readonly副本根据代理值的响应性变化了', copyReactive.count, copyObj.count);
  });
  function readonlyReactiveTest() {
    // 会触发上面的watchEffect
    originalReactive.count++;
  }
  function readonlyNormalObjTest() {
    originalObj.count++; //!! 不会触发上面的watchEffect
    console.log('只读普通对象', copyObj.count); // 但只读值还是会跟随变化，只是因为原始值不是响应性的就不会触发相关响应性钩子
  }
</script>

<template>
  <div>
    <h2><a target="_blank" href="./md/OtherApi.md">其他API</a></h2>
    <p><code>readonly()</code> 接受一个对象(响应式或普通对象都可以)或是一个 ref，返回一个原始值的只读代理(除了不可写其他特点都跟随代理值)，且是深层的，任何嵌套属性都是只读，其解包行为与 <code>reactive()</code>相同，但解包得到的值也是只读的，
      若要避免深层转换行为，可使用 <code>shallowReadonly()</code> 代替(即浅层只读)，<span class="color-red">readonly 他们其实都是没有 set 函数的 computed ref</span>。
      <button @click="readonlyReactiveTest">只读响应性对象</button>
      <button class="mgl-10" @click="readonlyNormalObjTest">只读普通对象</button>
    </p>
    <p><code>toRaw()</code> 返回代理对象的原始对象，其可返回由 <span class="color-orange">reactive()、readonly()、shallowReactive() 或 shallowReadonly()</span> 创建的代理对应的原始对象，
      可以用于临时读取而不引起代理访问/跟踪开销，或是写入而不触发更改的特殊方法，<span class="color-red">注意不建议保存对原始对象的持久引用</span>
    </p>
    <p><code>markRaw()</code> 将一个对象标记为不可被转为代理，返回该对象本身，即使将其创建的对象作为源对象再给 reactive() 等响应式代理API去创建对象或是直接赋值给某响应式对象的属性其也不会被转为代理，而是返回原始对象，不参与响应式相关活动。
      <span class="color-red">注意，这是一个浅层行为，markRaw() 标记的是传入的对象整体不可代理，不是对每一层进行标记，若是将对象下的属性单独传给响应式API或赋值给响应式对象的子属性则仍然会被代理，这样用会存在错误风险。</span>
    </p>

    <div>
      <h3 class="color-orange">关于组件中作用域CSS样式</h3>
      <p>深度选择器 <code>:deep()</code> 用于下钻选择到子组件中的元素</p>
      <p>插槽选择器 <code>:slotted()</code> 用于作用到通过父组件传进来的插槽中的元素，因为默认情况插槽内容样式是是受父组件管理的，当前组件作用域样式不会影响</p>
      <p>全局选择器 <code>:global()</code> 用于在当前 &lt;style scoped&gt; 作用域样式中声明全局样式，就无需单独写一个 style 标签或是放到全局样式文件中（主要针对与当前组件有关联的情况，就近原则）</p>
      <p>动态样式绑定 <code>v-bind()</code> 可以绑定JS中的表达式(字符串形式)，其最后会编译成自定义CSS变量形式去应用动态值 <code>.el { color: v-bind('theme.color') }</code></p>
    </div>
  </div>
</template>

<style lang="scss" scoped>

</style>
