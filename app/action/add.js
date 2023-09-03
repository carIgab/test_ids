let approved =  true
let key_form;
let mod = 'search'

function add(page){
    let list_data = []
    let content = []
    let content_list = []
    let statics = []
    approved = true

    if(page != 'report'){
        for(let n=1;n <= 9;n++){
            let a = document.querySelector('.ipt_'+page+'_'+n)
            if(a.value != ""){
                list_data.push(a.value)
            }else{
                approved = false
                a.setAttribute('style','border-bottom: 1px solid #f00;')
            }
        }
        
    }
    else{
        let act = search_record()
        for(let n=1;n <= 16;n++){
            let a = document.querySelector('.ipt_'+page+'_'+n)
            if(a.value != ""){
                list_data.push(a.value)
                if(n > 4){
                    statics.push(a.value)
                }
            }else{
                approved = false
            }
        } 
        for(let x=1;x <= act.code.length ;x++){
            content = []
            for(let y=1;y <= 8;y++){
                let inpt = document.getElementById('inpt'+x+':'+y)
                if(inpt.value != ""){
                    content.push(inpt.value)
                    inpt.setAttribute('style','background:green;')
                    
                }else{
                    approved = false
                }
            }
            content_list.push(content)
        }
        
    }

    if(approved == true ){
        if(page != 'base'){
            if(page == 'earning'){
                let earning_data = JSON.parse(localStorage.getItem('earning_data') || '[]')
                earning_data.push({
                    order: list_data[0], 
                    date: list_data[1],
                    tips: list_data[2],
                    code:list_data[3].toUpperCase(),
                    company: list_data[4],
                    invest: list_data[5],
                    value: list_data[6],
                    qtde: list_data[7],
                    total: list_data[8]
                })
                localStorage.setItem('earning_data',JSON.stringify(earning_data))
            }
            else if(page == 'flow'){
                let flow_data = JSON.parse(localStorage.getItem('flow_data') || '[]')
                flow_data.push({
                    order: list_data[0], 
                    date: list_data[1],
                    tips: list_data[2],
                    subtips:list_data[3],
                    area: list_data[4],
                    source: list_data[5],
                    name: list_data[6],
                    rank: list_data[7],
                    value: list_data[8]
                })
                localStorage.setItem('flow_data',JSON.stringify(flow_data))
            }
            else if(page == 'record'){
                let record_data = JSON.parse(localStorage.getItem('record_data') || '[]')
                record_data.push({
                    order: list_data[0], 
                    request: list_data[1],
                    date: list_data[2],
                    tips: list_data[3],
                    code:list_data[4].toUpperCase(),
                    total: list_data[5],
                    value: list_data[6],
                    qtde: list_data[7],
                    subtotal: list_data[8]
                })
                localStorage.setItem('record_data',JSON.stringify(record_data))
            }
            else if(page == 'report'){
                let report_data = JSON.parse(localStorage.getItem('report_data') || '[]')
                report_data.push({
                    order: list_data[0], 
                    date: list_data[1],
                    week: list_data[2],
                    month: list_data[3],
                    statics: statics,
                    content: content_list
                })
                localStorage.setItem('report_data',JSON.stringify(report_data))
            }
            let order_data = JSON.parse(localStorage.getItem('order_data') || '[]')
            order_data.push({
                order: list_data[0],
                tips: page
            })
            localStorage.setItem('order_data',JSON.stringify(order_data))
        }
        else if(page == 'base'){
            let base_data = JSON.parse(localStorage.getItem('base_data') || '[]')
            base_data.push({
                code:list_data[0].toUpperCase(),
                tips: list_data[1], 
                company: list_data[2],
                cnpj: list_data[3],
                ri: list_data[4],
                review: list_data[5],
                objective: list_data[6],
                sector: list_data[7],
                segment: list_data[8]
            })
            localStorage.setItem('base_data',JSON.stringify(base_data))
        }
        

        document.querySelector('.form_'+page).reset()
        redirection_page('create', page)
        location.href='../loading/index.html'
    }
}


