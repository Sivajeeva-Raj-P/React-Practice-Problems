import React, { useState } from "react";

function App() {
  const [students, setStudents] = useState([]);

  const [name, setName] = useState("");
  const [roll, setRoll] = useState("");
  const [studentClass, setStudentClass] = useState("");

  const [search, setSearch] = useState("");

  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editRoll, setEditRoll] = useState("");
  const [editClass, setEditClass] = useState("");

  /* ADD STUDENT */
  const handleSubmit = () => {
    if (name === "" || roll === "" || studentClass === "") {
      alert("All fields are required");
      return;
    }

    const rollExists = students.some(
      (student) => student.roll === roll
    );

    if (rollExists) {
      alert("Roll number must be unique");
      return;
    }

    const newStudent = {
      id: students.length + 1,
      name,
      roll,
      class: studentClass,
    };

    setStudents([...students, newStudent]);
    setName("");
    setRoll("");
    setStudentClass("");
  };

  /* DELETE STUDENT */
  const deleteStudent = (id) => {
    setStudents(students.filter((student) => student.id !== id));
  };

  /* SAVE EDIT */
  const saveEdit = (id) => {
    if (editName === "" || editRoll === "" || editClass === "") {
      alert("All fields are required");
      return;
    }

    const rollExists = students.some(
      (student) => student.roll === editRoll && student.id !== id
    );

    if (rollExists) {
      alert("Roll number must be unique");
      return;
    }

    setStudents(
      students.map((student) =>
        student.id === id
          ? {
              ...student,
              name: editName,
              roll: editRoll,
              class: editClass,
            }
          : student
      )
    );

    setEditId(null);
  };

  /* SEARCH FILTER */
  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: "20px" }}>
      <h2>🎓 Student List Management App</h2>

      {/* ADD STUDENT FORM */}
      <div>
        <input
          type="text"
          placeholder="Student Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Roll Number"
          value={roll}
          onChange={(e) => setRoll(e.target.value)}
        />

        <input
          type="text"
          placeholder="Class (e.g., 10A)"
          value={studentClass}
          onChange={(e) => setStudentClass(e.target.value)}
        />

        <button onClick={handleSubmit}>Add Student</button>
      </div>

      <br />

      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search by student name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <br /><br />

      {/* STUDENT TABLE */}
      {filteredStudents.length === 0 ? (
        <p>No students found</p>
      ) : (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Roll No</th>
              <th>Class</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredStudents.map((student) => (
              <tr key={student.id}>
                <td>{student.id}</td>

                <td>
                  {editId === student.id ? (
                    <input
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                    />
                  ) : (
                    student.name
                  )}
                </td>

                <td>
                  {editId === student.id ? (
                    <input
                      value={editRoll}
                      onChange={(e) => setEditRoll(e.target.value)}
                    />
                  ) : (
                    student.roll
                  )}
                </td>

                <td>
                  {editId === student.id ? (
                    <input
                      value={editClass}
                      onChange={(e) => setEditClass(e.target.value)}
                    />
                  ) : (
                    student.class
                  )}
                </td>

                <td>
                  {editId === student.id ? (
                    <>
                      <button onClick={() => saveEdit(student.id)}>
                        Save
                      </button>
                      <button onClick={() => setEditId(null)}>
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => {
                          setEditId(student.id);
                          setEditName(student.name);
                          setEditRoll(student.roll);
                          setEditClass(student.class);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteStudent(student.id)}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;
