importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js');

// Replace the values with yours
const config = {
  apiKey: "AIzaSyAsaG_zLDk78zWXzvujpgbM6rK2CsyVCJw",
  authDomain: "my-admin-e3edb.firebaseapp.com",
  projectId: "my-admin-e3edb",
  storageBucket: "my-admin-e3edb.appspot.com",
  messagingSenderId: "3945505613",
  appId: "1:3945505613:web:ce5df1c96923582670cd04",
};

firebase.initializeApp({
  apiKey: "AIzaSyAsaG_zLDk78zWXzvujpgbM6rK2CsyVCJw",
  authDomain: "my-admin-e3edb.firebaseapp.com",
  projectId: "my-admin-e3edb",
  storageBucket: "my-admin-e3edb.appspot.com",
  messagingSenderId: "3945505613",
  appId: "1:3945505613:web:ce5df1c96923582670cd04",
  // apiKey: 'api-key',
  // authDomain: 'project-id.firebaseapp.com',
  // databaseURL: 'https://project-id.firebaseio.com',
  // projectId: 'project-id',
  // storageBucket: 'project-id.appspot.com',
  // messagingSenderId: 'sender-id',
  // appId: 'app-id',
  // measurementId: 'G-measurement-id',
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  const { title, body } = payload.data;

  const notificationTitle = title;
  const notificationOptions = {
    body: body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
