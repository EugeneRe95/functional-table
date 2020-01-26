import React, { Component } from 'react';
import './App.scss';
import './animate.min.css'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.css'

import Courses from './components/Courses';
import Users from './components/Users';
import CoursesMaterial from './components/CoursesMaterial';
import UsersMaterial from './components/UsersMaterial';
import Main from './components/Main';


export class App extends Component {
  render() {
    return (
      <Router>
          <Route exact path='/functional-table' component={Main} />
          <Route path="/MaterialSolution/Courses" component={CoursesMaterial} />
          <Route path="/MaterialSolution/Users" component={UsersMaterial} />
          <Route path="/CustomSolution/Courses" component={Courses} />
          <Route path="/CustomSolution/Users" component={Users} />
      </Router>
    )
  }
}

export default App
