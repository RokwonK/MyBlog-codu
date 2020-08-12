'use strict'


/* 
    Navbar 스크롤에 따라 투명 => 색깔로
*/ 
const navbar = document.querySelector('#navbar');
// 브라우저에서 실제로 보여지는 width와 height 받아옴
const navbar_height = navbar.getBoundingClientRect().height;

// scroll이 발생할 때 콜백함수 실행
document.addEventListener('scroll', () => {
    if (window.scrollY > navbar_height)
        navbar.classList.add('navbar__dark');
    else
        navbar.classList.remove('navbar__dark');
})

//-------------------------------------------------------

/*
    menu에서 클릭하는 곳으로 이동
*/
const navbar_menu = document.querySelector('.navbar__menu');
navbar_menu.addEventListener('click', (event) => {
    //data- 들 가져오기   event.target.dataset.link
    const target = event.target;
    const link = target.dataset.link;
    if (link == null) return;
    navbar_menu.classList.remove('active');

    scroll_to_view(link);
})

const home_contact = document.querySelector('.home__contact')
home_contact.addEventListener('click', () => {
    scroll_to_view('#contact');
})

// 해당되는 곳 요소를 가져오고 그곳으로 이동(smooth는 scroll식으로 내려감)
const scroll_to_view = (selector) => {
    const scroll_to = document.querySelector(selector); 
    scroll_to.scrollIntoView({behavior : "smooth"});
}

//모바일 환경 메뉴 토글 버튼 클릭 시 (보이게 안보이게 설정)
const toggle = document.querySelector(".navbar__toggle-btn");
const mobile_menu = document.querySelector(".navbar__menu");

toggle.addEventListener('click', () => {

    let have = mobile_menu.classList.contains('active');
    if (!have) mobile_menu.classList.add('active');
    else mobile_menu.classList.remove('active');

});

//---------------------------------------------------------

/* 
    Scroll시, Home 화면 점점 투명화 // 
*/


const home = document.querySelector('#home');
const home_height = home.getBoundingClientRect().height;
const up_btn = document.querySelector('.up');

document.addEventListener('scroll', () => {
    home.style.opacity = 1 - window.scrollY/home_height;
    up_btn.style.opacity = window.scrollY/home_height
})

up_btn.addEventListener('click', () => {
    scroll_to_view('#home')
})


//---------------------------------------------------------

/*
    각 분야별로 일치하는 Project만 가져오기
*/

const project_category_btn_group = document.querySelector('.work__categories');
const project_btn_group = document.querySelector('.work__projects');
const projects = document.querySelectorAll('.project');

project_category_btn_group.addEventListener('click', (event) => {
    const fillter = event.target.dataset.fillter || event.target.parentNode.dataset.fillter;
    
    if (fillter == null) return;

    //Remove active
    const active = document.querySelector('.category__btn.active');
    active.classList.remove('active');
    const t = event.target.nodeName === 'BUTTON' ? event.target : event.target.parentNode;
    t.classList.add('active');
    
    project_btn_group.classList.add('ani-out');

    setTimeout(()=> {
        project_btn_group.classList.remove('ani-out');
        projects.forEach(p => {
            if (fillter === '*' || fillter === p.dataset.type)
                p.classList.remove('invisible');
            else
                p.classList.add('invisible');
        })

    },300)

})


//---------------------------------------------------------

/*
    
*/

