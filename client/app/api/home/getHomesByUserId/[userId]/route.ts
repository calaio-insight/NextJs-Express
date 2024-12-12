export async function GET(req: Request, context: {params: { userId: string }}) {
    try {        
        const userId = (await context.params).userId;
        console.log("USERID:", userId);

        if (isNaN(+userId)){
            return Response.json([]);
        }

        const data = await fetch(`http://localhost:8080/api/home/getHomesByUserId?userId=${userId}`)
                .then(response => {return response.json()});
        console.log("HOME RESPONSE", data);
        return Response.json(data);   
    }
    catch (err){
        console.log(err);
        return Response.json([]);   
    }     
}