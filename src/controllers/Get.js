
async function Get(url,token){
    let data = await fetch(url,{method: 'GET',
    // mode: 'cors',
    // credentials: "include",
        credentials: "same-origin",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Access-Control-Allow-Origin':`${process.env.REACT_APP_SERVER_URL}`,
            'jwt':token
           
        },
        

    })
    // if(data != null){
    //     data = await data.json()
    // }else{
    //     data = {success:'false',message:'please try again later'}
    // }
    // data = await data.json()
    return data
}
// module.exports = Get;
export default Get;