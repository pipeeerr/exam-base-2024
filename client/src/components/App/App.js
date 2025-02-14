import "./App.css";
import React, { useState, useEffect } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import AppContext from "../../state/AppContext";

import AuthGuard from "../AuthGuard";
import LoginForm from "../LoginForm";
import ProjectList from "../ProjectList";
import ProjectForm from "../ProjectForm/ProjectForm";
import TaskList from "../TaskList";
import TaskForm from "../TaskForm";
import TaskDetails from "../TaskDetails";
import Dashboard from "../Dashboard";
import UserList from "../UserList";
import RegisterForm from "../registerForm";

import UserStore from "../../state/stores/UserStore";
import ProjectStore from "../../state/stores/ProjectStore";
import TaskStore from "../../state/stores/TaskStore";
import UserSuggestionStore from "../../state/stores/UserSuggestionStore";
import ErrorDisplay from "../ErrorDisplay";

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userStore] = useState(new UserStore());
    const [projectStore] = useState(new ProjectStore());
    const [taskStore] = useState(new TaskStore());
    const [userSuggestionStore] = useState(new UserSuggestionStore());

    useEffect(() => {
        userStore.emitter.addListener("LOGIN_SUCCESS", () => {
            setIsAuthenticated(true);
        });
        userStore.emitter.addListener("REGISTER_SUCCESS", () => {
            setIsAuthenticated(true);
        });
    }, []);

    // if (window.localStorage.getItem("token")) {
    //     setIsAuthenticated(true);
    // }

    return (
        <AppContext.Provider
            value={{
                user: userStore,
                project: projectStore,
                task: taskStore,
                userSuggestion: userSuggestionStore,
            }}
        >
            {isAuthenticated && (
                <div className="app-header">
                    <div>
                        <h5>Welcome, {userStore.data.email}</h5>
                    </div>
                    <div>
                        <button
                            onClick={() => {
                                userStore.logout();
                                setIsAuthenticated(false);
                            }}
                        >
                            Logout
                        </button>
                    </div>
                </div>
            )}
            <ErrorDisplay />
            <Router>
                <Routes>
                    <Route path="/login" element={<LoginForm />} />
                    <Route
                        path="/"
                        element={
                            <AuthGuard isAuthenticated={isAuthenticated}>
                                <Dashboard />
                            </AuthGuard>
                        }
                    />
                    <Route
                        path="/projects"
                        element={
                            <AuthGuard isAuthenticated={isAuthenticated}>
                                <ProjectList />
                            </AuthGuard>
                        }
                    />
                    <Route
                        path="/projects/new"
                        element={
                            <AuthGuard isAuthenticated={isAuthenticated}>
                                <ProjectForm />
                            </AuthGuard>
                        }
                    />
                    <Route
                        path="/projects/:pid/tasks"
                        element={
                            <AuthGuard isAuthenticated={isAuthenticated}>
                                <TaskList />
                            </AuthGuard>
                        }
                    />
                    <Route
                        path="/projects/:pid/tasks/new"
                        element={
                            <AuthGuard isAuthenticated={isAuthenticated}>
                                <TaskForm />
                            </AuthGuard>
                        }
                    />
                    <Route
                        path="/projects/:pid/tasks/:tid"
                        element={
                            <AuthGuard isAuthenticated={isAuthenticated}>
                                <TaskDetails />
                            </AuthGuard>
                        }
                    />
                    <Route
                        path="/users"
                        element={
                            <AuthGuard isAuthenticated={isAuthenticated}>
                                <UserList />
                            </AuthGuard>
                        }
                    />
                    <Route path="/register" element={<RegisterForm />} />
                    {/* <Route
                        path="/users/:uid/feedbacks"
                        element={
                            <AuthGuard isAuthenticated={isAuthenticated}>
                                <FeedbackList />
                            </AuthGuard>
                        }
                    />
                    <Route
                        path="/users/:uid/feedbacks/new"
                        element={
                            <AuthGuard isAuthenticated={isAuthenticated}>
                                <FeedbackForm />
                            </AuthGuard>
                        }
                    /> */}
                </Routes>
            </Router>
        </AppContext.Provider>
    );
};

export default App;
