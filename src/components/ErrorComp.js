import React from "react";

class testing extends React.Component {
  componentDidMount() {
    setTimeout(() => {
      window.location.replace("/listing");
    }, 3000);
  }
  render() {
    return (
      <div
        style={{
          textAlign: "center"
        }}
      >
        <h3>This page is not found. You will be redirected in 3 secs.</h3>
      </div>
    );
  }
}

export default testing;
