// Filename: products.ts
export async function handler() {
  return {
    body: JSON.stringify({message: 'Hello from Lambda 🎉'}),
    statusCode: 200,
  };
}
