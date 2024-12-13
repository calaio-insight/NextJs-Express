export async function GET(req: Request, context: {params: { userId: string }}) {
    try {        
        const {userId} = await context.params;

        if (isNaN(+userId) || userId == undefined){
            return Response.json([]);
        }

        const data = await fetch(`http://localhost:8080/api/userTrustedNeighbor/getUserTrustedNeighborsByUserId?userId=${userId}`)
                .then(response => {console.log(response); return response.json()});
        console.log("USER TRUSTED NEIGHBOR RESPONSE", data);
        return Response.json(data);   
    }
    catch (err){
        console.log(err);
        return Response.json([]);   
    }     
}