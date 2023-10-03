<script setup>
import { useConverterStore } from '../stores/converter'
import { onMounted, ref } from 'vue'
import exportFromJSON from 'export-from-json'

const converterStore = useConverterStore()

let history = ref([])
const getHistory = async () => {
    const data = await converterStore.getHistory()
    history.value = data
}

const formatDate = (date) => {
    return new Date(date).toLocaleString('es-CL', { day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric' })
}



const downloadExcel = () => {
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
    }

}
onMounted(getHistory)


</script>

<template>
    <div class="">

        <h1>Historial de Conversiones</h1>

        <div class="flex my-2">
            <button @click="downloadExcel">Exportar</button>
        </div>
        <div class="relative overflow-y-scroll h-[34rem] rounded-xl">
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700" v-for="item in history">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
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