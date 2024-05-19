import { Box, SimpleGrid, GridItem, Text, Stack, HStack, IconButton, Image, useBreakpointValue, useToast } from '@chakra-ui/react';
import { CheckIcon, CloseIcon, DeleteIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import InfoButton from '../Buttons/InfoButton';

function TodoRecipeCard ({ recipeId, imageUrl, nameRecipe, listOwnedIngredients, listMissingIngredients }){
  const stackDirection = useBreakpointValue({ base: 'column', md: 'row' });
  const navigate = useNavigate();
  const toast = useToast();

  return (
    <Box bgColor='#F5F2F2' borderRadius='20' minH={{base:'15vh', md:'20vh'}} mb='1vh' w='98%'>
      <SimpleGrid columns={6}>
        <GridItem colSpan={1}>
          <Image src={imageUrl} alt='Recipe Image' borderRadius='20' h={{base:'17vh', md:'20vh'}} w={{base:'17vh', md:'20vh'}} objectFit='cover'/>
        </GridItem>
        <GridItem colSpan={2}>
            <Stack spacing='0.005vh'>
                <Text pt='1vh' pl='1vw'fontWeight="bold" align='left' fontSize={{base:'xs',md:'xl'}} noOfLines='3'>{nameRecipe}</Text>
                <Text pt='1vh' pl='1vw'fontWeight="semibold" align='left' fontSize={{base:'xs',md:'md'}} noOfLines='3'>
                    <Text as="span" fontWeight="semibold">You have:</Text> {listOwnedIngredients}</Text>
                <Text pt='1vh' pl='1vw'fontWeight="semibold" align='left' fontSize={{base:'xs',md:'md'}} noOfLines='3'>
                    <Text as="span" fontWeight="semibold">Missing:</Text> {listMissingIngredients}</Text>
            </Stack>
           </GridItem>
        <GridItem colSpan={3} pt='1vh' pr='1vh'>
          <Stack align='flex-end'>
            <HStack>
                <InfoButton text='View Recipe' onClick={() => navigate(`/recipes/${recipeId}`)}/>
                <IconButton isRound={true} variant='solid' boxSize='10' bgColor='#F5F2F2'
                    fontSize='20' icon={<DeleteIcon />}/>
            </HStack>
          </Stack>
        </GridItem>
      </SimpleGrid>
    </Box>
  );
};

export default TodoRecipeCard;