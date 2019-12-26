'use strict';

const navs = document.querySelectorAll('.nav__link');

for (let nav of navs) {
	if (nav.href == document.location.href) {
		nav.classList.toggle('active');
	}
}
class Modal {
	constructor(openBtns, closeBtns, animation) {
		this.openBtns = openBtns;
		this.closeBtns = closeBtns;
		if (animation) {
			this.openAnimate = animation.openAnimate;
			this.closeAnimate = animation.closeAnimate;
		}

		for (let btn of this.openBtns) this.openModal(btn);
		for (let btn of this.closeBtns) this.closeModal(btn);
	}

	openModal(btn) {
		btn.addEventListener('click', () => {
			const attr = this.currAttr(btn);
			const modal = document.querySelector(`#${attr}`);
			this.openAnimate(modal);
		});
	};

	closeModal(btn) {
		btn.addEventListener('click', () => {
			const attr = this.currAttr(btn);
			const modal = document.querySelector(`#${attr}`);
			this.closeAnimate(modal);
		});
	};

	currAttr(btn) {
		return btn.hasAttribute('data-open') ? btn.getAttribute('data-open') : btn.getAttribute('data-close');
	}
}

const openBtns = document.querySelectorAll('.modal__open');
const closeBtns = document.querySelectorAll('.modal__close');

const modalClass = new Modal(openBtns, closeBtns, {

	openAnimate(modal) {
		modal.classList.add('active');
		document.body.classList.add('no-scroll');
		setTimeout(() => {
			modal.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
			modal.querySelector('.modal__dialog').style.transform = "rotateX(0)";
		}, 200);
	},

	closeAnimate(modal) {`			`
		modal.querySelector('.modal__dialog').style.transform = "rotateX(90deg)";
		modal.style.backgroundColor = null;
		setTimeout(() => {
			modal.classList.remove('active');
			document.body.classList.remove('no-scroll');
		}, 200);
	}
});

window.addEventListener('click', function (event) {
	const modals = document.querySelectorAll('.modal');

	for (let modal of modals) {
		if (event.target == modal) {
			modalClass.closeAnimate(modal);
		}
	}
});

$(document).ready(function(){
	$('#slider').slick({
		infinite: true,
		arrows: false,
		dots: true,
		speed: 800,
		slidesToScroll: 2,
		slidesToShow: 2,
		pauseOnFocus: true,
	
		responsive: [{
	
	      breakpoint: 768,
	      settings: {
	        slidesToShow: 1,
	        slidesToScroll: 1
	      }
	
	    }]
	});
	
	$('#left').on('click', function(event) {
		event.preventDefault();
		$('#slider').slick('slickPrev');
	});
	
	$('#right').on('click', function(event) {
		event.preventDefault();
		$('#slider').slick('slickNext');
	});
});