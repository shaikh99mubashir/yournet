import NavigationService from "../../Routing/NavigationService";

export async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
        console.log('Authorization status:', authStatus);
        getFcmToken()
    }
}

const getFcmToken = async () => {
    try {
        const token = await messaging().getToken()
    } catch (error) {
        console.log("error in creating token")
    }

}


export async function notificationListeners() {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
        onDisplayNotification(remoteMessage)
    });


    messaging().onNotificationOpenedApp(remoteMessage => {
        console.log(
            'Notification caused app to open from background state:',
            remoteMessage,
        );
        NavigationService.navigate('Notification')
    });

    // Check whether an initial notification is available
    messaging()
        .getInitialNotification()
        .then(remoteMessage => {
            if (remoteMessage) {
                console.log(
                    'Notification caused app to open from quit state:',
                    remoteMessage.notification,
                );

            }
        });

    return unsubscribe;
}