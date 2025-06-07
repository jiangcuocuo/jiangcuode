// 宠物状态
const petState = {
    hunger: 80,
    happiness: 90,
    cleanliness: 70,
    energy: 60,
    isSleeping: false
};

// DOM 元素
const pet = document.getElementById('pet');
const petMouth = document.getElementById('pet-mouth');
const messageBox = document.getElementById('message-box');
const bubble = document.getElementById('bubble');
const notification = document.getElementById('notification');

// 状态条元素
const hungerBar = document.getElementById('hunger-bar');
const happinessBar = document.getElementById('happiness-bar');
const cleanlinessBar = document.getElementById('cleanliness-bar');
const energyBar = document.getElementById('energy-bar');

// 状态值元素
const hungerValue = document.getElementById('hunger-value');
const happinessValue = document.getElementById('happiness-value');
const cleanlinessValue = document.getElementById('cleanliness-value');
const energyValue = document.getElementById('energy-value');

// 按钮元素
const feedBtn = document.getElementById('feed-btn');
const playBtn = document.getElementById('play-btn');
const cleanBtn = document.getElementById('clean-btn');
const sleepBtn = document.getElementById('sleep-btn');

// 更新状态显示
function updateStatsDisplay() {
    hungerBar.style.width = petState.hunger + '%';
    happinessBar.style.width = petState.happiness + '%';
    cleanlinessBar.style.width = petState.cleanliness + '%';
    energyBar.style.width = petState.energy + '%';
    
    hungerValue.textContent = petState.hunger + '%';
    happinessValue.textContent = petState.happiness + '%';
    cleanlinessValue.textContent = petState.cleanliness + '%';
    energyValue.textContent = petState.energy + '%';
    
    // 根据心情更新嘴巴形状
    if (petState.happiness > 70) {
        petMouth.className = 'pet-mouth happy';
    } else if (petState.hunger > 70) {
        petMouth.className = 'pet-mouth';
    } else {
        petMouth.className = 'pet-mouth';
    }
}

// 显示消息
function showMessage(message) {
    messageBox.textContent = message;
}

// 显示气泡消息
function showBubble(message) {
    bubble.textContent = message;
    bubble.classList.add('show');
    setTimeout(() => {
        bubble.classList.remove('show');
    }, 3000);
}

// 显示通知
function showNotification(message) {
    notification.textContent = message;
    notification.classList.add('show');
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// 喂食
function feed() {
    if (petState.isSleeping) {
        showMessage('Zzz... 宠物正在睡觉呢');
        return;
    }
    
    petState.hunger = Math.max(0, petState.hunger - 20);
    petState.happiness = Math.min(100, petState.happiness + 5);
    petState.cleanliness = Math.max(0, petState.cleanliness - 10);
    
    updateStatsDisplay();
    showMessage('好吃！谢谢主人！');
    showBubble('真美味！');
    
    // 添加吃东西动画
    pet.classList.add('eat');
    petMouth.classList.add('eating');
    setTimeout(() => {
        pet.classList.remove('eat');
        petMouth.classList.remove('eating');
    }, 500);
}

// 玩耍
function play() {
    if (petState.isSleeping) {
        showMessage('Zzz... 宠物正在睡觉呢');
        return;
    }
    
    if (petState.energy < 20) {
        showMessage('我太累了，玩不动了...');
        showNotification('宠物需要休息！');
        return;
    }
    
    petState.happiness = Math.min(100, petState.happiness + 15);
    petState.energy = Math.max(0, petState.energy - 15);
    petState.hunger = Math.min(100, petState.hunger + 10);
    
    updateStatsDisplay();
    showMessage('太好玩了！再来一次！');
    showBubble('耶！玩游戏！');
    
    // 添加弹跳动画
    pet.classList.add('bounce');
    setTimeout(() => {
        pet.classList.remove('bounce');
    }, 1000);
}

// 清洁
function clean() {
    if (petState.isSleeping) {
        showMessage('Zzz... 宠物正在睡觉呢');
        return;
    }
    
    petState.cleanliness = Math.min(100, petState.cleanliness + 25);
    petState.happiness = Math.min(100, petState.happiness + 10);
    
    updateStatsDisplay();
    showMessage('好舒服！谢谢主人帮我洗澡！');
    showBubble('干净清爽！');
    
    // 添加清洁动画效果
    const petBody = document.querySelector('.pet-body');
    petBody.style.backgroundColor = '#4ecdc4';
    setTimeout(() => {
        petBody.style.backgroundColor = '#4ecdc4';
    }, 1000);
}

// 睡觉
function sleep() {
    if (petState.isSleeping) {
        // 唤醒宠物
        petState.isSleeping = false;
        petState.energy = Math.min(100, petState.energy + 40);
        petState.hunger = Math.min(100, petState.hunger + 15);
        
        updateStatsDisplay();
        showMessage('我睡醒啦！精神满满！');
        pet.classList.remove('sleep');
        
        sleepBtn.innerHTML = '<i class="fas fa-bed"></i><span>睡觉</span>';
    } else {
        // 让宠物睡觉
        petState.isSleeping = true;
        showMessage('Zzz... 宠物正在睡觉');
        pet.classList.add('sleep');
        
        sleepBtn.innerHTML = '<i class="fas fa-sun"></i><span>唤醒</span>';
    }
}

// 随时间变化的状态
function updateStateOverTime() {
    if (!petState.isSleeping) {
    // 宠物醒着时的状态变化
        petState.hunger = Math.min(100, petState.hunger + 2);
        petState.happiness = Math.max(0, petState.happiness - 1);
        petState.cleanliness = Math.max(0, petState.cleanliness - 1);
        petState.energy = Math.max(0, petState.energy - 1);
    } else {
        // 宠物睡觉时的状态变化
        petState.energy = Math.min(100, petState.energy + 3);
    }
    
    // 低状态警告
    if (petState.hunger > 80 && !petState.isSleeping) {
        showBubble('我好饿啊！');
    } else if (petState.happiness < 30 && !petState.isSleeping) {
        showBubble('陪我玩嘛...');
    } else if (petState.cleanliness < 30 && !petState.isSleeping) {
        showBubble('我需要洗澡！');
    } else if (petState.energy < 20 && !petState.isSleeping) {
        showNotification('宠物需要休息！');
        showBubble('我累啦...');
    }
    
    updateStatsDisplay();
}

// 初始化
function init() {
    updateStatsDisplay();
    showMessage('欢迎照顾你的电子宠物！点击按钮与它互动吧！');
    
    // 添加事件监听
    feedBtn.addEventListener('click', feed);
    playBtn.addEventListener('click', play);
    cleanBtn.addEventListener('click', clean);
    sleepBtn.addEventListener('click', sleep);
    
    // 每10秒更新一次状态
    setInterval(updateStateOverTime, 10000);
    
    // 随机显示宠物气泡消息
    setInterval(() => {
        if (!petState.isSleeping && Math.random() > 0.7) {
            const messages = [
                '主人今天真好看！',
                '陪我玩嘛~',
                '今天过得怎么样？',
                '我喜欢你！',
                '摸摸我！'
            ];
            showBubble(messages[Math.floor(Math.random() * messages.length)]);
        }
    }, 15000);
}

// 页面加载完成后初始化
window.addEventListener('DOMContentLoaded', init);