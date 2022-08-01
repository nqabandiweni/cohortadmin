

export function respond (i){
    
    let message = {type:"",text:""}
    
    switch(i.__typename){
      
        case 'invalidPasswordError':
            message.type = "error"
            message.text = i.invalidPasswordMessage
            break;
        case 'userNotFoundError':
            message.type = "error"
            message.text = i.userNotFoundMessage
            break
        case 'invalidDataError':
            message.type = "error"
            message.text = i.invalidDataMessage
            break
        case 'unactivatedUserError':
            message.type="error"
            message.text=i.unactivatedUserMessage
            break
        case 'loginSuccess':
            message.type = "success"
            message.text = i.token
            break
        case 'userExistsError':
            message.type= "error"
            message.text=i.userExistsMessage
            break
        case 'invalidUserError':
            message.type="error"
            message.text=i.invalidUserMessage
            break
           
        case 'successfulRegistration':
            console.log("here")
             message.type="success"
             message.text=i.temporaryPassword
             break
        

    }
    
    return message
}
