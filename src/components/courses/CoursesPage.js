import React, { Component } from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
class CoursesPage extends Component {
  state = {
    course: {
      title: "",
    },
  };

  handleChange = (event) => {
    const course = { ...this.state.course, title: event.target.value };
    this.setState({ course });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    
    // for the approach when mapDispatchToProps in NOT passed as an argument to the connect function
    // this.props.dispatch(courseActions.createCourse(this.state.course));

    // for the Manual Mapping approach
    // this.props.createCourse(this.state.course);
    
    // for the bindActionCreators approach
    this.props.actions.createCourse(this.state.course);
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h2>Courses</h2>
        <h3>Add Course</h3>
        <input
          type="text"
          onChange={this.handleChange}
          value={this.state.course.title}
        />
        <input type="submit" value="Save" />
        {this.props.courses.map(course => (
          <div key={course.title}>{course.title}</div>
        ))}
      </form>
    );
  }
}

CoursesPage.propTypes = {
  courses: PropTypes.array.isRequired,
  
  // the dispatch function is binded to the function when the mapDispatchToProps is NOT passed as an argument to the connect function
  // dispatch: PropTypes.func.isRequired,
  
  // for Manual Mapping approach
  // createCourse: PropTypes.func.isRequired

  // for bindActionCreators approach
  actions: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  return {
    courses: state.courses,
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
    actions: bindActionCreators(courseActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
