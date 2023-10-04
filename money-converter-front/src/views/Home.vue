<script setup>
import Form from '../components/Form.vue'
import Result from '../components/Result.vue'
</script>

<template>
    <div class=" flex flex-col gap-6 h-full">
        <h1>Convertir de UF a CLP</h1>
        <div class="flex gap-6 justify-center items-center ">
            <Form />
            <Result />
        </div>
    </div>
</template>