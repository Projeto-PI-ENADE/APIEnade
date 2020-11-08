import * as mongoose from 'mongoose';


const uri: string = "mongodb+srv://enade:enade123@cluster0.5f6xz.mongodb.net/dbenade?retryWrites=true&w=majority";

mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true }, (error: any) => {
    if (error) {
        throw new Error(error);
    } else {
        console.log("MongoDb connected");
    }
})

export default mongoose;
