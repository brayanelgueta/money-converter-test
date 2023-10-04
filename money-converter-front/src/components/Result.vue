<script setup>
import { useConverterStore } from '../stores/converter';
import { useAuthStore } from '../stores/auth';
import { computed } from 'vue'

const converterStore = useConverterStore()
const authStore = useAuthStore()

const convertion = computed(() => {
    return converterStore.$state
})

const user = computed(() => {
    return authStore.userType
})
</script>

<template>
    <div class="flex flex-col  w-[40%] justify-around items-center gap-6 h-[25rem] bg-zinc-900 rounded-xl shadow-xl">


        <div class="flex items-center justify-between text-xl gap-4">
            <div class="flex flex-col gap-2">
                <label for="" class="flex justify-start text-2xl font-medium leading-6 text-gray-200">Monto
                    Conversión:</label>
                <label for="" class="flex justify-start text-2xl font-medium leading-6 text-gray-200">{{ convertion.value
                }} UF</label>
                <label for="" class="flex justify-start text-2xl font-medium leading-6 text-gray-200">Fecha de
                    Conversión:</label>
                <label for="" class="flex justify-start text-2xl font-medium leading-6 text-gray-200">{{ convertion.date
                }}</label>
            </div>
            <div class="flex flex-col gap-2">
                <label for="" class="flex justify-start text-2xl font-medium leading-6 text-gray-200">Valor moneda:</label>
                <label for="" class="flex justify-start text-2xl font-medium leading-6 text-gray-200">{{
                    convertion.moneyValue.toLocaleString("es-CL", {
                        style: "currency",
                        currency: "CLP"
                    }) }}</label>
                <label for="" class="flex justify-start text-2xl font-medium leading-6 text-gray-200">Monto:</label>
                <label for="" class="flex justify-start text-2xl font-medium leading-6 text-gray-200">{{
                    convertion.totalAmount.toLocaleString("es-CL", {
                        style: "currency",
                        currency: "CLP"
                    }) }}</label>
            </div>



        </div>
        <template v-if="user == 'admin'">

            <RouterLink to="history">
                <button
                    class="flex w-[15rem] h-[2.5rem] justify-center items-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">
                    Ver Historial
                </button>
            </RouterLink>

        </template>
    </div>
</template>


