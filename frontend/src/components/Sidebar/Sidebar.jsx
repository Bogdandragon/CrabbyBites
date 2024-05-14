import { Button, Box, Stack } from '@chakra-ui/react';
import React from 'react';

function Sidebar({ selector }) {
  return (
        <Box bg='#F5F2F2' h={{base: "auto", lg: "90vh"}} borderRightRadius={{ base: '0px', md: '20px' }}>
            <Stack spacing={10} alignItems={'center'} width={{ base: '100%', md: '20vw' }} my="15%">
            {/* <Menu>
                <MenuButton as={Button} bg='white' width='90%' aria-label='Menu' boxShadow='md'
                variant='outline' size='lg' rightIcon={<ChevronDownIcon />}
                _hover={{ backgroundColor: '#F5F2F6' }}>Recipes</MenuButton>
                <MenuList aria-label='Menu'bg='white'>
                    <MenuItem colorScheme='greenBrand' _hover={{ backgroundColor: '#F5F2F6' }}>Recipes in review</MenuItem>
                    <MenuItem colorScheme='greenBrand' _hover={{ backgroundColor: '#F5F2F6' }}>Reported recipes</MenuItem>
                </MenuList>
            </Menu> */}
                <Button as={Button} bg='white' width='90%' aria-label='Menu' boxShadow='md' variant='outline' size='lg' _hover={{ backgroundColor: '#F5F2F6' }} onClick={() => selector("recipes")}>Recipes</Button>
                <Button width='90%' variant='outline' size='lg' bg='white' boxShadow='md' _hover={{ backgroundColor: '#F5F2F6' }} onClick={() => selector("users")}>Users</Button>
                <Button width='90%' variant='outline' size='lg' bg='white' boxShadow='md' _hover={{ backgroundColor: '#F5F2F6' }} onClick={() => selector("comments")}>Comments</Button>
            </Stack>
        </Box>
  );
}

export default Sidebar;