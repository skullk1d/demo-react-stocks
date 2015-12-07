var actions = require('../actions/actions');
var fetchQuoteRequest = actions.FETCH_QUOTE_REQUEST;
var fetchQuoteSuccess = actions.FETCH_QUOTE_SUCCESS;
var fetchQuoteFail = actions.FETCH_QUOTE_FAIL;

function getJSONP(url, success) {

	var ud = '_' + +new Date,
		script = document.createElement('script'),
		head = document.getElementsByTagName('head')[0]
			   || document.documentElement;

	window[ud] = function(data) {
		head.removeChild(script);
		success && success(data);
	};

	script.src = url.replace('callback=?', 'callback=' + ud);
	head.appendChild(script);

}

function doRequest(symbol, callback) {
	// this is the YQL query (html encoded) which lets us get the stock price:
	// select * from html where url="http://finance.yahoo.com/q?s=goog" and xpath='//span[@id="yfs_l10_goog"]'
	symbol = symbol || ''; // 'YHOO';
	var url = 'http://query.yahooapis.com/v1/public/yql';
	var params = '?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20(%22' + symbol + '%22)&env=store://datatables.org/alltableswithkeys&format=json';

	var query = url + params;
	//query = 'http://finance.yahoo.com/webservice/v1/symbols/YHOO/quote?format=json&view=detail';

	query += '&callback=?';

	// this works!
	getJSONP(query, callback);
}

function requestQuote(symbol) {
	return function (dispatch) {
		dispatch(fetchQuoteRequest(symbol));

		return doRequest(symbol, function(data){
			var quote = data && data.query && data.query.results && data.query.results.quote;

			// ASSUMPTION: if quote but no company name, ticker doesn't exist
			var error = {};
			if (!quote) {
				error.message = 'FAIL: Could not fetch quote for symbol: ' + symbol; // TODO?: catch proper error from Yahoo
			} else if (quote && !quote.Name) {
				error.message = 'FAIL: Symbol \"' + symbol + '\" does not exist';
			}

			if (error.message) {
				error.symbol = symbol;
				console.warn(error.message);
				dispatch(fetchQuoteFail(symbol, error));
			} else {
				console.log('SUCCESS', quote);
				dispatch(fetchQuoteSuccess(symbol, quote)); // quote should be json
			}
		});
	};
}

module.exports = requestQuote;