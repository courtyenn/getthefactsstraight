import React from 'react'

export default class GameOver extends React.Component {
    constructor () {
        super()
    }

    render () {

        let choices = this.props.choices.map(choice => (
            <div key={`computed-choice-${choice._id}`}
                 className={`choice-box ${choice.correct ? 'correct' : 'incorrect'}`}>
                {choice.title}
            </div>
        ))
        return (
            <div>
                <div className="title">
                    <h2>Results</h2>
                </div>
                <div className="content">
                    {choices}
                </div>
            </div>
        )
    }
}
