var React = require('react');

var TIMEOUT_INPUT = 500;
var INTERVAL_REFRESH = 4000;
var TIMEOUT_ERR = 2000;

var TickerSearch = React.createClass({
	getInitialState: function () {
		return {
			inputTimeout: null,
			streamingInterval: null,
			errSymbol: ''
		}
	},
	componentDidMount: function () {
		var streamingButton = this.refs.streamingButton.getDOMNode();
		streamingButton.addEventListener('touchstart', function () {
			if (this.className.indexOf('disabled') > -1) {
				this.className += ' active';
			}
		});
		streamingButton.addEventListener('touchend', function () {
			this.className = this.className.replace(' active', '');
		});
	},
	handleChange: function() {
		var self = this;

		// timeout searchbar
		var inputTimeout = this.state.inputTimeout;
		if (inputTimeout) {
			clearTimeout(inputTimeout);
		}

		var value = this.refs.symbolInput.getDOMNode().value;
		this.setState({
			inputTimeout: setTimeout(function () {
				// onUserInput is predefined standard dom event
				if (value === '') {
					return;
				}
				self.props.onUserInput(value); // connected with reducer passed down from smart component
			}, TIMEOUT_INPUT)
		});

		// don't let leftover streaming interval cancel out this query
		this.handleChecked();
	},
	handleSubmit: function (e) {
		e.preventDefault();
		this.handleChange();
		this.refs.symbolInput.getDOMNode().blur();
	},
	handleChecked: function () {
		// onUserInput is predefined standard dom event
		var self = this;

		// interval checkbox
		var streamingInterval = this.state.streamingInterval;
		if (streamingInterval) {
			clearInterval(streamingInterval);
		}

		var isStreaming = this.refs.streamingCheckBox.getDOMNode().checked;

		this.props.onChecked(isStreaming); // connected with setStreaming via parent Menu
		if (isStreaming) {
			this.setState({
				streamingInterval: setInterval(function () {
					// always show last successful ticker
					var lastTickerSymbol = self.props.lastTickerSymbol;
					if (!lastTickerSymbol) {
						return;
					}
					self.props.onUserInput(lastTickerSymbol); // connected with reducer passed down from smart component
				}, INTERVAL_REFRESH)
			});
		}
	},
	componentWillReceiveProps: function (newProps) {
		var self = this;

		// show error message briefly, but not when toggling streaming
		var shouldShowErr = newProps.error && newProps.error.symbol && this.props.isStreaming === newProps.isStreaming;
		if (shouldShowErr) {
			this.setState({
				errSymbol: newProps.error.symbol
			}, function () {
				var errDom = self.refs.errorBox.getDOMNode();
				if (errDom.className.indexOf('show') === -1) {
					errDom.className += 'show';
				}
				setTimeout(function () {
					errDom.className = errDom.className.replace('show', '');
				}, TIMEOUT_ERR);
			});
		}
	},
	render: function() {
		var self = this;

		var shouldDisableStreaming = !this.props.lastTickerSymbol;
		var checkBoxClasses = (shouldDisableStreaming ? ' disabled' : '') + (self.props.isStreaming ? ' isStreaming' : '');
		var errSymbolStr = (self.props.error && self.props.error.symbol.toUpperCase()) ||
			(self.state.errSymbol && self.state.errSymbol.toUpperCase()) ||
			'';

		return (
			<form className='TickerSearch' onSubmit={this.handleSubmit}>
				<input
					className='tickerInput'
					ref='symbolInput'
					type='text'
					placeholder='Symbol... e.g. TSLA'
					onChange={this.handleChange}
					autoComplete='off'
					autoCorrect='off'
					autoCapitalize='off'
					spellCheck='false'
				/>
				<div
					className='errorBox transition '
					ref='errorBox'
				>
					{'Could not find symbol '}<span className ='symbol'>{errSymbolStr}</span>
				</div>
				<div
					className={'streamingContainer' + checkBoxClasses}
					ref='streamingButton'
				>
					<input
						className='streamingCheckbox'
						id='streamingCheckbox'
						type='checkbox'
						ref='streamingCheckBox'
						onChange={self.handleChecked}
						checked={self.props.isStreaming}
						disabled={shouldDisableStreaming}
					/>
					<label htmlFor='streamingCheckbox'>{' Streaming'}</label>
				</div>
			</form>
		);
	}
});

module.exports = TickerSearch;