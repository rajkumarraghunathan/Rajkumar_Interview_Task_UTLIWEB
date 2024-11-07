import React, { useState } from 'react';
import { FaPlus, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const DynamicForm = ({ setSavedForm }) => {
    const [questions, setQuestions] = useState([
        { questionId: 1, type: 'MCQ', questionText: '', options: ['', ''], preference: 'radio' }
    ]);

    const addQuestion = () => {
        setQuestions([...questions, { questionId: questions.length + 1, type: 'MCQ', questionText: '', options: ['', ''], preference: 'radio' }]);
    };

    const deleteQuestion = (index) => {
        const updatedQuestions = questions.filter((_, qIndex) => qIndex !== index);
        setQuestions(updatedQuestions);
    };

    const changeQuestionType = (index, newType) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index].type = newType;
        if (newType === 'Text Area') {
            delete updatedQuestions[index].options;
            delete updatedQuestions[index].preference;
        } else {
            updatedQuestions[index].options = ['', ''];
            updatedQuestions[index].preference = 'radio';
        }
        setQuestions(updatedQuestions);
    };

    const changePreference = (index, newPreference) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index].preference = newPreference;
        setQuestions(updatedQuestions);
    };

    const updateQuestionText = (index, text) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index].questionText = text;
        setQuestions(updatedQuestions);
    };

    const addOption = (index) => {
        const updatedQuestions = [...questions];
        if (updatedQuestions[index].options.length < 8) {
            updatedQuestions[index].options.push('');
            setQuestions(updatedQuestions);
        }
    };

    const deleteOption = (qIndex, oIndex) => {
        const updatedQuestions = [...questions];
        updatedQuestions[qIndex].options.splice(oIndex, 1);
        setQuestions(updatedQuestions);
    };

    const saveForm = () => {
        const validQuestions = questions.filter(
            (q) =>
                q.questionText &&
                (q.type === 'MCQ' ? q.options.filter(Boolean).length >= 2 : true)
        );

        if (validQuestions.length >= 2) {
            const formStructure = {
                formTitle: 'Untitled Form',
                questions: questions.map((q) => ({
                    questionId: q.questionId,
                    type: q.type,
                    questionText: q.questionText,
                    preference: q.preference,
                    options: q.type === 'MCQ' ? q.options.map((text, i) => ({ optionId: i + 1, optionText: text })) : undefined
                }))
            };
            setSavedForm(formStructure);
            alert('Form saved successfully!');
        } else {
            alert('Please fill at least 2 questions properly.');
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Dynamic Form</h1>
            <nav>
                <Link to="/preview" className="btn btn-secondary mb-3">Go to Preview</Link>
            </nav>
            <div className="form-container">
                {questions.map((q, index) => (
                    <div key={q.questionId} className="mb-4 p-4 border rounded">
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter your question"
                                value={q.questionText}
                                onChange={(e) => updateQuestionText(index, e.target.value)}
                            />
                        </div>
                        <div className="form-group p-3">
                            <select
                                className="form-control p-2 fw-bold"
                                value={q.type}
                                onChange={(e) => changeQuestionType(index, e.target.value)}
                            >
                                <option value="MCQ">MCQ</option>
                                <option value="Text Area">Text Area</option>
                            </select>
                        </div>

                        {q.type === 'MCQ' && (
                            <>
                                <div className="form-group p-3">
                                    <label className=''>Choose Question Type:</label>
                                    <select
                                        className="form-control p-2 fw-bold"
                                        value={q.preference}
                                        onChange={(e) => changePreference(index, e.target.value)}
                                    >
                                        <option value="radio">Single Choice (Radio)</option>
                                        <option value="checkbox">Multiple Choice (Checkbox)</option>
                                    </select>
                                </div>

                                {q.options.map((option, oIndex) => (
                                    <div className="form-group d-flex align-items-center p-3" key={oIndex}>
                                        {q.preference === 'radio' ? (
                                            <input type="radio" name={`question-${index}`} disabled className="mr-2" />
                                        ) : (
                                            <input type="checkbox" disabled className="m-2" />
                                        )}
                                        <input
                                            type="text"
                                            className="form-control m-2"
                                            placeholder={`Option ${oIndex + 1}`}
                                            value={option}
                                            onChange={(e) => {
                                                const updatedQuestions = [...questions];
                                                updatedQuestions[index].options[oIndex] = e.target.value;
                                                setQuestions(updatedQuestions);
                                            }}
                                        />
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => deleteOption(index, oIndex)}
                                        >
                                            <FaTrash />
                                        </button>
                                    </div>
                                ))}

                            </>
                        )}

                        {q.type === 'Text Area' && (
                            <textarea
                                className="form-control"
                                maxLength="2000"
                                placeholder="Enter text here..."
                            />
                        )}

                        <div className="d-flex justify-content-between mt-3">
                            <button className="btn btn-secondary" onClick={() => addOption(index)}>
                                <FaPlus /> Add Option
                            </button>
                            <button className="btn btn-danger" onClick={() => deleteQuestion(index)}>
                                <FaTrash /> Delete Question
                            </button>
                        </div>
                    </div>
                ))}
                <div className="d-flex justify-content-between mt-4">
                    <button className="btn btn-primary" onClick={addQuestion}>
                        <FaPlus /> Add Question
                    </button>
                    <button className="btn btn-success" onClick={saveForm}>
                        Save Form
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DynamicForm;
