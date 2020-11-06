import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
// import redux from 'redux';
import thunk from 'redux-thunk';

import './index.css';
import App from './components/App';
import rootReducer from './reducers';
import { data } from './data';

// MIDDLEWARES
// Currying function logger(obj,next,action){}
// logger function will be called as -> logger(obj)(next)(action);
// const logger = function({ dispatch, getState }){
//   return function(next){
//     return function(action){
//       // middleware code
//       console.log('ACTION_TYPE = ', action.type);
//       next(action);
//     }
//   }
// }
// MODIFYING MIDDLEWARE SYNTAX
const logger = ({ dispatch, getState }) => (next) => (action) => {
  // middleware code
  if (typeof action !== 'function') {
    console.log('ACTION_TYPE = ', action.type);

  }
  next(action);
};

// const thunk = ({ dispatch, getState }) => (next) => (action) => {
//   // middleware code
//   if(typeof action === 'function'){
//     action(dispatch);
//     return;
//   }
//   next(action);
// };

const store = createStore(rootReducer, applyMiddleware(logger, thunk));
// console.log('store', store);
// console.log('BEFORE STATE', store.getState());
export const StoreContext = createContext();

console.log('StoreContext', StoreContext);
// store.dispatch({
//   type: 'ADD_MOVIES',
//   movies: [{ name: 'Superman' }]
// });
// console.log('AFTER STATE', store.getState());


class Provider extends React.Component {
  render() {
    const { store } = this.props;
    return (
      <StoreContext.Provider value={store}>
        {this.props.children}
      </StoreContext.Provider>
    );
  }
};

// const connectedAppComponent = connect(callback)(Component);
export function connect(callback) {
  return function (Component) {
    class ConnectedComponent extends React.Component {
      constructor(props) {
        super(props);
        this.unsubscribe = this.props.store.subscribe(() => this.forceUpdate());
      }
      componentWillUnmount(){
        this.unsubscribe();
      }
      render() {
        const { store } = this.props;
        const state = store.getState();
        const dataToBePassedAsProps = callback(state);
        return (
          <Component
            {...dataToBePassedAsProps}
            dispatch={store.dispatch}
          />
        );
      }
    }

    class ConnectedComponentWrapper extends React.Component {
      render() {
        return (
          <StoreContext.Consumer>
            {(store) => {
              <ConnectedComponent store={store} />
            }}
          </StoreContext.Consumer>
        );
      }
    }
    return ConnectedComponentWrapper;

  }
}



ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode value={store}>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);
