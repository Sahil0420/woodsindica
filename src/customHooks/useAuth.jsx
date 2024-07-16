import { useContext, createContext, useState, useEffect } from 'react';
import { onAuthStateChanged, getIdTokenResult, getAuth } from 'firebase/auth';
import { auth } from '../firebase.config';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setLoading(true);
      if (user) {
        const tokenResult = await getIdTokenResult(user);
        setCurrentUser(user);
        setIsAdmin(!!tokenResult.claims.admin);

        // Force token refr
        const authInstance = getAuth();
        authInstance.currentUser.getIdToken(true).then((idToken) => {
          console.log('ID Token refreshed:', idToken);
        });

      } else {
        setCurrentUser(null);
        setIsAdmin(false);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, isAdmin }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;
