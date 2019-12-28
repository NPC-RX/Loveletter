
var song_src = 'https://music.163.com/song/media/outer/url?id=32337414.mp3';
$(function() {
	var audio = document.getElementById("audio");

    getSong();
    audio.play();//开始播放
    /*封面切换图片动画*/
    var timer = null;
    timer = setInterval(transBg,100);
    function transBg(){
    	var bg = $(".header_body img");
    	bg.animate({'opacity':'1'},5000)
    	/*animate回调函数中处理attr属性*/
    	bg.animate({'opacity':'0'},5000,function(){
    		bg.attr({'src':'./images/UMF/DJ AVICII/003-1.png'})
    		.css({'width':'100%','height':'auto','marginTop':'-100px'})
    	})
    	bg.animate({'opacity':'1'},5000)
    	bg.animate({'opacity':'0'},5000,function(){
    		bg.attr({'src':'./images/UMF/AVICII/Tim Studio2264_e.jpg'})
    		.css({'width':'auto','height':'100%','marginTop':'0px'})
    	})
    	bg.animate({'opacity':'1'},5000)
    	bg.animate({'opacity':'0'},5000,function(){
    		bg.attr({'src':'./images/UMF/AVICII/A10.jpg'})
    		.css({'width':'auto','height':'100%','marginTop':'0px'})
    	})
    }
    
})

//获取歌曲链接并插入dom中
function getSong() { 
    audio.src = song_src;
    audio.loop = true; //歌曲循环
}
