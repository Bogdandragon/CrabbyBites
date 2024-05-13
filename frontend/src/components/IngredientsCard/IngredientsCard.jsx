import { Box, Text, Image, Flex, Center, Spacer, Button, Stack, Badge, HStack } from "@chakra-ui/react";
import { Card, CardBody } from "react-bootstrap";
import InfoButton from "../Buttons/InfoButton";
import { SimpleGrid } from '@chakra-ui/react';
import IngredientButton from "./IngredientButton";
import SubmitButton from "../Buttons/SubmitButton";


function IngredientsCard({typeIngredients, numberIngredients, ingredientsList}) {
    return (
        <Box bgColor='white' borderRadius="5vh" h="20vh">
                    <h6>{typeIngredients}</h6>
                    <Box  bg='rgba(0, 0, 0, 0)' maxHeight="15vh" overflowY="auto" className='scrollable-box' pl='2vw' pr='3vw' pb='1vh'
                    style={{ scrollbarWidth: "none", msOverflowStyle: "none" }} // Hide scrollbar for Firefox and IE
                    sx={{
                        "&::-webkit-scrollbar": {
                            display: "none" // Hide scrollbar for Chrome, Safari, and Opera
                        }
                    }}>
                        <SimpleGrid columns={{ base: 2, lg: 2 }} spacing={10}>
                        
                        <IngredientButton text="egg"/>
                        <IngredientButton text="flour"/>
                        <IngredientButton text="sugar"/>
                        <IngredientButton text="milk"/>
                        <IngredientButton text="watermelon"/>
                        <IngredientButton text="salt"/>
                        <IngredientButton text="pepper"/>
                        <IngredientButton text="water"/>
                        <IngredientButton text="oil"/>
                        <IngredientButton text="yeast"/>
                        
                        </SimpleGrid>
           </Box>
        </Box>
    );
}

export default IngredientsCard;
    