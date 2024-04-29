window.onload = function () {
    const viewEl = document.querySelector('.view');
    const listEl = document.querySelector('.list');
    const items = document.querySelectorAll('.item');
    const pageListEl = document.querySelector('.page-list');

    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');

    let currentIndex = 0;
    const imgLength = items.length; // 实际图片数

    const fragment = document.createDocumentFragment();
    const pageItemList = [];

    const duration = 5000;

    let timer = null;
    let timer2 = null;

    let flag = false; // 是否正在执行

    // 动态生成按钮
    for (let i = 0; i < imgLength; i++) {
        const div = document.createElement('div');
        div.className = `page-item ${i === currentIndex ? 'active' : ''}`;

        fragment.appendChild(div);
        pageItemList.push(div);
    }

    pageListEl.appendChild(fragment);

    // 图片宽度 = 视口节点宽度
    const itemWidth = viewEl.clientWidth;

    // 切换图片
    function goCurrent() {
        flag = true;
        const x = -currentIndex * itemWidth;

        listEl.style.transition = 'transform .3s';
        listEl.style.transform = `translateX(${x}px)`;
    }

    // 切换按钮类名
    function toggleClassName() {
        const index = currentIndex >= pageItemList.length ? 0 : currentIndex;
        pageItemList.forEach((el, i) => {
            el.classList.remove('active');
        });
        pageItemList[index].classList.add('active');
    }

    function next() {
        stopAutoPlay();
        if (flag) return;
        currentIndex++;
        if (currentIndex >= imgLength) {
            currentIndex = 0;
            setTimeout(() => {
                listEl.style.transition = 'none';
                listEl.style.transform = `translateX(0px)`;
                flag = false; // 重置标志位
            }, 300);
        }
        goCurrent();
        toggleClassName();
    }

    // 自动播放
    function autoPlay() {
        timer = setInterval(next, duration);
    }
    autoPlay();

    // 停止自动播放 并 duration 毫秒后再次启动
    function stopAutoPlay() {
        clearInterval(timer);
        clearTimeout(timer2);
        timer2 = setTimeout(autoPlay, duration);
    }

    prevBtn.onclick = function () {
        stopAutoPlay();
        if (flag) return;
        currentIndex--;
        if (currentIndex < 0) {
            currentIndex = imgLength - 1;
            setTimeout(() => {
                listEl.style.transition = 'none';
                listEl.style.transform = `translateX(-${itemWidth * (imgLength - 1)}px)`;
                flag = false; // 重置标志位
            }, 300);
        }
        goCurrent();
        toggleClassName();
    };

    nextBtn.onclick = next;

    pageItemList.forEach((el, index) => {
        el.onclick = () => {
            stopAutoPlay();
            if (flag) return;
            currentIndex = index;
            goCurrent();
            toggleClassName();
        };
    });

    listEl.addEventListener('transitionend', function () {
        flag = false; // 重置标志位
    });
};













