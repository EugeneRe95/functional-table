import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class Header extends Component {
    render() {
        return (
            <header>
                <div className="container">
                    <h1>ER Courses {this.props.heading}</h1>
                    <div className="links">
                        <Link to="/functional-table">Main</Link>
                        <Link to={this.props.coursesLink}>Courses</Link>
                        <Link to={this.props.usersLink}>Users</Link>
                    </div>
                </div>

            </header>
        )
    }
}

export default Header