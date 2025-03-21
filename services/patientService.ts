import { ID, Query } from 'appwrite';
import { databases, DATABASE_ID, PATIENTS_COLLECTION_ID } from '../lib/appwrite';

export interface Patient {
  $id?: string;
  name: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  address: string;
  medicalHistory?: string;
  userId: string;
}

export const patientService = {
  // Get all patients (with optional limit)
  async getPatients(limit: number = 50) {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        PATIENTS_COLLECTION_ID,
        [Query.limit(limit), Query.orderDesc('$createdAt')]
      );
      return response.documents as unknown as Patient[];
    } catch (error) {
      console.error('Error fetching patients:', error);
      throw error;
    }
  },

  // Get a single patient by ID
  async getPatient(id: string) {
    try {
      const response = await databases.getDocument(
        DATABASE_ID,
        PATIENTS_COLLECTION_ID,
        id
      );
      return response as unknown as Patient;
    } catch (error) {
      console.error(`Error fetching patient with ID ${id}:`, error);
      throw error;
    }
  },

  // Create a new patient
  async createPatient(patientData: Patient) {
    try {
      const response = await databases.createDocument(
        DATABASE_ID,
        PATIENTS_COLLECTION_ID,
        ID.unique(),
        patientData
      );
      return response as unknown as Patient;
    } catch (error) {
      console.error('Error creating patient:', error);
      throw error;
    }
  },

  // Update an existing patient
  async updatePatient(id: string, patientData: Partial<Patient>) {
    try {
      const response = await databases.updateDocument(
        DATABASE_ID,
        PATIENTS_COLLECTION_ID,
        id,
        patientData
      );
      return response as unknown as Patient;
    } catch (error) {
      console.error(`Error updating patient with ID ${id}:`, error);
      throw error;
    }
  },

  // Delete a patient
  async deletePatient(id: string) {
    try {
      await databases.deleteDocument(
        DATABASE_ID,
        PATIENTS_COLLECTION_ID,
        id
      );
      return true;
    } catch (error) {
      console.error(`Error deleting patient with ID ${id}:`, error);
      throw error;
    }
  },

  // Search for patients
  async searchPatients(query: string, limit: number = 10) {
    try {
      // Search in multiple fields
      const response = await databases.listDocuments(
        DATABASE_ID,
        PATIENTS_COLLECTION_ID,
        [
          Query.limit(limit),
          Query.or([
            Query.search('name', query),
            Query.search('email', query),
            Query.search('phone', query)
          ])
        ]
      );
      return response.documents as unknown as Patient[];
    } catch (error) {
      console.error(`Error searching patients with query "${query}":`, error);
      throw error;
    }
  }
};