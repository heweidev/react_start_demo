import React, { Component } from 'react';
import './Risk.css';
import 'whatwg-fetch'
var util = require('util');

class RiskItem extends Component {
	constructor() {
		super();
	}

	onClicked(index) {
		this.props.onItemClick(index);
	}

	render() {
		if (util.isNullOrUndefined(this.props.data)) {
			return (<div></div>);
		} else {
			let anwsers = this.props.data.anwsers.map((info, index) =>
				<p key={index} onClick={this.onClicked.bind(this, index)}>{info}</p>
			);

			return (
				<div className="RiskItem">
					<h2>{this.props.data.question}</h2>
					{anwsers}
				</div>
			);
		}
	}
}

class RiskPage extends Component {
	constructor() {
		super();
		this.data = [];

		this.state = {
			index: 0,
			total: 1,
			result: [],
		};

		this.onDataArrived = this.onDataArrived.bind(this);
		this.next = this.next.bind(this);
		this.prev = this.prev.bind(this);
		this.onItemClicked = this.onItemClicked.bind(this);

		this.fetchData();
	}

	onDataArrived(json) {
		this.data = json;
		this.setState({
			total: json.length,
			itemData: json[this.state.index]
		});
	}

	fetchData() {
		fetch('/paper.json')
		.then(function(response) {
			return response.json()
		})
		.then(this.onDataArrived)
		.catch(function(ex) {
			console.log('parsing failed', ex)
		})
	}

	prev() {
		let cur = this.state.index;
		if (cur - 1 >= 0) {
			cur -= 1;
		}

		this.setState({
			index: cur,
			itemData: this.data[cur]
		});
	}

	next() {
		let cur = this.state.index;
		if (cur + 1 <= this.state.total - 1) {
			cur += 1;
		}

		this.setState({
			index: cur,
			itemData: this.data[cur]
		});
	}

	onItemClicked(index) {
		let oldResult = this.state.result;
		oldResult[this.state.index] = index;

		this.setState({
			result: oldResult,
		});
	}

	render() {
		return (
		<div className="RiskTest">
			<h1>{this.state.index + 1}/{this.state.total}</h1>
			<RiskItem data={this.state.itemData} onItemClick={this.onItemClicked}/>
			<button onClick={this.prev}>上一题</button>
			<button onClick={this.next}>下一题</button>
			<p>您选择的答案：{this.state.result.toString()}</p>
		</div>
		);
	}
}

export default RiskPage;