import React from 'react'
import { render } from 'react-dom'
// import App from './App'
import Game from './Game'
import Data from './presidential_candidate_game.json'

render(
<Game {...Data} id={1} />,
  document.getElementById('root')
)
