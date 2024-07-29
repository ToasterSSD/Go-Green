import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Grid, IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import http from '../http';

const questions = [
    {
        question: "How is hazardous waste disposed?",
        options: [
            "Dropped off through plastic recycling programmes",
            "Dropped off at designated locations"
        ],
        answer: 1
    },
    {
        question: "Which is a benefit of carbon trading?",
        options: [
            "Companies can sell their excess allowances to companies facing higher reduction costs",
            "The financial incentives provided allow companies to invest in state of the art technologies"
        ],
        answer: 0
    },
    {
        question: "Which is one of the main types of waste?",
        options: [
            "Fruits and vegetables",
            "Construction and Demolition"
        ],
        answer: 1
    },
    {
        question: "What does household waste include?",
        options: [
            "Paper",
            "Cardboard"
        ],
        answer: 0
    },
    {
        question: "Which is a challenge in waste management?",
        options: [
            "Incinerating waste",
            "Encouraging public awareness and participation"
        ],
        answer: 1
    }
];

function QuizPage() {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [showAnswer, setShowAnswer] = useState(false);
    const [score, setScore] = useState(0);
    const [quizFinished, setQuizFinished] = useState(false);
    const [savedScores, setSavedScores] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchSavedScores();
        resetQuiz();
    }, []);

    const fetchSavedScores = () => {
        http.get('/quiz/scores')
            .then((res) => {
                setSavedScores(res.data);
            })
            .catch((err) => {
                console.error(err);
            });
    };

    const resetQuiz = () => {
        setCurrentQuestion(0);
        setSelectedOption(null);
        setShowAnswer(false);
        setScore(0);
        setQuizFinished(false);
    };

    const handleOptionClick = (index) => {
        setSelectedOption(index);
        setShowAnswer(true);

        if (index === questions[currentQuestion].answer) {
            setScore((prevScore) => prevScore + 1);
        }
    };

    const handleNextQuestion = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setSelectedOption(null);
            setShowAnswer(false);
        } else {
            setQuizFinished(true);
        }
    };

    const handleSaveScore = () => {
        const userName = prompt("Enter your name:");
        if (userName) {
            http.post('/quiz/save', { username: userName, score })
                .then(() => {
                    fetchSavedScores();
                })
                .catch((err) => {
                    console.error(err);
                });
        }
    };

    const handleDeleteScore = (id) => {
        http.delete(`/quiz/${id}`)
            .then(() => {
                fetchSavedScores();
            })
            .catch((err) => {
                console.error(err);
            });
    };

    const handleRestartQuiz = () => {
        resetQuiz();
    };

    const handleExitQuiz = () => {
        navigate('/public-learning');
    };

    return (
        <Box sx={{ my: 4 }}>
            {!quizFinished ? (
                <Box sx={{ my: 4 }}>
                    <Typography variant="h5" sx={{ my: 2 }}>
                        Quiz 1
                    </Typography>
                    <Typography variant="h6" sx={{ my: 2 }}>
                        Q{currentQuestion + 1}. {questions[currentQuestion].question}
                    </Typography>
                    <Grid container spacing={2}>
                        {questions[currentQuestion].options.map((option, index) => (
                            <Grid item xs={12} key={index}>
                                <Button
                                    variant="outlined"
                                    fullWidth
                                    onClick={() => handleOptionClick(index)}
                                    sx={{
                                        color: 'black',  // Text color
                                        backgroundColor:
                                            showAnswer && index === questions[currentQuestion].answer
                                                ? 'lightgreen'
                                                : showAnswer && index === selectedOption
                                                ? 'lightcoral'
                                                : 'white'
                                    }}
                                >
                                    {option}
                                </Button>
                            </Grid>
                        ))}
                    </Grid>
                    {showAnswer && (
                        <Button variant="contained" sx={{ mt: 2 }} onClick={handleNextQuestion}>
                            Next
                        </Button>
                    )}
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                        <Button variant="contained" onClick={handleExitQuiz}>
                            Exit
                        </Button>
                    </Box>
                </Box>
            ) : (
                <Box sx={{ my: 4 }}>
                    <Typography variant="h5" sx={{ my: 2 }}>
                        Quiz 1
                    </Typography>
                    <Typography variant="h6" sx={{ my: 2 }}>
                        You scored {score} out of {questions.length}!
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                        <Box>
                            <Button variant="contained" onClick={handleRestartQuiz}>
                                Play again
                            </Button>
                            <Button variant="contained" sx={{ ml: 2 }} onClick={handleSaveScore}>
                                Save your score
                            </Button>
                        </Box>
                        <Button variant="contained" onClick={handleExitQuiz}>
                            Exit
                        </Button>
                    </Box>
                    {savedScores.length > 0 && (
                        <Box sx={{ mt: 4 }}>
                            <Typography variant="h6" sx={{ mb: 2 }}>Ranking</Typography>
                            <Grid container spacing={1} sx={{ border: '2px solid #93DAAB', borderRadius: '4px', padding: '8px' }}>
                                <Grid item xs={3}><strong>Ranking</strong></Grid>
                                <Grid item xs={3}><strong>Name</strong></Grid>
                                <Grid item xs={3}><strong>Score</strong></Grid>
                                <Grid item xs={3}><strong>Action</strong></Grid>
                                {savedScores
                                    .sort((a, b) => b.score - a.score)
                                    .map((scoreEntry, index) => (
                                        <React.Fragment key={scoreEntry.id}>
                                            <Grid item xs={3}>{index + 1}</Grid>
                                            <Grid item xs={3}>{scoreEntry.username}</Grid>
                                            <Grid item xs={3}>{scoreEntry.score}</Grid>
                                            <Grid item xs={3}>
                                                <IconButton
                                                    color="error"
                                                    onClick={() => handleDeleteScore(scoreEntry.id)}
                                                >
                                                    <Delete />
                                                </IconButton>
                                            </Grid>
                                        </React.Fragment>
                                    ))}
                            </Grid>
                        </Box>
                    )}
                </Box>
            )}
        </Box>
    );
}

export default QuizPage;











