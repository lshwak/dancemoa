$(document).ready(function(){
	// 수정
	$("#modi").click(function(){
		$("#acaForm").attr("action","acamodify")
	})
	// 삭제
	$("#del").click(function(){
		alert("게시물을 삭제합니다.");
		$("#acaForm").attr("action","acadelete")
	})
})






