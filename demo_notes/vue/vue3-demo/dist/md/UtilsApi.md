```html
<script setup>
  
</script>

<template>
  <div>
    <h2><a target="_blank" href="./md/UtilsApi.md">工具性API</a></h2>
    <p><code>isRef()</code> 检查某个值是否为 ref，类似作用的还有 <code>isReactive()</code> 检查是否为 reactive 或 shallowReactive，<code>isReadonly()</code> 检查是否为 readonly 或shallowReadonly，而 <code>isProxy()</code> 则代表 `isReactive() || isReadonly()`</p>
    <p><code>unref()</code> 返回响应式数据的原始值，参数是 ref 则返回内部值，否则返回参数本身，实际就是 <span class="color-orange">val = isRef(val) ? val.value : val</span> 的语法糖。</p>
    <p><code>toRef()</code> 可以将值、ref 或 getter 函数规范化为 ref，即其将前面三种表示值的情况可以统一转换为一个 ref 的形式返回（普通值用ref包装后返回、ref值原样返回、getter时可通过`.value`方式访问但实际还是调用的getter），使得采用一样的`.value`访问方式，
      其还可以基于响应式对象上的某个属性来创建一个对应的 ref，这样返回的 ref 与源响应式对象属性值两边会保持同步，修改任何一方另一方也会同步修改。</p>
    <p>
      <code>toRefs()</code> 可以将一个响应式对象转换为一个普通对象，这个普通对象的每个属性都是指向源对象相应属性的 ref，每个单独的 ref 都是使用 toRef() 创建的，使得可以解构该对象的属性可仍然保持响应性，
      且解构后单独变量保存数据和源对象属性值之间的响应性两边保持同步变化，<span class="color-red">注意其只会对应源对象上已存在的可枚举的属性创建ref</span>。
    </p>
    <p><code>toValue(pram)</code> 方法作用是将传入的参数规范化为值，以便处理较多参数为响应式/非响应式/getter函数混用的取值场景（unref 的扩展版）：<br>
      1、若参数 pram 是一个<span class="color-orange">ref响应式数据</span>，它会返回该ref的值；<br>
      2、若函数 pram 是一个<span class="color-orange">getter(即有返回值的函数)</span>，则会调用该函数并返回其返回值；<br>
      3、若参数 pram 是一个非以上两种情况的其他值，则会原样返回该参数
    </p>
  </div>
</template>

<style lang="scss" scoped>

</style>

```