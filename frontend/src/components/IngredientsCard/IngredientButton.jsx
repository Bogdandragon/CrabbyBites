import { Button, Stack } from '@chakra-ui/react';
import { useBreakpointValue } from '@chakra-ui/react';

function IngredientButton({text, onClick}) {
    const buttonSize = useBreakpointValue({ base: 'sm', lg: 'xs' });
    const fontSize = useBreakpointValue({ base: 'sm', lg: 'x-small' });

    return (
        <Stack direction='row' align='center'>
            <Button type="Submit" bgColor='#D9D9D9' variant='solid' minW="fit-content" minH="fit-content" size={buttonSize} fontSize={fontSize} onClick={onClick}>
                {text}
            </Button>
        </Stack>
    );
}

export default IngredientButton;