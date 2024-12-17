import * as path from 'path'
import { Duration, Stack, StackProps } from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda'
import * as apigateway from "aws-cdk-lib/aws-apigateway";
import { Construct } from 'constructs'

export class AwsLambdaStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const productsFunction = new lambda.Function(this, 'productsFunction', {
      runtime: lambda.Runtime.NODEJS_22_X,
      memorySize: 1024,
      timeout: Duration.seconds(5),
      handler: 'products.handler',
      code: lambda.Code.fromAsset(path.join(__dirname, './api/products'))
    })

    const api = new apigateway.RestApi(this, "my-api", {
      restApiName: "My API Gateway",
      description: "This API serves the Lambda functions."
    })

    const productsFunctionIntegration = new apigateway.LambdaIntegration(productsFunction, {
      integrationResponses: [
        {
          statusCode: '200',
          responseParameters: {
            'method.response.header.Access-Control-Allow-Origin': "'https://xxxxx.cloudfront.net'"
          }
        }
      ],
      proxy: false
    })

    const productsResource = api.root.addResource('products')
    productsResource.addMethod('GET', productsFunctionIntegration, {
      methodResponses: [
        { 
          statusCode: '200', 
          responseParameters: { 'method.response.header.Access-Control-Allow-Origin': true } // Allow all origins 
        }]
    })

    productsResource.addCorsPreflight({
      allowOrigins: ['https://xxxxx.cloudfront.net'],
      allowMethods: ['GET'],
    });

  }
}
