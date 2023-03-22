<template>
  <div>
    <h1>I am Test2</h1>
    <button @click="increment">Click Me</button>
    <hr>
    <h1>Count: {{ count }}</h1>
  </div>
</template>

<script setup>
// import { ref, onMounted } from 'vue'
/*
ref(value), computed({get:()=>{}, set:(val)=>{}}), 
reactive({...} || [...] >> containing ref() in each value), 
watch(sources, callback, options) 
*/

/*
console.log(useAsyncData);
const { data, pending, error, refresh } = await useAsyncData(
  'mountains',
  () => $fetch('https://api.nuxtjs.dev/mountains')
)
*/
// reactive state
const count = ref(50)

// functions that mutate state and trigger updates
function increment() {
  count.value++
}

// lifecycle hooks
onMounted(() => {
  console.log(`The initial count is ${count.value}.`)
})

definePageMeta({
  layout: "auth",
});
</script>