<template>
    <div class="bg-blue-600 w-full h-full flex items-start justify-start">

        <!-- xyz {{ text }} : {{  placeholder }} -->
        <input class="w-full h-full box-border p-3" 
            :type="type" :placeholder="placeholder" :name="name"
            @keyup="handleInput" v-model="value"
        />
    </div>
</template>

<script setup> 
// import { ref, defineEmits } from 'vue'
const emit = defineEmits(['input','error'])
const props = defineProps({ 
    type: String, // text, password, email
    placeholder: String, name: String,
    validate: Function, default: String
})
let value = ref(props.default || '');
let errors = {
    text(v){
        return v.length > 3 ? null : "Invalid "+props.name
    },
    password(v){
        if(typeof props.validate === 'function') return props.validate(v);
        // check that password is at least 6 characters long
        if(v.length < 6) return props.name+" must be at least 6 characters long";
        // check that password contains at least one number
        if(!/\d/.test(v)) return props.name+" must contain at least one number";
    },
    email(v){
        // use regex to run a comprehensive check that email is valid
        if(!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(v)) return "Invalid "+props.name;
    }
}
watch(value, (v)=>{
    emit('input', v)
    let error = errors[props.type](v) || null;
    emit('error', error)
}, {immediate: true})
</script>