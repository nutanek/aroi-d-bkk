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
    });
});
