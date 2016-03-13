var startlatitude=0;
var startlong=0;
var finishlatitude=0;
var finishlong=0;
var ENDPOINT="http://localhost:3000/users"
var ENDPOINT1="http://localhost:3000/activities"
$(".login").click(function(){
	var username=$(".username").val();
	var pass=$(".password").val();
$.ajax(ENDPOINT, {
		method: "GET",
		data: {
			username: username,
			password: pass
		},
		dataType: "json"
	}).then(function(response) {
		console.log(response);
		for (var i=0;i<response.length;i++){
			console.log(response[i].username);
		}
		// if ((response.username==username) && (response.password==pass)){
		// 	window.location.replace("/home/hriso/Desktop/Web-programing/myprofile.html");
		// }else {
			
		// }
	});
});
$(".signup").click(function(){
	var username=$(".username").val();
	var name=$(".name").val();
	var pass=$(".password").val();
	var user = {
		name: name,
		username: username,
		password: pass
	};
	$.ajax(ENDPOINT, {
		method: "POST",
		contentType: "application/json; charset=utf-8",
		data: JSON.stringify(user),
		dataType: "json"
	}).then(function(response) {
		window.location.replace("/home/hriso/Desktop/Web-programing/myprofile.html");
	});
});
$(".start").click(function(){
	$(".searchdiv").append("<input class=trackloc></input>");
	$(".searchdiv").append("<button class=goon>GO</button>");
	var starttime = new Date();
	$(document).on("click",".goon",function(){
		navigator.geolocation.getCurrentPosition(success, error, options);
		$(".start").replaceWith("<button class=finish>finish</button>")
		$(document).on("click" ,".finish",function(){
			$(this).remove();
			var finish = new Date();
			var diff=finish-starttime
			var msec = diff;
			var hh = Math.floor(msec / 1000 / 60 / 60);
			msec -= hh * 1000 * 60 * 60;
			var mm = Math.floor(msec / 1000 / 60);
			msec -= mm * 1000 * 60;
			var ss = Math.floor(msec / 1000);
			msec -= ss * 1000;
			var activity = {
				startDate: starttime,
				endDate: finish,
				location: $(".trackloc").val()
			};
			$.ajax(ENDPOINT1, {
				method: "POST",
				contentType: "application/json; charset=utf-8",
				data: JSON.stringify(activity),
				dataType: "json"
			}).then(function(response) {
				console.log(response);
			});
			navigator.geolocation.getCurrentPosition(success1, error, options)
			$(".searchdiv").append("<button class=test>Cukni</button>")
			$(document).on("click",".test",function(){
				var startloc={
					lat: startlatitude,
					lon: startlong
				};
				var finishloc={
					lat: finishlatitude,
					lon: finishlong
				};
				calculateDistance(startloc,finishloc);
			});
		});
			$(".start").remove();
	});
});
$(".searchloc").click(function(){
	var track=$(".searchbyloc").val();
	$.ajax(ENDPOINT1, {
		method: "GET",
		data: {
			location :track
		},
		dataType: "json"
	}).then(function(response) {
		console.log(response);
		for (var i=0;i<response.length;i++){
			console.log(response[i].location);
			var table=$(".table");
			var tr=$("<tr></tr>");
			tr.val(response[i].location);
			var td=$("<td></td>");
			td.append(response[i].startDate);
			td.append(response[i].endDate);
			td.append(response[i].location);
			tr.append(td);
			table.append(tr)
		}
	});
});
var earthRadius = 6371;
var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

function success(pos) {
  var crd = pos.coords;
  startlatitude=crd.latitude;
  startlong=crd.longitude;
  console.log('Your current position is:');
  console.log('Latitude : ' + crd.latitude);
  console.log('Longitude: ' + crd.longitude);
  console.log('More or less ' + crd.accuracy + ' meters.');

};
function success1(pos) {
  var crd = pos.coords;
  finishlatitude=crd.latitude;
  finishlong=crd.longitude;
  console.log('Your current position is:');
  console.log('Latitude : ' + crd.latitude);
  console.log('Longitude: ' + crd.longitude);
  console.log('More or less ' + crd.accuracy + ' meters.');

};

function error(err) {
  console.warn('ERROR(' + err.code + '): ' + err.message);
};

function calculateDistance(posA, posB) {
    var lat = posB.lat-posA.lat; // Difference of latitude
    var lon = posB.lon-posA.lon; // Difference of longitude

    var disLat = (lat*Math.PI*earthRadius)/180; // Vertical distance
    var disLon = (lon*Math.PI*earthRadius)/180; // Horizontal distance

    var ret = Math.pow(disLat, 2) + Math.pow(disLon, 2); 
    ret = Math.sqrt(ret)
    console.log(ret);
}