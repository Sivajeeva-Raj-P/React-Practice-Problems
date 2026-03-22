/* import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const userEmail = localStorage.getItem("loggedInUser");

  const [urls, setUrls] = useState([]);
  const [title, setTitle] = useState("");
  const [originalUrl, setOriginalUrl] = useState("");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find((u) => u.email === userEmail);
    if (user) setUrls(user.urls);
  }, [userEmail]);

  const saveUrls = (updatedUrls) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const index = users.findIndex((u) => u.email === userEmail);
    users[index].urls = updatedUrls;
    localStorage.setItem("users", JSON.stringify(users));
    setUrls(updatedUrls);
  };

  const shortUrlGenerator = () => {
    return Math.random().toString(36).substr(2, 8);
  };

  const handleAddUrl = () => {
    if (urls.length >= 5) {
      alert("You can add only 5 URLs!");
      return;
    }

    const newUrl = {
      id: Date.now(),
      title,
      originalUrl,
      shortUrl: shortUrlGenerator(),
      addedAt: new Date().toLocaleString(),
    };

    const updated = [newUrl, ...urls];
    saveUrls(updated);

    setTitle("");
    setOriginalUrl("");
  };

  const handleEdit = (id) => {
    const url = urls.find((u) => u.id === id);
    const newTitle = prompt("Edit Title", url.title);
    const newOriginal = prompt("Edit URL", url.originalUrl);

    const updated = urls.map((u) =>
      u.id === id ? { ...u, title: newTitle, originalUrl: newOriginal } : u
    );

    saveUrls(updated);
  };

  const handleDelete = (id) => {
    const updated = urls.filter((u) => u.id !== id);
    saveUrls(updated);
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/login");
  };

  const filtered = urls.filter(
    (u) =>
      u.title.toLowerCase().includes(search.toLowerCase()) ||
      u.originalUrl.toLowerCase().includes(search.toLowerCase())
  );

  const itemsPerPage = 3;
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const displayed = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="dashboard">
      <div className="header">
        <h1>URL Shortener Dashboard</h1>
        <button className="logoutBtn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="addUrl">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />
        <input
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
          placeholder="Original URL"
        />
        <button onClick={handleAddUrl}>Add URL</button>
      </div>

      <div className="search">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by title or URL"
        />
      </div>

      <div className="urlList">
        {displayed.length === 0 ? (
          <p>No URLs found.</p>
        ) : (
          displayed.map((u) => (
            <div className="urlCard" key={u.id}>
              <h3>{u.title}</h3>
              <p>
                Original URL:{" "}
                <a href={u.originalUrl} target="_blank" rel="noreferrer">
                  {u.originalUrl}
                </a>
              </p>
              <p>
                Short URL: <span className="short">{u.shortUrl}</span>
              </p>
              <p>Added At: {u.addedAt}</p>
              <div className="actions">
                <button onClick={() => handleEdit(u.id)}>Edit</button>
                <button onClick={() => handleDelete(u.id)}>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="pagination">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
        >
          Prev
        </button>
        <span>
          {currentPage} / {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => p + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Dashboard; */

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const userEmail = localStorage.getItem("loggedInUser");

  const [urls, setUrls] = useState([]);
  const [title, setTitle] = useState("");
  const [originalUrl, setOriginalUrl] = useState("");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // 🔹 Load user URLs
  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find((u) => u.email === userEmail);
    if (user && Array.isArray(user.urls)) {
      setUrls(user.urls);
    }
  }, [userEmail]);

  // 🔹 Save URLs safely
  const saveUrls = (updatedUrls) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const index = users.findIndex((u) => u.email === userEmail);

    if (index === -1) {
      alert("User session expired. Please login again.");
      handleLogout();
      return;
    }

    users[index].urls = updatedUrls;
    localStorage.setItem("users", JSON.stringify(users));
    setUrls(updatedUrls);
  };

  // 🔹 Generate short URL
  const generateShortUrl = () =>
    Math.random().toString(36).substring(2, 8);

  // 🔹 Add URL
  const handleAddUrl = () => {
    if (!title || !originalUrl) {
      alert("Please fill all fields");
      return;
    }

    if (urls.length >= 5) {
      alert("You can add only 5 URLs");
      return;
    }

    const newUrl = {
      id: Date.now(),
      title,
      originalUrl,
      shortUrl: generateShortUrl(),
      addedAt: new Date().toLocaleString(),
    };

    saveUrls([newUrl, ...urls]);
    setTitle("");
    setOriginalUrl("");
  };

  // 🔹 Edit URL (SAFE)
  const handleEdit = (id) => {
    const urlToEdit = urls.find((u) => u.id === id);
    if (!urlToEdit) return;

    const newTitle = prompt("Edit Title", urlToEdit.title);
    if (newTitle === null || newTitle.trim() === "") return;

    const newOriginalUrl = prompt("Edit URL", urlToEdit.originalUrl);
    if (newOriginalUrl === null || newOriginalUrl.trim() === "") return;

    const updatedUrls = urls.map((u) =>
      u.id === id
        ? { ...u, title: newTitle, originalUrl: newOriginalUrl }
        : u
    );

    saveUrls(updatedUrls);
  };

  // 🔹 Delete URL (SAFE)
  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure?");
    if (!confirmDelete) return;

    const updatedUrls = urls.filter((u) => u.id !== id);
    saveUrls(updatedUrls);
  };

  // 🔹 Logout
  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/login");
  };

  // 🔹 Search
  const filteredUrls = urls.filter(
    (u) =>
      u.title.toLowerCase().includes(search.toLowerCase()) ||
      u.originalUrl.toLowerCase().includes(search.toLowerCase())
  );

  // 🔹 Pagination
  const itemsPerPage = 3;
  const totalPages = Math.ceil(filteredUrls.length / itemsPerPage);
  const displayedUrls = filteredUrls.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="dashboard">
      <div className="header">
        <h1>URL Shortener Dashboard</h1>
        <button className="logoutBtn" onClick={handleLogout}>Logout</button>
      </div>

      <div className="addUrl">
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          placeholder="Original URL"
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
        />
        <button onClick={handleAddUrl}>Add URL</button>
      </div>

      <div className="search">
        <input
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="urlList">
        {displayedUrls.map((u) => (
          <div className="urlCard" key={u.id}>
            <h3>{u.title}</h3>
            <p>
              Original:{" "}
              <a href={u.originalUrl} target="_blank" rel="noreferrer">
                {u.originalUrl}
              </a>
            </p>
            <p>Short URL: <b>{u.shortUrl}</b></p>
            <p>Added: {u.addedAt}</p>
            <div className="actions">
              <button onClick={() => handleEdit(u.id)}>Edit</button>
              <button onClick={() => handleDelete(u.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      <div className="pagination">
        <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)}>Prev</button>
        <span>{currentPage} / {totalPages || 1}</span>
        <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)}>Next</button>
      </div>
    </div>
  );
};

export default Dashboard;

