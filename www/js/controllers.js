var pmControllers = angular.module('publicMarket.controllers', ['ngSanitize']);

pmControllers.config([
    '$compileProvider',
        function( $compileProvider )
        {
            $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|maps|geo|file|tel|mailto):/);
        }
    ]);

pmControllers.controller('TopMenuCtrl', function ($scope, $ionicScrollDelegate, $timeout) {
    $scope.goBack = function() {
        window.history.back();
    };
    $scope.browseUrl = function(url) {
        window.open(url, '_system', 'location=yes,closebuttoncaption=Done');
    };
    $scope.navToHash = function(hash) {
        window.location = hash;
    };
    $scope.restoreScroll = function() {
        $timeout(function() {
            $ionicScrollDelegate.scrollToRememberedPosition(false);
        }, 0);
    }
});

pmControllers.controller('AboutCtrl', function ($scope) {
});

pmControllers.controller('VendorListCtrl', function ($scope, VendorService) {
    VendorService.all().then(function (vendorList) {
        $scope.vendors = vendorList.vendors;
        $scope.restoreScroll();
    });
});

pmControllers.controller('VendorDetailCtrl', function ($scope, $stateParams, $state, VendorService) {
    VendorService.getById(parseInt($stateParams.vendorId)).then(function (vendor) {
        $scope.vendor = vendor;
    });
});

pmControllers.controller('EventListCtrl', function ($scope, EventService) {
    EventService.all().then(function (eventList) {
        $scope.events = eventList.events;
        $scope.restoreScroll();
    });
});

pmControllers.controller('EventDetailCtrl', function ($scope, $stateParams, $state, EventService) {
    EventService.getById(parseInt($stateParams.eventId)).then(function (event) {
        $scope.event = event;
    });
});

pmControllers.controller('VenueListCtrl', function ($scope, VenueService) {
    $scope.currCategory = "";
    VenueService.all().then(function (venueList) {
        $scope.venues = venueList.venues;
        $scope.restoreScroll();
    });
    $scope.newCategory = function(newCategory) {
        if ($scope.currCategory != newCategory) {
            $scope.currCategory = newCategory;
            return true;
        }
        return false;
    }
});

pmControllers.controller('VenueDetailCtrl', function ($scope, $stateParams, $state, VenueService, MapUrlService) {
    VenueService.getById(parseInt($stateParams.venueId)).then(function (venue) {
        $scope.venue = venue;
        $scope.mapUrl = MapUrlService.urlForAddress(venue.address);
    });
});

pmControllers.controller('VenueMapCtrl', function ($scope, $stateParams, $state, VenueService) {
    VenueService.getById(parseInt($stateParams.venueId)).then(function (venue) {
        $scope.venue = venue;
    });
});

pmControllers.controller('VendorEditCtrl', function ($scope, $stateParams, $state, VendorService) {
    var vendor = VendorService.get($stateParams.vendorId);
    $scope.vendor = vendor;
    $scope.rightButtons = [
        {
            type: 'button-clear',
            content: 'Save',
            tap: function (e) {
                vendor.$save()
                    .then(function () {
                        window.history.back();
                    });
            }
        }
    ];
});

pmControllers.controller('EateryListCtrl', function ($scope, EateryService) {
    $scope.currCategory = "";
    EateryService.all().then(function (eateryList) {
        $scope.eateries = eateryList.eateries;
        $scope.restoreScroll();
    });
});

pmControllers.controller('EateryDetailCtrl', function ($scope, $stateParams, $state, EateryService, MapUrlService) {
    EateryService.getById(parseInt($stateParams.eateryId)).then(function (eatery) {
        $scope.eatery = eatery;
        $scope.mapUrl = MapUrlService.urlForAddress(eatery.address);
    });
});

