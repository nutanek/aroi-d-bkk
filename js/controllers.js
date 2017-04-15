var app = angular.module('AroiDBkk', ['ngRoute', 'rzModule', 'ngSanitize']);

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
        $scope.resType = menuTypeRes.slice(1);
        $scope.resKeyword = "";

        $scope.selectedResType = false;

        $timeout(function() {
            $http.get("api/show-new-restaurants.php?num=6").then(function(response) {
                $scope.newRestaurants = response.data.body;
                mainLog($scope.newRestaurants);
            });
        });
        $timeout(function() {
            $http.get("api/show-best-score-restaurants.php?num=6").then(function(response) {
                $scope.bestScoreRestaurants = response.data.body;
            });
        });

        $scope.selectResType = function(keyword) {
            $scope.resKeyword = keyword;
            $scope.selectedResType = true;
        }

        $scope.searchRestaurant = function() {
            var areaSearch = "";
            if ($scope.resAreaSelected.id != "0") {
                areaSearch = $scope.resAreaSelected.name;
            }
            $timeout(function() {
                $location.url('/search?area=' + areaSearch + '&keyword=' + $scope.resKeyword);
            });
        }

        $scope.getCurrentLocation = function() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(nearMeSearch);
            } else {
                //x.innerHTML = "Geolocation is not supported by this browser.";
            }
        }

        var nearMeSearch = function(position) {
            $timeout(function() {
                $location.url('/search?lat=' + position.coords.latitude + '&lng=' + position.coords.longitude + "&distance=10");
            });
        }

        // Google Analytics
        googleAnalytics({
          hitType: 'pageview',
          page: 'Homepage'
        });
        $scope.__addNewRestaurant = function() {
            googleAnalytics({
              hitType: 'event',
              eventCategory: 'Add new restaurant',
              eventAction: 'click',
              eventLabel: 'Homepage'
            });
        }
        $scope.__searchNearMe = function() {
            googleAnalytics({
              hitType: 'event',
              eventCategory: 'Search near restaurant',
              eventAction: 'click',
              eventLabel: 'Homepage'
            });
        }
        $scope.__viewCouponsList = function() {
            googleAnalytics({
              hitType: 'event',
              eventCategory: 'View coupons list',
              eventAction: 'click',
              eventLabel: 'Homepage'
            });
        }
        $scope.__searcRestaurants = function() {
            if ($scope.selectedResType) {
                googleAnalytics({
                  hitType: 'event',
                  eventCategory: 'Search restaurants',
                  eventAction: 'submit',
                  eventLabel: 'Homepage (with selected type suggestions)'
                });
            } else {
                googleAnalytics({
                  hitType: 'event',
                  eventCategory: 'Search restaurants',
                  eventAction: 'submit',
                  eventLabel: 'Homepage (without selected type suggestions)'
                });
            }
        }
        $scope.__searcRestaurantsAdvance = function() {
            googleAnalytics({
              hitType: 'event',
              eventCategory: 'Search restaurants (Advance)',
              eventAction: 'click',
              eventLabel: 'Homepage'
            });
        }
        $scope.__searcRestaurantsByMap = function() {
            googleAnalytics({
              hitType: 'event',
              eventCategory: 'Search restaurants (Map)',
              eventAction: 'click',
              eventLabel: 'Homepage'
            });
        }
        $scope.__seeMoreNewRestaurants = function() {
            googleAnalytics({
              hitType: 'event',
              eventCategory: 'See more new restaurants',
              eventAction: 'click',
              eventLabel: 'Homepage'
            });
        }
        $scope.__seeMoreBestScoreRestaurants = function() {
            googleAnalytics({
              hitType: 'event',
              eventCategory: 'See more best score restaurants',
              eventAction: 'click',
              eventLabel: 'Homepage'
            });
        }
        $scope.__viewNewRestaurant = function() {
            googleAnalytics({
              hitType: 'event',
              eventCategory: 'View new restaurant',
              eventAction: 'click',
              eventLabel: 'Homepage'
            });
        }
        $scope.__viewBestScoreRestaurant = function() {
            googleAnalytics({
              hitType: 'event',
              eventCategory: 'View best score restaurant',
              eventAction: 'click',
              eventLabel: 'Homepage'
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

        $scope.resTypes = menuTypeRes.slice(1);
        $scope.resArea = menuAreaRes.slice(1);
        $scope.resTypeSelected = $scope.resTypes[0];
        $scope.resAreaSelected = $scope.resArea[0];
        $scope.services = menuServiceRes;

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
                        mainLog(response.data);

                        if (response.data.status === "success") {
                            $scope.idRes = response.data.id;
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
            mainLog('file is ');
            console.dir(file);
            var uploadUrl = "controller/fileUpload.php";
            fileUpload.uploadFileToUrl(file, uploadUrl, name);
        };

        // Google Analytics
        googleAnalytics({
          hitType: 'pageview',
          page: 'Added-new restaurant page'
        });
        $scope.__addNewRestaurant = function() {
            googleAnalytics({
              hitType: 'event',
              eventCategory: 'Add new restaurant',
              eventAction: 'submit',
              eventLabel: 'Added-new restaurant form'
            });
        }
        $scope.__searchLocation = function() {
            googleAnalytics({
              hitType: 'event',
              eventCategory: 'Search location',
              eventAction: 'submit',
              eventLabel: 'Google Map'
            });
        }
        $scope.__viewYourRestaurant = function() {
            googleAnalytics({
              hitType: 'event',
              eventCategory: 'View your restaurant',
              eventAction: 'click',
              eventLabel: 'after added restaurant'
            });
        }
        $scope.__addYourCoupon = function() {
            googleAnalytics({
              hitType: 'event',
              eventCategory: 'Add your coupon',
              eventAction: 'click',
              eventLabel: 'after added restaurant'
            });
        }
        $scope.__closeModal = function() {
            googleAnalytics({
              hitType: 'event',
              eventCategory: 'Close modal',
              eventAction: 'close',
              eventLabel: 'after added restaurant'
            });
        }
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
        $scope.services = menuServiceRes;
        $timeout(function() {
            $http.get("api/show-restaurant.php?id=" + $scope.idRes).then(function(response) {
                $scope.restaurant = response.data.body;
                $scope.totalScoreAvg = $scope.restaurant.score.totalAvg;
                $scope.restaurant.content = $scope.restaurant.content.replace(/\n/g, '<br/>');
                calScore();
                mainLog($scope.restaurant);
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

        // Google Analytics
        googleAnalytics({
          hitType: 'pageview',
          page: 'Restaurant content id ' +  $scope.idRes
        });
        $scope.__seeFullMap = function() {
            googleAnalytics({
              hitType: 'event',
              eventCategory: 'See full map',
              eventAction: 'click',
              eventLabel: 'Restaurant content page'
            });
        }
        $scope.__checkCoupon = function() {
            googleAnalytics({
              hitType: 'event',
              eventCategory: 'Check coupon',
              eventAction: 'click',
              eventLabel: 'Restaurant content page'
            });
        }
        $scope.__giveScore1 = function() {
            googleAnalytics({
              hitType: 'event',
              eventCategory: 'Give score',
              eventAction: 'click',
              eventLabel: 'Restaurant content page'
            });
        }
        $scope.__giveScore2 = function() {
            googleAnalytics({
              hitType: 'event',
              eventCategory: 'Give score',
              eventAction: 'submit',
              eventLabel: 'Restaurant content page'
            });
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
        $scope.resPerPage = 9;
        $scope.loadingMore = false;
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
        // Searched by maps
        var lat = filterSearch(qs['lat']);
        var lng = filterSearch(qs['lng']);
        var distance = filterSearch(qs['distance']);
        // sort
        var order = filterSearch(qs['order']);

        mainLog(area, keyword);

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
                service5: service5,
                lat: lat,
                lng: lng,
                distance: distance,
                order: order
            }
        }
        $http(req).then(function(response) {
            if (response.data.status === "success") {
                $scope.foundRestaurants = response.data.body;
                mainLog(response.data.body);
            }
            $timeout(function() {
                $('#searchAdvance').modal('hide');
            });
        });

        $scope.loadMore = function() {
            if ($scope.resPerPage < $scope.foundRestaurants.length) {
                $scope.loadingMore = true;
                $timeout(function() {
                    $scope.resPerPage += 3;
                    $scope.loadingMore = false;
                }, 500);
            }
        }

        function filterSearch(key) {
            if (typeof key === "undefined") {
                return "";
            }
            return key;
        }

        // Google Analytics
        googleAnalytics({
          hitType: 'pageview',
          page: 'Restaurant list page'
        });
        $scope.__viewRestaurant = function() {
            googleAnalytics({
              hitType: 'event',
              eventCategory: 'View Restaurant',
              eventAction: 'click',
              eventLabel: 'Restaurant list page'
            });
        }
        $scope.__loadMoreRestaurants = function() {
            googleAnalytics({
              hitType: 'event',
              eventCategory: 'Load more restaurant',
              eventAction: 'click',
              eventLabel: 'Restaurant list page'
            });
        }
        $scope.__addNewRestaurant = function() {
            googleAnalytics({
              hitType: 'event',
              eventCategory: 'Add new restaurant',
              eventAction: 'click',
              eventLabel: 'Restaurant list page'
            });
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
                    }
                ,
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
                $location.url('/search?area=' + areaSearch + '&keyword=' + $scope.keyword + '&minprice=' + $scope.price.minValue + '&maxprice=' + $scope.price.maxValue);
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
                $location.url('/search?area=' + areaSearch + '&keyword=' + $scope.keyword + '&type=' + typeSearch + '&minprice=' + $scope.price.minValue + '&maxprice=' + $scope.price.maxValue + '&score=' + $scope.score.value + '&service1=' + $scope.service.value1 + '&service2=' + $scope.service.value2 + '&service3=' + $scope.service.value3 + '&service4=' + $scope.service.value4 + '&service5=' + $scope.service.value5);
                $('#searchAdvance').modal('hide');
                $scope.$broadcast('rzSliderForceRender');
            }, 400);
        }

        $scope.goToMaps = function() {
            $timeout(function() {
                $location.url('/maps');
            }, 200);
        }

        $scope.getCurrentLocation = function() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(nearMeSearch);
            } else {
                //x.innerHTML = "Geolocation is not supported by this browser.";
            }
        }

        var nearMeSearch = function(position) {
            $timeout(function() {
                $location.url('/search?lat=' + position.coords.latitude + '&lng=' + position.coords.longitude + "&distance=10");
            });
        }

        // Google Analytics
        $scope.__goToHompage = function() {
            googleAnalytics({
              hitType: 'event',
              eventCategory: 'Go to homepage',
              eventAction: 'click',
              eventLabel: 'Top bar'
            });
        }
        $scope.__addNewRestaurant = function() {
            googleAnalytics({
              hitType: 'event',
              eventCategory: 'Add new restaurant',
              eventAction: 'click',
              eventLabel: 'Top bar'
            });
        }
        $scope.__searchNearMe = function() {
            googleAnalytics({
              hitType: 'event',
              eventCategory: 'Search near restaurant',
              eventAction: 'click',
              eventLabel: 'Top bar'
            });
        }
        $scope.__viewCouponsList = function() {
            googleAnalytics({
              hitType: 'event',
              eventCategory: 'View coupons list',
              eventAction: 'click',
              eventLabel: 'Top bar'
            });
        }
        $scope.__searcRestaurants = function() {
            googleAnalytics({
              hitType: 'event',
              eventCategory: 'Search restaurants',
              eventAction: 'submit',
              eventLabel: 'Top bar'
            });
        }
        $scope.__searcRestaurantsAdvance1 = function() {
            googleAnalytics({
              hitType: 'event',
              eventCategory: 'Search restaurants (Advance)',
              eventAction: 'click',
              eventLabel: 'Top bar'
            });
        }
        $scope.__searcRestaurantsAdvance2 = function() {
            googleAnalytics({
              hitType: 'event',
              eventCategory: 'Search restaurants (Advance)',
              eventAction: 'submit',
              eventLabel: 'Top bar'
            });
        }
        $scope.__searcRestaurantsAdvance3 = function() {
            googleAnalytics({
              hitType: 'event',
              eventCategory: 'Search restaurants (Advance)',
              eventAction: 'submit',
              eventLabel: 'advanced search page'
            });
        }
        $scope.__searcRestaurantsByMap = function() {
            googleAnalytics({
              hitType: 'event',
              eventCategory: 'Search restaurants (Map)',
              eventAction: 'click',
              eventLabel: 'Top bar'
            });
        }
    }
]);

