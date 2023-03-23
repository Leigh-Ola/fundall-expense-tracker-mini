<template>
    <div class="flex flex-col lg:flex-row justify-between px-3 lg:px-0 m-auto mt-4 overflow-hidden flex-grow lg:flex-grow-0 lg:w-11/12 w-full h-full box-border">
        <!-- left panel -->
        <div class="h-full order-2x min-h-full w-full lg:w-5/12 lg:pr-5 box-border flex flex-col">
            <!-- name and pic -->
            <div class="w-full flex shrink-0">
                <img class="h-[93px] rounded-3xl" src="~/assets/img/profile_picture.svg" alt="Profile picture">
                <div class="flex-grow my-auto flex flex-col ml-5 justify-center">
                    <span class="text-2xl">{{ user.firstname }} {{ user.lastname }}</span>
                    <span>{{ user.email }}</span>
                </div>
            </div>
            <!-- expenses -->
            <div class="w-full flex flex-col py-4 shrink-0 box-border">
                <span>Target Monthly Expenses</span>
                <span class="flex"><img src="~/assets/img/naira.svg" alt="N"> <span class="ml-1 font-bold"> {{ user.monthly_target || ''}} 20,000 </span> </span>
                <div class="w-full h-1 block mt-4 bg-theme-grayish-dark rounded-full">
                    <div class="h-full rounded-full bg-theme-green" :style="{'width': `${expenses_percent}`}"></div>
                </div>
            </div>
            <div class="w-full flex flex-col pt-5 grow box-border">
                <span class="text-sm pb-3">Daily Expenses Summary</span>
                <div class="flex-grow w-full flex flex-col">
                    <div class="w-full flex text-sm">
                        <span class="grow text-center">Date</span><span class="grow text-center">Amount</span>
                    </div>
                    <div class="grow flex flex-col w-full">
                        <img class="m-auto" src="~/assets/img/boxman.svg" alt="N">
                    </div>
                </div>
            </div>
        </div>
        <!-- right panel -->
        <div class="h-full order-1x flex flex-col w-full mt-3 lg:mt-0 lg:w-7/12 p-3 px-4 box-border rounded-3xl bg-theme-grayish-base">
            <!-- header -->
            <div class="w-full rounded-sm h-24 flex bg-white mt-5 relative">
                <div class="absolute z-20 pl-5 flex flex-col justify-center bg-opacity-25 lg:bg-opacity-0 bg-white w-full h-full left-0 top-0">
                    <div class="text-3xl text-theme-green font-bold">Welcome back, <span class="text-black">{{ user.firstname }}</span></div>
                    <div class="">Now let's get your expenses for the month</div>
                </div>
                <img class="absolute z-10 right-2 bottom-2 h-28" src="~/assets/img/skater.svg" alt="Skater Image">
            </div>
            <div class="flex flex-col px-3 pb-2 lg:pb-0 w-full grow">
                <!-- inputs -->
                <div class="text-xs mt-5 mb-1" :class="{'text-theme-green': isEmailValid}">
                    Target Monthly Expenses
                </div>
                <div class="flex-shrink-0 w-full max-w-md h-11 rounded-md border border-solid overflow-hidden">
                    <InputComponent 
                        type="text" placeholder="Enter Amount" name="Expenses"
                        :default="'123'" :validate="v=> isNaN(Number(v))? 'Expenses must be a number' : null"
                        @error="errors.target = $event" 
                        @input="values.target = $event" 
                    />
                </div>
                <div class="text-xs mt-5 mb-1" :class="{'text-theme-green': isEmailValid}">
                    Date
                </div>
                <div class="flex-shrink-0 w-full max-w-md h-11 rounded-md border border-solid overflow-hidden">
                    <InputComponent 
                        type="text" placeholder="Select Date" name="Date"
                        :validate="v=> null"
                        @error="errors.target = $event" 
                        @input="values.target = $event" 
                    />
                </div>
                <div class="text-xs mt-5 mb-1" :class="{'text-theme-green': isEmailValid}">
                    Target Monthly Expenses
                </div>
                <div v-for="(name, amount) in values.expenses" class="flex w-full mb-2 flex-shrink-0 justify-between">
                    <div class="w-3/5 pr-3 box-border h-11 rounded-md overflow-hidden">
                        <InputComponent 
                            type="text" placeholder="Enter Item" name="Expenses Name"
                            @error="errors.expenseName = $event" 
                            @input="name = $event" 
                        />
                    </div>
                    <div class="grow h-11 rounded-md border border-solid overflow-hidden">
                        <InputComponent 
                            type="text" placeholder="Enter Amount" name="Expenses Value"
                            :validate="v=> isNaN(Number(v))? 'Expenses must be a number' : null"
                            @error="errors.expenseVal = $event" 
                            @input="amount = $event" 
                        />
                    </div>
                </div>
            </div>
        </div>
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

onBeforeMount(async () => {
    let userData = {
            "id": 575,
            "firstname": "John",
            "lastname": "Doe",
            "avatar": "https://res.cloudinary.com/fundall/image/upload/v1559037519/Dummy_to0t3i.jpg",
            "email": "johndoe@user.com",
            "total_balance": "15,000.00",
            "income": "12,000.00",
            "spent": "5,000.00"
        }
    return updateUser(userData)
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

// get the percentage of spant amount compared to monthly target;
let expenses_percent = computed(()=>{
    let {monthly_target, spent} = user;
    monthly_target = isNaN(Number(monthly_target))? 0 : Number(monthly_target);
    spent = isNaN(Number(spent))? 0 : Number(spent);
    let percent = (spent / monthly_target) * 100;
    percent = isNaN(percent)? 0 : percent;
    percent = percent > 100? 100 : percent;
    return percent+"%";
})

// collect and store input data
let values = reactive({
  target: ref(),
  date: ref(),
  expenses: ref([
    {name: '', amount: ''},
    {name: '', amount: ''},
    {name: '', amount: ''},
  ])
})
console.log(values.expenses)
let errors = reactive({
    target: ref(),
    date: ref(),
    expenseName: ref(''),
    expenseVal: ref('')
})

// computed values to check if input data is valid
let errorMessage = computed(()=>{
  return (errors.target || errors.date || errors.expenseName || errors.expenseVal) || '';
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
    console.log("Submitting...");
}
</script>

<style>
</style>
<style lang="scss">
</style>