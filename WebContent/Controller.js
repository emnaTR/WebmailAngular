var myApp = angular.module("myApp",["ngRoute","ngCookies"]);

//récupérer la boite de reception d'un user id
var listUser = function(Monscope, Monhttp){
	 console.log('fct list user');
    var url = 'http://localhost:8080/Webmails/app/rest/user';
    Monhttp.get(url).then(function(resp){
        Monscope.users = resp.data;
        console.log( Monscope.users );
    });
}
//récupérer la boite de reception d'un user id
var ListReception = function(id, Monscope, Monhttp){
	console.log('fct list reception');
    var url = 'http://localhost:8080/Webmails/app/rest/user/'+id+'/MailsRec';
    console.log(url);
    Monhttp.get(url).then(function(resp){
        Monscope.reception = resp.data;
        console.log( Monscope.reception );
    });
}
//récupérer la boite d'envoi d'un user id
var ListEnvoye = function(id, Monscope, Monhttp){
    var url = 'http://localhost:8080/Webmails/app/rest/user/'+id+'/MailsSent';
    Monhttp.get(url).then(function(resp){
        Monscope.Mailsent = resp.data;
    });
}
//envoyer un mail
var sendMail= function(Monscope, Monhttp,monLocation ){
	var id=Monscope.user.id;
	console.log('fct send');
	console.log(Monscope.mail);
	console.log('id:',id);
    var url = 'http://localhost:8080/Webmails/app/rest/user/'+id+'/sendMail';
    Monhttp.post(url,Monscope.mail).then(function(){
    	monLocation.path('/boite/envoi');
    });
}
//supprimer un mail
var SuppMail = function(mailid, monscope,monhttp){
	console.log('delete mail fct');
    var url = 'http://localhost:8080/Webmails/app/rest/mail/'+mailid;
    console.log(url);
    monhttp.delete(url).then(function(){
    	 console.log('mail supprimé');
    });
}
//ajouter un utilisateur
var Add = function(monscope,monhttp,monLocation){
    var url = 'http://localhost:8080/Webmails/app/rest/user';
    console.log('add user');
    monhttp.post(url,monscope.user).then(function(){
    	monscope.user = {};
    	monLocation.path('/boite');
    });
}
//vérifier la connexion
var connVerif=function(monscope,monhttp, monLocation, mesCookies){
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
	        	monLocation.path('/boite');
	        	mesCookies.putObject('CurrentUser',monscope.user);
	        	console.log('cookies put:');
	        	console.log(mesCookies.get('CurrentUser'));
	        }
	        else
	        {
	        	monscope.checkConn=true;
	        	console.log('erreur de connexion');
	        	
	       	}
	        	
	    });
}
myApp.config(function($routeProvider) {
    $routeProvider
    .when('/index',  {
        templateUrl:'Partials/Bienvenue.html'
    })
     .when('/boite',  {
        templateUrl:'Partials/Boite.html',
        controller:"CtrlUser"
    })
    .when('/boite/reception',  {
        templateUrl:'Partials/listMailRec.html',
        	controller:"CtrlRec"
    })
    .when('/boite/envoi', {
        templateUrl:'Partials/listMailSent.html',
        controller:"CtrlSent"
    })
     .when('/boite/mail',  {
        templateUrl:'Partials/NewMail.html',
        controller:"CtrlUser"
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
   
});

myApp.controller("CtrlMyApp", function($scope, $http, $location,$cookies) {
   
	
	console.log('init controlleur général');
    var d= new Date();
    $scope.dat= d;
    
    //bouton submit pour ajout d user
    $scope.user={};
    $scope.addUser= function(){
        console.log('fct test add user');
        console.log($scope.user);
        Add($scope,$http,$location);
    }
    
    //bouton connexion pour se loger
      $scope.login= function(){
      console.log('fct login');
      connVerif($scope,$http,$location,$cookies);
     // $route.reload();
    }

    console.log('fin controlleur général');
});
myApp.controller("CtrlUser", function($scope, $http, $location,$cookies) {
	
	console.log(' controlleur User');
	$scope.value = "<u>initial Text</u>";
	// récupérer la liste des utilisateur
	$scope.users={};
	listUser($scope,$http);

	//récupérer l'utilisateur courant
	var CurrentUser= $cookies.getObject('CurrentUser');
	$scope.user=CurrentUser;
	console.log(CurrentUser);
	if (CurrentUser ==undefined)
	{
			console.log('nn connected');
			$scope.connected=true;
	}
	else
	{
		console.log(' connected');
		var id= CurrentUser.id;
		console.log(id);
	}	
    //bouton envoyer mail
    $scope.mail={};
    $scope.envoyer= function(){
    	$scope.mail.date= new Date();
    	$scope.mail.usersReceiver =[];
        	//récupérer le dest
/* 		var Dest={};   	   
  		var emailDest=$scope.dest
  		usersList=$scope.users
        for (var i=1 ; i< usersList.length; i++)
        	   {
        	   		if (usersList[i].email == emailDest)
        	   			Dest=usersList[i];
        	   }
        console.log(Dest);
        $scope.mail.usersReceiver.push(Dest);*/
    	 //récupérer une liste d'users
    	var Dest=[];
    	$scope.users.forEach(function(item){
    			if(item.checked) {
    				Dest.push(item);
    				}
    		});
    	console.log('Dest');
    	console.log(Dest);
    	$scope.mail.usersReceiver=Dest;
    	console.log('mail.usersReseiver');
    	console.log($scope.mail.usersReseiver);
        console.log(' envoyer un mail');
        console.log($scope.mail.usersReceiver);
        sendMail($scope,$http,$location);
      }
   //se déconnecter
    $scope.deconnexion= function(){
    	console.log('deconnexion');
    	$cookies.remove('CurrentUser');
    	$scope.user={};
    };
    
});
myApp.controller("CtrlRec", function($scope, $http, $location,$cookies) {
	   
		console.log('init controlleur reception');
		var CurrentUser= $cookies.getObject('CurrentUser');
		$scope.user=CurrentUser;
		var id= CurrentUser.id;
		console.log(id);
		ListReception(id,$scope,$http);
		//bouton suppression email
		$scope.deleteMail = function (mailid)
		{
			console.log('supprimer un mail recu');
	        SuppMail(mailid,$scope,$http);
		};
	    console.log('fin reception');
});
myApp.controller("CtrlSent", function($scope, $http, $location, $cookies) {
	   
		console.log('init controlleur mail envoyé');
		var CurrentUser= $cookies.getObject('CurrentUser');
		$scope.user=CurrentUser;
		var id= CurrentUser.id;
		console.log(id);
		ListEnvoye(id,$scope,$http);
		//bouton suppression email
		$scope.deleteMail = function (mailid)
		{
			console.log('supprimer un mail envoyé');
	        SuppMail(mailid,$scope,$http);
		}
	    console.log('fin envoyé');
	
});




