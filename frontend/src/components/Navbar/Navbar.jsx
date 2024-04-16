import { Flex, Image, Heading, Menu, MenuButton, MenuList, MenuItem, IconButton, useToast } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';

function Navbar() {
    const navigate = useNavigate();
    const toast = useToast();
    let token = window.localStorage.getItem('token');

    return (
        <Flex height={"10vh"} w={"100vw"} justifyContent="space-between" alignItems="center" className='px-md-5 px-2' overflow="hidden">
            <Image
                src="crab.png"
                alt="Logo"
                height="80%"
                 />
            <Heading className='title-font' mb={0}>Crabby Bites</Heading>
            <Menu>
                <MenuButton as={IconButton} aria-label='Menu' icon={<HamburgerIcon />} variant='outline' size='lg' />
                <MenuList>
                    { token ?
                        <>
                            <MenuItem onClick={() => {
                                window.localStorage.removeItem('token');
                                toast({
                                    title: 'Logout successful.',
                                    description: 'See you soon!',
                                    status: 'success',
                                    duration: 5000,
                                    isClosable: true,
                                });
                                navigate('/')
                            }}>Logout</MenuItem>
                        </> :
                        <>
                            <MenuItem onClick={() => navigate("/login")}>Login</MenuItem>
                            <MenuItem onClick={() => navigate("/register")}>Register</MenuItem>
                        </>
                    }
                </MenuList>
            </Menu>
        </Flex>
    );
}

export default Navbar;