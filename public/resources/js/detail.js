
$(document).ready(function(){
	//수정
	$("#modi").click(function(){
		$("#detailForm").attr("action", "modify")
	})
	//삭제
	$("#del").click(function(){
		alert("게시물을 삭제합니다.");
		$("#detailForm").attr("action", "delete");
	})
	
	// 추천
	
})
























