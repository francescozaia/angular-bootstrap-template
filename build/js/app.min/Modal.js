/*
 * A generic template for self-development. v0.1.0
 * (c) 2014/03/30 
 */
angular.module("bootstrap",["ui.bootstrap"]);var ModalDemoCtrl=function(a,b,c){"use strict";a.items=["item1","item2","item3"],a.open=function(){var d=b.open({templateUrl:"myModalContent.html",controller:ModalInstanceCtrl,resolve:{items:function(){return a.items}}});d.result.then(function(b){a.selected=b},function(){c.info("Modal dismissed at: "+new Date)})}},ModalInstanceCtrl=function(a,b,c){"use strict";a.items=c,a.selected={item:a.items[0]},a.ok=function(){b.close(a.selected.item)},a.cancel=function(){b.dismiss("cancel")}};