//Reducer for character information Initialize State
import { put, takeLatest } from "redux-saga/effects";
import {getSongs, getAlbums} from "../services/request.service";

export const actionTypes = {
  GetSongsRequest: "[GetSongsRequest] Action",
  GetSongsSuccess: "[GetSongsSuccess] Action",
  GetSongsFail: "[GetSongsFail] Action",
  GetAlbumsRequest: "[GetAlbumsRequest] Action",
  GetAlbumsSuccess: "[GetAlbumsSuccess] Action",
  GetAlbumsFail: "[GetAlbumsFail] Action",
  SetLoadingFlag: "[SetLoadingFlag] Action",
  SetFilteredData: "[SetFilteredData] Action",
  FilterData: "[FilterData] Action",
};

const initialState = {
  songs: [],
  albums: [],
  loading: false,
  filteredData: [],
  loadFail: false,
  error: null
};

//Define Actions
export const itunesReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GetSongsSuccess: {
      const { songs } = action.payload;
      const loadFail = false;
      return { ...state, songs, loadFail };
    }
    case actionTypes.GetSongsFail: {
      const songs = [];
      const loadFail = true;
      const { error } = action.payload;
      return { ...state, songs, loadFail, error };
    }
    case actionTypes.GetAlbumsSuccess: {
      const { albums } = action.payload;
      return { ...state, albums };
    }
    case actionTypes.GetAlbumsFail: {
      const albums = [];
      const loadFail = true;
      const { error } = action.payload;
      return { ...state, albums, loadFail, error };
    }
    case actionTypes.SetLoadingFlag: {
      const { isLoading } = action.payload;
      return { ...state, isLoading };
    }
    case actionTypes.SetFilteredData: {
      const { filteredData } = action.payload;
      return { ...state, filteredData };
    }
    case actionTypes.FilterData: {
      const { condition } = action.payload;
    
      let filteredData = condition.showMode === false ? state.songs.slice() : state.albums.slice();

      if(condition.searchStr === '') return { ...state, filteredData };
      filteredData = filteredData.filter(function(value){
        return value.title.label.includes(condition.searchStr);
      });

      return { ...state, filteredData };
    }
    default:
      return state;
  }
};

export const actions = {
  getSongsRequest: () => ({ 
    type: actionTypes.GetSongsRequest, 
    payload: {} 
  }),
  getSongsSuccess: (songs) => ({
    type: actionTypes.GetSongsSuccess,
    payload: { songs },
  }),
  getSongsFail: (error) => ({
    type: actionTypes.GetSongsFail,
    payload: {error},
  }),
  getAlbumsRequest: () => ({ 
    type: actionTypes.GetAlbumsRequest, 
    payload: {} 
  }),
  getAlbumsSuccess: (albums) => ({
    type: actionTypes.GetAlbumsSuccess,
    payload: { albums },
  }),
  getAlbumsFail: (error) => ({
    type: actionTypes.GetAlbumsFail,
    payload: { error },
  }),
  setLoadingFlag: (isLoading) => ({
    type: actionTypes.SetLoadingFlag,
    payload: { isLoading },
  }),
  setFilteredData: (filteredData) => ({
    type: actionTypes.SetFilteredData,
    payload: { filteredData },
  }),
  filterData: (condition) => ({
    type: actionTypes.FilterData,
    payload: { condition},
  }),
};

export function* saga() {
  yield takeLatest(
    actionTypes.GetSongsRequest,
    function* getSongsRequested() {
      try {
        yield put(actions.setLoadingFlag(true));
        const { data } = yield getSongs();
        yield put(actions.getSongsSuccess(data.feed.entry));
        yield put(actions.setFilteredData( data.feed.entry.slice(0, 30)));
        yield put(actions.setLoadingFlag(false));
      } catch (error) {
        yield put(actions.getSongsFail(error));
        yield put(actions.setLoadingFlag(false));
      }
    }
  );

  yield takeLatest(
    actionTypes.GetAlbumsRequest,
    function* getAlbumsRequested() {
      try {
        yield put(actions.setLoadingFlag(true));
        const { data } = yield getAlbums();
        yield put(actions.getAlbumsSuccess(data.feed.entry));
        yield put(actions.setFilteredData( data.feed.entry.slice(0, 30)));
        yield put(actions.setLoadingFlag(false));
      } catch (error) {
        yield put(actions.getAlbumsFail(error));
        yield put(actions.setLoadingFlag(false));
      }
    }
  );
}
