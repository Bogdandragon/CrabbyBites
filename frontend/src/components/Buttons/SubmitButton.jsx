import "./Buttons.css";
import { Button, Stack } from '@chakra-ui/react';

function SubmitButton({text, onClick}) {
    return (
        <Stack direction='row' align='center'>
            <Button type="Submit" colorScheme='greenBrand' variant='solid' size='md' onClick={onClick}>
                {text}
            </Button>
        </Stack>
    );
}

export default SubmitButton;