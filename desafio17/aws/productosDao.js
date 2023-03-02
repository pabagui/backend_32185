import { dynamodb } from './aws.js'
// import './aws.js'
const TABLE_NAME = 'product-inventory'


export const create = async newProduct => {
    const params = {
        TableName: TABLE_NAME,
        Item: newProduct,
    }
    await dynamodb.put(params).promise()
    // await AWS.DynamoDB.put(params).promise()
    return newProduct
}

export const read = async productId => {
    if (productId) {
        const params = {
            TableName: TABLE_NAME,
            Key: { productId },
        }
        const { Item } = await dynamodb.get(params).promise()
        // const { Item } = await AWS.DynamoDB.get(params).promise()
        return Item
    } else {
        const params = {
            TableName: TABLE_NAME,
        }
        return await scanDynamoRecords(params)
    }
}

export const update = async productoModificado => {
    const params = {
        TableName: TABLE_NAME,
        Item: productoModificado,
    }
    await dynamodb.put(params).promise()
    // await AWS.DynamoDB.put(params).promise()
    return productoModificado
}

export const deleteProd =  productId => {
    const params = {
        TableName: TABLE_NAME,
        Key: { productId },
        ReturnValues: 'ALL_OLD',
    }
    return dynamodb.delete(params).promise()
    // return AWS.DynamoDB.delete(params).promise()
}

async function scanDynamoRecords(scanParams) {
    try {
        let dynamoData = await dynamodb.scan(scanParams).promise()
        // let dynamoData = await AWS.DynamoDB.scan(scanParams).promise()
        const items = dynamoData.Items ?? []
        while (dynamoData.LastEvaluatedKey) {
            scanParams.ExclusiveStartKey = dynamoData.LastEvaluatedKey
            dynamoData = await dynamodb.scan(scanParams).promise()
            // dynamoData = await AWS.DynamoDB.scan(scanParams).promise()
            items.push(...dynamoData.Items ?? [])
        }
        return items
    } catch (error) {
        throw new Error(error)
    }
}