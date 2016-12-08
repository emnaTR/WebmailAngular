var myApp = angular.module("myApp", ["ngRoute"]);

var Add = function(monscope,monhttp){
    var url = 'http://localhost:8080/Webmails/app/rest/user';
    monhttp.post(url,monscope.user).then(function(){
    	//monscope.user = {};
    });
}
/*var connVerif=function(monscope,monhttp, monLocation){
	 var url = 'http://localhost:8080/Webmails/app/rest/user/'+'monscope.emailConnexion';
	    monhttp.get(url).then(function(){
	        if ((resp.data).password== monscope.passwordConnexion)
	    	{
	        	monscope.user=resp.data;
	        	monLocation.url("#/index");
	        }
	        else
	        {
	        	monLocation.url("#/inscription");
	       	}
	        	
	    });
}*/

myApp.config(function($routeProvider) {
    $routeProvider
    .when('/index',  {
        templateUrl:'Partials/Bienvenue.html'
    })
    .when('/reception',  {
        templateUrl:'Partials/listMailRec.html'
    })
    .when('/envoi', {
        templateUrl:'Partials/listMailSent.html'
    })
    .when('/inscription',  {
        templateUrl:'Partials/AjoutUser.html'
    })
    .when('/connexion',  {
        templateUrl:'Partials/login.html'
    })
    .when('/contact',  {
        templateUrl:'Partials/Contact.html'
    })
    .when('/mail',  {
        templateUrl:'Partials/NewMail.html'
    });
});

myApp.controller("CtrlUser", function($scope, $http) {
   
	$scope.value = "<u>initial Text</u>";
	console.log('init controlleur User');
    var d= new Date();
    $scope.dat= d;
    //bouton submit pour ajout d user
    $scope.user={};
    $scope.addUser= function(){
        console.log('fct test add user');
        console.log($scope.user);
        Add($scope,$http);
    }
    //bouton connexion pour de loger
  /*  $scope.login= function(){
        console.log('fct login');
        connVerif($scope,$http, $location);
    }*/

    
    console.log('fin controlleur');
});




