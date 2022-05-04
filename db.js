import Sequelize from 'sequelize';

const sequelize = new Sequelize('schedule', 'root', 'root', {
    dialect: 'mysql',
    dialectOptions: {
        // Your mysql2 options here
    }
})

if(!sequelize){
    throw Error;
    
}else {
    console.log("Funciona");
}
