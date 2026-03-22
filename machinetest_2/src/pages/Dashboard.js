import { useState } from "react";
import Pagination from "../components/Pagination";

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const [urls, setUrls] = useState(user.urls || []);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [search, setSearch] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [page, setPage] = useState(1);

  const perPage = 2;

  const saveUrls = updated => {
    setUrls(updated);
    user.urls = updated;
    localStorage.setItem("currentUser", JSON.stringify(user));

    const users = JSON.parse(localStorage.getItem("users"));
    const index = users.findIndex(u => u.email === user.email);
    users[index] = user;
    localStorage.setItem("users", JSON.stringify(users));
  };

  const addOrUpdate = () => {
    if (!title || !url) {
      alert("All fields required");
      return;
    }

    if (editIndex === null && urls.length >= 5) {
      alert("Only 5 URLs allowed");
      return;
    }

    const updated = [...urls];

    if (editIndex !== null) {
      updated[editIndex].title = title;
      updated[editIndex].url = url;
    } else {
      updated.push({
        title,
        url,
        short: Math.random().toString(36).substring(2, 7),
        time: new Date().toLocaleString()
      });
    }

    saveUrls(updated);
    setTitle("");
    setUrl("");
    setEditIndex(null);
  };

  const edit = index => {
    setTitle(urls[index].title);
    setUrl(urls[index].url);
    setEditIndex(index);
  };

  const del = index => {
    saveUrls(urls.filter((_, i) => i !== index));
  };

  const logout = () => {
    localStorage.removeItem("currentUser");
    window.location.href = "/login";
  };

  const filtered = urls.filter(
    u =>
      u.title.toLowerCase().includes(search.toLowerCase()) ||
      u.url.toLowerCase().includes(search.toLowerCase())
  );

  const start = (page - 1) * perPage;
  const visible = filtered.slice(start, start + perPage);

  return (
    <div className="card">
      <h2>Dashboard</h2>
      <button onClick={logout}>Logout</button>

      <input placeholder="Search" onChange={e => setSearch(e.target.value)} />
      <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
      <input placeholder="URL" value={url} onChange={e => setUrl(e.target.value)} />
      <button onClick={addOrUpdate}>
        {editIndex !== null ? "Update" : "Add"}
      </button>

      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Short URL</th>
            <th>Time</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {visible.map((u, i) => {
            const realIndex = urls.indexOf(u);
            return (
              <tr key={i}>
                <td>{u.title}</td>
                <td>{u.short}</td>
                <td>{u.time}</td>
                <td>
                  <button onClick={() => edit(realIndex)}>Edit</button>
                  <button onClick={() => del(realIndex)}>Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <Pagination
        total={filtered.length}
        perPage={perPage}
        current={page}
        setCurrent={setPage}
      />
    </div>
  );
}

export default Dashboard;
