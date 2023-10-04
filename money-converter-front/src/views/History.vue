<script setup>
import { useConverterStore } from '../stores/converter'
import { useAuthStore } from '../stores/auth';
import { onMounted, ref } from 'vue'
import exportFromJSON from 'export-from-json'
import { RouterLink } from 'vue-router';

const converterStore = useConverterStore()
const auth = useAuthStore()
let loading = ref(false)
console.log(auth.userType)
let history = ref([])
const getHistory = async () => {
    const data = await converterStore.getHistory()
    history.value = data
}

const formatDate = (date) => {
    return new Date(date).toLocaleString('es-CL', { day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric' })
}

const downloadExcel = () => {
    loading.value = true
    try {
        const newData = []
        history.value.map((item) => {
            const newItem = {
                Fechaactividad: formatDate(item.createdAt),
                Usuario: item.user,
                MontoOrigen: item.originValue,
                FechaConversion: item.convertionDate,
                ValorMoneda: item.moneyValue,
                MontoConversin: item.convertionValue
            }
            newData.push(newItem);
        })
        const data = newData
        const fileName = 'history'
        const exportType = 'xls'
        exportFromJSON({ data, fileName, exportType })
    } catch (error) {
        console.log(error)
    }finally{
        loading.value = false
    }

}
onMounted(getHistory)


</script>
<template>
    <template v-if="auth.userType == 'admin'">
        <div class="">

            <h1>Historial de Conversiones</h1>

            <button @click="downloadExcel" class="flex w-[15rem] h-[2.5rem] justify-center items-center rounded-md px-3 py-1.5 my-[2rem] text-sm font-semibold leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2" :disabled="loading">
            <svg v-if="loading == true" aria-hidden="true" role="status"
                class="inline w-4 h-4  animate-spin text-gray-600" viewBox="0 0 100 101" fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor" />
                <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="#1C64F2" />
            </svg>
            <template v-else>
                <span>Exportar a Excel</span>
            </template>
        </button>
            <div class="relative overflow-y-scroll h-[30rem] rounded-xl">
                <table class="w-full text-sm text-left  text-gray-400">
                    <thead class="text-xs  uppercase  bg-gray-700 text-gray-400">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                Fecha Actividad
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Usuario
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Monto origen
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Fecha Conversión
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Valor Moneda
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Monto Conversión
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class=" border-b bg-gray-800 border-gray-700" v-for="item in history">
                            <th scope="row" class="px-6 py-4 font-medium  whitespace-nowrap text-white">
                                {{ formatDate(item.createdAt) }} Hrs
                            </th>
                            <td class="px-6 py-4">
                                {{ item.user }}
                            </td>
                            <td class="px-6 py-4">
                                {{ item.originValue }} UF
                            </td>
                            <td class="px-6 py-4">
                                {{ item.convertionDate }}
                            </td>
                            <td class="px-6 py-4">
                                ${{ item.moneyValue }}
                            </td>
                            <td class="px-6 py-4">
                                ${{ item.convertionValue }}
                            </td>

                        </tr>

                    </tbody>
                </table>
            </div>
        </div>
    </template>
    <template v-else>
        <h2>Debes ser administrador para ver el historial</h2>
        <RouterLink to="/">Volver al Inicio</RouterLink>
    </template>
</template>