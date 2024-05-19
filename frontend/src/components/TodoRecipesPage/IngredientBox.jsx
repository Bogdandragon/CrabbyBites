import { Button, Stack } from '@chakra-ui/react';
import { useBreakpointValue } from '@chakra-ui/react';
import { Box } from '@chakra-ui/react';

function IngredientBox({text, quantity}) {
    const buttonSize = useBreakpointValue({ base: 'md', lg: 'sm' });
    const fontSize = useBreakpointValue({base:'sm', md: 'xs', lg: 'sm' });

    return (
        <Stack direction='row' align='center'>
            <Box justifyContent="center" align="center"  borderRadius="full" bgColor='#D9D9D9' variant='solid' minW="100%" size={buttonSize} fontSize={fontSize} >
                {text} x {quantity}
            </Box>
        </Stack>
    );
}

export default IngredientBox;