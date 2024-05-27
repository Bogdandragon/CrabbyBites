import { SimpleGrid, Box, GridItem, Text, Stack, HStack, VStack, Image, useBreakpointValue } from '@chakra-ui/react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, useDisclosure } from "@chakra-ui/react";
import React from 'react';
import StarRating from './StarRating';
import InfoButton from '../Buttons/InfoButton';
import axios from 'axios';

function CommentCard({imageUrl, username, reports, ratingStars,commentText, commentId}) {
    const stackDirection = useBreakpointValue({ base: 'column', md: 'row' });
    const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();

    return (    
        <Box bgColor='#F5F2F2' borderRadius='20' h={{base:'16vh',md:'20vh'}} mb='1vh' w='96%'>
            <SimpleGrid columns={2}>
                <GridItem pl= '1vw' pt='0.5vh'>
                    <Stack alignItems='start' justifyItems='start'>
                        <HStack>
                            <Image src={imageUrl} alt='Recipe Image' borderRadius='full' boxSize='50px'/>
                            <Text fontWeight="semibold" fontSize={{base:'sm',md:'lg'}}>{username}</Text>
                        </HStack>
                        <StarRating rating={ratingStars}/>
                        <Box overflowY="auto" maxHeight={{base:"4vh", md:"8vh"}} maxWidth={{base:"84vw", md:"50vw"}}>
                            <Text fontSize={{ base: 'sm', md: 'lg' }} textAlign="left">{commentText}</Text>
                        </Box>
                    </Stack>
                </GridItem>
                <GridItem pr= '1vw' pt='0.5vh' justifySelf="end">
                    <Box justifyContent="flex-end" alignItems="center">
                        {stackDirection === 'row' ? (
                        <HStack justifyContent="flex-end" alignItems="center" spacing={5}>
                            <Text fontWeight="semibold" fontSize={{ base: 'sm', md: 'lg' }}>
                            no. of reports: {reports}
                            </Text>
                            <InfoButton text="DELETE COMMENT" onClick={onDeleteOpen} />
                        </HStack>
                        ) : (
                        <VStack spacing={2} alignItems="flex-start">
                            <InfoButton text="DELETE COMMENT" />
                            <Text fontWeight="semibold" fontSize={{ base: 'sm', md: 'lg' }}>
                            no. of reports: {reports}
                            </Text>
                        </VStack>
                        )}
                    </Box>
                </GridItem>   
            </SimpleGrid>
            <Modal isOpen={isDeleteOpen} onClose={onDeleteClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Delete Comment</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                    Are you sure you want to delete this comment?
                    </ModalBody>
                    <ModalFooter>
                    <Button colorScheme="red" mr={3} onClick={() => {
                        // Add your deletion logic here
                        axios.delete(`http://localhost:5000/api/reviews/${commentId}`, {
                            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                        }).then((response) => {
                            console.log(response);
                        }
                        ).catch((error) => {
                            console.log(error);
                        });
                        onDeleteClose();
                    }}>Delete</Button>
                    <Button variant="ghost" onClick={onDeleteClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
                </Modal>

        </Box>                     
    );
}

export default CommentCard;