"use client";
import { createContext, ReactNode, useRef, useContext } from 'react';
import { SecretNetworkClient } from 'secretjs';
import { create } from 'zustand'
import { useStore } from 'zustand'
import { createStore } from 'zustand/vanilla'

type Wallet = {
  wallet: SecretNetworkClient | undefined;
  setWallet: (wallet: SecretNetworkClient | undefined) => void;
  logout: ()=>void;
};

//export const useWallet = create<Wallet>()((set) => ({
//  wallet: undefined,
//  setWallet: (wallet: SecretNetworkClient | undefined) => set({ wallet }),
//  logout: ()=>set({wallet: undefined}),
//}))
//

const createWalletStore = () => {
  return createStore<Wallet>()((set) => ({
    wallet: undefined,
    setWallet: (wallet: SecretNetworkClient | undefined) => set({ wallet }),
    logout: ()=>{set({wallet: undefined}); window.keplr.disable()},
  }))
}

type WalletStoreApi = ReturnType<typeof createWalletStore>

export const WalletStoreContext = createContext<WalletStoreApi | undefined>(
  undefined,
)

export interface WalletStoreProviderProps {
  children: ReactNode
}

export const WalletStoreProvider = ({ children }: WalletStoreProviderProps) => {
  const storeRef = useRef<WalletStoreApi>()
  if (!storeRef.current) {
    storeRef.current = createWalletStore()
  }

  return (
    <WalletStoreContext.Provider value={storeRef.current} >
      {children}
    </WalletStoreContext.Provider>
  )
}


export const useWalletStore = <T,>(
  selector: (store: Wallet) => T,
): T => {
  const walletStoreContext = useContext(WalletStoreContext)

  if (!walletStoreContext) {
    throw new Error(`useWalletStore must be used within WalletStoreProvider`)
  }

  return useStore(walletStoreContext, selector)
}
