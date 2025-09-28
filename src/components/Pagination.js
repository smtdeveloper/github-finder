import React from 'react';

const Pagination = ({ page, keyword, pageSize, searchUsers }) => {
  return (
    <div className="d-flex justify-content-between mt-3">
      <button 
        className="btn btn-outline-primary"
        disabled={page === 1}
        onClick={() => searchUsers(keyword, page - 1, pageSize)}
      >
        ← Önceki
      </button>

      <button 
        className="btn btn-outline-primary"
        onClick={() => searchUsers(keyword, page + 1, pageSize)}
      >
        Sonraki →
      </button>
    </div>
  );
};

export default Pagination;
