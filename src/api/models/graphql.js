const { buildSchema } = require('graphql')

const schemaGraphQL = buildSchema(`
    type Product {
        _id: String
        name: String
        description: String
        code: String
        timestamp: String
        stock: Int 
        url: String
        price: Int
    },
    type Query {
        getAll: [Product],
        getById(id: String!): Product
    },
    type Mutation {
        addProduct(name: String!, description: String!,code: String!,timestamp: String!,url: String!,stock: Int!, price: Int!): Product,
        deleteProduct(id: String!): Product,
        updateProduct(id: String! name: String!, description: String!,code: String!,timestamp: String!,url: String!,stock: Int!, price: Int!): Product,
    }
`)

module.exports = { schemaGraphQL }
