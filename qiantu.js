// 懒加载

var viewHeight =document.documentElement.clientHeight//获取可视区高度
function inSight(el) {
    return el.getBoundingClientRect().top < viewHeight;
}
function loadImg(el) {
    if (!el.srcset) {
        el.src = el.dataset.original;
    }
}
function checkImgs() {
    const imgs = document.getElementsByClassName('image-item');
    // const imgs = document.getElementsByTagName('img');
    Array.from(imgs).forEach(el => {
        if (inSight(el)) {
            loadImg(el);
        }
    })
}
window.addEventListener('scroll', checkImgs, false);
window.onload = checkImgs;
// 轮播图
let count = 0;
let isgo = false;
let timer;

window.onload = function () {
    let ul_img = document.getElementsByClassName("ul_img")[0];
   
    let li_img = document.getElementsByClassName("li_img");
   
    let arrow = document.getElementsByClassName("arrow");
   
    let div_btn = document.getElementsByClassName("div_btn");
   

    /*定义计时器，控制图片移动*/
    showtime();
    function showtime() {
        timer = setInterval(function () {
            if (isgo == false) {
                count++;
                ul_img.style.transform = "translate(" + -1247 * count + "px)";
                if (count >= li_img.length - 1) {
                    count = li_img.length - 1;
                    isgo = true;
                }
            }
            else {
                count--;
                ul_img.style.transform = "translate(" + -1247 * count + "px)";
                if (count <= 0) {
                    count = 0;
                    isgo = false;
                }
            }

            for (var i = 0; i < div_btn.length; i++) {
                div_btn[i].style.backgroundColor = "white";
            }
            
            div_btn[count].style.backgroundColor = "white";
            
        }, 4000)
    }

    /*左右方向键操作*/
    for (var i = 0; i < arrow.length; i++) {
        //鼠标悬停时
        arrow[i].onmouseover = function () {
            
            clearInterval(timer);
        }
        //鼠标离开时
        arrow[i].onmouseout = function () {
           
            showtime();
        }
        arrow[i].onclick = function () {
            //区分左右
            if (this.title == 0) {
                count++;
                if (count >= 3) {
                    count = 0;
                }
            }
            else {
                count--;
                if (count <= 0) {
                    count = 3;
                }
            }

            ul_img.style.transform = "translate(" + -1247 * count + "px)";

            for (var i = 0; i < div_btn.length; i++) {
                div_btn[i].style.backgroundColor = "white";
            }
            div_btn[count].style.backgroundColor = "white";
        }
    }

    //鼠标悬停在底部按钮的操作
    for (var b = 0; b < div_btn.length; b++) {
        div_btn[b].index = b;
        div_btn[b].onmouseover = function () {

            clearInterval(timer);

            for (var a = 0; a < div_btn.length; a++) {
                div_btn[a].style.backgroundColor = "aquamarine";
            }
            div_btn[this.index].style.backgroundColor = "aqua";
            //让count值对应
            //为了控制方向
            if (this.index == 3) {
                isgo = true;
            }
            if (this.index == 0) {
                isgo = false;
            }
            count = this.index;
            ul_img.style.transform = "translate(" + -1247 * this.index + "px)";
        }

        div_btn[b].onmouseout = function () {
            //添加计时器
            showtime();
        }
    }
}
// 返回顶部

  const goTopBtn = document.getElementById('back-top')
  let scrollTop = 0
  window.onscroll = () => {

    scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    scrollTop > 50 ? (goTopBtn.style.display = 'block') : (goTopBtn.style.display = 'none')
  }
  goTopBtn.onclick = () => {
    let timer = null;
    clearInterval(timer);
    timer = setInterval(()=>{
      scrollTop -= scrollTop / 10;
      window.scrollTo(0,scrollTop)
      if(scrollTop<2){
        window.scrollTo(0,0);
        clearInterval(timer);
      }
    },15)
  }