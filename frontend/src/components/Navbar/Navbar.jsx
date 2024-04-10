import { Flex, Image, Heading, Menu, MenuButton, MenuList, MenuItem, IconButton } from '@chakra-ui/react';
import React from 'react';
import { HamburgerIcon } from '@chakra-ui/icons';

function Navbar() {
    return (
        <Flex height={"10vh"} w={"100vw"} justifyContent="space-between" alignItems="center" className='px-md-5 px-2'>
            <Image
                src="crab.png"
                alt="Logo"
                height="80%"
                 />
            <Heading className='title-font' mb={0}>Crabby Bites</Heading>
            <Menu>
                <MenuButton as={IconButton} aria-label='Menu' icon={<HamburgerIcon />} variant='outline' size='lg' ms="48px"/>
                <MenuList>
                    <MenuItem>Login</MenuItem>
                    <MenuItem>Register</MenuItem>
                </MenuList>
            </Menu>
        </Flex>
    );
}

export default Navbar;