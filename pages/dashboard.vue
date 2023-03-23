<template>
    <div
        class="flex flex-col lg:flex-row justify-between px-3 lg:px-0 m-auto mt-4 lg:overflow-hidden overflow-visible flex-grow lg:flex-grow-0 lg:w-11/12 w-full h-full box-border">
        <!-- left panel -->
        <div class="first-panel h-full order-1 w-full lg:w-5/12 lg:pr-5 box-border flex flex-col">
            <!-- name and pic -->
            <div class="w-full flex shrink-0">
                <!-- <img class="h-[93px] rounded-3xl" :src="user.avatar" alt="Profile picture"> -->
                <img class="h-[93px] rounded-3xl" src="~/assets/img/profile_picture.svg" alt="Profile picture">
                <div class="flex-grow my-auto flex flex-col ml-5 justify-center">
                    <span class="text-2xl">{{ user.firstname }} {{ user.lastname }}</span>
                    <span>{{ user.email }}</span>
                </div>
            </div>
            <!-- expenses -->
            <div class="w-full flex flex-col py-4 shrink-0 box-border">
                <span>Target Monthly Expenses</span>
                <span class="flex items-center"><img class="h-3" src="~/assets/img/naira.svg" alt="N"> <span
                        class="font-bold"> {{ user.total_balance || '' }} </span> </span>
                <div class="w-full h-1 block mt-4 bg-theme-grayish-dark rounded-full">
                    <div class="h-full rounded-full bg-theme-green" :style="{ 'width': `${expenses_percent}` }"></div>
                </div>
            </div>
            <div class="w-full flex flex-col pt-5 grow box-border">
                <span class="text-sm pb-3">Daily Expenses Summary</span>
                <div class="flex-grow w-full flex flex-col">
                    <div class="w-full flex text-sm">
                        <span class="grow text-center">Date</span><span class="grow text-center">Amount</span>
                    </div>
                    <div class="grow flex flex-col w-full">
                        <img v-if="expenses.length == 0" class="m-auto" src="~/assets/img/boxman.svg" alt="N">
                        <div v-for="expense in expenses" class="w-full flex h-1/3">
                            <div class="rounded-full self-start w-2 h-2 my-auto bg-theme-green"></div>
                            <div class="grow h-full flex justify-center items-center">
                                <span>{{ expense.date }}</span>
                            </div>
                            <div class="w-1/2 shrink-0 h-full text-theme-green-dark flex justify-center items-center">
                                <img class="h-3 pr-1" src="~/assets/img/naira.svg" alt="N">
                                <span>{{ prettifyCurrency(expense.total) }}</span>
                            </div>
                        </div>
                        <div v-show="expenses.length > 0" class="flex justify-center w-full relative mt-auto shrink-0">
                            <div class="mr-4">
                                <input
                                    class="w-6 text-center rounded-md border border-solid border-theme-grayish-base bg-theme-grayish-dark"
                                    type="text" v-model="pager.currentPage" :disabled="pager.totalPages == 1">
                                of 5
                            </div>
                            <img @click="pager.currentPage--" class="mr-2 w-4 rotate-180" src="~/assets/img/arrow_right.svg"
                                alt="<">
                            <img @click="pager.currentPage++" class="w-4" src="~/assets/img/arrow_right.svg" alt=">">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- right panel -->
        <div
            class="second-panel h-full order-2 flex flex-col w-full mt-3 lg:mt-0 lg:w-7/12 p-3 px-4 box-border rounded-3xl bg-theme-grayish md:overflow-y-scroll">
            <!-- header -->
            <div class="w-full rounded-sm h-24 shrink-0 flex bg-white mt-5 relative">
                <div
                    class="absolute z-20 pl-5 flex flex-col justify-center bg-opacity-25 lg:bg-opacity-0 bg-white w-full h-full left-0 top-0">
                    <div class="text-3xl text-theme-green font-bold">Welcome back, <span class="text-black">{{
                        user.firstname }}</span></div>
                    <div class="">Now let's get your expenses for the month</div>
                </div>
                <img class="absolute z-10 right-2 bottom-2 h-28" src="~/assets/img/skater.svg" alt="Skater Image">
            </div>
            <div class="flex flex-col px-3 pb-2 lg:pb-0 w-full grow">
                <!-- target input -->
                <div class="text-xs mt-5 mb-1">
                    Target Monthly Expenses
                </div>
                <div class="flex-shrink-0 w-full max-w-md h-11 rounded-md border border-solid overflow-hidden">
                    <InputComponent type="text" placeholder="Enter Amount" name="Expenses" :default="values.target"
                        :validate="v => isNaN(getNumber(v)) ? 'Target Monthly Expense must be a number' : null"
                        @error="errors.target = $event" @input="values.target = getNumber($event)" />
                </div>
                <!-- date input -->
                <div class="text-xs mt-5 mb-1">
                    Date
                </div>
                <div
                    class="date-box flex-shrink-0 w-full max-w-md h-11 rounded-md border border-solid overflow-visible bg-white">
                    <VueDatePicker v-model="values.date" :flow="flow" :enable-time-picker="false" placeholder="Select Date">
                    </VueDatePicker>
                </div>
                <!-- expenses inputs -->
                <div class="text-xs mt-5 mb-1">
                    Target Monthly Expenses
                </div>
                <div v-for="expense in values.expenses" class="flex w-full mb-2 flex-shrink-0 justify-between">
                    <div class="w-3/5 pr-3 box-border h-11 rounded-md overflow-hidden">
                        <InputComponent type="text" placeholder="Enter Item" name="Monthly Expense Name"
                            @error="errors.expenseName = $event" @input="expense.name = $event" :default="expense.name" />
                    </div>
                    <div class="grow h-11 rounded-md border border-solid overflow-hidden">
                        <InputComponent type="text" placeholder="Enter Amount" name="Monthly Expense Amount"
                            :validate="v => isNaN(getNumber(v)) || !v ? 'Monthly Expenses Amount must be a number' : null"
                            @error="errors.expenseVal = $event" @input="expense.amount = getNumber($event)"
                            :default="expense.amount" />
                    </div>
                </div>
                <div class="w-full h-9 shrink-0 my-2 font-bold flex flex-wrap items-center justify-end">
                    Total Actual Expenses:
                    <img class="h-20 max-h-3 block ml-2" src="~/assets/img/naira.svg" alt="N">
                    <div
                        class="max-w-xs w-auto font-normal ml-1 pr-8 pl-2 h-full flex items-center bg-white rounded-md border border-solid border-theme-green">
                        {{ totalAmount }}
                    </div>
                </div>
                <!-- input error -->
                <div class="text-xs text-amber-900 capitalize w-full text-center hidden" ref="errorEl">
                    {{ errorMessage }}
                </div>
                <!-- submit button -->
                <div class="w-full flex mt-5 h-9">
                    <button @click="submit"
                        class="px-3 mx-auto bg-theme-green-dark active:bg-theme-green-darkest rounded-xl font-bold">SAVE
                        TODAY'S EXPENSES</button>
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

