<template>
  <nav class="flex mx-6 mt-5 justify-between">
    <div>
      <router-link to="/" class="flex text-white ml-8 text-3xl"><strong>X</strong>plore.</router-link>
    </div>
    <div class="mt-2">
      <router-link class="text-white py-2 px-3" to="/">Home</router-link>
      <router-link class="text-white py-2 px-3" to="/about">About</router-link>
      <router-link class="text-white py-2 px-3" to="/features">Features</router-link>
      <router-link class="text-white py-2 px-3" to="/reviews">Reviews</router-link>
      <router-link class="text-white py-2 px-3" to="/contactus">Contact Us</router-link>
      <router-link class=" login-link border-8 mr-3 border-white text-white py-1 px-4 ml-8 rounded-md" to="/login">Login</router-link>
    </div>
  </nav>
</template>
