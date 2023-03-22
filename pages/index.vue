<template>
    <div class="w-full flex flex-col flex-grow justify-center items-center">
      <img src="~/assets/img/ballon.svg" alt="FundAll Logo" class="mx-auto w-[275px] h-[279px]">
      <div class="text-[40px] w-full text-center mb-3 font-bold">Fundall Expense Tracker</div>
      <div class="text-[24px] w-full text-center mb-10">Mini Project Frontend</div>
      <b class="text-[18px] w-full text-center">by Babatunde Fashola</b>
    </div>
</template>

<script setup>
</script>

<style>
/* page transitions */
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
/* layout transitions */
.layout-enter-active,
.layout-leave-active {
  transition: all 0.4s;
}
.layout-enter-from,
.layout-leave-to {
  opacity: 0;
  /* apply a slight blur and grayscale filter */
  filter: blur(1rem) grayscale(1);
}
</style>
<style lang="scss">
// span{
  // color: $primary;
  // variant
    // &--primary {
    //     background-color: $primary;
    //     color: $white;
    // }
// }
</style>