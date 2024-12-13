export async function GET(req: Request, context: {params: { homeId: string }}) {
    try {        
        const {homeId} = await context.params;

        if (isNaN(+homeId)){
            return Response.json([]);
        }

        const data = await fetch(`http://localhost:8080/api/homeItem/getHomeItemsByHomeId?homeId=${homeId}`)
                .then(response => {return response.json()});
        console.log("HOME ITEMS RESPONSE", data);
        return Response.json(data);   
    }
    catch (err){
        console.log(err);
        return Response.json([]);   
    }     
}