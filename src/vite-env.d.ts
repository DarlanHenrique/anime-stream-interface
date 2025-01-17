/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_MAL_CLIENT_ID: string; 
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}