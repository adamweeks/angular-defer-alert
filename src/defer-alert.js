(function() {
    'use strict';
    angular
        .module('angular-defer-alert', [])
        .service('DeferAlertService', DeferAlertService);

	DeferAlertService.$inject = ['$window', '$q'];
	
    function DeferAlertService($window, $q) {
        var service = this;

        service.openAlert   = openAlert;
        service.openConfirm = openConfirm;
        service.openPrompt  = openPrompt;


        /**
         * Opens an alert and immediately resolves the promise
         * @param message
         */
        function openAlert(message) {
            $window.alert(message);
            return $q.when(true);
        }

        /**
         * Opens an confirmation alert dialog. Resolves with an 'ok',
         * rejects with a 'cancel'
         * @param message
         */
        function openConfirm(message) {
            return $q(function(resolve, reject) {
                if ($window.confirm(message)) {
                    resolve();
                }
                else {
                    reject();
                }
            });
        }

        /**
         * Opens a prompt alert dialog. Resolves with value entered.
         * Rejects with a cancel press.
         */
        function openPrompt(message, defaultValue) {
            return $q(function(resolve, reject) {
                var result = $window.prompt(message, defaultValue);
                if (result === null) {
                    reject();
                }
                else {
                    resolve(result);
                }
            });
        }
    }
})();