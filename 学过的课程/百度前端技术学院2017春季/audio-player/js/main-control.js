/**
 * Created by asus-pc on 2017/4/13 0013.
 *
 * To-do:
 * 1.music visible:
 * https://segmentfault.com/a/1190000008278935
 *
 * 2.use 网易云音乐的API:
 * https://api.imjad.cn/cloudmusic/index.html
 *
 * 3.love and throw effect of the btn:
 * can refer the code pen.
 *
 * 4.change song switch album animation
 */

/*The useful properties of audio:
 * 1.play()
 * 2.pause()
 * 3.volume:range from [0,1]
 * 4.load()	重新加载音频/视频元素
 * 5.currentTime	设置或返回音频中的当前播放位置（以秒计）。
 * 6.duration	返回音频的长度（以秒计）。
 * 7.ended	返回音频的播放是否已结束。
 * 8.muted	[true | false] 设置或返回是否关闭声音。
 * 9.paused	设置或返回音频是否暂停。
 * 10.played	返回表示音频已播放部分的 TimeRanges 对象。*/

/*Some thinking:
* 1.progress bar:the width of it is :(currentTime/duration)*100.
* 2.current time minute:currentTime%603.
* 3.click volume btn mute the music:muted='true';
* 4.transition needed.
* 5.click the progress bar to control progress:
*       use the e.pageX
* 6.volume control:same as 5.progress control*/

function addOnloadEvent(func) {
    var oldOnload=window.onload;
    if (typeof oldOnload!='function') {
        window.onload=func;
    } else {
        window.onload=function () {
            oldOnload();
            func();
        }
    }
}

var EventUtil={
    addHandler:function (el,type,handler) {
        if (el.addEventListener) {
            el.addEventListener(type,handler,false);
        } else if (el.attachEvent) {
            el.attachEvent('on'+type,handler);
        } else {
            el['on'+type]=handler;
        }
    },
    removeHandler: function(el,type,handler) {
        if (el.removeEventListener) {
            el.removeEventListener(type,handler);
        } else if (el.detachEvent) {
            el.detachEvent(type,handler);
        } else {
            el['on'+type]=null;
        }
    }
};

function exchangeClass(targetClassList,oneClass,anotherClass) {
    if (targetClassList.contains(oneClass)) {
        targetClassList.remove(oneClass);
        targetClassList.add(anotherClass);
    } else if (targetClassList.contains(anotherClass)) {
        targetClassList.remove(anotherClass);
        targetClassList.add(oneClass);
    }
}

function switchClass(targetClassList,newClass) {
    if (targetClassList.contains(newClass)) {
        targetClassList.remove(newClass);
    } else {
        targetClassList.add(newClass);
    }
}

function getSummaryOffsetLeft(el) {
    var offsetLeft=el.offsetLeft;
    while (el.offsetParent) {
        el=el.offsetParent;
        offsetLeft+=el.offsetLeft;
    }
    return offsetLeft;
}

var audioPlayer=document.querySelector('audio');

//初始化播放器
function initiatePlay() {
    var pauseAndPlayBtn=document.querySelector('.icon-icon-pause');
    EventUtil.addHandler(pauseAndPlayBtn,'click',
        function () {
            pauseBtnFunc();
            changePauseBtnIcon(this.classList);
        }
    );

    var nextBtn=document.querySelector('.icon-icon-next');
    EventUtil.addHandler(nextBtn,'click',
        function () {
            nextSongFunc();
        }
    );

    var volumeBtn=document.querySelector('.icon-yinliang');
    EventUtil.addHandler(volumeBtn,'click',
        function () {
            volumeBtnFunc();
        }
    );
    var volumeWrapper=document.querySelector('.volume-btn');
    EventUtil.addHandler(volumeWrapper,'mouseover',
        function () {
            var volumeBar=document.querySelector('.volume-bar-wrapper');
            switchClass(volumeBar.classList,'showed-volume-bar');
        }
    );
    EventUtil.addHandler(volumeWrapper,'mouseout',
        function () {
            var volumeBar=document.querySelector('.volume-bar-wrapper');
            switchClass(volumeBar.classList,'showed-volume-bar');
        }
    );

    var loveBtn=document.querySelector('.icon-aixin');
    EventUtil.addHandler(loveBtn,'click',
        function () {
            loveBtnFunc(this.classList);
        }
    );

    var garbageBtn=document.querySelector('.icon-laji2');
    EventUtil.addHandler(garbageBtn,'click',
        function () {
            garbageBinBtnFunc();
        }
    );


    var progressBar=document.querySelector('.progress-bar');
    EventUtil.addHandler(progressBar,'click',progressBarControlFunc);

}


var volumeBarWrapper=document.querySelector('.volume-bar-wrapper');
EventUtil.addHandler(volumeBarWrapper,'click',volumeBarControlFunc);

addOnloadEvent(initiatePlay);

//暂停/开始按钮功能
function pauseBtnFunc() {
    if (audioPlayer.paused===true) {
        audioPlayer.play();
    } else {
        audioPlayer.pause();
    }
}
function changePauseBtnIcon(btnClassList) {
    exchangeClass(btnClassList,'icon-icon-pause','icon-icon-play');
}

//下一首按钮功能
function nextSongFunc() {
    //can use api or data object.
    audioPlayer.src='http://link.hhtjim.com/163/454285563.mp3';
}

//音量按钮功能
function volumeBtnFunc() {
    if (audioPlayer.volume!==0) {
        audioPlayer.volume=0;
        changeVolumeBarWidth(0);
    } else {
        audioPlayer.volume=0.5;
        changeVolumeBarWidth(0.5);
    }
}

//音量条控制功能,volume bar control function:
function volumeBarControlFunc(event) {
    var e=window.event||event;
    //console.log(e.pageX+'\n'+this.offsetLeft+'\n'+this.offsetWidth);
    var volumePercent=(e.pageX-getSummaryOffsetLeft(this))/this.offsetWidth;
    audioPlayer.volume=volumePercent;
    console.log('audioPlayer.volume='+audioPlayer.volume);
    changeVolumeBarWidth(volumePercent);
}
function changeVolumeBarWidth(targetWidthPercent) {
    var volumeBar=document.querySelector('.volume-bar');
    volumeBar.style.width=targetWidthPercent*100+'%';
}

//进度条点击控制功能
function progressBarControlFunc(event) {
    var e=window.event||event;
    //console.log(e.pageX+'\n'+e.clientX);
    console.log(e.pageX+'\n'+this.offsetLeft+'\n'+this.offsetWidth);
    var pastProgressPercent= (e.pageX-this.offsetLeft)/this.offsetWidth;
    changeProgressWidth(pastProgressPercent);
    changSongProgress(pastProgressPercent);
}

function changeProgressWidth(pastProgressPercent) {
    var pastProgressBar=document.querySelector('.past-progress-bar');
    pastProgressBar.style.width=pastProgressPercent*100+'%';
    console.log('pastProgressPercent='+pastProgressPercent);
}

function changSongProgress(songProgress) {
    audioPlayer.currentTime=songProgress*audioPlayer.duration;
    console.log(songProgress);
}

//喜爱按钮功能
function loveBtnFunc(btnClassList) {
    switchClass(btnClassList,'icon-aixin-loved');
    //do something...
}

//歌词按钮功能

//垃圾桶按钮功能,garbage bin btn function
function garbageBinBtnFunc () {
    //do something...
    nextSongFunc();
}

//下载功能,download function

//改变封面图、标题、歌手、时间功能

//封面旋转动画控制功能,album-cover animation control function: