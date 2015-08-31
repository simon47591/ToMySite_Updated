

    var pictureSource;   // picture source
    var destinationType; // sets the format of returned value

    // Wait for device API libraries to load
    document.addEventListener("deviceready", cameraReady,false);

    // device APIs are available
    function cameraReady() {
        pictureSource=navigator.camera.PictureSourceType;
        destinationType=navigator.camera.DestinationType;
    }


// =============================
// ======= Camera Photos =======
// =============================
    // Called when a photo is successfully retrieved
    function onPhotoURISuccess(imageData) {
	  var newImg = '<div class="imagesToUpload"><div class="imagesToUploadDelete" data-imgData="'+imageData+'"></div><img src="'+imageData+'" style="width:100%;" /></div>';
	  $("#imgPlaceholder").append(newImg);
	  $("#form-submitPhoto-trap").append(imageData+":::::");
	  deletePhoto();
	  submitPhotoDets();
	  window.location.hash = "#previewPhotos";
	  $("#backBtn-Capture").attr("href","#submitPhotos");
	  $("#addFromGallery").attr("onclick","getPhoto(pictureSource.PHOTOLIBRARY);");
	  $("#addFromCamera").attr("onclick","capturePhoto();");
	  $("#addFromCamera").show();
	  $(".mediaType").html("photos(s)");
    }
	

    // A button will call this function
    function capturePhoto() {
      navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 80,
        destinationType: destinationType.DATA_URI });
    }

    // A button will call this function
    function getPhoto(source) {
      navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 80,
        destinationType: destinationType.DATA_URI,
        sourceType: source });
    }

    // Called if something bad happens.
    function onFail(message) {
      alert('Failed because: ' + message);
	  window.location.hash = "#submitPhotos";
    }

	
	
	
	
	
// =============================
// ======= Camera Videos =======
// =============================	
// =============================================================
// Run this function if the video has been selected from Gallery
// =============================================================
    function onVideoURISuccess(imageData) {
	  $("#addFromGallery").hide();
	  $("#addFromCamera").hide();
	  $("#textValVideo").show();
	  var newImg = '<div class="videoToUpload"><div class="videoToUploadDelete"></div><video width="100%" controls><source src="'+imageData+'" type="video/mp4"></video></div>';
	  $("#imgPlaceholder").append(newImg);
	  deleteVideos();
	  submitVideoDets(imageData);
	  setTimeout(function(){ window.location.hash = "#previewPhotos"; }, 400);
	  $("#backBtn-Capture").attr("href","#submitVideos");
	  $("#addFromGallery").attr("onclick","getVideo(pictureSource.PHOTOLIBRARY);");
	  $("#addFromCamera").attr("onclick","captureVideo();");
	  $("#addFromCamera").hide();
	  $(".mediaType").html("video(s)");
    }
	

// ================================================
// Run this function if the video has been captured
// ================================================
	function captureSuccess(mediaFiles) {
        var i, len;
        for (i = 0, len = mediaFiles.length; i < len; i += 1) {
            onVideoCapURISuccess(mediaFiles[i]);
        }
    }

	function onVideoCapURISuccess(imageData) {
	  $("#addFromGallery").hide();
	  $("#addFromCamera").hide();
	  $("#textValVideo").show();
	  var newImg = '<div class="videoToUpload"><div class="videoToUploadDelete" id="videoToUploadDelete"></div><video width="100%" controls><source src="'+imageData.fullPath+'" type="video/mp4"></video></div>';
	  $("#imgPlaceholder").append(newImg);
	  deleteVideos();
	  submitVideoDets(imageData.fullPath);
	  setTimeout(function(){ window.location.hash = "#previewPhotos"; }, 400);
	  $("#backBtn-Capture").attr("href","#submitVideos");
	  $("#addFromGallery").attr("onclick","getVideo(pictureSource.PHOTOLIBRARY);");
	  $("#addFromCamera").attr("onclick","captureVideo();");
	  $(".mediaType").html("video(s)");
    }
	
	
	
	
	function captureVideo() {
		navigator.device.capture.captureVideo(captureSuccess, onVidFail, {
			limit: 1, 
			duration: 30, 
			destinationType: destinationType.DATA_URI
			});
    }

	function getVideo(source) {
		navigator.camera.getPicture(onVideoURISuccess, onVidFail, { quality: 40,
        destinationType: destinationType.DATA_URI,
        sourceType: source,
		mediaType: navigator.camera.MediaType.VIDEO });
    }
	
	function onVidFail(message) {
      alert('Failed because: ' + message);
	  window.location.hash = "#submitVideos";
    }
