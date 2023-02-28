const AWS = require('aws-sdk')

const credentials = new AWS.SharedIniFileCredentials()
AWS.config.credentials = credentials
AWS.config.update({ region: 'us-east-2' })

const SNS_TOPIC_ARN = 'arn:aws:sns:us-east-2:328975487234:nuevos-productos'

const sns = new AWS.SNS()

function publicar(asunto, mensaje) {
    const msg = {
        Subject: asunto,
        Message: mensaje,
        TopicArn: SNS_TOPIC_ARN,
    }
    return sns.publish(msg).promise()
}

async function testSnsAws() {
    const result = await publicar('nuevo producto!', JSON.stringify({
        name: 'alforja',
        price: 55000,
        description: 'rojo',
        thumbnail: 'webfoto',
        productId: ''
    }, null, 2))
    console.log(result)
}

testSnsAws()