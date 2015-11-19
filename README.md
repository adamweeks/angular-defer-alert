# angular-defer-alert
Angular service to promisify $window alerts, confirms and prompts.

## Proposal
Do you want to use `$window.confirm` in a promise chain, but are too lazy to figure out how?
Well then, this is the service for you!

## Usage

### Confirms
Confirmations are great to insert in a process. They resolve successfully with an "OK" click. They are rejected when a user clicks "Cancel".
```javascript
MyDonutService
  .getDonuts(12)
  .then(function(donutsFetched) {
    var confirmMessage = 'Are you sure you want to eat ' + donutsFetched + ' donuts?';
    DeferAlertService.openConfirm(confirmMessage)
      .then(function() {
        // User wants to eat donuts!
        return true;
      })
      .catch(function() {
        // User does not want to eat donuts
        return false;
      });
    });
```

### Prompts
Prompts ask a user for input before continuing. They resolve successfully with an "OK" click and provide the entered value. They are rejected when a user clicks "Cancel".
```javascript
var promptMesage = 'How many donuts do you want to eat?';
var defaultValue = '12';
DeferAlertService.openPrompt(promptMessage, defaultValue)
  .then(function(donutAmount) {
    MyDonutService
    .getDonuts(donutAmount)
    .then(function(donutsFetched) {
      var confirmMessage = 'Are you sure you want to eat ' + donutsFetched + ' donuts?';
      DeferAlertService.openConfirm(confirmMessage)
        .then(function() {
          // User wants to eat donuts!
          return true;
        })
        .catch(function() {
          // User does not want to eat donuts
          return false;
        });
      });
  });
```

### Alerts
Since alerts don't really require a promise, we immediately resolve them, making for a very boring demo.
```javascript
MyAwesomeService
  .doThing()
  .then(function(textToAlert) {
    DeferAlertService.openAlert(textToAlert);
    });
```
