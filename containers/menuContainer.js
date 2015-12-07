// redux
var Menu = require('../components/menu.jsx');
var ReactRedux = require('react-redux');
var connect = ReactRedux.connect;

// action creators (including dispatched via redux middleware)
var requestQuote = require('../components/requestQuote');
var setStreaming = require('../actions/actions').TOGGLE_STREAMING;

// which part of the Redux global state does our component want to receive as props?
function mapStateToProps(state) {
	return {
		tickerSymbol: state.tickerSymbol,
		lastTickerSymbol: state.lastTickerSymbol,
		quote: state.quote,
		isFetching: state.isFetching,
		isStreaming: state.isStreaming,
		error: state.error
	};
}

// which action creators does it want to receive by props?
function mapDispatchToProps(dispatch) {
	return {
		requestQuote: function (symbol) {
			return dispatch(requestQuote(symbol));
		},
		setStreaming: function (toggle) {
			return dispatch(setStreaming(toggle));
		}
	};
}

// returns new redux-connected react component
module.exports = connect(
	mapStateToProps,
	mapDispatchToProps
)(Menu); // returns redux connected react component