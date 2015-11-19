(function() {
    'use strict';
    describe('Window Alert Service Tests', function() {
        var $window;
        beforeEach(function() {
            angular.mock.module('angular-defer-alert');
            $window = jasmine.createSpyObj('$window', ['alert', 'prompt', 'confirm']);

            angular.mock.module(function($provide) {
                $provide.value('$window', $window);
            });
        });

        it('should open an alert and immediately resolve', inject(function($rootScope, WindowAlertService) {
            expect(WindowAlertService.openAlert).toBeDefined();
            var done = false;
            WindowAlertService.openAlert('my alert').then(function(isDone) {
                done = isDone;
            });
            expect($window.alert).toHaveBeenCalled();
            $rootScope.$apply();
            expect(done).toBe(true);
        }));

        it('should open a confirm and resolve with ok', inject(function($rootScope, WindowAlertService) {
            expect(WindowAlertService.openConfirm).toBeDefined();
            var done = false;
            $window.confirm.and.returnValue(true);
            WindowAlertService.openConfirm('my confirm').then(function() {
                done = true;
            });
            expect($window.confirm).toHaveBeenCalled();
            $rootScope.$apply();
            expect(done).toBe(true);
        }));

        it('should open a confirm and reject with cancel', inject(function($rootScope, WindowAlertService) {
            expect(WindowAlertService.openConfirm).toBeDefined();
            var done = false;
            $window.confirm.and.returnValue(false);
            WindowAlertService.openConfirm('my confirm').catch(function() {
                done = true;
            });
            expect($window.confirm).toHaveBeenCalled();
            $rootScope.$apply();
            expect(done).toBe(true);
        }));

        it('should open a prompt and resolve with ok', inject(function($rootScope, WindowAlertService) {
            expect(WindowAlertService.openPrompt).toBeDefined();
            var done = false;
            $window.prompt.and.returnValue(true);
            WindowAlertService.openPrompt('my prompt').then(function() {
                done = true;
            });
            expect($window.prompt).toHaveBeenCalled();
            $rootScope.$apply();
            expect(done).toBe(true);
        }));

        it('should open a prompt and reject with cancel', inject(function($rootScope, WindowAlertService) {
            expect(WindowAlertService.openPrompt).toBeDefined();
            var done = false;
            $window.prompt.and.returnValue(null);
            WindowAlertService.openPrompt('my prompt').catch(function() {
                done = true;
            });
            expect($window.prompt).toHaveBeenCalled();
            $rootScope.$apply();
            expect(done).toBe(true);
        }));
    });
})();
