import { defineStore } from 'pinia'
import axios from "axios"

const API_URL= import.meta.env.VITE_API_URL;
const LOCALSTORAGE_KEY = "carbon-user"

export const useUserStore = defineStore('UserStore', {
    state: () => ({
        users: [],
        user: null,
        activities: null,
        summary: null
    }),
    getters: {
        getUser: (state) => {
            return state.user || JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY))
        },
        getSummary: (state) => {
            return state.summary
        },
        getActivities: (state) => {
            return state.activities
        }
    },
    actions: {
        retrieveUserById: async function(userId) {
            await axios.get(`${API_URL}/api/users/id/${userId}`)
                .then(res => {
                    this.user = res.data
                })
                .catch(err => {
                    throw `${err.code} - ${err.message}`
                })
        },
        retrieveUserSummary: async function() {
            await axios.get(`${API_URL}/api/users/summary`)
                .then(res => {
                    this.summary = res.data
                })
                .catch(err => {
                    throw `${err.code} - ${err.message}`
                })
        },
        retrieveUserActivities: async function(userId) {
            await axios.get(`${API_URL}/api/users/activities/id/${userId}`)
                .then(res => {
                    this.activities = res.data
                })
                .catch(err => {
                    throw `${err.code} - ${err.message}`
                })
        },

        upsertUser: async function(vm) {
            await axios.post(`${API_URL}/api/users`, vm)
                .then(res => {
                    this.user = res.data

                    // -- update localstorage
                    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(this.user))
                })
                .catch(err => {
                    throw `${err.code} - ${err.message}`
                })
        },
        uploadImage: async function(userEmail, img) {
            // --- create json paylood for posting to api
            const payload = new FormData();
            payload.append('imgfile', img.file);
            payload.append('userEmail', userEmail);

            // payload.append('imgname', b.filename); // v-model file to the input[type=file] element

            const res = await axios.post(`${API_URL}/api/users/img`, payload, {
                headers: {
                    "Accept"        : "application/json",
                    "Content-type"  : "multipart/form-data",
                }
            })
            .then(res => {
                this.user.photoUrl = res.data.photoUrl
            })
            .catch(err => {
                throw `${err.code} - ${err.message}`
            })
        },
        updateProfile: async function(vm) {
            debugger;
            await axios.put(`${API_URL}/api/users`, vm)
                .then(res => {
                    this.user = res.data
                })
                .catch(err => {
                    throw `${err.code} - ${err.message}`
                })
        }
    }
})