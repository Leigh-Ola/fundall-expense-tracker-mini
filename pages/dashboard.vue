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

setPageName('dashboard')
definePageMeta({
  layout: "dashboard",
});

onBeforeMount(async () => {
    // let storeUser = user();
    if(!user.id){
        // get access token from local storage
        let token = JSON.parse(localStorage.getItem('user'))?.access_token;
        if(token){
            // fetch user data from api
            await useFetch(config.BASE_API_URL+'/api/v1/base/profile', {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer '+token
                },
                onRequestError({response}) {
                    // Back to login
                    console.log('request error:', response);
                    navigateTo('/login');
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
                    // Back to login
                    let responseErrorMessage = response._data?.error;
                    console.log("Response error:", responseErrorMessage)
                    navigateTo('/login');
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