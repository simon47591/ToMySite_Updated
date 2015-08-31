$(document).ready(function(){
	 onMobileReady();
});
	

function onMobileReady(){
	
	
	// Check user settings
	if(localStorage.fullname == null || localStorage.fullname == ''
	   && localStorage.businessname == null || localStorage.businessname == ''
	   && localStorage.email == null || localStorage.email == ''
	   && localStorage.domainname == null || localStorage.domainname == ''){
		
		$("#settingsEmpty").show();
		$(".opac-BG").show();
		
	} else {
		$('#settingsEmpty').hide();
		var fullname = localStorage.getItem('fullname');
		var businessname = localStorage.getItem('businessname');
		var email = localStorage.getItem('email');
		var domainname = localStorage.getItem('domainname');
		updateSettings(fullname,businessname,email,domainname);
	}
	
	
	// Setup Configuration
	$("#settingsEmptySave").click(function(){
		var fullname = $("#popup-settings-fullname").val();
		var businessname = $("#popup-settings-businessname").val();
		var email = $("#popup-settings-email").val();
		var domainname = $("#popup-settings-domainname").val();
		
		if (fullname && businessname && email && domainname) { 
			//validate email
			if (IsEmail(email)==false) {
			     $("#popup-settings-email").css({"background":"#FF9494"});
				 $(".emailError").fadeIn(200);	
			}else{
				updateSettings(fullname,businessname,email,domainname);
				$(".emailError").hide();
				$("#popup-settings-email").css({"background":"#FFFFFF"});
				$('.popup-wrap').hide();
		        $('.opac-BG').hide();
			}
	    }
	});
	
	
	
	
	// Setup Configuration
	$("#settingsSave").click(function(){
		var fullname = $("#form-settings-fullname").val();
		var businessname = $("#form-settings-businessname").val();
		var email = $("#form-settings-email").val();
		var domainname = $("#form-settings-domainname").val();
		$this = $(this);
		$this.html('<img src="img/loader.gif" width="30" />');
		
		if (fullname && businessname && email && domainname) { 
			//validate email
			if (IsEmail(email)==false) {
			     $("#form-settings-email").css({"background":"#FF9494"});
				 $(".emailError").fadeIn(200);	
			}else{
				updateSettings(fullname,businessname,email,domainname);
				$(".emailError").hide();
				$("#form-settings-email").css({"background":"#FFFFFF"});
				$this.html('<img src="img/checkmark.png" width="30" />');
				setTimeout(function(){ $this.html("Save"); }, 2000);
			}
	    }
	});

	
	
	
	// Send Testimonial
	$("#sendTestimonial").click(function(){
		var testimonial = $("#form-testimonial-testimonial").val();
	    var clientname = $("#form-testimonial-clientname").val();
	    var date = $("#form-testimonial-date").val();
		
		   sendEmail(testimonial,clientname,date);
		
		$("#form-testimonial-testimonial").val("");
	    $("#form-testimonial-clientname").val("");
	    $("#form-testimonial-date").val("");
	});
	



// Send Photos
 $("#formSubmitPhotoBtn").click(function() {
    submitPhoto();
 });


closePopup();
// End onMobileReady()	
}



/* ============================================== */
/* Function List */
/* ============================================== */

// Update Settings Function
function updateSettings(fullname,businessname,email,domainname){ 
        localStorage.setItem('fullname',fullname);
		localStorage.setItem('businessname',businessname);
		localStorage.setItem('email',email);
		localStorage.setItem('domainname',domainname);
		
		$("#form-settings-fullname").val(fullname);
		$("#form-settings-businessname").val(businessname);
		$("#form-settings-email").val(email);
		$("#form-settings-domainname").val(domainname);
		
		
}




//validate email function
function IsEmail(email) {
	  var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	  return regex.test(email);
}




// Send Email function
function sendEmail(testimonial,clientname,date){
	var fullname = $("#form-settings-fullname").val();
	var businessname = $("#form-settings-businessname").val();
	var email = $("#form-settings-email").val();
	var domainame = $("#form-settings-domainname").val();
	$("#sendTestimonial").html('<img src="img/loader.gif" width="30" />');
	var data = '&mode=sendTestimonial' + '&testimonial=' + testimonial + '&clientname=' + clientname + '&date=' + date + '&fullname=' + fullname + '&businessname=' + businessname + '&email=' + email + '&domainame=' + domainame;
			
			$.ajax({
				  url: 'http://sitedini.com/ywp/phoneApp/ajax.php',
				  data: data,
				  dataType: 'html',
				  method: 'POST',
				  success: function(){
						$("#sendTestimonial").html('<img src="img/checkmark.png" width="30" />');
				        setTimeout(function(){ $("#sendTestimonial").html("Send"); }, 2000);
				  }
			  
			});
}








