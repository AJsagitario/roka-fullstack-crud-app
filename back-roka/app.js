const express = require('express');
const cors = require('cors');
const app = express();
const clientesRoutes = require('./routes/clientes')
const mascotRoutes = require('./routes/mascota')
const productRoutes = require('./routes/product')
const citaRoutes = require('./routes/cita')
const compraRoutes = require('./routes/compra')
const detalleRoutes= require('./routes/detalleCompra')
const foroRoutes= require('./routes/foro')

//middelewares
app.use(cors()); //accesesibilidad dela api
app.use(express.json()); //entienda datos tipo json en cada peticion
app.use((req, res) => {
    res.status(404).json({error:'Ruta no encontrada'});
});

//ruta de clientes
app.use('/api/clientes',clientesRoutes);
app.use('/api/mascota',mascotRoutes);
app.use('/api/producto',productRoutes);
app.use('/api/cita',citaRoutes);
app.use('/api/compra',compraRoutes);
app.use('/api/detalle',detalleRoutes);
app.use('/api/foro',foroRoutes);
//si usamos get a api/clientes ejecuta consulta del select from clientes


//ruta opcional para ver si esta activo
app.get('/', (req,res) => {
    res.send('roka funcionando');
});

//puerto
app.listen(3000, () => {
    console.log('RUN en localhost:3000');
});