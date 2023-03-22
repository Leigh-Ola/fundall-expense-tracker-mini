<template>
  <div id="layout-parent" class="bg-theme-grayish-base w-full h-full sm:h-screen flex relative">
    <div id="layout-child" class="bg-white flex relative m-auto flex-col w-full h-full">
      <nav class="header w-[calc(100% - 200px)] flex justify-between items-center pt-10 px-2 sm:px-20">
        <NuxtLink to="/">
          <img src="~/assets/img/fundall_logo_with_text.svg" alt="FundAll Logo" class="mr-auto">
        </NuxtLink>
      </nav>
      <!-- <slot /> -->
    <div class="w-full flex flex-col sm:flex-row flex-grow sm:justify-center items-start mt-0">
      <div class="w-full sm:w-5/12 sm:mr-auto flex-col justify-center items-start">
        <img v-if="pageName=='signup'" src="~/assets/img/ballon.svg" alt="FundAll Logo" class="mx-auto mt-28 w-[277px] h-[204px]">
        <img v-else src="~/assets/img/flower.svg" alt="FundAll Logo" class="mx-auto mt-28 w-[277px] h-[204px]">
        <div class="text-[40px] w-full text text-center block pb-1 pt-3 font-bold text-theme-green">{{pageName=='login'? 'Welcome back!' : 'Welcome!'}}</div>
        <div class="text-[40px] w-full text text-center font-bold block">{{pageName=='login'? 'We miss you.' : "Let's get to know you."}}</div>
      </div>
      <div class="w-full mt-10 sm:mt-0 sm:w-7/12 sm:h-full h-auto relative flex overflow-hidden">
        <div id="page-box" class="flex sm:m-4 overflow-hidden rounded-md sm:absolute w-full sm:w-5/6 sm:h-5/6">
          <slot />
        </div>
      </div>
    </div>

    </div>
  </div>
</template>

<script setup>
import { state, setPageName } from '~/store/page'

const pageName = computed({
  get: () => state.pageName,
  set: value => setPageName(value),
})
</script>

<style>
body, html{
  padding: 0px; margin: 0px !important;
  background: green; font-size: 100%;
  background: #e5e5e5;
}
</style>
<style scoped>
/* main styling */
</style>

<style scoped>
/* desktop specific styling */
@media screen and (min-width: 800px){
  #layout-child{
    max-width: calc(100% - 64px);
    max-height: calc(100% - 87px);
    border-radius: 40px; 
    box-sizing: border-box;
    overflow: hidden;
    margin: auto;
  }
  #page-box{
    box-shadow: 0px 0px 3px black;
  }
}
</style>