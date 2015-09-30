// reducers
var reducers = require('./reducers/reducers');

// initial state
var initialState = {
  tickerSymbol: '',
  lastTickerSymbol: '',
  isFetching: false,
  isStreaming: false,
  quote: {}
};

module.exports = function (state, action) {
	state = typeof state === 'undefined' ? initialState : state;
	var reducer = action && action.type && reducers[action.type];
	if (reducer) {
		var newState = reducer(state, action); // returns updated clone
		return newState;
	} else {
		return state; // default
	}
};
