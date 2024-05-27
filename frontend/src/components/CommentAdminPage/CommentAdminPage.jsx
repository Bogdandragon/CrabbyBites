import "./CommentAdminPage.css";
import { Box, SimpleGrid, Text, Stack } from '@chakra-ui/react';
import SortButton from "../Buttons/SortButton";
import CommentCard from './CommentCard';
import { useEffect, useState } from 'react';
import axios from "axios";

function CommentAdminPage({noResults}) {

    const [reviews, setReviews] = useState([])
    const [users, setUsers] = useState([])


    axios.get('http://localhost:5000/api/reviews/reported', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    }).then((response) => {
        setReviews(response.data);
    }).catch((error) => {
        console.log(error);
    });

    axios.get('http://localhost:5000/api/users', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    }).then((response) => {
        setUsers(response.data);
    }
    ).catch((error) => {
        console.log(error);
    });

    return (
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
                    {reviews.map((review) => {
                    const user = users.find(u => u.id === review.userId);

                return (
                    <CommentCard 
                        imageUrl='crab.png' 
                        username={user ? user.name : ''} 
                        reports={review.reportNo} 
                        ratingStars={review.rating} 
                        commentText={review.comment}
                        commentId={review.id}
                    />
                );
            })}
            {reviews.length === 0 && <Text textAlign='center'>No reviews found.</Text>}  
        </Box>
                </Stack>
            </Box>
        </SimpleGrid>
    );
}

export default CommentAdminPage;