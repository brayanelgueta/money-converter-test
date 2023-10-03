<script setup>
import { computed } from 'vue'
import router from '@/router'
import { useAuthStore } from '@/stores/auth';
import { RouterLink } from 'vue-router';

const authStore = useAuthStore()

const user = computed(() => {
  return authStore.username
})

const isAuthenticated = computed(() => {
  return authStore.isAuthenticated
})

const logout = async () => {
  await authStore.logout().then(res => {
    router.push('/login')
  })
    .catch(e => console.log(e.message))
}
</script>

<template >
  <div class="absolute left-0 top-0 bg-black w-full h-[4rem] px-4 flex justify-between">
    <ul class="flex justify-end items-center h-full gap-4">
        <li>
          <RouterLink to="/">Converter</RouterLink>
        </li>
      </ul>
    <ul v-if="isAuthenticated" class="flex justify-end items-center h-full gap-4">
      <li>{{ user }}</li>
      <li class="cursor-pointer" @click="logout"><a>Logout</a></li>
    </ul>
    <template v-else>
     
      <ul class="flex justify-end items-center h-full gap-4">
        <li>
          <RouterLink to="login">Login</RouterLink>

        </li>
        <li>
          <RouterLink to="register">Register</RouterLink>
        </li>
      </ul>

    </template>
  </div>
</template>
