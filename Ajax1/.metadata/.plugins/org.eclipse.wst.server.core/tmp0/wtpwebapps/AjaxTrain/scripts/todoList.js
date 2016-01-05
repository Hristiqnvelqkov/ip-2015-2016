$(document).ready(function() {
	"use strict";
	var ENDPOINT = "http://localhost:3000/tasks";
	function taskEndpoint(taskId) {
		return ENDPOINT + "/" + taskId;
	}

	function showPanel(panelName) {
		var ALL_PANELS = ["emptyPanel", "readPanel", "updatePanel", "createPanel"];
		_.forEach(ALL_PANELS, function(nextValue) {
			$("#"+nextValue).hide();
		});
		$("#"+panelName).show();
	}

	function listTasks() {
		return $.ajax(ENDPOINT, {
			method: "GET",
			dataType: "json"
		});
	}
	function readTask(taskId) {
		return $.ajax(taskEndpoint(taskId), {
			method: "GET",
			dataType: "json"
		});
	}
	function showTaskView(task) {
		$("#readPanel .task-title").text(task.title);
		$("#readPanel .task-description").text(task.description);
		showPanel("readPanel");
		$("#readPanel").attr("data-id", task.id);
	}
	function reloadTasks() {
		listTasks().then(function(response) {
			function addTaskToList(task) {
				var newItem = $("<li />");
				newItem.text(task.title);
				newItem.addClass("list-group-item");
				newItem.attr("data-task-id", task.id);
				$("#tasksList").append(newItem);
			}
			$("#tasksList").html("");
			_.forEach(response, addTaskToList);
		});
	}
	function attachHandlers() {
		$(document).on("click", "#tasksList [data-task-id]", function() {
			var taskId = $(this).attr("data-task-id");
			readTask(taskId).then(showTaskView);
		});
		$(".task-action-cancel").click(function() {
			showPanel("emptyPanel");
		});
		
		$("#addTaskButton").click(function(){
			showPanel("createPanel");
			$("#createPanel .task-action-ok").click(function(){
				var task = {
						title: $("#createPanel .form-control").val(),
//						description: $("#createPanel .form-control").val()
					};
				alert("asassaas");
				//$("#updatePanel .task-action-ok").click(function(){
					$.ajax(ENDPOINT, {
						method: "POST",
						contentType: "application/json; charset=utf-8",
						data: JSON.stringify(task),
						dataType: "json"
					}).then(function(response) {
						console.log(response);
						return response;
					//});
				});	
			});	
			
		});
		$("#readPanel .task-action-ok").click(function(){
			showPanel("updatePanel");
			$("#updatePanel .task-action-ok").click(function(){
				var task= {
						title: $("#updatePanel input").val(),
						description: $("#updatePanel textarea").val()
				}
				alert(task.title);
				var task_id = $("#readPanel").attr("data-id");
				$.ajax(taskEndpoint(task_id), {
					method: "PUT",
					contentType: "application/json; charset=utf-8",
					data: JSON.stringify(task),
					dataType: "json"
				});		
			});
		});
	$("#readPanel .task-action-remove").click(function(){
		var task_id = $("#readPanel").attr("data-id");
		$.ajax(taskEndpoint(task_id), {
			method: "DELETE"
			
		});
	});
	}
	attachHandlers();
	reloadTasks();
});
