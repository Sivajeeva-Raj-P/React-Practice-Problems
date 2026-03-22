import React from "react";


function Contact() {
  const headingColor = "lightblue";

  function showMessage() {
    document.getElementById("contactMsg").innerText =
      "Hello from React! I love this page!";
    document.getElementById("contactHead").style.backgroundColor = headingColor;
  }

  return (
    <div className="container">
      <div className="card p-4 mb-4 text-center">
        <h2 id="contactHead">This is the Contact Page</h2>

        <button className="btn btn-primary mt-3" onClick={showMessage}>
          Show Enthusiasm
        </button>

        <p id="contactMsg" className="mt-3">
          Click the button to see my enthusiasm!
        </p>
      </div>
    </div>
  );
}

export default Contact;
