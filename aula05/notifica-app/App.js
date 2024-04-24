import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import * as Notification from 'expo-notifications';
import { useEffect, useState, useRef } from 'react';

Notification.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,  /* aparecer a notificação */
    shouldPlaySound: true,  /* notificação com som */
    shouldSetBadge: true,   /* numero de notificações no app */
    // ios: { para usuarios de Iphone
    //   allowAlert: true,
    //   allowBadge: true, 
    //   allowSound: true,
    // }
  }),
});

export default function App() {
  const [expoToken, setExpoToken] = useState('');  /* vai armazenar o token que vai ser retornado pelo servidor do expo */

  //Referencia para quando a notificação chegar
  const notificationReceiveRef = useRef();

  //Referencia para quando a notificação for clicada
  const notificationResponseRef = useRef();

  useEffect(() => {
    registerForPushNotificationAsync().then(token => setExpoToken(token));

    notificationReceiveRef.current = Notification.addNotificationReceivedListener(notification => { console.log('notificação recebida: ', notification) });

    notificationResponseRef.current = Notification.addNotificationReceivedListener(notification => { console.log('notificação clicada: ', notification) });

  }, []);

  async function handleNotificationLocal() {
    schedulePushNotification();
  }

  return (

    <View style={styles.container}>

      <Text>Trabalhando com notificações no Expo!</Text>

      <Button

        title="Enviar notificações local"

        onPress={async () => { await handleNotificationLocal() }}

      />

      <Text>{expoToken}</Text> 
      {/* token individual de cada usuario */}

      <StatusBar style="auto" />

    </View>
  );
}

async function schedulePushNotification() {
  await Notification.scheduleNotificationAsync({
    content: {
      title: "Notificação local",
      body: 'Este é um teste de notificação local acionado diretamente após o clique do botão.'

      //title:"Notificação local",
      //body: 'Este é um teste de notificação local com temporizador.'
    }, 
    trigger: null,
    //trigger: { seconds: 5 },
  })
};

async function registerForPushNotificationAsync() {
  let token;
  const { status: existingStatus } = await Notification.getPermissionsAsync();
  let finalStatus = existingStatus;
  if (existingStatus !== 'granted') {  /* granted serve para fazer a verificação */
    const { status } = await Notification.requestPermissionsAsync();
    finalStatus = status;
  }
  if (finalStatus !== 'granted') {
    alert("Voce nao tem permissao para receber notificações!");
    return;
  }

  token = (await Notification.getExpoPushTokenAsync({ projectId: 'cfa97459-0e47-4af3-98dd-fa984a4faad8' })).data;
  console.log(token);  // obter o ExponentPushToken[3NRa5qCQOnRdBlGL7Ul9N4]
  return token;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9c4c0',
    alignItems: 'center',
    justifyContent: 'center',
  },

});
