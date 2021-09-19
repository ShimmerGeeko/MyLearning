export const STORE_CUST = "STORE_CUST"

export const storeCust = (key, value)=>{
    console.log('mainAction', key, value)
    return {
        type: 'STORE_CUST',
        key: key,
        value: value
    }
}
