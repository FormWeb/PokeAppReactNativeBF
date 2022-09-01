import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

export default function Form({ navigation }) {

    const [pokemonName, setPokemonName] = useState("")

    const handlePress = () => {
        navigation.navigate("Detail", {
            pokemonName: pokemonName
        })
    }

    return (
        <View style={styles.container}>
            <View style={styles.form}>
                <TextInput style={styles.input}
                    value={pokemonName} onChangeText={t => setPokemonName(t)}></TextInput>
                <Button style={styles.button} title="Search a pokemon"
                    onPress={handlePress}></Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        paddingTop: 10
    },
    form: {
    },
    input: {
        backgroundColor: "white",
        borderRadius: 5,
        width: 300,
        height: 50,
        marginBottom: 10,
    },
    button: {
        width: 300
    }
})