import React, { Component } from 'react';
import Course from './Course';
import TextField from '@material-ui/core/TextField';
// import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import Modal from './Modal';
import Select from '@material-ui/core/Select';
import FlipMove from 'react-flip-move';
import Header from './Header'

export class Courses extends Component {
    constructor(props) {
        super(props)
        this.addCourse = this.addCourse.bind(this)
        this.closeModal = this.closeModal.bind(this)
        this.saveCourse = this.saveCourse.bind(this)
        this.deleteCourse = this.deleteCourse.bind(this)
        this.onChange = this.onChange.bind(this)
        this.editCourse = this.editCourse.bind(this)
        this.edit = this.edit.bind(this)
        this.sortBy = this.sortBy.bind(this)
        this.handlePageClick = this.handlePageClick.bind(this)
        this.state = {
            courses: [],
            modal: 'none',
            modalEdit: 'none',
            courseName: '',
            courseNameEdit: '',
            valueToRemove: {},
            courseId: '',
            courseIdEdit: '',
            search: '',
            itemsAmount: 'All',
            sortByName: false,
            sortByCode: true,
            pages: 3,
            offset: 4
        }
    }
    handlePageClick = data => {
        let selected = data.selected;
        let offset = Math.ceil(selected * 2);

        this.setState({ offset: offset }, () => {
            this.loadCommentsFromServer();
        });
    };

    sortBy(e) {
        if (e.target.innerHTML.indexOf('Name') !== -1) {
            this.setState({ sortByName: !this.state.sortByName })
            const sorted = this.state.courses.sort((a, b) => {
                if (a.name.toLowerCase() > b.name.toLowerCase()) {
                    return (this.state.sortByName) ? 1 : -1;
                }
                if (a.name.toLowerCase() < b.name.toLowerCase()) {
                    return (this.state.sortByName) ? -1 : 1;
                }
                return 0;
            });
            this.setState({ courses: sorted })
        } else if (e.target.innerHTML.indexOf('Code') !== -1) {
            this.setState({ sortByCode: !this.state.sortByCode })
            const sorted = this.state.courses.sort((a, b) => {
                if (a.id.toLowerCase() > b.id.toLowerCase()) {
                    return (this.state.sortByCode) ? 1 : -1;
                }
                if (a.id.toLowerCase() < b.id.toLowerCase()) {
                    return (this.state.sortByCode) ? -1 : 1;
                }
                return 0;
            });
            this.setState({ courses: sorted })
        }
    }
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    saveCourse(e) {
        let courses = JSON.parse(localStorage.getItem('courses'));
        let course = {
            name: this.state.courseName,
            id: this.state.courseId
        }
        if (courses === null) {
            courses = [];
            let newCourses = courses.concat(course);
            localStorage.setItem('courses', JSON.stringify(newCourses))
            this.setState({ courses: JSON.parse(localStorage.getItem('courses')) })
            this.closeModal(e);
        } else {
            let newCourses = courses.concat(course);
            localStorage.setItem('courses', JSON.stringify(newCourses))
            this.setState({ courses: JSON.parse(localStorage.getItem('courses')) })
            this.closeModal(e);
        }

    }
    addCourse() {
        this.setState({ modal: 'flex', courseName: '', courseId: '' })
    }
    edit(e) {
        let courses = JSON.parse(localStorage.getItem('courses'));
        courses.forEach(item => {
            if (item.name === e.target.closest('tr').getAttribute('name') && item.id === e.target.closest('tr').getAttribute('data-code'))
                this.setState({ courseNameEdit: item.name, courseIdEdit: item.id, valueToRemove: { name: item.name, id: item.id } }, () => {
                    this.setState({ modalEdit: 'flex' })
                })
        });
    }
    deleteCourse(e) {
        let courses = JSON.parse(localStorage.getItem('courses'));
        let newCourses = courses.filter(item => {
            if (item.name !== e.target.closest('tr').getAttribute('name') || item.id !== e.target.closest('tr').getAttribute('data-code')) {
                return true;
            } else {
                return false;
            }
        });
        console.log(newCourses)
        localStorage.setItem('courses', JSON.stringify(newCourses));
        this.setState({ courses: JSON.parse(localStorage.getItem('courses')) });
    }
    editCourse(e) {
        let courses = JSON.parse(localStorage.getItem('courses'));
        const filteredItems = courses.filter(item => (item.name !== this.state.valueToRemove.name && item.id !== this.state.valueToRemove.id));
        console.log(filteredItems)
        const newItem = {
            name: this.state.courseNameEdit,
            id: this.state.courseIdEdit
        };
        const newList = filteredItems.concat(newItem);
        localStorage.setItem('courses', JSON.stringify(newList));
        this.setState({ courses: newList })
        this.closeModal(e);
    }
    closeModal(e) {
        if (e.target.closest('button')) {
            this.setState({ [e.target.closest('button').name]: 'none' })
        }
    }
    componentDidMount() {
        let courses = JSON.parse(localStorage.getItem('courses'));
        if (courses === null || courses === []) {
            this.setState({ courses: [] })
        } else {
            this.setState({ courses: courses })
        }
    }
    render() {
        return (
            <React.Fragment>
                <Header heading="(Custom)" coursesLink="/CustomSolution/Courses" usersLink="/CustomSolution/Users" />
                <div id="courses">
                    <div className="container">
                        <h1 className="main-title animated bounceInLeft">COURSES</h1>
                        <div className="courses-header">
                            <div className="courses-actions">
                                <Fab color="primary" onClick={this.addCourse} aria-label="add" size="small">
                                    <i className="fas fa-plus"></i>
                                </Fab>
                                <TextField label="Search Course" variant="outlined" id="search-course" size="small" name="search" value={this.state.search} onChange={this.onChange} />
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
                        <div className="courses-main">
                            <table>
                                <thead>
                                    <tr>
                                        <td className="sort-btn" onClick={this.sortBy}>Name <i className="fas fa-arrows-alt-v"></i></td>
                                        <td className="sort-btn" onClick={this.sortBy}>Code <i className="fas fa-arrows-alt-v"></i></td>
                                        <td>Actions</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <FlipMove>
                                        {this.state.courses.map((item, index) => (
                                            (this.state.itemsAmount > index) ?
                                                ((this.state.search === '') ? <Course key={index} name={item.name} id={item.id} delete={this.deleteCourse} edit={this.edit} /> : (item.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1) ? <Course key={index} name={item.name} id={item.id} delete={this.deleteCourse} edit={this.edit} /> : null) : (this.state.itemsAmount === 'All') ? ((this.state.search === '') ? <Course key={index} name={item.name} id={item.id} delete={this.deleteCourse} edit={this.edit} /> : (item.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1) ? <Course key={index} name={item.name} id={item.id} delete={this.deleteCourse} edit={this.edit} /> : null) : null
                                        ))}
                                    </FlipMove>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <Modal modalType="modal" fieldNameType="courseName" fieldIdType="courseId" nameValue={this.state.courseName} idValue={this.state.courseId} close={this.closeModal} saveCourse={this.saveCourse} onChange={this.onChange} display={this.state.modal} />
                    <Modal modalType="modalEdit" fieldNameType="courseNameEdit" fieldIdType="courseIdEdit" nameValue={this.state.courseNameEdit} idValue={this.state.courseIdEdit} close={this.closeModal} saveCourse={this.editCourse} onChange={this.onChange} display={this.state.modalEdit} />
                </div>
            </React.Fragment>

        )
    }
}

export default Courses
