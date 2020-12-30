import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class FetchData extends Component {
    static displayName = FetchData.name;

    constructor(props) {
        super(props);
        this.state = { names: [], loading: true, searchValue: "" };
        this.handleChange = this.handleChange.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    handleChange({ target }) {
        this.setState({
            searchValue: target.value
        });
    }

    componentDidMount() {
        this.populateNamesData();
    }

    handleKeyPress(e) {
        if (e.key === "Enter") {
            this.searchByName();
        }
    };


    renderNamesTable(names) {
        return (
            <div>
                <label htmlFor="searchbox">Enter search terms</label>
                <input
                    id="searchbox"
                    type="text"
                    onChange={this.handleChange}
                    className="input-group mb-3"
                    placeholder="Search term"
                    autoFocus
                    onKeyPress={(e) => this.handleKeyPress(e)}>
                </input>
                <button
                    className="btn btn-primary"
                    onClick={(e) => this.searchByName(e)}
                   >Search</button>
                <table className='table table-striped' aria-labelledby="tabelLabel">
                    <thead>
                        <tr>
                            <th onClick={(e) => this.orderByName(e)}><Link to="fetch-data">Name</Link></th>
                            <th onClick={(e) => this.orderByAmount(e)}><Link to="fetch-data">Amount</Link></th>
                        </tr>
                    </thead>
                    <tbody>
                        {names.map(name =>
                            <tr key={name.name}>
                                <td>{name.name}</td>
                                <td>{name.amount}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderNamesTable(this.state.names);

        return (
            <div>
                <h1 id="tabelLabel" >Name Data</h1>
                {contents}
            </div>
        );
    }

    async populateNamesData() {
        const response = await fetch('api/names');
        const data = await response.json();
        this.setState({ names: data, loading: false });
    }

    async orderByName(e) {
        const response = await fetch('api/names/orderbyname');
        const data = await response.json();
        console.log(data);
        this.setState({ names: data, loading: false });
    }

    async orderByAmount() {
        const response = await fetch('api/names/orderbyamount');
        const data = await response.json();
        this.setState({ names: data, loading: false });
    }

    async searchByName(e) {
        const response = await fetch('api/names/' + this.state.searchValue);
        const data = await response.json();
        this.setState({ names: data, loading: false });
    }
}