app.controller('addCoupon', [
    '$scope',
    '$timeout',
    '$http',
    '$routeParams',
    '$location',
    function($scope, $timeout, $http, $routeParams, $location) {
        $timeout(function() {
            $http.get("api/list-restaurants.php").then(function(response) {
                $scope.restaurants = response.data.body;
                mainLog($scope.restaurants);
            });
        });

        // Google Analytics
        googleAnalytics({
          hitType: 'pageview',
          page: 'Added-coupon page 1'
        });
        $scope.__addNewRestaurant = function() {
            googleAnalytics({
              hitType: 'event',
              eventCategory: 'Add new restaurant',
              eventAction: 'click',
              eventLabel: 'Added-coupon page 1'
            });
        }
        $scope.__selectRestaurant = function() {
            googleAnalytics({
              hitType: 'event',
              eventCategory: 'Select restaurant to add coupon',
              eventAction: 'click',
              eventLabel: 'Added-coupon page 1'
            });
        }
    }
]);

app.controller('addCoupon2', [
    '$scope',
    '$timeout',
    '$http',
    '$routeParams',
    '$location',
    '$rootScope',
    function($scope, $timeout, $http, $routeParams, $location, $rootScope) {
        $scope.idRes = $routeParams.id;
        $timeout(function() {
            $http.get("api/show-restaurant.php?id=" + $routeParams.id).then(function(response) {
                $scope.restaurant = response.data.body;
                mainLog($scope.restaurant);
            });
        });

        $scope.couponCode = "";
        $scope.couponDetail = "";
        $rootScope.loading = false;

        $scope.getCouponCode = function() {
            var length = 7;
            var charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            var retVal = "";
            for (var i = 0, n = charset.length; i < length; ++i) {
                retVal += charset.charAt(Math.floor(Math.random() * n));
            }
            $scope.couponCode = retVal.toString();
        }

        $scope.sendForm = function() {
            $timeout(function() {
                if ($scope.couponCode == "" || $scope.couponDetail == "") {
                    $timeout(function() {
                        $('#warningAddCoupon').modal('show');
                    });
                } else {
                    $rootScope.loading = true;
                    let req = {
                        method: 'POST',
                        url: 'api/add-coupon.php',
                        headers: {
                            'Content-Type': "application/json"
                        },
                        data: {
                            idRes: $routeParams.id,
                            couponCode: $scope.couponCode,
                            couponContent: $scope.couponDetail
                        }
                    }
                    $http(req).then(function(response) {
                        mainLog(response.data);

                        if (response.data.status === "success") {
                            $timeout(function() {
                                $('#successAddCoupon').modal('show');
                            });
                            $rootScope.loading = false;
                        } else {
                            $timeout(function() {
                                $('#warningAddCoupon2').modal('show');
                            });
                            $rootScope.loading = false;
                        }
                    }, function(data) {
                        $timeout(function() {
                            $('#warningAddCoupon').modal('show');
                        });
                        $rootScope.loading = false;
                    });
                }
            });
        }

        // Google Analytics
        googleAnalytics({
          hitType: 'pageview',
          page: 'Added-coupon page 2'
        });
        $scope.__changeRestaurant = function() {
            googleAnalytics({
              hitType: 'event',
              eventCategory: 'Change restaurant to add coupon',
              eventAction: 'click',
              eventLabel: 'Added-coupon page 2'
            });
        }
        $scope.__generateCouponCode = function() {
            googleAnalytics({
              hitType: 'event',
              eventCategory: 'Generate coupon code',
              eventAction: 'click',
              eventLabel: 'Added-coupon page 2'
            });
        }
        $scope.__addNewCoupon = function() {
            googleAnalytics({
              hitType: 'event',
              eventCategory: 'Add new coupon for restaurant',
              eventAction: 'submit',
              eventLabel: 'Added-coupon page 2'
            });
        }
        $scope.__viewYourCoupon = function() {
            googleAnalytics({
              hitType: 'event',
              eventCategory: 'View your coupon',
              eventAction: 'click',
              eventLabel: 'after added coupon'
            });
        }
        $scope.__closeModal = function() {
            googleAnalytics({
              hitType: 'event',
              eventCategory: 'Close modal',
              eventAction: 'close',
              eventLabel: 'after added coupon'
            });
        }
    }
]);

