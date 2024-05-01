import "./Buttons.css";
import { Button, Stack } from '@chakra-ui/react';

function SubmitButton({text, onClick, size='md'}) {
    return (
        <Stack direction='row' align='center'>
            <Button type="Submit" colorScheme='greenBrand' variant='solid' size={size} onClick={onClick}>
                {text}
            </Button>
        </Stack>
    );
}

export default SubmitButton;