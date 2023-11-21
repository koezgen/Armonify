import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { UserEntryProvider } from './contexts/UserEntryContext';
import { ChakraProvider } from "@chakra-ui/react";
import { AuthProvider } from "react-auth-kit"
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ChakraProvider>
            <AuthProvider
                authType={"cookie"}
                authName={"_auth"}
                cookieDomain={window.location.hostname}
                cookieSecure={false}
            >
                <UserEntryProvider>
                    <App />
                </UserEntryProvider>
            </AuthProvider>
        </ChakraProvider>
    </React.StrictMode>,
)