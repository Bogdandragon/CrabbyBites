import { Button, Center, Stack, useBreakpointValue, Text } from '@chakra-ui/react';

function IngredientButton({text, onClick, selected=false}) {
    const buttonSize = useBreakpointValue({ base: 'sm', lg: 'sm' });
    const fontSize = useBreakpointValue({ base: 'sm', lg: 'md' });
    const colorScheme = selected ? "greenBrand" : "gray";

    return (
        <Center>
            <Button type="Submit" colorScheme={colorScheme} variant='solid' minH="3vh" minW="80%" maxW="10vh" size={buttonSize} fontSize={fontSize} onClick={onClick}>
                <Text isTruncated mb="0" h="80%">{text}</Text>
            </Button>
        </Center>
    );
}

export default IngredientButton;