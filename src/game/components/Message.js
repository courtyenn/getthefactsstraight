import React from 'react'
import Actions from '../actions'
import {Link} from 'react-router-dom'
import axios from 'axios'

export default class Message extends React.Component {
    constructor(){
        super()
        this.state = {
            rating: 0,
            isBlocking: false
        }
    }
    handleQuizBusiness(){
        console.log('handling everything')
    }
    async componentWillUnmount(){
        await axios.post(`/quiz/${this.props.quizId}/rate`, {rating: this.state.rating}).then((res) => {
            console.log(res.data)
        })
    }
    handleReset () {
        Actions.reset();
    }
    getMessage () {
        if (this.props.totalAnswered == this.props.totalCorrect) {
            return 'Nice job! 100%';
        }
        else if (this.props.totalAnswered / 2 > this.props.totalCorrect) {
            return 'C\'mon, you can do better than that. :-)';
        }
        else {
            return 'Keep on trying! Or, make your own!';
        }
    }
    rateGame(num){
        this.setState({rating: num})
    }
    renderStars(){
        let stars = [1,2,3,4,5].map(num => {
            if(num <= this.state.rating && this.state.rating !== 0){
                return (<span key={`star-${num}`} className="star icon-star" onClick={() => this.rateGame(num)}></span>)
            }
            else {
                return (<span key={`star-${num}`} className="star icon-star-empty" onClick={() => this.rateGame(num)}></span>)
            }
        })
        return (
            <div className="stars">
                {stars}
            </div>
        )
    }
    render(){
        let message = this.getMessage();
        return (
            <div style={this.props.style} className="endGame">
                <div className="content small">
                    <h2>Score: {this.props.totalCorrect}/{this.props.totalAnswered}</h2>
                    {this.renderStars()}
                    {message}
                </div>
                <div className="btn-group">
                    <button className="btn" onClick={this.handleReset}>Restart</button>
                    <Link className="btn success" to="/create">Create Quiz</Link>
                </div>
            </div>
        )
    }
}
