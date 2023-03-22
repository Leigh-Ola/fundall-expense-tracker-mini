<template>
  <div id="layout-parent" class="bg-theme-grayish-base w-screen h-screen flex relative">
    <div id="layout-child" class="bg-white flex relative m-auto flex-col w-full h-full">
      <nav class="header w-[calc(100% - 200px)] flex justify-between items-center pt-10 px-2 sm:px-20">
        <img src="~/assets/img/fundall_logo_with_text.svg" alt="FundAll Logo" class="mr-auto">
        <NuxtLink to="/login" class="login p-[10px] rounded-[10px] font-bold bg-transparent text-center mr-2 h-11 w-[112px]">LOG IN</NuxtLink>
        <NuxtLink to="/signup" class="login p-[10px] rounded-[10px] font-bold bg-theme-green-dark text-center mr-2 h-11 w-[112px]">SIGN UP</NuxtLink>
      </nav>
      <slot />
    </div>
  </div>
</template>

<style>
body, html{
  padding: 0px; margin: 0px !important;
  background: green; font-size: 100%;
  background: #e5e5e5;
}
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
}
</style>