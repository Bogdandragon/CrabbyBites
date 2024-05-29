import './RecipeCard.css';
import { Box, Spacer, Card} from '@chakra-ui/react';
import { useBreakpointValue } from "@chakra-ui/react";
import React from 'react';
import { Text } from '@chakra-ui/react';
import {HStack} from '@chakra-ui/react';
import {IconButton} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import { Image } from '@chakra-ui/react';
import { CardBody } from 'react-bootstrap';
import InfoButton from '../Buttons/InfoButton';
import { useDisclosure } from '@chakra-ui/react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody } from '@chakra-ui/react';

function RecipeCardRejected({imageUrl, titleRecipe, descriptionRecipe, reason}) {
    const buttonSize = useBreakpointValue({ base: "sm", md:"sm", xl: "md"});
    const showDetails = useBreakpointValue({ base: true,  md: false, xl: true });
    const { isOpen, onOpen, onClose } = useDisclosure();
    
    return (    
        <Card w={{base:'70vw', md:'25vw'}} h={{base:'50vh', md:'45vh'}} mb = '1vh' mr='2vw' bgColor='#FFFBF2'>
            <CardBody backgroundColor='FFFBF2'>
                <Box w={{base:'70vw', md:'25vw'}} h={{base:'27.5vh', md:'22.5vh'}}><Image src={imageUrl} alt='Logo' borderTopRadius="md" objectFit="cover" size='md' w='100%' h='100%'/></Box>
                <Text textAlign='left' pl='1vw' fontSize="2xl" fontWeight="bold" noOfLines='1'>{titleRecipe}</Text>
                <Text textAlign='left' pl='1vw' fontSize="md" noOfLines='2'>{descriptionRecipe}</Text>
                <HStack wrap="wrap" justifyContent="space-between">
                    <Text as='b' pl='1vw' fontSize="xs" color="red.500">Rejected</Text>
                    <Spacer />
                    {showDetails && (
                        <InfoButton pl='3vw' text='View Reason' size={buttonSize} onClick={onOpen}/>
                    )}
                    <IconButton icon={<DeleteIcon />} bgColor='#FFFBF2' size={buttonSize} onClick={() => {}}/>
                    <Modal isOpen={isOpen} onClose={onClose}>
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader color="red.500">Reason for Rejection</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody><Text fontSize="md">{reason}</Text></ModalBody>
                        </ModalContent>
                    </Modal>
                </HStack>        
            </CardBody>
        </Card>
                            
    );
}

export default RecipeCardRejected;