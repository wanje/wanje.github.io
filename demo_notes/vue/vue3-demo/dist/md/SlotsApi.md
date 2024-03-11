```html
<script setup>
  
</script>

<template>
  <div class="">
    <h2><a target="_blank" href="./md/SlotsApi.md">插槽Slots</a></h2>
    <p>具名插槽在vue3中都需要像vue2中使用作用域插槽的方式在 <code>&lt;template></code> 元素上使用，<span class="color-red">不能直接在元素或组件上使用slot属性来指明对应的具名插槽</span>，
      指令加插槽名参数 <code>v-slot:slotName</code>，简写为 <code>#slotName</code>，
      可以像给组件传入props一样，在 <code>&lt;slot></code> 上绑定自定义属性(可多个，最终被放在一个对象里对外暴露，name属于内置属性不会暴露)来传递值给外部渲染时使用这些局部数据（<span class="color-orange">以v-slot指令的值形式暴露</span>）
    </p>
    <p class="color-orange">插槽声明：</p>
    <p>
      默认插槽：<code>&lt;slot>可选的插槽内默认内容&lt;/slot></code>，此时插槽名默认为`default`<br>
      具名插槽：<code>&lt;slot name="slotName">&lt;/slot></code><br>
      作用域插槽：<code>&lt;slot :data1="someData1" :data2="someData2">&lt;/slot></code>，或v-bind绑定多个属性或不定属性名的对象<code>&lt;slot v-bind="dataObj">&lt;/slot></code><br>
    </p>
    <p class="color-orange">插槽使用：</p>
    <p>
      v-slot指令：<code>&lt;template v-slot:slotName>具体插槽内容&lt;/template></code><br>
      v-slot指令简写符号#：<code>&lt;template #slotName>具体插槽内容&lt;/template></code><br>
      动态插槽名：<code>&lt;template v-slot:[slotName]>内容&lt;/template></code>或缩写<code>&lt;template #[varName]>内容&lt;/template></code>
      这里的 <span class="color-orange">varName</span> 是一个代表具体插槽名的变量或表达式，从而动态控制内容的插入位置 <br>
      接收作用域插槽数据：<code>&lt;template v-slot:slotName="slotProps">可通过slotProps对象访问内部对应slot抛出的数据&lt;/template></code><br>
      <code>&lt;template #slotName="{ data1, data2}">可解构&lt;/template></code><br>
      <code>&lt;template v-slot="slotProps">内容&lt;/template></code><br>
      <code>&lt;template #default="slotProps">内容&lt;/template></code><br>
    </p>
  </div>
</template>

<style lang="scss" scoped>

</style>

```