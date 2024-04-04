import mongoose, {Model} from "mongoose";


/*
_id: object id
name: string
time: number
difficulty: string
portionNo: number
picture: string
category: string
description: string
ingredients: list (object)
instructions: string
status: string
rejectionReason: string
rating: number
reportNo: number
userId: number


*/
interface IRecipe {
    _id: mongoose.Types.ObjectId,
    name: string,
    time: number,
    difficulty: string,
    portionNo: number,
    picture: string,
    category: string,
    description: string,
    ingredients: object[],
    instructions: string,
    status: string,
    rejectionReason: string,
    rating: number,
    reportNo: number,
    userId: number
}

interface IRecipeMethods {
    //Add non-static methods
}

interface IRecipeStatics extends Model<IRecipe, {}, IRecipeMethods> {
    //Static methods
}

const recipeSchema = new mongoose.Schema<IRecipe, IRecipeStatics, IRecipeMethods>({
    name: {
        type: String,
        required: true
    },
    time: {
        type: Number,
        required: true
    },
    difficulty: {
        type: String,
        required: true
    },
    portionNo: {
        type: Number,
        required: true
    },
    picture: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    ingredients: {
        type: [Object],
        required: true
    },
    instructions: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    rejectionReason: {
        type: String,
        required: false
    },
    rating: {
        type: Number,
        required: false
    },
    reportNo: {
        type: Number,
        required: true
    },
    userId: {
        type: Number,
        required: true
    }
});

const Recipe = mongoose.model<IRecipe, IRecipeStatics>('Recipe', recipeSchema);

export default Recipe;