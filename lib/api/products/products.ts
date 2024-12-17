// Filename: products.ts
import { Event } from 'aws-cdk-lib/aws-stepfunctions-tasks';
import { products } from './mockData'

export async function handler(event: Event) {
  console.log('Event received:  ', JSON.stringify(event))

  return products
}
