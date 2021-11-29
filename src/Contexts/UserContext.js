import React, { useState, useEffect, useMemo, useCallback } from "react";
import userService from "../Services/User.Services";

const UserContext = React.createContext();
const TOKEN_KEY = "token";

export const UserProvider = (props) => {
    const [token, setToken] = useState(undefined);
    const [user, setUser] = useState(undefined);

    //Se crea el token para el usuario
    useEffect(() => {
        const verifyTokenAsync = async () => {
            const lsToken = getToken();

            if(lsToken) {
                const { username, role } = await userService.verifyToken(lsToken);
                if(username && role) {
                    setUser({ username: username, role: role });
                    setTokenAll(lsToken);
                }
            }
        }

        verifyTokenAsync();
    }, [token])

    //Se guarda el token en el localStorage

    const setTokenAll = (token) => {
        localStorage.setItem(TOKEN_KEY, token);
        setToken(token);
    }

    //Hace verificacion para el usuario del token: el status del login empieza como falso, pero si ya existe un token
    //para el usuario, este se logea automaticamente

    const login = useCallback((username, password)=> {
        const loginAsync = async () => {
            let status = false;
            try {
                const { token: tokenRes } = await userService.login(username, password);

                if(tokenRes) {
                    setTokenAll(tokenRes);
                    status = true;
                    console.log(status)
                }
            } catch (error) {
                console.error(error);
                console.error("Error in login");
                console.log(status)
            } finally {
                return status;
            }
        };

        return loginAsync();
    }, [])

    //Elimina el token al hacer logout

    const logout = useCallback(() => {
        setUser(undefined);
        setTokenAll(undefined);
    }, [])

    //"Memoriza" el usuario con su token

    const value = useMemo(()=> ({
        token: token,
        user: user,
        login: login,
        logout: logout
    }), [token, user, login, logout]);

    return <UserContext.Provider value={value} {...props} />;
}

    //Funcion para utilizar el contexto en el programa

export const useUserContext = () => {
    const context = React.useContext(UserContext);

    if (!context) {
        throw new Error("useUserContext() must be inside of UserProvider");
    }

    return context;
}

export const getToken = () => localStorage.getItem(TOKEN_KEY);