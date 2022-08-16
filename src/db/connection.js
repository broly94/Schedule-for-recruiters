import { Sequelize } from 'sequelize';

const DB_NAME = process.env.DB_NAME
const DB_HOST = process.env.DB_HOST

const sequelize = new Sequelize('leoneldev_schedule_v2', 'leoneldev', 'leonel_dev', {
    host: 'mysql-leoneldev.alwaysdata.net',
    dialect: 'mysql'
})


const ConnectionInit = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

ConnectionInit();

export default sequelize;
