import { useState } from "react";
import Navbar from "../components/Navbar";
import Pagination from "../components/Pagination";


function DashboardPage() {
  const user = JSON.parse(localStorage.getItem("currentUser"));
if (!user) {
  navigate("/");
}

  const [urls, setUrls] = useState(user.urls || []);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [search, setSearch] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [page, setPage] = useState(1);
  const perPage = 2;

  

  const addUrl = () => {
    if (!title || !url) return alert("All fields required");
    if (editIndex === null && urls.length >= 5)
      return alert("Only 5 URLs allowed");

    let updated = [...urls];

    if (editIndex !== null) {
      updated[editIndex] = { ...updated[editIndex], title, url };
    } else {
      updated.push({
        title,
        url,
        short: Math.random().toString(36).substring(2, 7),
        time: new Date().toLocaleString()
      });
    }

    setUrls(updated);
    user.urls = updated;
    localStorage.setItem("currentUser", JSON.stringify(user));
    setTitle("");
    setUrl("");
    setEditIndex(null);
  };

  const deleteUrl = i => {
    const updated = urls.filter((_, idx) => idx !== i);
    setUrls(updated);
    user.urls = updated;
    localStorage.setItem("currentUser", JSON.stringify(user));
  };

  const editUrl = i => {
    setTitle(urls[i].title);
    setUrl(urls[i].url);
    setEditIndex(i);
  };

  const filtered = urls.filter(
    u =>
      u.title.toLowerCase().includes(search.toLowerCase()) ||
      u.url.toLowerCase().includes(search.toLowerCase())
  );

  const start = (page - 1) * perPage;
  const visible = filtered.slice(start, start + perPage);

  return (
    <>
      <Navbar />
      <div className="card">
        <h2>Dashboard</h2>

        <input
          placeholder="Search"
          onChange={e => setSearch(e.target.value)}
        />

        <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
        <input placeholder="URL" value={url} onChange={e => setUrl(e.target.value)} />
        <button onClick={addUrl}>{editIndex !== null ? "Update" : "Add"}</button>

        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Short</th>
              <th>Time</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {visible.map((u, i) => (
              <tr key={i}>
                <td>{u.title}</td>
                <td>{u.short}</td>
                <td>{u.time}</td>
                <td>
                  <button onClick={() => editUrl(urls.indexOf(u))}>Edit</button>
                  <button onClick={() => deleteUrl(urls.indexOf(u))}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Pagination
          total={filtered.length}
          perPage={perPage}
          current={page}
          setCurrent={setPage}
        />
      </div>
    </>
  );
}

export default DashboardPage;
