import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
class Listing extends React.Component {
  render() {
    return <div>Listing page</div>;
  }
}

const mapStateToProps = state => ({
  user: state.user,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  {  }
)(withRouter(Listing));
