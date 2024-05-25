import './RecipePage.css';
import 'react-multi-carousel/lib/styles.css';
import '@fontsource/dm-serif-display';
import Page from "../Page/Page";
import { Text, Textarea, HStack, VStack, Select } from '@chakra-ui/react';
import { SimpleGrid, Box, Center, useToast, Container, Flex, Image, IconButton, Input } from '@chakra-ui/react'
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, useDisclosure } from '@chakra-ui/react';
import { TimeIcon, MoonIcon, BellIcon, StarIcon } from '@chakra-ui/icons'
import { useNavigate, useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import RecipeCarousel from '../RecipeCarousel/RecipeCarousel';
import axios from "axios";
import CommentBox from "./CommentBox";
import { SlFlag } from "react-icons/sl";
import { FaStar } from "react-icons/fa";
import { InputGroup } from "react-bootstrap";
import SubmitButton from "../Buttons/SubmitButton";
import InfoButton from "../Buttons/InfoButton";

function RecipePage() {
    const navigate = useNavigate();
    const toast = useToast();
    const { id } = useParams();
    const [recipe, setRecipe] = useState();
    const [reviews, setReviews] = useState([]);
    const [visibleReviews, setVisibleReviews] = useState([]);
    const [limit, setLimit] = useState(5);
    const [showLoadMore, setShowLoadMore] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [commentModal, setCommentModal] = useState(false);
    const recipeApiUrl = "http://localhost:5000/api/recipes/" + id;
    const reviewsApiUrl = "http://localhost:5000/api/recipes/reviews/" + id;

    useEffect(() => {
        async function fetchRecipe() {
            try {
                const response1 = await axios.get(recipeApiUrl);
                response1.data.picture = 'data:image/png;base64,' + response1.data.picture;
                setRecipe(response1.data);

                const response2 = await axios.get(reviewsApiUrl);
                setReviews(response2.data);

                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching recipe:", error);
                setIsLoading(false);
            }
        }
        fetchRecipe();
    }, [recipeApiUrl, reviewsApiUrl]);

    useEffect(() => {
        setVisibleReviews(reviews.slice(0, limit));
        setShowLoadMore(reviews.length > limit);
    }, [reviews, limit]);

    const handleLoadMore = () => {
        setLimit(prevLimit => prevLimit + 5);
    };

    const [selectedOption, setSelectedOption] = useState('');
    const [customInput, setCustomInput] = useState('');
    const [showCustomInput, setShowCustomInput] = useState(false);
    const [rating, setRating] = useState(0);
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
            id: recipe._id,
            comment: reportComment,
            type: "RECIPE"
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

    const handleReview = () => {
        axios.post("http://localhost:5000/api/recipes/rate", {
            id: recipe._id,
            rating: rating,
            comment: customInput,
        }, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        }).then(() => {
            toast({
                title: 'Review sent.',
                description: 'Your review has been succsessfully registered.',
                status: 'success',
                duration: 5000,
                isClosable: true,
            });
            setTimeout(() => window.location.reload(), 1000);
        }).catch((error) => {
            toast({
                title: 'Error registering review.',
                description: error.response.data,
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        });

        onClose();
    };

    const handleRatingChange = (value) => {
        setRating(value);
    };

    return (
        <Page navigate={navigate}>
            <Box display="flex" justifyContent="center" alignItems="center">
                {isLoading ? <Text>Loading...</Text> :
                    <Flex justifyContent="center" bgImage={'cookingBackground.jpeg'} bgRepeat='repeat' width="100%" minH="100vh">
                        <Box backgroundColor="rgba(255, 255, 255, 1)" width="90%" display="flex" flexDirection="column" justifyContent="flex-start" alignItems="center" textAlign="center" borderRadius="5vh" mt="5vh">
                        <Text fontSize="5vh" fontWeight="bold" my="5vh" maxWidth="100%" maxHeight="25%">{recipe.name.toUpperCase()}</Text>
                        <Flex justifyContent="center" width="45%" mb="5vh" wrap="wrap">
                            <Container m="1vh" w="auto"><SubmitButton text="Add to TODO List" size="md" onClick={() => {
                                axios.post("http://localhost:5000/api/recipes/addTODO", {
                                    id: recipe._id,
                                }, {
                                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                                }).then(() => {
                                    toast({
                                        title: 'TODO recipe saved.',
                                        description: 'This recipe has been succsessfully added to your TODO list.',
                                        status: 'success',
                                        duration: 5000,
                                        isClosable: true,
                                    });
                                    setTimeout(() => window.location.reload(), 1000);
                                }).catch((error) => {
                                    toast({
                                        title: 'Error registering TODO recipe.',
                                        description: error.response.data,
                                        status: 'error',
                                        duration: 5000,
                                        isClosable: true,
                                    });
                                });
                            }} /></Container>
                            <Container m="1vh" w="auto"><SubmitButton text="Add to Favorites" size="md" onClick={() => {
                                axios.post("http://localhost:5000/api/recipes/addFavorite", {
                                    id: recipe._id,
                                }, {
                                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                                }).then(() => {
                                    toast({
                                    title: 'Favorite saved.',
                                    description: 'This recipe has been succsessfully added to your favorites.',
                                    status: 'success',
                                    duration: 5000,
                                    isClosable: true,
                                    });
                                    setTimeout(() => window.location.reload(), 1000);
                                }).catch((error) => {
                                    toast({
                                    title: 'Error registering favorite.',
                                    description: error.response.data,
                                    status: 'error',
                                    duration: 5000,
                                    isClosable: true,
                                    });
                                });
                            }}/></Container>
                            <Container m="1vh" w="auto"><IconButton isRound={true} variant='solid' colorScheme='orange' fontSize='20' icon={<SlFlag />} 
                                onClick={() => {
                                    setCommentModal(false);
                                    onOpen();
                                }}
                            /></Container>
                        </Flex>

                        <Flex justifyContent="center" mb="1vh" wrap="wrap" px="1vh">
                            <Text fontSize="2vh" fontWeight="bold" mx-="1vh">{recipe.category.toUpperCase()}</Text>
                            <Text fontSize="2vh" fontWeight="bold" mx="1vh">
                                <TimeIcon viewBox="0 0 25 30" mr="3px" />
                                {recipe.time} min.
                            </Text>
                            <Text fontSize="2vh" fontWeight="bold" mx="1vh">
                                <MoonIcon viewBox="0 0 25 30" mr="3px" />
                                {recipe.difficulty.toUpperCase()}
                            </Text>
                            <Text fontSize="2vh" fontWeight="bold" mx="1vh">
                                <BellIcon viewBox="0 0 25 30" mr="3px" />
                                {recipe.portions} SERVINGS
                            </Text>
                            <Text fontSize="2vh" fontWeight="bold" mx="1vh">
                                <StarIcon viewBox="0 0 25 30" mr="3px" />
                                {recipe.rating.toFixed(2)}
                            </Text>
                        </Flex>

                        <Flex w="80%" overflow="hidden" p="0" borderRadius="5vh" mb="2vh">
                            <Image src={recipe.picture} alt="Recipe Image" minW="100%" minH="50vh" maxH="75vh" objectFit="cover" />
                        </Flex>

                        <SimpleGrid columns={{base: 1, lg: 2}} spacing={10} mt="20px" width="100%" alignContent="left" px={{base: "5%", lg: "10%"}}>
                            <Box order={{base: 1, lg: 0}}>
                                <Text fontSize="3vh" fontWeight="bold" color="rgba(242, 120, 30, 1)" textAlign="left">INSTRUCTIONS</Text>
                                <ul>
                                    {recipe.instructions.map((instruction) => (
                                        <li><Text textAlign="left"> {instruction} </Text></li>
                                    ))}
                                </ul>
                            </Box>
                            <Box backgroundColor="rgba(247, 229, 198, 1)" borderRadius="5vh" padding={{base: "2vh", lg: "3vh"}}>
                                <Box backgroundColor="rgba(250, 244, 235, 1)" borderRadius="5vh" padding={{base: "2vh", lg: "3vh"}} marginBottom="3vh">
                                    <Text fontSize="3vh" fontWeight="bold" color="rgba(255, 120, 30, 1)" textAlign="left">DESCRIPTION</Text>
                                    <Text textAlign="left"> {recipe.description} </Text>
                                </Box>
                                <Box backgroundColor="rgba(250, 244, 235, 1)" borderRadius="5vh" padding={{base: "2vh", lg: "3vh"}}>
                                    <Text fontSize="3vh" fontWeight="bold" color="rgba(255, 120, 30, 1)" textAlign="left">INGREDIENTS</Text>
                                    <ul>
                                        {recipe.ingredients.map((ingredient) => (
                                            <li><Text textAlign="left">{`${ingredient.quantity} ${ingredient.measurement} ${ingredient.name}`}</Text></li>
                                        ))}
                                    </ul>
                                </Box>
                            </Box>
                        </SimpleGrid>
                        <Center my="1vh"><InfoButton text="Share" /></Center>
                        <Box borderRadius="5vh" boxShadow="0 0 20px rgba(0, 0, 0, 0.1)" display="flex" flexDirection="column" justifyContent="center" marginTop="10vh" marginBottom="10vh" width="90%">
                            <Flex justifyContent="center" wrap="wrap" width="100%" marginTop="5vh" marginBottom="5vh" alignSelf="center">
                                <Text fontSize="4vh" fontWeight="bold" color="rgba(0, 0, 0, 1)" textAlign="left" mr="60%"> COMMENTS </Text>
                                <InfoButton text="ADD COMMENT"  size="md"
                                    onClick={() => {
                                        setCommentModal(true);
                                        onOpen();
                                    }}
                                />
                            </Flex>
                            <Flex justifyContent="center" wrap="wrap" width="100%" marginBottom="5vh" alignSelf="center">
                                <VStack width="90%" marginTop="2vh">
                                    {visibleReviews.map((review) => (
                                        <CommentBox reviewId={review._id} imageUrl='crab.png' userId={review.userId} ratingStars={review.rating} commentText={review.comment}/>
                                    ))}
                                    {reviews.length == 0 && <Text textAlign='center'>There are no reviews yet.</Text>}
                                    {showLoadMore && (
                                        <Button onClick={handleLoadMore} colorScheme="green" width="95%">Load More</Button>
                                    )}
                                </VStack>
                            </Flex>
                            <Center><RecipeCarousel /></Center>
                        </Box>
                    </Box>
                        <Modal isOpen={isOpen} onClose={onClose}>
                            <ModalOverlay />
                            {commentModal ? 
                            <ModalContent>
                                <ModalHeader>Add a new review</ModalHeader>
                                <ModalCloseButton />
                                <ModalBody>
                                    <Box w="100%" h="100%" bgColor="#FFFFFF">
                                        <HStack marginBottom="3vh">
                                            {[...Array(5)].map((_, index) => (
                                                <IconButton key={index} variant="unstyled" icon={<FaStar size="5vh"/>} color={index < rating ? "yellow.500" : "gray.200"} onClick={() => handleRatingChange(index + 1)}/>
                                            ))}
                                        </HStack>
                                        <Text>Write your review here (optional):</Text>
                                        <InputGroup size="lg">
                                            <Textarea placeholder="Enter comment" value={customInput} onChange={handleCustomInputChange} resize="vertical" overflow="auto" minH="50vh" maxH="100vh"/>
                                        </InputGroup>
                                    </Box>
                                </ModalBody>
                                <ModalFooter><Button colorScheme='greenBrand' mr={3} onClick={handleReview}>Submit review</Button></ModalFooter>
                            </ModalContent>
                            :
                            <ModalContent>
                                <ModalHeader>Please tell us why you believe this content is inappropriate</ModalHeader>
                                <ModalCloseButton />
                                <ModalBody>
                                    <Box w="70%" h="60%" bgColor="#FFFFFF">
                                        <Text>Choose one from the options below:</Text>
                                        <Select variant="outline" placeholder="Select option" onChange={handleChange}>
                                            <option value="Wrong and unfelpful instructions">Wrong and unhelpful instructions</option>
                                            <option value="Inappropriate language">Inappropriate language</option>
                                            <option value="Inappropriate picture">Inappropriate picture</option>
                                            <option value="Too many typos">Too many typos</option>
                                            <option value="Other">Other</option>
                                            <option value="custom">Add custom complaint</option>
                                        </Select>
                                        {showCustomInput && (
                                            <Input placeholder="Enter complaint:" value={customInput} onChange={handleCustomInputChange} mt={2}/>
                                        )}
                                    </Box>
                                </ModalBody>
                                <ModalFooter><Button colorScheme='green' mr={3} onClick={handleSelection}>Submit report</Button></ModalFooter>
                            </ModalContent>
                            }
                        </Modal>
                    </Flex>
                }
            </Box>            
        </Page>
      );
}

export default RecipePage;