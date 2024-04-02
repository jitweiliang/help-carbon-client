import { defineStore } from 'pinia'
import axios from "axios"

const API_URL= import.meta.env.VITE_API_URL;


export const useEventStore = defineStore('EventStore', {
    state: () => ({
        events: [],
        event: null
    }),
    getters: {
        getEvents: (state) => {
            return state.events;
        },
        getEvent: (state) => {
            return state.event;
        }
    },
    actions: {
        retrieveLatestByUser: async function(userId) {
            await axios.get(`${API_URL}/api/events/latest/user/${userId}`)
                .then(res => {
                    this.events = res.data
                })
                .catch(err => {
                    throw `${err.code} - ${err.message}`
                })
        },
    }
})