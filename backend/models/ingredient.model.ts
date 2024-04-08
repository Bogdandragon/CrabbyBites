import mongoose, {Model} from "mongoose";

interface IIngredient{
    _id : mongoose.Types.ObjectId,
    name: string,
    appearanceNo: number,
}

interface IIngredientMethods {
    //Add non-static methods
}

interface IIngredientStatics extends Model<IIngredient, {}, IIngredientMethods> {
    //Static methods
}

const ingredientSchema = new mongoose.Schema<IIngredient, IIngredientStatics, IIngredientMethods>({
    name: {
        type: String,
        required: true
    },
    appearanceNo: {
        type: Number,
        default: 1
    }
});

const Ingredient = mongoose.model<IIngredient, IIngredientStatics>("ingredients", ingredientSchema);

export default Ingredient;