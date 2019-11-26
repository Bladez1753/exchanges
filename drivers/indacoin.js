const request = require('../lib/request');
const Ticker = require('../models/ticker');
const { parseToFloat } = require('../lib/utils.js');

module.exports = async () => {
  const tickers = await request('https://indacoin.com/api/market_ticker');

  return tickers.map((ticker) => {
    const { base, quote } = ticker;

    return new Ticker({
      base,
      quote,
      baseVolume: parseToFloat(ticker.volume),
      close: parseToFloat(ticker.price),
    });
  });
};
