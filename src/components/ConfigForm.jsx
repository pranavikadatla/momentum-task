import React, { useEffect, useState } from 'react';
import { fetchConfig, saveConfig } from '../api/api';

const ConfigForm = ({ flow, selectedDeps }) => {
  const [isDbMocked, setIsDbMocked] = useState(false);
  const [dbConfig, setDbConfig] = useState({ username: '', password: '' });

  useEffect(() => {
    const loadConfig = async () => {
      const data = await fetchConfig(flow);
      setIsDbMocked(data.is_db_mocked);
      setDbConfig(data.db_config);
    };
    loadConfig();
  }, [flow]);

  const handleSubmit = async () => {
    await saveConfig({ flow, entities_to_mock: selectedDeps, is_db_mocked: isDbMocked, db_config: dbConfig });
  };

  return (
    <div>
      <h3>Configuration</h3>
      <label>
        <input type="checkbox" checked={isDbMocked} onChange={() => setIsDbMocked(!isDbMocked)} />
        I want to mock the database
      </label>

      <fieldset disabled={isDbMocked}>
        <label>Username</label>
        <input type="text" value={dbConfig.username} onChange={(e) => setDbConfig({ ...dbConfig, username: e.target.value })} />

        <label>Password</label>
        <input type="password" value={dbConfig.password} onChange={(e) => setDbConfig({ ...dbConfig, password: e.target.value })} />
      </fieldset>

      <button onClick={handleSubmit}>Save</button>
    </div>
  );
};

export default ConfigForm;
