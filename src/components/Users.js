import React, { Component } from 'react';
import User from './User';
import TextField from '@material-ui/core/TextField';
// import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import ModalUser from './ModalUser';
import Select from '@material-ui/core/Select';
import FlipMove from 'react-flip-move';
import Header from './Header'

export class Users extends Component {
    constructor(props) {
        super(props)
        this.state = {
            users: [],
            search: '',
            modal: 'none',
            modalEdit: 'none',
            userName: '',
            userEmail: '',
            userStatus: 'Active',
            userNameEdit: '',
            userEmailEdit: '',
            userStatusEdit: 'Active',
            valueToRemove: {},
            itemsAmount: 'All',
            sortByName: false,
            sortByEmail: false,
        }
        this.addUser = this.addUser.bind(this)
        this.closeModal = this.closeModal.bind(this)
        this.saveUser = this.saveUser.bind(this)
        this.onChange = this.onChange.bind(this)
        this.deleteUser = this.deleteUser.bind(this)
        this.edit = this.edit.bind(this)
        this.editUser = this.editUser.bind(this)
        this.sortBy = this.sortBy.bind(this)
    }
    sortBy(e) {
        if (e.target.innerHTML.indexOf('Name') !== -1) {
            this.setState({ sortByName: !this.state.sortByName })
            const sorted = this.state.users.sort((a, b) => {
                if (a.name.toLowerCase() > b.name.toLowerCase()) {
                    return (this.state.sortByName) ? 1 : -1;
                }
                if (a.name.toLowerCase() < b.name.toLowerCase()) {
                    return (this.state.sortByName) ? -1 : 1;
                }
                return 0;
            });
            this.setState({ users: sorted });
        } else if (e.target.innerHTML.indexOf('Email') !== -1) {
            this.setState({ sortByEmail: !this.state.sortByEmail })
            const sorted = this.state.users.sort((a, b) => {
                if (a.email > b.email) {
                    return (this.state.sortByEmail) ? 1 : -1;
                }
                if (a.email < b.email) {
                    return (this.state.sortByEmail) ? -1 : 1;
                }
                return 0;
            });
            this.setState({ users: sorted });
        }
    }
    addUser(e) {
        this.setState({ modal: 'flex', userName: '', userEmail: '', userStatus: 'Active' })
    }
    closeModal(e) {
        if (e.target.closest('button')) {
            this.setState({ [e.target.closest('button').name]: 'none' })
        }
    }

