export function NotFoundPage() {
    return <h1 style={{color:'white'}}>404 - Page Not Found</h1>;
  }

//  export  function DataNotFoundPage() {
//     return <h1>404 - Data Not Found</h1>;
//   }

export function BadRequest(){
    return <h1 style={{color:'white'}}>400 - Bad Request</h1>
}
export function RequestTimeOut(){
    return <h1 style={{color:'white'}}>408 - Request Time Out</h1>
}
  
export function ForBidden(){
    return <h1 style={{color:'white'}}>403 -  ForBidden</h1>
}
export function ServiceUnavailable(){
    return <h1 style={{color:'white'}}>503 -  Service Unavailable</h1>
}
export function InternalServerError(){
    return <h1 style={{color:'white'}}>500 -  Internal Server Errorr</h1>

}