app.controller('listCoupons', [
    '$scope',
    '$timeout',
    '$http',
    function($scope, $timeout, $http, $location) {
        $scope.couponPerPage = 6;
        $scope.loadingMore = false;

        $timeout(function() {
            $http.get("api/show-coupons.php?num=0").then(function(response) {
                $scope.coupons = response.data.body;
                mainLog($scope.coupons);
            });
        });

        $scope.getCoupon = function(name, code) {
            $scope.resName = name;
            $scope.couponCode = code;
        }

        $scope.loadMore = function() {
            if ($scope.couponPerPage < $scope.coupons.length) {
                $scope.loadingMore = true;
                $timeout(function() {
                    $scope.couponPerPage += 3;
                    $scope.loadingMore = false;
                }, 500);
            }
        }

        // Google Analytics
        googleAnalytics({
          hitType: 'pageview',
          page: 'coupons list page'
        });
        $scope.__viewCoupon = function() {
            googleAnalytics({
              hitType: 'event',
              eventCategory: 'View coupon detail',
              eventAction: 'click',
              eventLabel: 'coupons list page'
            });
        }
        $scope.__viewRestaurant = function() {
            googleAnalytics({
              hitType: 'event',
              eventCategory: 'View Restaurant',
              eventAction: 'click',
              eventLabel: 'coupons list page'
            });
        }
        $scope.__getCoupon = function() {
            googleAnalytics({
              hitType: 'event',
              eventCategory: 'Get coupon code',
              eventAction: 'click',
              eventLabel: 'coupons list page'
            });
        }
        $scope.__loadMoreCoupons = function() {
            googleAnalytics({
              hitType: 'event',
              eventCategory: 'Load more coupons',
              eventAction: 'click',
              eventLabel: 'coupons list page'
            });
        }
    }
]);

