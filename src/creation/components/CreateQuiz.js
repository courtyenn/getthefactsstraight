import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import {editTitle} from '../actions'
import Sublist from './Sublist'

class CreateQuiz extends PureComponent {
    render() {
        return (
            <div className="content">
                <h1>{this.props.title}</h1>
                <p>Create a quiz by filling out the fields below:</p>
                <form>
                    <label htmlFor="title">Title:</label>
                    <input id="title" type="text" name="title" placeholder="Common Logic Quiz" className="input-wide" value={this.props.title} onChange={e => this.props.onNameChange(e.target.value)}/>
                    <label htmlFor="editor">Create columns to compare and contrast</label>
                    <Sublist />
                    <input type="submit" />
                </form>
            </div>
        )
    }
}

export default connect(state => ({
    title: state.title
}),
    dispatch => ({
        onNameChange: name => { dispatch(editTitle(name)) }
    })
)(CreateQuiz)