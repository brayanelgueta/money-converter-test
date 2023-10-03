<script setup>
import { useConverterStore } from '../stores/converter';
import { computed } from 'vue';
import axios from 'axios'

const converterStore = useConverterStore()
const data = computed(() => {
    return {
        date: formatDate(converterStore.date),
        value: converterStore.value
    }
})


const formatDate = (date) => {
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    return new Date(date).toLocaleDateString('es-CL', options).split('/').reverse().join('-');
};
const handleSubmit = async () => {
    const newData = {
        date: data.value.date ? formatDate(data.value.date) : new Date().toLocaleDateString('es-CL', {  day: 'numeric', month: 'numeric',year: 'numeric' }),
        value: data.value.value
    }
    await converterStore.getConvertion(newData)

}
</script>

<template>
    <div class="flex flex-col w-[40%] justify-center items-center gap-6 ">
        <label for="">Fecha</label>
        <input type="date" class="w-[15rem] p-4 rounded-full" v-model="data.date">
        <label>UF</label>
        <input type="number" class="w-[15rem] p-4 rounded-full" v-model="data.value">

        <button @click="handleSubmit">Convertir a CLP</button>

    </div>
</template>
