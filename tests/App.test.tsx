import { describe, it, expect, vi, MockedFunction } from "vitest";
import { reducer, ACTIONS, App, State, Action, Word } from "../src/App";
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import React from "react";
describe("Reducer function tests", () => {
    it(`Test ${ACTIONS.START_FETCHING_DATA}`, () => {
        const state:State = { isLoading: false, error: false, data: null };
        const action:Action = {
            type: ACTIONS.START_FETCHING_DATA,
            payload: null
        };
        const expectedState:State = { isLoading: true, error: false, data: null };
        const newState :State= reducer(state, action);
        expect(newState).toStrictEqual(expectedState);
    });
    it(`Test ${ACTIONS.DATA_FETCHED}`, () => {
        const state:State = { isLoading: false, error: false, data: null };
        const action:Action = { type: ACTIONS.DATA_FETCHED, payload: [] };
        const expectedState:State = { isLoading: false, error: false, data: [] };
        const newState:State = reducer(state, action);
        expect(newState).toStrictEqual(expectedState);
    });
    it(`Test ${ACTIONS.DATA_NOT_FETCHED}`, () => {
        const state:State = { isLoading: false, error: false, data: null };
        const action:Action = { type: ACTIONS.DATA_NOT_FETCHED,payload:null };
        const expectedState = { isLoading: false, error: true, data: null };
        const newState = reducer(state, action);
        expect(newState).toStrictEqual(expectedState);
    });
    it(`Test ${ACTIONS.DATA_DELETE_ITEM}`, () => {
        const data :Array<Word>= [{ partOfSpeech: 'noun', definition: { definition: 'The word "hi" used as a greeting.' } }]
        const state:State = { isLoading: false, error: false, data: data };
        const action:Action = { type: ACTIONS.DATA_DELETE_ITEM, index: 0,payload:null };
        const expectedState:State = { isLoading: false, error: false, data: [] };
        const newState = reducer(state, action);
        expect(newState).toStrictEqual(expectedState);
    });
    it(`Test ${ACTIONS.DATA_SORT_ITEMS}`, () => {
        const data : Array<Word> = [
            { partOfSpeech: 'noun', definition: { definition: '(diminutive) An even number.' } },
            { partOfSpeech: 'verb', definition: { definition: 'To make flat and level.' } },
            { partOfSpeech: 'adjective', definition: { definition: '	Flat and level.' } }
        ];
        const sortedData : Array<Word> = [
            { partOfSpeech: 'adjective', definition: { definition: '	Flat and level.' } },
            { partOfSpeech: 'noun', definition: { definition: '(diminutive) An even number.' } },
            { partOfSpeech: 'verb', definition: { definition: 'To make flat and level.' } }
        ];
        const state:State = { isLoading: false, error: false, data: data };
        const action:Action = { type: ACTIONS.DATA_SORT_ITEMS,payload:null };
        const expectedState:State = { isLoading: false, error: false, data: sortedData };
        const newState = reducer(state, action);
        expect(newState).toStrictEqual(expectedState);
    });
    it(`Test Default`, () => {
        const state :State= { isLoading: false, error: false, data: null };
        const action :Action = { type: '',payload:null };
        const expectedState:State = { isLoading: false, error: false, data: null };
        const newState = reducer(state, action);
        expect(newState).toStrictEqual(expectedState);
    });
});
// Integration tests
const data:Array<Word> = [
    {
        partOfSpeech: 'noun',
        definition: { definition: 'An attempt to find something.' }
    },
    {
        partOfSpeech: 'verb',
        definition: { definition: 'To look in (a place) for something.' }
    }
];
const response:any = {
    data: [{ word: 'Search', phonetics: [], meanings: data }],
    status: 200,
    statusText: ''
}
vi.mock('axios');
describe('App component integration tests', () => {
    it('Happy path', async () => {
        const promise: Promise<AxiosResponse> = Promise.resolve(response);
        (axios.get as MockedFunction<typeof axios.get>).mockResolvedValueOnce(response);
        render(<App />);
        expect(screen.queryByText(/Is/)).not.toBeNull();
        await waitFor(() => expect(promise).resolves.toBe(response));
        expect(screen.queryByText(/Is/)).toBeNull();
        expect(screen.queryByText(/Meanings/)).not.toBeNull();
    });
    it('Unhappy path', async () => {
        const promise: Promise<void> = Promise.reject();
        (axios.get as MockedFunction<typeof axios.get>).mockRejectedValueOnce({});
        render(<App />);
        expect(screen.queryByText(/Is/)).not.toBeNull();
        try {
            await waitFor(() => expect(promise).rejects.toBeTruthy());
        } catch (exception) {
            expect(screen.queryByText(/Is/)).toBeNull();
            expect(screen.queryByText(/No/)).not.toBeNull();
        }
        //screen.debug();
    });
});