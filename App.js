import React from 'react';
import { AuthProvider } from './src/context/authContext';
import { WalletProvider } from './src/context/walletContext';
import { default as Routes} from './src/navigation';

export default function App() {
  return (
    <AuthProvider>
      <WalletProvider>
      <Routes/>
      </WalletProvider>      
    </AuthProvider>
  );
}
