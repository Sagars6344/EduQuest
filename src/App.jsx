import ErrorBoundary from "./components/ErrorBoundary";
import './App.css';
import { RouterProvider } from "react-router-dom";
import Router from "./Router";
import useSyncUser from "./hooks/useSyncUser";
import "./pixel-retroui-setup.js";

// ✅ Correct path (agar src me hai)
import "./pixel-retroui-setup.js";

function App(){
    // Sync user data with Supabase when they sign in
    useSyncUser();
    
    return (
        <ErrorBoundary>
            <RouterProvider router={Router}/> 
        </ErrorBoundary>
    );
}

export default App;
