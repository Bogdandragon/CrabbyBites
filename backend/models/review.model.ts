import mongoose, {Model} from "mongoose";

interface IReview{
    _id : mongoose.Types.ObjectId,
    userId: mongoose.Types.ObjectId,
    recipeId: mongoose.Types.ObjectId,
    rating: number,
    comment: string,
    reportNo: number
}

interface IReviewMethods {
    //Add non-static methods
}

interface IReviewStatics extends Model<IReview, {}, IReviewMethods> {
    //Static methods
}

const reviewSchema = new mongoose.Schema<IReview, IReviewStatics, IReviewMethods>({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    recipeId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    comment: {
        type: String,
        default: ""
    },
    reportNo: {
        type: Number,
        default: 0
    }
});

const Review = mongoose.model<IReview, IReviewStatics>("reviews", reviewSchema);

export default Review;