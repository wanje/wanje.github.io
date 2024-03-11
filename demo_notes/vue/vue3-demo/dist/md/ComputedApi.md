```html
<script setup>
import { computed } from 'vue';

  const firstName = ref('');
  const lastName = ref('');
  // computed 接收一个返回某值的getter函数
  const fullName = computed(() => firstName.value + ' · ' + lastName.value);

  // 可写的计算属性（计算属性默认是只读的，原则上不应该手动赋值），特殊场景下可通过设置`{ get, set }`两个属性方法来实现读写
  const fullName2 = computed({
    get() {
      return firstName.value + ' ' + lastName.value
    },
    set(newVal) {
      // 这里使用的是解构赋值语法
      [firstName.value, lastName.value] = newVal.split(' ')
    }
  });
</script>

<template>
  <div class="">
    <div>
      <h2><a target="_blank" href="./md/ComputedApi.md">计算属性：computed</a></h2>
      <p>语法1：<pre class="color-orange">const computedData = computed(() => value);</pre></p>
      <p>语法2：<pre class="color-orange">const computedData = computed({
        get() { return value },
        set() {...}
      });</pre></p>
      <p>该API返回的是一个`ref`对象，具有响应性</p>
      <div>
        <input v-model="firstName" type="text" placeholder="first name" />
        <br>
        <input class="mgtb-10 mgr-10" v-model="lastName" type="text" placeholder="last name" />
        <span>full name: </span>
        <span>{{ fullName }}</span>
      </div>
      <p>计算属性默认是只读的，原则上不应该手动赋值，特殊场景下可通过设置`{ get, set }`两个属性方法来实现读写</p>
      <input type="button" value="设置fullName为：名字 姓氏" @click="fullName2 = '名字 姓氏'" />
    </div>
  </div>
</template>

<style lang="scss" scoped>

</style>
```