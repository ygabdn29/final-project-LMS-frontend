import React, { useState } from 'react';

const FormSubmission = ({ onSubmit }) => {
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (answer.trim() === '') {
      setError('Answer is required');
      return;
    }

    onSubmit({ answer });
    setAnswer('');
    setError('');
  };

  return (
    <form onSubmit={handleSubmit} className="shadow p-4 rounded bg-light">
      <div className="mb-3">
        <label htmlFor="answer" className="form-label">
          <strong>Answer</strong>
        </label>
        <textarea
          id="answer"
          className={`form-control ${error ? 'is-invalid' : ''}`}
          rows="10"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Type your answer here..."
          required
        />
      </div>
      <div className="text-end">
        <button type="submit" className="btn btn-success px-4">Submit Answer</button>
      </div>
    </form>
  );
};

export default FormSubmission;