    edit(e) {
        let users = JSON.parse(localStorage.getItem('users'));
        users.forEach(item => {
            if (item.name === e.target.closest('tr').getAttribute('name'))
                this.setState({ userNameEdit: item.name, userEmailEdit: item.email, userStatusEdit: item.status, valueToRemove: { userNameEdit: item.name, userEmailEdit: item.email, userStatusEdit: item.status } }, () => {
                    this.setState({ modalEdit: 'flex' })
                })
        });
    }
    saveUser(e) {
        let users = JSON.parse(localStorage.getItem('users'));
        let user = {
            name: this.state.userName,
            email: this.state.userEmail,
            status: this.state.userStatus,
        }
        if (users === null) {
            users = [];
            let newUsers = users.concat(user);
            localStorage.setItem('users', JSON.stringify(newUsers))
            this.setState({ users: JSON.parse(localStorage.getItem('users')) })
            this.closeModal(e);
        } else {
            let newUsers = users.concat(user);
            localStorage.setItem('users', JSON.stringify(newUsers))
            this.setState({ users: JSON.parse(localStorage.getItem('users')) })
            this.closeModal(e);
        }

    }
    editUser(e) {
        let users = JSON.parse(localStorage.getItem('users'));
        const filteredItems = users.filter(item => item.name !== this.state.valueToRemove.userNameEdit);
        console.log(filteredItems)
        const newItem = {
            name: this.state.userNameEdit,
            email: this.state.userEmailEdit,
            status: this.state.userStatusEdit
        };
        const newList = filteredItems.concat(newItem);
        localStorage.setItem('users', JSON.stringify(newList));
        this.setState({ users: newList })
        this.closeModal(e);
    }
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    componentDidMount() {
        let users = JSON.parse(localStorage.getItem('users'));
        if (users === null || users === []) {
            this.setState({ users: [] })
        } else {
            this.setState({ users: users })
        }
    }
    deleteUser(e) {
        let users = JSON.parse(localStorage.getItem('users'));
        let newUsers = users.filter(item => {
            if (item.name !== e.target.closest('tr').getAttribute('name') || item.email !== e.target.closest('tr').getAttribute('data-email')) {
                return true;
            } else {
                return false;
            }
        }
        );
        localStorage.setItem('users', JSON.stringify(newUsers));
        this.setState({ users: JSON.parse(localStorage.getItem('users')) });
    }
    render() {
        return (
            <React.Fragment>
                <Header heading="(Custom)" coursesLink="/CustomSolution/Courses" usersLink="/CustomSolution/Users" />
                <div id="users">
                    <div className="container">
                        <h1 className="main-title animated bounceInLeft">USERS</h1>
                        <div className="users-header">
                            <div className="users-actions">
                                <Fab color="primary" onClick={this.addUser} aria-label="add" size="small">
                                    <i className="fas fa-plus"></i>
                                </Fab>
                                <TextField label="Search User" variant="outlined" id="search-user" size="small" name="search" value={this.state.search} onChange={this.onChange} />
                            </div>
                            <Select
                                native
                                value={this.state.itemsAmount}
                                onChange={this.onChange}
                                inputProps={{
                                    name: "itemsAmount",
                                    id: 'amount-native-simple',
                                }}
                            >
                                <option value="All">All</option>
                                <option value={2}>2</option>
                                <option value={5}>5</option>
                                <option value={7}>7</option>
                            </Select>
                        </div>
                        <div className="users-main">
                            <table>
                                <thead>
                                    <tr>
                                        <td className="sort-btn" onClick={this.sortBy}>Name <i class="fas fa-arrows-alt-v"></i></td>
                                        <td className="sort-btn" onClick={this.sortBy}>Email <i class="fas fa-arrows-alt-v"></i></td>
                                        <td>Status</td>
                                        <td>Actions</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <FlipMove easing="ease-in-out">
                                        {this.state.users.map((item, index) => (
                                            (this.state.itemsAmount > index) ?
                                                ((this.state.search === '') ? <User key={index} name={item.name} delete={this.deleteUser} email={item.email} status={item.status} edit={this.edit} /> : (item.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1) ? <User key={index} name={item.name} delete={this.deleteCourse} email={item.email} status={item.status} edit={this.edit} /> : null) : (this.state.itemsAmount === 'All') ? ((this.state.search === '') ? <User key={index} name={item.name} delete={this.deleteUser} email={item.email} status={item.status} edit={this.edit} /> : (item.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1) ? <User key={index} name={item.name} delete={this.deleteCourse} email={item.email} status={item.status} edit={this.edit} /> : null) : null
                                        ))}
                                    </FlipMove>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <ModalUser display={this.state.modalEdit} close={this.closeModal} modalType="modalEdit" saveUser={this.editUser} nameValue={this.state.userNameEdit} emailValue={this.state.userEmailEdit} statusValue={this.state.userStatusEdit} onChange={this.onChange} nameFieldName="userNameEdit" emailFieldName="userEmailEdit" statusFieldName="userStatusEdit" />
                    <ModalUser display={this.state.modal} close={this.closeModal} modalType="modal" saveUser={this.saveUser} nameValue={this.state.userName} emailValue={this.state.userEmail} statusValue={this.state.userStatus} onChange={this.onChange} nameFieldName="userName" emailFieldName="userEmail" statusFieldName="userStatus" />
                </div>
            </React.Fragment>
        )
    }
}

export default Users
