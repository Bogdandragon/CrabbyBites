import { SimpleGrid, Box, GridItem, Text, Stack, HStack, VStack, Image, useBreakpointValue } from '@chakra-ui/react';
import React from 'react';
import StarRating from './StarRating';
import InfoButton from '../Buttons/InfoButton';

function CommentCard({imageUrl, username, reports, ratingStars,commentText}) {
    const stackDirection = useBreakpointValue({ base: 'column', md: 'row' });

    return (    
        <Box bgColor='#F5F2F2' borderRadius='20' h={{base:'16vh',md:'20vh'}} mb='1vh' w='96%'>
            <SimpleGrid columns={2}>
                <GridItem pl= '1vw' pt='0.5vh'>
                    <Stack alignItems='start' justifyItems='start'>
                        <HStack>
                            <Image src={imageUrl} alt='Recipe Image' borderRadius='full' boxSize='50px'/>
                            <Text fontWeight="semibold" fontSize={{base:'sm',md:'lg'}}>{username}</Text>
                        </HStack>
                        <StarRating rating={ratingStars}/>
                        <Box overflowY="auto" maxHeight={{base:"4vh", md:"8vh"}} maxWidth={{base:"84vw", md:"50vw"}}>
                            <Text fontSize={{ base: 'sm', md: 'lg' }} textAlign="left">{commentText}</Text>
                        </Box>
                    </Stack>
                </GridItem>
                <GridItem pr= '1vw' pt='0.5vh' justifySelf="end">
                    <Box justifyContent="flex-end" alignItems="center">
                        {stackDirection === 'row' ? (
                        <HStack justifyContent="flex-end" alignItems="center" spacing={5}>
                            <Text fontWeight="semibold" fontSize={{ base: 'sm', md: 'lg' }}>
                            no. of reports: {reports}
                            </Text>
                            <InfoButton text="DELETE COMMENT" />
                        </HStack>
                        ) : (
                        <VStack spacing={2} alignItems="flex-start">
                            <InfoButton text="DELETE COMMENT" />
                            <Text fontWeight="semibold" fontSize={{ base: 'sm', md: 'lg' }}>
                            no. of reports: {reports}
                            </Text>
                        </VStack>
                        )}
                    </Box> 
                </GridItem>   
            </SimpleGrid>
        </Box>                     
    );
}

export default CommentCard;