import React from 'react';
import { AuthProvider } from './src/context/authContext';
import { default as Routes} from './src/navigation';

export default function App() {
  return (
    <AuthProvider>
      <Routes/>
    </AuthProvider>
  );
}
