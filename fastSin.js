(function(S){
    S.ready(function(){
        var Event = S.Event;
        var offSetHeight = parseInt(S.one("#canvasMap").css("height")) / 2,
            offSetWidth = parseInt(S.one("#canvasMap").css("width")),
            count = document.getElementById("J_count"),
            xVal = document.getElementById("J_x"),
            car = document.getElementById("car");
        var precise = 4096 ;

        var fastSin = function(steps){
            var table = [],
                ang = 0,
                angStep = (Math.PI * 2) / steps;
            do {
                table.push(Math.sin(ang));
                ang += angStep;
            } while (ang < Math.PI * 2);

        return table;
    };
        var sinTable = fastSin(precise),
           canvasMap = S.one("#canvasMap"),
            divs = '',
            i, bars, x = 0;
        var moveCar = function(postion) {
            car.style.left = postion + "px";
        };
        var drawGraph = function(ang,freq,height){
                var height2 = height * 2;
                for (var i = 0; i < offSetWidth; i++) {
                    bars[i].style.top =  offSetHeight - height + sinTable[(ang + (i * freq)) & (precise - 1)] * height + "px";
                    count.innerHTML = (ang + (i * freq)) & (precise - 1);
                    bars[i].style.height = height2 + 'px';
                }
        };
        for (var i = 0; i < offSetWidth; i++) {
            divs += '<div style="position:absolute;width:1px;background-color:#0d0;top:0px;left:' + i + 'px;"></div>';

        }
        canvasMap.append(divs);
        bars = canvasMap.children(); 
         
        setInterval(function(){
               drawGraph(x * 50, 32 - (sinTable[(x * 20) & (precise - 1)] * 16), 20 - (sinTable[(x * 10 & (precise - 1))] * 20));
               moveCar(offSetWidth/2  - sinTable[(x * 10 & (precise - 1))] * (offSetWidth/2));
                x++;
                xVal.innerHTML = x;
        },20);

    });
})(KISSY)
