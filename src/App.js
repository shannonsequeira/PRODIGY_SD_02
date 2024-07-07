import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Alert, Card } from 'react-bootstrap';
import Confetti from 'react-confetti';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
    const [guess, setGuess] = useState('');
    const [generatedNumber, setGeneratedNumber] = useState(Math.floor(Math.random() * 100) + 1);
    const [feedback, setFeedback] = useState('');
    const [attempts, setAttempts] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [confetti, setConfetti] = useState(false);

    const handleInputChange = (event) => {
        setGuess(event.target.value);
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        const userGuess = parseInt(guess);

        if (isNaN(userGuess)) {
            setFeedback('Please enter a valid number.');
        } else if (userGuess < generatedNumber) {
            setFeedback('Too low!');
            setAttempts(attempts + 1);
        } else if (userGuess > generatedNumber) {
            setFeedback('Too high!');
            setAttempts(attempts + 1);
        } else {
            setFeedback(`Correct! It took you ${attempts + 1} attempts.`);
            setGameOver(true);
            setConfetti(true);
        }
    };

    const handleReset = () => {
        setGuess('');
        setGeneratedNumber(Math.floor(Math.random() * 100) + 1);
        setFeedback('');
        setAttempts(0);
        setGameOver(false);
        setConfetti(false);
    };

    useEffect(() => {
        if (gameOver) {
            const timer = setTimeout(() => setConfetti(false), 5000);
            return () => clearTimeout(timer);
        }
    }, [gameOver]);

    return (
        <Container className="App">
            {confetti && <Confetti />}
            <Card className="guessing-card">
                <Card.Body>
                    <Card.Title className="card-title-center">Guessing Game</Card.Title>
                    <Form onSubmit={handleFormSubmit}>
                        <Form.Group controlId="formGuess">
                            <Form.Label>Enter your guess:</Form.Label>
                            <Form.Control
                                type="number"
                                value={guess}
                                onChange={handleInputChange}
                                disabled={gameOver}
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" disabled={gameOver} className="submit-button">
                            Submit
                        </Button>
                        {gameOver && (
                            <Button variant="secondary" onClick={handleReset} className="reset-button">
                                Play Again
                            </Button>
                        )}
                    </Form>
                    {feedback && <Alert variant="info" className="feedback-alert">{feedback}</Alert>}
                </Card.Body>
            </Card>
        </Container>
    );
}

export default App;
