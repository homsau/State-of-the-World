interact('.draggable')
  .draggable({
	// enable inertial throwing
	inertia: false,
	// keep the element within the area of it's parent
	restrict: {
		restriction: "parent",
		endOnly: true,
		elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
	},
	  
	// enable autoScroll
	autoScroll: false,

	// call this function on every dragmove event
	onmove: dragMoveListener,
	// call this function on every dragend event
	
});
function dragMoveListener (event) {
	var target = event.target,
		// keep the dragged position in the data-x/data-y attributes
		x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
		y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

	// translate the element
	target.style.webkitTransform =
	target.style.transform =
	'translate(' + x + 'px, ' + y + 'px)';

	// update the posiion attributes
	target.setAttribute('data-x', x);
	target.setAttribute('data-y', y);
}

// this is used later in the resizing and gesture demos
window.dragMoveListener = dragMoveListener;


// enable draggables to be dropped into this
interact('.dropzone').dropzone({
// only accept elements matching this CSS selector
	accept: '.drag-drop', 
	// Require a 75% element overlap for a drop to be possible
	overlap: 0.75,

	// listen for drop related events:

	ondropactivate: function (event) {
		// add active dropzone feedback
		event.target.classList.add('drop-active');
	},
	ondragenter: function (event) {
		var draggableElement = event.relatedTarget,
			dropzoneElement = event.target;

		// feedback the possibility of a drop
		dropzoneElement.classList.add('drop-target');
		draggableElement.classList.add('can-drop');
	
	},
	ondragleave: function (event) {
		// remove the drop feedback style
		event.target.classList.remove('drop-target');
		event.relatedTarget.classList.remove('can-drop');
	},

	ondropdeactivate: function (event) {
		// remove active dropzone feedback
		event.target.classList.remove('drop-active');
		event.target.classList.remove('drop-target');
	}
});
interact('.drop').dropzone({
	// only accept elements matching this CSS selector
	accept: '.answer', 
	// Require a 75% element overlap for a drop to be possible
	overlap: 0.75,
	
	// listen for drop related events:
	
	ondropactivate: function (event) {
		// add active dropzone feedback
		event.target.classList.add('drop-active');
	},
	ondragenter: function (event) {
		var draggableElement = event.relatedTarget,
			dropzoneElement = event.target;
	
		// feedback the possibility of a drop
		dropzoneElement.classList.add('drop-target');
		draggableElement.classList.add('can-drop');
		draggableElement.textContent = 'Are you sure?';
	},
	ondragleave: function (event) {
		// remove the drop feedback style
		event.target.classList.remove('drop-target');
		event.relatedTarget.classList.remove('can-drop');
	},
	ondrop: function (event) {
		if ($(event.relatedTarget).hasClass( "correct" ) ) {
		event.relatedTarget.textContent = 'Correct! Nice Job!';
		}
		else { event.relatedTarget.textContent = 'Whoops! Try Again';
		}
	},
	ondropdeactivate: function (event) {
		// remove active dropzone feedback
		event.target.classList.remove('drop-active');
		event.target.classList.remove('drop-target');
	}
});
interact('.drop1').dropzone({
	// only accept elements matching this CSS selector
	accept: '.answer1', 
	// Require a 75% element overlap for a drop to be possible
	overlap: 0.75,
	
	// listen for drop related events:
	
	ondropactivate: function (event) {
		// add active dropzone feedback
		event.target.classList.add('drop-active');
	},
	ondragenter: function (event) {
		var draggableElement = event.relatedTarget,
			dropzoneElement = event.target;
	
		// feedback the possibility of a drop
		dropzoneElement.classList.add('drop-target');
		draggableElement.classList.add('can-drop');
		draggableElement.textContent = 'Are you sure?';
	},
	ondragleave: function (event) {
		// remove the drop feedback style
		event.target.classList.remove('drop-target');
		event.relatedTarget.classList.remove('can-drop');
	},
	ondrop: function (event) {
		if ($(event.relatedTarget).hasClass( "correct" ) ) {
		event.relatedTarget.textContent = 'Correct! Nice Job!';
		}
		else { event.relatedTarget.textContent = 'Whoops! Try Again';
		}
	},
	ondropdeactivate: function (event) {
		// remove active dropzone feedback
		event.target.classList.remove('drop-active');
		event.target.classList.remove('drop-target');
	}
});
interact('.drop2').dropzone({
	// only accept elements matching this CSS selector
	accept: '.answer2', 
	// Require a 75% element overlap for a drop to be possible
	overlap: 0.75,
	
	// listen for drop related events:
	
	ondropactivate: function (event) {
		// add active dropzone feedback
		event.target.classList.add('drop-active');
	},
	ondragenter: function (event) {
		var draggableElement = event.relatedTarget,
			dropzoneElement = event.target;
	
		// feedback the possibility of a drop
		dropzoneElement.classList.add('drop-target');
		draggableElement.classList.add('can-drop');
		draggableElement.textContent = 'Are you sure?';
	},
	ondragleave: function (event) {
		// remove the drop feedback style
		event.target.classList.remove('drop-target');
		event.relatedTarget.classList.remove('can-drop');
	},
	ondrop: function (event) {
		if ($(event.relatedTarget).hasClass( "correct" ) ) {
		event.relatedTarget.textContent = 'Correct! Nice Job!';
		}
		else { event.relatedTarget.textContent = 'Whoops! Try Again';
		}
	},
	ondropdeactivate: function (event) {
		// remove active dropzone feedback
		event.target.classList.remove('drop-active');
		event.target.classList.remove('drop-target');
	}
});
interact('.drop3').dropzone({
	// only accept elements matching this CSS selector
	accept: '.answer3', 
	// Require a 75% element overlap for a drop to be possible
	overlap: 0.75,
	
	// listen for drop related events:
	
	ondropactivate: function (event) {
		// add active dropzone feedback
		event.target.classList.add('drop-active');
	},
	ondragenter: function (event) {
		var draggableElement = event.relatedTarget,
			dropzoneElement = event.target;
	
		// feedback the possibility of a drop
		dropzoneElement.classList.add('drop-target');
		draggableElement.classList.add('can-drop');
		draggableElement.textContent = 'Are you sure?';
	},
	ondragleave: function (event) {
		// remove the drop feedback style
		event.target.classList.remove('drop-target');
		event.relatedTarget.classList.remove('can-drop');
	},
	ondrop: function (event) {
		if ($(event.relatedTarget).hasClass( "correct" ) ) {
		event.relatedTarget.textContent = 'Correct! Nice Job!';
		}
		else { event.relatedTarget.textContent = 'Whoops! Try Again';
		}
	},
	ondropdeactivate: function (event) {
		// remove active dropzone feedback
		event.target.classList.remove('drop-active');
		event.target.classList.remove('drop-target');
	}
});
interact('.drop4').dropzone({
	// only accept elements matching this CSS selector
	accept: '.answer4', 
	// Require a 75% element overlap for a drop to be possible
	overlap: 0.65,
	
	// listen for drop related events:
	
	ondropactivate: function (event) {
		// add active dropzone feedback
		event.target.classList.add('drop-active');
	},
	ondragenter: function (event) {
		var draggableElement = event.relatedTarget,
			dropzoneElement = event.target;
	
		// feedback the possibility of a drop
		dropzoneElement.classList.add('drop-target');
		draggableElement.classList.add('can-drop');
	},
	ondragleave: function (event) {
		// remove the drop feedback style
		event.target.classList.remove('drop-target');
		event.relatedTarget.classList.remove('can-drop');
	},
	ondrop: function (event) {
		if ($(event.relatedTarget).hasClass( "correct" ) ) {
		$("#reply").html('Correct! Nice Job!');
		}
		else {  
		$("#reply").html('Whoops! Try Again');
		}
	},
	ondropdeactivate: function (event) {
		// remove active dropzone feedback
		event.target.classList.remove('drop-active');
		event.target.classList.remove('drop-target');
	}
});
interact('.drop4a').dropzone({
	// only accept elements matching this CSS selector
	accept: '.answer4', 
	// Require a 75% element overlap for a drop to be possible
	overlap: 0.65,
	
	// listen for drop related events:
	
	ondropactivate: function (event) {
		// add active dropzone feedback
		event.target.classList.add('drop-active');
	},
	ondragenter: function (event) {
		var draggableElement = event.relatedTarget,
			dropzoneElement = event.target;
	
		// feedback the possibility of a drop
		dropzoneElement.classList.add('drop-target');
		draggableElement.classList.add('can-drop');
	},
	ondragleave: function (event) {
		// remove the drop feedback style
		event.target.classList.remove('drop-target');
		event.relatedTarget.classList.remove('can-drop');
	},
	ondrop: function (event) {
		if ($(event.relatedTarget).hasClass( "correct" ) ) {
		$("#reply").html('Whoops! Try Again');
		}
		else {  
		$("#reply").html('Whoops! Try Again');
		}
	},
	ondropdeactivate: function (event) {
		// remove active dropzone feedback
		event.target.classList.remove('drop-active');
		event.target.classList.remove('drop-target');
	}
});
interact('.drop4b').dropzone({
	// only accept elements matching this CSS selector
	accept: '.answer4', 
	// Require a 75% element overlap for a drop to be possible
	overlap: 0.65,
	
	// listen for drop related events:
	
	ondropactivate: function (event) {
		// add active dropzone feedback
		event.target.classList.add('drop-active');
	},
	ondragenter: function (event) {
		var draggableElement = event.relatedTarget,
			dropzoneElement = event.target;
	
		// feedback the possibility of a drop
		dropzoneElement.classList.add('drop-target');
		draggableElement.classList.add('can-drop');
	},
	ondragleave: function (event) {
		// remove the drop feedback style
		event.target.classList.remove('drop-target');
		event.relatedTarget.classList.remove('can-drop');
	},
	ondrop: function (event) {
		if ($(event.relatedTarget).hasClass( "correct" ) ) {
		$("#reply").html('Whoops! Try Again')
		}
		else {  
		$("#reply").html('Whoops! Try Again');
		}
	},
	ondropdeactivate: function (event) {
		// remove active dropzone feedback
		event.target.classList.remove('drop-active');
		event.target.classList.remove('drop-target');
	}
});
interact('.drop6').dropzone({
	// only accept elements matching this CSS selector
	accept: '.answer6', 
	// Require a 75% element overlap for a drop to be possible
	overlap: 0.75,
	
	// listen for drop related events:
	
	ondropactivate: function (event) {
		// add active dropzone feedback
		event.target.classList.add('drop-active');
	},
	ondragenter: function (event) {
		var draggableElement = event.relatedTarget,
			dropzoneElement = event.target;
	
		// feedback the possibility of a drop
		dropzoneElement.classList.add('drop-target');
		draggableElement.classList.add('can-drop');
		draggableElement.textContent = 'Are you sure?';
	},
	ondragleave: function (event) {
		// remove the drop feedback style
		event.target.classList.remove('drop-target');
		event.relatedTarget.classList.remove('can-drop');
	},
	ondrop: function (event) {
		if ($(event.relatedTarget).hasClass( "c" ) ) {
		event.relatedTarget.textContent = 'Correct! Nice Job!';
		}
		else { event.relatedTarget.textContent = 'Whoops! Try Again';
		}
	},
	ondropdeactivate: function (event) {
		// remove active dropzone feedback
		event.target.classList.remove('drop-active');
		event.target.classList.remove('drop-target');
	}
});
interact('.drop6a').dropzone({
	// only accept elements matching this CSS selector
	accept: '.answer6', 
	// Require a 75% element overlap for a drop to be possible
	overlap: 0.75,
	
	// listen for drop related events:
	
	ondropactivate: function (event) {
		// add active dropzone feedback
		event.target.classList.add('drop-active');
	},
	ondragenter: function (event) {
		var draggableElement = event.relatedTarget,
			dropzoneElement = event.target;
	
		// feedback the possibility of a drop
		dropzoneElement.classList.add('drop-target');
		draggableElement.classList.add('can-drop');
		draggableElement.textContent = 'Are you sure?';
	},
	ondragleave: function (event) {
		// remove the drop feedback style
		event.target.classList.remove('drop-target');
		event.relatedTarget.classList.remove('can-drop');
	},
	ondrop: function (event) {
		if ($(event.relatedTarget).hasClass( "b" ) ) {
		event.relatedTarget.textContent = 'Correct! Nice Job!';
		}
		else { event.relatedTarget.textContent = 'Whoops! Try Again';
		}
	},
	ondropdeactivate: function (event) {
		// remove active dropzone feedback
		event.target.classList.remove('drop-active');
		event.target.classList.remove('drop-target');
	}
});
interact('.drop6b').dropzone({
	// only accept elements matching this CSS selector
	accept: '.answer6', 
	// Require a 75% element overlap for a drop to be possible
	overlap: 0.75,
	
	// listen for drop related events:
	
	ondropactivate: function (event) {
		// add active dropzone feedback
		event.target.classList.add('drop-active');
	},
	ondragenter: function (event) {
		var draggableElement = event.relatedTarget,
			dropzoneElement = event.target;
	
		// feedback the possibility of a drop
		dropzoneElement.classList.add('drop-target');
		draggableElement.classList.add('can-drop');
		draggableElement.textContent = 'Are you sure?';
	},
	ondragleave: function (event) {
		// remove the drop feedback style
		event.target.classList.remove('drop-target');
		event.relatedTarget.classList.remove('can-drop');
	},
	ondrop: function (event) {
		if ($(event.relatedTarget).hasClass( "d" ) ) {
		event.relatedTarget.textContent = 'Correct! Nice Job!';
		}
		else { event.relatedTarget.textContent = 'Whoops! Try Again';
		}
	},
	ondropdeactivate: function (event) {
		// remove active dropzone feedback
		event.target.classList.remove('drop-active');
		event.target.classList.remove('drop-target');
	}
});
interact('.drop6c').dropzone({
	// only accept elements matching this CSS selector
	accept: '.answer6', 
	// Require a 75% element overlap for a drop to be possible
	overlap: 0.75,
	
	// listen for drop related events:
	
	ondropactivate: function (event) {
		// add active dropzone feedback
		event.target.classList.add('drop-active');
	},
	ondragenter: function (event) {
		var draggableElement = event.relatedTarget,
			dropzoneElement = event.target;
	
		// feedback the possibility of a drop
		dropzoneElement.classList.add('drop-target');
		draggableElement.classList.add('can-drop');
		draggableElement.textContent = 'Are you sure?';
	},
	ondragleave: function (event) {
		// remove the drop feedback style
		event.target.classList.remove('drop-target');
		event.relatedTarget.classList.remove('can-drop');
	},
	ondrop: function (event) {
		if ($(event.relatedTarget).hasClass( "a" ) ) {
		event.relatedTarget.textContent = 'Correct! Nice Job!';
		}
		else { event.relatedTarget.textContent = 'Whoops! Try Again';
		}
	},
	ondropdeactivate: function (event) {
		// remove active dropzone feedback
		event.target.classList.remove('drop-active');
		event.target.classList.remove('drop-target');
	}
});
interact('.drop7').dropzone({
	// only accept elements matching this CSS selector
	accept: '.answer7', 
	// Require a 75% element overlap for a drop to be possible
	overlap: 0.75,
	
	// listen for drop related events:
	
	ondropactivate: function (event) {
		// add active dropzone feedback
		event.target.classList.add('drop-active');
	},
	ondragenter: function (event) {
		var draggableElement = event.relatedTarget,
			dropzoneElement = event.target;
	
		// feedback the possibility of a drop
		dropzoneElement.classList.add('drop-target');
		draggableElement.classList.add('can-drop');
		draggableElement.textContent = 'Are you sure?';
	},
	ondragleave: function (event) {
		// remove the drop feedback style
		event.target.classList.remove('drop-target');
		event.relatedTarget.classList.remove('can-drop');
	},
	ondrop: function (event) {
		if ($(event.relatedTarget).hasClass( "correct" ) ) {
		event.relatedTarget.textContent = 'Correct! Nice Job!';
		}
		else { event.relatedTarget.textContent = 'Whoops! Try Again';
		}
	},
	ondropdeactivate: function (event) {
		// remove active dropzone feedback
		event.target.classList.remove('drop-active');
		event.target.classList.remove('drop-target');
	}
});