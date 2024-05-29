import { Box, Heading, SimpleGrid } from "@chakra-ui/react";
import IngredientButton2 from "./IngredientButton2";
import { useEffect, useState } from "react";
import axios from "axios";

function IngredientsCard2({ typeIngredients, loadedIngredients }) {
    const [ingredients, setIngredients] = useState([]);
    const [update, setUpdate] = useState(false);
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        fixIngredients();
    }, [ingredients]);

    async function fixIngredients() {
        if (ingredients.length === 0) {
            setIngredients(await loadedIngredients);
        }
    }

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
                    {ingredients.map((ingredient) => (
                        <IngredientButton2 text={ingredient.name} />
                    ))}
                </SimpleGrid>
           </Box>
        </Box>
    );
}

export default IngredientsCard2;
    