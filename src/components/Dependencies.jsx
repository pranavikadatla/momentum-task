import React, { useEffect, useState } from 'react';
import { fetchDependencies } from '../api/api';

const Dependencies = ({ flow, selectedDeps, setSelectedDeps }) => {
  const [dependencies, setDependencies] = useState([]);

  useEffect(() => {
    const loadDeps = async () => {
      const data = await fetchDependencies(flow);
      setDependencies(data);
    };
    loadDeps();
  }, [flow]);

  const toggleDependency = (dep) => {
    setSelectedDeps((prev) =>
      prev.includes(dep) ? prev.filter((d) => d !== dep) : [...prev, dep]
    );
  };

  return (
    <div>
      <h3>Dependencies</h3>
      {dependencies.map((dep) => (
        <div key={dep}>
          <input type="checkbox" checked={selectedDeps.includes(dep)} onChange={() => toggleDependency(dep)} />
          <label>{dep}</label>
        </div>
      ))}
    </div>
  );
};

export default Dependencies;
