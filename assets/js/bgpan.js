'use strict';

const imgPath = 'assets/img/screenshot_1723752769100.webp';
const desiredPxPerSec = 5;
const minDuration = 5; // seconds, avoid extremely short durations
const body = document.querySelector('body.anim-page') || document.body;

function computeAndApply(imgW, imgH) {
	// If we don't have reliable image dimensions, disable the pan
	// instead of falling back to a hard-coded guess.
	if (!imgW || !imgH) {
		body.style.animation = 'none';
		return;
	}

	const vw = window.innerWidth;
	const vh = window.innerHeight;
	const scale = Math.max(vw / imgW, vh / imgH);
	const displayedWidth = imgW * scale;
	const distance = Math.max(0, displayedWidth - vw);

	if (distance < 1) {
		// No horizontal room to pan — disable animation
		body.style.animation = 'none';
		return;
	}

	const duration = Math.max(minDuration, distance / desiredPxPerSec);
	// Apply inline animation so it matches the computed duration exactly.
	body.style.animation = `bgPan ${duration}s linear infinite`;
}

function init() {
	const img = new Image();
	img.src = imgPath;
	img.onload = function () {
		if (img.naturalWidth && img.naturalHeight) computeAndApply(img.naturalWidth, img.naturalHeight);
		else body.style.animation = 'none';
	};
	img.onerror = function () {
		// If the image can't load, disable the animation rather than guessing sizes.
		body.style.animation = 'none';
	};

	let t;
	window.addEventListener('resize', function () {
		clearTimeout(t);
		t = setTimeout(function () {
			if (img.naturalWidth && img.naturalHeight) computeAndApply(img.naturalWidth, img.naturalHeight);
		}, 150);
	});
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
