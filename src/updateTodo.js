const { v4 } = require("uuid");
const AWS = require("aws-sdk");

const updateTodo = async (event) => {

  // lambda should be given permission first to access dynamodb and this 
  // can be done on serverless.yml iamRoleStatements
  const dynamodb = new AWS.DynamoDB.DocumentClient();

  const { completed } = JSON.parse(event.body);
  const { id } = event.pathParameters;

  await dynamodb.update({
    TableName: "TodoTable", 
    Key: { id }, 
    UpdateExpression: 'set completed = :completed', 
    ExpressionAttributeValues: { 
        ':completed': completed
    }, 
    ReturnValues: "ALL_NEW"
  }).promise();

  return {
    statusCode: 200,
    body: JSON.stringify({
        msg: "Todo updated"
    }),
  };
};

// handler is the hello function 
module.exports = { 
  handler: updateTodo
}
