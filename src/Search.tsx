import { Word } from "./App";
import React, { MouseEvent } from 'react';
interface ISearch{
    word:string;
    handleSearch (e: React.ChangeEvent<HTMLInputElement>) : void;
    doSearch (e: MouseEvent<HTMLButtonElement> ):void;
    doLastSearch (e: MouseEvent<HTMLButtonElement>):void;
}
function Search({ word, handleSearch, doSearch,doLastSearch } : ISearch) {
    return (
        <>
            <div className="row mt-3">
                <div className="col-4"></div>
                <div className="col-4">
                    <input type="text" name="word" className="form-control" value={word} placeholder="Word" id="word" onChange={handleSearch} data-testid="search-input" />
                    
                    
                    <div className="row mt-3">
                        <div className="col-6">
                        <button className="btn btn-success" type="button" title="Search button" name="search-button" data-testid="search-button" onClick={doSearch}>Search</button>
                        </div>
                        <div className="col-6">
                        <button className="btn btn-danger" type="button" title="Last search button" name="last-search-button" data-testid="last-search-button" onClick={doLastSearch} >Last search</button>
                        </div>
                    </div>
                </div>
                <div className="col-4"></div>
            </div>
        </>
    );
}
export { Search };
export default Search;