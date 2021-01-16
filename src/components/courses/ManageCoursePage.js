import React, { Component } from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import * as authorActions from "../../redux/actions/authorActions";
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

class ManageCoursePage extends Component {

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
        <h2>Manage Course</h2>
      </>
    );
  }
}

ManageCoursePage.propTypes = {
  authors: PropTypes.array.isRequired,
  courses: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  return {
    courses: state.courses,
    authors: state.authors
  };
};

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

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);