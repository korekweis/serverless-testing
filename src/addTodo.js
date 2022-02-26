const { v4 } = require("uuid");
const AWS = require("aws-sdk");

const addTodo = async (event) => {

  // lambda should be given permission first to access dynamodb and this 
  // can be done on serverless.yml iamRoleStatements
  const dynamodb = new AWS.DynamoDB.DocumentClient();

  const { todo } = JSON.parse(event.body);
  const createdAt = new Date();
  const id = v4(); 

  console.log("This is an id ", id);

  const newTodo = {
    id, 
    todo, 
    createdAt,
    completed: false
  }

  await dynamodb.put({
    TableName: "TodoTable", 
    Item: newTodo
  }).promise();

  return {
    statusCode: 200,
    body: JSON.stringify(
      newTodo
    ),
  };
};

// handler is the hello function 
module.exports = { 
  handler: addTodo
}
