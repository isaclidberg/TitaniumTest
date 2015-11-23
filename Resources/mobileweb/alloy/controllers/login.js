function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function initUserInterface() {}
    function loginWithGoogleAccount() {
        var GoogleAuth = require("modules/googleAuth");
        var googleAuth = new GoogleAuth({
            clientId: "CLIENT_ID",
            clientSecret: "CLIENT_SECRET",
            propertyName: "googleToken",
            scope: [ "https://www.googleapis.com/auth/tasks", "https://www.googleapis.com/auth/tasks.readonly" ],
            loginHint: "someuser@gmail.com"
        });
        var sync = Ti.UI.createButton({
            title: "Sync"
        });
        sync.addEventListener("click", function() {
            googleAuth.isAuthorized(function() {
                Ti.API.info("Access Token: " + googleAuth.getAccessToken());
            }, function() {
                googleAuth.authorize();
            });
        });
    }
    function loginWithFacebookAccount() {
        Ti.Facebook.appid = "[YOUR APPID]";
        Ti.Facebook.permissions = [ "publish_stream" ];
        Ti.Facebook.addEventListener("login", function(e) {
            e.success ? alert("Logged In") : e.error ? alert(e.error) : e.cancelled && alert("Canceled");
        });
        Ti.Facebook.authorize();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "login";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        {
            __processArg(arguments[0], "__parentSymbol");
        }
        {
            __processArg(arguments[0], "$model");
        }
        {
            __processArg(arguments[0], "__itemTemplate");
        }
    }
    var $ = this;
    var exports = {};
    $.__views.login = Ti.UI.createView({
        id: "login"
    });
    $.__views.login && $.addTopLevelView($.__views.login);
    $.__views.viewGoogleLogin = Ti.UI.createView({
        id: "viewGoogleLogin",
        width: "100%",
        height: "15%",
        top: "35%"
    });
    $.__views.login.add($.__views.viewGoogleLogin);
    $.__views.imageGoogleLogin = Ti.UI.createImageView({
        id: "imageGoogleLogin",
        width: "80%",
        height: "80%",
        top: "10%",
        image: "image/signwithgoogle.png"
    });
    $.__views.viewGoogleLogin.add($.__views.imageGoogleLogin);
    $.__views.viewFacebookLogin = Ti.UI.createView({
        id: "viewFacebookLogin",
        width: "100%",
        height: "15%",
        top: "50%"
    });
    $.__views.login.add($.__views.viewFacebookLogin);
    $.__views.imageFacebookLogin = Ti.UI.createImageView({
        id: "imageFacebookLogin",
        width: "80%",
        height: "80%",
        top: "10%",
        image: "image/signwithfacebook.png"
    });
    $.__views.viewFacebookLogin.add($.__views.imageFacebookLogin);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    $.imageGoogleLogin.addEventListener("click", function() {
        loginWithGoogleAccount();
    });
    $.imageFacebookLogin.addEventListener("click", function() {
        loginWithFacebookAccount();
    });
    $.index.open();
    initUserInterface();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;