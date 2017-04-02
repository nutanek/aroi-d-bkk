var app = angular.module('AroiDBkk', ['ngRoute', 'rzModule']);

app.run([
    '$location',
    '$rootScope',
    function($location, $rootScope) {
        $rootScope.$on('$routeChangeSuccess', function(event, current, previous) {
            if (current.hasOwnProperty('$$route')) {
                $rootScope.title = current.$$route.title;
            }
        });
    }
]);

app.controller('homePage', [
    '$scope',
    '$timeout',
    '$http',
    '$location',
    function($scope, $timeout, $http, $location) {
        $scope.resArea = menuAreaRes;
        $scope.resAreaSelected = $scope.resArea[0];
        $scope.resKeyword = "";

        $timeout(function() {
            $http.get("api/show-new-restaurants.php?num=0").then(function(response) {
                $scope.newRestaurants = response.data.body;
                console.log($scope.newRestaurants);
            });
        });
        $timeout(function() {
            $http.get("api/show-best-score-restaurants.php?num=0").then(function(response) {
                $scope.bestScoreRestaurants = response.data.body;
            });
        });
        $scope.searchRestaurant = function() {
            var areaSearch = "";
            if ($scope.resAreaSelected.id != "0") {
                areaSearch = $scope.resAreaSelected.name;
            }
            $timeout(function() {
                $location.url('/search?area=' + areaSearch + '&keyword=' + $scope.resKeyword);
            });
        }
    }
]);

app.controller('addNewRestaurant', [
    '$scope',
    '$timeout',
    '$http',
    'fileUpload',
    '$rootScope',
    function($scope, $timeout, $http, fileUpload, $rootScope) {
        $rootScope.loading = false;

        $scope.resTypes = menuTypeRes;
        $scope.resArea = menuAreaRes;
        $scope.resTypeSelected = $scope.resTypes[0];
        $scope.resAreaSelected = $scope.resArea[0];

        $scope.service = {
            value1: 0,
            value2: 0,
            value3: 0,
            value4: 0,
            value5: 0
        };

        $scope.sendForm = function() {
            $timeout(function() {
                if ($scope.name == "" || $scope.address == "" || $scope.tel == "" || $scope.content == "" || $scope.priceMin == "" || $scope.priceMax == "") {
                    $timeout(function() {
                        $('#warningAddNew').modal('show');
                    });
                } else {
                    let imgName = Date.now();
                    $rootScope.loading = true;
                    let req = {
                        method: 'POST',
                        url: 'api/add-restaurant.php',
                        headers: {
                            'Content-Type': "application/json"
                        },
                        data: {
                            nameRes: $scope.name,
                            typeRes: $scope.resTypeSelected.name,
                            mapLat: $scope.mapLat,
                            mapLon: $scope.mapLon,
                            addressRes: $scope.address,
                            areaRes: $scope.resAreaSelected.name,
                            tel: $scope.tel,
                            content: $scope.content,
                            minPrice: $scope.priceMin,
                            maxPrice: $scope.priceMax,
                            img: imgName,
                            service1: $scope.service.value1,
                            service2: $scope.service.value2,
                            service3: $scope.service.value3,
                            service4: $scope.service.value4,
                            service5: $scope.service.value5
                        }
                    }
                    $http(req).then(function(response) {
                        console.log(response.data);

                        if (response.data.status === "success") {
                            uploadFile(imgName);
                            $scope.name = $scope.address = $scope.tel = $scope.content = $scope.priceMin = $scope.priceMax = null;
                            $scope.service.value1 = $scope.service.value2 = $scope.service.value3 = $scope.service.value4 = $scope.service.value5 = 0;
                        } else {
                            $timeout(function() {
                                $('#warningAddNew').modal('show');
                            });
                            $rootScope.loading = false;
                        }
                    }, function(data) {
                        $timeout(function() {
                            $('#warningAddNew').modal('show');
                        });
                        $rootScope.loading = false;
                    });
                }
            });
        };

        function uploadFile(name) {
            var file = $scope.myFile;
            console.log('file is ');
            console.dir(file);
            var uploadUrl = "controller/fileUpload.php";
            fileUpload.uploadFileToUrl(file, uploadUrl, name);
        };
    }
]);

