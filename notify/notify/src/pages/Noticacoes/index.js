import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Pressable, ScrollView, Dimensions } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useState } from 'react';
import * as Notification from 'expo-notifications';

const windowWidth = Dimensions.get('window').width; //obter a largura da janela do dispositivo

Notification.setNotificationHandler({

    handleNotification: async () => ({

        shouldShowAlert: true,  /* aparecer a notificação */
        shouldPlaySound: true,  /* notificação com som */
        shouldSetBadge: true,   /* numero de notificações no app */
    }),

});

export default function Notificacoes() {

    const navigation = useNavigation();
    const route = useRoute();
    const [allNotifications, setAllNotifications] = useState(route.params?.itens);

    const notificacoesDetalhes = () => {
        navigation.navigate('DetalhesNotificacao');
    };

    const handlePress = (dados) => {
        console.log("view pressionada", dados);
        navigation.navigate('notificacoesDetalhes', { data: dados, });
    }

    return (
        <View style={styles.container}>

            <Text style={styles.title}>Notificações</Text>

            <Button
                onPress={notificacoesDetalhes}
                title="Exibir detalhes"
            />

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10
    },
    title: {
        fontSize: 21,
        fontWeight: 'bold'
    }
});
