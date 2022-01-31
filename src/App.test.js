import expect from 'expect';

import {
  cutStr,
} from "./services/function.service";

import { itunesReducer } from './redux/itunesRedux';
import { actions } from './redux/itunesRedux';

describe("test for global functions:", () => {
  it("cut string by cutStr function.", () => {
    const input = "We Don't Talk About Bruno - Carolina Gaitán - La Gaita, Maurasdf";
    
    const expectedResult = "We Don't Talk About Bruno - Carolina Gaitán - La Gaita, Maur...";

    expect(cutStr(input)).toEqual(expectedResult);
  });
});

describe('itunes reducer', () => {

  it('should handle GetSongsRequest', () => {
    const initialState = {
      songs: [],
      albums: [],
      isLoading: false,
      filteredData: [],
      loadFail: false,
      error: null
    };

    const expectedResult = initialState;

    expect(itunesReducer(initialState, actions.getSongsRequest)).toEqual(expectedResult);
  });

  it('should handle SetLoadingFlag', () => {
    const initialState = {
      songs: [],
      albums: [],
      isLoading: false,
      filteredData: [],
      loadFail: false,
      error: null
    };

    const expectedResult = {
      songs: [],
      albums: [],
      isLoading: true,
      filteredData: [],
      loadFail: false,
      error: null
    };

    expect(itunesReducer(initialState, actions.setLoadingFlag(true))).toEqual(expectedResult);
  });

  it('should handle GetSongsFail', () => {
    const initialState = {
      songs: [],
      albums: [],
      isLoading: false,
      filteredData: [],
      loadFail: false,
      error: null
    };

    const expectedResult = {
      songs: [],
      albums: [],
      isLoading: false,
      filteredData: [],
      loadFail: true,
      error: 'Error'
    };

    expect(itunesReducer(initialState, actions.getSongsFail('Error'))).toEqual(expectedResult);
  });

  it('should handle GetSongsSuccess', () => {
    const initialState = {
      songs: [],
      albums: [],
      isLoading: false,
      filteredData: [],
      loadFail: false,
      error: null
    };

    const expectedResult = {
      songs: [
        {"im:name":{"label":"We Don't Talk About Bruno"}} 
      ],
      albums: [],
      isLoading: false,
      filteredData: [],
      loadFail: false,
      error: null
    };

    const songs = [
      {"im:name":{"label":"We Don't Talk About Bruno"}}
    ];

    expect(itunesReducer(initialState, actions.getSongsSuccess(songs))).toEqual(expectedResult);
  });

  it('should handle SetFilteredData', () => {
    const initialState = {
      songs: [],
      albums: [],
      isLoading: false,
      filteredData: [],
      loadFail: false,
      error: null
    };

    const expectedResult = {
      songs: [],
      albums: [],
      isLoading: false,
      filteredData: [{"im:name":{"label":"We Don't Talk About Bruno"}}],
      loadFail: false,
      error: null
    };

    const filteredData = [
      {"im:name":{"label":"We Don't Talk About Bruno"}}
    ];

    expect(itunesReducer(initialState, actions.setFilteredData(filteredData))).toEqual(expectedResult);
  });

  it('should handle FilterData', () => {
    const initialState = {
      songs: [
        {"title": {"label": "Sand In My Boots - Morgan Wallen"}},
        {"title": {"label": "Chasing Cars - Snow Patrol"}},
      ],
      albums: [],
      isLoading: false,
      filteredData: [
        {"title": {"label": "Sand In My Boots - Morgan Wallen"}},
        {"title": {"label": "Chasing Cars - Snow Patrol"}},
      ],
      loadFail: false,
      error: null
    };

    const expectedResult = {
      songs: [
        {"title": {"label": "Sand In My Boots - Morgan Wallen"}},
        {"title": {"label": "Chasing Cars - Snow Patrol"}},
      ],
      albums: [],
      isLoading: false,
      filteredData: [{"title": {"label": "Sand In My Boots - Morgan Wallen"}},],
      loadFail: false,
      error: null
    };

    expect(itunesReducer(initialState, actions.filterData({searchStr: 'Sand', showMode: false}))).toEqual(expectedResult);
  });
});
