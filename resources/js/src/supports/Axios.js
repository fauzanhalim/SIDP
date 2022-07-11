import axios from 'axios';

let baseDomain  = document.head.querySelector('meta[name="api-base-url"]').content;

let baseUrl     = baseDomain + '/api';

const instance = axios.create({
    baseURL: baseUrl,
});

export default instance;