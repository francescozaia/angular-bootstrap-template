/* global angular */

angular.module("bootstrap", ["ui.bootstrap"]);

var ModalDemoCtrl = function ($scope, $modal, $log) {

    "use strict";

    $scope.items = ["item1", "item2", "item3"];

    $scope.open = function () {

        var modalInstance = $modal.open({
            templateUrl: "myModalContent.html",
            controller: ModalInstanceCtrl,
            resolve: {
                items: function () {
                    return $scope.items;
                }
            }
        });

        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        }, function () {
            $log.info("Modal dismissed at: " + new Date());
        });
    };
};

var ModalInstanceCtrl = function ($scope, $modalInstance, items) {

    "use strict";

    $scope.items = items;
    $scope.selected = {
        item: $scope.items[0]
    };

    $scope.ok = function () {
        $modalInstance.close($scope.selected.item);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss("cancel");
    };
};