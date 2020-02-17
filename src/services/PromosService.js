const ENDPOINT = '/api';

const fetchPromoCodes = () => fetch(ENDPOINT)
.then(res => res.json());

export default fetchPromoCodes;