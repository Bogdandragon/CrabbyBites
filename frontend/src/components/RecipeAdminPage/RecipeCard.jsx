import { Box, SimpleGrid, GridItem, Text, Stack, HStack, IconButton, Image } from '@chakra-ui/react';
import { CheckIcon, CloseIcon } from '@chakra-ui/icons';
import InfoButton from '../Buttons/InfoButton'
import { useBreakpointValue } from '@chakra-ui/react';

function RecipeCard ({ imageUrl, nameRecipe, reports }){
  const stackDirection = useBreakpointValue({ base: 'column', md: 'row' });
  return (
    <Box bgColor='#F5F2F2' borderRadius='20' h={{base:'15vh', md:'20vh'}} mb='1vh' w='98%'>
      <SimpleGrid columns={6}> 
        <GridItem colSpan={1}>
          <Image
            src={imageUrl}
            alt='Recipe Image'
            borderRadius='20'
            h={{base:'15vh', md:'20vh'}}
            w={{base:'15vh', md:'20vh'}}
          />
        </GridItem>

        <GridItem colSpan={2}>
          <Text pt='1vh' pl='1vw'fontWeight="semibold" align='left' fontSize={{base:'xs',md:'xl'}} noOfLines='3'>{nameRecipe}</Text>
        </GridItem>

        <GridItem colSpan={3} pt='1vh' pr='1vh'>
          
          <Stack align='flex-end'> 

          {stackDirection === 'row' ? (
            <><HStack>
                <InfoButton text='View Recipe' />
                <IconButton
                  isRound={true}
                  variant='solid'
                  colorScheme='greenBrand'
                  fontSize='20'
                  icon={<CheckIcon />} />
                <IconButton
                  isRound={true}
                  variant='solid'
                  colorScheme='red'
                  fontSize='20'
                  icon={<CloseIcon />} />
              </HStack><Text fontSize={{ base: 'xs', md: 'md' }}>no. of reports: {reports}</Text></>
          ) : (
           
            <><HStack>
                  <Text fontSize={{ base: 'xs', md: 'md' }}>no. of reports: {reports}</Text>
                  <IconButton
                    isRound={true}
                    variant='solid'
                    colorScheme='greenBrand'
                    fontSize='20'
                    icon={<CheckIcon />} />
                  <IconButton
                    isRound={true}
                    variant='solid'
                    colorScheme='red'
                    fontSize='20'
                    icon={<CloseIcon />} />
                </HStack><InfoButton text='View Recipe' /></>
         
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
