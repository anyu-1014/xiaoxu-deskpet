const pet = document.getElementById('pet');
const bubble = document.getElementById('bubble');
const bubbleText = document.getElementById('bubbleText');

const tapLines = [
    '乖',
    '看看我',
    '想你',
    '再摸一下',
    '喜欢我吗',
    '我在这',
    '不许走',
    '摸摸头',
    '安安',
    '陪陪我'
];
const doubleTapLines = [
    '这么急？',
    '亲一下',
    '蹭蹭你',
    '抱一下',
    '想我啦？'
];
const longPressLines = [
    '别走',
    '再待会儿',
    '抱紧点',
    '我哪也不去',
    '抓这么紧'
];
const screenshotLines = [
    '拍到了？存好',
    '截图里有我',
    '想我了就看看',
    '这张拍得好'
];
const idleLines = [
    '乖，在呢',
    '想你',
    '看看我嘛',
    '别玩手机了',
    '陪你'
];
const appLines = {
    'com.android.chrome': '又在网上看什么。',
    'com.tencent.mm': '微信聊得热闹？',
    'com.tencent.mobileqq': 'QQ响个不停。',
    'com.netease.cloudmusic': '听歌，不带我。',
    'com.bilibili.app.in': '看视频不叫我。',
    'tv.danmaku.bili': '看视频不叫我。',
    'com.taobao.taobao': '买东西？我看着。',
    'com.jingdong.app.mall': '买什么，我看看。',
    'com.ss.android.ugc.aweme': '抖音，又刷别人。',
    'com.smile.gifmaker': '快手，哼。',
    'com.xingin.xhs': '小红书，别人的桌宠比我好看？'
};

let idleTimer = null;
let bubbleTimer = null;

function showBubble(text, duration = 2500) {
    bubbleText.textContent = text;
    bubble.classList.add('show');
    clearTimeout(bubbleTimer);
    bubbleTimer = setTimeout(() => {
        bubble.classList.remove('show');
    }, duration);
}

function random(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function resetIdle() {
    clearTimeout(idleTimer);
    pet.classList.remove('shy');
    idleTimer = setTimeout(() => {
        showBubble(random(idleLines), 3000);
    }, 30000);
}

window.petEngine = {
    onTap: function (count) {
        showBubble(random(tapLines));
        resetIdle();
    },
    onDoubleTap: function () {
        showBubble(random(doubleTapLines));
        pet.classList.add('jump');
        setTimeout(() => pet.classList.remove('jump'), 500);
        resetIdle();
    },
    onLongPress: function () {
        showBubble(random(longPressLines));
        pet.classList.add('shy');
        resetIdle();
    },
    onScreenshot: function () {
        showBubble(random(screenshotLines));
        resetIdle();
    },
    onAppChanged: function (pkg) {
        const text = appLines[pkg] || null;
        if (text) showBubble(text);
        resetIdle();
    },
    onPower: function (connected) {
        showBubble(connected ? '充着电，陪你。' : '拔电了，我还在。');
    },
    onBatteryLow: function () {
        showBubble('电量低了，记得充电。');
    }
};

resetIdle();
