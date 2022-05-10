function messageError (action, it, event) {

    this.action = action;
    this.it = it;
    this.event = event;

    const catchError = (action, it, event) =>{
        console.log(`Error ${action} ${it}`, event);
    }

    return {
        catchError
    }
}


export default messageError;