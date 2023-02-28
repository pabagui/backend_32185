const AWS = require('aws-sdk')
const { randomUUID } = require('crypto')

const credentials = new AWS.SharedIniFileCredentials()
AWS.config.credentials = credentials
AWS.config.update({ region: 'us-east-1' })

const TABLE_NAME = 'product-inventory'

const dynamodb = new AWS.DynamoDB.DocumentClient()

async function crearProducto(newProduct) {
    newProduct.productId = randomUUID()
    const params = {
        TableName: TABLE_NAME,
        Item: newProduct,
    }
    await dynamodb.put(params).promise()
    return newProduct
}

async function testAwsDynamo() {
    const result = await crearProducto({
        name: 'alforja',
        price: 55000,
        description: 'rojo',
        thumbnail: 'webfoto'
    })
    console.log(result)
}

testAwsDynamo()