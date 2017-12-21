import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Autosuggest from 'react-autosuggest';

export default class ListGames extends React.Component {
    constructor () {
        super();
        this.createListing = this.createListing.bind(this);
        this.changeFilter = this.changeFilter.bind(this);
        this.sortList = this.sortList.bind(this);
        this.onSearch = this.onSearch.bind(this);

        this.state = {
            games: [],
            filter: 'createdDate',
            search: '',
            suggestions: []
        }
    }

    componentWillMount () {
        axios.get('/quizzes').then((res) => {
            this.setState({
                games: res.data.games
            })
        })
    }

    componentWillRender () {
        this.sortList();
    }

    createListing () {
        return this.state.games.sort(this.sortList).map((game) => (
            <li key={game._id}><Link to={`/${game._id}`}>{game.title}</Link></li>));
    }

    sortList (a, b) {
        return a[this.state.filter] < b[this.state.filter]
    }

    changeFilter (e) {
        this.setState({
            filter: e.target.value
        });
    }

    onSearch (e) {
        console.log(`searching for ${e}`)
    }

    render () {
        let listing = this.createListing();
        return (
            <div className="quiz-listing">
                <div className="title"><h1>Quiz Listings</h1></div>
                <div className="content">
                    <div className="flex-container end">
                        <div className="define">Filter by:</div>
                        <select className="tiny" onChange={(e) => this.changeFilter(e)} value={this.state.filter}>
                            <option value="createdDate">Most Recent</option>
                            <option value="popularity">Most Popular</option>
                            <option value="topRated">Top Rated</option>
                        </select>
                    </div>
                    <Autosuggest
                        inputProps={{value: this.state.search, onChange: this.onSearch}}
                        suggestions={this.state.suggestions}
                        onSuggestionsFetchRequested={this.onSearch}
                        onSuggestionsClearRequested={this.onSearch}
                        getSuggestionValue={this.onSearch}
                        renderSuggestion={this.onSearch}
                    />
                    <ul className="listing">
                        {listing}
                    </ul>
                </div>
            </div>
        )
    }
}
