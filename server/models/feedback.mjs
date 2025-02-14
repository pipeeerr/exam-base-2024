/**
 * Defines the 'feedback' entity in the database.
 *
 * @param {object} sequelize - The Sequelize instance used to define the model.
 * @param {object} DataTypes - A collection of data types supported by Sequelize.
 * @returns {object} A Sequelize model representing the 'task' entity.
 *
 * @property {string} rating - The rating for the user(1-5). This field is required.
 * @property {string} [description] - A detailed description of the task. This field is optional.
 * @property {string} status - The current status of the task. Defaults to 'open'.
 */
export default (sequelize, DataTypes) => {
    return sequelize.define("feedback", {
        rating: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 1,
                max: 5,
            },
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    });
};
