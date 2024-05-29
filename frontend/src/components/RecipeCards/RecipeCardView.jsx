import './RecipeCard.css';
import { Box,  Card } from '@chakra-ui/react';
import React from 'react';
import { Text } from '@chakra-ui/react';
import {HStack} from '@chakra-ui/react';
import { Image } from '@chakra-ui/react';
import { CardBody } from 'react-bootstrap';
import InfoButton from '../Buttons/InfoButton';
import { useBreakpointValue } from "@chakra-ui/react";
import { useNavigate } from 'react-router-dom';

function RecipeCardView({recipeId, imageUrl, titleRecipe, descriptionRecipe, timeCooking, difficulty, numberServings}) {
    const showDetails = useBreakpointValue({ base: true,  md: false, xl: true });
    const buttonSize = useBreakpointValue({ base: "sm", md: "md"});
    const navigate = useNavigate();

    const stackSpacing = useBreakpointValue({base: 20, md: 0.2, xl: 20 });
    return (    
        <Card w={{base:'60vw', md:'30vw'}} h={{base:'70vh', md:'48vh'}} mb = '1vh' mr='2vw' bgColor='#FFFBF2' borderRadius="5vh">
            <CardBody backgroundColor='FFFBF2'>
                <Box w={{base:'60vw', md:'30vw'}} h={{base:'27.5vh', md:'22.5vh'}} ><Image src={imageUrl} alt='Logo' borderTopRadius="5vh" objectFit="cover" size='md' w='100%' h='100%'/></Box>
                <Text textAlign='left' pl='1vw' fontSize="2xl" fontWeight="bold" noOfLines='1'>{titleRecipe}</Text>
                <Text textAlign='left' pl='1vw' fontSize="md" noOfLines='2'>{descriptionRecipe}</Text>
                <HStack spacing={stackSpacing}>
                    <Text as='b' pl='1vw' fontSize="xs">{timeCooking} MIN - {difficulty} PREP - {numberServings} SERVES</Text>
                    <InfoButton text='View Recipe' size={buttonSize} onClick={() => {
                        navigate(`/recipes/${recipeId}`);
                        window.location.reload();
                        }}/>
                </HStack>
            </CardBody>
        </Card>              
    );
}

export default RecipeCardView;