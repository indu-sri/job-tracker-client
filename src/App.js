import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");
  const [date, setDate] = useState("");
  const [link, setLink] = useState("");
  const [jobs, setJobs] = useState([]);
  const [filterStatus, setFilterStatus] = useState("All");

  const fetchJobs = async () => {
    const res = await axios.get("http://localhost:5000/api/jobs");
    setJobs(res.data);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleAddJob = async () => {
    if (!company || !role || !status || !date) return;

    await axios.post("http://localhost:5000/api/jobs", {
      company,
      role,
      status,
      date,
      link,
    });

    setCompany("");
    setRole("");
    setStatus("");
    setDate("");
    setLink("");

    fetchJobs();
  };

  const handleStatusChange = async (id, newStatus) => {
    await axios.put(`http://localhost:5000/api/jobs/${id}`, {

      status: newStatus,
    });
    fetchJobs();
  };

  const filteredJobs =
    filterStatus === "All"
      ? jobs
      : jobs.filter((job) => job.status === filterStatus);

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h1>🎯 Student Job Tracker</h1>

      <input
        placeholder="Company"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      />
      <input
        placeholder="Role"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      />
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="">Select status</option>
        <option value="Applied">Applied</option>
        <option value="Interview">Interview</option>
        <option value="Offer">Offer</option>
        <option value="Rejected">Rejected</option>
      </select>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <input
        placeholder="Link to application"
        value={link}
        onChange={(e) => setLink(e.target.value)}
      />
      <button onClick={handleAddJob}>Add Job</button>

      <h2>📋 Tracked Jobs</h2>

      {/* Status Filter */}
      <label>Filter by Status: </label>
      <select
        value={filterStatus}
        onChange={(e) => setFilterStatus(e.target.value)}
      >
        <option value="All">All</option>
        <option value="Applied">Applied</option>
        <option value="Interview">Interview</option>
        <option value="Offer">Offer</option>
        <option value="Rejected">Rejected</option>
      </select>

      <ul>
        {filteredJobs.map((job) => (
          <li key={job._id}>
            <strong>{job.company}</strong> - {job.role} - {" "}
            <a href={job.link} target="_blank" rel="noopener noreferrer">
              Link
            </a>{" "}
            <br />
            Status:{" "}
            <select
              value={job.status}
              onChange={(e) => handleStatusChange(job._id, e.target.value)}
            >
              <option value="Applied">Applied</option>
              <option value="Interview">Interview</option>
              <option value="Offer">Offer</option>
              <option value="Rejected">Rejected</option>
            </select>
            <br />
            Date: {job.date}
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
