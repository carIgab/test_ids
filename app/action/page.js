function change_colors(){
    let mode = JSON.parse(localStorage.getItem('mode_color') || '[]')
    let logo_img = document.querySelector('.logo_img')
    if(mode == ""){
        document.body.classList.add('light')
        logo_img.setAttribute('src','../../img/menu/logo_light.png')
        mode.push('light')
        localStorage.setItem('mode_color',JSON.stringify(mode))

    }else{
        document.body.classList.remove('light')
        logo_img.setAttribute('src','../../img/menu/logo_black.png')
        localStorage.removeItem('mode_color')
    }
}

function active_menu(){
    document.querySelector('.menu').classList.toggle('active')
    document.querySelector('.btn_menu').classList.toggle('at_menu')
}

function search_page(page, type){
    if(type == 'exit'){
        document.getElementById('camp_search_'+page).classList.remove('act_search')
        document.getElementById('ipt_search_'+page).value = ''
    }else{
        document.getElementById('camp_search_'+page).classList.add('act_search')

        let input = document.getElementById('ipt_search_home').value
        input=input.toLowerCase();
        let x = document.getElementsByClassName('item_search');
          
        for (i = 0; i < x.length; i++) { 
            if (!x[i].innerHTML.toLowerCase().includes(input)) {
                x[i].style.display="none";
            }
            else {
                x[i].style.display="flex";                 
            }
        }
    
    }
    
}

function change_page(page){
    location.href = '../'+page+'/index.html'
}

function active_calc(){
    document.querySelector('.camp_calculator').classList.toggle('act_calc')
    document.querySelector('.btn_calc').classList.toggle('at_calc')
}