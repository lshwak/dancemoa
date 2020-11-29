
  //파일 업로드 (C:upload에 선택한 파일을 넣기.)
	 function checkImageType(fileName) {
			var pattern = /jpg|gif|png|jpeg/i;
			return fileName.match(pattern);
		}

		function getImageLink(fileName) {
			if(!checkImageType(fileName)) {
				return;
			}
			// 풀 네임 : /2020/01/07/s_0b07edde-adf0-423b-9bc8-8936cd4c7554_kmj.jpg
			var front=fileName.substr(0,12); // /2020/01/07/
			var end=fileName.substr(14); // 0b07edde-adf0-423b-9bc8-8936cd4c7554_kmj.jpg 앞에 s_ 떼어줌
				
			
			return front+end;
		}
		function getOriginalName(fileName) {
			//alert("filename="+fileName);
			return fileName;
		}


		$("#file").on("change", function(event){
			//event.preventDefault();
			//var files=event.originalEvent.dataTransfer.files;
			
			var file=$("#file")[0].files[0];
			console.log(file);
			
			var formData = new FormData();
			
			formData.append("file", file);
			
			$.ajax({
				url:"uploadAjax",
				data:formData,
				dataType:"text",
				processData:false,
				contentType:false,
				type:"post",
				success:function(data) {
					// console.log(data);
					// alert(data);
					//alert(checkImageType);
					
					var str="";
					if(checkImageType(data)){
						console.log(data);
						str="<div>"
							+"<img src='displayFile?fileName="+getImageLink(data)+"'/>"
							+"<small data-src='"+getImageLink(data)+"'>X</small>"+"</div>";
					} else {
						//alert("ccc");
						str="<div><a href='displayFile?fileName="+data+"'>"
							+getOriginalName(data)+"</a></div>";
					}
					$("#uploadedList").append(str);
					
				}
			});
		});	// drop
		 
		$(".imgdelete a").on("click", function(){
			var that = $(this);
			$.ajax({
				url:"deleteFile",
				type:"post",
				data:{fileName:$(this).attr("data-src")},
				dataType:"text",
				success:function(result){
					if(result=="deleted"){
						//alert("delete");
						that.parent("div").remove();
					}
				}
			});
		}); // delete
		
		
		
		// small 태그를 click했을 때.
		$("#uploadedList").on("click","small",function(event){
			//alert("delete?");
			var that = $(this);
			$.ajax({
				url:"deleteFile",
				type:"post",
				data:{fileName:$(this).attr("data-src")},
				dataType:"text",
				success:function(result){
					if(result=="deleted"){
						// alert("delete");
						that.parent("div").remove();
					}
				}
			});
		});
	
		
		$("#modifyForm").submit(function(event){
			//alert("modify");    
			event.preventDefault();
			var that = $(this);
			
			var str = "";
			
			var imgal = $(".imgdelete a").length;
			//alert("기존이미지 갯수="+imgal);
			$(".imgdelete a").each(function(index){
				str += "<input type='hidden' name='filename["+index+"]' value='"+$(this).attr('data-src')+"'>";
			});
			
			$("#uploadedList small").each(function(index){
				str += "<input type='hidden' name='filename["+(index+parseInt(imgal))+"]' value='"+$(this).attr('data-src')+"'>";
			});
			
			
			
			that.append(str);
			alert("게시물을 수정합니다.");
			that.get(0).submit();
			
			
		});








/*주소*/

function sample6_execDaumPostcode() {
	
	
    new daum.Postcode({
        oncomplete: function(data) {
            // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

            // 각 주소의 노출 규칙에 따라 주소를 조합한다.
            // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
            var addr = ''; // 주소 변수
            var extraAddr = ''; // 참고항목 변수

            //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
            if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
                addr = data.roadAddress;
            } else { // 사용자가 지번 주소를 선택했을 경우(J)
                addr = data.jibunAddress;
            }
            
            
            // 우편번호와 주소 정보를 해당 필드에 넣는다.
            document.getElementById('sample6_postcode').value = data.zonecode;
            document.getElementById("sample6_address").value = addr;
            // 커서를 상세주소 필드로 이동한다.
            /*document.getElementById("sample6_detailAddress").focus();*/
            
            var adr1 = document.getElementById("sample6_postcode").value	/*우편번호*/
            var adr2 = document.getElementById("sample6_address").value	/*메인주소*/
           /* var adr3 = document.getElementById("sample6_detailAddress").value	상세주소*/
         
   		 
   		 document.getElementById("address").value = ("("+adr1+") "+adr2);
         document.getElementById("sumaddress").value
         =  document.getElementById("address").value;
        }
    }).open();
}



function detailAddress(){
	var add1 = document.getElementById("address").value;
	var add2 = document.getElementById("sample6_detailAddress").value;
	
	document.getElementById("sumaddress").value =add1+" "+add2;
}




$(document).ready(function(){
	

$("#mdf").on('click', function() {
	//var sty = [];
	var sty = "";
	$("input[name=estyle]:checked").each(function(){
		sty+=$(this).val()+", ";
		//sty.push($(this).val());
	});
	//alert(sty);
	
});

})

















