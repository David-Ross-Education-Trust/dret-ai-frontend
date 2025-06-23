import React from "react";
import { categories } from "./data/reports";
import Layout from "./layout";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-8">Analytics Reports</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <div key={cat.name}>
              <h2 className="font-bold text-lg mb-2">{cat.name}</h2>
              {cat.reports.map((report) => (
                <div
                  key={report.id}
                  onClick={() => navigate(`/report/${report.id}`)}
                  className="bg-white rounded-lg shadow p-4 mb-4 cursor-pointer hover:bg-green-100 border"
                >
                  <span className="font-semibold">{report.name}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}