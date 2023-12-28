import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect } from "vitest";
import Item from '../src/Item';
import React from 'react';
import { Action, Word } from '../src/App';
const item: Word = {
    partOfSpeech: 'noun',
    definition: { definition: 'An attempt to find something.' }
};
const index = 0;
describe('Item component tests', () => {
    it('Test the index', () => {
        render(<Item item={item} index={index} dispatch={function (a: Action): void {
            throw new Error('Function not implemented.');
        } } />);
        expect(screen.getByText(index + 1)).not.toBeNull();
    });
    it('Test the part of speech', () => {
        render(<Item item={item} index={index} dispatch={function (a: Action): void {
            throw new Error('Function not implemented.');
        } } />);
        expect(screen.getByText(item.partOfSpeech)).not.toBeNull();
    });
    it('Test the definition', () => {
        render(<Item item={item} index={index} dispatch={function (a: Action): void {
            throw new Error('Function not implemented.');
        } } />);
        expect(screen.getByText(item.definition.definition)).not.toBeNull();
    });
});
