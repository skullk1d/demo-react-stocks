module.exports.FETCH_QUOTE_REQUEST = function (symbol) {
	return {
		type: 'FETCH_QUOTE_REQUEST',
		tickerSymbol: symbol,
		isFetching: true
	}; // action object
};

module.exports.FETCH_QUOTE_SUCCESS = function (symbol, json) {
	return {
		type: 'FETCH_QUOTE_SUCCESS',
		tickerSymbol: symbol,
		quote: json,
		isFetching: false
	}; // action object
};

module.exports.FETCH_QUOTE_FAIL = function (symbol, error) {
	return {
		type: 'FETCH_QUOTE_FAIL',
		error: error,
		isFetching: false
	}; // action object
};

module.exports.TOGGLE_STREAMING = function (toggle) {
	return {
		type: 'TOGGLE_STREAMING',
		isStreaming: toggle
	}; // action object
};
