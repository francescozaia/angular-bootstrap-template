/* global document, window, app, angular */
"use strict";

(function (_app) {

    var message = "Yo!";

    _app.message = "Yo two!";

    /* private method */
    function init() {
        console.log(message);
        angular.bootstrap(document, ["d3AngularApp"]);

    }

    /* public method here used as "constructor" */
    _app.initialize = function () {
        init();
    };

}(window.app = window.app || {}));

app.initialize();

