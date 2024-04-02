// https://firebase.google.com/docs/auth/web/start
// https://firebase.google.com/docs/auth/web/manage-users

import { auth } from '@/utilities/FirebaseConfig';

import { createUserWithEmailAndPassword, GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth'
import { signInWithPopup, signInWithEmailAndPassword, updateProfile } from 'firebase/auth'

import Messaging from '@/utilities/Messaging';
import { useUserStore } from '@/stores/userStore'

const Authentication = {
    userStore: function() {
        return useUserStore()
    },
    registerEmail: async function(email, name, password) {
        // First we create a user, but THEY DON'T ACCEPT NAME
        await createUserWithEmailAndPassword(auth, email, password,)
            .then(async (ucred) => {
                // -- 1. create vm for upsert to user table
                const user = ucred.user;
                const userVM = {
                    provider  : ucred.user.providerId,
                    userName  : name,
                    userEmail : user.email
                }
                await this.userStore().upsertUser(userVM);

                // so we have to call ANOTHER function JUST TO UPDATE the NAME
                await updateProfile(ucred.user, {displayName: name})
            })
            .catch((err) => {
                //throw `${err.code} - ${err.message}`
                throw err
            })
    },


    authenticateEmail: async function(email, password) {
        await signInWithEmailAndPassword(auth, email, password)
            .then(async (ucred) => {
                // -- 1. get fcm token
                let token = null
                await Messaging.getNotificationToken()
                    .then(res => {
                        token = res
                    })

                // -- 2. create vm for upsert to user table
                const user = ucred.user;
                const userVM = {
                    provider  : user.providerId,
                    userName  : user.displayName,
                    userEmail : user.email,
                    token     : token
                }
                // -- Still need to do an upsert here in case nd to update token
                await this.userStore().upsertUser(userVM);
            })
            .catch((err) => {
                //throw `${err.code} - ${err.message}`
                throw err
            })
    },
    authenticateGoogle: async function() {
        await signInWithPopup(auth, new GoogleAuthProvider())
            .then(async (result) => {
                // -- 1. get fcm token
                let token = await Messaging.getNotificationToken()

                // -- 2. create vm for upsert to user table
                const user = result.user;
                const userVM = {
                    provider  : result.providerId,
                    userName  : user.displayName,
                    userEmail : user.email,
                    token     : token
                }
               
                await this.userStore().upsertUser(userVM);
            })
            .catch((err) => {
                // const email = err.customData.email;
                // const credentil = GoogleAuthProvider.credentialFromError(err);

                throw `${err.code} - ${err.message}`
            })
    },
    authenticateFacebook: async function() {
        await signInWithPopup(auth, new FacebookAuthProvider())
            .then(async (result) => {
                // -- 1. get fcm token
                let token = await Messaging.getNotificationToken()

                // -- 2. create vm for upsert to user table
                const user = result.user;
                const userVM = {
                    provider  : result.providerId,
                    userName  : user.displayName,
                    userEmail : user.email,
                    token     : token
                }

                await this.userStore().upsertUser(userVM);
            })
            .catch((err) => {
                // const email = err.customData.email;
                // const credentil = GoogleAuthProvider.credentialFromError(err);

                throw `${err.code} - ${err.message}`
            })
    }
}

export default Authentication