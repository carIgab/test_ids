function authenticate_active(){
    let tab = document.querySelector('.create_page').getAttribute('page')
    let ipt_code;
   

    if(tab == 'base'){
        ipt_code = document.querySelector('.ipt_base_1')
        if(search_active(ipt_code.value.toUpperCase()) != false){
            ipt_code.setAttribute('style','border-bottom: 1px solid #f00;')
            ipt_code.value = ""
            ipt_code.focus()
        }else{
            ipt_code.setAttribute('style','border-bottom: 1px solid var(--color-text;')
        }
        
    }
    else if(tab == 'earning'){
        ipt_code = document.querySelector('.ipt_earning_4')
        if( search_active(ipt_code.value.toUpperCase()) == false){
            ipt_code.setAttribute('style','border-bottom: 1px solid #f00;')
            ipt_code.value = ""
            ipt_code.focus()
    
        }else{
            ipt_code.setAttribute('style','border-bottom: 1px solid var(--color-text;')
            document.querySelector('.ipt_earning_5').value = search_active(ipt_code.value.toUpperCase(), 'company')
            let content = search_list_active(ipt_code.value.toUpperCase())
            if(content == false){
                document.querySelector('.ipt_earning_4').setAttribute('style','border-bottom: 1px solid #f00;')
            }else{
                document.querySelector('.ipt_earning_6').value = content.invest
                document.querySelector('.ipt_earning_8').value = content.qtds
            }
            
        }
    }
    else{
        ipt_code = document.querySelector('.ipt_record_5')
        if(search_active(ipt_code.value.toUpperCase()) != false){
            ipt_code.setAttribute('style','border-bottom: 1px solid var(--color-text;')

        }else{
            ipt_code.setAttribute('style','border-bottom: 1px solid #f00;')
            ipt_code.value = ""
            ipt_code.focus()
        }
    }


}

function search_active(code, elements){
    let base_data = JSON.parse(localStorage.getItem('base_data') || '[]')
    let content = false;

    if(base_data != ''){
        for(let i=0;base_data.length > i; i++){
            if(base_data[i].code == code){
                content =  base_data[i].company
            }
        }
        return content
    }
    else{
        return content
    }
    
}


let tips_output = ['Usual','Education','Personal','Objects','Leisure','Debt']
let area_output = [
    ['Supermarket','Food','Home','Transport','Bill','Others'],
    ['College','Courses','Books','Others'],
    [],
    ['Tools','Materials','Gift','Gadgets','Others'],
    ['Books','Subscriptions','Travel','Hobbies','Others'],
    ['Rates','Fees','Safe','Others']
]
let rank_output = ['Necessary', 'Not']
let tips_input = ['Work','Bonus','Extra']
let area_input = [
    ['Salary','Overtime','Commission','Others'],
    ['Holiday','Thirteenth','FGTS','PIS','Others'],
    ['Earning','Extra','Sale','Gift','Others'],
   
]
let rank_input = ['Usual', 'Eventual','Rare']
function search_flow(format){
    let ipt_tips = document.querySelector(".ipt_flow_3")
    let ipt_subtips = document.querySelector(".ipt_flow_4")
    let ipt_area = document.querySelector(".ipt_flow_5")
    let ipt_rank = document.querySelector(".ipt_flow_8")
    let list;
    let data;

    if(format == 'tips'){
        if(ipt_tips.value == 'Input'){
            list = tips_input
            push_select(rank_input, ipt_rank)
        }else{
            list = tips_output
            push_select(rank_output, ipt_rank)
        }
        push_select(list,ipt_subtips)
        search_flow('area')
    }
    else if(format == 'area'){
        if(ipt_tips.value == 'Input'){
            list = tips_input
            data = area_input
        }else{
            list = tips_output
            data = area_output
        }
        
        for(let i=0;i < list.length;i++){
            if(ipt_subtips.value == list[i]){
                push_select(data[i],ipt_area)
            }
        }
    }
}

function push_select(data, destiny){
    let text = ''
    for(let x=0; x < data.length;x++){
        text += '<option value="'+data[x]+'">'+data[x]+'</option>'
    }
    destiny.innerHTML = text
}
 
let record_data = JSON.parse(localStorage.getItem('record_data')) 
let list = []

function search_record(){
    if(record_data != null){
        for(let i=0; record_data.length > i; i++){
            list.push(record_data[i].code)
        }
        list = list.filter((este, ia) => list.indexOf(este) === ia);
        list.sort()
        let content = authentic_record()
        return content
    }
    
}

function authentic_record(){
    let list_invest = []
    let list_qtds = []

    for(var i=0; list.length > i; i++){
        for(var x=0; record_data.length > x; x++){
            if(list[i] == record_data[x].code){
                if(list_invest[i] == null || list_qtds[i] == null){
                    list_invest[i] = 0
                    list_qtds[i] = 0
                }
                if(record_data[x].tips == 'Purchase'){
                    list_invest[i] += parseFloat(record_data[x].subtotal)
                    list_qtds[i] += parseInt(record_data[x].qtde)
                }
                else if(record_data[x].tips == 'Sale'){
                    list_invest[i] -= parseFloat(record_data[x].subtotal)
                    list_qtds[i] -= parseInt(record_data[x].qtde)
                }
            }
        }
    }
    return {
        code: list, 
        invest: list_invest,
        qtds: list_qtds
    }
}

function search_list_active(code){
    let data = search_record()
    
    if(data != false){
        for(let i=0;data.code.length > i; i++){
            if(data.code[i] == code){
                return {
                    qtds: data.qtds[i],
                    invest: data.invest[i]
                }
            }
        }
    }
    else{ 
        return false
    } 
}