// Send Photos
        function submitPhoto(imageURI,num,selVal,textVal){
			var fullname = $("#form-settings-fullname").val();
			var businessname = $("#form-settings-businessname").val();
			var email = $("#form-settings-email").val();
			var domainame = $("#form-settings-domainname").val();
			console.log("Submit Photo Started");
			$("#form-submitPhoto-trap-wrap").html("Submit Photo Started");
            var options = new FileUploadOptions();
            options.fileKey="file";
            options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);
            options.mimeType="image/jpeg";
            var params = new Object();
            params.mode = "sendPhotos";
            params.fullname = fullname;
			params.businessname = businessname;
			params.email = email;
			params.domainame = domainame;
			params.selVal = selVal;
			params.textVal = textVal;
            options.params = params;
            options.chunkedMode = false;
            var ft = new FileTransfer();
            ft.upload(imageURI, "http://sitedini.com/ywp/phoneApp/ajax.php", win(num), fail, options);
 
        }
 
        function win(num) {
			selectPhotoInfo(num);
			if (num>=$imgDataCnt) { 
				$("#photoDetails").fadeOut(100); 
				$("#imgPlaceholder").html(''); 
				$("#photoUploading").hide();
				$("#photoSucess").fadeIn(100); //.delay(3000).fadeOut(100);
				$("#form-submitPhoto-trap").html('');
				window.location.hash = "#home";
			}
        }
 
        function fail(error) {
            alert("An error has occurred: Code = " + error.code);
			$("#form-submitPhoto-trap-wrap").html("An error has occurred: Code = "+error.code);
        }
		
		
		
		


	
	

// Delete Photos
function deletePhoto(){
	$(".imagesToUploadDelete").unbind();
	$(".imagesToUploadDelete").click(function(){
		var imgDataUpd = '';
		$this = $(this).parent();
		var imgDataToDelete = $(this).attr("data-imgData");
		$this.fadeOut(100);
		var imgData = $("#form-submitPhoto-trap").html();
			imgData = imgData.slice(0,-5);
	 		var imgDataRes = imgData.split(":::::");
			$.each(imgDataRes, function(i,v){
				if (v!=imgDataToDelete) { imgDataUpd += v+':::::'; }
			});
			$("#form-submitPhoto-trap").html(imgDataUpd);
    });
}





// Delete Images
function deleteVideos(){
	$(".videoToUploadDelete").unbind();
	$(".videoToUploadDelete").click(function(){
        $("#imgPlaceholder").html('');
		$("#textValVideo").html('').fadeOut(100);
		$("#addFromGallery").fadeIn(100);
	    //$("#addFromCamera").fadeIn(100);
    });
}




function submitPhotoDets(){
	$("#submitPhotoBtn").unbind();
	$("#submitPhotoBtn").click(function(){ 
	$("#photoUploading").show();
	 	var imgData = $("#form-submitPhoto-trap").html();
			imgData = imgData.slice(0,-5);
	 		$imgDataRes = imgData.split(":::::");
			$imgDataCnt = $imgDataRes.length;
		    selectPhotoInfo(0)
	});
}



function selectPhotoInfo(num){
   	photoDetails($imgDataRes[num],num);
}


