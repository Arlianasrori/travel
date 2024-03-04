<script setup>
import BoxAds from '@/components/BoxAds.vue';
import Navbar from '@/components/Navbar.vue';


</script>

<template>
  <Navbar/>
  <div class="flex h-screen justify-center items-center relative mb-48">
    <img class=" absolute -z-10 bg-cover brightness-80" src="../assets/pexels-oziel-gómez-840667 1.png">
    <div class="flex flex-col items-center">
      <h1 class=" block font-Poppins text-8xl drop-shadow-md text-white font-semibold">Explore your dream</h1>
      <p class=" block mt-6 text-center text-snow drop-shadow-lg">Lorem ipsum, dolor sit amet consectetur adipis<span class="invisible"> ndjsndelit.Est</span> quod doloribus recusandae dignissimos quasi!</p>
      <button class=" bg-white text-secol text-sm border-8 px-3 border-white rounded-2xl top-20 relative">Start Now</button>
    </div>
  </div>
  <BoxAds/>

  <div class="flex relative mt-32 w-full h-full px-8">
    <img class="absolute right-0" src="../assets/image 2.png" alt="">
    <img class="absolute left-0" src="../assets/layered-waves-haikei 1.png" alt="">

    <div class="">
      
    </div>

  </div>
</template>

<style scoped>
</style>
