import React, { useState } from 'react';

const FormSubmission = ({ onSubmit }) => {
  const [answer, setAnswer] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ answer });
    setAnswer('');
  };

  return (
    <form onSubmit={handleSubmit} className="form-group">
      <div className="mb-3">
        <label htmlFor="answer" className="form-label">Answer:</label>
        <textarea
          id="answer"
          className="form-control"
          rows="5"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">Submit Answer</button>
    </form>
  );
};

export default FormSubmission;
