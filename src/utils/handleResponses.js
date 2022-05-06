

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
    }
    return message
}
