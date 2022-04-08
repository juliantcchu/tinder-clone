import { useMemo, useState, useContext, createContext, useEffect} from 'react';
import { View } from 'react-native';
import * as Google from 'expo-google-app-auth'; //'expo-auth-session/providers/google';
import { GoogleAuthProvider, onAuthStateChanged, signInWithCredential, signOut } from '@firebase/auth';
import { auth } from '../firebase'


const AuthContext = createContext({});

const config = {
    // use env
    iosClientId: "769985952565-nndicf6ob3lenla8qjskqb7bp0i666fj.apps.googleusercontent.com",
    androidClientId: "769985952565-cpkatr7hpkmftlesi3uejvohcce09a55.apps.googleusercontent.com",
    scopes: ["profile", "email"], 
    permission: ["public_profile", "email", "gender", "location"],
}

export const AuthProvider = ({ children }) => {

    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);
    const [loadingInitial, setLoadingInitial] = useState(true);
    const [loading, setLoading] = useState(false);

    useEffect(() => onAuthStateChanged(auth, (user)=>{
            if (user){
                // if logged in
                setUser(user);
            }else{
                // if not logged in
                setUser(null);
            }
            setLoadingInitial(false);
        }), []);

    const signInWithGoogle = async () => {
        setLoading(true);
        await Google.logInAsync(config).then(async (logInResult) => {
            if (logInResult.type === 'success'){
                // login
                const { idToken, accessToken } = logInResult;
                const credential = GoogleAuthProvider.credential(idToken, accessToken);
                await signInWithCredential(auth, credential);
            }

            return Promise.reject();

        })
        .catch((err)=>setError(err))
        .finally(()=>setLoading(false));
    }

    const logout = () => {
        setLoading(true);
        signOut(auth).catch(err=>setError(err)).finally(()=>setLoading(false));
    }

    const memoedValue = useMemo(()=>({
        user,
        loading,
        error,
        signInWithGoogle, 
        logout,
    }), [user, loading, error])
  return (
    <AuthContext.Provider 
        value={memoedValue}
    >
      {!loadingInitial && children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
    return useContext(AuthContext);
}