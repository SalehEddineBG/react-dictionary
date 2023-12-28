import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect,vi } from "vitest";
import { Search } from "../src/Search";
import React from 'react';
describe('Search component tests',()=>{
    it('Test the parameter word',()=>{
        const word:string="Hi";
        const doSearch=vi.fn();
        const doLastSearch=vi.fn();
        const handleWord=vi.fn();
        //word, handleSearch, doSearch,doLastSearch
        render(<Search word={word}  doSearch={doSearch} doLastSearch={doLastSearch} handleSearch={handleWord} />);
        expect(screen.getByDisplayValue(word)).not.toBeNull();
    });
    it('Test the search button',()=>{
        const word:string="Hi";
        const doSearch=vi.fn();
        const doLastSearch=vi.fn();
        const handleWord=vi.fn();
        //word, handleSearch, doSearch,doLastSearch
        render(<Search word={word}  doSearch={doSearch} doLastSearch={doLastSearch} handleSearch={handleWord} />);
        fireEvent.click(screen.getByTitle('Search button'));
        expect(doSearch).toHaveBeenCalledTimes(1);
    });
    it('Test the last search button',()=>{
        const word:string="Hi";
        const doSearch=vi.fn();
        const doLastSearch=vi.fn();
        const handleWord=vi.fn();
        //word, handleSearch, doSearch,doLastSearch
        render(<Search word={word}  doSearch={doSearch} doLastSearch={doLastSearch} handleSearch={handleWord} />);
        fireEvent.click(screen.getByTitle('Last search button'));
        expect(doLastSearch).toHaveBeenCalledTimes(1);
    });
});
