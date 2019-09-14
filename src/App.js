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
    }

    addCountry(event) {
        event.preventDefault(); //stops it from submitting immediately
        let data = {
            country_name: this.refs.country_name.value,
            continent_name: this.refs.continent_name.value
        };
        var request = new Request('http://localhost:3000/api/new-country', {
            method: 'POST',
            header: new Headers({ 'Content-Type': 'application/json' }),
            body: JSON.strigify(data)
        });

        //xmlhttprequest()

        fetch(request)
            .then(function (response) {
                response.json()
                    .then(function (data) {
                        console.log(data)
                    })
            })

    }

    render() {
        let title = this.state.title;
        return (
            <div className="App">
                <h1>{title}</h1>
                <form ref="countryForm">
                    <input type="text" ref="country_name" placeholder="country name" />
                    <input type="text" ref="continent_name" placeholder="continent name" />
                    <button onClick={this.addCountry.bind(this)}>Add Country</button>
                </form>

            </div>
        );
    }
}

export default App;
