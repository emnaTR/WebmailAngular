//récupérer la boite de reception d'un user id
var ListReception = function(id, Monscope, Monhttp){
    var url = 'http://localhost:8080/Webmails/app/rest/user/'+id+'/MailsRec';
    Monhttp.get(url).then(function(resp){
        Monscope.reception = resp.data;
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
	console.log(Monscope.mail);
	console.log('id:',id);
    var url = 'http://localhost:8080/Webmails/app/rest/user/'+id+'/sendMail';
    Monhttp.post(url,Monscope.mail).then(function(){
    	monLocation.path('/boite/envoi');
    });
}
//supprimer un mail
var DeleteMail = function(mailid, monscope,monhttp){
    var url = 'http://localhost:8080/Webmails/app/rest/mail'+mailid+'/delete';
    monhttp.delete(url).then(function(){
    	 console.log('mail supprimé');
    });
}
//ajouter un utilisateur
var Add = function(monscope,monhttp){
    var url = 'http://localhost:8080/Webmails/app/rest/user';
    monhttp.post(url,monscope.user).then(function(){
    	monscope.user = {};
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
	        	monLocation.path('/index');
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