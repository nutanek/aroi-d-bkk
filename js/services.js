app.service('fileUpload', ['$http', '$timeout', '$rootScope', function($http, $timeout, $rootScope) {
    this.uploadFileToUrl = function(file, uploadUrl, name) {
        var fd = new FormData();
        fd.append('file', file);
        fd.append('name', name);
        $timeout(function() {
            $http.post(uploadUrl, fd, {
                    transformRequest: angular.identity,
                    headers: {
                        'Content-Type': undefined,
                        'Process-Data': false
                    }
                })
                .success(function() {
                    mainLog("Success");
                    $rootScope.loading = false;
                    $timeout(function() {
                        $('#successAddNew').modal('show');
                    });
                })
                .error(function() {
                    mainLog("Error");
                    $rootScope.loading = false;
                    $rootScope.resultAddNew = true;
                });
        });
    }
}]);
