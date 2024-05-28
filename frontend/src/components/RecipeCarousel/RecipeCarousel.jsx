import { Text } from '@chakra-ui/react';
import { Box } from '@chakra-ui/react'
import '@fontsource/dm-serif-display';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import React, { useState, useEffect } from 'react';
import RecipeCardView from '../RecipeCards/RecipeCardView';
import axios from 'axios';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, useDisclosure } from '@chakra-ui/react';



function RecipeCarousel({recipeId}) {

    const [recipes, setRecipes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        console.log("in effect\n");
        axios.get('http://localhost:5000/api/recipes/similar/' + recipeId, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        }).then((response) => {
            console.log("got response\n");
            setRecipes(response.data);
            setIsLoading(false);
        }).catch((error) => {
            console.log(error);
            setIsLoading(false);
        });
    }, []);

  return (
    <Box  w="80%" backgroundColor="rgba(247, 229, 198, 1)" borderRadius="5vh"  overflow="hidden" p="0" mb="2vh">
                
                    <Text fontSize="4vh" fontWeight="bold" textAlign="left" pl={{base: '3vw', lg: '2vw'}} >SIMILAR RECIPES</Text>
                    {isLoading ? <Text>Loading...</Text> :
                    <Carousel
                        additionalTransfrom={0}
                        arrows
                        autoPlaySpeed={3000}
                        centerMode={false}
                        className=""
                        containerClass="container"
                        dotListClass=""
                        draggable
                        focusOnSelect={false}
                        infinite={false}
                        itemClass=""
                        keyBoardControl
                        minimumTouchDrag={80}
                        pauseOnHover
                        renderArrowsWhenDisabled={false}
                        renderButtonGroupOutside={false}
                        renderDotsOutside={false}
                        responsive={{
                            desktop: {
                            breakpoint: {
                                max: 3000,
                                min: 768
                            },
                            items: 2,
                            partialVisibilityGutter: 40
                            },
                            mobile: {
                            breakpoint: {
                                max: 768,
                                min: 0
                            },
                            items: 1,
                            partialVisibilityGutter: 30
                            }
                        }}
                        rewind={false}
                        rewindWithAnimation={false}
                        rtl={false}
                        shouldResetAutoplay
                        showDots={false}
                        sliderClass=""
                        slidesToSlide={1}
                        swipeable
                        >
            
                            {recipes.map((recipe) => (
                                <RecipeCardView recipeId={recipe._id} imageUrl={recipe.picture} titleRecipe={recipe.name} descriptionRecipe={recipe.description} timeCooking={recipe.time} difficulty={recipe.difficulty} numberServings={recipe.portions}/>
                            ))}
                            {recipes.length == 0 && <Text textAlign='center'>No recipes found.</Text>}
                            
                    
                    </Carousel>
                    }
                </Box>
  );
}

export default RecipeCarousel;