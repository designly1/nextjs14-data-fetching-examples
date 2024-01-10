// @/components/DisableBodyScroll.js
import React, { Component } from 'react';
class DisableBodyScroll extends Component {
	componentDidMount() {
		document.body.classList.add('scroll-locked');
	}
	componentWillUnmount() {
		document.body.classList.remove('scroll-locked');
	}
	render() {
		return false;
	}
}
export default DisableBodyScroll;
