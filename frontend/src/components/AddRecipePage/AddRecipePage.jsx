import Page from "../Page/Page";
import { Field, useFormik } from 'formik';
import { Input, FormControl, FormLabel, FormErrorMessage, Button } from '@chakra-ui/react';
import { SimpleGrid, Box, Checkbox, Card, Center, useToast, Select } from '@chakra-ui/react'
import { CardBody, Container } from 'react-bootstrap';
import SubmitButton from '../Buttons/SubmitButton'
import InfoButton from '../Buttons/InfoButton'
import './AddRecipePage.css';
import { Form, useNavigate } from 'react-router-dom';
import axios from "axios";
import * as Yup from 'yup';

function AddRecipePage() {
    const navigate = useNavigate();
    const toast = useToast();

    const formikAddRecipe = useFormik({
        initialValues: {
          recipeName: '',
          finishTime: 0,
          difficulty: '',
          noPortions: 0,
          cover: '',
          category: '',
          description: '',
          ingredients: '',
          instructions: '',
          terms: false
        },
        onSubmit: (values) => {},
        validationSchema: Yup.object().shape({
            recipeName: Yup.string().required('Required field'),
            finishTime: Yup.number().positive('A positive number is required for this field').integer().required('Required field'),
            noPortions: Yup.number().positive().integer().required('Required field'),
            description: Yup.string().min(30, "Minimum length is 30 characters").required('Required field'),
            instructions: Yup.string().min(100, "Minimum length is 100 characters").required('Required field'),
            terms: Yup.boolean().oneOf([true], 'You must accept the terms and conditions')
        })
    })

    return (
        <Page>
            <Center className="page-background" py="10vh">
                <Card py='10vh' px='10vw' w="80%">
                    <CardBody>
                        <Center><h2 className='title-font'>Add your recipe</h2></Center>
                        <Center><h6>Complete this form with recipe's instructions</h6></Center>
                        <FormControl py='5vh' onSubmit={formikAddRecipe.handleSubmit}>
                            <FormControl pb='2vh' isInvalid={formikAddRecipe.errors.recipeName && formikAddRecipe.touched.recipeName} onChange={formikAddRecipe.handleChange} >
                                <FormLabel>Recipe Name (choose an appropriate name for your recipe)</FormLabel>
                                <Input id='recipeName' name='recipeName' type='text' onChange={formikAddRecipe.handleChange} value={formikAddRecipe.values.recipeName}/>
                                <FormErrorMessage>{formikAddRecipe.errors.recipeName}</FormErrorMessage>
                            </FormControl>
                            <FormControl pb='2vh' isInvalid={formikAddRecipe.errors.finishTime && formikAddRecipe.touched.finishTime} onChange={formikAddRecipe.handleChange} >
                                <FormLabel>Estimated finish time for recipe in minutes</FormLabel>
                                <Input id='finishTime' name='finishTime' type='number' onChange={formikAddRecipe.handleChange} value={formikAddRecipe.values.finishTime}/>
                                <FormErrorMessage>{formikAddRecipe.errors.finishTime}</FormErrorMessage>
                            </FormControl>
                            <FormControl pb='2vh'>
                                <FormLabel>Is it difficult to cook?</FormLabel>
                                <Select id='difficulty' name='difficulty' type='text' onChange={formikAddRecipe.handleChange} value={formikAddRecipe.values.difficulty}>
                                    <option value='easy'>easy</option>
                                    <option value='medium'>medium</option>
                                    <option value='hard'>hard</option>
                                </Select>
                            </FormControl>
                            <FormControl pb='2vh' isInvalid={formikAddRecipe.errors.noPortions && formikAddRecipe.touched.noPortions} onChange={formikAddRecipe.handleChange} >
                                <FormLabel>Number of portions</FormLabel>
                                <Input id='noPortions' name='noPortions' type='number' onChange={formikAddRecipe.handleChange} value={formikAddRecipe.values.noPortions}/>
                                <FormErrorMessage>{formikAddRecipe.errors.noPortions}</FormErrorMessage>
                            </FormControl>
                            {/* TODO special field to select a picture from files*/}
                            <FormControl pb='2vh' isInvalid={formikAddRecipe.errors.cover && formikAddRecipe.touched.cover} onChange={formikAddRecipe.handleChange} >
                                <FormLabel>Cover picture (choose .jpg or .jpeg file)</FormLabel>
                                <Input id='cover' name='cover' type='file' onChange={formikAddRecipe.handleChange} value={formikAddRecipe.values.cover}/>
                                <FormErrorMessage>{formikAddRecipe.errors.cover}</FormErrorMessage>
                            </FormControl>
                            <FormControl pb='2vh'>
                                <FormLabel>Category of product</FormLabel>
                                <Select id='category' name='category' type='text' onChange={formikAddRecipe.handleChange} value={formikAddRecipe.values.category}>
                                    <option value='breakfast'>breakfast</option>
                                    <option value='lunch'>lunch</option>
                                    <option value='dinner'>dinner</option>
                                    <option value='dessert'>dessert</option>
                                    <option value='snack'>snack</option>
                                </Select>
                            </FormControl>
                            <FormControl pb='2vh' isInvalid={formikAddRecipe.errors.description && formikAddRecipe.touched.description} onChange={formikAddRecipe.handleChange} >
                                <FormLabel>Write your recipe's description in a few words</FormLabel>
                                <Input id='description' name='description' type='description' onChange={formikAddRecipe.handleChange} value={formikAddRecipe.values.description}/>
                                <FormErrorMessage>{formikAddRecipe.errors.description}</FormErrorMessage>
                            </FormControl>
                            {/* TODO popup for ingredients*/}
                            <Center py='3vh'><InfoButton text='Add ingredients and quantities' /></Center>
                            {/* TODO group of form controls for instructions*/}
                            <FormControl pb='2vh' isInvalid={formikAddRecipe.errors.instructions && formikAddRecipe.touched.instructions} onChange={formikAddRecipe.handleChange} >
                                <FormLabel>Write the instructions for your recipe</FormLabel>
                                <Input id='instructions' name='instructions' type='instructions' onChange={formikAddRecipe.handleChange} value={formikAddRecipe.values.instructions}/>
                                <FormErrorMessage>{formikAddRecipe.errors.instructions}</FormErrorMessage>
                            </FormControl>

                            <FormControl py='5vh' isInvalid={formikAddRecipe.errors.terms && formikAddRecipe.touched.terms} onChange={formikAddRecipe.handleChange} >
                                    <Checkbox id='terms' name='terms' colorScheme='greenBrand' size='md'>I agree with <Button colorScheme='greenBrand' variant='link'>Terms and Conditions</Button></Checkbox>
                                    <FormErrorMessage>
                                        {formikAddRecipe.errors.terms}
                                    </FormErrorMessage>
                                </FormControl>
                            
                            <Center><SubmitButton text="Preview"/></Center>
                            <Center pt='3vh'><SubmitButton text="Send your recipe" onClick={formikAddRecipe.handleSubmit}/></Center>
                        </FormControl>
                    </CardBody>
                </Card>
            </Center>
        </Page>
    );
}

export default AddRecipePage;