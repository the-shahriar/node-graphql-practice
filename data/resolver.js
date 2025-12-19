import { Widgets } from "./db"


const resolvers = {
    getProduct: async ({ id }) => {
        try {
            return await Widgets.findById(id);
        } catch (error) {
            throw new Error(error);
        }
    },
    createProduct: async ({ input }) => {
        try {
            return await Widgets.create(input);
        } catch (error) {
            throw new Error(error)
        }
    }
}

export default resolvers