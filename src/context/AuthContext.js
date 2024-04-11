import { useContext,createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signInWithRedirect, signOut } from "firebase/auth";
import { auth } from "../firebase";

const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    const [user, setUser] = useState({});
    const googleSignIn = () =>{
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth,provider)
    }
    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth,(currentUser)=>{
            setUser(currentUser);
        })
        return ()=>{
            unsubscribe();
        }
    },[])
    return <AuthContext.Provider value ={{googleSignIn, user}}>{children}</AuthContext.Provider>

}

export const UserAuth = () => {
    return useContext(AuthContext)
}