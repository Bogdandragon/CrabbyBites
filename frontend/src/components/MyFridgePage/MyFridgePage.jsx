import Page from "../Page/Page";
import { Text } from '@chakra-ui/react';
import { Stack, HStack, VStack } from '@chakra-ui/react';
import { SimpleGrid, Box, Checkbox, Card, Center } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';
import { useBreakpointValue } from '@chakra-ui/react';
import { Show } from '@chakra-ui/react';
import TransparentSidebar2 from "./Sidebar2";
import { Image } from '@chakra-ui/react';
import { Flex } from '@chakra-ui/react';


function MyFridgePage () {
    const navigate = useNavigate();
    const isSmallScreen = useBreakpointValue({ base: true, md: false });
    
    return (
        <Page navigate={navigate}>
            <Box w='100vw' h='90vh'> 
                <Box
                    bgImage={'cookingBackground.jpeg'}
                    bgPosition='center'
                    bgSize='cover'
                    bgRepeat='no-repeat'
                    bgClip={'border-box'}
                    w='100%' h='100%'>      
                        <TransparentSidebar2 />
                        <Show above='md'>
                            <Image src='fridge.jpeg' alt='fridge' w='30vw' h='60vh' position='absolute' right='9vw' top='25vh'/> 
                        </Show>
                </Box>
            </Box>
        </Page> 
            
        
    );               
} 
            
            
            
export default MyFridgePage;