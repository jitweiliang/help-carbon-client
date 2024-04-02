import { defineStore } from 'pinia'
import axios from "axios"

const API_URL= import.meta.env.VITE_API_URL;


export const useBulletinStore = defineStore('BulletinStore', {
    state: () => ({
        bulletins: [],
        bulletin: null
    }),
    getters: {
        getBulletins: (state) => {
            return state.bulletins;
        },
        getBulletin: (state) => {
            return state.bulletin;
        }
    },
    actions: {
        retrieveLatest: async function(userId) {
            await axios.get(`${API_URL}/api/bulletins/latest`)
                .then(res => {
                    this.bulletins = res.data
                })
                .catch(err => {
                    throw `${err.code} - ${err.message}`
                })
        },
        addMessage: async function(vm) {
            // { userId: userId, message: message, imgUrl: imgUrl, userName: userName }
            await axios.post(`${API_URL}/api/bulletins`, vm)
                .then(res => {
                })
                .catch(err => {
                })
        }
    }
})