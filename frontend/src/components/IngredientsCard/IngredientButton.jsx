
import { Button, Stack } from '@chakra-ui/react';

function IngredientButton({text, onClick}) {
    return (
        <Stack direction='row' align='center'>
            <Button type="Submit" bgColor='#D9D9D9' variant='solid' minW="fit-content" onClick={onClick}>
                {text}
            </Button>
        </Stack>
    );
}

export default IngredientButton;