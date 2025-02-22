'use strict';

var services = angular.module('firenodejs.services');

services.factory('images-service', ['$http', 'AlertService',
    function($http, alerts) {
        var service = {
            isAvailable: null,
            camera: "default",
            saveCount: 0,
            save: function(camera) {
                alerts.taskBegin();
                camera = camera || service.camera;
                var url = "/images/" + camera + "/save";
                $http.get(url).success(function(response, status, headers, config) {
                    console.log("images.save("+camera+") ", response);
                    service.saveCount++;
                    alerts.taskEnd();
                }).error(function(err, status, headers, config) {
                    console.warn("images.save("+camera+") failed HTTP" + status, err);
                    alerts.taskEnd();
                });
            },
        };

        $.ajax({
            url: "/images/location",
            success: function(data) {
                service.isAvailable = data ? true : false;
                console.log("images available:", service.isAvailable);
                service.model = data;
            },
            error: function(jqXHR, ex) {
                service.isAvailable = false;
                console.warn("images unavailable :", jqXHR, ex);
            }
        });

        return service;
    }
]);
