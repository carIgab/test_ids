function reset(tab){
    document.querySelector('.form_'+tab).reset()
    if(tab != 'base'){
        push_order(tab)
    }
}

function count_form(tab){
    let destiny = document.querySelector('.ipt_'+tab+'_9')
    let qtde = document.querySelector('.ipt_'+tab+'_8').value
    let value = document.querySelector('.ipt_'+tab+'_7').value
   

    let total = parseFloat(value*qtde).toFixed(2)
    destiny.value = total
    if(tab == 'record'){
        document.querySelector('.ipt_'+tab+'_6').value = total
    }
}

let ind;
function search_form(tab){
    let data = JSON.parse(localStorage.getItem(tab+'_data'))
    let ipt_reference = document.querySelector('.ipt_'+tab+'_1')
    let list_data = []
    ind = ""
    

    if(data != null){
      
        for(let i=0; data.length > i;i++){
            if(tab == 'base'){
                if(ipt_reference.value.toUpperCase() == data[i].code){
                    if(tab == 'base'){
                        list_data[0] = data[i].code
                        list_data[1] = data[i].tips
                        list_data[2] = data[i].company
                        list_data[3] = data[i].cnpj
                        list_data[4] = data[i].review
                        list_data[5] = data[i].ri
                        list_data[6] = data[i].objective
                        list_data[7] = data[i].sector
                        list_data[8] = data[i].segment   

                        push_ipt(9,tab,list_data)
                        key_form = true
                        ipt_reference.setAttribute('style','border-bottom: 1px solid var(--color-text;')
                        ind = i
                        break;
                        }
                }
            }
            else if (tab == 'earning'){
                if(ipt_reference.value == data[i].order){
                    list_data[0] = data[i].order
                    list_data[1] = data[i].date
                    list_data[2] = data[i].tips
                    list_data[3] = data[i].code
                    list_data[4] = data[i].company
                    list_data[5] = data[i].invest
                    list_data[6] = data[i].value
                    list_data[7] = data[i].qtde
                    list_data[8] = data[i].total 

                    push_ipt(9,tab,list_data)
                    key_form = true
                    ipt_reference.setAttribute('style','border-bottom: 1px solid var(--color-text;')
                    ind = i
                    break;
                }
                   
            }
            else if(tab == 'record'){
                if(ipt_reference.value.toString() == data[i].order){
                    list_data[0] = data[i].order;
                    list_data[1] = data[i].request;
                    list_data[2] = data[i].date;
                    list_data[3] = data[i].tips;
                    list_data[4] = data[i].code;
                    list_data[5] = data[i].total;
                    list_data[6] = data[i].value;
                    list_data[7] = data[i].qtde;
                    list_data[8] = data[i].subtotal ;

                    push_ipt(9,tab,list_data)
                    key_form = true
                    ipt_reference.setAttribute('style','border-bottom: 1px solid var(--color-text;')
                    ind = i
                    break;
                }
                  
            }
            else if(tab == 'flow'){
                    if(ipt_reference.value.toString() == data[i].order){
                        reset(tab)
                        list_data[0] = data[i].order
                        list_data[1] = data[i].date
                        list_data[2] = data[i].tips
                        list_data[3] = data[i].subtips
                        list_data[4] = data[i].area
                        list_data[5] = data[i].source
                        list_data[6] = data[i].name
                        list_data[7] = data[i].rank
                        list_data[8] = data[i].value 

                        push_ipt(9,tab,list_data)
                        key_form = true
                        ipt_reference.setAttribute('style','border-bottom: 1px solid var(--color-text;')
                        ind = i
                        break;
                    }
            }
            else if(tab == 'report'){
                if(ipt_reference.value.toString() == data[i].order){
                    list_data[0] = data[i].order
                    list_data[1] = data[i].date
                    list_data[2] = data[i].week
                    list_data[3] = data[i].month
                    list_data[4] = data[i].statics
                    list_data[5] = data[i].content
                  
                    ind = i
                    push_ipt(16,tab,list_data)
                    key_form = true
                    ipt_reference.setAttribute('style','border-bottom: 1px solid var(--color-text;')
                    break;
                } 
            }
            else{
                    reset(tab)
            }
        }
    }
    else{
        ipt_reference.setAttribute('style','border-bottom: 1px solid #f00;')
    }

    
    
}

function action_ipt(tab, sit,n){
    for(let i=1; i <= n;i++){
        document.querySelector('.ipt_'+tab+'_'+i).readOnly = sit;
    }
}

