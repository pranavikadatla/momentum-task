import React, { useState } from 'react';
import Graph from '../components/Graph';
import Dependencies from '../components/Dependencies';
import ConfigForm from '../components/ConfigForm';

const Home = () => {
  const [flow] = useState('flow name');
  const [selectedDeps, setSelectedDeps] = useState([]);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
      <Graph />
      <div>
        <Dependencies flow={flow} selectedDeps={selectedDeps} setSelectedDeps={setSelectedDeps} />
        <ConfigForm flow={flow} selectedDeps={selectedDeps} />
      </div>
    </div>
  );
};

export default Home;
