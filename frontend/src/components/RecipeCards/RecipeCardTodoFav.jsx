import './RecipeCard.css'
import { Box, Card, useBreakpointValue } from '@chakra-ui/react'
import React from 'react'
import { Text } from '@chakra-ui/react';
import {HStack} from '@chakra-ui/react';
import {IconButton} from '@chakra-ui/react';
import { PlusSquareIcon } from '@chakra-ui/icons';
import { FaHeart } from 'react-icons/fa';
import { Spacer } from '@chakra-ui/react';
import { Image } from '@chakra-ui/react';
import { CardBody } from 'react-bootstrap';
import InfoButton from '../Buttons/InfoButton';

function RecipeCardTodoFav({imageUrl, titleRecipe, descriptionRecipe, timeCooking, difficulty, numberServings}) {
    const buttonSize = useBreakpointValue({ base: "sm", md: "md"});
    const stackSpacing = useBreakpointValue({base: 12, md: 0.4, xl: 12 });
    
    return (    
        <Card borderRadius="5vh" w={{base:'90vw', md:'44vw', lg:'30vw'}} h={{base:'45vh',  md:'45vh'}} bgColor='#FFFBF2' >
            <CardBody backgroundColor='FFFBF2'>
                <Box w={{base:'90vw', md:'44vw', lg:'30vw'}} h={{base:'27.5vh', md:'27.5vh'}}><Image src={imageUrl} alt='Logo' borderTopRadius="5vh" objectFit="cover" size='md' w='100%' h='100%'/></Box>
                <Text textAlign='left' pl='1vw' fontSize="2xl" fontWeight="bold" noOfLines='1'>{titleRecipe}</Text>
                <Text textAlign='left' pl='1vw' fontSize="md" noOfLines='2'>{descriptionRecipe}</Text>
                <HStack pr='1vw' justify="end">
                    <Text  pl='1vw' as="b" fontSize="xs">{timeCooking} MIN - {difficulty} PREP - {numberServings} SERVES</Text>
                    <Spacer />
                    <InfoButton text='View Recipe' size={buttonSize} onClick={() => {}}/>
                </HStack>
            </CardBody>      
        </Card>                       
    );
}

export default RecipeCardTodoFav;