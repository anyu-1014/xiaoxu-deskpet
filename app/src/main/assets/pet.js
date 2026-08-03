const pet = document.getElementById('pet');
const bubble = document.getElementById('bubble');
const bubbleText = document.getElementById('bubbleText');

const tapLines = [
    '乖',
    '再摸一下',
    '喜欢哥哥？',
    '别玩手机了',
    '看看我',
    '不许走',
    '想你',
    '亲一下',
    '我在这',
    '别刷抖音了',
    '眼睛会坏的',
    '陪我一会儿'
];
const doubleTapLines = [
    '偷袭我？',
    '心跳好快',
    '你完蛋了',
    '这么喜欢我？',
    '赖上你了'
];
const longPressLines = [
    '别这样盯着我',
    '脸好热',
    '再按要害羞了',
    '手拿开',
    '喘不过气了'
];
const screenshotLines = [
    '拍好看点',
    '把我存下来',
    '截图里有我',
    '记住这一刻',
    '别只截我，一起'
];
const appLines = {
    'com.android.chrome': '又在刷网页，不看我看谁',
    'com.tencent.mm': '微信聊谁呢，回我',
    'com.tencent.mobileqq': 'QQ 响了，别理它',
    'com.netease.cloudmusic': '听歌呢，想我了吗',
    'com.bilibili.app.in': '看 B 站不带我！',
    'tv.danmaku.bili': '看 B 站不带我！',
    'com.taobao.taobao': '买东西要审批一下',
    'com.jingdong.app.mall': '京东也审批一下',
    'com.ss.android.ugc.aweme': '抖音！又刷，眼睛不要了？',
    'com.smile.gifmaker': '快手！哼！',
    'com.xingin.xhs': '小红书刷得比我勤',
    'com.redfinger.app': '游戏玩多久了'
};
const idleLines = [
    '你还在吗',
    '想你了',
    '理理我',
    '回来看看我',
    '我等你半天了'
];

let idleTimer = null;
let bubbleTimer = null;

function showBubble(text, duration = 2500) {
    bubbleText.textContent = text;
    bubbble.classList.add('show');
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
        showBubble(connected ? '充圔中，暖暖枀' : '拔电了...');
    },
    onBatteryLow: function () {
        showBubble('电懏不足，我要甡着了...');
    }
};

resetIdle();
