
$(document).ready(function(){
	//등록
	$("#regist").click(function(){
		$("#eventForm").attr("action", "register")
	})
	//검색
	$("#search").click(function(){
		
		$("#eventForm").attr("action", "");
	})
})
