import { firestore } from "./firebase";

import {
  collection,
  getDocs,
  doc,
  getDoc,
  setDoc,
  query,
  where,
  updateDoc,
  deleteDoc,
  addDoc
} from "firebase/firestore";

export const getDocument = async (collectionName, documentKey) => {
  try {
    const documentRef = doc(firestore, collectionName, documentKey);
    const documentSnapshot = await getDoc(documentRef);

    if (documentSnapshot.exists()) {
      return { success: true, data: documentSnapshot.data() };
    } else {
      return { success: false, errorMessage: "Documento no encontrado" };
    }
  } catch (error) {
    console.error("Error obteniendo documento:", error.message);
    return { success: false, errorMessage: error.message };
  }
};

export const getCollection = async (collectionName) => {
  try {
    const documentsSnapshot = await getDocs(
      collection(firestore, collectionName)
    );
    const docs = documentsSnapshot.docs.map((d) => d.data());
    return { success: true, data: docs };
  } catch (error) {
    return { success: false, errorMessage: error.errorMessage };
  }
};

export const getWhereFieldEqualsTo = async (
  collectionName,
  field,
  equalsTo
) => {
  try {
    const querySnapshot = await getDocs(
      query(collection(firestore, collectionName), where(field, "==", equalsTo))
    );
    const values = querySnapshot.docs.map((d) => d.data());
    return { success: true, values };
  } catch (error) {
    return { success: false, error };
  }
};

export const updateDocument = async (collection, documentKey, field, value) => {
  try {
    const docRef = doc(firestore, collection, documentKey);
    await updateDoc(docRef, { [field]: value });
    console.log("success updating document ");
    return { success: true };
  } catch (error) {
    console.log("error updating document: " + error.message);
    return { success: false, errorMessage: error.message };
  }
};

export const updateDocumentById = async (collection, documentId, fieldsToUpdate) => {
  try {
    const docRef = doc(firestore, collection, documentId);
    await updateDoc(docRef, fieldsToUpdate);
    console.log("success updating document");
    return { success: true };
  } catch (error) {
    console.log("error updating document: " + error.message);
    return { success: false, errorMessage: error.message };
  }
};

export const setDocument = async (collectionName, documentKey, data) => {
  try {
    const documentRef = doc(firestore, collectionName, documentKey);
    await setDoc(documentRef, data);
    return { success: true };
  } catch (error) {
    console.log("error on set doc " + error.message);
    return { success: false, errorMessage: error.message };
  }
};

export const deleteDocument = async (collectionName, documentKey) => {
  try {
    const documentRef = doc(firestore, collectionName, documentKey);
    await deleteDoc(documentRef);
    console.log("Document successfully deleted!");
    return { success: true };
  } catch (error) {
    console.error("Error deleting document: ", error.message);
    return { success: false, errorMessage: error.message };
  }
};

export const setDocumentWithAutoID = async (collectionName, data) => {
  try {
    await addDoc(collection(firestore, collectionName), data);
    return { success: true };
  } catch (error) {
    console.error("Error al guardar documento:", error);
    return { success: false, error };
  }
};
