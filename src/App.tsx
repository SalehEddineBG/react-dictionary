import React, { useState, MouseEvent  } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
//import 'bootstrap/dist/js/bootstrap.min.js';
import Header from './Header';
import Footer from './Footer';
import Search from './Search';
import axios from "axios";
import ResponsePanel from './ResponsePanel';
import _ from 'lodash';

const APIURL = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const storageNameOld = "old_word";
const storageNameNew = "new_word";
const ACTIONS = {
  START_FETCHING_DATA: 'Is loading',
  DATA_FETCHED: 'Data is fetched successfully',
  DATA_NOT_FETCHED: 'An error has occured',
  DATA_DELETE_ITEM: 'Delete an item from the list',
  DATA_SORT_ITEMS: 'Sort items in alphabetic order'
};
export interface Definition {
  definition: string
};
export  interface Word {
  partOfSpeech: string,
  definition: Definition
};
export interface Action {
  type: string;
  index?: number;
  payload: Array<Word> | null;
}
export interface State {
  isLoading: boolean;
  error: boolean;
  data: Array<Word> | null;
};
function reducer(state: State, action: Action): State {
  switch (action.type) {
    case ACTIONS.START_FETCHING_DATA: {
      return { ...state, isLoading: true, error: false, data: null };
    }
    case ACTIONS.DATA_FETCHED: {
      return { ...state, isLoading: false, error: false, data: action.payload };
    }
    case ACTIONS.DATA_NOT_FETCHED: {
      return { ...state, isLoading: false, error: true, data: null };
    }
    case ACTIONS.DATA_DELETE_ITEM: {
      let target: Word = {} as Word;
      let newData: Array<Word> = [];
      if (state != undefined) {
        if (state.data != undefined && action.index != undefined) {
          target = state.data[action.index];
          newData = state.data.filter((d: Word) =>  d.definition.definition!= target.definition.definition);
        }
      }
      return { ...state, isLoading: false, error: false, data: newData };
    }
    case ACTIONS.DATA_SORT_ITEMS: {
      const newData: Array<Word> = _.sortBy(state.data, 'partOfSpeech');
      return { ...state, isLoading: false, error: false, data: newData };
    }
    default:
      return state;
  }
}
function App() {
  let initialState: State = {
    isLoading: false,
    error: false,
    data: null
  };
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const [word, setWord] = React.useState(localStorage.getItem(storageNameNew) || "Morning");
  const [doTheSearch, setDoTheSearch] = React.useState(true);
  React.useEffect(() => {
    fetchData(word);
  }, [doTheSearch]);
  function handleWord(e: React.ChangeEvent<HTMLInputElement>) {
    setWord(e.target.value);
    e.preventDefault();
  }
  function formatData(response: any) {
    return response.data[0].meanings
      .filter((d: Word) => d.partOfSpeech == 'noun' || d.partOfSpeech == 'verb' || d.partOfSpeech == 'adjective' || d.partOfSpeech == 'interjection')
      .map((d: any) => {
        if (d.definition) {
          return {
            partOfSpeech: d.partOfSpeech,
            definition: d.definition
          };
        }
        else {
          return {
            partOfSpeech: d.partOfSpeech,
            definition: d.definitions[0]
          };
        }
      });
  }
  async function fetchData(wordKey: string) {
    dispatch({ type: ACTIONS.START_FETCHING_DATA, index: -1, payload: null });

    try {
      const response = await axios.get(`${APIURL}${wordKey}`);
      const data = formatData(response);
      dispatch({ type: ACTIONS.DATA_FETCHED, payload: data, index: -1 });
      const newWord = localStorage.getItem(storageNameNew);
      if (newWord == null) {
        localStorage.setItem(storageNameNew, word);
        localStorage.setItem(storageNameOld, word);
      }
      else {
        if (word != newWord) {
          localStorage.setItem(storageNameOld, newWord);
          localStorage.setItem(storageNameNew, word);
        }
      }
    } catch (error) {
      dispatch({ type: ACTIONS.DATA_NOT_FETCHED, index: -1, payload: null });
    }
  }
  function doSearch(e: MouseEvent<HTMLButtonElement>):void {
    e.preventDefault();
    fetchData(word);
  };
  function doLastSearch(e: MouseEvent<HTMLButtonElement>):void {
    e.preventDefault();
    let lastWord = localStorage.getItem(storageNameOld);
    if (lastWord == null) {
      lastWord = 'Old';
      localStorage.setItem(storageNameOld, lastWord);
    }
    fetchData(lastWord);
  };


  return (
    <>
      <Header />
      <Search word={word} handleSearch={handleWord} doSearch={doSearch} doLastSearch={doLastSearch} />
      <ResponsePanel isLoading={state.isLoading} error={state.error} data={state.data} dispatch={dispatch} />
      <Footer />
    </>
  )
}
export { reducer, ACTIONS, App };
;
export default App;