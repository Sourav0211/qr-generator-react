import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.css';

export default function Navigation() {
  return (
    <div className='Navigation'>
      <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
        <li className="nav-item" role="presentation">
          <NavLink className="nav-link" activeClassName="active" exact to="/link" role="tab" aria-controls="pills-home" aria-selected="true">Link</NavLink>
        </li>
        <li className="nav-item" role="presentation">
          <NavLink className="nav-link" activeClassName="active" exact to="/file" role="tab" aria-controls="pills-profile" aria-selected="false">File</NavLink>
        </li>
        <li className="nav-item" role="presentation">
          <NavLink className="nav-link" activeClassName="active" exact to="/contact" role="tab" aria-controls="pills-contact" aria-selected="false">Contact</NavLink>
        </li>
      </ul>
    </div>
  )
}
