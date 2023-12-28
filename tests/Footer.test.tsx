import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect } from "vitest";
import { Footer } from "../src/Footer";
import React from 'react';
describe('Footer component tests', () => {
    it('Test the text', () => {
        render(<Footer />);
        expect(screen.getByText(/Created with love/)).not.toBeNull();
    });
    it('Test the heart', () => {
        render(<Footer />);
        expect(screen.getByTitle('heart')).not.toBeNull();
    });
});