app.controller('showCoupon', [
    '$scope',
    '$timeout',
    '$http',
    '$routeParams',
    function($scope, $timeout, $http, $routeParams) {
        $scope.idRes = $routeParams.id;
        $timeout(function() {
            $http.get("api/show-coupon.php?id=" + $routeParams.id).then(function(response) {
                $scope.coupon = response.data.body;
                if ($scope.coupon.length > 0) {
                    $scope.coupon.couponContent = $scope.coupon.couponContent.replace(/\n/g, '<br/>');
                }
                mainLog($scope.coupon);
            });
        });

        $scope.getCoupon = function(name, code) {
            $scope.resName = name;
            $scope.couponCode = code;
        }

        // Google Analytics
        googleAnalytics({
          hitType: 'pageview',
          page: 'Coupon content id ' + $scope.idRes
        });
        $scope.__viewRestaurant = function() {
            googleAnalytics({
              hitType: 'event',
              eventCategory: 'View Restaurant',
              eventAction: 'click',
              eventLabel: 'Coupon content'
            });
        }
        $scope.__getCoupon = function() {
            googleAnalytics({
              hitType: 'event',
              eventCategory: 'Get coupon code',
              eventAction: 'click',
              eventLabel: 'Coupon content'
            });
        }
        $scope.__addNewCoupon = function() {
            googleAnalytics({
              hitType: 'event',
              eventCategory: 'Add new coupon for restaurant',
              eventAction: 'click',
              eventLabel: 'Coupon content'
            });
        }
    }
]);

