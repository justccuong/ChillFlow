import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    include: ['tests/**/*.{test,spec}.ts'],
    exclude: ['rea/**', 'node_modules/**', 'dist/**'],
    environment: 'node',
    globals: true,
  },
});
