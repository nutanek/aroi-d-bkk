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

app.directive('advanceSearch', function() {
    return {
        restrict: 'E',
        templateUrl: 'directives/advance-search.html'
    };
});

app.directive('headerSm', function() {
    return {
        restrict: 'E',
        templateUrl: 'directives/header-sm.html'
    };
});

app.directive('ngEnter', function() {
    return function(scope, element, attrs) {
        element.bind("keydown keypress", function(event) {
            if (event.which === 13) {
                scope.$apply(function() {
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
        scope.boxPrice = "";
        angular.element($window).bind("scroll", function() {
            if (this.pageYOffset >= 80) {
                scope.boxPrice = "";
                scope.showSearchBar = 'none';
            } else {
                scope.boxPrice = "none";
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

app.directive('dynFbCommentBox', function() {
    function createHTML(href, numposts, colorscheme) {
        return '<div class="fb-comments" ' + 'data-href="' + href + '" ' + 'data-numposts="' + numposts + '" ' + 'data-width="100%" ' + 'data-colorsheme="' + colorscheme + '">' + '</div>';
    }

    return {
        restrict: 'A',
        scope: {},
        link: function postLink(scope, elem, attrs) {
            attrs.$observe('pageHref', function(newValue) {
                var href = newValue;
                var numposts = attrs.numposts || 5;
                var colorscheme = attrs.colorscheme || 'light';

                elem.html(createHTML(href, numposts, colorscheme));
                FB.XFBML.parse(elem[0]);
            });
        }
    };
});

app.directive("limitTo", [function() {
        return {
            restrict: "A",
            link: function(scope, elem, attrs) {
                var limit = parseInt(attrs.limitTo);
                angular.element(elem).on("keypress", function(e) {
                    if (this.value.length == limit)
                        e.preventDefault();
                    }
                );
            }
        }
    }
]);

app.directive("navigator", [function() {
        return {
            restrict: 'E',
            controller: function($scope) {
                // Google Analytics
                $scope.__goToHompage = function() {
                    googleAnalytics({
                      hitType: 'event',
                      eventCategory: 'Go to homepage',
                      eventAction: 'click',
                      eventLabel: 'Navigator bar'
                    });
                }
            },
            link: function(scope, elem, attrs) {
                scope.urlLevel1 = attrs.urlLevel1;
                scope.titleLevel1 = attrs.titleLevel1;
                scope.titleLevel2 = attrs.titleLevel2;

                scope.$watchGroup([
                    'coupon.name', 'restaurant.name'
                ], function(newVal) {
                    if (newVal) {
                        scope.titleLevel2 = attrs.titleLevel2;
                    }
                });

            },
            templateUrl: 'directives/navigator.html'
        }
    }
]);
