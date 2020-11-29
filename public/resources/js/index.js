/**
 * 
 */
$(document).ready(function(){ 
	$('#log_out').click(function() { 
		var result = confirm('로그아웃을 합니다.'); if(result) { 
			
			location.href('/logout');
		} else { 
			
		} 
	}); 
	
});


function slideimg(data){
	location.href=data;
}
