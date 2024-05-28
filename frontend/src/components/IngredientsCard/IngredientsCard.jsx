import { Box, Heading, SimpleGrid} from "@chakra-ui/react";
import IngredientButton from "./IngredientButton";

function IngredientsCard({ typeIngredients }) {
    return (
        <Box bgColor='white' borderRadius="5vh" h="18vh">
            <Heading size="md" style={{ fontWeight: 750 }} pt="1vh">{typeIngredients}</Heading>
            <Box bg='rgba(0, 0, 0, 0)' maxHeight="13vh" overflowY="auto" className='scrollable-box'
                pl={{base:'5vw',md:'4vw', lg:'1vw'}} pr={{base:'5vw', md:'4vw', lg:'1vw'}} pb={{base:'2vh', md:'1vh', lg:'1vh'}}
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }} // Hide scrollbar for Firefox and IE
                sx={{
                    "&::-webkit-scrollbar": {
                        display: "none" // Hide scrollbar for Chrome, Safari, and Opera
                    }
                }}>
                <SimpleGrid spacingX={{base:'2', lg:'4'}} spacingY={2} >
                    <IngredientButton text="egggggggggggggggggggggggggggg"/>
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
    