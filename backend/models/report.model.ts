import mongoose, {Model} from "mongoose";

type REPORTED_ENTITY_TYPE = "RECIPE" | "REVIEW" ;

interface IReport{
    _id : mongoose.Types.ObjectId,
    userId: mongoose.Types.ObjectId,
    reportedUserId: mongoose.Types.ObjectId,
    reportedEntityId: mongoose.Types.ObjectId,
    reportedEntityType: REPORTED_ENTITY_TYPE,
    reason: string,
}

interface IReportMethods {
    //Add non-static methods
}

interface IReportStatics extends Model<IReport, {}, IReportMethods> {
    //Static methods
}

const reportSchema = new mongoose.Schema<IReport, IReportStatics, IReportMethods>({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    reportedUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    reportedEntityId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    reportedEntityType: {
        type: String,
        enum: ["RECIPE", "REVIEW"],
        required: true
    },
    reason: {
        type: String,
        required: true
    }
});

const Report = mongoose.model<IReport, IReportStatics>("reports", reportSchema);

export default Report;