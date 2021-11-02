const _ = require('lodash');

async function getPairs_BINANCE(coin,type) {
    if(!coin || !type) return
    const hd = [];
    _.forEach(coin,c=>{
        const l = `${c}${type}`;
        hd.push(l);
    })
    return hd
}

function transformLS(data){
    const handleData = [];
    _.forEach(data,d=>{
        const { shortPosition, longShortRatio, longPosition, pair, timestamp } = d;
        const long = longPosition;
        const short = shortPosition;
        const lsRatio = longShortRatio;
        const hd = { pair, lsRatio, long, short, timestamp }
        handleData.push(hd);
    })
    return handleData
}

module.exports = {
    getPairs_BINANCE,
    transformLS
}