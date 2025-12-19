import mongoose from "mongoose";

async function connectMongo() {
    try {

        await mongoose.connect('mongodb://localhost/widgets');
        console.log('MongoDB connected successfully');

    } catch (error) {
        console.error('Error connecting MongoDB', error)
    }
}

connectMongo();

const widgetSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    soldout: Boolean,
    inventory: Number,
    stores: [
        {
            store: { type: String, }
        }
    ]
}, { timestamps: true });

const Widgets = mongoose.model('widgets', widgetSchema);

export { Widgets };

