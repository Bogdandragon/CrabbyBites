import { Button, Stack } from '@chakra-ui/react';

function InfoButton({text, onClick, size='md'}) {
    return (
        <Stack direction='row' align='center'>
            <Button colorScheme='black' variant='outline' size={size} border='2px' borderRadius='25px'
                    onClick={onClick}>
                {text}
            </Button>
        </Stack>
    );
}

export default InfoButton;