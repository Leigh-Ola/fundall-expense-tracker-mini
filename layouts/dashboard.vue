<template>
    <div id="layout-parent" class="bg-theme-grayish-base w-screen h-screen flex relative">
      <div id="layout-child" class="bg-white flex relative m-auto flex-col w-full h-full">
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