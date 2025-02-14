import "./UserList.css";
import React, { useContext, useEffect, useState } from "react";
import AppContext from "../../state/AppContext";
import { useNavigate } from "react-router-dom";

import User from "./User";
import Paginator from "../Paginator/Paginator";

const UserList = () => {
    const globalState = useContext(AppContext);
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [filterField, setFilterField] = useState("");
    const [filterValue, setFilterValue] = useState("");
    const [sortField, setSortField] = useState("");
    const [sortOrder, setSortOrder] = useState("");

    useEffect(() => {
        globalState.user.getAll(
            globalState,
            pageNumber,
            pageSize,
            filterField,
            filterValue,
            sortField,
            sortOrder
        );
        globalState.user.emitter.addListener("GET_USERS_SUCCESS", () => {
            setUsers(globalState.user.all);
        });
    }, [pageNumber, pageSize, filterField, filterValue, sortField, sortOrder]);

    return (
        <div className="user-list">
            <h1>User List</h1>
            <table>
                <thead>
                    <tr>
                        <th>
                            <div>Email</div>
                            <input
                                type="text"
                                onChange={(e) => {
                                    setFilterValue(e.target.value);
                                    setFilterField("email");
                                }}
                                placeholder="email filter"
                            />
                            <button
                                onClick={() => {
                                    setSortField("email");
                                    setSortOrder("asc");
                                }}
                            >
                                ⌃
                            </button>
                            <button
                                onClick={() => {
                                    setSortField("email");
                                    setSortOrder("desc");
                                }}
                            >
                                ⌄
                            </button>
                        </th>
                        <th>
                            <div>Rating</div>
                            <input
                                type="number"
                                min="1"
                                max="5"
                                onChange={(e) => {
                                    setFilterValue(e.target.value);
                                    setFilterField("rating");
                                }}
                                placeholder="rating filter"
                            />
                            <button
                                onClick={() => {
                                    setSortField("rating");
                                    setSortOrder("asc");
                                }}
                            >
                                ⌃
                            </button>
                            <button
                                onClick={() => {
                                    setSortField("rating");
                                    setSortOrder("desc");
                                }}
                            >
                                ⌄
                            </button>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <User key={user.id} user={user} />
                    ))}
                </tbody>
            </table>
            <Paginator
                onPageChange={(pageNumber) => setPageNumber(pageNumber)}
                onPageSizeChange={(pageSize) => setPageSize(pageSize)}
                totalRecords={globalState.project.count}
            />
            {/* <div className="footer">
                <button onClick={() => navigate("/projects/new")}>
                    Create Project
                </button>
            </div> */}
        </div>
    );
};

export default UserList;
