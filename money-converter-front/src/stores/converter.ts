import { defineStore } from "pinia";
import { useApi, useApiPrivate } from "../composables/useApi";
import { User } from "./auth";
//models

export interface History {
    created_at: String,
    user: User,
    originValue: Number,
    convertionDate: String,
    moneyValue: Number,
    convertionValue: Number

}

export interface Convertion {

    value: Number,
    date: String,
    moneyValue: Number,
    totalAmount: Number
}

export interface requestData{
    date:String,
    value: Number
}

//states
export const useConverterStore = defineStore("converter", {
    state: (): Convertion => {
        return {
            value: 0,
            date: new Date().toLocaleDateString('es-CL', {day:"numeric",month:"numeric", year:"numeric" }) ,
            moneyValue: 0,
            totalAmount: 0

        }
    },
    actions: {
        async getConvertion (payload: requestData){
            try {
                const {data} = await useApi().post('/api/v1/getConvertion', payload)
                this.value = data.value
                this.date = data.date
                this.moneyValue = data.moneyValue
                this.totalAmount = data.totalAmount
                return data
            } catch (error) {
                console.log(error)
            }
        },
        async getHistory (){
            try{
                const {data} = await useApi().get('/api/v1/getHistory')
                return data
            }catch(error){
                console.log(error)
            }
        },
     
    }

})