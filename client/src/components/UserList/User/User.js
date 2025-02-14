import React, { useState, useContext } from "react";
import AppContext from "../../../state/AppContext";
import { useNavigate } from "react-router-dom";

const User = ({ user }) => {
    // const [isEditing, setIsEditing] = useState(false)
    const [email, setEmail] = useState(user.email);
    const [rating, setRating] = useState(user.rating);
    const globalState = useContext(AppContext);
    const navigate = useNavigate();

    return (
        <tr>
            <>
                <td>{user.email}</td>
                <td>{user.rating}</td>
                <td>
                    <button
                        onClick={() => {
                            navigate(`/users/${user.id}/feedbacks`);
                        }}
                    >
                        Feedbacks
                    </button>
                </td>
            </>
        </tr>
    );
};

export default User;
