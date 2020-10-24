import React from 'react';


class Navbar extends React.Component {
  render() {
    return (
      <div className="nav">
        <h2>c i n e f y</h2>
        <div className="search-container">
          <input/>
          <button id="search-btn">
            Search
          </button>
        </div>
  
      </div>
    );
  }

}

export default Navbar;
