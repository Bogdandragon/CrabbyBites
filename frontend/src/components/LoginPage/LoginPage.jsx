import Page from "../Page/Page";
import { useFormik } from 'formik';
import { Container, Input, FormControl, FormLabel, FormErrorMessage, FormHelperText, Button } from '@chakra-ui/react';
import { Image, SimpleGrid, Box, Checkbox, Card } from '@chakra-ui/react'
import { Row, Col, CardBody } from 'react-bootstrap';
import SubmitButton from '../Buttons/SubmitButton'
import './LoginPage.css'

function LoginPage() {
    const formikLogin = useFormik({
        initialValues: {
          username: '',
          password: ''
        },
        onSubmit: (values) => {
          alert(JSON.stringify(values, null, 2))
        },
    })

    return (
        <Page>
            <SimpleGrid columns={2} spacing={0} w='100vw' h='90vh'>
                <Box bgImage={'cookingBackground.jpeg'}
                    bgPosition='center'
                    bgSize='cover'
                    bgRepeat='no-repeat'
                    w='100%' h='100%' className="hide-on-mobile"/>

                <Box h='100%' py='10vh' px='5vw' textAlign='left' className="column-width">
                    <Card py='10vh' px='10vw' >
                        <CardBody colorScheme='white'>
                            <h2>Login</h2>
                            <h6>Log into your account in seconds</h6>
                            <FormControl onSubmit={formikLogin.handleSubmit}>
                                <FormLabel>Username</FormLabel>
                                <Input id='username' name='username' type='text' onChange={formikLogin.handleChange} value={formikLogin.values.username}/>
                                <FormLabel>Password</FormLabel>
                                <Input id='password' name='password' type='password' onChange={formikLogin.handleChange} value={formikLogin.values.username}/>
                                
                                <SimpleGrid columns={2}>
                                    <Box>
                                        <Checkbox colorScheme='greenBrand' defaultChecked size='md'>Keep me logged in</Checkbox>
                                    </Box>
                                    <Box textAlign='right'>
                                        <Button colorScheme='greenBrand' variant='link'>Forgot password?</Button>
                                    </Box>
                                </SimpleGrid>

                                <SubmitButton text="Login" onClick={formikLogin.handleSubmit} />
                            </FormControl>
                        </CardBody>
                    </Card>
                </Box>
            </SimpleGrid>
        </Page>
    );
}

export default LoginPage;