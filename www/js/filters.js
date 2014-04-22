var pmFilters = angular.module('publicMarket.filters', []);

pmFilters.filter('nlToBr', function() {
    return function(text) {
        if (text) {
            return text.split('\n').join('<br>');
        }
        return "";
    };
});