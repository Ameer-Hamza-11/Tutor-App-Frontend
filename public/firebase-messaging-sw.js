/* eslint-disable no-undef */
importScripts("https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyAM3jqrPm4Sa33FZ1FJsEm4pWz9APsv-Dc",
  authDomain: "notification-react-a093a.firebaseapp.com",
  projectId: "notification-react-a093a",
  storageBucket: "notification-react-a093a.firebasestorage.app",
  messagingSenderId: "776064591063",
  appId: "1:776064591063:web:f345d4098b034edea6bc92",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("📩 Background message received:", payload);

  const notificationTitle = payload.notification?.title || "New Notification";
  const notificationOptions = {
    body: payload.notification?.body || "You have a new message",
    icon: "/logo192.png", 
    tag: `job_post_${payload?.data?.jobId || "generic"}`,
    data: payload?.data || {},
  };

  return self.registration.showNotification(notificationTitle, notificationOptions);
});
