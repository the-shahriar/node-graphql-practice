import mongoose from "mongoose";
import { Sequelize, DataTypes } from "sequelize";
import _ from "lodash";
import casual from "casual";

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

// Connection of SQLite3
const sequelize = new Sequelize('sqlite::memory:');
const Categories = sequelize.define('categories', {
    category: DataTypes.STRING,
    description: DataTypes.STRING
})


async function syncAndSeedCategories() {
    try {
        await sequelize.sync({ force: true });
        console.log('SQLite connection established and Categories model synced');


        // seed categories
        await Promise.all(_.times(5, () => {
            return Categories.create({
                category: casual.word,
                description: casual.sentence
            })
        }))

        console.log('Categories seeded...')

    } catch (error) {
        console.error('Error syncing Categories table', error);
    }
}

syncAndSeedCategories();

export { Widgets, Categories };

