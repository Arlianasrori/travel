<script setup>
import Footer from "@/components/Footer.vue";
import NavbarDark from "@/components/NavbarDark.vue";
import { RouterLink, RouterView } from "vue-router";

</script>

<style scoped>
.bg-second {
    background-color: #eaeaea;
    height: 200vh;
}
</style>

<template>
    <div class="bg-second">
        <div class="font-Poppins">
            <NavbarDark />

            <div class="container mb-170">
                <div class="bg-white px-18 rounded-xl flex flex-row justify-between mt-10 shadow-2xl"
                    style="height: 60vh; width: 85vw">
                    <div class="flex flex-col gap-4 justify-center" style="width: 100%">
                        <div class="flex flex-col gap-2">
                            <p class="text-secol text-xl">Lorem ipsum</p>
                            <h1 class="text-secol font-semibold text-4xl">
                                Lorem ipsum dolor sit amet
                            </h1>
                        </div>
                        <RouterLink class="py-2 px-5 rounded-xl text-white text-xs self-start bg-secol" to="/">Try now
                        </RouterLink>
                    </div>
                    <div class="flex justify-end">
                        <img src="../assets/undraw_traveling_yhxq 1.svg" alt="" />
                    </div>
                </div>
                <div class="mt-20 flex items-center justify-between">
                    <p class="font-bold mr-24 text-xl">Categories</p>
                    <div class=" flex gap-2">
                        <div
                            class="bg-card-color h-12 flex rounded-full shadow-lg flex-row gap-5 px-3 items-center justify-center justify-items-start">
                            <div class="flex flex-row w-36 items-center gap-1 cursor-pointer">
                                <img src="../assets/location-pin_svgrepo.com.svg" alt="" class="mx-2" />
                                <p class="text-xxs text-shadow-color">type: city/place</p>
                            </div>
                            <div class="flex flex-row w-36 items-center gap-1 cursor-pointer">
                                <h3 class="text-xl">|</h3>
                                <img src="../assets/mobil.svg" alt="" class="mx-2" />
                                <p class="text-xxs text-text-color">Transportation</p>
                                <img src="../assets/down-arrow-5-svgrepo-com.svg" />
                            </div>
                            <div class="flex flex-row w-36 items-center gap-1 cursor-pointer">
                                <h3 class="text-xl">|</h3>
                                <img src="../assets/kursi_fasilitas.svg" alt="" class="mx-2" />
                                <p class="text-xxs text-text-color">Fasility</p>
                                <img src="../assets/down-arrow-5-svgrepo-com.svg" />
                            </div>
                            <div class="flex flex-row w-36 items-center gap-1 cursor-pointer">
                                <h3 class="text-xl">|</h3>
                                <img src="../assets/price_icon.svg" alt="" class="mx-2" />
                                <p class="text-xxs text-text-color">Price</p>
                                <img src="../assets/down-arrow-5-svgrepo-com.svg" />
                            </div>
                            <div class="flex flex-row w-36 items-center gap-1 cursor-pointer">
                                <h3 class="text-xl">|</h3>
                                <img src="../assets/voucher_icon.svg" alt="" class="mx-2" />
                                <p class="text-xxs text-text-color">Use Voucher</p>
                                <img src="../assets/down-arrow-5-svgrepo-com.svg" />
                            </div>
                        </div>
                        <div class="relative rounded-full shadow-lg">
                            <input type="search" id="location-search"
                                class="py-4 pr-14 pl-4 z-20 text-xs text-shadow-color bg-card-color rounded-full"
                                placeholder="Search something.." required />
                            <button type="submit"
                                class="absolute rounded-r-full top-0 end-0 h-full p-2.5 text-sm font-medium text-white bg-secol">
                                <img src="../assets/search.svg" alt="">
                                <span class="sr-only">Search</span>
                            </button>
                        </div>
                    </div>

                </div>
                <div class=" mt-14 flex flex-row justify-between" style="width: 125%;">
                    <div class="">
                        <ul class=" flex flex-col gap-5">
                            <li class="">- Popular</li>
                            <li class=" text-sectext">Forest</li>
                            <li class=" text-sectext">Mountain</li>
                            <li class=" text-sectext">Beach</li>
                            <li class=" text-sectext">Waterfall</li>
                        </ul>
                    </div>

                    <div class=" absolute right-24 grid grid-cols-12">
                        <div class=" px-3 col-span-4 flex flex-col gap-3 mb-5">
                            <img src="../assets/product_img.png" alt="">
                            <p class=" font-semibold text-xl">Lorem ipsum dolor</p>
                            <div class=" flex items-center gap-10">
                                <button class=" text-white px-4 py-2 rounded-xl bg-accent-color">+  Add</button>
                                <p class=" text-xxs text-sectext">1242 reviews</p>
                                <img src="../assets/Group.svg" alt="">
                            </div>
                        </div>
                        <div class=" px-3 col-span-4 flex flex-col gap-3 mb-5">
                            <img src="../assets/product_img2.png" alt="">
                            <p class=" font-semibold text-xl">Lorem ipsum dolor</p>
                            <div class=" flex items-center gap-10">
                                <button class=" text-white px-4 py-2 rounded-xl bg-accent-color">+  Add</button>
                                <p class=" text-xxs text-sectext">1242 reviews</p>
                                <img src="../assets/Group-1.svg" alt="">
                            </div>
                        </div>
                        <div class=" px-3 col-span-4 flex flex-col gap-3 mb-5">
                            <img src="../assets/product_img3.png" alt="">
                            <p class=" font-semibold text-xl">Lorem ipsum dolor</p>
                            <div class=" flex items-center gap-10">
                                <button class=" text-white px-4 py-2 rounded-xl bg-accent-color">+  Add</button>
                                <p class=" text-xxs text-sectext">1242 reviews</p>
                                <img src="../assets/Group.svg" alt="">
                            </div>
                        </div>
                        <div class=" px-3 col-span-4 flex flex-col gap-3">
                            <img src="../assets/product_img4.png" alt="">
                            <p class=" font-semibold text-xl">Lorem ipsum dolor</p>
                            <div class=" flex items-center gap-10">
                                <button class=" text-white px-4 py-2 rounded-xl bg-accent-color">+  Add</button>
                                <p class=" text-xxs text-sectext">1242 reviews</p>
                                <img src="../assets/Group.svg" alt="">
                            </div>
                        </div>
                        <div class=" px-3 col-span-4 flex flex-col gap-3">
                            <img src="../assets/product_img5.png" alt="">
                            <p class=" font-semibold text-xl">Lorem ipsum dolor</p>
                            <div class=" flex items-center gap-10">
                                <button class=" text-white px-4 py-2 rounded-xl bg-accent-color">+  Add</button>
                                <p class=" text-xxs text-sectext">1242 reviews</p>
                                <img src="../assets/Group-1.svg" alt="">
                            </div>
                        </div>
                        <div class=" px-3 col-span-4 flex flex-col gap-3">
                            <img src="../assets/product_img6.png" alt="">
                            <p class=" font-semibold text-xl">Lorem ipsum dolor</p>
                            <div class=" flex items-center gap-10">
                                <button class=" text-white px-4 py-2 rounded-xl bg-accent-color">+  Add</button>
                                <p class=" text-xxs text-sectext">1242 reviews</p>
                                <img src="../assets/Group.svg" alt="">
                            </div>
                        </div>
                    </div>

                </div>
                

            </div>
            <Footer/>
        </div>
    </div>
</template>
