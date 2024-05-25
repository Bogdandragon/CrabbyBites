import './RecipeCard.css'
import { SimpleGrid, Box, Checkbox, Card, useBreakpointValue } from '@chakra-ui/react'
import React, { ReactNode } from 'react'
import { Text } from '@chakra-ui/react';
import {HStack} from '@chakra-ui/react';
import {IconButton} from '@chakra-ui/react';
import { PlusSquareIcon } from '@chakra-ui/icons';
import { FaHeart } from 'react-icons/fa';
import { Image, Stack } from '@chakra-ui/react';
import { CardBody } from 'react-bootstrap';
import InfoButton from '../Buttons/InfoButton';

import Theme from '../Theme/Theme';

function RecipeCardTodoFav({imageUrl, titleRecipe, descriptionRecipe, timeCooking, difficulty, numberServings}) {
    const buttonSize = useBreakpointValue({ base: "sm", md: "md"});
    const stackSpacing = useBreakpointValue({base: 3, md: 0.2, xl: 3 });
    return (    
        <Card borderRadius="5vh" w={{base:'80vw', md:'44vw', lg:'30vw'}} h={{base:'50vh', md:'45vh'}} bgColor='#FFFBF2' >
            <CardBody backgroundColor='FFFBF2'>
                <Box w={{base:'80vw', md:'44vw', lg:'30vw'}} h={{base:'27.5vh', md:'22.5vh'}}><Image src={imageUrl} alt='Logo' borderTopRadius="5vh" objectFit="cover" size='md' w='100%' h='100%'/></Box>
                <Text textAlign='left' pl='1vw' fontSize="2xl" fontWeight="bold" noOfLines='1'>{titleRecipe}</Text>
                <Text textAlign='left' pl='1vw' fontSize="md" noOfLines='2'>{descriptionRecipe}</Text>
                <HStack spacing={stackSpacing} pl='1vw'>
                    
                    <Text as="b" fontSize="xs">{timeCooking} MIN - {difficulty} PREP - {numberServings} SERVES</Text>
                    <InfoButton text='View Recipe' size={buttonSize} onClick={() => {}}/>
                    <IconButton icon={<PlusSquareIcon />} bgColor='#FFFBF2' size={buttonSize} onClick={() => {}}/>
                    <IconButton as={ FaHeart } color="red.500" variant="ghost" boxSize="1em" aria-label="Like"  size={buttonSize} onClick={() => {}}/>

                </HStack>
            </CardBody>      
        </Card>                       
    );
}

export default RecipeCardTodoFav;