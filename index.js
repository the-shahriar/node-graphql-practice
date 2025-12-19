import express from "express";
import { graphqlHTTP } from "express-graphql";
import schema from "./data/schema";

const app = express();
const PORT = 8080

app.get('/', (req, res)=> {
    res.send('GraphQL is awesome')
})

class Product {
    constructor (id, { name, description, price, soldout, stores}) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.soldout = soldout;
        this.stores = stores;
    }
}


const productDatabase = {};


const root = {
    product: () => {
        return {
            "id": 202592303777374,
            "name": 'Baby Soap',
            "description": 'This is a baby product',
            "price": 100.99,
            "soldout": false,
            "stores": [
                {
                    "id": 1,
                    "store": "Beverly Hills Market"
                }
            ]
        }
    },
    createProduct: ({input}) => {
        let id = require("crypto").randomBytes(10).toString('hex');
        productDatabase[id] = input;
        return new Product(id, input);
    }
};

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
}))

app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}/graphql`));