<script setup lang="ts">
import { reactive } from 'vue'
import {useRouter} from 'vue-router'
import {useToast} from 'vue-toast-notification'
import { RegisterData, useAuthStore } from '../stores/auth';


const register = reactive<RegisterData>({
    username: '',
    password: ''
})

const $toast = useToast()
const authStore = useAuthStore()

const router = useRouter()
const handleSubmit = async() => {
  await authStore.register(register)
  .then((response) => {
    if(response.status == 201){
        $toast.success("Registro Exitoso!")
        router.push('/login')
    }else{
        $toast.error("Usuario ya existe")
    }
  })
}
</script>

<template>
    <div class="h-[calc(100vh - 4rem)] flex flex-col items-center bg-gray-500 p-[4rem] h-[20rem] gap-6">
        <div class=" flex flex-col  items-center  ">
            <label for=""> Usuario</label>
            <input type="text" class="w-[15rem] p-2 rounded-full" v-model="register.username">
            <label for="">password</label>
            <input type="password" class="w-[15rem] p-2 rounded-full" v-model="register.password">
        </div>
        <div>
            <button @click="handleSubmit">Registrar</button>
        </div>

    </div>
</template>