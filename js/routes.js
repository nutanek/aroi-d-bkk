app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        title : "ค้นหาร้านอาหารในกรุงเทพ",
        controller: "homePage",
        templateUrl : "views/index.html"
    })
    .when("/search", {
        title : "ค้นหาร้านอาหาร",
        controller: "searchRestaurant",
        templateUrl : "views/search-restaurants.html"
    })
    .when("/add-restaurant", {
        title : "เพิ่มร้านอาหารของคุณ",
        controller: "addNewRestaurant",
        templateUrl : "views/add-restaurant.html"
    })
    .when("/restaurant/:id", {
        title : "ค้นหาร้านอาหารในกรุงเทพ",
        controller: "showRestaurant",
        templateUrl : "views/show-restaurant.html"
    })
    .when("/add-coupon", {
        title : "เพิ่มคูปองให้ร้านอาหารของคุณ",
        controller: "addCoupon",
        templateUrl : "views/add-coupon.html"
    })
    .when("/add-coupon/:id", {
        title : "เพิ่มคูปองให้ร้านอาหารของคุณ",
        controller: "addCoupon2",
        templateUrl : "views/add-coupon2.html"
    })
    .when("/coupons", {
        title : "คูปองทั้งหมด",
        controller: "listCoupons",
        templateUrl : "views/list-coupons.html"
    })
    .when("/coupon/:id", {
        title : "คูปอง",
        controller: "showCoupon",
        templateUrl : "views/show-coupon.html"
    });
});
