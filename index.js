import express from "express";
import { graphqlHTTP } from "express-graphql";
import schema from "./data/schema";

const app = express();
const PORT = 8080

app.get('/', (req, res)=> {
    res.send('GraphQL is awesome')
})


const root = { product: () => {
    return {
        "id": 202592303777374,
        "name": 'Baby Soap',
        "description": 'This is a baby product',
        "price": 100.99,
        "soldout": false
    }
} };

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
}))

app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}/graphql`));