import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default class ListGames extends React.Component {
    constructor (){
        super();
        this.createListing = this.createListing.bind(this);
        this.changeFilter = this.changeFilter.bind(this);
        this.sortList = this.sortList.bind(this);

        this.state = {
            games: [],
            filter: 'createdDate'
        }
    }
    componentWillMount(){
        axios.get('/quizzes').then((res) => {
            this.setState({
                games: res.data.games
            })
        })
    }

    componentWillRender(){
        this.sortList();
    }

    createListing() {
        return this.state.games.sort(this.sortList).map( (game) => (<li key={game._id}><Link to={`/${game._id}`}>{game.title}</Link></li>));
    }

    sortList(a, b){
        return a[this.state.filter] < b[this.state.filter]
    }

    changeFilter(e){
        this.setState({
            filter: e.target.value
        });
    }

    render () {
        let listing = this.createListing();
        return (
            <div>
                <h1 className="title">Quiz Listings</h1>
                Filter by:
                <select onChange={(e) => this.changeFilter(e)} value={this.state.filter}>
                    <option value="createdDate">Most Recent</option>
                    <option value="popularity">Most Popular</option>
                    <option value="topRated">Top Rated</option>
                </select>
                <ul className="listing">
                    {listing}
                </ul>
            </div>
        )
    }
}
