async function Postdata(url, postdata,token) {
    // console.log('postdata')
    let data = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            // 'Access-Control-Allow-Origin':'http://localhost:500/',
            jwt:token
        },
        body: JSON.stringify(postdata)
       
    })
    // if(data != null){
    //     data = await data.json();
    //     console.log(data)
    // }else{
    //     data = {success:'false',message:'please try again later'}

    // return data

    // }
    return data;
}
// module.exports = Postdata;
export default Postdata