import { Box, Text, Image, Flex, Center, Spacer, Button, Stack, Badge, HStack } from "@chakra-ui/react";
import { Card, CardBody } from "react-bootstrap";
import InfoButton from "../Buttons/InfoButton";
import { useBreakpointValue } from '@chakra-ui/react';
import { SimpleGrid } from '@chakra-ui/react';
import IngredientButton2 from "./IngredientButton2";
import SubmitButton from "../Buttons/SubmitButton";



function IngredientsCard2({typeIngredients, ingredientsList}) {
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
                        
                            <IngredientButton2 text="egg" quantity='2'/>
                            <IngredientButton2 text="flour" quantity={3}/>
                            <IngredientButton2 text="sugar" quantity={1}/>
                            <IngredientButton2 text="milk" quantity={3}/>
                            <IngredientButton2 text="water" quantity="3l"/>
                            <IngredientButton2 text="salt" quantity={1}/>
                            <IngredientButton2 text="pepper" quantity={1}/>
                            <IngredientButton2 text="water" quantity={1}/>
                            <IngredientButton2 text="oil" quantity={1}/>
                            <IngredientButton2 text="yeast" quantity={1}/>
                        
                        </SimpleGrid>
           </Box>
        </Box>
    );
}

export default IngredientsCard2;
    