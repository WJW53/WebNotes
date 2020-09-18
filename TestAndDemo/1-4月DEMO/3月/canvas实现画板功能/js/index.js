/***
 * 
 * canvas  实现画板功能
 * 
 * nan.xue
 */



var drawingBoard = {
    cavs: document.getElementById('cavs'),
    ctx: document.getElementById('cavs').getContext('2d'),
    ulNode: document.getElementsByTagName('ul')[0],
    colorBtn: document.getElementById('color'),
    lineRuler: document.getElementById('lineRuler'),
    imgArr: [],
    init: function () {
        this.ctx.lineCap = 'round'; //线条起始和结尾样式
        this.ctx.lineJoin = 'round'; //转弯
        this.drawing();
        // console.log(this.ctx);
        this.btnsFnAll();
    },
    drawing: function () {
        var self = this;
        var left = this.cavs.offsetLeft;
        this.cavs.onmousedown = function (e) {
            var e_x = e.pageX;
            var e_y = e.pageY;
            self.ctx.beginPath();
            self.ctx.moveTo(e_x - left, e_y - left);

            var img = self.ctx.getImageData(0, 0, self.cavs.offsetWidth, cavs.offsetHeight);
            self.imgArr.push(img);

            document.onmousemove = function (e) {

                self.ctx.lineTo(e.pageX - left, e.pageY - left);
                self.ctx.stroke();


            }

            document.onmouseup = function () {
                this.onmousemove = null;
                self.ctx.closePath();

            }

            this.onmouseleave = function () {
                this.onmousemove = null;

            }

        }



    },
    btnsFnAll: function () {
        var self = this;
        this.ulNode.addEventListener('click', function (e) {
            console.log(e.target.id);
            switch (e.target.id) {
                case "cleanBoard":
                    //清屏
                    self.ctx.clearRect(0, 0, self.cavs.offsetWidth, cavs.offsetHeight)
                    break;
                case "eraser":
                    //橡皮
                    self.ctx.strokeStyle = "#ffffff";

                    break;
                case "rescind":
                    //撤销
                    if (self.imgArr.length > 0){
                        self.ctx.putImageData(self.imgArr.pop(), 0, 0);
                    }
                       
                    break;

            }
        });
        this.colorBtn.onchange = function () {
            self.ctx.strokeStyle = this.value;

        }

        this.lineRuler.onchange = function () {
            self.ctx.lineWidth = this.value;

        }

    }

}

drawingBoard.init();