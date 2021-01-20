import React, { Component } from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import * as authorActions from "../../redux/actions/authorActions";
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import CourseList from "./CourseList";
import { Redirect } from 'react-router-dom';
class CoursesPage extends Component {

  state = {
    redirectToAddCoursePage: false
  };

  componentDidMount() {

    const { courses, authors, actions } = this.props;

    if (courses.length === 0) {
      actions.loadCourses()
        .catch(error => {
          alert("Loading courses failed ", error);
        })
    }

    if (authors.length === 0) {
      actions.loadAuthors()
        .catch(error => {
          alert("Loading authors failed ", error);
        })
    }
  }

  render() {
    return (
      <>
        {/* approach for redirect via the <Redirect> component of react-router */}
        {this.state.redirectToAddCoursePage && <Redirect to="/course"/>}
        <h2>Courses</h2>
        <button style={{ marginBottom: 20 }} className="btn btn-primary add-course" onClick={() => this.setState({ redirectToAddCoursePage: true })}>
        Add Course
        </button>
        <CourseList courses={this.props.courses} />
      </>
    );
  }
}

CoursesPage.propTypes = {
  authors: PropTypes.array.isRequired,
  courses: PropTypes.array.isRequired,
  
  // the dispatch function is binded to the function when the mapDispatchToProps is NOT passed as an argument to the connect function
  // dispatch: PropTypes.func.isRequired,
  
  // for Manual Mapping approach and Object approach
  // createCourse: PropTypes.func.isRequired

  // for bindActionCreators approach
  actions: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  return {
    courses:
      state.authors.length === 0
        ? []
        : state.courses.map((course) => {
            return {
              ...course,
              authorName: state.authors.find(
                (author) => author.id === course.authorId
              ).name,
            };
          }),
    authors: state.authors,
  };
};

// mapDispatchToProps: Manual Mapping approach
// const mapDispatchToProps = (dispatch) => {
//   return {
//     createCourse: course => dispatch(courseActions.createCourse(course))
//   };
// };

// mapDispatchToProps: bindActionCreators approach
const mapDispatchToProps = (dispatch) => {
  return {
    // named actions because in this case all actions are wrapped
    actions: {
      loadCourses: bindActionCreators(courseActions.loadCourses, dispatch),
      loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch)
    }
  };
};

// mapDispatchToProps: Object approach
// const mapDispatchToProps = {
//   createCourse: courseActions.createCourse
// };

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);


// Class before the refactor
// class CoursesPage extends Component {
//   state = {
//     course: {
//       title: "",
//     },
//   };

//   handleChange = (event) => {
//     const course = { ...this.state.course, title: event.target.value };
//     this.setState({ course });
//   };

//   handleSubmit = (event) => {
//     event.preventDefault();
    
//     // for the approach when mapDispatchToProps in NOT passed as an argument to the connect function
//     // this.props.dispatch(courseActions.createCourse(this.state.course));

//     // for the Manual Mapping approach
//     // this.props.createCourse(this.state.course);
    
//     // for the bindActionCreators approach
//     this.props.actions.createCourse(this.state.course);
//   };

//   render() {
//     return (
//       <form onSubmit={this.handleSubmit}>
//         <h2>Courses</h2>
//         <h3>Add Course</h3>
//         <input
//           type="text"
//           onChange={this.handleChange}
//           value={this.state.course.title}
//         />
//         <input type="submit" value="Save" />
//         {this.props.courses.map(course => (
//           <div key={course.title}>{course.title}</div>
//         ))}
//       </form>
//     );
//   }
// }