const flow = ref(['month', 'year', 'calendar']);
const config = useRuntimeConfig();
let errorEl = ref();

setPageName('dashboard')
definePageMeta({
    layout: "dashboard",
});

onBeforeMount(async () => {
    /* 
    // For offline Testing
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
    */
    if (!user.id) {
        // get access token from local storage
        let token = JSON.parse(localStorage.getItem('user'))?.access_token;
        if (token) {
            // fetch user data from api
            await useFetch(config.BASE_API_URL + '/api/v1/base/profile', {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                onRequestError({ response }) {
                    // Back to login
                    console.log('request error:', response);
                    navigateTo('/login');
                },
                onResponse({ response }) {
                    // When registration is successful, save acces token to localstorage and the remaining data to harlem store
                    let isSuccesful = response._data?.success?.status == 'SUCCESS';
                    if (isSuccesful) {
                        let userData = response._data.success.data;
                        updateUser(userData)
                        console.log(JSON.parse(JSON.stringify(unref(user))))
                    }
                },
                onResponseError({ response }) {
                    // Back to login
                    let responseErrorMessage = response._data?.error;
                    console.log("Response error:", responseErrorMessage)
                    navigateTo('/login');
                }
            });
        } else {
            // redirect to login page
            navigateTo('/login')
        }
    }
})

