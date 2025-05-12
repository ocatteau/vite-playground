import "@testing-library/jest-dom/vitest"
import { cleanup } from "@testing-library/react";
import { afterEach, expect } from 'vitest'
import * as matchers from '@testing-library/jest-dom/matchers'
// import * as testingLibrary from '@testing-library/react';

expect.extend(matchers);

// (globalThis as any).render = testingLibrary.render;
// (globalThis as any).screen = testingLibrary.screen;

afterEach(() => {
    cleanup()
})
