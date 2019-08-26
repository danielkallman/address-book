import React from 'react';
import './App.css';
import Routing from './components/Routing';
import { AuthProvider } from './context/AuthProvider';
function App() {
    return (
        <div>
            <AuthProvider>
                <Routing />
            </AuthProvider>
        </div>
    );
}

export default App;
