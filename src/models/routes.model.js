
class RoutesModel {
    constructor({
        idRoute,
        routeName,
        idCampus
    }){
        Object.assign(this,{
            idRoute,
            routeName,
            idCampus
        })
    }
}

export default RoutesModel;