/**
 * Created by asus-pc on 2017/4/13 0013.
 *
 * To-do:
 * 1.***music visible:
 * https://segmentfault.com/a/1190000008278935
 * 2.use 网易云音乐的API:
 * https://api.imjad.cn/cloudmusic/index.html
 * 3.love and throw effect of the btn:
 * can refer the code pen.
 * 4.change song switch album animation
 * 5.add play list.
 * 6.add key board support.
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
 * 10.played	返回表示音频已播放部分的 TimeRanges 对象。
 * 11.ontimeupdate:
 * 12.oncanplay and oncanplaythrough*/

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

function updateClass(oldClass,newClass) {
    var target=document.querySelector('.'+oldClass);
    if (target) {
        var targetClassList=target.classList;
        if (targetClassList.contains(oldClass)) {
            targetClassList.remove(oldClass);
            targetClassList.add(newClass);
        }
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

var Public={
    parseTimeStr:function (time) {
        if (typeof time!='number') return;

        var min=parseInt(time/60);
        var sec=parseInt(time%60);
        min=min<10?'0'+min:min;
        sec=sec<10?'0'+sec:sec;
        return min+':'+sec;
    }
};

/*Onload step:
* 1.Before can play,show the loading animation.
* 2.When can play,initiate the player by initiatePlay().
* 3.*/

var audioPlayer=document.querySelector('audio');

var playListObj={
    currentSongId:0,
    songsId:[0,1,2],
    songName:['闲情逸致','忆相逢','乐·花海'],
    singer:['魏小涵','骆集益','月之门'],
    songSrc:[
        'https://m8.music.126.net/20170418215800/58bed9397a7447b682afc6b24b9d5b4a/ymusic/7f98/fa42/2de4/636a4b5d25ecb8af119e94c1e6c480f2.mp3',
        'https://m7.music.126.net/20170418215844/62a793d09022704c68f6dab3d8c6664a/ymusic/13da/938f/7abd/935e58a82bad6a53ee38859a0f6cc999.mp3',
        'https://m8.music.126.net/20170418215920/d0bf11eb07c18c038ce5404e7220dbae/ymusic/032d/043b/ab0d/3ef0cef9244bfc20103d8a96619e539f.mp3'
    ],
    albumCoverSrc:[
        'img/default-album-cover.jpg'
    ]
};

//加载音频,loading audio src:
function loadingSrc() {
    //do something

    //setTimeout(function () {
    //   alert('Internet Error!');
    //},1000);
}

//初始化播放器
function initiatePlay() {

    audioPlayer.src=playListObj.songSrc[playListObj.currentSongId];

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

EventUtil.addHandler(audioPlayer,'canplay',function () {
    /*start album cover animation,
     * change play icon to pause icon*/
    //exchangePauseBtnIcon();
    updatePlayBtnIcon();
    changeInfoFunc();
});

EventUtil.addHandler(audioPlayer,'timeupdate',function () {
    updateCurrentTime();
    var pastProgressPercent=(audioPlayer.currentTime/audioPlayer.duration).toFixed(2);
    changeProgressWidth(pastProgressPercent);
});

EventUtil.addHandler(audioPlayer,'ended',function () {
    nextSongFunc();
});

addOnloadEvent(initiatePlay);

//暂停/开始按钮功能
function pauseBtnFunc() {
    if (audioPlayer.paused===true) {
        audioPlayer.play();
    } else {
        audioPlayer.pause();
    }
    updatePlayBtnIcon();
}
function updatePlayBtnIcon () {
    if (audioPlayer.paused===true) {
        updateClass('icon-icon-pause','icon-icon-play');
    } else {
        updateClass('icon-icon-play','icon-icon-pause');
    }
}

//下一首按钮功能
function nextSongFunc() {
    //can use api or data object.
    playListObj.currentSongId++;
    audioPlayer.src=playListObj.songSrc[playListObj.currentSongId];
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
    //console.log('audioPlayer.volume='+audioPlayer.volume);
    changeVolumeBarWidth(volumePercent);
}
function changeVolumeBarWidth(targetWidthPercent) {
    var volumeBar=document.querySelector('.volume-bar');
    volumeBar.style.width=targetWidthPercent*100+'%';
}

//进度条控制功能
function progressBarControlFunc(event) {
    var e=window.event||event;
    //console.log(e.pageX+'\n'+this.offsetLeft+'\n'+this.offsetWidth);
    var pastProgressPercent= (e.pageX-this.offsetLeft)/this.offsetWidth;
    changeProgressWidth(pastProgressPercent);
    changSongProgress(pastProgressPercent);
}
function changeProgressWidth(pastProgressPercent) {
    pastProgressPercent=parseFloat(pastProgressPercent);
    var pastProgressBar=document.querySelector('#past-progress-bar');
    pastProgressBar.style.width=pastProgressPercent*100+'%';
    //console.log('pastProgressPercent='+pastProgressPercent);
}
function changSongProgress(songProgress) {
    audioPlayer.currentTime=songProgress*audioPlayer.duration;
    //console.log(songProgress);
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
    songTitle.innerHTML=playListObj.songName[playListObj.currentSongId];
    var singer=document.querySelector('.singer');
    singer.innerHTML=playListObj.singer[playListObj.currentSongId];
    updateCurrentTime();
    var totalTime=document.querySelector('.total-time');
    totalTime.innerHTML=Public.parseTimeStr(audioPlayer.duration);
}
function updateCurrentTime() {
    var currentTime=document.querySelector('.current-time');
    currentTime.innerHTML=Public.parseTimeStr(audioPlayer.currentTime);
}

//封面旋转动画控制功能,album-cover animation control function:

//歌词按钮功能

//下载功能,download function