app.controller('showRestaurant', [
    '$scope',
    '$timeout',
    '$http',
    '$routeParams',
    function($scope, $timeout, $http, $routeParams) {
        $scope.idRes = $routeParams.id;
        $scope.scoreHover = [0, 0, 0];
        $scope.scoreClick = [0, 0, 0];
        $scope.alertScore = false;
        $timeout(function() {
            $http.get("api/show-restaurant.php?id=" + $scope.idRes).then(function(response) {
                $scope.restaurant = response.data.body;
                $scope.totalScoreAvg = $scope.restaurant.score.totalAvg;
                calScore();
                console.log($scope.restaurant);
            });
        });

        $scope.hoverScore = function(type, score) {
            $scope.scoreHover[type] = score;
        }

        $scope.clickScore = function(type, score) {
            $scope.scoreClick[type] = score;
            $scope.scoreHover[type] = score;
        }

        $scope.resetScore = function() {
            $scope.scoreHover = [0, 0, 0];
            $scope.scoreClick = [0, 0, 0];
            $scope.alertScore = false;
        }

        $scope.addScore = function() {
            if ($scope.scoreClick[0] == 0 || $scope.scoreClick[1] == 0 || $scope.scoreClick[2] == 0) {
                $scope.alertScore = true;
                return;
            }

            let req = {
                method: 'POST',
                url: 'api/add-score.php',
                headers: {
                    'Content-Type': "application/json"
                },
                data: {
                    idRes: $scope.idRes,
                    scoreAtm: $scope.scoreClick[0],
                    scoreTaste: $scope.scoreClick[1],
                    scoreService: $scope.scoreClick[2]
                }
            }
            $http(req).then(function(response) {
                if (response.data.status === "success") {
                    $timeout(function() {
                        $('#addScore').modal('hide');
                    });
                    refreshScore();
                }
            });
        }

        $scope.range = function(count) {
            var ratings = [];
            for (var i = 0; i < count; i++) {
                ratings.push(i)
            }
            return ratings;
        }

        function refreshScore() {
            if ($scope.restaurant.numVote > 0) {
                $scope.restaurant.score.atm = ($scope.restaurant.score.atm * $scope.restaurant.numVote) + $scope.scoreClick[0];
                $scope.restaurant.score.taste = ($scope.restaurant.score.taste * $scope.restaurant.numVote) + $scope.scoreClick[1];
                $scope.restaurant.score.service = ($scope.restaurant.score.service * $scope.restaurant.numVote) + $scope.scoreClick[2];
            } else {
                $scope.restaurant.score.atm = $scope.scoreClick[0];
                $scope.restaurant.score.taste = $scope.scoreClick[1];
                $scope.restaurant.score.service = $scope.scoreClick[2];
            }
            $scope.restaurant.numVote++;
            calScore();
            $scope.totalScoreAvg = (($scope.restaurant.score.atm + $scope.restaurant.score.taste + $scope.restaurant.score.service) / 3).toFixed(1);
        }

        function calScore() {
            $scope.restaurant.score.atm = parseFloat(($scope.restaurant.score.atm / $scope.restaurant.numVote).toFixed(1));
            $scope.restaurant.score.taste = parseFloat(($scope.restaurant.score.taste / $scope.restaurant.numVote).toFixed(1));
            $scope.restaurant.score.service = parseFloat(($scope.restaurant.score.service / $scope.restaurant.numVote).toFixed(1));
        }
    }
]);

