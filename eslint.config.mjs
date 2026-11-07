// @ts-check
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import configPrettier from 'eslint-config-prettier/flat';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  configPrettier,
  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts']),
  {
    // Vendored shadcn/ui code: keep it identical to upstream so that
    // `shadcn add --overwrite` stays a clean diff.
    name: 'shadcn-ui',
    files: ['src/components/shadcn-ui/**'],
    rules: {
      'react-hooks/set-state-in-effect': 'off',
    },
  },
  {
    name: 'project-custom',
    rules: {
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },
]);
