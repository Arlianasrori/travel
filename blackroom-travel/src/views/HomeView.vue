<script setup>
import Banner from "@/components/Banner.vue";
import Blog from "@/components/Blog.vue";
import BoxAds from "@/components/BoxAds.vue";
import Destination from "@/components/Destination.vue";
import Footer from "@/components/Footer.vue";
import Navbar from "@/components/Navbar.vue";
</script>

<template>
  <div class=" bg-bg-color">
    <Navbar />
    <div class="flex top-0 h-screen justify-center items-center relative mb-80">
      <img class=" absolute z-0 bg-cover brightness-80 -top-16" src="../assets/pexels-oziel-gómez-840667 1.png" />
      <div class="flex flex-col absolute items-center">
        <h1 class=" font-Poppins text-8xl drop-shadow-md text-white font-semibold">
          Explore your dream
        </h1>
        <p class=" mt-6 text-center text-snow drop-shadow-lg">
          Lorem ipsum, dolor sit amet consectetur adipis<span class="invisible">
            ndjsndelit.Est ss</span>
          quod doloribus recusandae dignissimos quasi!
        </p>
        <button class="bg-white text-secol text-sm border-8 px-3 border-white rounded-2xl top-24 relative">
          Start Now
        </button>
      </div>
    </div>
    <BoxAds />
    <Banner />
    <Destination />
    <Blog />

    <div class="mt-20 grid grid-cols-2 shadow-xl grid-flow-col mx-auto w-[86%]">
      <div class="bg-box-color rounded-l-lg h-170 col-span-1 font-Poppins">
        <div class="mt-28 ml-16">
          <p class="text-xs text-sectext mb-4">Lorem ipsum dolor sit amet</p>
          <h1 class="text-5xl font-semibold mb-6">Traveller's Reviews</h1>
          <p class="text-xs text-sectext">
            Proin id ligula dictum, convallis enim ut, facilisis massa. Mauris a
            nisi ut sapien blandit imperdie phasellus accumsan imperdiet tempor.
            Cras tincidunt, arcu nec eleifend porttitor, Duis ac augue ut lectus
            congue luctus. Vivamus eu lacus vestibulum, luctus ante dignissim,
            Integer id auge iaculis, iaculis orci ut, blandit quam. quam in,
            phar Proin id ligula dictum, convallis enim ut, massa. Mauris a nisi
            ut sapien blandit imperdie Interdum et fames ac ante ipsum primis in
            faucibus. Sed posuere egestas nunc ut tempus.
          </p>
          <button class="text-xs px-5 py-3 text-white bg-accent-color rounded-3xl mt-7">
            Learn More
          </button>
        </div>

        <div class="ml-16 mt-32 text-shadow-color">
          <p class="text-xs mb-4">Supported by:</p>
          <div class="flex gap-4">
            <img src="../assets/maestro.svg" alt="" />
            <img src="../assets/visa-verified.svg" alt="" />
            <img src="../assets/paypal.svg" alt="" />
            <img src="../assets/visa.svg" alt="" />
            <img src="../assets/mastercard.svg" alt="" />
          </div>
        </div>
      </div>
      <div class="bg-box-color rounded-r-lg h-170 col-span-1 font-Poppins flex flex-col px-18">
        <div class="flex mt-16">
          <div class="w-56 kotak h-44 rounded-lg bg-white relative text-accent-color hover:text-white">
            <div class="w-full flex justify-center">
              <img class="absolute -top-6 z-30" src="../assets/Ellipse 10.svg" alt="" />
              <img class="absolute top-8" src="../assets/Group.svg" alt="" />
              <img class="absolute left-3 bottom-0" src="../assets/quote_svgrepo.com (1).svg" alt="" />
            </div>
            <p class="relative top-14 text-[10px] font-semibold text-center">
              Jane Cooper
            </p>
            <p class="relative top-14 text-[6px] font-light mt-1 text-center">
              Lorem ipsum
            </p>
            <p class="relative top-16 text-[10px] px-6 font-light mt-1 text-center">
              Proin id ligula dictum, convallis enim ut, facilisis massa. Mauris
              a nisi ut sapien .
            </p>
          </div>
          <div class="w-56 kotak h-44 rounded-lg bg-white relative text-accent-color hover:text-white mt-6 ml-6">
            <div class="w-full flex justify-center">
              <img class="absolute -top-6 z-30" src="../assets/Ellipse 11.svg" alt="" />
              <img class="absolute top-8" src="../assets/Group.svg" alt="" />
              <img class="absolute left-3 bottom-0" src="../assets/quote_svgrepo.com (1).svg" alt="" />
            </div>
            <p class="relative top-14 text-[10px] font-semibold text-center">
              Floyd Miles
            </p>
            <p class="relative top-14 text-[6px] font-light mt-1 text-center">
              Lorem ipsum
            </p>
            <p class="relative top-16 text-[10px] px-6 font-light mt-1 text-center">
              Proin id ligula dictum, convallis enim ut, facilisis massa. Mauris
              a nisi ut sapien .
            </p>
          </div>
        </div>
        <div class="flex mt-2">
          <div class="w-56 kotak h-44 rounded-lg bg-white relative text-accent-color hover:text-white">
            <div class="w-full flex justify-center">
              <img class="absolute -bottom-6 z-30" src="../assets/Ellipse 8.svg" alt="" />
              <img class="absolute top-4" src="../assets/Group.svg" alt="" />
              <img class="absolute left-3 bottom-3" src="../assets/quote_svgrepo.com (1).svg" alt="" />
            </div>
            <p class="relative top-10 text-[10px] font-semibold text-center">
              Ronald Richards
            </p>
            <p class="relative top-10 text-[6px] font-light mt-1 text-center">
              Lorem ipsum
            </p>
            <p class="relative top-12 text-[10px] px-6 font-light mt-1 text-center">
              Proin id ligula dictum, convallis enim ut, facilisis massa. Mauris
              a nisi ut sapien .
            </p>
          </div>
          <div class="w-56 kotak h-44 rounded-lg bg-white relative text-accent-color hover:text-white ml-6 mt-6">
            <div class="w-full flex justify-center">
              <img class="absolute -bottom-6 z-30" src="../assets/Ellipse 9.svg" alt="" />
              <img class="absolute top-4" src="../assets/Group-1.svg" alt="" />
              <img class="absolute left-3 bottom-3" src="../assets/quote_svgrepo.com (1).svg" alt="" />
            </div>
            <p class="relative top-10 text-[10px] font-semibold text-center">
              Leslie Alexander
            </p>
            <p class="relative top-10 text-[6px] font-light mt-1 text-center">
              Lorem ipsum
            </p>
            <p class="relative top-12 text-[10px] px-6 font-light mt-1 text-center">
              Proin id ligula dictum, convallis enim ut, facilisis massa. Mauris
              a nisi ut sapien .
            </p>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<style scoped></style>
