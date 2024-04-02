importScripts('https://www.gstatic.com/firebasejs/8.1.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.1.1/firebase-messaging.js');

// 1. Initialize Firebase
var firebaseConfig = {
    apiKey              : "AIzaSyADmyLWZZy9b7BsNvgCZ0dhk_9HVANrIOc",
    authDomain          : "carbon-project-9a417.firebaseapp.com",
    projectId           : "carbon-project-9a417",
    storageBucket       : "carbon-project-9a417.appspot.com",
    messagingSenderId   : "13145217220",
    appId               : "1:13145217220:web:342be17f5a66840ea9d191"
};
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// 2. ------- handling background notifications
messaging.onBackgroundMessage((payload) => {
    const msgData = payload.notification || payload.data;

    const notificationTitle = msgData.title;
    const notificationOptions = {
        body: msgData.body,
        icon: "/icon-48x48.png"
    };
    self.registration.showNotification(notificationTitle, notificationOptions);
});

// 3. ------- handling notification click action
self.addEventListener('notificationclick', event => {
    event.notification.close();

    //https://stackoverflow.com/questions/30302636/clients-openwindow-not-allowed-to-open-a-window-on-a-serviceworker-google-c?rq=4
    event.waitUntil(
        //do we have some windows of our app?
        self.clients.matchAll({includeUncontrolled: true, type: 'window'})
            .then(clientList =>{
                if(clientList.length === 0){
                    return self.clients.openWindow('/timetable')
                        .then((windowClient) => {
                            //we should focus new window and return Promise to terminate our event
                            return windowClient ? windowClient.focus() : Promise.resolve()
                        })
                }
                else clientList[0].focus()

                return Promise.resolve()
            }))
});