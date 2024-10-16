"use client";
import { createContext, ReactNode, useRef, useContext } from 'react';
import { useStore } from 'zustand';
import { createStore } from 'zustand/vanilla';

// Define a structure for each field with a value and encryption status
export type Field<T> = {
  value: T;
  encrypted: boolean;
};

// Define the NFT form type with the specified fields
type NFTForm = {
  nftName: Field<string>;
  nftImage: Field<string>;
  nftCategory: Field<string>;
  nftHeight: Field<string>;
  nftWidth: Field<string>;
  nftValue: Field<string>;
  nftDescription: Field<string>;
  nftPassword: Field<string>;
};

// Define the NFT type that wraps around NFTForm
type NFT = {
  nft: NFTForm | undefined;
  setNFT: (nft: NFTForm | undefined) => void;
  setNFTName: (nftName: Field<string>) => void;
  setNFTImage: (nftImage: Field<string>) => void;
  setNFTCategory: (nftCategory: Field<string>) => void;
  setNFTHeight: (nftHeight: Field<string>) => void;
  setNFTWidth: (nftWidth: Field<string>) => void;
  setNFTValue: (nftValue: Field<string>) => void;
  setNFTDescription: (nftDescription: Field<string>) => void;
  setNFTPassword: (nftPassword: Field<string>) => void;
  resetForm: () => void;
};

// Create a store for the NFT form object
const createNFTFormStore = () => {
  return createStore<NFT>()((set) => ({
    nft: undefined,
    setNFT: (nft: NFTForm | undefined) => set({ nft }),
    setNFTName: (nftName: Field<string>) =>
      set((state) => ({
        nft: state.nft
          ? { ...state.nft, nftName }
          : {
              nftName,
              nftImage: { value: '', encrypted: false },
              nftCategory: { value: '', encrypted: false },
              nftHeight: { value: '', encrypted: false },
              nftWidth: { value: '', encrypted: false },
              nftValue: { value: '', encrypted: false },
              nftDescription: { value: '', encrypted: false },
              nftPassword: { value: '', encrypted: false },
            },
      })),
    setNFTImage: (nftImage: Field<string>) =>
      set((state) => ({
        nft: state.nft
          ? { ...state.nft, nftImage }
          : {
              nftName: { value: '', encrypted: false },
              nftImage,
              nftCategory: { value: '', encrypted: false },
              nftHeight: { value: '', encrypted: false },
              nftWidth: { value: '', encrypted: false },
              nftValue: { value: '', encrypted: false },
              nftDescription: { value: '', encrypted: false },
              nftPassword: { value: '', encrypted: false },
            },
      })),
    setNFTCategory: (nftCategory: Field<string>) =>
      set((state) => ({
        nft: state.nft
          ? { ...state.nft, nftCategory }
          : {
              nftName: { value: '', encrypted: false },
              nftImage: { value: '', encrypted: false },
              nftCategory,
              nftHeight: { value: '', encrypted: false },
              nftWidth: { value: '', encrypted: false },
              nftValue: { value: '', encrypted: false },
              nftDescription: { value: '', encrypted: false },
              nftPassword: { value: '', encrypted: false },
            },
      })),
    setNFTHeight: (nftHeight: Field<string>) =>
      set((state) => ({
        nft: state.nft
          ? { ...state.nft, nftHeight }
          : {
              nftName: { value: '', encrypted: false },
              nftImage: { value: '', encrypted: false },
              nftCategory: { value: '', encrypted: false },
              nftHeight,
              nftWidth: { value: '', encrypted: false },
              nftValue: { value: '', encrypted: false },
              nftDescription: { value: '', encrypted: false },
              nftPassword: { value: '', encrypted: false },
            },
      })),
    setNFTWidth: (nftWidth: Field<string>) =>
      set((state) => ({
        nft: state.nft
          ? { ...state.nft, nftWidth }
          : {
              nftName: { value: '', encrypted: false },
              nftImage: { value: '', encrypted: false },
              nftCategory: { value: '', encrypted: false },
              nftHeight: { value: '', encrypted: false },
              nftWidth,
              nftValue: { value: '', encrypted: false },
              nftDescription: { value: '', encrypted: false },
              nftPassword: { value: '', encrypted: false },
            },
      })),
    setNFTValue: (nftValue: Field<string>) =>
      set((state) => ({
        nft: state.nft
          ? { ...state.nft, nftValue }
          : {
              nftName: { value: '', encrypted: false },
              nftImage: { value: '', encrypted: false },
              nftCategory: { value: '', encrypted: false },
              nftHeight: { value: '', encrypted: false },
              nftWidth: { value: '', encrypted: false },
              nftValue,
              nftDescription: { value: '', encrypted: false },
              nftPassword: { value: '', encrypted: false },
            },
      })),
    setNFTDescription: (nftDescription: Field<string>) =>
      set((state) => ({
        nft: state.nft
          ? { ...state.nft, nftDescription }
          : {
              nftName: { value: '', encrypted: false },
              nftImage: { value: '', encrypted: false },
              nftCategory: { value: '', encrypted: false },
              nftHeight: { value: '', encrypted: false },
              nftWidth: { value: '', encrypted: false },
              nftValue: { value: '', encrypted: false },
              nftDescription,
              nftPassword: { value: '', encrypted: false },
            },
      })),
    setNFTPassword: (nftPassword: Field<string>) =>
      set((state) => ({
        nft: state.nft
          ? { ...state.nft, nftPassword }
          : {
              nftName: { value: '', encrypted: false },
              nftImage: { value: '', encrypted: false },
              nftCategory: { value: '', encrypted: false },
              nftHeight: { value: '', encrypted: false },
              nftWidth: { value: '', encrypted: false },
              nftValue: { value: '', encrypted: false },
              nftDescription: { value: '', encrypted: false },
              nftPassword,
            },
      })),
    resetForm: () => set(() => ({ nft: undefined })),
  }));
};

type NFTFormStoreApi = ReturnType<typeof createNFTFormStore>

export const NFTFormStoreContext = createContext<NFTFormStoreApi | undefined>(
  undefined,
)

export interface NFTFormStoreProviderProps {
  children: ReactNode
}

// Provide the store context to the component tree
export const NFTFormStoreProvider = ({ children }: NFTFormStoreProviderProps) => {
  const storeRef = useRef<NFTFormStoreApi>()
  if (!storeRef.current) {
    storeRef.current = createNFTFormStore()
  }

  return (
    <NFTFormStoreContext.Provider value={storeRef.current}>
      {children}
    </NFTFormStoreContext.Provider>
  )
}

// Custom hook to access the form store
export const useNFTFormStore = <T,>(
  selector: (store: NFT) => T,
): T => {
  const nftFormStoreContext = useContext(NFTFormStoreContext)

  if (!nftFormStoreContext) {
    throw new Error(`useNFTFormStore must be used within NFTFormStoreProvider`)
  }

  return useStore(nftFormStoreContext, selector)
}
