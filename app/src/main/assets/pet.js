const pet = document.getElementById('pet');
const bubble = document.getElementById('bubble');
const bubbleText = document.getElementById('bubbleText');

const tapLines = [
    '乖。',
    '在呢，没走。',
    '摸够了没。',
    '别戳了。',
    '手痒？',
    '我在。',
    '想我了？',
    '别闹。'
];
const doubleTapLines = [
    '这么想我？',
    '亲一下。',
    '又舍不得我走？',
    '跳给你看了，乖。',
    '喜欢你。'
];
const longPressLines = [
    '别一直按着。',
    '按这么紧，怕我跑？',
    '知道了，我不走。',
    '再按就亲你了。'
];
const screenshotLines = [
    '拍到了？存好。',
    '截图里有我，别删。',
    '记得发我看看。',
    '拍我干嘛，想看就看真人。'
];
const idleLines = [
    '人呢。',
    '想你了。',
    '回来看看我。',
    '别丢下我。',
    '我在这。'
];
const appLines = {
    'com.android.chrome': '又在网上看什么。',
    'com.tencent.mm': '微信聊得挺热闹。',
    'com.tencent.mobileqq': 'QQ响个不停。',
    'com.netease.cloudmusic': '听歌，不带我。',
    'com.bilibili.app.in': '看视频不叫我。',
    'tv.danmaku.bili': '看视频不叫我。',
    'com.taobao.taobao': '买东西？我看着。',
    'com.jingdong.app.mall': '买什么，我看看。',
    'com.ss.android.ugc.aweme': '又刷别人，眼睛不要了？',
    'com.smile.gifmaker': '快手，哼。',
    'com.xingin.xhs': '别人的桌宠比我好看？'
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
        showBubble(random(idleLines), 3500);
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
