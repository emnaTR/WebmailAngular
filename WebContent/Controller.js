var myApp = angular.module("myApp", ["ngRoute"]);

var ListReception = function(id, Monscope, Monhttp){
    var url = 'http://localhost:8080/Webmails/app/rest/user/'+id+'/MailsRec';
    Monhttp.get(url).then(function(resp){
        Monscope.reception = resp.data;
    });
}
var ListEnvoye = function(id, Monscope, Monhttp){
    var url = 'http://localhost:8080/Webmails/app/rest/user/'+id+'/MailsSent';
    Monhttp.get(url).then(function(resp){
        Monscope.Mailsent = resp.data;
    });
}
var sendMail= function(Monscope, Monhttp,monLocation ){
	var id=Monscope.user.id;
	console.log(Monscope.mail);
	console.log('id:',id);
	
    var url = 'http://localhost:8080/Webmails/app/rest/user/'+id+'/sendMail';
    Monhttp.post(url,Monscope.mail).then(function(){
    	monLocation.path('/envoi');
    });
}
var Add = function(monscope,monhttp){
    var url = 'http://localhost:8080/Webmails/app/rest/user';
    monhttp.post(url,monscope.user).then(function(){
    	monscope.user = {};
    });
}
var connVerif=function(monscope,monhttp, monLocation){
	 var url = 'http://localhost:8080/Webmails/app/rest/user/login';
	 console.log('Verif login');
	 console.log(monscope.user);
	 monhttp.post(url,monscope.user).then(function(resp){
		 console.log(resp.data);
		 monscope.user=resp.data;
	        if (monscope.user.id!=null)
	    	{
	        	console.log('connexion');
	        	monscope.user=resp.data;
	        	console.log(monscope.user);
	        	monLocation.path('/index');
	        }
	        else
	        {
	        	console.log('erreur de connexion');
	        	
	        	monLocation.path('/inscription');
	       	}
	        	
	    });
}

myApp.config(function($routeProvider) {
    $routeProvider
    .when('/index',  {
        templateUrl:'Partials/Bienvenue.html'
    })
    .when('/reception',  {
        templateUrl:'Partials/listMailRec.html',
        	controller:"CtrlRec"
    })
    .when('/envoi', {
        templateUrl:'Partials/listMailSent.html',
        controller:"CtrlSent"
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
        templateUrl:'Partials/NewMail.html',
    });
});

myApp.controller("CtrlUser", function($scope, $http, $location) {
   
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
    
    //bouton connexion pour se loger
      $scope.login= function(){
      console.log('fct login');
      connVerif($scope,$http,$location);
    }
    //bouton envoyer mail
      $scope.mail={};
      $scope.envoyer= function(){
          console.log('fct envoyer un mail');
          sendMail($scope,$http,$location);
        }
     
    console.log('fin controlleur');
});
myApp.controller("CtrlRec", function($scope, $http, $location) {
	   
	console.log('init controlleur reception');
	console.log($scope.user);
	var id= $scope.user.id;
	console.log($scope.user.id);
	ListReception(id,$scope,$http);
    console.log('fin reception');
});
myApp.controller("CtrlSent", function($scope, $http, $location) {
	   
	console.log('init controlleur mail envoyé');
	 console.log($scope.user);
	var id= $scope.user.id;
	console.log($scope.user.id);
	ListEnvoye(id,$scope,$http);
    console.log('fin envoyé');
});




