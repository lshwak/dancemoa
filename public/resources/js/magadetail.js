

$(document).ready(function(){
	// 수정
	$("#modi").click(function(){
		$("#magaForm").attr("action","magamodify")
	})
	// 삭제
	$("#del").click(function(){
		alert("게시물을 삭제합니다.");
		$("#magaForm").attr("action","magadelete")
	})
})










