/**
 * demo1.js
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2018, Codrops
 * http://www.codrops.com
 */
{
    // the settings for each one of the slides uncover instances.
    const uncoverOpts = [
        {
            // total number of slices.
            slicesTotal: 4,
            // slices color.
            slicesColor: '#F17872',
            // 'vertical' || 'horizontal'.
            orientation: 'vertical',
            // 'bottom' || 'top' for vertical orientation and 'right' || 'left' for horizontal orientation.
            slicesOrigin: {show: 'top', hide: 'bottom'}
        },
        {
            slicesTotal: 7, 
            slicesColor: '#F17872', 
            orientation: 'horizontal', 
            slicesOrigin:  {show: 'right', hide: 'right'}
        },
        {
            slicesTotal: 9,
            slicesColor: '#F17872',
            orientation: 'vertical',
            slicesOrigin:  {show: 'bottom', hide: 'bottom'}
        },
        {
            slicesTotal: 5,
            slicesColor: '#F17872',
            orientation: 'horizontal',
            slicesOrigin:  {show: 'left', hide: 'left'}
        },
        {
            slicesTotal: 6,
            slicesColor: '#F17872',
            orientation: 'vertical',
            slicesOrigin:  {show: 'bottom', hide: 'bottom'}
        }
    ];

    class Slideshow {
        constructor(el) {
            this.DOM = {el: el};
            this.DOM.slides = Array.from(this.DOM.el.querySelectorAll('.slide'));
            this.slidesTotal = this.DOM.slides.length;
            this.current = 0;
            this.uncoverItems = [];
            this.DOM.slides.forEach((slide,pos) => this.uncoverItems.push(new Uncover(slide.querySelector('.slide__img'), uncoverOpts[pos])));
            this.init();
        }
        init() {
            this.isAnimating = true;
            this.DOM.slides[this.current].classList.add('slide--current');
            this.uncoverItems[this.current].show(true, {
                image: {
                    duration: 2000,
                    delay: 350,
                    easing: 'easeOutCubic',
                    scale: [1.3,1]
                }
            }).then(() => this.isAnimating = false);
        }
        navigate(pos) {
            if ( this.isAnimating || this.current === pos || pos < 0 || pos > this.slidesTotal - 1 ) return;
            this.isAnimating = true;

            this.uncoverItems[this.current].hide(true).then(() => {
                this.DOM.slides[this.current].classList.remove('slide--current');
                this.current = pos;

                const newItem = this.uncoverItems[this.current];
                newItem.hide();
                this.DOM.slides[this.current].classList.add('slide--current');
                newItem.show(true, {
                    image: {
                        duration: 2000,
                        delay: 350,
                        easing: 'easeOutCubic',
                        scale: [1.3,1]
                    }
                }).then(() => this.isAnimating = false);
            });
        }
    }
    

    
    
    // Preload all the images in the page..
	imagesLoaded(document.querySelectorAll('.slide__img'), {background: true}, () => {
        document.body.classList.remove('loading');
        
        const slideshow = new Slideshow(document.querySelector('.slides'));
        
        const pagination = document.querySelector('.pagination');
        const triggers = Array.from(pagination.querySelectorAll('.pagination__item'));
        triggers.forEach((trigger,pos) => {
            if ( pos === 0 ) {
                trigger.classList.add('pagination__item--current');
            }
            trigger.addEventListener('click', function(){
                if ( slideshow.isAnimating ) return;
				clearInterval(timer);
				l_pos = pos;
                slideshow.navigate(pos);
                pagination.querySelector('.pagination__item--current').classList.remove('pagination__item--current');
                trigger.classList.add('pagination__item--current');
	    		timer = setInterval(loop,7000);
            })
        });
    
        document.addEventListener('keydown', (ev) => {
            if ( slideshow.isAnimating ) return;
            const keyCode = ev.keyCode || ev.which;
            let newpos;
            if ( keyCode === 37 ) {
                newpos = slideshow.current > 0 ? slideshow.current-1 : slideshow.slidesTotal-1;
                slideshow.navigate(newpos);
            }
            else if ( keyCode === 39 ) {
                newpos = slideshow.current < slideshow.slidesTotal-1 ? slideshow.current+1 : 0;
                slideshow.navigate(newpos);
            }
            else return;
            pagination.querySelector('.pagination__item--current').classList.remove('pagination__item--current');
            triggers[newpos].classList.add('pagination__item--current');
        });
            
	    /*图片定时切换*/
	    var timer = null;
	    var l_pos = 0;
	    var newpos = 0;
	    timer = setInterval(loop,7000);
	    function loop(){
            const pagination = document.querySelector('.pagination');
        	const triggers = Array.from(pagination.querySelectorAll('.pagination__item'));
        	if ( slideshow.isAnimating ) return;
            slideshow.navigate(l_pos);
            /*文字变色延时时间，与切换的百叶窗动画契合*/
            var timeout = 500;
            if(l_pos == 0){
            	timeout = 500;
            }else if(l_pos == 1){
            	timeout = 350;
            }else if(l_pos == 2){
            	timeout = 900;
            }else if(l_pos == 3){
            	timeout = 500;
            }else if(l_pos == 4){
            	timeout = 750;
            }
            setTimeout(
		        function(){
		            pagination.querySelector('.pagination__item--current').classList.remove('pagination__item--current');
		            triggers[newpos].classList.add('pagination__item--current');
		            newpos = l_pos < 4 ? l_pos+=1 : l_pos=0;
		        }
	        ,timeout);
	    }
        
    });
}
