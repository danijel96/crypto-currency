export const API_URL = 'https://api.bitfinex.com';

export const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Request-Method': 'GET',
        'Access-Control-Request-Headers': 'Content-Type',
    },
};

export const API_ENDPOINTS = {
    TICKERS: {
        ALL_SYMBOLS: '/v2/tickers?symbols=ALL',
    },
    PUBTICKER: '/v1/pubticker',
};
