import { defineStore } from 'pinia'
import axios from "axios"

const API_URL= import.meta.env.VITE_API_URL;


export const useEmissionStore = defineStore('EmissionStore', {
    state: () => ({
        emissions: [],
        emission: null,
        averages: {},
        catAverages: [],
        history: [],
        lastEmissionId: 0
    }),
    getters: {
        getEmissions: (state) => {
            return state.emissions
        },
        getEmission: (state) => {
            return state.emission
        },
        getAverages: (state) => {
            return state.averages
        },
        getCatAverages: (state) => {
            return state.catAverages
        },
        getHistory: (state) => {
            return state.history
        }
    },
    actions: {
        retrieveById: async function(id) {
            await axios.get(`${API_URL}/api/emissions/id/${id}`)
                .then(res => {
                    this.emission = res.data
                })
                .catch(err => {
                    throw `${err.code} - ${err.message}`
                })
        },
        retrieveRanking: async function() {
            await axios.get(`${API_URL}/api/emissions/ranking`)
                .then(res => {
                    this.emissions = res.data
                })
                .catch(err => {
                    throw `${err.code} - ${err.message}`
                })
        },
        retrieveUserAverageEmission: async function(userId) {
            debugger;
            await axios.get(`${API_URL}/api/emissions/average/user/${userId}`)
                .then(res => {
                    this.averages = res.data
                })
                .catch(err => {
                    throw `${err.code} - ${err.message}`
                })
        },
        retrieveCategoryAverage: async function() {
            await axios.get(`${API_URL}/api/emissions/category/average`)
                .then(res => {
                    this.catAverages = res.data
                })
                .catch(err => {
                    throw `${err.code} - ${err.message}`
                })

        },
        retrieveHistory: async function(userId) {
            await axios.get(`${API_URL}/api/emissions/history/user/${userId}`)
                .then(res => {
                    this.history = res.data
                })
                .catch(err => {
                    throw `${err.code} - ${err.message}`
                })
        },

        postResult: async function(vm) {
            await axios.post(`${API_URL}/api/emissions`, vm)
                .then(res => {
                    if(res.data.lastId) {
                        this.lastEmissionId = res.data.lastId
                    }
                })
                .catch(err => {
                    throw `${err.code} - ${err.message}`
                })
        } 
    }
})