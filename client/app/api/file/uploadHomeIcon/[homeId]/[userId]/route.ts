export async function POST(req: Request, context: {params: { homeId: string, userId: string }}) {
    try {        
        const reqBody = await req.formData();
        console.log(reqBody);
        const {userId, homeId} = await context.params;

        if (isNaN(+userId) || isNaN(+homeId)){
            return Response.json('false');
        }
       
        await fetch(`http://localhost:8080/api/file/uploadHomeIcon/${homeId}/${userId}`, {
            method: 'POST',
            headers: {
                'Accept': 'multipart/form-data',
            },
            body: reqBody
        }).then(response => {console.log(response);});
                
        return Response.json('true');   
    }
    catch (err){
        console.log(err);
        return Response.json('false');   
    }     
}