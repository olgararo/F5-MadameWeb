import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';

// Cleanup en el DOM después de cada test
afterEach(() => {
  cleanup();
});
