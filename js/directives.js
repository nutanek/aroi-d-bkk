app.directive('headerApp', function() {
    return {
        restrict: 'E',
        scope: {
            searchBar: '='
        },
        controller: "searchBarTop",
        templateUrl: 'directives/header.html'
    };
});

app.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.ngEnter);
                });
                event.preventDefault();
            }
        });
    };
});

app.directive('fileModel', [
    '$parse',
    function($parse) {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                var model = $parse(attrs.fileModel);
                var modelSetter = model.assign;

                element.bind('change', function() {
                    scope.$apply(function() {
                        modelSetter(scope, element[0].files[0]);
                    });
                });
            }
        };
    }
]);

app.directive('cropImg', function($window) {
    return {
        restrict: 'A',
        scope: true,
        controller: function($scope, $timeout) {
            this.setWrapSize = function(value) {
                $timeout(function() {
                    $scope.wrapSize = value;
                });
            };
            this.setImgSize = function(value) {
                $timeout(function() {
                    $scope.imgSize = value;
                });
            };
        },
        link: function(scope, element, attrs, ctrl) {
            setSize();
            element.find('.img').bind('load', function() {
                setSize();
            });
            var appWindow = angular.element($window);
            appWindow.bind('resize', function() {
                setSize();
            });

            function setSize() {
                var wFrame = element[0].offsetWidth;
                var hFrame = wFrame * (element[0].attributes["wrap-height"].nodeValue);

                var thisImg = element.find('.img');
                var wImg = thisImg[0].naturalWidth;
                var hImg = thisImg[0].naturalHeight;

                ctrl.setWrapSize({
                    "height": hFrame + "px"
                });
                var hEnlarge = (hImg * wFrame) / wImg;

                if (hEnlarge >= hFrame) {
                    var rest = hEnlarge - hFrame;
                    var part = rest / 3;
                    ctrl.setImgSize({
                        "top": -(part) - 2 + "px",
                        "width": "100%",
                        "height": "auto"
                    });
                } else {
                    var wEnlarge = (wImg * hFrame) / hImg;
                    var rest = wEnlarge - wFrame;
                    var part = rest / 2;
                    ctrl.setImgSize({
                        "left": -(part) + "px",
                        "height": "100%",
                        "width": "auto"
                    });
                }
            };
        }
    };
});

app.directive('cropWrapper', function($window) {
    return {
        restrict: 'A',
        scope: true,
        controller: function($scope, $timeout) {
            this.setDivSize = function(size) {
                $timeout(function() {
                    $scope.divSize = size;
                });
            }
        },
        link: function(scope, element, attrs, ctrl) {
            setSize();
            var appWindow = angular.element($window);
            appWindow.bind('resize', function() {
                setSize();
            });
            function setSize() {
                var wFrame = element[0].offsetWidth;
                var hFrame = wFrame * (element[0].attributes["wrap-height"].nodeValue);
                ctrl.setDivSize({
                    "height": hFrame + "px"
                });
            }
        }
    }
});

app.directive("scrollShowSearch", function($window) {
    return function(scope, element, attrs) {
        scope.showSearchBar = 'hidden';
        angular.element($window).bind("scroll", function() {
            if (this.pageYOffset >= 80) {
                scope.showSearchBar = 'none';
            } else {
                scope.showSearchBar = 'hidden';
            }
            scope.$apply();
        });
    };
});

app.directive("preloadingPage", [
    '$http',
    function($http) {
        return {
            restrict: 'A',
            link: function(scope, elm, attrs) {
                scope.isLoading = function() {
                    return $http.pendingRequests.length > 0;
                };

                scope.$watch(scope.isLoading, function(v) {
                    if (v) {
                        elm.show();
                    } else {
                        elm.hide();
                    }
                });
            }
        };
    }
]);

app.directive("numberCounter", function() {
    return {
        restrict: 'A',
        controller: function($scope, $timeout) {
            this.updateNum = function(score) {
                $timeout(function() {
                    $scope.numScore = score;
                });
            }
        },
        link: function(scope, element, attrs, ctrl) {

            scope.$watch('totalScoreAvg', function(newVal) {
                if (newVal) {
                    var initScore = 0;
                    var targetedScore = scope.totalScoreAvg;
                    var duration = 900;
                    var uptime = 20;
                    var increase = targetedScore / (duration / uptime);

                    var increaseNum = setInterval(function() {
                        initScore = initScore + increase;
                        ctrl.updateNum(initScore.toFixed(1));
                        if (initScore >= targetedScore) {
                            clearInterval(increaseNum);
                            ctrl.updateNum(targetedScore);
                        }
                    }, uptime);
                }
            }, true);
        }
    };
});
