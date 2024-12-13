export async function GET(req: Request, context: {params: { homeItemId: string }}) {
    try {        
        const {homeItemId} = await context.params;

        if (isNaN(+homeItemId) || homeItemId == undefined){
            return Response.json(null);
        }

        const data = await fetch(`http://localhost:8080/api/homeItem/getHomeItemById?homeItemId=${homeItemId}`)
                .then(response => {console.log(response); return response.json()});
        console.log("HOME ITEM RESPONSE", data);
        return Response.json(data);   
    }
    catch (err){
        console.log(err);
        return Response.json(null);   
    }     
}