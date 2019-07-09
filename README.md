# Deploy a Frontend for the Quickstart

This is the repository for the [Quickstart Frontend Tutorial](https://docs.stackery.io/docs/tutorials/quickstart-frontend/) from Stackery.

This tutorial This tutorial will guide you through the process of deploying a simple frontend for the Backend API app created in the Quickstart.

> If you have not completed the Quickstart, do that first! This tutorial builds on the backend API that was created in the [Quickstart Tutorial](https://docs.stackery.io/docs/quickstart/quickstart-nodejs/).

## Deploy this to your AWS account

You can deploy this application to your own AWS account using the following two Stackery CLI commands:

`stackery create` will initialize a new repo in your GitHub account, initializing it with the contents of the referenced template repository.

```
stackery create --stack-name 'quickstart-frontend-nodejs' \
--git-provider 'github' \
--template-git-url 'https://github.com/stackery/quickstart-frontend-nodejs'
```

`stackery deploy` will deploy the newly created stack into your AWS account.

```
stackery deploy --stack-name 'quickstart-frontend-nodejs' \
--env-name 'development' \
--git-ref 'master'
```
