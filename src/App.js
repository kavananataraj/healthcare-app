import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";

const patientsData = [
  { id: 1, name: "John Doe" },
  { id: 2, name: "Alice Smith" },
  { id: 3, name: "Rahul Kumar" },
  { id: 4, name: "Sneha Reddy" },
  { id: 5, name: "Arjun Patel"}, 
];

function App() {
  const [heartRate, setHeartRate] = useState(80);
  const [bp, setBp] = useState("120/80");
  const [dataPoints, setDataPoints] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedPatient, setSelectedPatient] = useState(null);1

  useEffect(() => {
    const interval = setInterval(() => {
      const newHR = Math.floor(Math.random() * 80) + 60;

      // ✅ CORRECT BP LINE
      const newBP = `${100 + Math.floor(Math.random() * 40)}/${60 + Math.floor(Math.random() * 30)}`;

      setHeartRate(newHR);
      setBp(newBP);

      if (newHR > 100) {
        console.log("Critical condition");
      }

      setDataPoints((prev) => [...prev.slice(-9), newHR]);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const isCritical = heartRate > 100;

  const chartData = {
    labels: dataPoints.map((_, i) => i + 1),
    datasets: [
      {
        label: "Heart Rate",
        data: dataPoints,
        borderWidth: 2,
      },
    ],
  };

  const filteredPatients = patientsData.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ display: "flex", fontFamily: "Arial" }}>
      {/* Sidebar */}
      <div
        style={{
          width: "200px",
          background: "#1e3a8a",
          color: "white",
          height: "100vh",
          padding: "20px",
        }}
      >
        <h2>🏥 HealthApp</h2>
        <p>Dashboard</p>
        <p>Patients</p>
        <p>Reports</p>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: "20px" }}>
        <h1>Healthcare Dashboard</h1>

        {heartRate > 100 && (
        <div style={{
            background: "red",
            color: "white", 
            padding: "10px", 
            borderRadius: "5px", 
            marginBottom: "10px", 
          }}
        >
          ⚠️ Critical Alert: High Heart Rate
        </div>
        )}

        {/* Vitals */}
        <div style={{ display: "flex", gap: "20px" }}>
          <div
            style={{
              background: "#f3f4f6",
              padding: "15px",
              borderRadius: "10px",
            }}
          >
            <h3>❤️ Heart Rate</h3>
            <p>{heartRate} bpm</p>
          </div>

          <div
            style={{
              background: "#f3f4f6",
              padding: "15px",
              borderRadius: "10px",
            }}
          >
            <h3>🩺 Blood Pressure</h3>
            <p>{bp}</p>
          </div>
        </div>

        {/* Chart */}
        <div style={{ width: "500px", marginTop: "20px" }}>
          <Line data={chartData} />
        </div>

        {/* Patients */}
        <div style={{ marginTop: "30px" }}>
          <h2>Patients</h2>

          <input
            type="text"
            placeholder="Search patient..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ padding: "8px", marginBottom: "10px" }}
          />
          { filteredPatients.map((p)=>(
            <div
            key={p.id}
            onClick={()=>
          setSelectedPatient(p)}
         style={{
  background: "#e5e7eb",
  padding: "10px",
  marginBottom: "5px",
  borderRadius: "5px",
  cursor: "pointer"
}}
       >
        {p.name}
        </div>
     ))}
{selectedPatient && ( 
  <div style={{
    marginTop: "20px",
    padding: "15px",
    border: "1px solid gray",
    borderRadius: "10px",
    background: "#f9fafb"
  }}>
    <h3>Patient Details</h3>
    <p><b>Name:</b> {selectedPatient.name}</p>
    <p><b>Heart Rate:</b> {heartRate} bpm</p>
    <p><b>Blood Pressure:</b> {bp}</p>
    <p>
      <b>Status:</b> {heartRate > 100 ? "CRITICAL ⚠️" : "NORMAL ✅"}
    </p>
  </div>
)}
        </div>
      </div>
    </div>
  );
}

export default App; 