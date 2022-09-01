import axios from "axios";
import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import Icon from "../../assets/favicon.png"

export default function Detail({ route }) {

    const { pokemonName } = route.params

    const [pokemon, setPokemon] = useState()

    const getPokemon = async () => {
        const pokemonResponse = await axios.get("https://pokeapi.co/api/v2/pokemon/" + pokemonName)
        let pokemon = pokemonResponse.data

        const infoResponse = await axios.get("https://pokeapi.co/api/v2/pokemon-species/" + pokemon.id)
        const info = infoResponse.data

        pokemon = {...pokemon, 
            description: info.flavor_text_entries.find(p => p.language.name === "fr").flavor_text,
            nom: info.names.find(n => n.language.name === "fr").name
        }

        return pokemon
    }

    useEffect(() => {
        // axios.get("https://pokeapi.co/api/v2/pokemon/" + pokemonName)
        //     .then(({data}) => {
        //         console.log(data.sprites.front_default)
        //         let pokemon = data

        //         // Bonus
        //         axios.get("https://pokeapi.co/api/v2/pokemon-species/" + data.id)
        //             .then(({data}) => {
        //                 pokemon = {...pokemon,
        //                     description: data.flavor_text_entries.find(p => p.language.name === "fr").flavor_text,
        //                     nom: data.names.find(n => n.language.name === "fr").name}
        //                 setPokemon(pokemon)
        //             })

        //     })
        getPokemon()
            .then(
                (data) => setPokemon(data)
            )
            .catch((err) => console.log(err))
    }, [])

    return (
        <>
            {pokemon ? (
                <View style={styles.container}>
                    <Text style={styles.pokemonName}>{pokemon.nom} ({pokemon.id})</Text>
                    <Image style={styles.image} source={{
                        uri: pokemon.sprites.front_default
                    }}></Image>
                    {pokemon.types.map(
                        t => <Text key={t.id} style={styles.type} >{t.type.name}</Text>
                    )}
                    <Text style={styles.description}>{pokemon.description}</Text>
                </View>
            ) : (
                <Text>Erreur</Text>
            )}
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center"
    },
    pokemonName: {
        fontSize: 50,
        textTransform: "capitalize"
    },
    image: {
        height: 200,
        width: 200
    },
    type: {
        fontSize: 40,
        marginBottom: 10 
    },
    description: {
        textAlign: "center",
        width: "100%",
        padding: 10
    }
})