app.controller('searchByMap', [
    '$scope',
    '$timeout',
    '$http',
    '$location',
    function($scope, $timeout, $http, $location) {
        $scope.searchRestaurantByMap = function() {
            $timeout(function() {
                $location.url('/search?lat=' + $scope.mapLat + '&lng=' + $scope.mapLon + '&distance=5');
            }, 200);
        }

        // Google Analytics
        googleAnalytics({
          hitType: 'pageview',
          page: 'Search by map page'
        });
        $scope.__searcRestaurantsByMap = function() {
            googleAnalytics({
              hitType: 'event',
              eventCategory: 'Search restaurants (Map)',
              eventAction: 'submit',
              eventLabel: 'Search by map form'
            });
        }
        $scope.__searchLocation = function() {
            googleAnalytics({
              hitType: 'event',
              eventCategory: 'Search location',
              eventAction: 'submit',
              eventLabel: 'Search by map form'
            });
        }
    }
]);

app.controller('removeRestaurant', [
    '$scope',
    '$timeout',
    '$http',
    '$location',
    function($scope, $timeout, $http, $location) {
        $timeout(function() {
            $http.get("api/list-restaurants.php").then(function(response) {
                $scope.restaurants = response.data.body;
                mainLog($scope.restaurants);
            });
        });

        $scope.removeNow = function(id) {
            var r = confirm("แน่ใจนะ!!! ว่าจะลบ ระวังบึ้มนาจา^^");
            if (r == true) {
                $timeout(function() {
                    $http.get("api/remove-restaurant.php?id=" + id).then(function(response) {
                        $scope.restaurants = response.data.body;
                        mainLog($scope.restaurants);
                        $timeout(function() {
                            $http.get("api/list-restaurants.php").then(function(response) {
                                $scope.restaurants = response.data.body;
                            });
                        });
                    });
                });
            }
        }

    }
]);
