import { defineConfig } from "eslint/config"
import nextVitals from "eslint-config-next/core-web-vitals"
import nextTs from "eslint-config-next/typescript"

// eslint-config-next already ignores .next, out, build and next-env.d.ts
const eslintConfig = defineConfig([...nextVitals, ...nextTs])

export default eslintConfig
