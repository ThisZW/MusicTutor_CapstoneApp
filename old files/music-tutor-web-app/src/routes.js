import React, {Component} from 'react'
import { BrowserRouter, Route, Link } from 'react-router-dom'
import PitchDetector from './components/pitch-detector';

export default class Routes extends Component{
  render(){
    return(
      <BrowserRouter>
        <Route exact path="/pitch-detector" component={PitchDetector}/>
      </BrowserRouter>
    )
  }
}
