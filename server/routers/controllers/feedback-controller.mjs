import models from "../../models/index.mjs";

const getAllFeedbacksForUser = async (req, res, next) => {
    try {
        const query = {
            where: {
                forUserId: req.params.uid,
            },
        };
        const filterQuery = {
            where: {
                forUserId: req.params.uid,
            },
        };
        const count = await models.Feedback.count({
            ...filterQuery,
        });
        const data = await models.Feedback.findAll({
            ...query,
            include: [
                {
                    model: models.User,
                    required: false,
                    as: "forUser",
                    attributes: ["id", "email"],
                },
            ],
        });
        res.status(200).json({ data, count });
    } catch (err) {
        next(err);
    }
};

const getUserFeedback = async (req, res, next) => {
    try {
        const query = {
            where: {
                forUserId: req.params.uid,
            },
        };
        const filterQuery = {
            where: {
                forUserId: req.params.uid,
            },
        };
        const count = await models.Feedback.count({
            ...filterQuery,
        });
        const data = await models.Feedback.findAll({
            ...query,
            attributes: ["rating"],
        });

        let sum = 0;
        for (let i = 0; i < count; i++) {
            sum += data[i].rating;
        }
        let feedback = 0;
        if (count != 0) {
            feedback = sum / count;
        }
        res.status(200).json({ feedback });
    } catch (err) {
        next(err);
    }
};

const createFeedbackForUser = async (req, res, next) => {
    try {
        const feedback = await models.Feedback.create({
            ...req.body,
            userId: req.params.uid,
            forUserId: req.params.fuid,
        });
        res.status(201).json(feedback);
    } catch (err) {
        next(err);
    }
};

const updateFeedbackForUser = async (req, res, next) => {
    try {
        const feedback = await models.Feedback.findOne({
            where: {
                id: req.params.fid,
                forUserId: req.params.fuid,
            },
        });
        if (feedback) {
            await feedback.update(req.body);
            res.status(200).json(feedback);
        } else {
            res.status(404).json({ message: "Feedback not found" });
        }
    } catch (err) {
        next(err);
    }
};

const deleteFeedbackForUser = async (req, res, next) => {
    try {
        const feedback = await models.Feedback.findOne({
            where: {
                id: req.params.fid,
                forUserId: req.params.fuid,
            },
        });
        if (feedback) {
            await feedback.destroy();
            res.status(204).end();
        } else {
            res.status(404).json({ message: "Feedback not found" });
        }
    } catch (err) {
        next(err);
    }
};

export default {
    getAllFeedbacksForUser,
    createFeedbackForUser,
    updateFeedbackForUser,
    deleteFeedbackForUser,
    getUserFeedback,
};
