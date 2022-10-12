import "./sidebar.scss"
import { sidebarOptions } from './sidebarOptions.js';
import images from '../../assets/images/ImagesSidebar.js';
import { ReactComponent as Logo } from '../../assets/images/Logo.svg';
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

let menuItem = [];

function Sidebar() {
  return (
    <div className="sidebar" >
      <div className="top">
        <Logo />
      </div>
      <div className="center">
        <ul>
          {
            RenderOption()
          }
        </ul>
      </div>
      <div className="bottom">color options</div>
    </div>
  )
}


function RenderOption() {


  return sidebarOptions.map((option, index) => {
    let title = option.title;
    let item = option.item
    return (
      <div key={index + title}>
        <p className="title">{title}</p>
        {
          item.map((item, index) => {
            return Option(item, index);
          }
          )
        }
      </div>
    )
  });
}

const Option = ((data, index) => {
  let key = data.key;
  menuItem.concat(data);
  let navigate = useNavigate();
  let current = window.location.pathname.split('/')[1];
  console.log(current, "oke");
  if (!current) {
    current = "dashboard";
  }
  return (
    <li key={index + key} >
      <div className={current === key ? 'menuItem active' : 'menuItem'} key={data.key} onClick={() => {
        navigate(data.link);
      }} >
        {images[key]}
        <span>{data.name}</span>

      </div>

    </li >
  );
});


export default Sidebar