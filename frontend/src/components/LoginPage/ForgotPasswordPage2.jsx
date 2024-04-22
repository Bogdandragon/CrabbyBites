import Page from "../Page/Page";
import { useFormik } from 'formik';
import { Input, FormControl, FormLabel, Button, FormErrorMessage } from '@chakra-ui/react';
import { SimpleGrid, Box, Checkbox, Card, Center, useToast } from '@chakra-ui/react'
import { CardBody } from 'react-bootstrap';
import SubmitButton from '../Buttons/SubmitButton'
import './LoginPage.css';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import axios from "axios";

function ForgotPasswordPage1() {
    const navigate = useNavigate();
    const toast = useToast();

    const formikLogin = useFormik({
        initialValues: {
          email: '',
          password: '',
          confirmPassword: ''
        },
        onSubmit: (values) => {
        //   axios.post('http://localhost:5000/api/auth/login', values)
        //   .then(response => {
        //     window.localStorage.setItem('token', response.data);
        //     toast({
        //         title: 'Login successful.',
        //         description: 'Welcome back!',
        //         status: 'success',
        //         duration: 5000,
        //         isClosable: true,
        //     });
        //     navigate('/');
        //   })
        //   .catch(error => {
        //     toast({
        //         title: 'An error occurred.',
        //         description: error.response.data,
        //         status: 'error',
        //         duration: 5000,
        //         isClosable: true,
        //     });
        //   });
        },
        validationSchema: Yup.object().shape({
            email: Yup.string().email('Invalid email').required('Email required'),
            password: Yup.string().min(8, "Minimum length is 8 characters").required('Password required'),
            confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Confirm password required')
            
        })
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
                    <Card py='10vh' px='10vw'>
                        <CardBody colorScheme='white'>
                            <Center><h2 className='title-font'>Forgot Password</h2></Center>
                            <Center><h6>Step 2: Choose your new password</h6></Center>
                            <FormControl py='5vh' onSubmit={formikLogin.handleSubmit}>
                                <FormControl isInvalid={formikLogin.errors.email && formikLogin.touched.email} onChange={formikLogin.handleChange}>
                                    <FormLabel>Email address</FormLabel>
                                    <Input id='email' name='email' type='email' value={formikLogin.values.email}/>
                                    <FormErrorMessage>
                                        {formikLogin.errors.email}
                                    </FormErrorMessage>
                                </FormControl>
                                <FormControl isInvalid={formikLogin.errors.password && formikLogin.touched.password} onChange={formikLogin.handleChange} >
                                    <FormLabel>Create password</FormLabel>
                                    <Input id='password' name='password' type='password' onChange={formikLogin.handleChange} value={formikLogin.values.password}/>
                                    <FormErrorMessage>
                                        {formikLogin.errors.password}
                                    </FormErrorMessage>
                                </FormControl>
                                <FormControl isInvalid={formikLogin.errors.confirmPassword && formikLogin.touched.confirmPassword} onChange={formikLogin.handleChange} >
                                    <FormLabel>Confirm password</FormLabel>
                                    <Input id='confirmPassword' name='confirmPassword' type='password' onChange={formikLogin.handleChange} value={formikLogin.values.confirmPassword}/>
                                    <FormErrorMessage>
                                        {formikLogin.errors.confirmPassword}
                                    </FormErrorMessage>
                                </FormControl>
                                <FormControl pt = '5vh' isInvalid={formikLogin.errors.email && formikLogin.touched.email} onChange={formikLogin.handleChange}>
                                    <Center><SubmitButton text="Save your new password"/></Center>
                                </FormControl>
                            </FormControl>
                        </CardBody>
                    </Card>
                </Box>
            </SimpleGrid>
        </Page>
    );
}

export default ForgotPasswordPage1;