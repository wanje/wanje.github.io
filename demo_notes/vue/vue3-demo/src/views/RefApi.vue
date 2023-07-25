<script setup>
  // 实际将传入的值都包装成了一个对象，使得常规数据类型也能进行响应代理，注意其具有深层响应性
  const counter = ref(1); // 可用于所有数据类型，在JS中要通过`.value`去访问和修改其值，而html中会自动解包故无需通过`.value`访问
  function decrement() {
    counter.value--
  }
  function increment() {
    counter.value++
  }

  // 当一个 ref 值作为 reactive 对象内的属性时(可更深层)，JS访问对应属性时 ref 会自动解包，但原始 ref 还是要用`.value`访问
  // 这里提到的是对象内，如果是数据或Map这种几个类数据，则不会自动解包，访问时仍要通过`.value`
  //! 注意在模板语法中(即template中插值时)，只有最外层会被解包，内部不会解包，即使是对象的直接子属性也不会
  const state = reactive({ counter });  // 注意浅层响应对象 shadowReactive() 中不会自动解包
  console.log(state.counter); // 自动解包，不用通过`.value`访问
  console.log(counter.value); // 原始 ref 还是正常访问，且与 state.counter 的变化是同步的
  const users = reactive([ref('name')]);
  console.log(users[0].value); // 此处不会自动解包，仍然需要通过`.value`访问
</script>

<template>
  <div>
    <h2><a target="_blank" href="../src/views/RefApi.vue">响应式：ref</a></h2>
    <p>该API可用于 <span class="color-orange">所有数据类型</span>，且 <span class="color-orange">具有深层响应性</span>（即用于引用类数据时所有后代属性都具有响应性）</p>
    <p>当一个`ref`值作为`reactive`对象内的属性时(可更深层)，<span class="color-orange">JS访问对应属性时</span>`ref`会自动解包，但原始`ref`还是要用`.value`访问，
      这里提到的是对象内，<span class="color-orange">如果是数据或Map这种几个类数据，则不会自动解包</span>，访问时仍要通过`.value`，
      <span class="color-orange">另外注意在html模板语法中(即template中插值时)，只有最外层会被解包，内部不会解包，即使是对象的直接子属性也不会</span>
    </p>
    <p>
      <button @click="decrement">-</button>
      <!-- 这里为只读，故未使用双向绑定 v-model -->
      <input type="text" :value="counter" readonly />
      <button @click="increment">+</button>
    </p>
  </div>
</template>

<style lang="scss" scoped>
input {
  text-align: center;
}
</style>