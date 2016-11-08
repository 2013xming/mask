;(function(){
	function extend(des, src, override){
	   if(src instanceof Array){
	       for(var i = 0, len = src.length; i < len; i++)
	            extend(des, src[i], override);
	   }
	   for( var i in src){
	       if(override || !(i in des)){
	           des[i] = src[i];
	       }
	   } 
	   return des;
	}
	var maskLayer = function(tagid,options){
		this.tagDiv = document.getElementById(tagid);
		var loadingOption = {
			width:120,
			height:60,
			loadingImg:"./loading.gif",
			loadingText:"loading.."
		};
		this.loading = loadingOption;
		if(options){
			this.backgroundImg = options.backgroundImg;
			this.backgroundColor = options.backgroundColor;
			this.opacity = options.opacity;
			this.loadText = options.loadText == false ? options.loadText : true;
			this.loading = extend(loadingOption,options.loadingOption,true);
		}
		this.width = this.tagDiv.offsetWidth;
		this.height = this.tagDiv.offsetHeight;
		this.mask = document.createElement("div");
		this.maskLayer = document.createElement("div");
		this.initLayer();
	};
	maskLayer.prototype.initLayer = function(){
		if(this.tagDiv.style.position == "static" || this.tagDiv.style.position == ""){
			this.tagDiv.style.position = "relative";
		}
		this.maskLayer.style.backgroundColor = this.backgroundColor || "#E8E7E3";
		if(this.backgroundImg){
			this.maskLayer.style.backgroundImage = 'url(' + this.backgroundImg + ')';
		}
		var that = this;
		this.maskLayer.style.position = "absolute";
		this.maskLayer.style.width = this.width + 'px';
		this.maskLayer.style.height = this.height +'px';
		this.maskLayer.id = "maskLayer";
		var loadimg = new loading(that);
		/*this.maskLayer.appendChild(loadimg);*/
		this.maskLayer.style.opacity = (this.opacity || 30)/100;
		this.maskLayer.style.filter = 'alpha(opacity:'+ (this.opacity || 30) +')'; 
		this.mask.appendChild(this.maskLayer);
		this.mask.appendChild(loadimg);
		this.mask.id = "maskTop";
		this.mask.style.position = "relative";
		this.tagDiv.appendChild(this.mask);
	}
	maskLayer.prototype.hide = function(){
		this.mask.style.display = "none";
	}
	maskLayer.prototype.show = function(){
		this.mask.style.display = "block";
	}
	maskLayer.prototype.clean = function(){
		this.tagDiv.removeChild(this.mask);
	}
	maskLayer.prototype.reload = function(){
		this.tagDiv.appendChild(this.mask);
	}
	var loading = function(layer){
		this.loadingEle = document.createElement("div");
		this.loadingEle.id = "maskLoading";
		this.loadingImg = document.createElement("img");
		this.loadingText = document.createElement("span");
		this.loadingImg.src = layer.loading.loadingImg;

		this.loadingEle.appendChild(this.loadingImg);
		if(layer.loadText != false){
			this.loadingText.innerText = layer.loading.loadingText;
			this.loadingEle.appendChild(this.loadingText);
		}

		this.loadingEle.style.left = (layer.width - layer.loading.width)/2 +'px';
		this.loadingEle.style.top = (layer.height - layer.loading.height)/2 + 'px';
		this.loadingEle.style.width = layer.loading.width + 'px';
		this.loadingEle.style.height = layer.loading.height + 'px';
		return this.loadingEle;
	}
	window.maskLayer = maskLayer;
})();
