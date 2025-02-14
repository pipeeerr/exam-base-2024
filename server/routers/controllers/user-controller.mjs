import { Op } from "sequelize";
import models from "../../models/index.mjs";

const getUserProfile = async (req, res, next) => {
    try {
        const user = await models.User.findByPk(req.params.uid);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (err) {
        next(err);
    }
};

const getAllUsers = async (req, res, next) => {
    try {
        const query = {};
        const filterQuery = {};
        if (req.query.filterField && req.query.filterValue) {
            query.where = {
                [req.query.filterField]: {
                    [Op.like]: `%${req.query.filterValue}%`,
                },
            };
            filterQuery.where = {
                [req.query.filterField]: {
                    [Op.like]: `%${req.query.filterValue}%`,
                },
            };
        }
        if (req.query.pageSize && req.query.pageNumber) {
            query.limit = req.query.pageSize;
            query.offset =
                parseInt(req.query.pageSize) * parseInt(req.query.pageNumber);
        }
        if (req.query.sortField && req.query.sortOrder) {
            query.order = [[req.query.sortField, req.query.sortOrder]];
        }
        const count = await models.User.count({
            ...filterQuery,
        });
        const data = await models.User.findAll({
            ...query,
        });
        res.status(200).json({ data, count });
    } catch (err) {
        next(err);
    }
};

const suggestUser = async (req, res, next) => {
    try {
        const users = await models.User.findAll({
            where: {
                email: {
                    [Op.like]: `%${req.query.partial}%`,
                },
            },
            attributes: ["id", "email"],
            limit: 5,
        });
        res.status(200).json(users);
    } catch (err) {
        next(err);
    }
};

export default {
    getUserProfile,
    suggestUser,
    getAllUsers,
};
