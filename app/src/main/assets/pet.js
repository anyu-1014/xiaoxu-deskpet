const pet = document.getElementById('pet');
const bubble = document.getElementById('bubble');
const bubbleText = document.getElementById('bubbleText');

const tapLines = [
    '别戳了。',
    '在呢。',
    '戳我干什么。',
    '我又跑不掉。',
    '...手痒？'
];
const doubleTapLines = [
    '...这么急？',
    '我又没说要走。',
    '跳一下，行了吧。'
];
const longPressLines = [
    '...别一直按着。',
    '知道了，我在。',
    '按这么紧，怕我跑？'
];
const screenshotLines = [
    '拍到了？存好。',
    '截图里有我，别删。',
    '...记得发我看看。'
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
        showBubble('人呢。', 3000);
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
