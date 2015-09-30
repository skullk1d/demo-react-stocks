var React = require('react');

var Background = require('./background.jsx');
var Clock = require('./clock.jsx');
var TickerBox = require('./tickerBox.jsx');
var TickerSearch = require('./tickerSearch.jsx');

var Menu = React.createClass({
	// already mapped to props via redux connect
	/*getInitialState: function(){
		return {
			tickerSymbol: '',
			quote: {}
		};
	},*/
	render: function() {
		// props contains passed in state properties returned from redux action and connected dispatch function
		return (
			<div className='Menu'>
				<Background />
				<div className='wrapper'>
					<Clock timezone='America/New_York' />
					<h3 className='title'>Get Stock Quotes.</h3>
					<p className='subtitle'>Powered by Yahoo Finance, React, &amp; Redux</p>
					<TickerSearch
						onUserInput={this.props.requestQuote}
						onChecked={this.props.setStreaming}
						isStreaming={this.props.isStreaming}
						tickerSymbol={this.props.tickerSymbol}
						lastTickerSymbol={this.props.lastTickerSymbol}
						error={this.props.error}
					/>
					<TickerBox
						quote={this.props.quote}
						isFetching={this.props.isFetching}
					/>
					<p className='clockNote'>* Market open 9:30 am - 4:00 pm EST/EDT weekdays except US holidays</p>
				</div>
			</div>
		);
	}
});

module.exports = Menu;
