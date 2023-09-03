function push_recent(page){
    if(page == 'home'){
        recent('flow',page)
        recent('earning',page)
        recent('record',page)
    }
 
}

function recent(tips,local){
    let data = JSON.parse(localStorage.getItem(tips+'_data'))
    let text = ''
    if(data != null){
        for(let i=1; i <= 6;i++){
            if(data[(data.length-i)] != null){
                if(tips == 'flow'){
                    if(data[(data.length-i)].tips == 'Input'){
                        text += '<div class="box_rct elts" style="border-left: 2.5px solid #02ec02;">'
                    }else{
                        text += '<div class="box_rct elts" style="border-left: 2.5px solid #F00;">'
                    }
                    text +=  '<span>'+data[(data.length-i)].name+'</span>'
                    text +=  '<span>'+data[(data.length-i)].date+'</span>'
                    text +=  '<span>$ '+data[(data.length-i)].value+'</span>'
                }
                else if(tips == 'earning'){
                    text += '<div class="box_rct elts" style="border-left: 2.5px solid #02ec02;">'
                    text +=  '<span>'+data[(data.length-i)].code+'</span>'
                    text +=  '<span>'+data[(data.length-i)].date+'</span>'
                    text +=  '<span>$ '+data[(data.length-i)].total+'</span>'
                }
                else{
                    if(data[(data.length-i)].tips == 'Purchase'){
                        text += '<div class="box_rct elts" style="border-left: 2.5px solid #02ec02;">'
                    }else{
                        text += '<div class="box_rct elts" style="border-left: 2.5px solid #F00;">'
                    }
                    text +=  '<span>'+data[(data.length-i)].code+'</span>'
                    text +=  '<span>'+data[(data.length-i)].date+'</span>'
                    text +=  '<span>$ '+data[(data.length-i)].total+'</span>'
                }
              
                text += '</div>'
            }
        }
    }
    document.querySelector('.recent_'+tips+'_'+local).innerHTML = text
    text= ''    
}

function push_values(page){
    if(page=='home'){
        const year = new Date().getFullYear()
        let list = [sum_data('report','report',year),sum_data('date','earning',year),
            sum_data('date','flow',year,'Input'),sum_data('date','flow',year,'Output')]

        for(let x=0;x < 4;x++){
            document.getElementById('value_home_'+(x+1)).innerHTML ='$ '+list[x].toFixed(2)
        }


    }
}

function data_graphic(page){
    let data = JSON.parse(localStorage.getItem('report_data'))
    let list_value = []
    let content = []
    let weeks = []

    if(data != null){
        for(let i=1;i <= 9;i++){
            if(data[(data.length-i)] != null){
                weeks.push(data[(data.length-i)].week)
                let ult = data[(data.length-i)].content
                for(let i =0; ult.length > i; i++){
                    list_value.push(parseFloat(ult[i][3]))
                }
                content.push(sum_list(list_value))
                list_value= []

            }else{

            }
        }
        let ctt_gphic = organize_list(weeks, content)
        
        graphic_home.data.labels = ctt_gphic[0]
        graphic_home.data.datasets[0].data = ctt_gphic[1]
        graphic_home.update()
    }

    
}

function organize_list(list,list_value){
    let new_list= []
    let new_value = []
    for(let i=0;list.length > i;i++){
        if(i == 0){
            new_list.push(list[i])
            new_value.push(list_value[i])
        }
        else if(i==1){
            if(list[i].substr(6, 2) >= new_list[0].substr(6, 2)){
                new_list.push(list[i])
                new_value.push(list_value[i])
            }else{
                new_list.unshift(list[i])
                new_value.unshift(list_value[i])
            }
        }
        else{
            if(list[i].substr(6, 2) <= new_list[0].substr(6, 2)){
                new_list.unshift(list[i])
                new_value.unshift(list_value[i])
            }
            else if(list[i].substr(6, 2) >= new_list[(new_list.length)-1].substr(6, 2)){
                new_list.push(list[i])
                new_value.push(list_value[i])
            }
            else{
                for(let x=1; new_list.length > x;x++){
                    if(new_list[x] != null){
                        if(new_list[x].substr(6, 2) >= list[i].substr(6, 2)){
                            new_list.splice((x), 0, list[i]);
                            new_value.splice((x), 0, list_value[i]);
                            break
                        }
                    }
                }
            }
        }
    }
    return [new_list,new_value]
}

let argts_search = `<li class="item_search elts" onclick="change_page('home')"><h3>Home</h3><span>/</span><div>page</div></li>`+
`<li class="item_search elts" onclick="redirection_page("money","payout")"><h3>Money</h3><span>/base</span><div>dashboard</div></li>`+
`<li class="item_search elts" onclick="redirection_page("money","analysis")"><h3>Money</h3><span>/analysis</span><div>dashboard</div></li>`+
`<li class="item_search elts" onclick="redirection_page("money","active")"><h3>Money</h3><span>/active</span><div>dashboard</div></li>`+
`<li class="item_search elts" onclick="redirection_page("money","wallet")"><h3>Money</h3><span>/wallet</span><div>dashboard</div></li>`+
`<li class="item_search elts" onclick="redirection_page("money","earning")"><h3>Money</h3><span>/earning</span><div>dashboard</div></li>`+
`<li class="item_search elts" onclick="redirection_page('create','base')"><h3>Create</h3><span>/base</span><div>form</div></li>`+
`<li class="item_search elts" onclick="redirection_page('create','earning')"><h3>Create</h3><span>/earning</span><div>form</div></li>`+
`<li class="item_search elts" onclick="redirection_page('create','flow')"><h3>Create</h3><span>/flow</span><div>form</div></li>`+
`<li class="item_search elts" onclick="redirection_page('create','record')"><h3>Create</h3><span>/record</span><div>form</div></li>`+
`<li class="item_search elts" onclick="redirection_page('create','report')"><h3>Create</h3><span>/report</span><div>form</div></li>`+
`<li class="item_search elts" onclick="redirection_page("Data","base")"><h3>Data</h3><span>/base</span><div>page</div></li>`+
`<li class="item_search elts" onclick="redirection_page("Data","earning")"><h3>Data</h3><span>/earning</span><div>page</div></li>`+
`<li class="item_search elts" onclick="redirection_page("Data","flow")"><h3>Data</h3><span>/flow</span><div>page</div></li>`+
`<li class="item_search elts" onclick="redirection_page("Data","record")"><h3>Data</h3><span>/record</span><div>page</div></li>`+
`<li class="item_search elts" onclick="redirection_page("Data","report")"><h3>Data</h3><span>/report</span><div>page</div></li>`+
`<li class="item_search elts" onclick="redirection_page("View","painel")"><h3>View</h3><span>/painel</span><div>dashboard</div></li>`+
`<li class="item_search elts" onclick="redirection_page("View","active")"><h3>View</h3><span>/active</span><div>dashboard</div></li>`+
`<li class="item_search elts" onclick="redirection_page("View","wallet")"><h3>View</h3><span>/wallet</span><div>dashboard</div></li>`+
`<li class="item_search elts" onclick="redirection_page("View","flow")"><h3>View</h3><span>/flow</span><div>dashboard</div></li>`+
`<li class="item_search elts" onclick="redirection_page("View","record")"><h3>View</h3><span>/record</span><div>dashboard</div></li>`+
`<li class="item_search elts" onclick="redirection_page("View","report")"><h3>View</h3><span>/report</span><div>dashboard</div></li>`+
`<li class="item_search elts" onclick="redirection_page("View","earning")"><h3>View</h3><span>/earning</span><div>dashboard</div></li>`


                  