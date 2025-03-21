import { Client, Account, Databases, Storage, Teams } from 'appwrite';

// Initialize the Appwrite client
const client = new Client();

// Use environment variables for configuration
client
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT as string)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID as string);

// Initialize Appwrite services
export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const teams = new Teams(client);

// We'll export the client for direct use when needed
export { client };

// Database and collection IDs from env variables
export const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string;
export const PATIENTS_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_PATIENTS_COLLECTION_ID as string;
export const APPOINTMENTS_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_APPOINTMENTS_COLLECTION_ID as string;
export const PRESCRIPTIONS_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_PRESCRIPTIONS_COLLECTION_ID as string;

// Helper function to check if user is logged in
export async function isLoggedIn(): Promise<boolean> {
  try {
    const currentAccount = await account.get();
    return Boolean(currentAccount?.$id);
  } catch {
    return false;
  }
}