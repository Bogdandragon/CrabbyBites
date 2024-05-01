import React from 'react';
import { useState } from 'react';
import { Menu, MenuButton, MenuList, MenuItem, MenuDivider } from "@chakra-ui/react"
import { ChevronDownIcon } from '@chakra-ui/icons'


function SortButton({ initialLabel = 'Sort', options, ...props }) {
    const [selectedOption, setSelectedOption] = useState(initialLabel);

  const handleMenuItemClick = (option) => {
    setSelectedOption(option);
  };
  return (
    <Menu>
  <MenuButton
    px={4}
    py={2}
    transition='all 0.2s'
    borderRadius='md'
    borderWidth='1px'
    _hover={{ bg: 'gray.200' }}
    _expanded={{ bg: 'gray.300' }}
    _focus={{ boxShadow: 'outline' }}
  >
    {selectedOption} <ChevronDownIcon />
  </MenuButton>
  <MenuList>
    <MenuItem onClick={() => handleMenuItemClick("Alphabetical (A to Z)")}>Alphabetical (A to Z)</MenuItem>
    <MenuItem onClick={() => handleMenuItemClick("Alphabetical (Z to A)")}>Alphabetical (Z to A)</MenuItem>
    <MenuDivider />
    <MenuItem onClick={() => handleMenuItemClick("Reports (descending)")}>Reports(descending)</MenuItem>
    <MenuItem onClick={() => handleMenuItemClick("Reports (ascending)")}>Reports(ascending)</MenuItem>
  </MenuList>
</Menu>
  );
}

export default SortButton;
