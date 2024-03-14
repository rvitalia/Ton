import Swiper from "swiper";
import { Controller, Navigation } from 'swiper/modules';

function checkActive(){
    let tabs = document.querySelector('.question__bottom');
    let activeTab = tabs.querySelector('.active');
    return activeTab;
}

 function initSlider(activeItem) {
    setTimeout(() => {
        activeItem.style.transform = 'rotateY(0)';
    }, 100);

    const slidertop = activeItem.querySelector('.question__slider__top');
    // console.log(slidertop);
    const sliderbottom = activeItem.querySelector('.question__slider__bottom');
    // console.log(sliderbottom);

    let swiperBottom = new Swiper(sliderbottom, {
        slidesPerView: 4,
        spaceBetween: 15,
        loopedSlides: 4,
        freeMode: true,
        // loop: true,
        // observer: true,
        // observeParents: true,
        // observeSlideChildren: true,
        direction: 'horizontal',
        modules: [Controller],
        // modules: [Navigation, Controller],
        controller: {
            control: null, // Указываем, что горизонтальный слайдер контролирует вертикальный
        },
    })

    let swiperMain = new Swiper(slidertop, {
        slidesPerView: 1,
        spaceBetween: 10,
        loopedSlides: 4,
        // observer: true,
        // observeParents: true,
        // observeSlideChildren: true,
        // loop: true,
        direction: 'horizontal',
        modules: [Navigation, Controller],
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        controller: {
            control: swiperBottom, // Отключение автоматического управления
        },
    })

};


function startSlider(){
    //запускаем, считываем текущий таб
    let activeTab = checkActive();
    initSlider(activeTab);
}

function stopSliders(parrentLi){
    const slidertop = parrentLi.querySelector('.question__slider__top');
    const sliderbottom = parrentLi.querySelector('.question__slider__bottom');
    let swiperBottom = new Swiper(sliderbottom);
    let swiperMain = new Swiper(slidertop);
    swiperBottom.destroy();
    swiperMain.destroy();
}


function changeTabs(){
    selectButtons.forEach(element => {
        element.addEventListener('click', ()=>{
            //убираем со всех элементов активный класс и останавливаем слайдер
            for (const iterator of selectButtons) {
                iterator.classList.remove('active');
            }
            for (const iterator of selectTabs) {
                let activeTab = checkActive();
                stopSliders(activeTab);
                iterator.style.transform = 'rotateY(90deg)';
                setTimeout(() => {
                    iterator.classList.remove('active');
                }, 20);
            }
            let newTab = document.querySelector(`[data-choice=${element.dataset.select}]`);
            setTimeout(() => {
                newTab.classList.add('active');
                element.classList.add('active');
            }, 50);
            initSlider(newTab);
            // console.log(newTab);
        })
    });
}



//запускаем слайдер
startSlider();


//смена табов 

let selectButtons = document.querySelectorAll('[data-select]');
let selectTabs = document.querySelectorAll('[data-choice]');

if(selectButtons.length > 0 && selectTabs.length > 0){
    changeTabs();
}