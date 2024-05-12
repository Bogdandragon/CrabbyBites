import './RecipeCard.css'
import { Input, FormControl, FormLabel, Button, FormErrorMessage } from '@chakra-ui/react';
import { SimpleGrid, Box, Checkbox, Card, Center, useToast } from '@chakra-ui/react'
import React, { ReactNode } from 'react'
import { Text } from '@chakra-ui/react';
import {HStack} from '@chakra-ui/react';
import { Image, Stack } from '@chakra-ui/react';
import { CardBody } from 'react-bootstrap';
import InfoButton from '../Buttons/InfoButton';
import { useBreakpointValue } from "@chakra-ui/react"
import Theme from '../Theme/Theme';

function RecipeCardView({imageUrl, titleRecipe, descriptionRecipe, timeCooking, difficulty, numberServings}) {
    const showDetails = useBreakpointValue({ base: true,  md: false, xl: true });
    const buttonSize = useBreakpointValue({ base: "sm", md: "md"});

    const stackSpacing = useBreakpointValue({base: 20, md: 0.2, xl: 20 });
    return (    
        <Card w={{base:'60vw', md:'30vw'}} h={{base:'50vh', md:'45vh'}} mb = '1vh' mr='2vw' bgColor='#FFFBF2' borderRadius="5vh">
           
            <CardBody backgroundColor='FFFBF2'>
                <Box w={{base:'60vw', md:'30vw'}} h={{base:'27.5vh', md:'22.5vh'}} ><Image src={imageUrl} alt='Logo' borderTopRadius="5vh" objectFit="cover" size='md' w='100%' h='100%'/></Box>
                <Text textAlign='left' pl='1vw' fontSize="2xl" fontWeight="bold" noOfLines='1'>{titleRecipe}</Text>
                <Text textAlign='left' pl='1vw' fontSize="md" noOfLines='2'>{descriptionRecipe}</Text>
                <HStack spacing={stackSpacing}>
                    <Text as='b' pl='1vw' fontSize="xs">{timeCooking} MIN - {difficulty} PREP - {numberServings} SERVES</Text>
                    <InfoButton text='View Recipe' size={buttonSize} onClick={() => {}}/>
                </HStack>
                    
                    
                
            </CardBody>
            
        </Card>
                            
    );
}

export default RecipeCardView;