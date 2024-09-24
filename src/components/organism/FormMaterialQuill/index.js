import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const FormMaterialQuill = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, content });
    setTitle('');
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit} className="form-group shadow p-4 rounded" style={{ backgroundColor: '#f8f9fa' }}>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">
          <strong>Material Title</strong>
        </label>
        <input
          type="text"
          id="title"
          className="form-control"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter material title"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="content" className="form-label">
          <strong>Material Content</strong>
        </label>
        <ReactQuill
          theme="snow"
          value={content}
          onChange={setContent}
          placeholder="Type your material content here..."
          style={{ height: '200px', marginBottom: '50px' }}
        />
      </div>

      <div className="text-center">
        <button type="submit" className="btn btn-success px-4">Add Material</button>
      </div>
    </form>
  );
};

export default FormMaterialQuill;
