var React = require('react');
var moment = require('moment-timezone');

var Background = React.createClass({
	getInitialState: function () {
		return {
			isDay: false,
			msLeft: 0
		};
	},
	componentDidMount: function() {
		var self = this;
		this.updateTime(function () {
			self.dayShiftTimeout = setTimeout(self.updateTime, self.state.msLeft);
		});
	},
	componentWillUnmount: function() {
		clearTimeout(this.dayShiftTimeout);
	},
	updateTime: function (callback) {
		var self = this;

		// update day or night
		/*function mod24(diff) {
			return diff > 0 ? diff : diff + 24;
		}*/

		var tzStr = 'America/New_York';
		var timeNowNY = moment().tz(tzStr);

		// defaults to current day in UTC so pass in local day
		var SUNRISE = moment.tz({ D: timeNowNY.date(), H: 6, m: 0 }, tzStr);
		var SUNSET = moment.tz({ D: timeNowNY.date(), H: 18, m: 0 }, tzStr);

		// determine future time left
		var tilSunrise = SUNRISE.diff(timeNowNY);
		if (tilSunrise <= 0) {
			tilSunrise = SUNRISE.add(1, 'days').diff(timeNowNY);
		}
		var tilSunset = SUNSET.diff(timeNowNY);
		if (tilSunset < 0) {
			tilSunset = SUNSET.add(1, 'days').diff(timeNowNY);
		}

		var isDay = tilSunset < tilSunrise;
		var msLeft = Math.min(tilSunset, tilSunrise);

		// re-renders the background to show day or night
		this.setState({
			isDay: isDay,
			msLeft: msLeft
		}, callback); // set state is async
	},
	render: function() {
		return (
			<div className={'Background transition ' + (this.state.isDay ? 'day' : 'night')}>
			</div>
		);
	}
});

module.exports = Background;
