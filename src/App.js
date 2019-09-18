import React, { Component } from 'react';
import './App.css';

class App extends Component {

    constructor() {
        super();
        this.state = {
            title: 'Simple Country Application',
            countries:[]
        }
    }

    // MAKE AJAX CALLS HERE

    componentDidMount() {
        console.log('COMPONENT HAS MOUNTED')
        var that = this;
        fetch('http://localhost:3000/api/countries')
            .then(function (response) {
                response.json()
                    .then(function (data) {
                        that.setState({
                            countries: data
                        })
                    })
            })
    }

    addCountry(event) {
        var that = this;
        event.preventDefault(); //stops it from submitting immediately
        let data = {
            country_name: this.refs.country_name.value,
            continent_name: this.refs.continent_name.value,
            id: Math.random().toFixed(3)
        };
        var request = new Request('http://localhost:3000/api/new-country', {
            method: 'POST',
            headers: new Headers({ 'Content-Type': 'application/json' }),
            body: JSON.stringify(data)
        });

        //xmlhttprequest()

        fetch(request)
            .then(function (response) {
                response.json()
                    .then(function (data) {
                        let countries = that.state.countries;
                        countries.push(data.country);
                        that.setState({
                            countries: countries
                        })
                    })
            })

    }

    removeCountry(id) {
        var that = this;
        let countries = this.state.countries;
        let country = countries.find(function (country) {
            return country.id === id
        })
        var request = new Request('http://localhost:3000/api/remove/' + id, {
            method: 'DELETE'
        })

        fetch(request)
            .then(function (response) {
                countries.splice(countries.indexOf(country), 1);
                that.setState({
                    countries: countries
                })
                response.json()
                    .then(function (data) {
                        console.log('data')
                    })
            })
    }

    render() {
        let title = this.state.title;
        let countries = this.state.countries;
        return (
            <div className="App">
                <h1>{title}</h1>
                <form ref="countryForm">
                    <input type="text" ref="country_name" placeholder="country name" />
                    <input type="text" ref="continent_name" placeholder="continent name" />
                    <button onClick={this.addCountry.bind(this)}>Add Country</button>
                </form>
                <ul>
                    {countries.map(country => <li key={country.id}>{country.country_name} <button onClick={this.removeCountry.bind(this, country.id)}>Remove</button></li>)}
                </ul>
            </div>
        );
    }
}

export default App;
