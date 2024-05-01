import {Drawer,DrawerBody,DrawerFooter,DrawerHeader,DrawerOverlay,DrawerContent,DrawerCloseButton,} from '@chakra-ui/react'
import {useDisclosure, Button} from '@chakra-ui/react'
import {Menu, MenuButton, MenuList, MenuItem, IconButton} from '@chakra-ui/react'
import {ChevronDownIcon} from '@chakra-ui/icons'
import {ChevronRightIcon} from '@chakra-ui/icons'
import {ChatIcon} from '@chakra-ui/icons'
import React from 'react'
import { Box } from '@chakra-ui/react';
import {Stack} from '@chakra-ui/react'
import { extendTheme } from "@chakra-ui/react";

function Sidebar() {
  return (
        <Box bg='#F5F2F2' h='90vh' borderRightRadius={{ base: '0px', md: '20px' }} >
          <Stack mt='30vh' spacing={10} alignItems={'center'} width={{ base: '100%', md: '20vw' }}>
            <Menu>
                <MenuButton as={Button} bg='white' width='90%' aria-label='Menu' boxShadow='md'
                variant='outline' size='lg' rightIcon={<ChevronDownIcon />}
                _hover={{ backgroundColor: '#F5F2F6' }}>Recipes</MenuButton>
                <MenuList aria-label='Menu'bg='white'>
                    <MenuItem colorScheme='greenBrand' _hover={{ backgroundColor: '#F5F2F6' }}>Recipes in review</MenuItem>
                    <MenuItem colorScheme='greenBrand' _hover={{ backgroundColor: '#F5F2F6' }}>Reported recipes</MenuItem>
                    

                </MenuList>
            </Menu>
            
            <Button width='90%' variant='outline' size='lg' bg='white' boxShadow='md'
                _hover={{ backgroundColor: '#F5F2F6' }}>Users</Button>
            
            <Button width='90%' variant='outline' size='lg' bg='white' boxShadow='md'
                _hover={{ backgroundColor: '#F5F2F6' }}>Comments</Button>
            </Stack></Box>
  );
}

export default Sidebar;