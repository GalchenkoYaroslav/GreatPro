var app = angular.module('GreatPro', ['ui.router', 'ngAnimate', 'ngDialog']);

app.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/home');

    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: 'html/home.html',
            controller: 'homeCtrl'
        })
        .state('production', {
            url: '/production',
            templateUrl: 'html/production.html',
            controller: 'productionCtrl'
        })
        .state('creative', {
            url: '/creative',
            templateUrl: 'html/creative.html',
            controller: 'creativeCtrl'
        })
        .state('career', {
            url: '/career',
            templateUrl: 'html/career.html',
            controller: 'careerCtrl'
        });
}).run(function ($rootScope) {
    $rootScope.$on('$stateChangeStart', function (e, toState, toParams, fromState, fromParams) {
        var klass = 'move-' + toState.name;

        if (fromState.name != '') {
            klass = klass + '-' + fromState.name;
        }

        $rootScope.moveClass = klass
    });
});

app.controller('homeCtrl', function ($scope, $state, $timeout) {
    $scope.pageClass = 'page-home';
    $scope.move = function (klass, state) {
        $scope.moveClass = klass;
        $timeout(function () {
            $state.go(state);
        }, 100);
    };
});

app.controller('productionCtrl', function ($scope, $state, ContactDialog, PortfolioDialog, $timeout) {
    $scope.direction = 'production';
    $scope.pageClass = 'page-production';
    $scope.contactClass = 'contact-production';
    $scope.contactPhoneNumber = '+38 (050) 357 73 32';
    $scope.contactEmail = 'production@greatpro.com.ua';
    $scope.openContactPage = ContactDialog.open($scope);
    $scope.closeContactPage = ContactDialog.close($scope);
    $scope.openPortfolioPage = PortfolioDialog.open($scope);
    $scope.closePortfolioPage = PortfolioDialog.close($scope);
    $scope.move = function (klass, state) {
        $scope.moveClass = klass;
        $timeout(function () {
            $state.go(state);
        }, 100);
    };
});

app.controller('creativeCtrl', function ($scope, $state, ContactDialog, $timeout) {
    $scope.direction = 'creative';
    $scope.pageClass = 'page-creative';
    $scope.contactClass = 'contact-creative';
    $scope.contactPhoneNumber = '+38 (050) 418 00 33';
    $scope.contactEmail = 'creative@greatpro.com.ua';
    $scope.openContactPage = ContactDialog.open($scope);
    $scope.closeContactPage = ContactDialog.close($scope);
    $scope.move = function (klass, state) {
        $scope.moveClass = klass;
        $timeout(function () {
            $state.go(state);
        }, 100);
    };
});

app.controller('careerCtrl', function ($scope) {
    $scope.pageClass = 'page-career';
});

