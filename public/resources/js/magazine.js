
$(document).ready(function(){
	//등록
	$("#mregist").click(function(){
		$("#magaForm").attr("action", "mregister")
	})
	//검색
	$("#msearch").click(function(){
		
		$("#magaForm").attr("action", "");
	})
})
