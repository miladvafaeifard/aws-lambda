import * as path from 'path'
import { Duration, Stack, StackProps } from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda'
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
  }
}
