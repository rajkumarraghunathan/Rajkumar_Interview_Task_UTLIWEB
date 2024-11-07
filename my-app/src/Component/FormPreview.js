import React, { useState, useEffect } from 'react';
import { FaRegPaperPlane, FaUndo } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const FormPreview = ({ savedForm, setSavedForm }) => {
    // Initialize the form state before any conditional rendering
    const [formResponses, setFormResponses] = useState([]);

    useEffect(() => {
        if (savedForm) {
            const initialResponses = savedForm.questions.map((q) => ({
                questionId: q.questionId,
                answer: q.type === 'MCQ' ? (q.preference === 'checkbox' ? [] : '') : ''
            }));
            setFormResponses(initialResponses);
        }
    }, [savedForm]);

    // If no form is saved, display a message early
    if (!savedForm) {
        return (
            <div className="container mt-5">
                <h1>Form Preview</h1>
                <p>No form saved yet.</p>
            </div>
        );
    }

    const { formTitle, questions } = savedForm;

    const handleChange = (questionId, answer) => {
        const updatedResponses = [...formResponses];
        const questionIndex = updatedResponses.findIndex((r) => r.questionId === questionId);
        if (questionIndex !== -1) {
            updatedResponses[questionIndex].answer = answer;
            setFormResponses(updatedResponses);
        }
    };

    const handleClearForm = () => {
        const resetResponses = questions.map((q) => ({
            questionId: q.questionId,
            answer: q.type === 'MCQ' ? (q.preference === 'checkbox' ? [] : '') : ''
        }));
        setFormResponses(resetResponses);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Form submitted successfully!');
    };

    return (
        <div className="container mt-5">
            <h1>{formTitle}</h1>
            <nav className="mb-4">
                <Link to="/" className="btn btn-secondary">
                    Edit Form
                </Link>
            </nav>
            <form onSubmit={handleSubmit}>
                {questions.map((q) => (
                    <div key={q.questionId} className="mb-4 p-3 border rounded">
                        <h5>{q.questionId}.{q.questionText}</h5>

                        {q.type === 'MCQ' && (
                            <div className="form-group p-3">
                                {q.options.map((option, oIndex) => (
                                    <div key={oIndex} className="form-check border rounded p-2">
                                        {q.preference === 'radio' ? (
                                            <input
                                                type="radio"
                                                className="form-check-input"
                                                name={`question-${q.questionId}`}
                                                id={`option-${q.questionId}-${oIndex}`}
                                                checked={formResponses.find((r) => r.questionId === q.questionId)?.answer === option.optionText}
                                                onChange={() => handleChange(q.questionId, option.optionText)}
                                            />
                                        ) : (
                                            <input
                                                type="checkbox"
                                                className="form-check-input"
                                                id={`option-${q.questionId}-${oIndex}`}
                                                checked={formResponses.find((r) => r.questionId === q.questionId)?.answer.includes(option.optionText)}
                                                onChange={(e) => {
                                                    const updatedAnswers = [...formResponses.find((r) => r.questionId === q.questionId)?.answer];
                                                    if (e.target.checked) {
                                                        updatedAnswers.push(option.optionText);
                                                    } else {
                                                        const index = updatedAnswers.indexOf(option.optionText);
                                                        updatedAnswers.splice(index, 1);
                                                    }
                                                    handleChange(q.questionId, updatedAnswers);
                                                }}
                                            />
                                        )}
                                        <label className="form-check-label p-2" htmlFor={`option-${q.questionId}-${oIndex}`}>
                                            {option.optionText}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        )}

                        {q.type === 'Text Area' && (
                            <textarea
                                className="form-control"
                                maxLength="2000"
                                placeholder="Enter text here..."
                                rows="4"
                                value={formResponses.find((r) => r.questionId === q.questionId)?.answer || ''}
                                onChange={(e) => handleChange(q.questionId, e.target.value)}
                            />
                        )}
                    </div>
                ))}
                <div className="d-flex justify-content-between mt-4">
                    <button type="submit" className="btn btn-primary">
                        <FaRegPaperPlane /> Submit Form
                    </button>
                    <button type="button" className="btn btn-warning" onClick={handleClearForm}>
                        <FaUndo /> Clear Form
                    </button>
                </div>
            </form>
        </div>
    );
};

export default FormPreview;
