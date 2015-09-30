# README #

This is a demo app that fetches live stock quotes from Yahoo Finance.
It features dynamic elements such as streaming mode, a clock for the time in New York (on which US exchange market hours are based), a changing background from night to day, instant search results, and ticker info that goes from red to green based on change in stock price.

The app is functionally concise but is built as a fully-scalable distributed application.
It runs completely on the front-end thanks to browserify and reactify, allowing the use of _require()_ and providing JSX transformations for React.
Using Node modules and custom components, the app is CommonJS compliant.

The view is built entirely with React, used together with Redux (via react-redux) for UI updates and state management.
Because Redux allows for one-way immutable data flow, the app is also flux compliant.

### How do I get set up? ###

clone, _cd_ into project and run:

* _npm install_
* _make build_


To build the app for debugging with source maps:

* _make bundle_

Make sure the project is running on a server such as your localhost, and navigate to the directory with index.html

### Distribution ###

This software is a personal demo, built thanks in part to the support of the online community.
As such it is published here under the terms of the MIT License (MIT).

- - - -

![picture alt](http://tarickkhalaf.com/img/artifact/redux1.jpg)