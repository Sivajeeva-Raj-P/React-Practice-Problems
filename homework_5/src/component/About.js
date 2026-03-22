import React from "react";

function About() {
  const headingColor = "lightblue";

  function showMessage() {
    document.getElementById("aboutMsg").innerText =
      "Hello from React! I love this page!";
    document.getElementById("aboutHead").style.backgroundColor = headingColor;
  }

  return (
    <div className="container">
      <div className="card p-4 mb-4 text-center">
        <h2 id="aboutHead">This is the About Page</h2>

        <button className="btn btn-primary mt-3" onClick={showMessage}>
          Show Enthusiasm
        </button>

        <p id="aboutMsg" className="mt-3">
          Click the button to see my enthusiasm!
        </p>
      </div>
    </div>
  );
}

export default About;
