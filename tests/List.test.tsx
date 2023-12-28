import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect } from "vitest";
import List from '../src/List';
import React from 'react';
import { Action, Word } from '../src/App';
const data : Array<Word>= [
    {
        partOfSpeech: 'noun',
        definition: { definition: 'An attempt to find something.' }
    },
    {
        partOfSpeech: 'verb',
        definition: { definition: 'To look in (a place) for something.' }
    }
];
describe('List component tests', () => {
    it('Test the table', () => {
        render(<List data={data} dispatch={function (a: Action): void {
            throw new Error('Function not implemented.');
        } }  />);
        expect(screen.getByTitle('Response')).not.toBeNull();
    });
    it('Test the index', () => {
        render(<List data={data} dispatch={function (a: Action): void {
            throw new Error('Function not implemented.');
        } }  />);
        expect(screen.getByText('#')).not.toBeNull();
    });
    it('Test the type', () => {
        render(<List data={data} dispatch={function (a: Action): void {
            throw new Error('Function not implemented.');
        } }  />);
        expect(screen.getByText('Type')).not.toBeNull();
    });
    it('Test the definition', () => {
        render(<List data={data} dispatch={function (a: Action): void {
            throw new Error('Function not implemented.');
        } }  />);
        expect(screen.getByText('Definition')).not.toBeNull();
    });

});
