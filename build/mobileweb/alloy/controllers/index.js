function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function loadData() {
        var strTableData = '[{"id":0, "title":"Winnie-the-Pooh", "minutes":600, "rating":3, "reviews":90, "author":"Author A", 						"description":"What happens when Sai and her mother meet a mother bear and her club? A beloved classic is born!", 						"image":""}, 					{"id":1, "title":"Where the wild things are", "minutes":540, "rating":4, "reviews":40, "author":"Author B", 						"description":"What happens when Sai and her mother meet a mother bear and her club? A beloved classic is born!", 						"image":""}, 					{"id":2, "title":"The snowy day", "minutes":480, "rating":5, "reviews":80, "author":"Author C", 						"description":"What happens when Sai and her mother meet a mother bear and her club? A beloved classic is born!", 						"image":""}, 					{"id":3, "title":"Goodnight moon", "minutes":420, "rating":3, "reviews":120, "author":"Author D", 						"description":"What happens when Sai and her mother meet a mother bear and her club? A beloved classic is born!", 						"image":""}, 					{"id":4, "title":"Blueberries for Sal", "minutes":420, "rating":4, "reviews":271, "author":"Robert McCloskey", 						"description":"What happens when Sai and her mother meet a mother bear and her club? A beloved classic is born!", 						"image":""}, 					{"id":5, "title":"Owl Moon", "minutes":380, "rating":4, "reviews":120, "author":"Author E", 						"description":"What happens when Sai and her mother meet a mother bear and her club? A beloved classic is born!", 						"image":""}, 					{"id":6, "title":"Little bear", "minutes":570, "rating":2, "reviews":40, "author":"Author F", 						"description":"What happens when Sai and her mother meet a mother bear and her club? A beloved classic is born!", 						"image":""}]';
        var sampleJSON = JSON.parse(strTableData);
        if (false == bReads) {
            var length = Object.keys(sampleJSON).length;
            for (var i = 0; length > i; i++) for (var j = i; length > j; j++) {
                var iRating = sampleJSON[i].rating;
                var jRating = sampleJSON[j].rating;
                if (jRating > iRating) {
                    var temp = sampleJSON[i];
                    sampleJSON[i] = sampleJSON[j];
                    sampleJSON[j] = temp;
                }
            }
        }
        loadTableView(sampleJSON);
    }
    function loadTableView(sampleJSON) {
        var defaultFontSize = 17;
        var defaultMediumFontSize = 13;
        var defaultSmallFontSize = 11;
        var tableData = [];
        var length = Object.keys(sampleJSON).length;
        for (var i = 0; length > i; i++) {
            var id = sampleJSON[i].id;
            var title = sampleJSON[i].title;
            var minutes = sampleJSON[i].minutes;
            var reviews = sampleJSON[i].reviews;
            var rating = sampleJSON[i].rating;
            var author = sampleJSON[i].author;
            var description = sampleJSON[i].description;
            {
                sampleJSON[i].image;
            }
            var row = Ti.UI.createTableViewRow({
                id: id,
                name: title,
                top: 0,
                height: "50",
                width: "100%"
            });
            var imageCircle = Ti.UI.createImageView({
                image: "/images/redcircle.png",
                left: "5%",
                top: "35%",
                width: "5%",
                height: "30%"
            });
            row.add(imageCircle);
            var imageNext = Ti.UI.createImageView({
                image: "/images/blacknext.png",
                left: "90%",
                top: "35%",
                width: "5%",
                height: "30%"
            });
            row.add(imageNext);
            var labelTitle = Ti.UI.createLabel({
                color: "#000000",
                font: {
                    fontFamily: "Arial",
                    fontSize: defaultFontSize
                },
                text: title,
                left: "15%",
                top: "5%",
                width: "40%",
                height: "40%"
            });
            row.add(labelTitle);
            if (true == bReads) {
                var strTime = parseInt(minutes, 10);
                strTime /= 60;
                strTime = parseInt(strTime, 10);
                strTime = strTime.toString();
                strTime += " hours remaining";
                var labelInfo = Ti.UI.createLabel({
                    color: "#777777",
                    font: {
                        fontFamily: "Arial",
                        fontSize: defaultMediumFontSize
                    },
                    text: strTime,
                    left: "15%",
                    top: "50%",
                    width: "40%",
                    height: "40%"
                });
                row.add(labelInfo);
            } else {
                var strReviews = reviews + " perants reviews";
                var labelInfo = Ti.UI.createLabel({
                    color: "#777777",
                    font: {
                        fontFamily: "Arial",
                        fontSize: defaultMediumFontSize
                    },
                    text: strReviews,
                    left: "15%",
                    top: "50%",
                    width: "40%",
                    height: "40%"
                });
                row.add(labelInfo);
            }
            if (false == bReads) {
                for (var index = 0; rating > index; index++) {
                    var leftPos = 65 + 4 * index;
                    leftPos += "%";
                    var imageStar = Ti.UI.createImageView({
                        image: "/images/yellowstar_full.png",
                        left: leftPos,
                        top: "35%",
                        width: "5%",
                        height: "30%"
                    });
                    row.add(imageStar);
                }
                for (var index = rating; 5 > index; index++) {
                    var leftPos = 65 + 4 * index;
                    leftPos += "%";
                    var imageStar = Ti.UI.createImageView({
                        image: "/images/yellowstar_empty.png",
                        left: leftPos,
                        top: "35%",
                        width: "5%",
                        height: "30%"
                    });
                    row.add(imageStar);
                }
            }
            tableData.push(row);
            if (selectedId == id) {
                var rowContent = Ti.UI.createTableViewRow({
                    name: title,
                    top: 0,
                    height: "200",
                    width: "100%"
                });
                var strReviews = reviews + " customer reviews";
                var labelReviews = Ti.UI.createLabel({
                    color: "#0000ff",
                    font: {
                        fontFamily: "Arial",
                        fontSize: defaultSmallFontSize
                    },
                    text: strReviews,
                    left: "5%",
                    top: "5%",
                    width: "25%",
                    height: "5%"
                });
                rowContent.add(labelReviews);
                var strAuthor = "by " + author;
                var labelAuthor = Ti.UI.createLabel({
                    color: "#0000ff",
                    font: {
                        fontFamily: "Arial",
                        fontSize: defaultSmallFontSize
                    },
                    text: strAuthor,
                    left: "5%",
                    top: "13%",
                    width: "25%",
                    height: "5%"
                });
                rowContent.add(labelAuthor);
                var labelDescription = Ti.UI.createLabel({
                    color: "#000000",
                    font: {
                        fontFamily: "Arial",
                        fontSize: defaultMediumFontSize
                    },
                    text: description,
                    left: "5%",
                    top: "20%",
                    width: "55%",
                    height: "40%"
                });
                rowContent.add(labelDescription);
                var imageThumbnail = Ti.UI.createImageView({
                    image: "/images/bluesal.jpg",
                    left: "63%",
                    top: "3%",
                    width: "35%",
                    height: "60%"
                });
                rowContent.add(imageThumbnail);
                var btnStop = Ti.UI.createButton({
                    left: "10%",
                    top: "65%",
                    width: "60",
                    height: "60",
                    backgroundImage: "/images/stop.png"
                });
                rowContent.add(btnStop);
                var btnPlay = Ti.UI.createButton({
                    left: "25%",
                    top: "65%",
                    width: "60",
                    height: "60",
                    backgroundImage: "/images/play.png"
                });
                rowContent.add(btnPlay);
                tableData.push(rowContent);
            }
        }
        $.list.setData(tableData);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "index";
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
    $.__views.index = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "index"
    });
    $.__views.index && $.addTopLevelView($.__views.index);
    $.__views.viewTitle = Ti.UI.createView({
        id: "viewTitle",
        backgroundColor: "#576996",
        top: "0%",
        width: "100%",
        height: "10%"
    });
    $.__views.index.add($.__views.viewTitle);
    $.__views.menu = Ti.UI.createImageView({
        id: "menu",
        width: "20%",
        height: "100%",
        image: "image/menu.png",
        left: "1%"
    });
    $.__views.viewTitle.add($.__views.menu);
    $.__views.library = Ti.UI.createImageView({
        id: "library",
        width: "20%",
        height: "90%",
        image: "image/library.png",
        left: "20%"
    });
    $.__views.viewTitle.add($.__views.library);
    $.__views.title = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        font: {
            fontSize: 48
        },
        text: "My Library",
        id: "title",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        left: "42%"
    });
    $.__views.viewTitle.add($.__views.title);
    $.__views.__alloyId0 = Ti.UI.createView({
        backgroundColor: "#111111",
        top: "10%",
        width: "100%",
        height: "10%",
        id: "__alloyId0"
    });
    $.__views.index.add($.__views.__alloyId0);
    $.__views.topReads = Ti.UI.createImageView({
        left: "15%",
        width: "20%",
        height: "60%",
        top: "5%",
        id: "topReads",
        image: "image/up.png"
    });
    $.__views.__alloyId0.add($.__views.topReads);
    $.__views.topRated = Ti.UI.createImageView({
        left: "65%",
        width: "20%",
        height: "60%",
        top: "5%",
        id: "topRated",
        image: "image/top-rated.png"
    });
    $.__views.__alloyId0.add($.__views.topRated);
    $.__views.__alloyId1 = Ti.UI.createLabel({
        width: "20%",
        height: "30%",
        color: "white",
        text: "Top Reads",
        left: "15%",
        top: "65%",
        textAlign: "center",
        id: "__alloyId1"
    });
    $.__views.__alloyId0.add($.__views.__alloyId1);
    $.__views.__alloyId2 = Ti.UI.createLabel({
        width: "20%",
        height: "30%",
        color: "white",
        text: "Top Rated",
        left: "65%",
        top: "65%",
        textAlign: "center",
        id: "__alloyId2"
    });
    $.__views.__alloyId0.add($.__views.__alloyId2);
    $.__views.list = Ti.UI.createTableView({
        id: "list",
        top: "20%",
        height: "81%",
        width: "100%",
        backgroundColor: "#ffffff"
    });
    $.__views.index.add($.__views.list);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.index.open();
    loadData();
    var selectedId = -1;
    var bReads = true;
    $.list.addEventListener("click", function(e) {
        if (e.rowData.id == selectedId) {
            selectedId = -1;
            loadData();
        } else if (e.rowData.id >= 0) {
            selectedId = e.rowData.id;
            loadData();
        }
    });
    $.topReads.addEventListener("click", function() {
        bReads = true;
        selectedId = -1;
        loadData();
    });
    $.topRated.addEventListener("click", function() {
        bReads = false;
        selectedId = -1;
        loadData();
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;