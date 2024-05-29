import React, { useEffect } from 'react';
import { Text, Box, SimpleGrid, Center } from '@chakra-ui/react';
import IngredientsCard from '../IngredientsCard/IngredientsCard';
import SubmitButton from '../Buttons/SubmitButton';
import axios from 'axios';

function TransparentSidebar({callback}) {
    const [ingredients, setIngredients] = React.useState([]);

    const [letterIngredients , setLetterIngredients] = React.useState({
        A: [],
        B: [],
        C: [],
        D: [],
        E: [],
        F: [],
        G: [],
        H: [],
        I: [],
        J: [],
        K: [],
        L: [],
        M: [],
        N: [],
        O: [],
        P: [],
        Q: [],
        R: [],
        S: [],
        T: [],
        U: [],
        V: [],
        W: [],
        X: [],
        Y: [],
        Z: []
    });

    useEffect(() => {
        axios.get('http://localhost:5000/api/recipes/ingredients')
        .then((response) => {
            setIngredients(response.data.map((ingredient) => ingredient.name));
            console.log(response.data.map((ingredient) => ingredient.name));
        }).catch((error) => {
            console.log(error);
        });
        if (window.localStorage.getItem('letterIngredients')) {
            const letterIngredients = JSON.parse(window.localStorage.getItem('letterIngredients'));
            if (letterIngredients) {
                setLetterIngredients(letterIngredients);
                let selectedIngredients = [];
                Object.values(letterIngredients).forEach((ingredients) => {
                    selectedIngredients = selectedIngredients.concat(ingredients);
                });
                if (selectedIngredients.length > 0) {
                    axios.get('http://localhost:5000/api/recipes/search?ingredients=' + selectedIngredients)
                    .then((response) => {
                        callback(response.data);
                    }).catch((error) => {
                        console.log(error);
                    });
                }
            }
        }
    }, []);

    async function sectionIngredients(letter) {
        let ing = ingredients;
        if (ing.length == 0) {
            await axios.get('http://localhost:5000/api/recipes/ingredients')
            .then((response) => {
                setIngredients(response.data.map((ingredient) => ingredient.name));
                ing = response.data.map((ingredient) => ingredient.name);
            }).catch((error) => {
                console.log(error);
            });
        }
        const letterIngredients = window.localStorage.getItem('letterIngredients') ? JSON.parse(window.localStorage.getItem('letterIngredients')) : null;
        const filteredIngredients = ing.filter((ingredient) => ingredient[0] == letter.toLowerCase());
        return(filteredIngredients.map((ingredient) => {
            return { name: ingredient, selected: letterIngredients && letterIngredients[letter].includes(ingredient)};
        }))
    }

    function setSelectedIngredients(letter, selectedIngredients) {
        letterIngredients[letter] = selectedIngredients;
    }

    function search() {
        window.localStorage.setItem('letterIngredients', JSON.stringify(letterIngredients));
        let selectedIngredients = [];
        Object.values(letterIngredients).forEach((ingredients) => {
            selectedIngredients = selectedIngredients.concat(ingredients);
        });
        axios.get('http://localhost:5000/api/recipes/search?ingredients=' + selectedIngredients)
        .then((response) => {
            callback(response.data);
        }).catch((error) => {
            console.log(error);
        });
    }

    return (
        <Box h={{ base: "auto", lg: "90vh" }} w={{ base: '100%', md: '85%', lg: "30vw" }} bg='rgba(0, 0, 0, 0.3)' minHeight={{ md: "90vh" }}>
            <Text color="white" fontSize="4xl" className='title-font'>INGREDIENTS</Text>
            <Center pb='1vh'>
                <SubmitButton size='lg' text="Search" onClick={search}/>
            </Center>
            <Box h={{ base: "auto", lg: "75vh" }} w={{ base: '100%', lg: "30vw" }} bg='rgba(0, 0, 0, 0)'
                maxHeight={{ base: "40vh", md: "80vh" }} overflowY="auto" className='scrollable-box' pl='2vw' pr='3vw' pb='1vh'
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }} // Hide scrollbar for Firefox and IE
                sx={{
                    "&::-webkit-scrollbar": {
                        display: "none" // Hide scrollbar for Chrome, Safari, and Opera
                    }
                }}  >
                <SimpleGrid columns={2} spacing={4}>
                    {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((letter) => (
                        <IngredientsCard typeIngredients={letter} search={setSelectedIngredients} loadedIngredients={sectionIngredients(letter)}/>
                    ))}
                </SimpleGrid>
            </Box>
        </Box>
    );
}

export default TransparentSidebar;