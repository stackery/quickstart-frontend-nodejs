const AWS = require('aws-sdk');
const uuid = require('node-uuid');

exports.handler = async event => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();
  const newEntry = JSON.parse(event.body);
  const params = {
    TableName: process.env.TABLE_NAME, // get the table name from the automatically populated environment variables
    Item: {
      id: uuid.v1(),
      content: newEntry.content,
      timestamp: newEntry.timestamp
    },
    ConditionExpression: 'attribute_not_exists(id)', // do not overwrite existing entries
    ReturnConsumedCapacity: 'TOTAL'
  };

  try {
    // Write a new item to the Item table
    await dynamodb.put(params).promise();
    console.log(`Writing item ${params.Item.id} to table ${process.env.TABLE_NAME}.`);
  } catch (error) {
    console.log(`Error writing to table ${process.env.TABLE_NAME}. Make sure this function is running in the same environment as the table.`);
    throw new Error(error); // stop execution if dynamodb is not available
  }

  // Return a 200 response if no errors
  const response = {
    statusCode: "200",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    },
    body: "Success",
    isBase64Encoded: false
  }
  return response;
};