function modify(tab){
    let ipt_refence = document.querySelector('.ipt_'+tab+'_1')
    let approved =  true
    let list_ipt = []
    key_form =false

    if(mod == 'search'){
        search_form(tab)
        if(key_form == true){
            mod = 'modify'
            action_ipt(tab,false,9)
            ipt_refence.readOnly = true
        }
    }
    else{
        if(tab != 'report'){
            let data = JSON.parse(localStorage.getItem(tab+'_data'))
            for(let i=1; i <= 9;i++){
                if(document.querySelector('.ipt_'+tab+'_'+i).value != ''){
                    list_ipt.push(document.querySelector('.ipt_'+tab+'_'+i).value)
                    document.querySelector('.ipt_'+tab+'_'+i).setAttribute('style','border-bottom: 1px solid var(--color-text);')
                    approved = true
                }
                else{
                    document.querySelector('.ipt_'+tab+'_'+i).setAttribute('style','border-bottom: 1px solid #f00;')
                    approved = false
                }
            }

            if(tab == 'base' && approved == true){
                data[ind].code = list_ipt[0].toUpperCase()
                data[ind].tips= list_ipt[1]
                data[ind].company= list_ipt[2]
                data[ind].cnpj= list_ipt[3]
                data[ind].ri= list_ipt[4]
                data[ind].review= list_ipt[5]
                data[ind].objective = list_ipt[6]
                data[ind].sector= list_ipt[7]
                data[ind].segment= list_ipt[8]

            }

            else if(tab == 'earning' && approved == true){
                data[ind].order = list_ipt[0]
                data[ind].date= list_ipt[1]
                data[ind].tips= list_ipt[2]
                data[ind].code= list_ipt[3].toUpperCase()
                data[ind].company= list_ipt[4]
                data[ind].invest= list_ipt[5]
                data[ind].value = list_ipt[6]
                data[ind].qtde= list_ipt[7]
                data[ind].total= list_ipt[8]
                
            }

            else if(tab == 'flow' && approved == true){
                data[ind].order = list_ipt[0]
                data[ind].date= list_ipt[1]
                data[ind].tips= list_ipt[2]
                data[ind].subtips= list_ipt[3]
                data[ind].area= list_ipt[4]
                data[ind].source= list_ipt[5]
                data[ind].name = list_ipt[6]
                data[ind].rank= list_ipt[7]
                data[ind].value= list_ipt[8]

                
            }

            else if(tab == 'record' && approved == true){
                data[ind].order = list_ipt[0].toUpperCase()
                data[ind].request= list_ipt[1]
                data[ind].date= list_ipt[2]
                data[ind].tips= list_ipt[3]
                data[ind].code= list_ipt[4]
                data[ind].total= list_ipt[5]
                data[ind].value = list_ipt[6]
                data[ind].qtde= list_ipt[7]
                data[ind].subtotal= list_ipt[8]

                
            }

            localStorage.setItem(tab+'_data',JSON.stringify(data))
            reset(tab)
            mod = 'search'
               
        }
        else{
            let list_ctt = []
            let list_statics = []
            let list_content = []
            let ctt= []

            let data = JSON.parse(localStorage.getItem(tab+'_data'))
            for(let n=1;n <= 16;n++){
                let a = document.querySelector('.ipt_'+tab+'_'+n)
                if(a.value != ""){
                    a.setAttribute('style','border-bottom: 1px solid var(--color-text);')
                    if(n > 4){
                        list_statics.push(a.value)
                    }else{
                        list_ctt.push(a.value)
                    }
                }
                else{
                    a.setAttribute('style','border-bottom: 1px solid #f00;')
                    approved = false
                }
            } 
            let y = data[ind].content.length
            for(let x=1;x <= y ;x++){
                ctt = []
                for(let y=1;y <= 8;y++){
                    let inpt = document.getElementById('inpt'+x+':'+y)
                    if(inpt.value == ""){
                        approved = false
                    }else{
                        ctt.push(inpt.value)
                    }
                }
                list_content.push(ctt)
            }

            if(approved == true){
                data[ind].order = list_ctt[0]
                data[ind].date= list_ctt[1]
                data[ind].week= list_ctt[2]
                data[ind].month= list_ctt[3]
                data[ind].statics= list_statics
                data[ind].content= list_content
            }

            localStorage.setItem(tab+'_data',JSON.stringify(data))
            reset(tab)
            mod = 'search'
        }
            
    }
}

function del(tab){
    let data = JSON.parse(localStorage.getItem(tab+'_data'))
    let n;
    let boolean = true
    let ipt_reference = document.querySelector('.ipt_'+tab+'_1')

    for(let i=0; data.length > i;i++){
        if(tab != 'base'){
            if(ipt_reference.value == data[i].order){
                n = i
                ipt_reference.setAttribute('style','border-bottom: 1px solid var(--color-text;')
                boolean = true
                break
            }
            else{
                ipt_reference.setAttribute('style','border-bottom: 1px solid #f00;')
                boolean = false
            }
        }
        else{
            if(ipt_reference.value == data[i].code){
                n = i
                ipt_reference.setAttribute('style','border-bottom: 1px solid var(--color-text;')
                boolean = true
                break
            }
            else{
                ipt_reference.setAttribute('style','border-bottom: 1px solid #f00;')
                boolean = false
            }
        }
        
    }

    console.log(boolean)
    if(boolean == true){
        data.splice(n,1)
        localStorage.setItem(tab+'_data',JSON.stringify(data))

        if(tab != 'base'){
            let order = JSON.parse(localStorage.getItem('order_data'))
            for(let i=0; order.length > i;i++){
               
                if(order[i].order == ipt_reference.value){
                    order.splice(i,1)
                    break;
                }
            }
            localStorage.setItem('order_data',JSON.stringify(order))
        }
        
        reset(tab)
    }        
    
}