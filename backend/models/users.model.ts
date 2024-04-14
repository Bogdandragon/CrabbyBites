import mongoose, {Model} from "mongoose";
import bcrypt from "bcrypt";

type USER_TYPE = 'ADMIN' | 'USER';

type MEASUREMENT = 'g' | 'kg' | 'ml' | 'l' | 'tsp' | 'tbsp' | 'cup' | 'pint' | 'quart' | 'gallon' | 'oz' | 'lb' | 'mg' | 'mcg' | 'unit';

interface IUser{
    _id : mongoose.Types.ObjectId,
    email: string,
    username: string,
    password: string,
    type: USER_TYPE,
    favoriteRecipes: mongoose.Types.ObjectId[],
    todoRecipes: mongoose.Types.ObjectId[],
    ingredients: {
        name: string,
        quantity: number,
        measurement: MEASUREMENT,
        ingredientId: mongoose.Types.ObjectId | null
    }[],
    reportNo: number
}

interface IUserMethods {
    //Add non-static methods
    comparePassword(password : string | Buffer) : boolean;
}

interface IUserStatics extends Model<IUser, {}, IUserMethods> {
    //Static methods
}

const userSchema = new mongoose.Schema<IUser, IUserStatics, IUserMethods>({
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        minlength: 6,
        required: true,
        unique: true
    },
    password: {
        type: String,
        minlength: 8,
        required: true
    },
    type: {
        type: String,
        enum: ['ADMIN', 'USER'],
        required: true
    },
    favoriteRecipes: {
        type: [mongoose.Types.ObjectId],
        default: []
    },
    todoRecipes: {
        type: [mongoose.Types.ObjectId],
        default: []
    },
    ingredients: {
        type: [{
            name: String,
            quantity: Number,
            measurement: {
                type: String,
                enum: ['g', 'kg', 'ml', 'l', 'tsp', 'tbsp', 'cup', 'pint', 'quart', 'gallon', 'oz', 'lb', 'mg', 'mcg', 'unit']
            },
            ingredientId: mongoose.Types.ObjectId
        }],
        default: []
    },
    reportNo: {
        type: Number,
        default: 0
    }
});

userSchema.methods.comparePassword = function (password: string | Buffer) {
    return bcrypt.compareSync(password, this.password);
};

// Hashes the password before saving it in the database
userSchema.pre("save", function (next) {
    // this is the document being saved (the team data)
    const user = this;
    if (!user.isModified("password")) {
        return next();
    }
    bcrypt.genSalt(10, (error, salt) => {
        if (error) {
            return next(error);
        }
        bcrypt.hash(user.password, salt, (error, hash) => {
            if (error) {
                return next(error);
            }
            user.password = hash;
            next();
        });
    });
});

const User = mongoose.model<IUser, IUserStatics>("users", userSchema);

export default User;