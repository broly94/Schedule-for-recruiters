import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('schedule_v2', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql'
})


if(!sequelize){
    console.log("error")
    throw new Error;
    
}else {
    console.log("Db is connected");
}

export default sequelize;