app.directive('pageHome', function () {
    return {
        restrict: 'A',
        link: function () {
            angular.element(document).ready(function () {
                var windowElement = jQuery(window);

                var pageHome = jQuery('.page-home');

                var production = pageHome.find('.production'),
                    creative = pageHome.find('.creative');

                var productionPreview = production.find('.preview'),
                    creativePreview = creative.find('.preview');

                pageHome.find('.logo-sm').addClass('loading');

                setTimeout(function () {
                    pageHome.find('.logo-sm').removeClass('loading');
                }, 1800);

                productionPreview.hover(
                    function () {
                        production.append('<svg></svg>');
                        production.append('<address></address>');

                        var dispX = adaptVariable(170, 220, 320, 370);

                        var directionPathData = [
                            {
                                x: 0.6 * productionPreview.width(),
                                y: 0.7 * productionPreview.height() + 0.21 * windowElement.height()
                            },
                            {
                                x: 0.8 * productionPreview.width(),
                                y: 0.9 * productionPreview.height() + 0.21 * windowElement.height()
                            },
                            {
                                x: 0.8 * productionPreview.width() + dispX,
                                y: 0.9 * productionPreview.height() + 0.21 * windowElement.height()
                            }
                        ];

                        var svg = d3.select('.page-home .production svg');

                        var line = d3.svg.line().interpolate('linear')
                            .x(function (data) {
                                return data.x;
                            })
                            .y(function (data) {
                                return data.y;
                            });

                        var path = svg.append('path')
                            .attr('d', line(directionPathData))
                            .attr('stroke', 'white')
                            .attr('stroke-width', '1')
                            .attr('fill', 'none');

                        var totalLength = path.node().getTotalLength();

                        path
                            .attr('stroke-dasharray', totalLength + ' ' + totalLength)
                            .attr('stroke-dashoffset', totalLength)
                            .transition()
                            .duration(1000)
                            .ease('linear')
                            .attr('stroke-dashoffset', 0);

                        var address = jQuery('.page-home .production address');

                        var dispY = adaptVariable(26, 34, 48, 54);

                        setTimeout(function () {
                            address.css({
                                left: 0.8 * productionPreview.width(),
                                top: 0.9 * productionPreview.height() + 0.21 * windowElement.height() - dispY
                            });
                            address.append('<p>Email: production@greatpro.com.ua</p>');
                            address.append('<p>Tel: +38 (050) 357 73 32</p>');
                        }, 1000);
                    },
                    function () {
                        pageHome.find('svg').remove();
                        pageHome.find('address').remove()
                    }
                );

                creativePreview.hover(
                    function () {
                        creative.append('<svg></svg>');
                        creative.append('<address></address>');

                        var disp = adaptVariable(170, 220, 320, 370);

                        var directionPathData = [
                            {
                                x: creativePreview.position().left + 0.4 * creativePreview.width(),
                                y: creativePreview.position().top + 0.2 * creativePreview.height()
                            },
                            {
                                x: creativePreview.position().left + 0.2 * creativePreview.width(),
                                y: creativePreview.position().top
                            },
                            {
                                x: creativePreview.position().left + 0.2 * creativePreview.width() - disp,
                                y: creativePreview.position().top
                            }
                        ];

                        var svg = d3.select('.page-home .creative svg');

                        var line = d3.svg.line().interpolate('linear')
                            .x(function (data) {
                                return data.x;
                            })
                            .y(function (data) {
                                return data.y;
                            });

                        var path = svg.append('path')
                            .attr('d', line(directionPathData))
                            .attr('stroke', 'white')
                            .attr('stroke-width', '1')
                            .attr('fill', 'none');

                        var totalLength = path.node().getTotalLength();

                        path
                            .attr('stroke-dasharray', totalLength + ' ' + totalLength)
                            .attr('stroke-dashoffset', totalLength)
                            .transition()
                            .duration(1000)
                            .ease('linear')
                            .attr('stroke-dashoffset', 0);

                        var address = jQuery('.page-home .creative address');

                        setTimeout(function () {
                            address.css({
                                left: creativePreview.position().left + 0.2 * creativePreview.width() - disp,
                                top: creativePreview.position().top
                            });
                            address.append('<p>E-mail: creative@greatpro.com.ua</p>');
                            address.append('<p>Tel: +38 (050) 418 00 33</p>');
                        }, 1000);
                    },
                    function () {
                        pageHome.find('svg').remove();
                        pageHome.find('address').remove()
                    }
                );

                function adaptVariable(xs, sm, md, lg) {
                    var windowWidth = jQuery(window).width();

                    if (windowWidth < 720) {
                        return xs;
                    } else if (windowWidth < 1200) {
                        return sm;
                    } else if (windowWidth < 1440) {
                        return md;
                    } else {
                        return lg;
                    }
                }
            });
        }
    };
});

app.directive('pageProduction', function () {
    return {
        restrict: 'A',
        link: function () {
            angular.element(document).ready(function () {
                var creativeOpen = jQuery('.page-production .creative-open');
                creativeOpen.hover(
                    function () {
                        creativeOpen.find('img').css({right: 0});
                    },
                    function () {
                        creativeOpen.find('img').css({right: '-100%'});
                    }
                );

                creativeOpen.on({
                    'touchstart': function () {
                        creativeOpen.find('img').css({right: 0});
                    }
                });

                creativeOpen.on({
                    'touchend': function () {
                        creativeOpen.find('img').css({right: '-100%'});
                    }
                });
            });
        }
    };
});

app.directive('pageCreative', function () {
    return {
        restrict: 'A',
        link: function () {
            angular.element(document).ready(function () {
                var productionOpen = jQuery('.page-creative .production-open');
                productionOpen.hover(
                    function () {
                        productionOpen.find('img').css({left: 0});
                    },
                    function () {
                        productionOpen.find('img').css({left: '-100%'});
                    }
                );
            });
        }
    };
});

app.directive('pageCareer', function () {
    return {
        restrict: 'A',
        link: function () {
            jQuery(function () {
                var BV = new jQuery.BigVideo({useFlashForFirefox: false});
                BV.init();
                BV.show([
                    {type: 'video/mp4', src: 'video/career-bg.mp4'},
                    {type: 'video/webm', src: 'video/career-bg.webm'},
                    {type: 'video/ogg', src: 'video/career-bg.ogv'}
                ], {ambient: true});
            });
        }
    };
});

app.factory('ContactDialog', function (ngDialog) {
    return {
        open: function (scope) {
            return function (page) {
                jQuery(page).foggy();

                ngDialog.open({
                        template: 'html/contact.html',
                        className: 'angular-dialog-contact',
                        showClose: false,
                        scope: scope
                    }
                );
            }
        },
        close: function (scope) {
            return function () {
                jQuery('.' + scope.pageClass).foggy(false);

                ngDialog.closeAll();
            }
        }
    };
});

app.factory('PortfolioDialog', function (ngDialog) {
    return {
        open: function (scope) {
            return function (page) {
                jQuery(page).foggy();

                ngDialog.open({
                        template: 'html/portfolio.html',
                        className: 'angular-dialog-portfolio',
                        showClose: false,
                        scope: scope
                    }
                );
            }
        },
        close: function (scope) {
            return function () {
                jQuery('.' + scope.pageClass).foggy(false);

                ngDialog.closeAll();
            }
        }
    };
});