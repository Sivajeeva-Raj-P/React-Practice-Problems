import React from "react";

function Home() {
  const headingColor = "lightblue";

  function showMessage() {
    document.getElementById("homeMsg").innerText =
      "Hello from React! I love this page!";
    document.getElementById("homeHead").style.backgroundColor = headingColor;
  }

  return (
    <div className="container">
      <div className="card p-4 mb-4 text-center">
        <h2 id="homeHead">This is the Home Page</h2>

        <button className="btn btn-primary mt-3" onClick={showMessage}>
          Show Enthusiasm
        </button>

        <p id="homeMsg" className="mt-3">
          Click the button to see my enthusiasm!
        </p>
      </div>
    </div>
  );
}

export default Home;
