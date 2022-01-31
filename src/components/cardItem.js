import React from "react";
import { cutStr } from "../services/function.service";

const CardItem = (props) => {
  const {item} = props;

  return (
    <div className="col-small-12 col-medium-3 col-large-3 col-3">
        <div className="p-card u-no-padding">
        <img className="p-card__image" src={item['im:image'][2].label} alt="img"/>
        <div className="p-card__inner card-title">
          <h5>{ cutStr(item['title'].label) }</h5>
        </div>
        <hr className="u-no-margin--bottom"/>
        <div className="p-card__inner u-align-text--right">
          <p className="artist">By <span className="name-area">{ cutStr(item['im:artist'].label) }</span></p>
          <p>{item['im:price'].label}</p>
        </div>
      </div>
    </div>
  );
};

export default CardItem;
