import React from 'react';
import { Link } from 'react-router-dom';

function Main() {
    return (
        <div id="main">
           <div><Link to="/MaterialSolution/Courses">Material Solution</Link></div>
           <div><Link to="/CustomSolution/Courses">Custom Solution</Link></div>
        </div>
    )
}

export default Main
