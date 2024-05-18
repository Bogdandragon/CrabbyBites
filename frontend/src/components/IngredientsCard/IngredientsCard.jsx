import { Box, Text, Image, Flex, Center, Spacer, Button, Stack, Badge, HStack } from "@chakra-ui/react";
import { Card, CardBody } from "react-bootstrap";
import InfoButton from "../Buttons/InfoButton";
import { useBreakpointValue } from '@chakra-ui/react';
import { SimpleGrid } from '@chakra-ui/react';
import IngredientButton from "./IngredientButton";
import SubmitButton from "../Buttons/SubmitButton";



function IngredientsCard({typeIngredients, ingredientsList}) {
    return (
        <Box bgColor='white' borderRadius="5vh" h="18vh">
            
                    <h6 style={{ fontWeight: 750 }}>{typeIngredients}</h6>
                    <Box  bg='rgba(0, 0, 0, 0)' maxHeight="13vh" overflowY="auto" className='scrollable-box'
                    pl={{base:'5vw',md:'4vw', lg:'1vw'}} pr={{base:'1vw', md:'4vw', lg:'1vw'}} pb={{base:'2vh', md:'1vw', lg:'1vh'}}
                    style={{ scrollbarWidth: "none", msOverflowStyle: "none" }} // Hide scrollbar for Firefox and IE
                    sx={{
                        "&::-webkit-scrollbar": {
                            display: "none" // Hide scrollbar for Chrome, Safari, and Opera
                        }
                    }}>
                        <SimpleGrid columns={2} spacingX={{base:'2', lg:'4'}} spacingY={2}>
                        
                        <IngredientButton text="egg"/>
                        <IngredientButton text="flour"/>
                        <IngredientButton text="sugar"/>
                        <IngredientButton text="milk"/>
                        <IngredientButton text="water"/>
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
    