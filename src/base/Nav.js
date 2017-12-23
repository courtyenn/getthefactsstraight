import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Autosuggest from 'react-autosuggest'
import { CSSTransition } from 'react-transition-group'
import MediaQuery from 'react-responsive'

export default class Nav extends React.Component {
    constructor () {
        super();
        this.onSearch = this.onSearch.bind(this)
        this.onClear = this.onClear.bind(this)
        this.editTimeout

        this.state = {
            showSearchBar: false,
            search: '',
            suggestions: [],
            toggleMobile: false
        }

    }

    onSearch (e) {
        if (e.target.value) {
            this.setState({
                search: e.target.value
            })
            if (this.editTimeout) {
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
        else {
            this.setState({
                showSearchBar: false
            });
        }

    }

    onClear () {
        this.setState({
            suggestions: [],
            showSearchBar: false
        })
    }

    renderSuggestion (suggestion) {
        return (<Link to={`/${suggestion._id}`}><span>{suggestion.title}</span></Link>)
    }

    test () {

    }

    getSuggestionValue (s) {
        return s._id
    }

    renderSearchBar () {
        return (
            <Autosuggest
                inputProps={{value: this.state.search, onChange: this.onSearch}}
                suggestions={this.state.suggestions}
                onSuggestionsFetchRequested={this.test}
                onSuggestionsClearRequested={() => this.onClear}
                getSuggestionValue={this.getSuggestionValue}
                renderSuggestion={this.renderSuggestion}
            />
        )
    }

    renderMobile () {
        let search = this.renderSearchBar()
        return (
            <CSSTransition classNames="fade" timeout={1000}>
                <div className="mobile-navigation">
                    <span className="icon-cancel"
                          onClick={() => this.setState({toggleMobile: !this.state.toggleMobile})}></span>
                    <div className="search-bar">
                        {search}
                        <span className="icon-search"></span>
                    </div>
                    <ul>
                        <li onClick={() => this.setState({toggleMobile: !this.state.toggleMobile})}><Link
                            to="/">Home</Link></li>
                        <li onClick={() => this.setState({toggleMobile: !this.state.toggleMobile})}><Link to="/create">Create
                            your own quiz</Link></li>
                        <li onClick={() => this.setState({toggleMobile: !this.state.toggleMobile})}><Link to="/all">View
                            others</Link></li>
                    </ul>
                </div>
            </CSSTransition>
        )
    }

    render () {
        let search = this.state.showSearchBar ? this.renderSearchBar() : null
        let mobileNav = null
        if (this.state.toggleMobile) {
            mobileNav = this.renderMobile()
        }

        return (
            <nav>
                <div className="logo">
                    <Link to="/">Get the Facts Straight</Link>
                </div>
                <MediaQuery minDeviceWidth={1224}>
                    <div className="menu">
                        <ul>
                            <li><Link to="/create">Create your own quiz</Link></li>
                            <li><Link to="/all">View others</Link></li>
                            <li>
                                <div className="search-bar">
                                    {search}
                                    <span className="icon-search"
                                          onClick={() => this.setState({showSearchBar: !this.state.showSearchBar})}></span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </MediaQuery>
                <MediaQuery maxDeviceWidth={1224}>
                    <div className="menu mobile">
                        <span className="icon-menu"
                              onClick={() => this.setState({toggleMobile: !this.state.toggleMobile})}></span>
                        {mobileNav}
                    </div>
                </MediaQuery>
            </nav>
        )
    }
}
