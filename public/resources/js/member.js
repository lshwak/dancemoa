
var rannum="";	// 이메일인증난수 전역변수
//function rannum(data){}
/* 자바스크립트 */

// 아이디 중복체크
function checkId() {
     $.ajax({	
 		url : "idChk", // 보낼 url주소.
 		type : "post", 
 		dataType : "json", //dataType : 리턴을 받는 타입이json
 		data : {"id" : $("#idCheck").val()}, // 보낼 데이터
 		success : function(data) {
 			
 			if(data == 1) {	// 같은 data가 존재하면.
 				document.getElementById("idRes").innerHTML=
 				"이미 존재하는 아이디입니다.";
 				idRes.style.color = "red";
 				return false;
 			}
 				
 		}
 	})
 	
}

function form_check() { // form전송 전 유효성 검사 onsubmit
	
	var result=true; // 기본 값을 true
	var idRes = document.getElementById("idRes").innerHTML; // 아이디 유효성검사 메시지
	var pwRes = document.getElementById("pwRes").innerHTML;	// 비번 유효성검사 메시지
    var id = document.getElementById("idCheck").value; // 아이디 입력
	var pw = document.getElementById("pwCheck").value; // 비번 입력
	var repw = document.getElementById("repwCheck").value; // 비번확인 입력
	var name = document.getElementById("nameCheck").value.length; // 이름 입력
	var phone = document.getElementById("pnum").value.length; // 입력한 전체 연락처
	var randomNum = document.getElementById("numCheck").value; // 인증번호 입력
	
	// 아이디 체크
	if(idRes != "사용가능한 아이디입니다."){
		result=false;
		return result;
		document.getElementById("SignUp").disabled = false;
	}
	// 비밀번호 체크
	if(pwRes != "사용가능한 비밀번호입니다."){
		result=false;
		return result;
		document.getElementById("SignUp").disabled = false;
	}
	// 비밀번호 확인 체크
	if(pw != repw){
		result=false;
		return result;
		document.getElementById("SignUp").disabled = false;
	}
	// 이름길이 체크
	if (name > 12) {
		document.getElementById("nameRes").innerHTML=
            "최대 12자까지의 이름를 작성해주세요.";
		result=false;
		return result;
		document.getElementById("SignUp").disabled = false;
	}
	// 연락처 길이 체크
	if (phone > 11) {
		 document.getElementById("phoneRes").innerHTML=
             "최대 11자까지의 연락처를 작성해주세요.";
			result=false;
			return result;
		document.getElementById("SignUp").disabled = false;
	}
	// 인증번호 체크
	if (rannum != randomNum) {
		result=false;
		return result;
		document.getElementById("SignUp").disabled = false;
	}
	return result;
}