app.controller('searchRestaurant', [
    '$scope',
    '$timeout',
    '$http',
    '$routeParams',
    '$location',
    function($scope, $timeout, $http, $routeParams, $location) {
        var qs = $location.search();

        var keyword = filterSearch(qs['keyword']);
        var type = filterSearch(qs['type']);
        var area = filterSearch(qs['area']);
        var minPrice = filterSearch(qs['minprice']);
        var maxPrice = filterSearch(qs['maxprice']);
        var scoreTotal = filterSearch(qs['score']);
        var service1 = filterSearch(qs['service1']);
        var service2 = filterSearch(qs['service2']);
        var service3 = filterSearch(qs['service3']);
        var service4 = filterSearch(qs['service4']);
        var service5 = filterSearch(qs['service5']);

        console.log(area, keyword);

        let req = {
            method: 'POST',
            url: 'api/search-restaurants.php',
            headers: {
                'Content-Type': "application/json"
            },
            data: {
                keyword: keyword,
                type: type,
                areaRes: area,
                minPrice: minPrice,
                maxPrice: maxPrice,
                scoreTotal: scoreTotal,
                service1: service1,
                service2: service2,
                service3: service3,
                service4: service4,
                service5: service5
            }
        }
        $http(req).then(function(response) {
            if (response.data.status === "success") {
                $scope.foundRestaurants = response.data.body;
                console.log(response.data.body);
            }
            $timeout(function() {
                $('#searchAdvance').modal('hide');
            });
        });

        function filterSearch(key) {
            if (typeof key === "undefined") {
                return "";
            }
            return key;
        }
    }
]);

app.controller('searchBarTop', [
    '$scope',
    '$timeout',
    '$http',
    '$location',
    '$window',
    function($scope, $timeout, $http, $location, $window) {
        $timeout(function() {
            $('#searchAdvance').modal('hide');
        });
        $scope.price = {
            minValue: 0,
            maxValue: 2000,
            options: {
                hideLimitLabels: true,
                floor: 0,
                ceil: 2000,
                step: 50,
                minRange: 50,
                translate: function(value) {
                    return value + ' บาท';
                }
            }
        };
        $scope.score = {
            value: 0,
            options: {
                hideLimitLabels: true,
                floor: 0,
                ceil: 10,
                showTicks: true,
                translate: function(value) {
                    if (value < 1)
                        return 'ทุกคะแนน';
                    if (value < 10)
                        return '<b>' + value + '</b> คะแนนขึ้นไป';
                    if (value > 9)
                        return '<b>' + value + '</b> คะแนน';
                },
                getTickColor: function(value) {
                    if (value < 3)
                        return '#FFC4C4';
                    if (value < 6)
                        return '#FE8181';
                    if (value < 9)
                        return '#FE4E4E';
                    return '#FF0000';
                },
                getPointerColor: function(value) {
                    return '#FF0000';
                }
            }
        };
        $scope.keyword = "";
        $scope.area = menuAreaRes;
        $scope.areaSelected = $scope.area[0];
        $scope.type = menuTypeRes;
        $scope.typeSelected = $scope.type[0];
        $scope.service = {
            value1: "",
            value2: "",
            value3: "",
            value4: "",
            value5: ""
        };

        $scope.setSlider = function() {
            $timeout(function() {
                $scope.$broadcast('rzSliderForceRender');
            }, 400);
        }

        $scope.searchRestaurantNormal = function() {
            var areaSearch = "";
            if ($scope.areaSelected.id != "0") {
                areaSearch = $scope.areaSelected.name;
            }
            $timeout(function() {
                $location.url(
                    '/search?area=' + areaSearch +
                    '&keyword=' + $scope.keyword +
                    '&minprice=' + $scope.price.minValue +
                    '&maxprice=' + $scope.price.maxValue
                );
                $('#searchAdvance').modal('hide');
                $scope.$broadcast('rzSliderForceRender');
            }, 400);
        }

        $scope.searchRestaurantAdvance = function() {
            var areaSearch = "";
            var typeSearch = "";
            if ($scope.areaSelected.id != "0") {
                areaSearch = $scope.areaSelected.name;
            }
            if ($scope.typeSelected.id != "0") {
                typeSearch = $scope.typeSelected.name;
            }
            $timeout(function() {
                $location.url(
                    '/search?area=' + areaSearch +
                    '&keyword=' + $scope.keyword +
                    '&type=' + typeSearch +
                    '&minprice=' + $scope.price.minValue +
                    '&maxprice=' + $scope.price.maxValue +
                    '&score=' + $scope.score.value +
                    '&service1=' + $scope.service.value1 +
                    '&service2=' + $scope.service.value2 +
                    '&service3=' + $scope.service.value3 +
                    '&service4=' + $scope.service.value4 +
                    '&service5=' + $scope.service.value5
                );
                $('#searchAdvance').modal('hide');
                $scope.$broadcast('rzSliderForceRender');
            }, 400);
        }

    }
]);