// Photo Details
function photoDetails(img,num){
	document.getElementById('photoDetails-continueBtn').style.pointerEvents = 'none';
	$("#photoDetails-continueBtn").css({"opacity":"0.5"});
	$("#photoDetails-continueBtn").html("Next");
	$("#photoDetails-comments").val("");
	$("#photoDetails-context").val("empty");
	$("#imgPlaceHolderForDetails img").attr("src",img);
	$("#photoDetails-other").hide();
	$("#photoDetails").fadeIn(100);
	$("#photoDetails-context").on('change',function(){
		var selVal = $(this).val();
		if (selVal!='empty'){ 
			if (selVal=='Other'){ $("#photoDetails-other").fadeIn(200); }
			document.getElementById('photoDetails-continueBtn').style.pointerEvents = 'auto';
			$("#photoDetails-continueBtn").css({"opacity":"1"});
			    $("#photoDetails-continueBtn").unbind();
				$("#photoDetails-continueBtn").click(function(){
					document.getElementById('photoDetails-continueBtn').style.pointerEvents = 'none';
					$("#photoDetails-continueBtn").html('<img src="img/loader.gif" width="30" />');
					
					if (selVal=='Other' && ($("#photoDetails-other").val()=='undefined' || $("#photoDetails-other").val()=='')){ 
						var error = 'You must enter a photo context';
		   				var errorIni = 'photoDetails-other';
						$("#photoDetails-emailError-text").html(error); 
						$("#"+errorIni).css({"background":"#FF9494"});
						$("#photoDetails-emailError").fadeIn(200);
						$("#photoDetails-continueBtn").html("Next");
						document.getElementById('photoDetails-continueBtn').style.pointerEvents = 'auto';
						return false;
					} 
					var selVal = $("#photoDetails-context").val();
					var textVal = $("#photoDetails-comments").val();
                    if (selVal=='Other') { var selVal = $("#photoDetails-other").val(); }
					// Send photo
					if (num+1<=$imgDataCnt) { submitPhoto(img,num+1,selVal,textVal); }
				});
		}
	});
}















function submitVideoDets(mediaFile){
	$("#submitPhotoBtn").unbind();
	$("#submitPhotoBtn").click(function(){ 
         uploadFile(mediaFile)
	});
}



// Upload video to server
    function uploadFile(mediaFile) {
		    document.getElementById('submitPhotoBtn').style.pointerEvents = 'none';
			document.getElementById('textValVideo').style.pointerEvents = 'none';
			document.getElementById('imgPlaceholder').style.pointerEvents = 'none';
		    $("#submitPhotoBtn").html('<img src="img/loader.gif" width="30" />');
	        $("#submitPhotoBtn, #textValVideo, #imgPlaceholder, .videoToUploadDelete").css({"opacity":"0.5"});
			var fullname = $("#form-settings-fullname").val();
			var businessname = $("#form-settings-businessname").val();
			var email = $("#form-settings-email").val();
			var domainame = $("#form-settings-domainname").val();
			var textVal = $("#textValVideo").val();
            var options = new FileUploadOptions();
            	options.fileKey="file";
            	options.fileName=mediaFile.substr(mediaFile.lastIndexOf('/')+1);
            	options.mimeType="video/mp4";
            var params = new Object();
            	params.mode = "sendVideo";
            	params.fullname = fullname;
				params.businessname = businessname;
				params.email = email;
				params.domainame = domainame;
				params.textVal = textVal;
            	options.params = params;
            	options.chunkedMode = false;
            var ft = new FileTransfer(),
			             path = mediaFile;
            ft.upload(mediaFile, "http://sitedini.com/ywp/phoneApp/ajax.php", winVid, failVid,  options);	   
    }
	
	
	
        function winVid() {
				$("#submitPhotoBtn").html('<img src="img/checkmark.png" width="30" />');
				setTimeout(function(){ window.location.hash = "#home"; },1000);
				setTimeout(function(){
					$("#textValVideo").fadeOut(100);
					$("#photoDetails").fadeOut(100); 
					$("#imgPlaceholder").html('');
					$("#photoUploading").hide(); 
					$("#photoSucess").fadeIn(100); //.delay(3000).fadeOut(100);
					$("#form-submitPhoto-trap").html('');
					$("#addFromGallery").delay(500).show(100);
					$("#addFromCamera").delay(500).show(100);
					document.getElementById('submitPhotoBtn').style.pointerEvents = 'auto';
					document.getElementById('textValVideo').style.pointerEvents = 'auto';
			        document.getElementById('imgPlaceholder').style.pointerEvents = 'auto';
                    $("#submitPhotoBtn, #textValVideo, #imgPlaceholder, .videoToUploadDelete").css({"opacity":"1"});
					$("#submitPhotoBtn").html('Submit');
				},1200);
        }
 
        function failVid(error) {
            alert("An error has occurred: Code = " + error.code);
			$("#form-submitPhoto-trap-wrap").html("An error has occurred: Code = "+error.code);
        }
		
		
		
		
		
		
		
		
		
// Close popup function
function closePopup(){
	$(".closePopup").click(function(){
		var parEl = $(this).parents(".popup-wrap");
		parEl.fadeOut(200);
		$(".opac-BG").fadeOut(200);
	});
}
