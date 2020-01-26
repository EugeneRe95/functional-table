import React, { Component } from 'react'
import Header from './Header'
import MaterialTable from 'material-table';


export class CoursesMaterial extends Component {
    constructor(props) {
        super(props)
        this.state = {
            columns: [
                { title: 'Name', field: 'name' },
                { title: 'Email', field: 'email' },
                { title: 'Status', field: 'status' },
            ],
            data: []
        }
    }
    componentDidMount() {
        const users = JSON.parse(localStorage.getItem('usersMaterial'))
        if (users === null || users === [{}]) {
            this.setState({ data: [] })
        } else {
            this.setState({ data: users })
        }
    }
    render() {
        return (
            <div>
                <Header heading="(Material)" coursesLink="/MaterialSolution/Courses" usersLink="/MaterialSolution/Users" />
                <div className="container">
                    <MaterialTable
                        title="Users"
                        columns={this.state.columns}
                        data={this.state.data}
                        editable={{
                            onRowAdd: newData =>
                                new Promise(resolve => {
                                    setTimeout(() => {
                                        resolve();
                                        this.setState(prevState => {
                                            const data = [...prevState.data];
                                            data.push(newData);
                                            localStorage.setItem('usersMaterial', JSON.stringify(data));
                                            return { ...prevState, data };
                                        });
                                    }, 600);
                                }),
                            onRowUpdate: (newData, oldData) =>
                                new Promise(resolve => {
                                    setTimeout(() => {
                                        resolve();
                                        if (oldData) {
                                            this.setState(prevState => {
                                                const data = [...prevState.data];
                                                data[data.indexOf(oldData)] = newData;
                                                localStorage.setItem('usersMaterial', JSON.stringify(data));
                                                return { ...prevState, data };
                                            });
                                        }
                                    }, 600);
                                }),
                            onRowDelete: oldData =>
                                new Promise(resolve => {
                                    setTimeout(() => {
                                        resolve();
                                        this.setState(prevState => {
                                            const data = [...prevState.data];
                                            data.splice(data.indexOf(oldData), 1);
                                            localStorage.setItem('usersMaterial', JSON.stringify(data));
                                            return { ...prevState, data };
                                        });
                                    }, 600);
                                }),
                        }}
                    />
                </div>
            </div>
        )
    }
}

export default CoursesMaterial
