function change_tab(page,tab){
    document.querySelector('.slt_'+page).classList.remove('slt_'+page)
    document.querySelector('.'+tab+'_nav').classList.add('slt_'+page)
    document.querySelector('.'+page+'_page').setAttribute('page',tab)
    
    load_create()
}
function redirection_page(local_page, content_page){
    let base_redirection = JSON.parse(localStorage.getItem('base_redirection') || '[]')
    base_redirection.push({
        local: local_page,
        content: content_page
    })
    localStorage.setItem('base_redirection',JSON.stringify(base_redirection))
    location.href = '../'+local_page+'/index.html'
}

function change_form(tab,tips){
    let text = ''
    document.querySelector('.mark_form_'+tab).classList.remove('mark_form_'+tab)
    document.querySelector('.'+tab+'_'+tips).classList.add('mark_form_'+tab)

    if(tips == 'data'){
        text = "add('"+tab+"')"
        action_ipt(tab,false,9)
        document.querySelector('.ipt_'+tab+'_1').readOnly = true;

        if(tab == 'base'){
            document.querySelector('.ipt_'+tab+'_1').readOnly = false;
            document.querySelector('.ipt_'+tab+'_1').setAttribute("onchange","authenticate_active()")
        }
        document.querySelector('.delete_'+tab).setAttribute('style','display : none;')
        
    }
    else if(tips == 'search'){
        document.querySelector('.ipt_'+tab+'_1').setAttribute('onchange','')
        text = "search_form('"+tab+"')"
        action_ipt(tab,true,9)
        document.querySelector('.ipt_'+tab+'_1').readOnly = false;
        document.querySelector('.delete_'+tab).setAttribute('style','display:flex;')
    }
    else if(tips == 'modify'){
        document.querySelector('.ipt_'+tab+'_1').setAttribute('onchange','')
        text = "modify('"+tab+"')"
        action_ipt(tab,true,9)
        document.querySelector('.ipt_'+tab+'_1').readOnly = false;
        document.querySelector('.delete_'+tab).setAttribute('style','display : none;')
    }

    document.querySelector('.'+tab+'_action').setAttribute('onclick',text)
    reset(tab)
}