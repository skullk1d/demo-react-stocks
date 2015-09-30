var React = require('react');

var TickerBox = React.createClass({
	render: function() {
		var quote = this.props.quote;
		var isFetchingStr = this.props.isFetching ? 'isFetching' : '';
		var change = Number(quote.Change);
		var gainOrLoss = '';
		if (change) {
			gainOrLoss = change > 0 ? 'up' : 'down';
		}

		var classes = [isFetchingStr, gainOrLoss].join(' ');

		var quoteChangeStr = quote.Change || '';
		quoteChangeStr += quote.ChangeinPercent ? ' (' + quote.ChangeinPercent + ')' : '';

		return (
			<div className={'TickerBox transition ' + classes}>
				<table className='info'>
					<tr><td colSpan={2} className='symbol'>{ quote.Symbol }</td></tr>
					<tr><td className='label'>Name:</td><td className='value'>{ quote.Name }</td></tr>
					<tr><td className='label'>LastX:</td><td className='value'>{ quote.LastTradePriceOnly }</td></tr>
					<tr><td className='label'>Bid:</td><td className='value'>{ quote.Bid }</td></tr>
					<tr><td className='label'>Ask:</td><td className='value'>{ quote.Ask }</td></tr>
					<tr><td className='label'>Change:</td><td className='value'>{ quoteChangeStr }</td></tr>
				</table>
				<div className='spinner transition' />
			</div>
		);
	}
});

module.exports = TickerBox;