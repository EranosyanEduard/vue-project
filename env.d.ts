/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_YOUR_VARIABLE?: unknown
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
