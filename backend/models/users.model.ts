import mongoose, {Model} from "mongoose";
import bcrypt from "bcrypt";

type USER_TYPE = 'ADMIN' | 'USER';

interface IUser{
    _id : mongoose.Types.ObjectId,
    name: string,
    username: string,
    password: string,
    type: USER_TYPE
}

interface IUserMethods {
    //Add non-static methods
    comparePassword(password : string | Buffer) : boolean;
}

interface IUserStatics extends Model<IUser, {}, IUserMethods> {
    //Static methods
}

const userSchema = new mongoose.Schema<IUser, IUserStatics, IUserMethods>({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        minlength: 8,
        required: true
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