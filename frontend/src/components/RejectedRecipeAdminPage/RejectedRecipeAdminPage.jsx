import "./RejectedRecipeAdminPage.css";
import { useEffect, useState } from 'react';
import { Box, SimpleGrid, Text, Stack, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, useDisclosure } from '@chakra-ui/react';
import axios from 'axios';
import SortButton from "../Buttons/SortButton";
import RecipeCard from "./RejectedRecipeCard";

function RejectedRecipeAdminPage() {
    const [recipes, setRecipes] = useState([]);
    const [reports, setReports] = useState([]);
    const { isOpen, onOpen, onClose } = useDisclosure();

    useEffect(() => {
        axios.get('http://localhost:5000/api/recipes/rejected', {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        }).then((response) => {
            setRecipes(response.data.map((recipe) => {
                recipe.picture = "data:image/png;base64," + recipe.picture;
                return recipe;
            }));
        }).catch((error) => {
            console.log(error);
        });
    }, []);

    function viewReports(id) {
        axios.get(`http://localhost:5000/api/recipes/reports/${id}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        }).then((response) => {
            setReports(response.data);
        }).catch((error) => {
            console.log(error);
        });
		onOpen();
    }

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
                            <RecipeCard recipeId={recipe._id} imageUrl={recipe.picture} nameRecipe={recipe.title} reports={recipe.reportNo} reportsOpen={viewReports}/>
                        ))}
                        {recipes.length === 0 && <Text textAlign='center'>No recipes found.</Text>}
                    </Box>
                </Stack>
            </Box>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Reports</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <SimpleGrid columns={1} spacing={1}>
                            {reports.map((report, index) => (<Text key={report._id}>{index + 1}: {report.reason}</Text>))}
                        </SimpleGrid>
                    </ModalBody>
                    <ModalFooter><Button colorScheme='blue' mr={3} onClick={onClose}>Close</Button></ModalFooter>
                </ModalContent>
            </Modal>
        </SimpleGrid>
    );
}

export default RejectedRecipeAdminPage;