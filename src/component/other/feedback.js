import React, { useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import './feedback.css';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
const FeedbackList = ({ userId, onDelete, onUpdate, onPost }) => {
    const [showModal, setShowModal] = useState(false);
    const [selectedFeedback, setSelectedFeedback] = useState(null);
    const [newFeedback, setNewFeedback] = useState('');
    const [newRating, setNewRating] = useState(0);
    const [feedbacks, setFeedbacks] = useState([]);
    const [User, setUser] = useState();
    const [selectedRating, setSelectedRating] = useState(null); // New state for selected feedback type

    useEffect(() => {
        getFeedback();
        getUserData();
    }, []);

    const calculateAverageRating = (filteredFeedbacks) => {
        if (filteredFeedbacks.length === 0) {
            return 0;
        }
        const totalRating = filteredFeedbacks.reduce((acc, feedback) => acc + parseInt(feedback.rating), 0);
        return totalRating / filteredFeedbacks.length;
    };

    const getFeedback = async () => {
        try {
            const response = await fetch("https://itp-movie-backend.vercel.app/feedback");
            const data = await response.json();
            setFeedbacks(data);
        } catch (error) {
            console.error("Error fetching feedback:", error);
        }
    };

    const handleClose = () => {
        setShowModal(false);
    };

    const handleEdit = (feedback) => {
        if (feedback.userId === User._id) {
            setSelectedFeedback(feedback);
            setShowModal(true);
        } else {
            console.error("Unauthorized access to edit feedback.");
        }
    };

    const handleDelete = async (id, feedback) => {
        if (feedback.userId === User._id) {
            try {
                await fetch(`https://itp-movie-backend.vercel.app/feedback/${id}`, {
                    method: 'DELETE'
                });
                setFeedbacks(feedbacks.filter((feedback) => feedback._id !== id));
                onDelete && onDelete(id);
            } catch (error) {
                console.error("Error deleting feedback:", error);
            }
        } else {
            console.error("Unauthorized access to edit feedback.");
        }
    };

    const handleUpdate = async () => {
        try {
            const response = await fetch(`https://itp-movie-backend.vercel.app/feedback/${selectedFeedback._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(selectedFeedback)
            });
            const data = await response.json();
            if (data.message === 'Feedback updated successfully') {
                setFeedbacks(feedbacks.map((feedback) =>
                    feedback._id === selectedFeedback._id ? selectedFeedback : feedback
                ));
                setShowModal(false);
                onUpdate && onUpdate(selectedFeedback);
            }
        } catch (error) {
            console.error("Error updating feedback:", error);
        }
    };

    const handlePost = async () => {
        try {
            const response = await fetch('https://itp-movie-backend.vercel.app/feedback', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userId: User._id,
                    feedback: newFeedback,
                    name: User.name,
                    email: User.email,
                    rating: newRating,
                    type: selectedRating // Sending the selected rating type
                })
            });
            const data = await response.json();
            if (response.ok) {
                setFeedbacks([...feedbacks, data.feedback]);
                setNewFeedback('');
                setNewRating(0);
                onPost && onPost(data.feedback);
            } else {
                console.error("Failed to post feedback:", data.message);
            }
        } catch (error) {
            console.error("Error posting feedback:", error);
        }
    };
    
    const getUserData = async () => {
        try {
            const response = await fetch("https://itp-movie-backend.vercel.app/user/getuser", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include'
            });
            const data = await response.json();
            if (data.ok) {
                setUser(data.data);
            } else {
                console.log(data);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const filteredFeedbacks = selectedRating
        ? feedbacks.filter(feedback => feedback.type === selectedRating)
        : feedbacks;

    return (
        <div className='feed'>
            <h2>Feedback List</h2>
            <div className="radio-buttons">
                <label><input type="radio" name="rating" value="Theatre" onChange={() => setSelectedRating("Theatre")} />Theatre</label>
                <label><input type="radio" name="rating" value="Movie" onChange={() => setSelectedRating("Movie")} />Movie</label>
                <label><input type="radio" name="rating" value="Food" onChange={() => setSelectedRating("Food")} />Food</label>
            </div>
            <div className="feedback-form">
                <Form.Group controlId="feedbackForm.ControlTextarea1">
                    <Form.Label>Your Feedback</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        value={newFeedback}
                        onChange={(e) => setNewFeedback(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="ratingForm.ControlSelect1">
                    <Form.Label>Rating</Form.Label>
                    <Form.Control
                        as="select"
                        value={newRating}
                        onChange={(e) => setNewRating(parseInt(e.target.value))}
                    >
                        {[0,1, 2, 3, 4, 5].map((rating) => (
                            <option key={rating} value={rating}>{rating}</option>
                        ))}
                    </Form.Control>
                </Form.Group>
                <Button variant="primary" onClick={handlePost}>Submit Feedback</Button>
            </div>
            <div className="text-center"> {/* Align feedback list to center */}
                <h2>Feedback List</h2>
                {selectedRating && <p>Selected Feedback Type: {selectedRating}</p>}
                <p>
            Overall Rating Average: 
            {Array(5).fill().map((_, index) => (
                <span key={index}>
                    {calculateAverageRating(filteredFeedbacks) >= index + 1 ?
                        <AiFillStar style={{ color: 'red' }} className="FillStar" />
                        :
                        calculateAverageRating(filteredFeedbacks) >= index + 0.5 ?
                            <AiFillStar style={{ color: 'red' }} className="FillStar" />
                            :
                            <AiOutlineStar style={{ color: 'red' }} className="OutlineStar" />
                    }
                </span>
            ))}
            
        </p>
                {filteredFeedbacks.length > 0 ? (
                    <div className="feedback-list">
                        {filteredFeedbacks.map((feedback) => (
                            <div key={feedback._id} className="feedback-item">
                                <p>{feedback.name}</p>
                                <p>                       
                       {Array(5).fill().map((_, index) =>
    <span key={index}>
        {feedback.rating >= index + 1 ?
            <AiFillStar style={{ color: 'orange' }} className="FillStar" />
            :
            <AiOutlineStar style={{ color: 'orange' }} onClick={() => setNewRating(index + 1)} className="OutlineStar" />
        }
    </span>
)}
</p>
<p>{feedback.feedback}</p>
{User && User.name === feedback.name && (
    <React.Fragment>
        <Button variant="info" className="mx-1" onClick={() => handleEdit(feedback)}>
            <FontAwesomeIcon icon={faEdit} /> Edit
        </Button>
        <Button variant="danger" className="mx-1" onClick={() => handleDelete(feedback._id, feedback)}>
            Delete
        </Button>
    </React.Fragment>
)}

                        
                     </div>
                        ))}
                    </div>
                ) : (
                    <p>No feedback yet.</p>
                )}
            </div>
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Feedback</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="editFeedbackForm.ControlTextarea1">
                        <Form.Label>Your Feedback</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            value={selectedFeedback?.feedback}
                            onChange={(e) => setSelectedFeedback({ ...selectedFeedback, feedback: e.target.value })}
                        />
                    </Form.Group>
                    <Form.Group controlId="editRatingForm.ControlSelect1">
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                            as="select"
                            value={selectedFeedback?.rating}
                            onChange={(e) => setSelectedFeedback({ ...selectedFeedback, rating: e.target.value })}
                        >
                            {[0,1, 2, 3, 4, 5].map((rating) => (
                                <option key={rating} value={rating}>{rating}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                    <Button variant="primary" onClick={handleUpdate}>Save Changes</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default FeedbackList;
