import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';

export class ModalUser extends Component {

    render() {
        return (
            <div className="modal" style={{ display: this.props.display }}>
                <div className="modal-container animated fadeInLeftBig">
                    <Button color="secondary" variant="contained" name={this.props.modalType} onClick={this.props.close} size="small">
                        <i className="fas fa-times"></i>
                    </Button>
                    <TextField label="Name" variant="standard" name={this.props.nameFieldName} id="outlined-basic" size="small" onChange={this.props.onChange} value={this.props.nameValue} />
                    <TextField label="Email" variant="standard" name={this.props.emailFieldName} id="outlined-basic" size="small" onChange={this.props.onChange} value={this.props.emailValue} />
                    <Select
                        native
                        value={this.props.statusName}
                        onChange={this.props.onChange}
                        inputProps={{
                            name: this.props.statusFieldName,
                            id: 'status-native-simple',
                        }}
                    >
                        <option value="">Status</option>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                    </Select>
                    <Button color="primary" variant="contained" name={this.props.modalType} onClick={this.props.saveUser} size="small">
                        Save
                </Button>
                </div>
            </div>
        )
    }
}

export default ModalUser
