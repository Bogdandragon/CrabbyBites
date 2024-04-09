import { useEffect } from "react";
import "./Buttons.css";
import { Button, Stack } from '@chakra-ui/react';

function SubmitButton({text, onClick}) {
    return (
        <Stack direction='row' spacing={4} align='center'>
            <Button colorScheme='black' variant='outline' size='md' border='2px' borderRadius='25px'
                    onClick={onClick}>
                {text}
            </Button>
        </Stack>
    );
}

export default SubmitButton;