$(document).ready(function(){
	var idpt=RegExp(/^[a-zA-Z0-9_]{3,12}$/); // 생성자함수. 패턴 가져오기
	//아이디 패턴,길이
	$("#idCheck").keyup(function(){
		if(!(idpt.test($("#idCheck").val()))) {
			$("#idRes").html("영문 대소문자, 숫자, (_)를 사용하여 3자 이상, 12자 이하만 입력하세요.");
			$("#idRes").css("color","red");
		} else {
			$("#idRes").html("사용가능한 아이디입니다.");
			$("#idRes").css("color","blue");
		}
	})
	
	
	// 비밀번호 길이 확인
	var pwpt=RegExp(/^[a-zA-Z0-9!@#$%^&*-_+=]{8,12}$/);
	$("#pwCheck").keyup(function(){
		if(!(pwpt.test($("#pwCheck").val()))) {
			$("#pwRes").html("영문 대소문자, 숫자, 특수문자를 사용하여 8자 이상 12자 이하로 입력하세요.");
			$("#pwRes").css("color","red");
		} else {
			$("#pwRes").html("사용가능한 비밀번호입니다.");
			$("#pwRes").css("color","blue");
		}
	})
	
	// 인증번호 발송 눌렀을 때
	$("#randomNum").click(function(){
		
		var one = document.getElementById("mail1").value
	    var two = document.getElementById("mailRes").value
	    document.getElementById("summail").value = (one +"@"+ two);
		var tomail = $("#summail").val();
	// MemberController 이메일 인증.
		$.ajax({
			url : "mail",
			type : "post",
			dataType : "text",
			data : "tomail="+tomail,		//보낼데이터 이메일
			success : function(data){	// controller에서 만들어온 난수data
				//alert("ajax의 "+data);
				rannum=data;
				alert("인증번호가 전송되었습니다. 해당 메일 [ "+tomail+" ]에서 번호를 확인해주세요.");
				/*$("#checkEmailnum").html("<input type='text' id='numCheck'  required>"+
                             "<input type='button' id='matching' onclick='match()' value='확인'>");*/
			}
		})
		
	})
	
	// 연락처 두번째 입력상자에 숫자만...
	$("input:text[numberOnly]").on("keyup", function() { // input:text[numberOnly]:숫자만 입력가능. 
	    $(this).val($(this).val().replace(/[^0-9]/g,""));
	    
	    
	    var pone = document.getElementById("pnum1").value
	    var ptwo = document.getElementById("pnum2").value
	    var pthree = document.getElementById("pnum3").value
	    document.getElementById("pnum").value = (pone+ptwo+pthree); // 키를 누를 때 마다 pnum에 입력.
	    
	});
})



// 비밀번호 재확인
function checkRepw() {
          // text안의 값을 받아와서 길이를 측정 후 변수에 넣음
          var Repwlen=document.getElementById("repwCheck").value;
          var Pwlen=document.getElementById("pwCheck").value;
        
          // if구문 길이가 8자 이상, 12자 이하면 repwRes에 출력.
          if(Repwlen == Pwlen) {
                   document.getElementById("repwRes").innerHTML=
                             "비밀번호가 일치합니다.";
                   repwRes.style.color = "blue";
          }else{
        	  document.getElementById("repwRes").innerHTML=
                   "비밀번호 확인을 위해 동일하게 입력해주세요.";
                   repwRes.style.color = "red";
                   return false;
          }
}


//입력한 이메일 값 합치기(직접입력)
function emailmerge(){
	//alert("aaaaaaaaa");
	var one = document.getElementById("mail1").value
    var two = document.getElementById("mailRes").value
    document.getElementById("summail").value = (one +"@"+ two);
}
// 이메일 선택 시 text에 넣기(직접입력이 아닌 경우)
function checkEmail() {
          // em변수에 mail을 넣고.
          var em = document.getElementById("mail").value
          // mailRes자리에 em을 넣겠다.
          document.getElementById("mailRes").value=em;
          // option에 op혹은 no가 mailRes자리에 들어가는데
          var no = document.getElementById("mailRes").value.length;
          var op = document.getElementById("mailRes").value.length;
         
          if(em ==no) { // mailRes자리가되는 em에 직접입력이 되면 수정가능
          document.getElementById("mailRes").readOnly=false;
          } else {                           // mailRes자리가되는 em에 no가 아닌 주소가 들어가면 readonly
                   document.getElementById("mailRes").readOnly=true;
          }
          
          var one = document.getElementById("mail1").value
          var two = document.getElementById("mailRes").value
          document.getElementById("summail").value = (one +"@"+ two);
}

// 연락처 select option
function phonemerge() {
	var pone = document.getElementById("pnum1").value
    var ptwo = document.getElementById("pnum2").value
    var pthree = document.getElementById("pnum3").value
    document.getElementById("pnum").value = (pone+ptwo+pthree);
}
// select option과 input:text를 따로 합치는 작업을 해줘야 앞,뒤 입력 순서 상관없이 pnum에 입력이 된다.


// 발송버튼 눌렀을 때 인증번호 받기
var ran = 'trandom';           // 전역변수로 지정
/*function random() {
            // 지역변수
                   ran = Math.floor(Math.random()*10000)+10000; // 다섯자리의 랜덤메소드를 controller로 이동.
          alert("인증번호 "+ran+"를 입력하세요");
}*/
// 번호확인버튼 눌렀을 때 인증번호 매칭
function match() {
		//alert(rannum)
          var nc = document.getElementById("numCheck").value    // 인증번호 입력
         // var nclen = document.getElementsById("numCheck").value.length;
          if(nc == "") {
        	  alert("인증실패");
          }else if(nc == rannum) {   // 입력한 값이 랜덤값과 같으면
                   alert("인증성공");      
          }else {                     // 입력한 값이 같지 않으면
                   alert("인증실패");
          }
}

//가입하기 submit버튼 
//function checking() {
// 입력한 이메일 값 합치기
//       var one = document.getElementById("mail1").value
//       var two = document.getElementById("mailRes").value
//       document.getElementById("summail").value = (one +"@"+ two);
// 입력한 연락처 값 합치기
//       var pone = document.getElementById("pnum1").value
//       var ptwo = document.getElementById("pnum2").value
//       var pthree = document.getElementById("pnum3").value
//      document.getElementById("pnum").value = (pone+ptwo+pthree);       
//} 메일 인증을 위해 onkeyup으로 즉시 담고 처리가 되어야 submit을 할 수 있어서 submit에 합치는 작업을 넣을 수 없음.





