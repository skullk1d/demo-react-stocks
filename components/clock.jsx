var moment = require('moment-timezone');
var React = require('react');

var Clock = React.createClass({
	componentWillMount: function() {
		this.intervals = [];
	},
	setInterval: function() {
		this.intervals.push(setInterval.apply(null, arguments));
	},
	componentWillUnmount: function() {
		this.intervals.map(clearInterval);
	},
	getInitialState: function() {
		return {
			timeNowFormatted: this.getTimeNowFormatted()
		};
	},
	componentDidMount: function() {
		this.setInterval(this.tick, 1000); // Call a method on the mixin
	},
	getTimeNowFormatted: function () {
		return moment().tz(this.props.timezone).format('h:mm:ss a z');
	},
	tick: function() {
		this.setState({
			timeNowFormatted: this.getTimeNowFormatted()
		});
	},
	render: function() {
		return (
			<div className='clock'>{'Time in ' + this.props.placeStr + ': ' + this.state.timeNowFormatted}</div>
		);
	}
});

module.exports = Clock;
