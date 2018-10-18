# Merchant backend demo

Merchants in order to integrate [Payment Highway](https://www.paymenthighway.io/) need to implement own backend functions.

Here a example of backend functions for multiple projects using AWS lambdas.

For the project [paymenthighway-applepay-web-demo](https://github.com/PaymentHighway/paymenthighway-applepay-web-demo) there are 2 lambdas implemented:
1. **session.js** : Request a valid Apple Pay Session from the Apple Pay server.
2. **applepay.js** : Perfom the actual payment(Debit) via Payment Highway API.

If you want to integrate Payment Highway in a mobile app using [iOS](https://github.com/PaymentHighway/paymenthighway-ios-framework) or [Android](https://github.com/PaymentHighway/paymenthighway-android-sdk) SDKs there are 2 lambdas implemented:
1. **transaction**: Request a valid transaction Id from Payment Highway
2. **Tokenize**: Get the tokenized card token for the given transaction id.

### Requirements

- [Install the Serverless Framework](https://serverless.com/framework/docs/providers/aws/guide/installation/)
- [Configure your AWS CLI](https://serverless.com/framework/docs/providers/aws/guide/credentials/)


### Usage

To run unit tests on your local

``` bash
$ npm test
```

To run a function on your local

``` bash
$ serverless invoke local --function hello
```

To simulate API Gateway locally using [serverless-offline](https://github.com/dherault/serverless-offline)

``` bash
$ serverless offline start
```

We use Jest to run our tests. You can read more about setting up your tests [here](https://facebook.github.io/jest/docs/en/getting-started.html#content).

Deploy your project

``` bash
$ serverless deploy
```

Deploy a single function

``` bash
$ serverless deploy function --function hello
```