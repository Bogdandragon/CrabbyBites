import { Button, Stack } from '@chakra-ui/react';
import { useBreakpointValue } from '@chakra-ui/react';

function IngredientButton2({text, quantity}) {
    const buttonSize = useBreakpointValue({ base: 'md', lg: 'sm' });
    const fontSize = useBreakpointValue({base:'sm', md: 'xs', lg: 'sm' });

    return (
        <Stack direction='row' align='center'>
            <Button type="Submit" bgColor='#D9D9D9' variant='solid' minW="80%"  size={buttonSize} fontSize={fontSize} >
                {text} x {quantity}
            </Button>
        </Stack>
    );
}

export default IngredientButton2;