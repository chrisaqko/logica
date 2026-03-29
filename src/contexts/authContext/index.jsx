import React, { useContext, useState, useEffect } from "react";
import { auth } from "../../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { getDocument } from "../../firebase/firestore";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [isEmailUser, setIsEmailUser] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [loadingUserData, setLoadingUserData] = useState(true); 


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (userData) => {
      console.log("👤 onAuthStateChanged → userData:", userData);
      setCurrentUser(userData);
      if (userData) {
        try {
          setLoadingUserData(true); 
          console.log("📥 Inicializando usuario…");
          await initializeUser(userData);
        } catch (error) {
          console.error("Error al obtener userData:", error);
          console.error("❌ Error al obtener userData:", error);
          setUserData(null);
        } finally {
          setLoadingUserData(false); 
        }
      } else {
        console.log("👋 Usuario deslogueado");
        setUserData(null);
        setUserLoggedIn(false);
        setLoadingUserData(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  async function initializeUser(userData) {
  if (userData) {
    try {
      const userDoc = await getDocument("Usuarios", userData.uid);

      if (userDoc.success) {
        const fullUser = {
          uid: userData.uid,
          email: userData.email,
          ...userDoc.data,
        };

        setCurrentUser(fullUser);
        setUserData(userDoc.data);

        // Verificamos si es login por email/contraseña
        const isEmail = userData.providerData.some(
          (provider) => provider.providerId === "password"
        );
        setIsEmailUser(isEmail);
        setUserLoggedIn(true);
      } else {
        // Si no existe documento en Firestore
        console.warn("Usuario no tiene documento en Firestore");
        setCurrentUser(userData); // Solo los datos de auth
        setUserLoggedIn(true);
      }
    } catch (error) {
      console.error("Error obteniendo datos del usuario:", error.message);
      setCurrentUser(userData);
      setUserLoggedIn(true);
    }
  } else {
    setCurrentUser(null);
    setUserLoggedIn(false);
  }
}


const value = {
  userLoggedIn,
  isEmailUser,
  currentUser,
  userData,
  loadingUserData,
  setCurrentUser,
};

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
