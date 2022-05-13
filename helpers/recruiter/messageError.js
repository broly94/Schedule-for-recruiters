const messageError = () => {

    const catchError = (action, it, event) => {
        console.log(`Error ${action} ${it}`, event);
    }

    return {
        catchError
    }
}


export default messageError;