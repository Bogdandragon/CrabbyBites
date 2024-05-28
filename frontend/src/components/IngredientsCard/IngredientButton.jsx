import { Button, Center, Stack, useBreakpointValue, Text } from '@chakra-ui/react';

function IngredientButton({text, onClick}) {
    const buttonSize = useBreakpointValue({ base: 'sm', lg: 'sm' });
    const fontSize = useBreakpointValue({ base: 'sm', lg: 'md' });

    return (
        <Center>
            <Button type="Submit" bgColor='#D9D9D9' variant='solid' minH="3vh" minW="80%" maxW="10vh" size={buttonSize} fontSize={fontSize} onClick={onClick}>
                <Text isTruncated mb="0" h="80%">{text}</Text>
            </Button>
        </Center>
    );
}

export default IngredientButton;