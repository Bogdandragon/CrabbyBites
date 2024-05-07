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

    const formikForgotPassword = useFormik({
        initialValues: {
          email: ''
        },
        onSubmit: (values) => {
          axios.post('http://localhost:5000/api/auth/forgot-password-email', values)
          .then(response => {
            window.localStorage.setItem('token', response.data);
            toast({
                title: 'Email sent successfully',
                description: 'Check your email for further instructions (check spam folder too)',
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
            email: Yup.string().email('Invalid email').required('Email required'),
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
                        <CardBody colorScheme='white'>
                            <Center><h2 className='title-font'>Forgot Password</h2></Center>
                            <Center><h6>Step 1: Introduce your email</h6></Center>
                            <FormControl py='5vh' onSubmit={formikForgotPassword.handleSubmit}>
                                <FormControl isInvalid={formikForgotPassword.errors.email && formikForgotPassword.touched.email} onChange={formikForgotPassword.handleChange}>
                                    <FormLabel>Email address</FormLabel>
                                    <Input id='email' name='email' type='email' value={formikForgotPassword.values.email}/>
                                    <FormErrorMessage>
                                        {formikForgotPassword.errors.email}
                                    </FormErrorMessage>
                                </FormControl>
                                <FormControl pt = '5vh' isInvalid={formikForgotPassword.errors.email && formikForgotPassword.touched.email} onChange={formikForgotPassword.handleChange}>
                                    <Center><SubmitButton text="Send email" onClick={formikForgotPassword.handleSubmit}/></Center>
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