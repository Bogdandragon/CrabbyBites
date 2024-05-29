import Page from "../Page/Page";
import { useFormik } from 'formik';
import { Input, FormControl, FormLabel, FormErrorMessage, Button, Text, Checkbox, Card, Center, useToast, Select } from '@chakra-ui/react';
import { CardBody} from 'react-bootstrap';
import SubmitButton from '../Buttons/SubmitButton'
import './AddRecipePage.css';
import { Form, useNavigate } from 'react-router-dom';
import axios from "axios";
import * as Yup from 'yup';
import Ingredients from './AddIngredients/Ingredients';
import Instructions from './AddInstructions/Instructions';
import { useState } from 'react';

function AddRecipePage() {
    const navigate = useNavigate();
    const toast = useToast();
    const [file, setFile] = useState(null);
    const [fileRead, setFileRead] = useState(null);

    function handleFileChange(e) {
        setFile(e.target.files[0]);
        const fileReader = new FileReader();
        fileReader.onload = () => {
            if (fileReader.readyState === 2) {
                setFileRead(fileReader.result);
            }
        };
        fileReader.readAsDataURL(e.target.files[0]);
    }

    const formikAddRecipe = useFormik({
        initialValues: {
          name: '',
          time: 0,
          difficulty: 'EASY',
          portions: 0,
          picture: '',
          encoding: '',
          category: 'BREAKFAST',
          description: '',
          ingredients: [],
          instructions: [],
          terms: false
        },
        onSubmit: async (values) => {
            let sendValues = {...values};
            sendValues.picture = fileRead;
            sendValues.encoding = "png";
            sendValues.ingredients = values.ingredients.map((ingredient) => {
                return {
                    name: ingredient.name,
                    quantity: ingredient.quantity,
                    measurement: ingredient.measurement
                };
            });
            sendValues.instructions = values.instructions.map((instruction) => {
                return instruction ? instruction.instruction : "asfavbs";
            });
            sendValues = {
                name: sendValues.name,
                time: sendValues.time,
                difficulty: sendValues.difficulty,
                portions: sendValues.portions,
                picture: sendValues.picture,
                encoding: sendValues.encoding,
                category: sendValues.category,
                description: sendValues.description,
                ingredients: sendValues.ingredients,
                instructions: sendValues.instructions
            }
            console.log(sendValues);
            axios.post('http://localhost:5000/api/recipes/add', sendValues, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            }).then((response) => {
                toast({
                    title: 'Recipe added successfully.',
                    description: 'Your recipe is now available for everyone.',
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                });
                navigate('/');
            }).catch((error) => {
                console.log(error);
                toast({
                    title: 'Error.',
                    description: 'An error occurred while adding the recipe.',
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                });
            });
        },
        validationSchema: Yup.object().shape({
            name: Yup.string().required('Required field'),
            time: Yup.number().positive('A positive number is required for this field').integer().required('Required field'),
            portions: Yup.number().positive().integer().required('Required field'),
            description: Yup.string().min(30, "Minimum length is 30 characters").required('Required field'),
            ingredients: Yup.array().min(1, "Add at least an ingredient").required('There are no recipes without ingredients'),
            instructions: Yup.array().min(1, "Add at least an instruction").required('There are no recipes without instructions'),
            terms: Yup.boolean().oneOf([true], 'You must accept the terms and conditions'),
            picture: Yup.mixed().required('Picture is required')
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
                            <FormControl pb='2vh' isInvalid={formikAddRecipe.errors.name && formikAddRecipe.touched.name} onChange={formikAddRecipe.handleChange} >
                                <FormLabel>Recipe Name (choose an appropriate name for your recipe)</FormLabel>
                                <Input id='name' name='name' type='text' onChange={formikAddRecipe.handleChange} value={formikAddRecipe.values.name}/>
                                <FormErrorMessage>{formikAddRecipe.errors.name}</FormErrorMessage>
                            </FormControl>
                            <FormControl pb='2vh' isInvalid={formikAddRecipe.errors.time && formikAddRecipe.touched.time} onChange={formikAddRecipe.handleChange} >
                                <FormLabel>Estimated finish time for recipe in minutes</FormLabel>
                                <Input id='time' name='time' type='number' onChange={formikAddRecipe.handleChange} value={formikAddRecipe.values.time}/>
                                <FormErrorMessage>{formikAddRecipe.errors.time}</FormErrorMessage>
                            </FormControl>
                            <FormControl pb='2vh'>
                                <FormLabel>Is it difficult to cook?</FormLabel>
                                <Select id='difficulty' name='difficulty' type='text' onChange={formikAddRecipe.handleChange} value={formikAddRecipe.values.difficulty}>
                                    <option value='EASY'>easy</option>
                                    <option value='MEDIUM'>medium</option>
                                    <option value='HARD'>hard</option>
                                </Select>
                            </FormControl>
                            <FormControl pb='2vh' isInvalid={formikAddRecipe.errors.portions && formikAddRecipe.touched.portions} onChange={formikAddRecipe.handleChange} >
                                <FormLabel>Number of portions</FormLabel>
                                <Input id='portions' name='portions' type='number' onChange={formikAddRecipe.handleChange} value={formikAddRecipe.values.portions}/>
                                <FormErrorMessage>{formikAddRecipe.errors.portions}</FormErrorMessage>
                            </FormControl>
                            <FormControl pb='2vh' isInvalid={formikAddRecipe.errors.picture && formikAddRecipe.touched.picture} onChange={formikAddRecipe.handleChange} >
                                <FormLabel>Picture (choose .png file)</FormLabel>
                                <Input id='picture' name='picture' type='file' onChange={(e) => {handleFileChange(e); formikAddRecipe.handleChange(e); }} value={formikAddRecipe.values.picture}/>
                                <FormErrorMessage>{formikAddRecipe.errors.picture}</FormErrorMessage>
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
                            {/* TODO validation*/}
                            <FormControl pb='2vh' isInvalid={formikAddRecipe.errors.ingredients && formikAddRecipe.touched.ingredients} onChange={formikAddRecipe.handleChange}>
                                <FormLabel>Add ingredients and quantities</FormLabel>
                                <Ingredients ingredients={formikAddRecipe.values.ingredients}/>
                                <FormErrorMessage>{formikAddRecipe.errors.ingredients}</FormErrorMessage>
                            </FormControl>
                            {/* TODO validation*/}
                            <FormControl pb='2vh' isInvalid={formikAddRecipe.errors.instructions && formikAddRecipe.touched.instructions} onChange={formikAddRecipe.handleChange}>
                                <FormLabel>Add instructions</FormLabel>
                                <Instructions instructions={formikAddRecipe.values.instructions}/>
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