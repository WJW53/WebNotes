(function(win){
    var defultPars = {
        rotateNum: 5,
        turnTabel: document.getElementsByTagName('body')[0],
        judgeFn:function(){}
    
    }
    win.Lottery =  Lottery;
    function Lottery(par) {
        this.pars = Object.assign(defultPars, par)
        console.log(this.pars);
        this.bool = true;
        this.init()
    
    }
    
    Lottery.prototype.init = function () {
        var self = this;
        var btn = this.pars.turnTabel.getElementsByClassName('btn')[0];
        this.tabel = this.pars.turnTabel.getElementsByClassName('table')[0];
        btn.onclick = function () {
            if (self.bool) {
                self.pars.randomNum = Math.floor(Math.random() * 360);
                self.bool = false;
                self.tableRun(self.pars.randomNum);
            }
        }
    
    
        this.tabel.addEventListener('webkitTransitionEnd', function () {
                console.log('end');
               
                // judgeFn(randomNum)//判断函数\
                self.pars.judgeFn(self.pars.randomNum);
                this.style.transform = 'rotate(' + self.pars.randomNum + 'deg)';
                this.style.transition = 'none';
                self.bool = true;
            })
    
    }
    
    Lottery.prototype.tableRun = function (deg) {
       var  deg = deg + 360 * this.pars.rotateNum;
        this.tabel.style.transform = 'rotate(' + deg + 'deg)';
        this.tabel.style.transition = 'all 3s';
    
    }




})(window)
