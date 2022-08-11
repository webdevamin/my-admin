importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyAsaG_zLDk78zWXzvujpgbM6rK2CsyVCJw",
  authDomain: "my-admin-e3edb.firebaseapp.com",
  projectId: "my-admin-e3edb",
  storageBucket: "my-admin-e3edb.appspot.com",
  messagingSenderId: "3945505613",
  appId: "1:3945505613:web:ce5df1c96923582670cd04",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  const { title, body } = payload.data;

  const notificationTitle = title;
  const notificationOptions = {
    body: body,
    icon: '/android-chrome-192x192.png'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
