import { defineStore } from 'pinia'
import axios from "axios"

const API_URL= import.meta.env.VITE_API_URL;


export const useReminderStore = defineStore('ReminderStore', {
    state: () => ({
        reminders: [],
        reminder: null
    }),
    getters: {
        getReminders: (state) => {
            return state.reminders;
        },
        getReminder: (state) => {
            return state.reminder;
        }
    },
    actions: {
        retrieveByUser: async function(userId) {
            await axios.get(`${API_URL}/api/reminders/user/${userId}`)
                .then(res => {
                    this.reminders = res.data
                })
                .catch(err => {
                    throw `${err.codef} - ${err.message}`
                })
        },
        mark: async function(vm) {
            debugger;
            await axios.post(`${API_URL}/api/reminders`, vm)
                .then(res => {
                })
                .catch(err => {
                    throw `${err.code} - ${err.message}`
                })
        },
        unmark: async function(id) {
            await axios.delete(`${API_URL}/api/reminders/${id}`)
                .then(res => {
                })
                .catch(err => {
                    throw `${err.code} - ${err.message}`
                })
        },
        reminder: async function(vm) {
            await axios.put(`${API_URL}/api/reminders/before`, vm)
                .then(res => {
                })
                .catch(err => {
                    throw `${err.code} - ${err.message}`
                })
        }
    }
})