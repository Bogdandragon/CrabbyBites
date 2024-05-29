import './CommentBox.css'
import { Box, Flex, Text, Stack, IconButton, Input, useToast, Image, useBreakpointValue } from '@chakra-ui/react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, useDisclosure, Select } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react'
import StarRating from '../CommentAdminPage/StarRating';
import axios from "axios";
import { SlFlag } from "react-icons/sl";

function CommentBox({reviewId, imageUrl, userId, ratingStars, commentText}) {
    const stackDirection = useBreakpointValue({ base: 'column', md: 'row' });

    const [username, setUsername] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();

    useEffect(() => {
        async function fetchUsername() {
            try {
                const response = await axios.get('http://localhost:5000/api/auth/username/' + userId);
                setUsername(response.data);
                setIsLoading(false);
            } catch(error) {
                console.log(error);
                setIsLoading(false);
            };
        }
        fetchUsername();
    }, []);

    const [selectedOption, setSelectedOption] = useState('');
    const [customInput, setCustomInput] = useState('');
    const [showCustomInput, setShowCustomInput] = useState(false);
    const handleChange = (event) => {
        setSelectedOption(event.target.value);
        if (event.target.value === 'custom') {
            setShowCustomInput(true);
        } else {
            setShowCustomInput(false);
        }
    };

    const handleCustomInputChange = (event) => {
        setCustomInput(event.target.value);
    };

    const handleSelection = () => {
        let reportComment = selectedOption === "custom" ? customInput : selectedOption;
        axios.post("http://localhost:5000/api/recipes/report", {
            id: reviewId,
            comment: reportComment,
            type: "REVIEW"
        }, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        }).then(() => {
            toast({
            title: 'Report sent.',
            description: 'Your report has been succsessfully registered.',
            status: 'success',
            duration: 5000,
            isClosable: true,
            });
            setTimeout(() => window.location.reload(), 1000);
        }).catch((error) => {
            toast({
            title: 'Error registering report.',
            description: error.response.data,
            status: 'error',
            duration: 5000,
            isClosable: true,
            });
        });
        onClose();
    };

    return (    
        <Box bgColor='#FFFFFF' borderRadius='5vh' h="auto" mb='2vh' w='96%' boxShadow="0 0 10px rgba(0, 0, 0, 0.1)" padding="3vh" >
            {isLoading ? <Text>Loading...</Text> :
                <Stack alignItems='start' justifyItems='start'>
                    <Flex width="100%" wrap="wrap" justifyContent="flex-start">
                        <Image src={imageUrl} alt='Recipe Image' borderRadius='full' boxSize='50px' mr="2vh"/>
                        <Text fontWeight="semibold" fontSize={{base:'sm',md:'lg'}} mr="5vh">{username}</Text>
                        <IconButton isRound={true} variant='solid' colorScheme='orange' fontSize='20' icon={<SlFlag />} alignSelf="right" onClick={onOpen}/>
                    </Flex>
                    <StarRating rating={ratingStars} />
                    <Box overflowY="auto" maxHeight={{base:"100px", md:"300px"}} w="90%" marginBottom="2vh">
                        <Text fontSize="md" textAlign="left" padding="2vh">{commentText}</Text>
                    </Box>
                    <Modal isOpen={isOpen} onClose={onClose}>
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader>Please tell us why you believe this content is inappropriate</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                <Box w="70%" h="60%" bgColor="#FFFFFF">
                                    <Text>Choose one from the options below:</Text>
                                    <Select variant="outline" placeholder="Select option" onChange={handleChange}>
                                        <option value="Inappropriate language">Inappropriate language</option>
                                        <option value="Unjust or irrelevant statements">Unjust or irrelevant statements</option>
                                        <option value="Too many typos">Too many typos</option>
                                        <option value="Other">Other</option>
                                        <option value="custom">Add custom complaint</option>
                                    </Select>
                                    {showCustomInput && (
                                        <Input placeholder="Enter complaint:" value={customInput} onChange={handleCustomInputChange} mt={2}/>
                                    )}
                                </Box>
                            </ModalBody>
                            <ModalFooter>
                                <Button colorScheme='greenBrand' mr={3} onClick={handleSelection}>Submit report</Button>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>
                </Stack>
            }
        </Box>                     
    );
}

export default CommentBox;