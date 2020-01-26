import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export class Modal extends Component {
    render() {
        return (
            <div className="modal" style={{ display: this.props.display}}>
            <div className="modal-container animated fadeInLeftBig">
                <Button color="secondary" variant="contained" name={this.props.modalType} onClick={this.props.close} size="small">
                    <i className="fas fa-times"></i>
                </Button>
                <TextField label="Name" variant="standard" name={this.props.fieldNameType} id="outlined-basic" size="small" onChange={this.props.onChange} value={this.props.nameValue} />
                <TextField label="Id" variant="standard" name={this.props.fieldIdType} id="outlined-basic" size="small" onChange={this.props.onChange} value={this.props.idValue} />
                <Button color="primary" variant="contained" name={this.props.modalType} onClick={this.props.saveCourse} size="small">
                    Save
                </Button>
            </div>
        </div>
        )
    }
}

export default Modal
