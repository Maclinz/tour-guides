const barcelona = document.querySelector('.barcelona');
const oxford = document.querySelector('.oxford');
const cursor = document.querySelector('.cursor');
const cursorText = document.querySelector('.cursor-text');
const victoria = document.querySelector('.victoria');
const holiday = document.querySelectorAll('.holiday');
const nav = document.querySelector('.header');
const exploreButton = document.querySelector('.btn-explore');
const burgerMenu = document.querySelector('.menu');
const theme = document.querySelector('.slider');

let controller;
let fillScene;
let pageScene;
let guideScene;

function fillAnimate(){
    //initialize controller
    controller = new ScrollMagic.Controller();
    //loop over fillers
    holiday.forEach((holiday, i, holidays) =>{
        const imageFiller = holiday.querySelector('.image-filler');
        const img = holiday.querySelector('img');
        const textFiller = holiday.querySelector('.text-filler');

        const sliderTl = gsap.timeline({defaults: {duration: 1, ease: 'power2.inOut'}});

        sliderTl.fromTo(imageFiller, {x: '0%'}, {x: '100%'})
        sliderTl.fromTo(img, {scale: 2}, {scale: 1}, '-=1')
        sliderTl.fromTo(textFiller, {x: '0%'}, {x: '100%'}, '-=.73')
        sliderTl.fromTo(nav,  {y: '-100%', ease: 'elastic.out(1, 0.3)'}, {y: '0%' , ease: 'elastic.out(1, 0.3)'}, '-=.56')
        //Scene for scroll animations
        fillScene = new ScrollMagic.Scene({
            triggerElement: holiday,
            triggerHook: 0.25,
            reverse: false
        })
        .setTween(sliderTl)
        //.addIndicators({colorStart: 'white', colorTrigger: 'white'})
        .addTo(controller)

        //Page Timeline
        const pageTl = gsap.timeline();
        let nextSlide = holidays.length - 1 === i ? 'end': holidays[i + 1];
        pageTl.fromTo(nextSlide, {y: '0%'}, {y: '50%'});
        pageTl.fromTo(holiday, {opacity: 1, scale: 1}, {opacity: 0, scale: 0})
        pageTl.fromTo(nextSlide, {y: '50%'}, {y: '0%'}, '-=0.5');
        //Create Scene
        pageScene = new ScrollMagic.Scene({
            triggerElement: holiday,
            triggerHook: 0,
            reverse: true,
            duration: '100%'
        })
        .setTween(pageTl)
        .setPin(holiday,{pushFollowers: false})
        //.addIndicators({name: 'page', indent: 200})
        .addTo(controller)
    })
}

function guideAnimation(){
    controller = new ScrollMagic.Controller();
    const guides = document.querySelectorAll('.guide-slide');
    guides.forEach((guide,i, guides) => {
        let nextSlide = guides.length - 1 === i ? 'end': guides[i + 1];
        guideTl = gsap.timeline({defaults: {duration: 1}});
        const nextGuide = nextSlide.querySelector('img');
        const spanNumbers = nextSlide.querySelector('.t-g-number');
        guideTl.fromTo(guide, {opacity: 1}, { opacity: 0})
        guideTl.fromTo(nextGuide, {opacity: 0}, { opacity: 1}, '-=1');
        guideTl.fromTo(nextGuide, {x: '200px'}, { x: '0px'}, '-=1');
        guideTl.fromTo(spanNumbers, {x: '-800px', rotate: 90 }, { x: '0px', rotate: 0}, '-=1');
        //Scene
        guideScene = new ScrollMagic.Scene({
            triggerElement: guide,
            duration: '100%',
            triggerHook: 0
        })
        .setPin(guide, {pushFollowers:false})
        .setTween(guideTl)
        .addTo(controller)
    })
}


//////////////////////////Event Listeners Start/////////////////////////////////////////
window.addEventListener('mousemove', (e) =>{
    cursor.style.top = e.pageY + 'px';
    cursor.style.left = e.pageX + 'px';
})

//Mouseover Animations
window.addEventListener('mouseover',(e) => {
    const item = e.target;
    if(item.classList.contains('mouse-anim')){
        cursor.classList.add('cursor-fill')
    }else{
        cursor.classList.remove('cursor-fill')
        
    }

    if(item.classList.contains('mouse-anim2')){
        cursor.classList.add('cursor-fill2');
        cursorText.innerHTML = 'View';
    }else{
        cursor.classList.remove('cursor-fill2')
        cursorText.innerHTML = ''
    }
})

//Toggle Nav
burgerMenu.addEventListener('click', (e) =>{
    if(!e.target.classList.contains('active')){
        e.target.classList.add('active');
        gsap.to('.line-1', 0.5, {rotate: '45', y: 5});
        gsap.to('.line-2', 0.5, {rotate: '-45', y : -5});
        gsap.to('.nav-bar', 1, {clipPath: 'circle(2500px at 100% -10%)'});
        document.body.classList.add('hide');
    }else{
        e.target.classList.remove('active');
        gsap.to('.line-1', 0.5, {rotate: '0', y: 0});
        gsap.to('.line-2', 0.5, {rotate: '0', y : 0});
        gsap.to('.nav-bar', 1, {clipPath: 'circle(0% at 100% -10%)'});
        document.body.classList.remove('hide');
    }
    
})

theme.addEventListener('click', () => {
    if(!document.body.classList.contains('light-theme')){
        document.body.classList.add('light-theme');
        document.body.classList.remove('dark-theme')
    }else{
        document.body.classList.add('dark-theme');
        document.body.classList.remove('light-theme');
    }
})
//////////////////////////Event Listeners End/////////////////////////////////////////

guideAnimation();
fillAnimate();
