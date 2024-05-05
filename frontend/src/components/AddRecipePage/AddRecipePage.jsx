import Page from "../Page/Page";
import { Field, useFormik } from 'formik';
import { Input, FormControl, FormLabel, FormErrorMessage, Button } from '@chakra-ui/react';
import { SimpleGrid, Box, Checkbox, Card, Center, useToast, Select } from '@chakra-ui/react'
import { CardBody } from 'react-bootstrap';
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
          finishTime: '',
          difficulty: '',
          noPortions: '',
          cover: '',
          category: '',
          description: '',
          ingredients: '',
          instructions: ''
        },
        onSubmit: (values) => {},
        validationSchema: Yup.object().shape({
        })
    })
    const BasicSelect = () => {
        const selectedOption = '';
        selectedOption = '';
     
        const handleSelectChange = (event) => {
            const selectedValue = event.target.value;
            selectedOption(selectedValue);
        }
    }

    return (
        <Page>
            {/* TODO background*/}
            <Box h='100%' w='100%' textAlign='left'
                bgImage={'cookingBackground.jpeg'}
                bgPosition='center'
                bgSize='cover'
                bgRepeat='no-repeat'
                >
                <Card py='10vh' px='10vw'>
                    <CardBody>
                        <Center><h2 className='title-font'>Add your recipe</h2></Center>
                        <Center><h6>Complete this form with recipe's instructions</h6></Center>
                        <FormControl py='5vh' onSubmit={formikAddRecipe.handleSubmit}>
                            <FormControl isInvalid={formikAddRecipe.errors.recipeName && formikAddRecipe.touched.recipeName} onChange={formikAddRecipe.handleChange} >
                                <FormLabel>Recipe Name</FormLabel>
                                <Input id='recipeName' name='recipeName' type='text' onChange={formikAddRecipe.handleChange} value={formikAddRecipe.values.recipeName}/>
                                <FormErrorMessage>{formikAddRecipe.errors.recipeName}</FormErrorMessage>
                            </FormControl>
                            <FormControl isInvalid={formikAddRecipe.errors.finishTime && formikAddRecipe.touched.finishTime} onChange={formikAddRecipe.handleChange} >
                                <FormLabel>Estimated finish time for recipe</FormLabel>
                                <Input id='finishTime' name='finishTime' type='finishTime' onChange={formikAddRecipe.handleChange} value={formikAddRecipe.values.finishTime}/>
                                <FormErrorMessage>{formikAddRecipe.errors.finishTime}</FormErrorMessage>
                            </FormControl>
                            {/* TODO onChange function doesn't work*/}
                            <FormControl>
                                <FormLabel>Is it difficult to cook?</FormLabel>
                                <Select onChange={BasicSelect.handleSelectChange} value={formikAddRecipe.values.difficulty}>
                                    <option value='easy'>easy</option>
                                    <option value='medium'>medium</option>
                                    <option value='hard'>hard</option>
                                </Select>
                            </FormControl>
                            <FormControl isInvalid={formikAddRecipe.errors.noPortions && formikAddRecipe.touched.noPortions} onChange={formikAddRecipe.handleChange} >
                                <FormLabel>Number of portions</FormLabel>
                                <Input id='noPortions' name='noPortions' type='noPortions' onChange={formikAddRecipe.handleChange} value={formikAddRecipe.values.noPortions}/>
                                <FormErrorMessage>{formikAddRecipe.errors.noPortions}</FormErrorMessage>
                            </FormControl>
                            {/* TODO special field to select a picture from files*/}
                            <FormControl isInvalid={formikAddRecipe.errors.cover && formikAddRecipe.touched.cover} onChange={formikAddRecipe.handleChange} >
                                <FormLabel>Cover picture</FormLabel>
                                <Input id='cover' name='cover' type='cover' onChange={formikAddRecipe.handleChange} value={formikAddRecipe.values.cover}/>
                                <FormErrorMessage>{formikAddRecipe.errors.cover}</FormErrorMessage>
                            </FormControl>
                            {/* TODO onChange function doesn't work*/}
                            <FormControl>
                                <FormLabel>Category of product</FormLabel>
                                <Select onChange={BasicSelect.handleSelectChange} value={formikAddRecipe.values.category}>
                                    <option value='breakfast'>breakfast</option>
                                    <option value='lunch'>lunch</option>
                                    <option value='dinner'>dinner</option>
                                    <option value='dessert'>dessert</option>
                                    <option value='snack'>snack</option>
                                </Select>
                            </FormControl>
                            <FormControl isInvalid={formikAddRecipe.errors.cover && formikAddRecipe.touched.cover} onChange={formikAddRecipe.handleChange} >
                                <FormLabel>Cover picture</FormLabel>
                                <Input id='cover' name='cover' type='cover' onChange={formikAddRecipe.handleChange} value={formikAddRecipe.values.cover}/>
                                <FormErrorMessage>{formikAddRecipe.errors.cover}</FormErrorMessage>
                            </FormControl>
                            <FormControl isInvalid={formikAddRecipe.errors.description && formikAddRecipe.touched.description} onChange={formikAddRecipe.handleChange} >
                                <FormLabel>Write your recipe's description in a few words</FormLabel>
                                <Input id='description' name='description' type='description' onChange={formikAddRecipe.handleChange} value={formikAddRecipe.values.description}/>
                                <FormErrorMessage>{formikAddRecipe.errors.description}</FormErrorMessage>
                            </FormControl>
                            {/* TODO popup for ingredients*/}
                            <Center py='3vh'><InfoButton text='Add ingredients and quantities' /></Center>
                            {/* TODO group of form controls for instructions*/}
                            <FormControl isInvalid={formikAddRecipe.errors.instructions && formikAddRecipe.touched.instructions} onChange={formikAddRecipe.handleChange} >
                                <FormLabel>Write the instructions for your recipe</FormLabel>
                                <Input id='instructions' name='instructions' type='instructions' onChange={formikAddRecipe.handleChange} value={formikAddRecipe.values.instructions}/>
                                <FormErrorMessage>{formikAddRecipe.errors.instructions}</FormErrorMessage>
                            </FormControl>

                            <Box py='5vh'>
                                <Checkbox colorScheme='greenBrand' defaultChecked size='md'>I agree with <Button colorScheme='greenBrand' variant='link'>Terms and Conditions</Button></Checkbox>
                            </Box>
                            <Center><SubmitButton text="Preview" onClick={formikAddRecipe.handleSubmit}/></Center>
                            <Center py='3vh'><SubmitButton text="Login" onClick={formikAddRecipe.handleSubmit}/></Center>
                        </FormControl>
                    </CardBody>
                </Card>
            </Box>
        </Page>
    );
}

export default AddRecipePage;