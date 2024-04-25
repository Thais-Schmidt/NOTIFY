import { StyleSheet, Text, View, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function DetalhesNotificacao() {

    const navigation = useNavigation();

    return (
        <View style={styles.container}>

            <Text style={styles.title}>Detalhes</Text>

            
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
