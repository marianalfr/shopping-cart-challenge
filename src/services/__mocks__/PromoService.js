const fakeData = [
    {
        code: 'CABIFY',
        discount: 5
    },
    {
        code: 'CBFY20E',
        discount: 20
    }
];

const fetchPromoCodes = error => {
    return new Promise((resolve, reject) =>{
        error 
        ? reject(error)
        : resolve(fakeData)
        
    })
};

export default fetchPromoCodes;