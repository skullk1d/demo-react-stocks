var React = require('react');
var Redux = require('redux');

var applyMiddleware = Redux.applyMiddleware;
var createStore = Redux.createStore;
var MenuContainer = require('./containers/menuContainer');
var Provider = require('react-redux').Provider;
var stocksApp = require('./stocksApp');
var thunk = require('redux-thunk');

// creating the store
var createStoreWithMiddleware = applyMiddleware(
  thunk // lets us dispatch() functions, e.g. in async
)(createStore);
var store = createStoreWithMiddleware(stocksApp);

// Render the provider and container components onto the toplevel 'app' element
React.render((
  <Provider store={store}>
    { function () {
    	return <MenuContainer />;
    }}
  </Provider>
), document.getElementById('app'));