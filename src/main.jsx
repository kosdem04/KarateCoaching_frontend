import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {AuthProvider} from "./auth-context.tsx";
import {Provider} from "react-redux";
import {store} from "./app/store.js";

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Provider store={store}>
            <AuthProvider>
                <App/>
            </AuthProvider>
        </Provider>
    </StrictMode>
)
