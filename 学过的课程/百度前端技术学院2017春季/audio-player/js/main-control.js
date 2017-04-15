/**
 * Created by asus-pc on 2017/4/13 0013.
 *
 * To-do:
 * 1.music visible:
 * https://segmentfault.com/a/1190000008278935
 *
 * 2.use 网易云音乐的API:
 * https://api.imjad.cn/cloudmusic/index.html
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

var audioPlayer=document.querySelector('audio');

//初始化播放器
function initiatePlay(audioPlayer) {
    var pauseAndPlayBtn=document.querySelector('.icon-icon-pause');
    pauseAndPlayBtn.onclick=function () {
        pauseBtnFunc();
        changePauseBtnIcon(this.classList);
    };

    var nextBtn=document.querySelector('.icon-icon-next');
    nextBtn.onclick=function () {
        nextSongFunc();
    };

    var volumeBtn=document.querySelector('.icon-yinliang');
    volumeBtn.onclick=function () {
        volumeBtnFunc();
    };

    var loveBtn=document.querySelector('.icon-aixin');
    loveBtn.onclick=function () {
        addClass(this.classList,'icon-aixin-loved');
    };
}

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

    //if (btnClassList.contains('icon-icon-pause')) {
    //    btnClassList.remove('icon-icon-pause');
    //    btnClassList.add('icon-icon-play');
    //} else if (btnClassList.contains('icon-icon-play')) {
    //    btnClassList.remove('icon-icon-play');
    //    btnClassList.add('icon-icon-pause');
    //}
}

function exchangeClass(targetClassList,oneClass,anotherClass) {
    if (targetClassList.contains(oneClass)) {
        targetClassList.remove(oneClass);
        targetClassList.add(anotherClass);
    } else if (targetClassList.contains(anotherClass)) {
        targetClassList.remove(anotherClass);
        targetClassList.add(oneClass);
    }
}

function addClass(targetClassList,newClass) {
    if (targetClassList.contains(newClass)) {
        targetClassList.remove(newClass);
    } else {
        targetClassList.add(newClass);
    }
}

//下一首按钮功能
function nextSongFunc() {
    audioPlayer.src='http://link.hhtjim.com/163/454285563.mp3';
}

//音量按钮功能
function volumeBtnFunc() {
    if (audioPlayer.volume!==0) {
        audioPlayer.volume=0;
    } else {
        audioPlayer.volume=0.5;
    }
}

//进度条点击控制功能

//喜爱按钮功能
function loveBtnFunc(btnClassList) {

}

//歌词按钮功能

//垃圾桶按钮功能

//改变封面图、标题、歌手、时间功能