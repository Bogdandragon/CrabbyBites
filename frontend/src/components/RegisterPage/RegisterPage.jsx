import Page from "../Page/Page";
import { useFormik } from 'formik';
import { Input, FormControl, FormLabel, Button, FormErrorMessage } from '@chakra-ui/react';
import { SimpleGrid, Box, Checkbox, Card, Center, useToast } from '@chakra-ui/react'
import { CardBody } from 'react-bootstrap';
import SubmitButton from '../Buttons/SubmitButton';
import './RegisterPage.css';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

function RegisterPage() {
    const navigate = useNavigate();
    const toast = useToast();

    const formikLogin = useFormik({
        initialValues: {
            email: '',
            username: '',
            password: '',
            confirmPassword: '',
            terms: false
        },
        onSubmit: (values) => {
            delete values.terms;
            axios.post('http://localhost:5000/api/auth/register', values)
                .then(response => {
                    toast({
                        title: 'Account created successfully.',
                        description: 'Welcome to Crabby Bites!',
                        status: 'success',
                        duration: 5000,
                        isClosable: true,
                    });
                    navigate('/login');
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
            email: Yup.string().email('Invalid email').required('Email required'),
            username: Yup.string().min(6, "Minimum length is 6 characters").required('Username required'),
            password: Yup.string().min(8, "Minimum length is 8 characters").required('Password required'),
            confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Confirm password required'),
            terms: Yup.boolean().oneOf([true], 'You must accept the terms and privacy policy')
        })
    });

    return (
        <Page>
            <SimpleGrid columns={2} spacing={0} w='100vw' h='90vh'>
                <Box bgImage={'cookingBackground.jpeg'}
                    bgPosition='center'
                    bgSize='cover'
                    bgRepeat='no-repeat'
                    w='100%' h='100%' className="hide-on-mobile" />

                <Box h='100%' px='5vw' textAlign='left' className="column-width pt-md-5 py-3">
                    <Card py='5vh' px='10vw'>
                        <CardBody colorScheme='white'>
                            <Center><h2 className='title-font'>Register</h2></Center>
                            <Center><h6>Create your account in seconds</h6></Center>
                            <FormControl py='5vh' onSubmit={formikLogin.handleSubmit}>
                                <FormControl isInvalid={formikLogin.errors.email && formikLogin.touched.email} onChange={formikLogin.handleChange}>
                                    <FormLabel>Email address</FormLabel>
                                    <Input id='email' name='email' type='email' value={formikLogin.values.email} />
                                    <FormErrorMessage>
                                        {formikLogin.errors.email}
                                    </FormErrorMessage>
                                </FormControl>
                                <FormControl isInvalid={formikLogin.errors.username && formikLogin.touched.username} onChange={formikLogin.handleChange} >
                                    <FormLabel>Username</FormLabel>
                                    <Input id='username' name='username' type='text' value={formikLogin.values.username} />
                                    <FormErrorMessage>
                                        {formikLogin.errors.username}
                                    </FormErrorMessage>
                                </FormControl>
                                <FormControl isInvalid={formikLogin.errors.password && formikLogin.touched.password} onChange={formikLogin.handleChange} >
                                    <FormLabel>Create password</FormLabel>
                                    <Input id='password' name='password' type='password' onChange={formikLogin.handleChange} value={formikLogin.values.password} />
                                    <FormErrorMessage>
                                        {formikLogin.errors.password}
                                    </FormErrorMessage>
                                </FormControl>
                                <FormControl isInvalid={formikLogin.errors.confirmPassword && formikLogin.touched.confirmPassword} onChange={formikLogin.handleChange} >
                                    <FormLabel>Confirm password</FormLabel>
                                    <Input id='confirmPassword' name='confirmPassword' type='password' onChange={formikLogin.handleChange} value={formikLogin.values.confirmPassword} />
                                    <FormErrorMessage>
                                        {formikLogin.errors.confirmPassword}
                                    </FormErrorMessage>
                                </FormControl>
                                <FormControl py='5vh' isInvalid={formikLogin.errors.terms && formikLogin.touched.terms} onChange={formikLogin.handleChange} >
                                    <Checkbox id='terms' name='terms' colorScheme='greenBrand' size='md'>I agree to the terms and privacy policy</Checkbox>
                                    <FormErrorMessage>
                                        {formikLogin.errors.terms}
                                    </FormErrorMessage>
                                </FormControl>
                                <Center><SubmitButton text="Create an account" onClick={formikLogin.handleSubmit} /></Center>

                                <Center pt='5vh'>
                                    Already a member? &nbsp;
                                    <Button colorScheme='greenBrand' variant='link' onClick={() => navigate("/login")}>Login</Button>
                                </Center>
                            </FormControl>
                        </CardBody>
                    </Card>
                </Box>
            </SimpleGrid>
        </Page>
    );
}

export default RegisterPage;
