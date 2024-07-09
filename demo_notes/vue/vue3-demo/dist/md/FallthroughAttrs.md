```html
<script setup>
import { inject } from 'vue';

  // defineOptions() 方法(v3.3+)用于在 <script setup> 下设置一些无需或没有宏定义的组件选项
  defineOptions({
    inheritAttrs: false // 若不想要一个组件自动地继承 attribute，可设置该
  });

  defineProps(['theme']);

  // useAttrs() 方法返回一个对象，其中包含所有外部透传的attrs和事件监听（属性名将以原始形态存在，不会转换大小写和驼峰，而事件将以`on${eventName}`的形式保存）
  const attrs = useAttrs();
  console.log('透传Attrs', attrs);

  // inject() 注入祖先组件provide的数据
  const fromUp1 = inject('p1');
  const fromUpRef = inject('pRef');
  const fromUpx = inject('px', '这是默认值，祖先组件没有provide px这项数据才会出现');
  // 不是把参数2函数本身当做默认值，而是其返回值，所以需要设置参数3为true（虽然也可以参数二可以写成调用形式就无需参数3，但这样会使得不管是否用到默认值函数必然会执行，而使用参数3只会在默认值生效时才执行）
  const fromUpx2 = inject('px2', () => {
    console.log('inject fromUpx2 默认值运行了，只会初始化时执行，不会因内部使用了响应式数据而更新');
    if (fromUpRef.value === 'ref') return '条件1下的默认值';
    return '因inject的响应式数据值此时不是 ref，所以按条件我被设为了默认值';
  }, true);
</script>

<template>
  <div :class="['fallthrough-attrs', theme]">
    <h2><a target="_blank" href="./md/FallthroughAttrs.md">透传Attributes</a></h2>
    <p>“透传 attribute”指的是传递给一个组件，却没有被该组件声明为 props 或 emits 的 attribute 或者 v-on 事件监听器（即组件预料之外的内容，<span class="color-red">不含显式声明过的内容</span>），最常见的例子就是 class、style 和 id。</p>
    <p class="color-orange">当一个组件以单个元素为根作渲染时，透传的 attribute 会自动被添加到根元素上（即会自动继承父组件传入的额外内容），`class`和`style`如果有重合会合并其值这点我们在vue2中就知道，
      <span class="color-red">需要注意的是vue3中对于事件监听的透传如果有重合也会合并而不是覆盖</span>，
      如果你不想要一个组件自动地继承 attribute，你可以在组件选项中设置 <code>inheritAttrs</code> 选项为 <code>false</code>，
      然后在模板上通过 <code>$attrs</code> 对象显式控制将额外的参数绑定在其他需要的位置，而非一定是根元素/组件上
    </p>
    <pre v-bind="$attrs"><code>
      defineOptions({
        inheritAttrs: false
      })
    </code></pre>
    <p class="color-orange">若组件是多根节点的，这必须显式指定 <code>$attrs</code> 绑定到哪个节点上（<code>v-bind="$attrs"</code>，事件也在其中），否则当有额外attribute透传进来时代码会在运行时抛出警告</p>
    <p class="color-red">vue3中的 <code>$attrs</code> 包含了所有未在组件声明的 <code>props</code> 和 <code>emits</code>(事件监听，vue3中没有 $listeners，都被合并进了 $attrs)，
      透传入的属性名将以原始形态存在 <code>$attrs</code> 中，不会转换大小写和驼峰，而事件将转换为 <code>on</code> 开头再加事件名的小驼峰key形式保存（使用 <code>v-bind</code> 全量绑定 <code>$attrs</code> 时事件也会一并解析绑定）</p>
    <p><code>useAttrs()</code> 钩子返回一个对象，其中包含所有外部透传的attrs和事件监听，以便在 setup JS 中访问相关数据</p>
    <p class="color-red">注意，虽然获取到的 attrs 对象总是反映为最新的透传 attributes，但它并不是响应式的，不能通过侦听器去监听它的变化，若需要响应性，可以使用 prop，或使用 <code>onUpdated()</code> 生命周期钩子在每次更新时结合最新的 attrs 执行副作用</p>

    <div class="mgt-15">
      <p class="color-orange">这里是依赖注入 inject 的测试部分</p>
      inject 祖先组件 provide 的数据👇🏻<br>
      常规数据：{{ fromUp1 }} <br>
      响应式数据：{{ fromUpRef }} <button @click="fromUpRef = '我被后代组件更改了'">修改</button><br>
      默认值？：{{ fromUpx }} <br>
      函数默认值？：{{ fromUpx2 }} <br>
    </div>
  </div>
</template>

<style lang="scss" scoped>

</style>

```