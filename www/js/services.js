var pmServices = angular.module('publicMarket.services', ['ngResource', 'publicMarket.config']);

pmServices.factory('VendorService', function ($q, $resource, DATA_ROOT_PATH) {
    return {

        all: function () {
            var deferred = $q.defer();
            $resource(DATA_ROOT_PATH + 'vendors.json').get(function (vendors) {
                deferred.resolve(vendors);
            });
            return deferred.promise;
        },

        getById: function (vendorId) {
            var deferred = $q.defer();
            $resource(DATA_ROOT_PATH + 'vendors.json').get(function (vendorsResponse) {
                if (vendorsResponse.vendors) {
                    var vendor = {};
                    vendorsResponse.vendors.forEach(function (currVendor) {
                        if ( currVendor.id === vendorId) {
                            vendor = currVendor;
                        }
                    });
                    deferred.resolve(vendor);
                } else {
                    deferred.reject('Unable to locate Vendor ID');
                }
            });
            return deferred.promise;
        }
    }
});

pmServices.factory('EventsService', ['$resource', function ($resource, DATA_ROOT_PATH) {

    return $resource(DATA_ROOT_PATH + 'events.json');

}]);

pmServices.factory('EventService', function ($q, $resource, DATA_ROOT_PATH) {
    return {
        all: function () {
            var deferred = $q.defer();
            $resource(DATA_ROOT_PATH + 'events.json').get(function (events) {
                deferred.resolve(events);
            });
            return deferred.promise;
        },

        getById: function (eventId) {
            var deferred = $q.defer();
            $resource(DATA_ROOT_PATH + 'events.json').get(function (eventsResponse) {
                if (eventsResponse.events) {
                    var event = {};
                    eventsResponse.events.forEach(function (currEvent) {
                        if ( currEvent.id === eventId) {
                            event = currEvent;
                            event.startDate = new Date(event.startDate);
                            event.endDate = new Date(event.endDate);
                        }
                    });
                    deferred.resolve(event);
                } else {
                    deferred.reject('Unable to locate Event ID');
                }
            });
            return deferred.promise;
        }
    }
});

pmServices.factory('VenueService', function ($q, $resource, DATA_ROOT_PATH) {
    return {

        all: function () {
            var deferred = $q.defer();
            $resource(DATA_ROOT_PATH + 'venues.json').get(function (venues) {
                deferred.resolve(venues);
            });
            return deferred.promise;
        },

        getById: function (venueId) {
            var deferred = $q.defer();
            $resource(DATA_ROOT_PATH + 'venues.json').get(function (venuesResponse) {
                if (venuesResponse.venues) {
                    var venue = {};
                    venuesResponse.venues.forEach(function (currVenue) {
                        if ( currVenue.id === venueId) {
                            venue = currVenue;
                        }
                    });
                    deferred.resolve(venue);
                } else {
                    deferred.reject('Unable to locate Venue ID');
                }
            });
            return deferred.promise;
        }
    }
});

pmServices.factory('EateryService', function ($q, $resource, DATA_ROOT_PATH) {
    return {

        all: function () {
            var deferred = $q.defer();
            $resource(DATA_ROOT_PATH + 'eateries.json').get(function (eateries) {
                deferred.resolve(eateries);
            });
            return deferred.promise;
        },

        getById: function (eateryId) {
            var deferred = $q.defer();
            $resource(DATA_ROOT_PATH + 'eateries.json').get(function (eateriesResponse) {
                if (eateriesResponse.eateries) {
                    var eatery = {};
                    eateriesResponse.eateries.forEach(function (currEatery) {
                        if ( currEatery.id === eateryId) {
                            eatery = currEatery;
                        }
                    });
                    deferred.resolve(eatery);
                } else {
                    deferred.reject('Unable to locate Eatery ID');
                }
            });
            return deferred.promise;
        }
    }
});

pmServices.factory('MapUrlService', function () {
    return {

        urlForAddress: function ( address ) {
            var url = "";
            if (address && address.length) {
                if ( ionic.Platform.isIOS() ) {
                    url = encodeURI('maps:q=' + address);
                } else if ( ionic.Platform.isAndroid() ) {
                    url = encodeURI('geo:0,0?q=' + address);
                } else {
                    url = encodeURI('http://maps.google.com/maps?q=' + address);
                }
            }
            return url;
        }
    }
});
