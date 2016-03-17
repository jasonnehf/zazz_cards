'use strict';
var app = angular.module('zazzCardApp');
app.controller('gameCtrl', function($scope, CardFactory) {

	CardFactory.fetch().then(function(res) {
		$scope.showCards=false;
		$scope.cards = res.data;
		$scope.myInterval = 0;
		$scope.noWrapSlides = false;
		$scope.active = 0;
		$scope.slides = angular.copy($scope.cards);
		$scope.hideAnswer=true;

		var cats=$scope.cards.map(e=>e.CategoryName);
		$scope.categories={};
		cats.forEach(c=>$scope.categories[c]=c);
		console.log($scope.categories);

		// console.log('scope slides', $scope.slides);

		$scope.cardImage='media/cardbg.gif';
			// $rootScope.slides = slides;
			// console.log("slides: ", slides)
			// console.log("scope: ", $scope)
			// console.log("scope parent: ", $scope.$parent)
			// debugger;
		// for (var i=0; i<$scope.cards.length*2; i++) {
  // 		  $scope.slides.push(
  // 		  {
		// 	image: '/../media/cardbg.gif',
		// 	text:(i%2 ? $scope.cards[Math.floor(i/2)].Answer : $scope.cards[Math.floor(i/2)].Question),
		// 	id: i
		// 	});
  // 		}
  		console.log($scope.slides);
  		$('#choose-category-modal').modal('show');
	}, function(err) {
		console.log('err: ', err);
	});

	$scope.setCategory = function(cat) {
		if(!cat) $scope.categoryName=undefined;
		$scope.categoryName=angular.copy(cat);
		$('#choose-category-modal').modal('hide');
		$scope.showCards=true;
	}

	$scope.debug = function() {
		// debugger;
	}
	$scope.addSlide = function() {
		console.log("add slides");
		// debugger;
		return true;
	};

	$scope.toggleAnswer = function() {
		$scope.hideAnswer=!$scope.hideAnswer;
		// debugger;
	}

	$scope.showAnswer = function()
	{
		$scope.hideAnswer=false;
	}

	$scope.randomize = function() {
		var indexes = generateIndexesArray();
		assignNewIndexesToSlides(indexes);
	};
	// Randomize logic below
	function assignNewIndexesToSlides(indexes) {
		for (var i = 0, l = slides.length; i < l; i++) {
			$scope.slides[i].id = indexes.pop();
		}
	}

	function generateIndexesArray() {
		var indexes = [];
		for (var i = 0; i < currIndex; ++i) {
			indexes[i] = i;
		}
		return shuffle(indexes);
	}
	// http://stackoverflow.com/questions/962802#962890
	function shuffle(array) {
		var tmp, current, top = array.length;
		if (top) {
			while (--top) {
				current = Math.floor(Math.random() * (top + 1));
				tmp = array[current];
				array[current] = array[top];
				array[top] = tmp;
			}
		}
		return array;
	}

	$scope.mouseLeave = function(){
		$scope.hideAnswer=true;
		var $rightArrowElt=document.querySelectorAll("a.right.carousel-control>span")[0];
		$rightArrowElt.classList.remove('animated', 'infinite', 'rubberBand');
	}

	$scope.mouseOver = function(){
		$scope.hideAnswer=false;
		var $rightArrowElt=document.querySelectorAll("a.right.carousel-control>span")[0];
		$rightArrowElt.classList.add('animated', 'infinite', 'rubberBand');

	}



});
// angular.module('zazzCardApp').controller('CarouselDemoCtrl', function ($scope) {
// });

app.directive('carouselControls', function() {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      scope.goNext = function() {
        element.isolateScope().next();
      };
      scope.goPrev = function() {
        element.isolateScope().prev();
      };

    }
  };
});