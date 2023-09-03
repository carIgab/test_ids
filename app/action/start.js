
function start(){
    let page = document.body.getAttribute('page')
    let space = document.getElementById('content_search_'+page)
    //space.innerHTML = argts_search
    mode_color()

    if(page == 'home'){
        push_recent(page)
        push_values(page)
        make_graphic(page)
        data_graphic(page)
        
    }else if(page == 'money'){

    }else if(page == 'create'){
        load_create()
    }
}

function mode_color(){
    let logo_img = document.querySelector('.logo_img')
    let mode = JSON.parse(localStorage.getItem('mode_color') || '[]')
    if(mode != ""){
        document.body.classList.add('light')
        logo_img.setAttribute('src','../../img/menu/logo_light.png')
    }
}

function load_create(){
    let tab = document.querySelector('.create_page').getAttribute('page')
    let base_redirection = JSON.parse(localStorage.getItem('base_redirection'))
  
    if(JSON.parse(localStorage.getItem('base_redirection')) != null){
        document.querySelector('.content_page').setAttribute('page',base_redirection[0].content)
        localStorage.removeItem('base_redirection')
        document.querySelector('.slt_create').classList.remove('slt_create')
        document.querySelector('.'+base_redirection[0].content+"_nav").classList.add('slt_create')
        start()
    }
    
    if(tab != 'base'){
        if(tab == 'record'){
            let data = JSON.parse(localStorage.getItem('record_data')) 
            let request = document.querySelector('.ipt_record_2')
            if(data != null){
                let num = parseInt(data[data.length-1].request)+1
                request.value = num
            }else{
                request.value = 1
            }
            
        }

        else if(tab == 'report'){
            let data = search_record()
            let n_active = data.code.length
            let n = Math.ceil(n_active/8)
        
            push_report(n)
            index_hearder(1,n)
        }

        push_order(tab)
    }
}


start()