
$(document).ready(function(){
	//등록
	$("#aregist").click(function(){
		$("#acaForm").attr("action", "aregister")
	})
	//검색
	$("#asearch").click(function(){
		$("#acaForm").attr("action", "");
	})
})
