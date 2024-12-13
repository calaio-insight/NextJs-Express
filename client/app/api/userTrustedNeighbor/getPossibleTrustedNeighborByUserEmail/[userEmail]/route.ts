export async function GET(req: Request, context: {params: { userEmail: string }}) {
    try {        
        const {userEmail} = await context.params;

        if (userEmail == "" || userEmail == undefined){
            return Response.json(null);
        }

        const data = await fetch(`http://localhost:8080/api/userTrustedNeighbor/getPossibleTrustedNeighborByUserEmail?userEmail=${userEmail}`)
                .then(response => {console.log(response); return response.json()});
        console.log("USER TRUSTED NEIGHBOR RESPONSE", data);
        return Response.json(data);   
    }
    catch (err){
        console.log(err);
        return Response.json(null);   
    }     
}