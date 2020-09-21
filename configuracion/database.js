const {Sequelize} = require ("sequelize");
const sequelize = new Sequelize ("delilah/resto", "root","",{
    host:"localhost",
    dialect: "mysql",
    logging:(msg) => console.log(msg),
    typeValidation:true,
   
});

sequelize.sync({
    force: false
  });

const usuarioM = sequelize.define("usuario" , {
    id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    contraseña: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    direccion: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    email: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    telefono: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    isAdm: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
},{ freezeTableName: true , timestamps: false})
const orderM = sequelize.define("orden", {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        unique: true,
        autoIncrement: true
    },
    metodoPago: {
        type: Sequelize.ENUM,
        allowNull: false,
        values: ["EFECTIVO", "TARJETA"]
    },
    total:{
        type: Sequelize.FLOAT,
        allowNull: false
    },
    

},{ freezeTableName: true , timestamps: false})
const productoM = sequelize.define("producto",{
    id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        unique: true,
        autoIncrement : true
    },
    nombre: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    categoria:{
        type: Sequelize.ENUM,
        allowNull : false,
        values: ["Comida", "Bebida", "Postre"]
    },
    precio: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    

},{ freezeTableName: true , timestamps: false})
const productoOrdenM = sequelize.define("productoorden", {
    id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        unique: true, 
        autoIncrement: true
    },
    cantidad: {
        type: Sequelize.INTEGER,
        allowNull:false
    },
    subtotal: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    

},{ freezeTableName: true , timestamps: false})


orderM.belongsTo(usuarioM, {foreignKey: 'userId'});
orderM.belongsToMany(productoM, { through: productoOrdenM });
productoM.belongsToMany(orderM, { through: productoOrdenM });





module.exports= {
    sequelize,
    usuarioM,
    orderM,
    productoM,
    productoOrdenM
};


