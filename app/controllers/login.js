var args = arguments[0] || {};


function initUserInterface()
{
	
}

function loginWithGoogleAccount(){
	//initialize module
	var GoogleAuth = require('modules/googleAuth');
	var googleAuth = new GoogleAuth({
	    clientId : 'CLIENT_ID',
	    clientSecret : 'CLIENT_SECRET',
	    propertyName : 'googleToken',
	    scope : ['https://www.googleapis.com/auth/tasks', 'https://www.googleapis.com/auth/tasks.readonly'],
	    loginHint : 'someuser@gmail.com' 
	});
	//create some button
	var sync = Ti.UI.createButton({
	    title : 'Sync'
	});
	//do some action...
	sync.addEventListener('click', function() {
	    googleAuth.isAuthorized(function() {
	        Ti.API.info('Access Token: ' + googleAuth.getAccessToken());
	        //user is authorized so do something... just dont forget to add accessToken to your requests
	
	    }, function() {
	        //authorize first
	        googleAuth.authorize();
	    });
	});
}\

function loginWithFacebookAccount(){
	Ti.Facebook.appid = '[YOUR APPID]';
	Ti.Facebook.permissions = ['publish_stream']; // Permissions your app needs
	Ti.Facebook.addEventListener('login', function(e) {
	    if (e.success) {
	        alert('Logged In');
	    } else if (e.error) {
	        alert(e.error);
	    } else if (e.cancelled) {
	        alert("Canceled");
	    }
	});
	Ti.Facebook.authorize();
}

function connectCouchbase( strServer ,  Port){
	var SYNC_URL = "52.11.107.126";

	var CBLite = require('com.couchbase.cbl');
	
}

$.imageGoogleLogin.addEventListener('click', function(e)
{
	loginWithGoogleAccount();	
});


$.imageFacebookLogin.addEventListener('click', function(e)
{
	loginWithFacebookAccount();
	
});
 
$.index.open();
initUserInterface();

