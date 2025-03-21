import { account } from '../lib/appwrite';
import { AppwriteException, ID } from 'appwrite';

export interface UserCredentials {
  email: string;
  password: string;
}

export interface UserDetails {
  email: string;
  password: string;
  name: string;
}

export const authService = {
  
    async register({ email, password, name }: UserDetails) {
        try {
          // Generate a unique ID
          const rawId = ID.unique();
          
          // Clean the ID to meet Appwrite requirements
          let validUserId = rawId.replace(/[^a-zA-Z0-9\-_\.]/g, '');
          
          // Ensure it doesn't start with a special character
          if (/^[_\-\.]/.test(validUserId)) {
            validUserId = 'u' + validUserId;
          }
          
          // Limit to 36 characters
          validUserId = validUserId.slice(0, 36);
          
          const response = await account.create(
            validUserId,
            email,
            password,
            name
          );
          
          if (response.$id) {
            return await this.login({ email, password });
          }
          
          return response;
        } catch (error) {
          console.error('Error during registration:', error);
          throw error;
        }
      },

  // Login user
  async login({ email, password }: UserCredentials) {
    try {
      // Standard login attempt
      return await account.createEmailPasswordSession(email, password);
    } catch (error) {
      console.error('Error during login:', error);
      throw error;
    }
  },

  // Logout current user
  async logout() {
    try {
      return await account.deleteSession('current');
    } catch (error) {
      console.error('Error during logout:', error);
      throw error;
    }
  },

  // Get current user
  async getCurrentUser() {
    try {
      return await account.get();
    } catch (error) {
      if (error instanceof AppwriteException && error.message.includes('missing scope')) {
        console.log('User not authenticated');
        return null;
      }
      console.error('Error fetching current user:', error);
      return null;
    }
  },

  // Check if user is logged in
  async isLoggedIn() {
    try {
      const currentAccount = await account.get();
      return Boolean(currentAccount?.$id);
    } catch {
      return false;
    }
  },

  // Send password recovery email
  async recoverPassword(email: string) {
    try {
      return await account.createRecovery(
        email,
        `${window.location.origin}/reset-password`
      );
    } catch (error) {
      console.error('Error sending recovery email:', error);
      throw error;
    }
  },

  // Reset password
  async resetPassword(userId: string, secret: string, password: string, passwordAgain: string) {
    if (password !== passwordAgain) {
      throw new Error('Passwords do not match');
    }
    
    try {
      return await account.updateRecovery(userId, secret, password);
    } catch (error) {
      console.error('Error resetting password:', error);
      throw error;
    }
  }
};