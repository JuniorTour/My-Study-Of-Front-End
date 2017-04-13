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

var audioPlayer=document.querySelector('audio');