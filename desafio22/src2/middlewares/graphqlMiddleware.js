import { buildSchema } from 'graphql'
import { graphqlHTTP } from 'express-graphql'


import {
    getProductos,
    getProducto,
    createProducto,
    updateProducto,
    deleteProducto,
  } from '../controllers/productosGraphqlController.js'
  
  const schema = buildSchema(`
    input ProductoInput {
      name: String
      stock: Int
      precio: Int
    }

    type Producto {
      id: ID!
      name: String!
      stock: Int!
      precio: Int!
    }
    
    type Query {
      getProducto(id: ID!): Producto
      getProductos(campo: String, valor: String): [Producto]
    }
    
    type Mutation {
      createProducto(datos: ProductoInput!): Producto
      updateProducto(id: ID!, datos: ProductoInput!): Producto
      deleteProducto(id: ID!): Producto
    }
  `)
  
  export const graphqlMiddleware = graphqlHTTP({
    schema,
    rootValue: {
        getProductos,
        getProducto,
        createProducto,
        updateProducto,
        deleteProducto,
    },
    graphiql: true,
  })