<template>
    <div class="flex flex-col p-auto px-3 sm:px-0 m-auto overflow-hidden flex-grow sm:flex-grow-0 sm:w-5/6 w-full h-full box-border">
        <!-- <VueDatePicker v-model="date"></VueDatePicker> -->
        <div class="text-2xl w-full font-bold mb-2 mt-auto">
          Holla!
        </div>
        <div class="">
          Sign in to the vibe!
        </div>
        <!-- inputs -->
        <div class="text-xs mt-5" :class="{'text-theme-green': isEmailValid}">
          Email Address
        </div>
        <div class="flex-shrink-0 w-full h-11 rounded-sm border border-solid overflow-hidden"
          :class="[isEmailValid? 'border-theme-green' : 'border-theme-border']"
        >
          <InputComponent 
            type="email" placeholder="Enter Email" name="Email Address"
            @error="errors.email = $event" 
            @input="values.email = $event" 
            />
            <!-- :default="'jg@user.com'" -->
          </div>
          <div class="text-xs mt-5" :class="{'text-theme-green': isPasswordValid}">
            Password
          </div>
        <div class="flex-shrink-0 w-full h-11 rounded-sm border border-theme-border border-solid overflow-hidden"
          :class="[isPasswordValid? 'border-theme-green' : 'border-theme-border']"
          >
          <InputComponent 
          type="password" placeholder="Enter Password" name="Password"
          @error="errors.password = $event" 
          @input="values.password = $event" 
          />
          <!-- :default="'jGalaxy123'" -->
        </div>

        <!-- input error -->
        <div class="text-sm text-amber-900 w-full text-center mt-2 hidden" ref="errorEl">
          {{ errorMessage }}
        </div>

        <!-- submit -->
        <button class="bg-theme-green shrink-0 text-black font-bold rounded-sm w-full h-11 mt-10"
          @click.stop="submit"
        >
          LOGIN
        </button>

        <!-- Extra links -->
        <div class="w-full text-center mt-4 text-xs">
          Don't have an account? <NuxtLink to="/signup" class="text-theme-green">Register Here</NuxtLink>
        </div>
        <div class="w-full text-center mt-2 mb-auto text-xs">
          By clicking on login, you agree to our <span class="text-theme-green">Terms & Conditions and Privacy Policy</span>
        </div>
    </div>
</template>

<script setup>
import { setPageName } from '~/store/page'
import { updateUser } from '~/store/user'
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

const date = ref();
const config = useRuntimeConfig();
let errorEl = ref();

setPageName('login')
definePageMeta({
  layout: "auth",
});

// collect and store input data
let values = reactive({
  email: ref(),
  password: ref()
})
let errors = reactive({
  email: ref(),
  password: ref()
})

// computed values to check if input data is valid
let isEmailValid = computed({
  get: ()=> {
    return (values.email) && (!errors.email);
  },
  set: (value)=> {
    return value;
  }
})
let isPasswordValid = computed({
  get: ()=> {
    return (values.password) && (!errors.password);
  },
  set: (value)=> {
    return value;
  }
})
let errorMessage = computed(()=>{
  return (errors.email || errors.password) || '';
})

// hide error message when input data changes
watch(values, (v)=>{
  showError(false);
})

// util functions
function showError(show){
  let raw_el = unref(errorEl);
  if(!raw_el) return;
  raw_el.style.display = show? 'block' : 'none';
}
async function submit() {
  if(unref(errorMessage)){
    showError(true);
  }else{
    unref(errorEl).innerText = '';
    let {email, password} = unref(values);
    let body = {email, password};
    // submit data
    let {data, error} = await useFetch(config.BASE_API_URL+'/api/v1/login', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        // 'Authorization': "Bearer 'API_TOKEN'"
      },
      onRequestError() {
        // Handle the request errors
        unref(errorEl).innerText = "An error occurred. Please try again later.";
        showError(true);
      },
      onResponse({ response}) {
        // When registration is successful, save acces token to localstorage and the remaining user data to harlem store
        // then navigate to dashboard
        let isSuccesful = response._data?.success?.status == 'SUCCESS';
        if(isSuccesful) {
          let user = response._data.success.user;
          let {access_token: accessToken, ...userData} = user;
          localStorage.setItem('user', JSON.stringify({access_token: accessToken}));
          console.log(1);
          updateUser(userData)
          console.log("Going to dashboard...")
          navigateTo('/dashboard')
        }
      },
      onResponseError({ response}) {
        // Show the response error
        let responseErrorMessage = 
          response._data.error?.message || 
          "An error occurred. Please try again later.";
        unref(errorEl).innerText = responseErrorMessage;
        showError(true);
      }
    });
    if(unref(data) && !unref(error)){
      // console.log(unref(data)); // {success: {}}
    }
  }
}
</script>

<style>

</style>
<style lang="scss">
</style>