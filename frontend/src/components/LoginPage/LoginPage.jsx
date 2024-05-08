import Page from "../Page/Page";
import { useFormik } from 'formik';
import { Input, FormControl, FormLabel, FormErrorMessage, Button } from '@chakra-ui/react';
import { SimpleGrid, Box, Checkbox, Card, Center, useToast } from '@chakra-ui/react'
import { CardBody } from 'react-bootstrap';
import SubmitButton from '../Buttons/SubmitButton'
import './LoginPage.css';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import * as Yup from 'yup';

function LoginPage() {
    const navigate = useNavigate();
    const toast = useToast();

    const formikLogin = useFormik({
        initialValues: {
          username: '',
          password: ''
        },
        onSubmit: (values) => {
          axios.post('http://localhost:5000/api/auth/login', values)
          .then(response => {
            window.localStorage.setItem('token', response.data);
            toast({
                title: 'Login successful.',
                description: 'Welcome back!',
                status: 'success',
                duration: 5000,
                isClosable: true,
            });
            navigate('/');
          })
          .catch(error => {
            toast({
                title: 'An error occurred.',
                description: error.response.data,
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
          });
        },
        validationSchema: Yup.object().shape({
            username: Yup.string().min(6, "Minimum length is 6 characters").required('Username required'),
            password: Yup.string().min(12, "Minimum length is 12 characters").required('Password required')
        })
    })

    return (
        <Page>
            <SimpleGrid columns={2} spacing={0} w='100%' h='90vh'>
                <Box bgImage={'cookingBackground.jpeg'}
                    bgPosition='center'
                    bgSize='cover'
                    bgRepeat='no-repeat'
                    w='100%' h='100%' className="hide-on-mobile"/>

                <Box h='100%' py='10vh' px='5vw' textAlign='left' className="column-width">
                    <Card py='10vh' px='10vw'>
                        <CardBody>
                            <Center><h2 className='title-font'>Login</h2></Center>
                            <Center><h6>Log into your account in seconds</h6></Center>
                            <FormControl py='5vh' onSubmit={formikLogin.handleSubmit}>
                                <FormControl isInvalid={formikLogin.errors.username && formikLogin.touched.username} onChange={formikLogin.handleChange} >
                                    <FormLabel>Username</FormLabel>
                                    <Input id='username' name='username' type='text' onChange={formikLogin.handleChange} value={formikLogin.values.username}/>
                                    <FormErrorMessage>
                                        {formikLogin.errors.username}
                                    </FormErrorMessage>
                                </FormControl>
                                <FormControl isInvalid={formikLogin.errors.password && formikLogin.touched.password} onChange={formikLogin.handleChange} >
                                    <FormLabel>Password</FormLabel>
                                    <Input id='password' name='password' type='password' onChange={formikLogin.handleChange} value={formikLogin.values.password}/>
                                    <FormErrorMessage>
                                        {formikLogin.errors.password}
                                    </FormErrorMessage>
                                </FormControl>
                                <SimpleGrid py='5vh' columns={2}>
                                    <Box>
                                        <Checkbox colorScheme='greenBrand' defaultChecked size='md'>Keep me logged in</Checkbox>
                                    </Box>
                                    <Box textAlign='right'>
                                        <Button colorScheme='greenBrand' variant='link' onClick={() => navigate("/forgot-password")}>Forgot password?</Button>
                                    </Box>
                                </SimpleGrid>

                                <Center><SubmitButton text="Login" onClick={formikLogin.handleSubmit}/></Center>
                            </FormControl>
                        </CardBody>
                    </Card>
                </Box>
            </SimpleGrid>
        </Page>
    );
}

export default LoginPage;