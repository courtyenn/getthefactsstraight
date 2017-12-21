import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Autosuggest from 'react-autosuggest'
import { CSSTransition } from 'react-transition-group'

export default class Nav extends React.Component {
    constructor (){
        super();
        this.onSearch = this.onSearch.bind(this);
        this.onClear = this.onClear.bind(this);
        this.editTimeout;

        this.state = {
            showSearchBar: false,
            search: '',
            suggestions: []
        }

    }

    onSearch (e) {
        this.setState({
            search: e.target.value
        })
        if(this.editTimeout){
            window.clearTimeout(this.editTimeout)
        }
        this.editTimeout = setTimeout(() => {
            axios.post('/search', {search: this.state.search}).then((res) => {
                this.setState({
                    suggestions: res.data.results
                })
            })
        }, 500)

    }

    onClear(){
        this.setState({
            suggestions: []
        })
    }

    renderSuggestion(suggestion){
        return (<Link to={`/${suggestion._id}`}><span>{suggestion.title}</span></Link>);
    }

    test(){

    }

    getSuggestionValue(s){
        return s._id
    }

    renderSearchBar(){
        return (
            <div>
                <Autosuggest
                    inputProps={{value: this.state.search, onChange: this.onSearch}}
                    suggestions={this.state.suggestions}
                    onSuggestionsFetchRequested={this.test}
                    onSuggestionsClearRequested={() => this.onClear}
                    getSuggestionValue={this.getSuggestionValue}
                    renderSuggestion={this.renderSuggestion}
                />
            </div>
        );
    }

    render () {
        let search = this.state.showSearchBar ? this.renderSearchBar() : null;
        return (
            <div>
                <nav>
                    <div className="logo">
                        <Link to="/">Get the Facts Straight</Link>
                    </div>
                    <div className="menu">
                        <ul>
                            <li><Link to="/create">Create your own quiz</Link></li>
                            <li><Link to="/all">View others</Link></li>
                            <li>
                                {search}
                                <span className="icon-search" onClick={() => this.setState({showSearchBar: !this.state.showSearchBar})}></span>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        )
    }
}
