import AWS from "aws-sdk"

if (process.env.NODE_ENV === 'dev') {
    const credentials = new AWS.SharedIniFileCredentials()
    AWS.config.credentials = credentials
}

AWS.config.update({
    region: 'us-east-2',
})

// notificaciones

const sns = new AWS.SNS()

const SNS_TOPIC_ARN = 'arn:aws:sns:us-east-2:328975487234:nuevos-productos'

export const notify = ({ subject, message }) => {
    const msg = {
        Subject: subject,
        Message: message,
        TopicArn: SNS_TOPIC_ARN,
    }
    return sns.publish(msg).promise()
}

// dynamoDb

exports.dynamodb = new AWS.DynamoDB.DocumentClient()
