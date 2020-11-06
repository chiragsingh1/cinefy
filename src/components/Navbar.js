import React, { Component } from 'react';
import { addMoviesToList, handleMovieSearch } from '../actions'; 

// import { data } from '../data';
import { connect } from '..';



class Navbar extends Component {

  constructor (props) {
    super(props);
    this.state = {
      searchText: ''
    };
  }
  
  
  handleAddToMovies = (movie) => {
    this.props.dispatch(addMoviesToList(movie));
  };

  handleSearchClick = () => {
    const { searchText } = this.state;
    this.props.dispatch(handleMovieSearch(searchText));
  };

  handleSearchChange = (e) => {
    this.setState({
      searchText: e.target.value,
    });
  };

  render() {
    const { showSearchResults, } = this.props.search;
    const { result: movie } = this.props.search;
    return (
      <div className="nav">
        {/* <h2>c i n e f y</h2> */}
        <div className="search-container">
          <input onChange = {this.handleSearchChange} />
          <button id="search-btn" onClick={this.handleSearchClick}>
            Search
          </button>

          {showSearchResults && 
            <div className="search-results">
              <div className="search-result">
                <img src={movie.Poster} alt="search-pic"/>

                <div className="movie-info">
                  <span> {movie.Title} </span>
                  <button onClick={()=> this.handleAddToMovies(movie)}> 
                    Add to Movies
                  </button>
                </div>
              </div>
            </div>
          }


        </div>
  
      </div>
    );
  }

}


// class NavbarWrapper extends React.Component{
//   render(){
//     return(
//       <StoreContext.Consumer>
//         {(store)=> <Navbar dispatch = {store.dispatch} search = {this.props.search} />}
//       </StoreContext.Consumer>
//     );
//   }
// }
function mapStateToProps ({ search }){
  return {
    search,
  };
};
export default connect(mapStateToProps)(Navbar);
