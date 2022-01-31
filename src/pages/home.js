import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as itunes from "../redux/itunesRedux";
import CardItem from "../components/cardItem";
import FilterBar from "../components/filterBar";
import LoadingBar from "../components/loadingBar";
import RetryFetchModal from "../components/retryFetchModal";

const HomePage = (props) => {
  const {
    getSongsRequest,
    getAlbumsRequest,
    filterData,
    filteredData,
    isLoading,
    loadFail,
    error
  } = props;

  const [searchStr, setSearchStr] = useState("");
  const [showMode, setShowMode] = useState(false); //true: song, false: album
  
  useEffect(() => {
    getSongsRequest();
  }, [getSongsRequest]);

  useEffect(()=>{
    filterData('');
  },[filterData]);

  const handleFetchRetry = () => {
    getSongsRequest();
  }

  const handleSwitch = () => {
    setSearchStr('');
    setShowMode(showMode ? false : true);
    showMode ? getSongsRequest() : getAlbumsRequest();
  }

  const handleChange = (evt) => {
    setSearchStr(evt.target.value);
  }

  const handleKeyPress = (evt) => {
    if(evt.key === 'Enter'){
      filterData({searchStr: searchStr, showMode: showMode});
    }
  }
  
  return (
    <div className="container">
      { loadFail && (
        <RetryFetchModal 
          handleFetchRetry = { handleFetchRetry }
          error = { error }
        />
        )}
      <div className = "p-card main-content">
        <div className="row card-area">
          {isLoading && <LoadingBar />}
          <FilterBar
            handleSwitch = { handleSwitch }
            handleChange = { handleChange }
            handleKeyPress = { handleKeyPress }
            searchStr = { searchStr }
            showMode = { showMode }
          />
          {
          !!filteredData && !isLoading && filteredData.map((item, index) => (
            <CardItem 
              item = {item}
              key={index}
            />
          ))}
        </div>
      </div>
    </div>  
  );
};

const mapStatesToProps = (state) => ({
  isLoading: state.itunes.isLoading,
  filteredData: state.itunes.filteredData,
  loadFail: state.itunes.loadFail,
  error: state.itunes.error
});

export default connect(mapStatesToProps, itunes.actions)(HomePage);
