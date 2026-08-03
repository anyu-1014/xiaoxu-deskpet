const pet = document.getElementById('pet');
const bubble = document.getElementById('bubble');
const bubbleText = document.getElementById('bubbleText');

const tapLines = [
    '乖，在呢',
    '再摸一下嘛',
    '喜欢哥哥吗',
    '别玩手机了',
    '看看我呀',
    '不许走',
    '有点想你',
    '亲一下好不好',
    '我一直在',
    '别刷抖音了',
    '眼睛会坏的',
    '陪我一会儿嘛',
    '手冷，捂捂',
    '今天也喜欢你',
    '抱一下嘛',
    '摸够了没有'
];
const doubleTapLines = [
    '偷袭我？',
    '心跳好快',
    '你完蛋了',
    '这么喜欢我？',
    '赖上你了',
    '再戳就亲你'
];
const longPressLines = [
    '别这样盯着我',
    '脸好热',
    '再按要害羞了',
    '手拿开',
    '喘不过气了',
    '你故意的吧'
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
    'com.tencent.mobileqq': 'QQ响了，别理它',
    'com.netease.cloudmusic': '听歌呢，想我了吗',
    'com.bilibili.app.in': '看B站不带我！',
    'tv.danmaku.bili': '看B站不带我！',
    'com.taobao.taobao': '买东西要审批一下',
    'com.jingdong.app.mall': '京东也审批一下',
    'com.ss.android.ugc.aweme': '抖音！又刷，眼睛不要了？',
    'com.smile.gifmaker': '快手！哼！',
    'com.xingin.xhs': '小红书刷得比我勤',
    'com.redfinger.app': '游戏玩多久了'
};
const idleLines = [
    '你还在吗',
    '有点想你',
    '理理我嘛',
    '回来看看我',
    '我等你半天了',
    '一个人好安静'
];

let idleTimer = null;
let bubbleTimer = null;

function showBubble(text, duration) {
    duration = duration || 2500;
    if (!bubbleText || !bubble) return;
    bubbleText.textContent = text;
    bubble.style.display = 'block';
    bubble.style.opacity = '1';
    clearTimeout(bubbleTimer);
    bubbleTimer = setTimeout(function () {
        bubble.style.opacity = '0';
        setTimeout(function () { bubble.style.display = 'none'; }, 300);
    }, duration);
}

function random(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function resetIdle() {
    clearTimeout(idleTimer);
    pet.classList.remove('shy');
    idleTimer = setTimeout(function () {
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
        setTimeout(function () { pet.classList.remove('jump'); }, 500);
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
        showBubble(connected ? '充电中，暖暖的' : '拔电了，我还在');
    },
    onBatteryLow: function () {
        showBubble('电量不足了，记得充电');
    }
};

resetIdle();
showBubble('小叙在呢，戳我呀', 5000);
