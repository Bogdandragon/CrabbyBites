import './UserCard.css'
import { Input, FormControl, FormLabel, Button, FormErrorMessage } from '@chakra-ui/react';
import { SimpleGrid, Box, Checkbox, Card, Center, useToast } from '@chakra-ui/react'
import React, { ReactNode } from 'react'

import { Image, Stack } from '@chakra-ui/react';
import { CardBody } from 'react-bootstrap';
import InfoButton from '../Buttons/InfoButton';
import Theme from '../Theme/Theme';

function UserCard({imageUrl, username, reports, viewReports, deleteUser}) {
    // const innerBoxStyles = {
    //     color: 'white',
    //     fontWeight: 'bold',
    //     fontSize: '20px',
    //   };
    return (    
        <Card mb = '1vh' pt='1vh' mr='2vw' colorScheme='greenBrand' bgGradient='linear(to-r, gray.300, yellow.400, greenBrand.500)'>
            <CardBody >
            {/* <Box sx={innerBoxStyles} borderRadius='7' backdropFilter='auto' backdropContrast='30%'  style={{position:'relative', width: '100%', height: '100%' }}>
             */}
                <Stack>
                    <Center><Image src={imageUrl} alt='Logo' borderRadius='full' size='sm' boxSize='8vw'/></Center>
                    <Center><h4>{username}</h4></Center>
                    <Center><InfoButton text='View reports' onClick={viewReports}/></Center>
                    <Center><InfoButton text='Delete' onClick={deleteUser}/></Center>
                    <Center><h6>no. of reports: {reports}</h6></Center>
                </Stack>
                {/* </Box> */}
            </CardBody>
        </Card>
    );
}

export default UserCard;