import './LoginPage.css';
import Page from "../Page/Page";
import { useFormik } from 'formik';
import { Input, FormControl, FormLabel, FormErrorMessage, SimpleGrid, Box, Card, Center, useToast } from '@chakra-ui/react';
import { CardBody } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import axios from "axios";
import SubmitButton from '../Buttons/SubmitButton';

function ForgotPasswordPage2() {
    const navigate = useNavigate();
    const toast = useToast();

    const formikForgotPassword = useFormik({
        initialValues: {
          email: '',
          password: '',
          confirmPassword: ''
        },
        onSubmit: (values) => {
          axios.post('http://localhost:5000/api/auth/forgot-password-change-password', values)
          .then(response => {
            window.localStorage.setItem('token', response.data);
            toast({
                title: 'Password changed successfully',
                description: 'Welcome back! Please login with your new password',
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
            password: Yup.string().min(8, "Minimum length is 12 characters").required('Password required'),
            confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Confirm password required')
            
        })
    })

    return (
        <Page>
            <SimpleGrid columns={2} spacing={0} w='100%' h='90vh'>
                <Box bgImage={'cookingBackground.jpeg'} bgPosition='center' bgSize='cover' bgRepeat='no-repeat' w='100%' h='100%' className="hide-on-mobile"/>
                <Box h='100%' py='10vh' px='5vw' textAlign='left' className="column-width">
                    <Card py='10vh' px='10vw'>
                        <CardBody colorScheme='white'>
                            <Center><h2 className='title-font'>Forgot Password</h2></Center>
                            <Center><h6>Step 2: Choose your new password</h6></Center>
                            <FormControl py='5vh' onSubmit={formikForgotPassword.handleSubmit}>
                                <FormControl isInvalid={formikForgotPassword.errors.email && formikForgotPassword.touched.email} onChange={formikForgotPassword.handleChange}>
                                    <FormLabel>Email address</FormLabel>
                                    <Input id='email' name='email' type='email' value={formikForgotPassword.values.email}/>
                                    <FormErrorMessage>
                                        {formikForgotPassword.errors.email}
                                    </FormErrorMessage>
                                </FormControl>
                                <FormControl isInvalid={formikForgotPassword.errors.password && formikForgotPassword.touched.password} onChange={formikForgotPassword.handleChange} >
                                    <FormLabel>Create password</FormLabel>
                                    <Input id='password' name='password' type='password' onChange={formikForgotPassword.handleChange} value={formikForgotPassword.values.password}/>
                                    <FormErrorMessage>
                                        {formikForgotPassword.errors.password}
                                    </FormErrorMessage>
                                </FormControl>
                                <FormControl isInvalid={formikForgotPassword.errors.confirmPassword && formikForgotPassword.touched.confirmPassword} onChange={formikForgotPassword.handleChange} >
                                    <FormLabel>Confirm password</FormLabel>
                                    <Input id='confirmPassword' name='confirmPassword' type='password' onChange={formikForgotPassword.handleChange} value={formikForgotPassword.values.confirmPassword}/>
                                    <FormErrorMessage>
                                        {formikForgotPassword.errors.confirmPassword}
                                    </FormErrorMessage>
                                </FormControl>
                                <FormControl pt = '5vh' isInvalid={formikForgotPassword.errors.email && formikForgotPassword.touched.email} onChange={formikForgotPassword.handleChange}>
                                    <Center><SubmitButton text="Save your new password" onClick={formikForgotPassword.handleSubmit}/></Center>
                                </FormControl>
                            </FormControl>
                        </CardBody>
                    </Card>
                </Box>
            </SimpleGrid>
        </Page>
    );
}

export default ForgotPasswordPage2;