var update = require('react/addons').addons.update;

// NOTE: with more complex states, best to use true reducer composition,
// better to pass in only the part of state we manage here instead of entire state,
// in this case tickerSymbol
// don't do anything here that clashes with the state model
module.exports.FETCH_QUOTE_REQUEST = function (state, action) {
	var newState = update(state, {
		tickerSymbol: { $set: action.tickerSymbol || '' },
		isFetching: { $set: action.isFetching },
		error: { $set: null }
	});

	return newState;
};

module.exports.FETCH_QUOTE_SUCCESS = function (state, action) {
	var newState = update(state, {
		lastTickerSymbol: { $set: action.tickerSymbol },
		isFetching: { $set: action.isFetching },
		quote: { $set: action.quote },
		error: { $set: null }
	});

	return newState;
};

module.exports.FETCH_QUOTE_FAIL = function (state, action) {
	var newState = update(state, {
		isFetching: { $set: action.isFetching },
		error: { $set: action.error }
	});

	return newState;
};

module.exports.TOGGLE_STREAMING = function (state, action) {
	var newState = update(state, {
		isStreaming: { $set: action.isStreaming }
	});

	return newState;
};
