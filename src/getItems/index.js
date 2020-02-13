const AWS = require('aws-sdk');

exports.handler = async () => {
  // Use dynamodb to get items from the Item table
  const dynamodb = new AWS.DynamoDB.DocumentClient();
  const params = {
    TableName: process.env.TABLE_NAME
  };

  const allItems = [];

  try {
    console.log(`Getting data from table ${process.env.TABLE_NAME}.`);
    const items = await dynamodb.scan(params).promise(); // get items from DynamoDB
    items.Items.forEach((item) => allItems.push(item)); // put contents in an array for easier parsing
  } catch (error) {
    console.log(`Error getting data from table ${process.env.TABLE_NAME}. Make sure this function is running in the same environment as the table.`);
    throw new Error(error); // stop execution if data from dynamodb not available
  }

  const response = {
    statusCode: '200',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify(allItems),
    isBase64Encoded: false
  };
  return response;
};
