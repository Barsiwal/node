var app = angular.module("app", ['ngRoute']);
app.run(function ($rootScope, $http) {
    $rootScope.isAuth = false;
    $rootScope.currentUser = '';
    $rootScope.logout = function () {
        $http.get('auth/signout');
        $rootScope.isAuth = false;
        $rootScope.currentUser = '';
    }
});
app.config(function ($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: "./views/posts.html",
        controller: 'postctrl',
        controllerAs: 'pc'
    });
    $routeProvider.when('/login', {
        templateUrl: './views/login.html',
        controller: "loginctrl",
        controllerAs: 'ac'
    });
    $routeProvider.when('/signup', {
        templateUrl: './views/login.html',
        controller: 'signupctrl',
        controllerAs: 'ac'
    });
});
app.controller("postctrl", function ($scope, $http, $rootScope) {
    var self = this;
    $http.get('/api/post').success(function (data) {
        self.posts = data;
    });
    setInterval(function () {
        $http.get('/api/post').success(function (data) {
            self.posts = data;
        });
        console.log("sadadw");
    }, 2000);
    self.newpost = {
        post: '',
        post: '',
    };
    self.submitpost = function () {
        self.newpost.username = $rootScope.currentUser;
        if(self.newpost.post!='')
        $http.post('/api/post', self.newpost).success(function () {
            $http.get('/api/post').success(function (data) {
                self.posts = data;
            });
        });

        self.newpost = {
            post: '',
            createdAt: ''
        };
    }
});
app.controller('loginctrl', function ($scope, $http, $location, $rootScope) {
    var s = this;
    s.pagename = 'login';
    s.user = {
        username: '',
        password: ''
    };
    s.login = function () {
        $http.post('/auth/login', s.user).success(function (data) {
            $rootScope.currentUser = data.user.username;
            if ($rootScope.currentUser) {
                $rootScope.isAuth = true;
                $location.path('/');
            }
        });

    };


});
app.controller('signupctrl', function ($scope, $http, $location, $rootScope) {
    var s = this;
    s.pagename = 'signup';
    s.user = {
        username: '',
        password: ''
    };
    s.login = function () {
        $http.post('/auth/signup', s.user).success(function (data) {
            $rootScope.currentUser = data.user.username;
            if ($rootScope.currentUser) {
                $rootScope.isAuth = true;
                $location.path('/');
            }

        });

    };


});
