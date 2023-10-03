<script setup>
import { useConverterStore } from '../stores/converter';
import { useAuthStore } from '../stores/auth';
import {computed} from 'vue'

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
    <div class="flex flex-col w-[40%] justify-center items-center gap-6 bg-gray-700 h-[25rem] rounded-xl relative">
        <div class="absolute top-0 left-0 bg-gray-400 w-full rounded-t-xl h-[3rem] flex items-center justify-center text-xl font-bold">
            Conversión
        </div>

        <div class="flex flex-col items-start text-xl">
            <label for="">Monto Conversión: {{ convertion.value }}</label>
            <label for=""> Fecha de Conversión:{{ convertion.date }}</label>
            <label for="">Valor moneda: {{ convertion.moneyValue}}</label>
            <label for="">Monto: {{ convertion.totalAmount }}</label>
        </div>
        <template v-if="user == 'admin'">
            <button>
                <RouterLink to="history">Ver Historial</RouterLink>
            </button>
        </template>
    </div>
</template>


