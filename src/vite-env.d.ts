/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Optional Web3Forms access key — when set, forms are delivered straight to your inbox. */
  readonly VITE_WEB3FORMS_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
