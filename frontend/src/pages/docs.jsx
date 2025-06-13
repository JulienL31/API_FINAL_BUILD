import React, { useEffect, useState } from 'react';
import api from '../utils/api';

function Docs() {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    api.get('/docs')
      .then((res) => setDocs(res.data))
      .catch(() => {});
  }, []);

  return (
    <div>
      <h2 className="title">Docs</h2>
      {/* TODO: Ajouter UI pour gérer les documents */}
    </div>
  );
}

export default Docs;
