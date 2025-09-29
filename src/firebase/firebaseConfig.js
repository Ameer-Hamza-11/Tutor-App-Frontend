import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";


const firebaseConfig = {
    apiKey: "AIzaSyAM3jqrPm4Sa33FZ1FJsEm4pWz9APsv-Dc",
    authDomain: "notification-react-a093a.firebaseapp.com",
    projectId: "notification-react-a093a",
    storageBucket: "notification-react-a093a.firebasestorage.app",
    messagingSenderId: "776064591063",
    appId: "1:776064591063:web:f345d4098b034edea6bc92",
    measurementId: "G-MQSXHDLYCY"
};


const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);


export const requestFCMToken = async () => {
    try {
        const token = await getToken(messaging, {
            vapidKey: import.meta.env.VITE_VAPID_KEY,
        })
        if (token) {
            console.log("FCM Token:", token);
            return token;
        } else {
            console.log("No registration token available. Request permission first.");
            return null;
        }

    } catch (error) {
        console.error("An error occurred while retrieving token. ", error);
    }
}
