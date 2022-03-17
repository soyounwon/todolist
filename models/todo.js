const Sequelize = require('sequelize');

module.exports = class Todo extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            content: {
                type: Sequelize.STRING(200),
                allowNull: false,
            },
            folderName: {
                type: Sequelize.STRING(20),
                allowNull: false,
                defaultValue: "defaultFolder",
            },
            done: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
        },{
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'Todo',
            tableName: 'todos',
            paranoid: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    }


    static associate(db){
        db.Todo.belongsTo(db.User);
    }
};