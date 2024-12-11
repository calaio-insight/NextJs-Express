export async function GET(req: Request, context: {params: { userId: string }}) {
    try {
        const userId = (await context.params).userId;
        console.log(userId);
    
        const data = await fetch("http://localhost:8080/api/home/getHomesByUserId?userId=1")
                .then(response => {return response.json()});
        
        return Response.json(data);   
    }
    catch (err){
        console.log(err);
        return Response.json([]);   
    }     
}