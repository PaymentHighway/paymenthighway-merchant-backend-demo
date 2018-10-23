# Merchant backend demo

Merchants in order to integrate [Payment Highway](https://www.paymenthighway.io/) need to implement own backend functions.

Here a example of backend functions for multiple projects using AWS lambdas.

For the project [paymenthighway-applepay-web-demo](https://github.com/PaymentHighway/paymenthighway-applepay-web-demo) there are 2 lambdas implemented:
1. **session** : Request a valid Apple Pay Session from the Apple Pay server.
2. **applepay** : Perfom the actual payment(Debit) via Payment Highway API.

If you want to integrate Payment Highway in a mobile app using [iOS](https://github.com/PaymentHighway/paymenthighway-ios-framework) or [Android](https://github.com/PaymentHighway/paymenthighway-android-sdk) SDKs there are 2 lambdas implemented:
1. **transaction**: Request a valid transaction Id from Payment Highway
2. **tokenizzation**: Get the tokenized card token for the given transaction id.

### Requirements

- [Install the Serverless Framework](https://serverless.com/framework/docs/providers/aws/guide/installation/)
- [Configure your AWS CLI](https://serverless.com/framework/docs/providers/aws/guide/credentials/)


## Lambdas configuration

### Session Lambda

Add the **env.session.yml** file to the root of the project with the following configuration:

```yaml
staging:
  MERCHANT_IDENTITY_CERT: ${file(path/to/your.pem)} 
  MERCHANT_IDENTITY_KEY: ${file(path/to/your/private.key)}
````

### Applepay Lambda

Add the **env.applepay.yml** file to the root of the project with the following configuration:

```yaml
staging:
  PH_SERVICE_URL: 'https://your.paymenthighway.service.url'
  PH_KEY: 'your payment highway key'
  PH_SECRET: 'your payment highway secret'
  PH_ACCOUNT: 'your payment highway account'
  PH_MERCHANT: 'your merchant id'
```

### Transaction and tokenizzation Lambdas

Add the **env.sandbox.yml** file to the root of the project with the [develpment sanbox configuration](https://dev.paymenthighway.io/?_ga=2.169221289.929990046.1539672622-105177872.1528783519#development-sandbox):

```yaml
staging:
  PH_SERVICE_URL: 'https://v1-hub-staging.sph-test-solinor.com'
  PH_KEY: 'testKey'
  PH_SECRET: 'testSecret'
  PH_ACCOUNT: 'test'
  PH_MERCHANT: 'test_merchantId'
```

### Usage

To run a function on your local

``` bash
$ serverless invoke local --function hello
```

To simulate API Gateway locally using [serverless-offline](https://github.com/dherault/serverless-offline)

``` bash
$ serverless offline start
```

Deploy your project

``` bash
$ serverless deploy
```

Deploy a single function

``` bash
$ serverless deploy function --function <name of the function>
```