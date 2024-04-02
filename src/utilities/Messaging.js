// https://medium.com/@vedantsaraswat_44942/configuring-push-notifications-in-a-pwa-part-1-1b8e9fe2954

import { getMessaging, getToken } from "firebase/messaging";

// https://firebase.google.com/docs/cloud-messaging/js/client
const Messaging = {
    getNotificationToken: async function() {
        const fireMessage = getMessaging();

        return await getToken(fireMessage, {
            vapidKey: "BMoXrznRKRD0eey7-ZXjAMnXiK1ttQoS4nQiEdfk9fQh47ZQTaW1YKdWfKf99ophkYAHaRnje6xRFOacDoMzOaA"})
    }
}

export default Messaging