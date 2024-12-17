export async function POST(req: Request, context: {params: { userId: string }}) {
    try {        
        const reqBody = await req.json();
        const {userId} = await context.params;

        if (isNaN(+userId)){
            return Response.json([]);
        }
       
        const data = await fetch(`http://localhost:8080/api/homeItem/${userId}`, {
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
        return Response.json(null);   
    }     
}