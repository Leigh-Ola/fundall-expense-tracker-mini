<template>
    <div class="flex flex-col p-auto px-3 sm:px-0 m-auto overflow-hidden flex-grow sm:flex-grow-0 sm:w-5/6 w-full h-full box-border">
    hi from dashboard
    </div>
</template>

<script setup>
import { setPageName } from '~/store/page'
import { user, updateUser } from '~/store/user'
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
// let user = reactive({
//     id: ref(),
//     firstname: ref(),
//     lastname: ref(),
//     email: ref(),
//     avatar: ref(),
//     monthly_target: ref(),
//     created_at: ref(),
//     updated_at: ref(),
//     token_type: ref(),
//     expires_in: ref(),
// })

function setUserData(userData){
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
}

onBeforeMount(async () => {
    // let storeUser = user();
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
                    // 'Content-Type': 'application/json',
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
                        updateUser(userData)
                        console.log(unref(user))
                    }
                },
                onResponseError({ response}) {
                    // Show the response error
                    let responseErrorMessage = response._data?.error;
                    console.log('response error:', responseErrorMessage);
                    // navigateTo('/login');
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