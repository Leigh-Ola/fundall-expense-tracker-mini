<template>
    <div id="layout-parent" class="bg-theme-grayish-base w-screen h-screen flex relative">
      <div id="layout-child" class="bg-white flex relative m-auto lg:pb-10 flex-col w-full h-full box-border">
        <nav class="header w-[calc(100% - 200px)] flex items-end justify-between h-20 px-2 lg:px-20">
          <NuxtLink to="/">
            <img src="~/assets/img/fundall_logo_with_text.svg" alt="FundAll Logo" class="mr-auto">
          </NuxtLink>
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
  @media screen and (min-width: 1024px){
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