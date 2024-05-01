import {IconButton,Box,Flex} from '@chakra-ui/react'
import { SimpleGrid } from "@chakra-ui/react"
import { Text } from '@chakra-ui/react'
import RecipeCard from "./RecipeCard";
import {Stack} from '@chakra-ui/react';
import AdminPage from '../AdminPage/AdminPage';
import SortButton from "../Buttons/SortButton"

import "./RecipeAdminPage.css"

function RecipeAdminPage({noResults}) {

    return (
        <AdminPage>
            <SimpleGrid columns={1} spacing={1} height='20vh' width='99%' ml={{base:'1vw',md:'2vw'}} mr={{ base: '1vw', md: '2vw' }}>
                <Box>
                    
                    <SimpleGrid columns={2} pt ='1vh' >
                        <Text pt={{base:'1.2vh', md:'2vh'}} textAlign="left"> RESULTS: {noResults} </Text>
                        <Text textAlign="right" mr='3vw'> SORT BY: <SortButton/></Text>
                    </SimpleGrid>
                    
                </Box>
                <Box> 
                    <Stack>
                        <Box overflowY="auto" maxHeight="80vh" className='scrollable-box'>
                            <RecipeCard imageUrl="fruitTart.jpeg" nameRecipe="AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAaAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" reports="5"/>
                            <RecipeCard imageUrl="fruitTart.jpeg" nameRecipe="AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAaAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" reports="5"/>
                            <RecipeCard imageUrl="fruitTart.jpeg" nameRecipe="AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAaAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" reports="5"/>
                            <RecipeCard imageUrl="fruitTart.jpeg" nameRecipe="AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAaAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" reports="5"/>
                            <RecipeCard imageUrl="fruitTart.jpeg" nameRecipe="AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAaAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" reports="5"/>
                            <RecipeCard imageUrl="fruitTart.jpeg" nameRecipe="AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAaAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" reports="5"/>
                            <RecipeCard imageUrl="fruitTart.jpeg" nameRecipe="AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAaAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" reports="5"/>

                        </Box>
                    </Stack>
                </Box>
                </SimpleGrid>
        </AdminPage>

    );

}

export default RecipeAdminPage;