function push_ipt(n,tab,data){
    if(tab == 'report'){
        for(let i=0; n > i;i++){
            if(i < 4){
                document.querySelector('.ipt_'+tab+'_'+(i+1)).value = data[i]
            }
            else{
                document.querySelector('.ipt_'+tab+'_'+(i+1)).value = data[4][(i-4)]
            }
            
        }

        for(let x=0; data[5].length > x;x++){
            for(let i=0; 8 > i;i++){
                document.getElementById('inpt'+(x+1)+':'+(i+1)).value = data[5][x][i]
            }
        }
    }else if(tab == 'flow'){
        for(let i=1; n >= i;i++){
           
            document.querySelector('.ipt_'+tab+'_'+i).value = data[i-1]
            if(i ==3){
                search_flow('tips')
            }
            else if(i ==4){
                search_flow('area')
            }
        }
    }
    else{
        for(let i=1; n >= i;i++){
            document.querySelector('.ipt_'+tab+'_'+i).value = data[i-1]
        }
    }
    
}

function push_order(tab){
    let order_data = JSON.parse(localStorage.getItem('order_data'))
    let ipt =  document.querySelector('.ipt_'+tab+'_1')

    if(order_data != null){
        let order = parseInt(order_data[order_data.length-1].order)+1
        ipt.value = order
    }
    else{
        ipt.value = 1
    }
}
let i_hearder = 0;
function tab_report(way){
    let data = search_record()
    let n = Math.ceil(data.code.length/8)
   
    if(data != false){
        if(way == 'front'){
            if(i_hearder < n){
                i_hearder++
            }
        }

        else if(way == 'back'){
            if(i_hearder > 0){
                i_hearder--
            }
        }

        index_hearder(i_hearder,n,'change')
        document.querySelector('.view_report').classList.remove('view_report')
        document.querySelector('.report_tab_'+i_hearder).classList.add('view_report')
        
    }

}

function index_hearder(i, number_page,tips){
    let ipt = document.getElementById('index_report')
    ipt.innerHTML = 'Page '+ i + ' the '+ (number_page+1)

    if(tips == 'change'){
        ipt.innerHTML = 'Page '+ (i+1) + ' the '+ (number_page+1)
    }
}

function push_report(n){
    let local =  document.querySelector('.form_report')
    let text = local.innerHTML
    let data =  search_record()
    let y = 0

    for(let itab = 1; itab<=n;itab++){
        text +=  '<section class="report_tab_'+itab+' report_tab tab_rpt elts">'
        text += '<table><thead ><tr><th style="width:10%;">Code</th>'+
        '<th>price</th><th>qtde</th><th>total</th><th>min</th>'+
        '<th>max</th><th>med</th><th>invest</th></tr></thead><tbody>'

        for(let irow = 1;irow<=8;irow++){
            text += '<tr>'
            for(let icol = 1;icol<=8;icol++){
                if(icol == 1){
                    if(data.code[((irow +y)-1)] != null){
                        text += '<td><input type="text" readonly id="inpt'+(irow + y)+':'+icol+'" value="'+data.code[((irow +y)-1)]+'"></td>'
                    }
                    else{
                        text += '<td><input type="text" readonly id="inpt'+(irow + y)+':'+icol+'"></td>'
                    }
                }
                else if(icol == 2){
                    if(data.qtds[((irow +y)-1)] != null){
                        text += `<td><input type="text" id="inpt`+(irow + y)+`:`+icol+`" onchange="sum('inpt`+(irow + y)+`')"></td>`
                    }
                    else{
                        text += '<td><input type="text" readonly id="inpt'+(irow + y)+':'+icol+'"></td>'
                    }
                }
                else if(icol == 3){
                    if(data.qtds[((irow +y)-1)] != null){
                        text += '<td><input type="text" readonly id="inpt'+(irow + y)+':'+icol+'" value="'+data.qtds[((irow +y)-1)]+'"></td>'
                    }
                    else{
                        text += '<td><input type="text" readonly id="inpt'+(irow + y)+':'+icol+'"></td>'
                    }
                }
                else if(icol == 4){
                    text += '<td><input type="text" readonly id="inpt'+(irow + y)+':'+icol+'"></td>'
                }
                else if(icol == 8){
                    if(data.qtds[((irow +y)-1)] != null){
                        text += '<td><input type="text" readonly id="inpt'+(irow + y)+':'+icol+'" value="'+data.invest[((irow +y)-1)]+'"></td>'
                    }
                    else{
                        text += '<td><input type="text" readonly id="inpt'+(irow + y)+':'+icol+'"></td>'
                    }
                }
                else{
                    if(data.qtds[((irow +y)-1)] != null){
                        text += '<td><input type="text" id="inpt'+(irow + y)+':'+icol+'"></td>'
                    }
                    else{
                        text += '<td><input type="text" readonly id="inpt'+(irow + y)+':'+icol+'"></td>'
                    }
                    
                }
            }
            text += '</tr>'
        }
        text += '</tbody></table></section>'
        y = y +8
    }       
    local.innerHTML = text
    text = ''
}

function sum(local){
    document.getElementById(local+':4').value = document.getElementById(local+':2').value * 
    document.getElementById(local+':3').value
}