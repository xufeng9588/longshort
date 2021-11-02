const influx = require('influxdb-nodejs');
const _ = require('lodash');

async function database(data){
    const dbName = 'lsAccount';
    const client = new influx(`http://localhost:8086/${dbName}`);
    const fieldSchema = {
        pair:'s',
        long:'f',
        short:'f',
        lsRatio:'f'
    }
    const tagSchema = {};
    client.schema('longshort',fieldSchema,tagSchema,{
        stripUnKnown: true,
    });
    _.forEach(data,d=>{
        client.write('longshort').tag({}).field(d)
        .then(()=>console.info('weite point success'))
        .catch(console.error)
    })
}

module.exports = {
    database
}