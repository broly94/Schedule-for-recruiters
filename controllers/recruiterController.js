class recuiterController{

    postRecuiter(req,res){
        res.send("Hola desde el controlador");
    }

}

export const RecuiterController = new recuiterController;