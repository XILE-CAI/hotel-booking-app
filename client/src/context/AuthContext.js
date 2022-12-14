import { createContext, useEffect } from "react";
import { useReducer } from "react";

const INITIAL_STATE = {
    user:JSON.parse(localStorage.getItem("user")) || null,
    loading: false,
    error:null
};

export const AuthContext = createContext(INITIAL_STATE)

const AuthReducer = (state,action) => {
    if(action.type === "LOGIN_START"){
        return {
            user:null,
            loading: true,
            error:null
        }
    }
    else if(action.type === "LOGIN_SUCCESS"){
        return {
            user:action.payload,
            loading: false,
            error:null
        }
    }else if(action.type === "LOGIN_FAILURE"){
        return {
            user:null,
            loading: false,
            error:action.payload
        }
    }else if(action.type === "LOGOUT"){
        return {
            user:null,
            loading: false,
            error:null,
        }
    }else {
        return state;
    }
}

export const AuthContextProvider = ({ children }) => {
    const [state,dispatch] = useReducer(AuthReducer, INITIAL_STATE)

    useEffect(()=>{
        localStorage.setItem("user",JSON.stringify(state.user))
    },[state.user])

    return (
        <AuthContext.Provider value = {
            {
                user:state.user,
                loading:state.loading,
                error:state.error,
                dispatch
            }
        }>
            {children}    
        </AuthContext.Provider>
    )
}