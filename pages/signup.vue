<template>
    <div
      class="flex flex-col justify-center p-auto px-3 sm:px-0 m-auto overflow-hidden flex-grow sm:flex-grow-0 sm:w-5/6 w-full h-full box-border">
      <!-- Inputs -->
      <div class="w-full flex justify-between items-center">
        <div class="w-5/12">
          <div class="text-xs mt-5" :class="{ 'text-theme-green': isFirstNameValid }">
            First Name
          </div>
          <div class="flex-shrink-0 w-full h-11 rounded-sm border border-solid overflow-hidden"
            :class="[isFirstNameValid ? 'border-theme-green' : 'border-theme-border']">
            <InputComponent type="text" placeholder="Enter First Name" name="First Name" @error="errors.firstName = $event"
              @input="values.firstName = $event" />
          </div>
        </div>
        <div class="w-5/12">
          <div class="text-xs mt-5" :class="{ 'text-theme-green': isLastNameValid }">
            Last Name
          </div>
          <div class="flex-shrink-0 w-full h-11 rounded-sm border border-solid overflow-hidden"
            :class="[isLastNameValid ? 'border-theme-green' : 'border-theme-border']">
            <InputComponent type="text" placeholder="Enter Last Name" name="Last Name" @error="errors.lastName = $event"
              @input="values.lastName = $event" />
          </div>
        </div>
      </div>
      <div class="text-xs mt-5" :class="{ 'text-theme-green': isEmailValid }">
        Email Address
      </div>
      <div class="flex-shrink-0 w-full h-11 rounded-sm border border-solid overflow-hidden"
        :class="[isEmailValid ? 'border-theme-green' : 'border-theme-border']">
        <InputComponent type="email" placeholder="Enter Email" name="Email Address" @error="errors.email = $event"
          @input="values.email = $event" />
      </div>
      <div class="text-xs mt-5" :class="{ 'text-theme-green': isPasswordValid }">
        Password
      </div>
      <div class="flex-shrink-0 w-full h-11 rounded-sm border border-theme-border border-solid overflow-hidden"
        :class="[isPasswordValid ? 'border-theme-green' : 'border-theme-border']">
        <InputComponent type="password" placeholder="Enter Password" name="Password" @error="errors.password = $event"
          @input="values.password = $event" />
      </div>
      <div class="text-xs mt-5" :class="{ 'text-theme-green': isConfirmPasswordValid }">
        Confirm Password
      </div>
      <div class="flex-shrink-0 w-full h-11 rounded-sm border border-theme-border border-solid overflow-hidden"
        :class="[isConfirmPasswordValid ? 'border-theme-green' : 'border-theme-border']">
        <InputComponent type="password" placeholder="Confirm Password" name="Confirm Password"
          :validate="(v) => v == values.password ? null : 'Passwords do not match'" @error="errors.confirmPassword = $event"
          @input="values.confirmPassword = $event" />
      </div>

      <!-- input error -->
      <div class="text-sm text-amber-900 w-full text-center mt-2 hidden" ref="errorEl">
        {{ errorMessage }}
      </div>

      <!-- Submit button -->
      <button
        class="bg-theme-green active:bg-theme-green-darkest shrink-0 text-black font-bold rounded-sm w-full h-11 mt-10"
        @click.stop="submit">
        SIGN UP
      </button>

      <!-- Extra links -->
      <div class="w-full text-center mt-3 mb-3 text-xs">
        Already have an account? <NuxtLink to="/login" class="text-theme-green">Login Here</NuxtLink>
      </div>
    </div>
</template>

<script setup>
import { setPageName } from '~/store/page'
const config = useRuntimeConfig();

let errorEl = ref();

setPageName('signup')
definePageMeta({
  layout: "auth",
});

// collect and store input data
let values = reactive({
  email: ref(),
  password: ref(),
  confirmPassword: ref(),
  firstName: ref(),
  lastName: ref()
});
let errors = reactive({
  email: ref(),
  password: ref(),
  confirmPassword: ref(),
  firstName: ref(),
  lastName: ref()
})

// computed values to check if input data is valid
let isEmailValid = computed({
  get: () => {
    return (values.email) && (!errors.email);
  },
  set: (value) => {
    return value;
  }
})
let isPasswordValid = computed({
  get: () => {
    return (values.password) && (!errors.password);
  },
  set: (value) => {
    return value;
  }
})
let isConfirmPasswordValid = computed({
  get: () => {
    return (values.confirmPassword) && (!errors.confirmPassword);
  },
  set: (value) => {
    return value;
  }
})
let isFirstNameValid = computed({
  get: () => {
    return (values.firstName) && (!errors.firstName);
  },
  set: (value) => {
    return value;
  }
})
let isLastNameValid = computed({
  get: () => {
    return (values.lastName) && (!errors.lastName);
  },
  set: (value) => {
    return value;
  }
})
let errorMessage = computed(() => {
  return ((errors.email || errors.password ||
    errors.confirmPassword || errors.firstName || errors.lastName) || '');
})

// hide error message when input data changes
watch(values, (v) => {
  showError(false);
})

// util functions
function showError(show) {
  let raw_el = unref(errorEl);
  if (!raw_el) return;
  raw_el.style.display = show ? 'block' : 'none';
}
async function submit() {
  if (unref(errorMessage)) {
    showError(true);
  } else {
    unref(errorEl).innerText = '';
    let { email, password, confirmPassword, firstName, lastName } = unref(values);
    let body = { email, password, password_confirmation: confirmPassword, firstname: firstName, lastname: lastName };
    // submit data
    let { data, error } = await useFetch(config.BASE_API_URL + '/api/v1/register', {
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
      onResponse({ response }) {
        // When registration is successful, redirect to login page
        let isSuccesful = response._data?.success?.status == 'SUCCESS';
        if (isSuccesful) {
          navigateTo("/login");
        }
      },
      onResponseError({ response }) {
        // Show the response error
        let responseErrorMessage = response._data.error.message;
        unref(errorEl).innerText = responseErrorMessage;
        showError(true);
      }
    });
    if (unref(data) && !unref(error)) {
      // console.log(unref(data)); // {success: {}}
    }
  }
}

</script>

<style></style>
<style lang="scss"></style>