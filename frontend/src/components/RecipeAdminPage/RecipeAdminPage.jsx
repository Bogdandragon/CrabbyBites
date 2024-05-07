import {IconButton,Box,Flex} from '@chakra-ui/react'
import { SimpleGrid } from "@chakra-ui/react"
import { Text } from '@chakra-ui/react'
import RecipeCard from "./RecipeCard";
import {Stack} from '@chakra-ui/react';
import AdminPage from '../AdminPage/AdminPage';
import SortButton from "../Buttons/SortButton"

import "./RecipeAdminPage.css"
import { useEffect, useState } from 'react';
import axios from 'axios';

function RecipeAdminPage() {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/recipes/review', {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        }).then((response) => {
            console.log(response.data)
            setRecipes(response.data.map((recipe) => {
                recipe.picture = "data:image/png;base64," + recipe.picture;
                return recipe;
            }));
        }).catch((error) => {
            console.log(error);
        });
    }, []);

    return (
        <SimpleGrid columns={1} spacing={1} height='20vh' width='99%' ml={{base:'1vw',md:'2vw'}} mr={{ base: '1vw', md: '2vw' }}>
            <Box>
                <SimpleGrid columns={2} pt ='1vh' >
                    <Text pt={{base:'1.2vh', md:'2vh'}} textAlign="left"> RESULTS: {recipes.length} </Text>
                    <Text textAlign="right" mr='3vw'> SORT BY: <SortButton/></Text>
                </SimpleGrid>
                
            </Box>
            <Box>
                <Stack>
                    <Box overflowY="auto" maxHeight="80vh" className='scrollable-box'>
                        {recipes.map((recipe) => (
                            <RecipeCard imageUrl={recipe.picture} nameRecipe={recipe.name} reports={recipe.reportNo}/>
                        ))}
                    </Box>
                </Stack>
            </Box>
        </SimpleGrid>
    );

}

export default RecipeAdminPage;