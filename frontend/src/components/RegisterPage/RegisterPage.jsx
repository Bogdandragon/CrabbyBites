import Page from "../Page/Page";
import { useFormik } from 'formik';
import { Container, Input, FormControl, FormLabel, FormErrorMessage, FormHelperText, Button } from '@chakra-ui/react';
import { Image, SimpleGrid, Box, Checkbox, Card, Center } from '@chakra-ui/react'
import { Row, Col, CardBody } from 'react-bootstrap';
import SubmitButton from '../Buttons/SubmitButton'
import './RegisterPage.css'

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

                <Box h='100%' px='5vw' textAlign='left' className="column-width pt-md-5 py-3">
                    <Card py='5vh' px='10vw'>
                        <CardBody colorScheme='white'>
                            <Center><h2 className='title-font'>Register</h2></Center>
                            <Center><h6>Create your account in seconds</h6></Center>
                            <FormControl py='5vh' onSubmit={formikLogin.handleSubmit}>
                                <FormLabel>Email address</FormLabel>
                                <Input id='email' name='email' type='email' onChange={formikLogin.handleChange} value={formikLogin.values.email}/>
                                <FormLabel>Username</FormLabel>
                                <Input id='username' name='username' type='text' onChange={formikLogin.handleChange} value={formikLogin.values.username}/>
                                <FormLabel>Create password</FormLabel>
                                <Input id='password' name='password' type='password' onChange={formikLogin.handleChange} value={formikLogin.values.password}/>
                                <FormLabel>Confirm password</FormLabel>
                                <Input id='confirmPassword' name='confirmPassword' type='password' onChange={formikLogin.handleChange} value={formikLogin.values.confirmPassword}/>
                                
                                <Checkbox py='5vh'colorScheme='greenBrand' defaultChecked size='md'>I agree to the terms and privacy policy</Checkbox>
                      
                                <Center><SubmitButton text="Create an account" onClick={formikLogin.handleSubmit}/></Center>

                                <Center pt='5vh'>
                                    Already a member? 
                                    <Button colorScheme='greenBrand' variant='link'>Login</Button>
                                </Center>
                            </FormControl>
                        </CardBody>
                    </Card>
                </Box>
            </SimpleGrid>
        </Page>
    );
}

export default LoginPage;