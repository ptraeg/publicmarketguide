var pmDirectives = angular.module('publicMarket.directives', []);

pmDirectives.directive('repeatDone', function ($timeout) {
    return function (scope, element, attrs) {
        if (scope.$last) { // all are rendered
            $timeout(function() {
                scope.$eval(attrs.repeatDone);
            });
        }
    }
});

pmDirectives.directive('externalBrowser', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            element.on('click', function (evt) {
                evt.preventDefault();
                window.open(attrs.href, '_system', 'location=yes,closebuttoncaption=Done');
            })
        }
    };
});

pmDirectives.directive('captureChildAnchorClicks', function () {
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
          // Capture all clicks on this element and child elements - event capturing phase
          element[0].addEventListener('click', function(evt) {
              if (evt.target.href) {
                  if (evt.target.href.substr(0, 4) === 'http') {
                      evt.preventDefault();
                      window.open(evt.target.href, '_system', 'location=yes,closebuttoncaption=Done');
                  }
              }
          }, true);
      }
    };
});

pmDirectives.directive('lazyLoadImages', function ($timeout) {
    var viewPort, viewPortHeight, scrollTop;

    function getScrollTranslateY() {
        return parseInt(viewPort.querySelector('.scroll').style[ionic.CSS.TRANSFORM].replace('translate3d(', '').split(',')[1]);
    }

    function getPositionInDocument(element) {
        var xPosition = 0;
        var yPosition = 0;

        while(element) {
            xPosition += (element.offsetLeft - element.scrollLeft + element.clientLeft);
            yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
            element = element.offsetParent;
        }
        return { x: xPosition, y: yPosition };
    }

    function inView(elem, nearThreshold) {
        var elemTop    = getPositionInDocument(elem).y;
        var elemHeight = elem.clientHeight;
        nearThreshold = nearThreshold || 0;
        return ((scrollTop + viewPortHeight + nearThreshold) > (elemTop + elemHeight)) ;
    }

    var loadVisibleImages = ionic.Utils.throttle(function () {
        viewPortHeight = viewPort.clientHeight;
        scrollTop = Math.abs( getScrollTranslateY() );

        angular.forEach(viewPort.querySelectorAll('img[lazy-src]'), function (imgElem) {
            if (inView(imgElem, 150)) {
                imgElem.src = imgElem.getAttribute('lazy-src');
                imgElem.removeAttribute('lazy-src');
            }
        });
    }, 500);

    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            viewPort = element[0];
            element.on('scroll', loadVisibleImages);
        }
    };

});

