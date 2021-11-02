const _ = require('lodash');
const async = require('async');
const { getPairs_BINANCE, transformLS } = require('./transform');
const { config } = require('./config')
const { request } = require('./request');
const { database } = require('./database');

const usd_coins = config.usd_coins;
const base_url = config.base_url;

async function getLSaccount(type,period) {
    const pairs = await getPairs_BINANCE(usd_coins,'usd');
    async.mapLimit(pairs, 1, async function(pair){
        if(type==='ACCOUNT'){
            var url = `${base_url}/futures/data/topLongShortAccountRatio?pair=${pair}&period=${period}`;
        }else if(type==='POSITION'){
            var url = `${base_url}/futures/data/topLongShortPositionRatio?pair=${pair}&period=${period}`;
        }else return
        const data = await request(url)
        const handleData = transformLS(data)
        database(handleData)
    },(err,result)=>{
        if(err) throw err
    })
}

module.exports = {
    getLSaccount
}