import { defineStore } from 'pinia'
import axios from "axios"

const API_URL= import.meta.env.VITE_API_URL;

export const useResourceStore = defineStore('resourceStore', {
    state: () => ({
        resource: null,
        resources: []
    }),
    getters: {
        getResources: (state) => {
            return state.resources
        },
        getResource: (state) => {
            return state.resource
        },
    },
    actions: {
        retrieveResources: async function() {
            debugger
            await axios.get(`${API_URL}/api/resources`)
                .then(res => {
                    debugger
                    this.resources = res.data
                    debugger
                })
                .catch(err => {
                    throw `${err.code} - ${err.message}`
                })
        }
    }
})