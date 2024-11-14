import { model, Schema, Document, Types } from "mongoose";

interface IGraph extends Document {
    user_id: Types.ObjectId;
    directed: boolean;
    weighted: boolean;
}

const graphSchema = new Schema<IGraph>({

    user_id: {
        type: Schema.ObjectId,
        ref: "Users",
        required: true
    },
    directed: {
        type: Boolean,
        required: true,
        default: false,
    },
    weighted: {
        type: Boolean,
        required: true,
        default: false
    }
}
)
const Graphs = model<IGraph>('Graphs', graphSchema)

export default Graphs;