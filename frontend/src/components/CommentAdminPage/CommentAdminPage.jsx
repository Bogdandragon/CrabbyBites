import {IconButton,Box,Flex} from '@chakra-ui/react'
import { SimpleGrid } from "@chakra-ui/react"
import { Text } from '@chakra-ui/react'
import { Center } from '@chakra-ui/react'
import {Stack} from '@chakra-ui/react';
import SortButton from "../Buttons/SortButton"
import CommentCard from './CommentCard';
import AdminPage from '../AdminPage/AdminPage';
import "./CommentAdminPage.css"

function CommentAdminPage({noResults}) {

    return (
        <AdminPage>
            <SimpleGrid columns={1} spacing={1} height='20vh' width='100%' ml={{base:'1vw',md:'2vw'}}>
                
                <Box>
                    <SimpleGrid columns={2} pt ='1vh' >
                        <Text pt={{base:'1.2vh', md:'2vh'}} textAlign="left"> RESULTS: {noResults} </Text>
                        <Text textAlign="right" mr='3vw'> SORT BY: <SortButton/></Text>
                    </SimpleGrid>
                </Box>
                <Box> 
                    <Stack>
                        <Box overflowY="auto" maxHeight="80vh" className='scrollable-box'>
                            <CommentCard imageUrl='crab.png' username='User1' reports='3' ratingStars='4' commentText='This is a comment'/>
                            <CommentCard imageUrl='crab.png' username='User1' reports='3' ratingStars='4' commentText='This is a comment'/>
                            <CommentCard imageUrl='crab.png' username='User1' reports='3' ratingStars='4' commentText='This is a comment'/>
                            <CommentCard imageUrl='crab.png' username='User1' reports='3' ratingStars='4' commentText='This is a comment'/>
                            <CommentCard imageUrl='crab.png' username='User1' reports='3' ratingStars='4' commentText='This is a comment'/>
                            <CommentCard imageUrl='crab.png' username='User1' reports='3' ratingStars='4' commentText='This is a comment'/>
                            <CommentCard imageUrl='crab.png' username='User1' reports='3' ratingStars='4' commentText='This is a comment'/>

                        </Box>
                    </Stack>
                </Box>
            </SimpleGrid>
        </AdminPage>
    );

}

export default CommentAdminPage;