const request = require('../lib/request');
const Ticker = require('../models/ticker');
const { parseToFloat } = require('../lib/utils.js');

module.exports = async () => {
  const tickers = await request('https://api.btc-exchange.com/papi/web/tickers');
  const markets = Object.keys(tickers);

  return markets.map((market) => {
    const pair = /^([a-z]*)(eur|usdc)$/.exec(market);
    if (!pair) return undefined;
    const [, base, quote] = pair;
    const { ticker } = tickers[market];

    return new Ticker({
      base,
      quote,
      baseVolume: parseToFloat(ticker.vol),
      close: parseToFloat(ticker.last),
      high: parseToFloat(ticker.high),
      low: parseToFloat(ticker.low),
    });
  });
};
