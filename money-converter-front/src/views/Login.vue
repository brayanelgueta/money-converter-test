<script setup lang="ts">
import { useAuthStore, type LoginData } from '../stores/auth';
import { reactive, ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()


const loginData = reactive<LoginData>({
    username: '',
    password: ''
})

const handleSubmit = async () => {
    await authStore.login(loginData)
    .then(() => {
        router.push('/')

    })
}
</script>

<template>
    <div class="h-[calc(100vh - 4rem)] flex flex-col items-center bg-gray-500 p-[4rem] h-[20rem] gap-6">
        <div class=" flex flex-col  items-center  ">
            <label for=""> Usuario</label>
            <input type="text" class="w-[15rem] p-2 rounded-full" v-model="loginData.username">
            <label for="">password</label>
            <input type="password" class="w-[15rem] p-2 rounded-full" v-model="loginData.password">
        </div>
        <div>
            <button @click="handleSubmit">Ingresar</button>
        </div>

    </div>
</template>