// get the percentage of spant amount compared to monthly target;
let expenses_percent = computed(() => {
    let { total_balance, spent } = unref(user);
    total_balance = getNumber(total_balance) || 0;
    spent = getNumber(spent) || 0;
    let percent = (spent / total_balance) * 100;
    percent = isNaN(percent) ? 0 : percent;
    percent = percent > 100 ? 100 : percent;
    return percent + "%";
})

// collect and store input data
let values = reactive({
    target: ref(),
    date: ref(''),
    expenses: ref([
        { name: '', amount: '' },
        { name: '', amount: '' },
        { name: '', amount: '' },
    ])
})
let errors = reactive({
    target: ref(),
    expenseName: ref(''),
    expenseVal: ref('')
})
let expenses = reactive([
    // {date: 'Mar 23 2023', total: 20000}
])
let pager = reactive({
    totalPages: ref(5),
    currentPage: ref(1)
})

// sum of expenses
let totalAmount = computed(() => {
    let total = 0;
    unref(values.expenses).forEach((expense) => {
        total += getNumber(expense.amount);
    })
    return total;
})
// computed message to check if input data is valid
let errorMessage = computed(() => {
    return (errors.target || errors.expenseName || errors.expenseVal) || '';
})

// hide error message when input data changes
watch(values, (v) => {
    showError(false);
})
// dont exceed page boundaries
watch(pager, (v) => {
    if (v.currentPage < 1) v.currentPage = 1;
    if (v.currentPage > v.totalPages) v.currentPage = v.totalPages;
})

// util functions
function prettifyCurrency(num) {
    return (num).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
}
function getNumber(str) { // converts a string (ie: '15,000.00') to a number (ie: 15000)
    return Number(String(str).replace(/,/g, ''));
}
function showError(show) { // shows the error element on the page
    let raw_el = unref(errorEl);
    if (!raw_el) return;
    raw_el.style.display = show ? 'block' : 'none';
}
async function submit() {
    // console.log(`Error message? ${Boolean(unref(errorMessage))} : "${unref(errorMessage)}"`)
    if (unref(errorMessage)) return showError(true);
    let { date, target, expenses: newExpenses } = unref(values);
    if (!date) {
        unref(errorEl).innerText = 'Select a valid date';
        return showError(true);
    }
    let obj = { date: (new Date(date).toDateString()).split(' '), target, total: unref(totalAmount), expenses: newExpenses };
    obj.date.shift(); // remove the first element. converts ['Thu', 'Mar', '23', '2023'] to "Mar 23 2023"
    obj.date = obj.date.join(' ');
    // console.log(JSON.parse(JSON.stringify(obj)));
    expenses.unshift({ date: obj.date, total: obj.total })
    if (expenses.length > 3) {
        expenses.pop();
    }
}
</script>

<style>
/* hide the border for the datepicker element */
.date-box .dp__input_wrap input {
    border: none;
    height: 44px;
}

/* hide the scrollbar for the second panel*/
.second-panel {
    overflow: -moz-scrollbars-none;
    -ms-overflow-style: none;
    scrollbar-width: none;
}

.second-panel::-webkit-scrollbar {
    width: 0 !important;
}
</style>
<style lang="scss"></style>