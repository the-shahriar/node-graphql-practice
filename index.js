import express from "express";
import { graphqlHTTP } from "express-graphql";
import schema from "./data/schema";
import resolvers from "./data/resolver";

const app = express();
const PORT = 8080

app.get('/', (req, res)=> {
    res.send('GraphQL is awesome')
})

const root = resolvers

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
}))

app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}/graphql`));