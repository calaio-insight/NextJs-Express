export async function GET(req: Request, context: {params: { homeId: string, userId: string }}) {
    try {        
        const {homeId, userId} = await context.params;

        if (isNaN(+userId) || isNaN(+homeId) || homeId == undefined || userId == undefined){
            return Response.json(null);
        }

        const data = await fetch(`http://localhost:8080/api/home/getHomeById?homeId=${homeId}&userId=${userId}`)
                .then(response => {console.log(response); return response.json()});
        console.log("HOME RESPONSE", data);
        return Response.json(data);   
    }
    catch (err){
        console.log(err);
        return Response.json(null);   
    }     
}