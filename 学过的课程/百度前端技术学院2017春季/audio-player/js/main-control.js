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
    },
    getEvent: function (event) {
        return event?event:window.event;
    },
    getTarget:function (event) {
        return event.target||event.srcElement;
    }
};

function exchangeClass(oneClass,anotherClass) {
    var target=document.querySelector('.'+oneClass)||document.querySelector('.'+anotherClass);
    var targetClassList=target.classList;
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

var playListObj={
    songsId:[0,1,2],
    songName:['乐·花海','挂红灯','沉醉东风'],
    singer:['月之门','俞逊发','天涯明月刀'],
    songSrc:[
        'audio/eg-1.mp3',
        'audio/eg-2.mp3',
        'audio/eg-3.mp3'
    ]
};
audioPlayer.currentPlayId=2;

//初始化播放器
function initiatePlay() {

    audioPlayer.src=playListObj.songSrc[audioPlayer.currentPlayId];

    //Event delegate optimize:
    var controlPanel=document.querySelector('.control-panel');
    EventUtil.addHandler(controlPanel,'click',function (event) {
        var targetId=EventUtil.getTarget(event).id;
        var targetClassList=EventUtil.getTarget(event).classList;

        switch (targetId) {
            case 'icon-play-and-pause' :
                pauseBtnFunc();
                break;
            case 'icon-next':
                nextSongFunc();
                break;
            case 'icon-yinliang':
                volumeBtnFunc();
                break;
            case 'icon-aixin':
                loveBtnFunc(targetClassList);
                break;
            case 'icon-laji2':
                garbageBinBtnFunc();
                break;
            /*progress bar not suitable.*/
            //case 'progress-bar':
            //    progressBarControlFunc();
            //    break;
        }
    });

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

    var progressBar=document.querySelector('#progress-bar');
    EventUtil.addHandler(progressBar,'click',progressBarControlFunc);

    var volumeBarWrapper=document.querySelector('.volume-bar-wrapper');
    EventUtil.addHandler(volumeBarWrapper,'click',volumeBarControlFunc);

}

audioPlayer.oncanplay=function() {
    /*start album cover animation,
    * change play icon to pause icon*/
    changePauseBtnIcon();
};

addOnloadEvent(initiatePlay);

//暂停/开始按钮功能
function pauseBtnFunc() {
    if (audioPlayer.paused===true) {
        audioPlayer.play();
    } else {
        audioPlayer.pause();
    }
    changePauseBtnIcon();
}
function changePauseBtnIcon() {
    exchangeClass('icon-icon-pause','icon-icon-play');
}

//下一首按钮功能
function nextSongFunc() {
    //can use api or data object.
    audioPlayer.src='audio/eg-2.mp3';
    //http://link.hhtjim.com/163/454285563.mp3
    audioPlayer.currentPlayId=1;
    changeInfoFunc();
    pauseBtnFunc();
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
    var pastProgressBar=document.querySelector('#past-progress-bar');
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

//垃圾桶按钮功能,garbage bin btn function
function garbageBinBtnFunc () {
    //do something...
    nextSongFunc();
}

//改变封面图、标题、歌手、时间功能
function changeInfoFunc() {
    var songTitle=document.querySelector('.song-title');
    songTitle.innerHTML=playListObj.songName[audioPlayer.currentPlayId];
}

//封面旋转动画控制功能,album-cover animation control function:

//歌词按钮功能

//下载功能,download function