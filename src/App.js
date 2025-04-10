import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [jobs, setJobs] = useState(() => {
    const saved = localStorage.getItem("jobs");
    return saved ? JSON.parse(saved) : [];
  });

  const [formData, setFormData] = useState({
    company: "",
    role: "",
    status: "",
    appliedDate: "",
    link: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedJobs = [...jobs, formData];
    setJobs(updatedJobs);
    setFormData({
      company: "",
      role: "",
      status: "",
      appliedDate: "",
      link: "",
    });
    localStorage.setItem("jobs", JSON.stringify(updatedJobs));
  };

  const handleDelete = (indexToRemove) => {
    const updatedJobs = jobs.filter((_, index) => index !== indexToRemove);
    setJobs(updatedJobs);
    localStorage.setItem("jobs", JSON.stringify(updatedJobs));
  };

  useEffect(() => {
    localStorage.setItem("jobs", JSON.stringify(jobs));
  }, [jobs]);

  return (
    <div className="App">
      <h1>🎯 Student Job Tracker</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="company"
          placeholder="Company"
          value={formData.company}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="role"
          placeholder="Role"
          value={formData.role}
          onChange={handleChange}
          required
        />
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          required
        >
          <option value="">Select status</option>
          <option value="Applied">Applied</option>
          <option value="Interview">Interview</option>
          <option value="Offer">Offer</option>
          <option value="Rejected">Rejected</option>
        </select>
        <input
          type="date"
          name="appliedDate"
          value={formData.appliedDate}
          onChange={handleChange}
          required
        />
        <input
          type="url"
          name="link"
          placeholder="Link to application"
          value={formData.link}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Job</button>
      </form>

      <h2>📋 Tracked Jobs</h2>
      <ul>
        {jobs.map((job, index) => (
          <li key={index}>
            <strong>{job.company}</strong> - {job.role} ({job.status}) <br />
            📅 {job.appliedDate} | 🔗{" "}
            <a href={job.link} target="_blank" rel="noreferrer">
              View Link
            </a>
            <button
              onClick={() => handleDelete(index)}
              style={{ marginLeft: "10px", color: "red" }}
            >
              ❌ Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
