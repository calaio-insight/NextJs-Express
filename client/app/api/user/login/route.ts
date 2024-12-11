export async function POST(req: Request) {
    try {            
        const reqBody = await req.json();
       
        const data = await fetch("http://localhost:8080/api/user/login", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reqBody)
        }).then(response => {console.log(response); return response.json()});
        
        return Response.json(data);   
    }
    catch (err){
        console.log(err);
        return Response.json('');   
    }     
}