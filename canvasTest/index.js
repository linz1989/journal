$(function(){
    drawPreQrCodeImg();

    var currStyle = 5;
    var rectStyleCanvas = $("#rectStyle")[0];
    var heartStyleCanvas = $("#heartStyle")[0];
    var currCanvas;
    var currCtx;
    var tempQrCode = $('#tempQrCode');

    $("#testBtn").click(function(){
        var zip = new JSZip();
        var testData = [
            {serialNo : "2233", qrCodeData : "102"},
            {serialNo : "112233", qrCodeData : "009"},
            {serialNo : "3344444", qrCodeData : "hdhdh"},
            {serialNo : "445566", qrCodeData : "xncbcb"}];
        var imgData, item;
        currCanvas = currStyle !=5 ? rectStyleCanvas : heartStyleCanvas;
        currCtx = currCanvas.getContext("2d");

        for(var k=0;k<testData.length;k++){
            item = testData[k];
            imgData = drawCodeStyle(item.serialNo,item.qrCodeData);
            imgData = imgData.substr(imgData.indexOf(",")+1);
            zip.file(item.serialNo+".png",imgData,{ base64 : true });
            console.log("complete："+k+"--"+item.serialNo);
        }
        zip.generateAsync({type:"blob"}).then(function (blob) {
            saveAs(blob, "imgs.zip");
        });
    });

    function drawCodeStyle(serialNo,qrCodeData){
        var w = currCanvas.width;
        var h = currCanvas.height;
        currCtx.clearRect(0,0,w,h);
        var copyCanvas;

        currCtx.textAlign = "center";
        currCtx.textBaseline = "middle";

        tempQrCode.html("");
        tempQrCode.qrcode({
            width:390,
            height:390,
            text:qrCodeData,
            roundBlank:false
        });

        if(currStyle == 1){
            copyCanvas = $("#c1")[0];
            currCtx.drawImage(copyCanvas,0,0);

            ///绘制工号
            currCtx.fillStyle = "#575757";
            currCtx.font = "normal 42px 微软雅黑";
            currCtx.fillText(serialNo,w/2,290);

            currCtx.drawImage(tempQrCode[0].querySelector("canvas"),(w-390)/2,350,390,390);
        }
        else if(currStyle == 2){
            copyCanvas = $("#c2")[0];
            currCtx.drawImage(copyCanvas,0,0);

            //////绘制工号
            currCtx.fillStyle = "#fff";
            currCtx.font = "italic 42px 微软雅黑";
             var rectW = Math.floor(currCtx.measureText(serialNo).width)+16;
            currCtx.fillRect((w-rectW)/2,237,rectW+10,50);
            currCtx.fillStyle = "#e40080";
            currCtx.fillText(serialNo,w/2,262);

            currCtx.drawImage(tempQrCode[0].querySelector("canvas"),(w-390)/2,353,390,390);
        }
        else if(currStyle == 3){
            copyCanvas = $("#c3")[0];
            currCtx.drawImage(copyCanvas,0,0);
            ////绘制工号
            currCtx.fillStyle = "#52bca8";
            currCtx.font = "normal 48px 微软雅黑";
            currCtx.fillText(serialNo,w/2,h-298);

            currCtx.drawImage(tempQrCode[0].querySelector("canvas"),0,0,390,390,(w-324)/2,300,324,324);
        }
        else if(currStyle == 4){
            copyCanvas = $("#c4")[0];
            currCtx.drawImage(copyCanvas,0,0);

            ////绘制工号
            currCtx.fillStyle = "#9e272b";
            currCtx.font = "normal 48px 微软雅黑";
            currCtx.fillText(serialNo,w/2,h-275);

            currCtx.drawImage(tempQrCode[0].querySelector("canvas"),(w-390)/2,280,390,390);
        }
        else if(currStyle == 5){
            copyCanvas = $("#c5")[0];
            currCtx.drawImage(copyCanvas,0,0);

            ////绘制工号
            currCtx.fillStyle = "rgb(235,200,71)";
            currCtx.font = "bold 80px 微软雅黑";
            currCtx.fillText(serialNo,w/2,h-183);

            currCtx.drawImage(tempQrCode[0].querySelector("canvas"),(w-400)/2,238,400,400);
        }
        return currCanvas.toDataURL("image/png")
    }

    function drawPreQrCodeImg(){
        var w = 641, h = 1008;
        drawFirstCode(w,h);
        drawSecondCode(w,h);
        drawThirdCode(w,h);
        drawFourthCode(w,h);
        drawFifthCode();
    }

    function drawFirstCode(w,h){ ////绘制样式一
        var c1 = $("#c1")[0].getContext("2d");

        c1.fillStyle="#fff";
        c1.fillRect(0,0,w,h);

        c1.beginPath();
        c1.fillStyle = "#eee";
        c1.moveTo(3,3);
        c1.lineTo(w-3,3);
        c1.lineTo(w-3,282);
        c1.lineTo(w-134,282);
        c1.lineTo(w/2,203);
        c1.lineTo(134,282);
        c1.lineTo(3,282);
        c1.closePath();
        c1.fill();

        c1.beginPath();
        c1.fillStyle="#e5007f";
        c1.moveTo(108,3);
        c1.lineTo(w-108,3);
        c1.lineTo(w-108,282);
        c1.lineTo(w/2,203);
        c1.lineTo(108,282);
        c1.lineTo(108,3);
        c1.closePath();
        c1.fill();

        c1.beginPath();
        c1.moveTo(36,h-209);
        c1.lineTo(165,h-209);
        c1.lineTo(165,h-123);
        c1.lineTo(36,h-123);
        c1.lineTo(59,h-166);
        c1.lineTo(36,h-209);
        c1.closePath();
        c1.fill();

        c1.beginPath();
        c1.moveTo(w-36,h-209);
        c1.lineTo(w-165,h-209);
        c1.lineTo(w-165,h-123);
        c1.lineTo(w-36,h-123);
        c1.lineTo(w-59,h-166);
        c1.lineTo(w-36,h-209);
        c1.closePath();
        c1.fill();

        c1.strokeStyle = "#fff";
        c1.lineWidth = 3;
        c1.fillRect((w-403)/2,h-186,403,90);
        c1.strokeRect((w-403)/2,h-186,403,90);

        var img1 = new Image();
        img1.src = "tech/1-1.png";
        img1.onload = function(){
            c1.drawImage(img1,(w-391)/2,70);
        }

        ///绘制会所名称
        c1.fillStyle = "#fff";
         c1.font = "normal 32px 微软雅黑";
         c1.textAlign = "center";
         c1.textBaseline = "middle";
         c1.fillText("小摩豆健康养生会所",w/2,h-141);

        c1.strokeStyle = "#c5c5c5";
        c1.lineWidth = 3;
        c1.strokeRect(0,0,w,h);
    }

    function drawSecondCode(w,h){
        var c2 = $("#c2")[0].getContext("2d");
        var img1 = new Image();
        img1.src = "tech/2-1.jpg";
        img1.onload = function(){
            c2.drawImage(img1,0,0);
            var img2 = new Image();
            img2.src = "tech/2-2.png";
            img2.onload = function(){
                c2.drawImage(img2,(w-483)/2,108);
            };

            c2.strokeStyle = "#e40080";
            c2.lineWidth = 2;
            c2.lineCap = "round";
            c2.beginPath();
            c2.moveTo(122,262);
            c2.lineTo(w-122,262);
            c2.stroke();

            /////会所名称
            c2.fillStyle = "#5C5C5C";
             c2.font = "normal 32px 微软雅黑";
             c2.textAlign = "center";
             c2.textBaseline = "middle";
             c2.fillText("小摩豆健康养生会所",w/2,h-94);
        }
    }

    function drawThirdCode(w,h){
        var c3 = $("#c3")[0].getContext("2d");
        var img1 = new Image();
        img1.src = "tech/3-1.jpg";
        img1.onload = function() {
            c3.drawImage(img1, 0, 0);

            var img2 = new Image();
            img2.src = "tech/3-2.png";
            img2.onload = function(){
                c3.drawImage(img2,(w-400)/2,108);
            }

            c3.strokeStyle = "#52bca8";
            c3.lineWidth = 3;
            c3.lineCap = "round";

            var left = 119, right = w-left, height = 398, top = 264, subWidth = 75, bottom = top+height;
            c3.beginPath();
            c3.moveTo(left,top+subWidth);
            c3.lineTo(left,top+subWidth-51);
            c3.arcTo(left,top,left+subWidth-51,top,20);
            c3.lineTo(left+subWidth,top);

            c3.moveTo(right,top+subWidth);
            c3.lineTo(right,top+subWidth-51);
            c3.arcTo(right,top,right-subWidth+51,top,20);
            c3.lineTo(right-subWidth,top);

            c3.moveTo(left,bottom-subWidth);
            c3.lineTo(left,bottom-subWidth+51);
            c3.arcTo(left,bottom,left+subWidth-51,bottom,20);
            c3.lineTo(left+subWidth,bottom);

            c3.moveTo(right,bottom-subWidth);
            c3.lineTo(right,bottom-subWidth+51);
            c3.arcTo(right,bottom,right-subWidth+51,bottom,20);
            c3.lineTo(right-subWidth,bottom);

            left = 92;
            right = w-92;
            subWidth = 40;
            top = top+height/2;

            c3.moveTo(left,top);
            c3.lineTo(left+subWidth,top);
            c3.moveTo(right,top);
            c3.lineTo(right-subWidth,top);

            c3.stroke();

            //会所名称
            c3.fillStyle = "#6a6a6a";
            c3.font = "normal 25px 微软雅黑";
            c3.textAlign = "center";
            c3.textBaseline = "middle";
            c3.fillText("小摩豆健康养生会所", w / 2, h -135);
        }
    }

    function drawFourthCode(w,h){
        var c4 = $("#c4")[0].getContext("2d");
        var img1 = new Image();
        img1.src = "tech/4-1.jpg";
        img1.onload = function() {
            c4.drawImage(img1, 0, 0);

            var img2 = new Image();
            img2.src = "tech/4-2.png";
            img2.onload = function(){
                c4.drawImage(img2,(w-407)/2,118);
            }

            /////会所名称
            c4.fillStyle = "#fdefe4";
            c4.font = "normal 25px 微软雅黑";
            c4.textAlign = "center";
            c4.textBaseline = "middle";
            c4.fillText("小摩豆健康养生会所", w / 2, h - 148);
        }
    }

    function drawFifthCode(){
        var c5 = $("#c5")[0].getContext("2d");
        var img1 = new Image();
        img1.src = "tech/5-1.png";
        img1.onload = function(){
            c5.drawImage(img1, 0, 0);
        }
    }
});