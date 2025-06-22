const express = require('express');
const cors = require('cors');
const app = express();
const clientesRoutes = require('./routes/clientes')

//middelewares
app.use(cors()); //accesesibilidad dela api
app.use(express.json()); //entienda datos tipo json en cada peticion

//ruta de clientes
app.use('/api/clientes',clientesRoutes);
//si usamos get a api/clientes ejecuta consulta del select from clientes


//ruta opcional para ver si esta activo
app.get('/', (req,res) => {
    res.send('roka funcionando');
});

//puerto
app.listen(3000, () => {
    console.log('RUN en localhost:3000');
});