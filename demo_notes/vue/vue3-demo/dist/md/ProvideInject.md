```html
<script setup>
  // provide(key, value) 祖先组件向其后代组件提供它们可能会用到的数据
  provide('p1', '这是祖先组件provide的值1');
  const p2 = ref('ref');
  provide('pRef', p2);  // 提供的值也可以是响应式的，但不推荐直接在后台组件中更改响应数据，而是提供一个更改值的函数，以便所有变动都在一个组件中维护
  function updateP2() {
    p2.value = 'ref2';
  }
  provide('pRef2', { p2, updateP2 }); // 提供一个方法让后代组件修改响应式数据，以便将数据的变动都放在祖先组件内维护
  const p3 = ref('ref3');
  provide('pRef3', readonly(p3)); // 若想确保提供的响应式数据不能被注入方的组件更改，可以使用 readonly() 来包装提供的值
</script>

<template>
  <slot></slot>
  <div class="">
    <h2><a target="_blank" href="./md/ProvideInject.md">依赖注入：provide/inject</a></h2>
    <p>
      <span class="color-red">目的是解决深层嵌套组件需要用到跨层级祖先组件的部分数据时，避免通过逐级透传props的方式来处理的问题（且虽然可以但不适合用全局状态管理来处理时），</span>
      由一个祖先组件作为依赖提供者来向所有后代组件提供<code>（provide）</code>部分可能会被后代组件依赖/用到的数据，然后任何后代组件都可以根据需要将祖先组件提供的部分或全部数据注入<code>（inject）</code>到自己的作用域来使用这些数据，
      <span class="color-orange">这就好比一个共享充电宝 <code>provide</code> 一条含多种充电接口的充电线，而需要充电的设备选择需要的接口 <code>inject</code> 到自己设备内使用(设备下的子设备也可能单独接入到充电宝供电)</span>
    </p>
    <p><code>provide()</code> 方法用于显式提供哪些数据可用于注入，接受2个参数，参数1表示数据`key`，参数2表示对应的数据值`value`，<span class="color-red">值可以是任意类型的</span>，包括响应式状态数据(如一个ref，可使与注入数据的后台组件建立响应式联系)，
      <span class="color-red">该方法可多次调用，以向后代组件提供多个数据，</span>
      <span class="color-orange">除了可以在组件中提供依赖，还可以在整个应用层面提供依赖，在整个vue应用实例上使用 <code>app.provide(key, value)</code>，此时应用下的所有组件都可以注入这些数据使用，这在编写vue插件时特别有用，</span>
      因值可以是任意的，当提供一个ref对象时，注入组件中也可以去更改它，但是我们最好不要在注入组件中直接更改，而是有祖先组件同时提供一个更改该ref对象的方法让注入组件使用，这样可以将ref的响应变动都放在一个组件中便于维护，
      <span class="color-orange">若想确保提供的ref数据不能被注入方组件更改，可以使用 <code>readonly()</code> 方法包装提供的ref对象：<code>provide('key', readonly(aRef))</code></span>
    </p>
    <p><code>inject()</code> 方法用于在组件中注入/接收祖先组件或应用层 provide 提供的数据(demo可查看上面透传Attributes中源码)，其可接收三个参数，<span class="color-orange">参数1必需</span>，为祖先组件 provide 的 key，表示注入/接受对应 key 的值到当前组件作用域，
      <span class="color-orange">参数2可选</span>，表示一个默认值，若祖先组件树上没有任何一个组件 provide 对应 key，注入时将使用该默认值，否则会抛出一个运行时警告，
      <span class="color-orange">参数3可选</span>，为一个布尔值 true，表示是否将参数2当做一个工厂函数(即参数2可以是一个函数声明，此时默认值不是函数本身，而是其执行后的返回值，否则函数本身会当做默认值，或者需要显式调用函数来使用其返回值)，此举可避免在用不到默认值的情况下进行不必要的函数计算或产生副作用，
      <span class="color-orange">若 provide 的值是一个响应式 ref，此时注入进来也会保持原样不会自动解包，从而使得消费组件内可以保持该数据的响应性</span>
    </p>
    <p class="color-red">provide 和 inject 都需要在顶层作用域下同步调用，不能用于异步回调</p>
    <div>provide 一个 ref 响应式数据：<input type="text" v-model="p2"></div>
    <p><span class="color-orange">使用 Symbol 作为注入key名来避免命名冲突：</span>若在大型应用下存在很多依赖提供或是开发组件库或是多人开发，为避免潜在的注入key名冲突，可以使用 <code>Symbol</code> 来作为注入key名，
      由于 Symbol 本身的特性，要想访问就需要用变量保存下来，所以推荐在一个单独的文件中导出这些注入名 Symbol（不只是注入名，若有其他统一的 Symbol 使用场景也都可以放在单独的文件中导出共用），需要使用的地方就导入，只需要通过对应的变量名使用即可。
    </p>
  </div>
</template>

<style lang="scss" scoped>

</style>

```