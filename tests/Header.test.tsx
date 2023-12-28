import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect } from "vitest";
import { Header } from "../src/Header";
import React from 'react';
describe('Header component tests',()=>{
    it('Test the title',()=>{
        render(<Header />);
        expect(screen.getByText('Free online dictionary')).not.toBeNull();
    });
});
