import React, { Component } from 'react';

export class Home extends Component {
    static displayName = Home.name;

    constructor(props) {
        super(props);
        this.state = { nameCount: 0 };
    }

    componentDidMount() {
        this.populateNameCount();
    }

    render() {
        return (
            <div>
                <h1>Name Application</h1>
                <h2>Total amount of names in database: {this.state.nameCount}</h2>
            </div>
        );
    }

    async populateNameCount() {
        const response = await fetch('api/names/totalamount');
        const data = await response.json();
        this.setState({ nameCount: data });
    }
}
