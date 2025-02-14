import React, { useState, useContext, useEffect } from "react";
import AppContext from "../../state/AppContext";
import { useNavigate } from "react-router-dom";

const FeedbackForm = () => {
    const [rating, setRating] = useState("");
    const [description, setDescription] = useState("");
    const globalState = useContext(AppContext);
    const navigate = useNavigate();

    useEffect(() => {
        globalState.project.emitter.removeAllListeners("GET_USERS_SUCCESS");
        globalState.project.emitter.addListener("GET_USERS_SUCCESS", () => {
            navigate("/projects");
        });
    }, []);

    return (
        <div>
            <h1>Feedback Form</h1>
            <input
                type="number"
                placeholder="rating"
                value={rating}
                min="1"
                max="5"
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type="text"
                placeholder="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <button
                onClick={() => {
                    globalState.feedback.createOne(globalState, {
                        rating,
                        description,
                    });
                }}
            >
                Create
            </button>
        </div>
    );
};

export default ProjectForm;
