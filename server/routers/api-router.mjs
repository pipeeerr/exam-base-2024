import express from "express";
import controllers from "./controllers/index.mjs";
import middleware from "../middleware/index.mjs";

const apiRouter = express.Router();
apiRouter.use(middleware.auth);

// project endpoints
apiRouter.get("/users/:uid/projects", controllers.project.getAllProjects);
apiRouter.get(
    "/users/:uid/projects/:pid",
    controllers.project.getOneOwnedProject
);
apiRouter.post("/users/:uid/projects", controllers.project.createOwnedProject);
apiRouter.put(
    "/users/:uid/projects/:pid",
    middleware.getPermMiddleware("pid", ["write"]),
    controllers.project.updateOwnedProject
);
apiRouter.delete(
    "/users/:uid/projects/:pid",
    middleware.getPermMiddleware("pid", ["write"]),
    controllers.project.deleteOwnedProject
);

// task endpoints
apiRouter.get(
    "/users/:uid/projects/:pid/tasks",
    controllers.task.getAllTasksForProject
);
apiRouter.get(
    "/users/:uid/projects/:pid/tasks/:tid",
    controllers.task.getOneTaskForProject
);
apiRouter.post(
    "/users/:uid/projects/:pid/tasks",
    middleware.getPermMiddleware("pid", ["write"]),
    controllers.task.createOwnedTaskForProject
);
apiRouter.put(
    "/users/:uid/projects/:pid/tasks/:tid",
    middleware.getPermMiddleware("pid", ["write"]),
    controllers.task.updateOwnedTaskForProject
);
apiRouter.delete(
    "/users/:uid/projects/:pid/tasks/:tid",
    middleware.getPermMiddleware("pid", ["write"]),
    controllers.task.deleteOwnedTaskForProject
);
apiRouter.post(
    "/users/:uid/projects/:pid/tasks/:tid/assignments",
    middleware.getPermMiddleware("pid", ["write"]),
    controllers.task.assignTaskToUser
);
apiRouter.put(
    "/users/:uid/projects/:pid/tasks/:tid/status",
    middleware.assignedTaskMiddleware,
    controllers.task.updateAssignedTaskStatus
);

// feedback endpoints
apiRouter.get(
    "/users/:uid/feedbacks",
    controllers.feedback.getAllFeedbacksForUser
);
apiRouter.post(
    "/users/:uid/:fuid/feedbacks",
    middleware.getUserTypeMiddleware("admin"),
    controllers.feedback.createFeedbackForUser
);
apiRouter.put(
    "/users/:uid/:fuid/feedbacks/:fid",
    middleware.getUserTypeMiddleware("admin"),
    controllers.feedback.updateFeedbackForUser
);
apiRouter.delete(
    "/users/:uid/:fuid/feedbacks/:fid",
    middleware.getUserTypeMiddleware("admin"),
    controllers.feedback.deleteFeedbackForUser
);
apiRouter.get("/users/:uid/feedback", controllers.feedback.getUserFeedback);

// user endpoints
apiRouter.get("/users", controllers.user.getAllUsers);

// get user profile
apiRouter.get("/users/:uid/profile", controllers.user.getUserProfile);

// suggest user based on email
apiRouter.get("/users/suggestions", controllers.user.suggestUser);

export default apiRouter;
