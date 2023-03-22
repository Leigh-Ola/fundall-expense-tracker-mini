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
            :default="'jg@user.com'"
            @error="errors.email = $event" 
            @input="values.email = $event" 
            />
          </div>
          <div class="text-xs mt-5" :class="{'text-theme-green': isPasswordValid}">
            Password
          </div>
        <div class="flex-shrink-0 w-full h-11 rounded-sm border border-theme-border border-solid overflow-hidden"
          :class="[isPasswordValid? 'border-theme-green' : 'border-theme-border']"
          >
          <InputComponent 
          type="password" placeholder="Enter Password" name="Password"
          :default="'jGalaxy123'"
            @error="errors.password = $event" 
            @input="values.password = $event" 
          />
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
import { getUser } from '~/store/user'
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

const date = ref();
const config = useRuntimeConfig();
let errorEl = ref();

setPageName('dashboard')
definePageMeta({
  layout: "dashboard",
});

// collect and store input data
let user = reactive({
    id: ref(),
    firstname: ref(),
    lastname: ref(),
    email: ref(),
    avatar: ref(),
    monthly_target: ref(),
    created_at: ref(),
    updated_at: ref(),
    token_type: ref(),
    expires_in: ref(),
})

onBeforeMount(async () => {
    let user = getUser();
    if(!user.id){
        // get access token from local storage
        let token = JSON.parse(localStorage.getItem('user'))?.access_token;
        if(token){
            // fetch user data from api
            console.log({token});
            let {data, error} = await useFetch(config.BASE_API_URL+'/api/v1/base/profile', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer '${token}'`
                },
                onRequestError({response}) {
                    // Handle the request errors
                    console.log('request error:', response);
                    // navigateTo('/login');
                },
                onResponse({ response}) {
                    // When registration is successful, save acces token to localstorage and the remaining data to harlem store
                    let isSuccesful = response._data?.success?.status == 'SUCCESS';
                    if(isSuccesful) {
                        let userData = response._data.success.data;
                        user.id = userData.id;
                        user.firstname = userData.firstname;
                        user.lastname = userData.lastname;
                        user.email = userData.email;
                        user.avatar = userData.avatar;
                        user.monthly_target = userData.monthly_target;
                        user.created_at = userData.created_at;
                        user.updated_at = userData.updated_at;
                        user.token_type = userData.token_type;
                        user.expires_in = userData.expires_in;
                        console.log(Object.entries(unref(user)))
                    }
                },
                onResponseError({ response}) {
                    // Show the response error
                    let responseErrorMessage = response._data.error?.message;
                    console.log('response error:', responseErrorMessage);
                }
                });
            
        }else{
            // redirect to login page
            navigateTo('/login')
        }
    }
})
</script>

<style>

</style>
<style lang="scss">
</style>