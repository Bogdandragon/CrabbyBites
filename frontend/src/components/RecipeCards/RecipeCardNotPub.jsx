import './RecipeCard.css'
import { SimpleGrid, Box, Checkbox, Card } from '@chakra-ui/react'
import { useBreakpointValue } from "@chakra-ui/react"
import React, { ReactNode } from 'react'
import { Text } from '@chakra-ui/react';
import {HStack} from '@chakra-ui/react';
import {IconButton} from '@chakra-ui/react';
import { PlusSquareIcon, DeleteIcon } from '@chakra-ui/icons';
import { Image, Stack } from '@chakra-ui/react';
import { CardBody } from 'react-bootstrap';
import InfoButton from '../Buttons/InfoButton';
import Theme from '../Theme/Theme';

function RecipeCardNotPub({imageUrl, titleRecipe, descriptionRecipe}) {
    const buttonSize = useBreakpointValue({ base: "sm", md:"sm", xl: "md"});
    
    return (    
        <Card w={{base:'70vw', md:'25vw'}} h={{base:'50vh', md:'45vh'}} mb = '1vh' mr='2vw' bgColor='#FFFBF2'>
           
            <CardBody backgroundColor='FFFBF2'>
                <Box w={{base:'70vw', md:'25vw'}} h={{base:'27.5vh', md:'22.5vh'}}><Image src={imageUrl} alt='Logo' borderTopRadius="md" objectFit="cover" size='md' w='100%' h='100%'/></Box>
                <Text textAlign='left' pl='1vw' fontSize="2xl" fontWeight="bold" noOfLines='1'>{titleRecipe}</Text>
                <Text textAlign='left' pl='1vw' fontSize="md" noOfLines='2'>{descriptionRecipe}</Text>
                <HStack wrap="wrap" justifyContent="space-between">
                    <Text as='b' pl='1vw' fontSize="xs" color="yellow.500">Not Published</Text>
                    <IconButton icon={<DeleteIcon />} bgColor='#FFFBF2' size={buttonSize} onClick={() => {}}/>

                </HStack>        
            </CardBody>
        </Card>
                            
    );
}

export default RecipeCardNotPub;