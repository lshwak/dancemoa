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
					// alert(checkImageType);
					
					var str="";
					if(checkImageType(data)){
						console.log(data);
						str="<div>"
							+"<img src='displayFile?fileName="+getImageLink(data)+"'/>"
							+"<small data-src='"+getImageLink(data)+"'>X</small>"+"</div>";
					} else {
						// alert("ccc");
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
						// alert("delete");
						that.parent("div").remove();
					}
				}
			});
		}); // delete
		
		
		
		// small 태그를 click했을 때.
		$("#uploadedList").on("click","small",function(event){
			// alert("delete?");
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
	
		
		$("#acamodiForm").submit(function(event){
			// alert("modify");    
			event.preventDefault();
			var that = $(this);
			
			var str = "";
			
			var imgal = $(".imgdelete a").length;
			// alert("기존이미지 갯수="+imgal);
			$(".imgdelete a").each(function(index){
				str += "<input type='hidden' name='aimage["+index+"]' value='"+$(this).attr('data-src')+"'>";
			});
			
			$("#uploadedList small").each(function(index){
				str += "<input type='hidden' name='aimage["+(index+parseInt(imgal))+"]' value='"+$(this).attr('data-src')+"'>";
			});
			
			
			
			that.append(str);
			alert("게시물을 수정합니다.");
			that.get(0).submit();
			
			
		});