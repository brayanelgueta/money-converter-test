<script setup lang="ts">
import { useAuthStore, type LoginData } from '../stores/auth';
import { reactive, ref } from 'vue'
import {useToast} from 'vue-toast-notification'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()
const $toast = useToast()
let loading = ref(false)

const loginData = reactive<LoginData>({
    username: '',
    password: ''
})

const handleSubmit = async () => {
    loading.value = true
    try {
        await authStore.login(loginData)
            .then((response) => {
                if(response.status == 200){
                    $toast.success("Ingreso Exitoso!")
                    loading.value = false
                    router.push('/')
                }else if(response.status == 404){
                    loading.value = false
                    $toast.error("Usuario no existe")
                }else{
                    loading.value = false
                    $toast.error("Credenciales no coinciden") 
                }
                
            })
    } catch (error) {
        loading.value = false
        $toast.error("Ocurrio un error al intentar ingresar")
    }
}
</script>

<template>
    <div class="flex justify-center items-center h-full">
        <div
            class="relative flex flex-col items-center justify-center p-[4rem] h-[60%] gap-6 w-[30rem] bg-zinc-900 rounded-xl shadow-xl">
            <h1 class="font-light text-4xl">Login</h1>
            <div class=" flex flex-col  items-start gap-4">
                <label for="" class="flex justify-start text-sm font-medium leading-6 text-gray-200"> Usuario</label>
                <input type="text"
                    class=" p-2 block w-[15rem] rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    v-model="loginData.username">
                <label for="">password</label>
                <input type="password"
                    class="p-2 block w-[15rem] rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    v-model="loginData.password">
            </div>
            <div class="py-2">
                <button @click="handleSubmit"
                    class="flex w-[15rem] h-[2.5rem] justify-center items-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                    :disabled="loading">
                    <svg v-if="loading == true" aria-hidden="true" role="status"
                        class="inline w-4 h-4 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101"
                        fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor" />
                        <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="#1C64F2" />
                    </svg>
                    <template v-else>
                        <span>Ingresar</span>
                    </template>
                </button>

            </div>

        </div>
    </div>
</template>