angular.module('publicMarket', ['ionic', 'publicMarket.services', 'publicMarket.controllers', 'publicMarket.filters', 'publicMarket.directives'])

    .config(function ($stateProvider, $urlRouterProvider) {

        $stateProvider

            // setup an abstract state for the tabs directive
            .state('topMenu', {
                url: "/topMenu",
                abstract: true,
                controller: 'TopMenuCtrl',
                templateUrl: "templates/top-menu.html"
            })

            .state('topMenu.about', {
                url: "/about",
                views: {
                    'menuContent' :{
                        controller: 'AboutCtrl',
                        templateUrl: "templates/about.html"
                    }
                }
            })

            .state('topMenu.vendors', {
                url: "/vendors",
                views: {
                    'menuContent' :{
                        controller: 'VendorListCtrl',
                        templateUrl: "templates/vendor-list.html"
                    }
                }
            })

            .state('topMenu.vendor-detail', {
                url: "/vendors/:vendorId",
                views: {
                    'menuContent' :{
                        controller: 'VendorDetailCtrl',
                        templateUrl: "templates/vendor-detail.html"
                    }
                }
            })

            .state('topMenu.events', {
                url: "/events",
                views: {
                    'menuContent' :{
                        controller: 'EventListCtrl',
                        templateUrl: "templates/event-list.html"
                    }
                }
            })

            .state('topMenu.event-detail', {
                url: "/events/:eventId",
                views: {
                    'menuContent' :{
                        controller: 'EventDetailCtrl',
                        templateUrl: "templates/event-detail.html"
                    }
                }
            })

            .state('topMenu.venues', {
                url: "/venues",
                views: {
                    'menuContent' :{
                        controller: 'VenueListCtrl',
                        templateUrl: "templates/venue-list.html"
                    }
                }
            })

            .state('topMenu.venue-detail', {
                url: "/venues/:venueId",
                views: {
                    'menuContent' :{
                        controller: 'VenueDetailCtrl',
                        templateUrl: "templates/venue-detail.html"
                    }
                }
            })

            .state('topMenu.venue-map', {
                url: "/venues/:venueId/map",
                views: {
                    'menuContent' :{
                        controller: 'VenueMapCtrl',
                        templateUrl: "templates/venue-map.html"
                    }
                }
            })

            .state('topMenu.eateries', {
                url: "/eateries",
                views: {
                    'menuContent' :{
                        controller: 'EateryListCtrl',
                        templateUrl: "templates/eatery-list.html"
                    }
                }
            })

            .state('topMenu.eatery-detail', {
                url: "/eateries/:eateryId",
                views: {
                    'menuContent' :{
                        controller: 'EateryDetailCtrl',
                        templateUrl: "templates/eatery-detail.html"
                    }
                }
            });


        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/topMenu/venues');

    });

