function btn_click(obj) {
	//alert("진입");
	if(obj=="login") {
		//alert("1");
		$("#form1").attr("method","post");
		//$("#form1").attr("action","/loginPost");
		$("#form1").submit(); // 꼭 submit을 해줘서 보낸다.
		
	} else {
		//alert("2");
		$("#form1").attr("action", "member");
		$("#form1").submit();
		/*form1.method = "get";
		form1.action = "member";*/
		
	}
}


