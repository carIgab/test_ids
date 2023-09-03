function sum_data(tips,base,filter,filter2){
    let value = 0
    if(tips == 'date'){
        let data = JSON.parse(localStorage.getItem(base+'_data'))
        if(data != null){
            for(let i=0; i < data.length;i++){
                if(data[i].date.substr(0, 4) == filter){ 
                    if(base == 'flow'){
                        if(filter2 == data[i].tips){
                            value += parseFloat(data[i].value)
                        }
                    }
                    else if(base == 'earning'){
                        value += parseFloat(data[i].total)
                    }
                }
            }
        }
        
    }
    else if(tips == 'report'){
        let data = JSON.parse(localStorage.getItem(base+'_data'))
        let week = []
        let code = []
        let list_value = []
        
        if(data != 0){
            for(let i=0; i < data.length;i++){
                if(data[i].date.substr(0, 4) == filter){ 
                    if(week.length == 0){
                        week.push(data[i].week.substr(6, 2))
                        code.push(i)
                    }
                    else if(week.length == 1){
                        if(week[0] <  data[i].week.substr(6, 2)){
                            week.push(data[i].week.substr(6, 2))
                            code.push(i)
                        }
                    }
                    else{
                        if(week[(week.length-1)] < data[i].week.substr(6, 2)){
                            week.push(data[i].week.substr(6, 2))
                            code.push(i)
                        }
                    }
                } 
            }
            let ult = data[code[(code.length-1)]].content
            for(let i =0; ult.length > i; i++){
                list_value.push(parseFloat(ult[i][3]))
            }
            value = sum_list(list_value)
        }
        return value
    }
    
    return value
    
}

function sum_list(list){
    let value = 0
    for(let i=0;i < list.length;i++){
        value += parseFloat(list[i])
    }
    return value
    
}