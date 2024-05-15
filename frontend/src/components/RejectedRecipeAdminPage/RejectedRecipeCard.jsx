import { Box, SimpleGrid, GridItem, Text, Stack, HStack, Image, useBreakpointValue } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import InfoButton from '../Buttons/InfoButton';

function RecipeCard ({ recipeId, imageUrl, nameRecipe, reports, reportsOpen }){
  const stackDirection = useBreakpointValue({ base: 'column', md: 'row' });
  const navigate = useNavigate();

  return (
    <Box bgColor='#F5F2F2' borderRadius='20' minH={{base:'15vh', md:'20vh'}} mb='1vh' w='98%'>
      <SimpleGrid columns={6}>
        <GridItem colSpan={1}>
          <Image src={imageUrl} alt='Recipe Image' borderRadius='20' h={{base:'15vh', md:'20vh'}} w={{base:'15vh', md:'20vh'}} objectFit='cover'/>
        </GridItem>
        <GridItem colSpan={2}>
          <Text pt='1vh' pl='1vw'fontWeight="semibold" align='left' fontSize={{base:'xs',md:'xl'}} noOfLines='3'>{nameRecipe}</Text>
        </GridItem>
        <GridItem colSpan={3} pt='1vh' pr='1vh'>
          <Stack align='flex-end'>
          {stackDirection === 'row' ? (
            <><HStack>
                <InfoButton text='View Recipe' onClick={() => navigate(`/recipes/${recipeId}`)}/>
                {reports > 0 && <InfoButton text='View Reports' onClick={() => reportsOpen(recipeId)}/>}
              </HStack><Text fontSize={{ base: 'xs', md: 'md' }}>no. of reports: {reports}</Text></>
          ) : (
            <><HStack>
                  <Text fontSize={{ base: 'xs', md: 'md' }}>no. of reports: {reports}</Text>
                </HStack>
                <HStack mb="1vh">
                  <InfoButton size='sm' text='View Recipe' onClick={() => navigate(`/recipes/${recipeId}`)}/>
                  {reports > 0 && <InfoButton size='sm' text='View Reports' onClick={() => reportsOpen(recipeId)}/>}
                </HStack></>
          )}
            {/* <HStack>
              <InfoButton text='View Recipe' />
              <IconButton
                isRound={true}
                variant='solid'
                colorScheme='greenBrand'
                fontSize='20'
                icon={<CheckIcon />}
              />
              <IconButton
                isRound={true}
                variant='solid'
                colorScheme='red'
                fontSize='20'
                icon={<CloseIcon />}
              /> 
            </HStack> */} 
          </Stack>
        </GridItem>
      </SimpleGrid>
    </Box>
  );
};

export default RecipeCard;