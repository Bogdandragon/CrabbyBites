import mongoose, {Model} from "mongoose";

type DIFFICULTY = 'EASY' | 'MEDIUM' | 'HARD'

type STATUS = 'PENDING' | 'APPROVED' | 'REJECTED'

type MEASUREMENT = 'g' | 'kg' | 'ml' | 'l' | 'tsp' | 'tbsp' | 'cup' | 'pint' | 'quart' | 'gallon' | 'oz' | 'lb' | 'mg' | 'mcg' | 'unit';

interface IRecipe{
    _id : mongoose.Types.ObjectId,
    name: string,
    time: number,
    difficulty: DIFFICULTY,
    portions: number,
    picture: string,
    category: string,
    description: string,
    ingredients: {
        name: string,
        quantity: number,
        measurement: MEASUREMENT,
        ingredientId: mongoose.Types.ObjectId | null
    }[],
    instructions: string[],
    status: STATUS,
    rejectionReason: string,
    rating: number,
    reportNo: number,
    userId: mongoose.Types.ObjectId
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
        enum: ['EASY', 'MEDIUM', 'HARD'],
        required: true
    },
    portions: {
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
        type: [{
            name: String,
            quantity: Number,
            measurement: String
        }],
        required: true
    },
    instructions: {
        type: [String],
        required: true
    },
    status: {
        type: String,
        enum: ['PENDING', 'APPROVED', 'REJECTED'],
        default: 'PENDING'
    },
    rejectionReason: {
        type: String,
        default: ""
    },
    rating: {
        type: Number,
        default: 0
    },
    reportNo: {
        type: Number,
        default: 0
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
});

const Recipe = mongoose.model<IRecipe, IRecipeStatics>("recipes", recipeSchema);

export default Recipe;