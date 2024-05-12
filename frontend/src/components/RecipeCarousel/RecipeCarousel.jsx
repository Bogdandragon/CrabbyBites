import { Text } from '@chakra-ui/react';
import { Box } from '@chakra-ui/react'
import '@fontsource/dm-serif-display';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import React, { useState, useEffect } from 'react';
import RecipeCardView from '../RecipeCards/RecipeCardView';
import axios from 'axios';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, useDisclosure } from '@chakra-ui/react';



function RecipeCarousel() {

    const [recipes, setRecipes] = useState([]);
    const { isOpen, onOpen, onClose } = useDisclosure();

    useEffect(() => {
        axios.get('http://localhost:5000/api/recipes/review', {
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

  return (
    <Box  w="80%" backgroundColor="rgba(247, 229, 198, 1)" borderRadius="5vh"  overflow="hidden" p="0" mb="2vh">
                
                    <Text fontSize="4vh" fontWeight="bold" textAlign="left" pl={{base: '3vw', lg: '2vw'}} >SIMILAR RECIPES</Text>

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
                            {/* modifica aici */}
                            {/* {recipes.map((recipe) => (
                            <RecipeCardView recipeId={recipe._id} imageUrl={recipe.picture} titleRecipe={recipe.title} descriptionRecipe={recipe.descriptionRecipe} timeCooking={recipe.time} difficulty={recipe.difficulty} numberServings={recipe.portions}/>
                        ))}
                        {recipes.length == 0 && <Text textAlign='center'>No recipes found.</Text>}
                             */}
                            
                            
                            <RecipeCardView imageUrl="fruitTart.jpeg" titleRecipe="Tart" descriptionRecipe="Aceasta este o tarta foarte delicioasa, buna pentru zilele toride de vara." timeCooking='2' difficulty='EASY' numberServings='4'/>
                            <RecipeCardView imageUrl="fruitTart.jpeg" titleRecipe="Tart" descriptionRecipe="Aceasta este o tarta foarte delicioasa, buna pentru zilele toride de vara." timeCooking='2' difficulty='EASY' numberServings='4'/>
                            <RecipeCardView imageUrl="fruitTart.jpeg" titleRecipe="Tart" descriptionRecipe="Aceasta este o tarta foarte delicioasa, buna pentru zilele toride de vara." timeCooking='2' difficulty='EASY' numberServings='4'/>


                            
                        </Carousel>

                </Box>
  );
}

export default RecipeCarousel;