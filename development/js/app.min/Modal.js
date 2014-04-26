/*
 * A generic template for self-development. v0.1.0
 * (c) 2014/04/26 
 */
"use strict";angular.module("bootstrap",["ui.bootstrap"]).controller("MyController",["$scope",function(a){a.customer={name:"Naomi",address:"1600 Amphitheatre"}}]).directive("myCustomer",function(){return{template:"Name: {{customer.name}} Address: {{customer.address}}"}});