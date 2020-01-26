import React, { Component } from 'react';
import Fab from '@material-ui/core/Fab';

export class Course extends Component {
    render() {
        return (
            <tr className={"course-item"} data-code={this.props.id} name={this.props.name}>
                <td><p>{this.props.name}</p></td>
                <td><p>{this.props.id}</p></td>
                <td><div className="action-buttons">
                    <Fab color="primary" aria-label="edit" size="small" onClick={this.props.edit}>
                        <i className="fas fa-edit"></i>
                    </Fab>
                    <Fab color="secondary" aria-label="edit" size="small" onClick={this.props.delete}>
                        <i className="fas fa-trash-alt"></i>
                    </Fab>
                </div></td>
            </tr>
        )
    }
}

export default Course
