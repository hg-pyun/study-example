// canvas 객체 생성
var canvas = $('#canvas')[0];
var ctx = canvas.getContext('2d');

function drawImageData(image) {
    image.height *= canvas.offsetWidth / image.width;
    image.width = canvas.offsetWidth;

    if(image.height > canvas.offsetHeight){
        image.width *= canvas.offsetHeight / image.height;
        image.height = canvas.offsetHeight;
    }

    ctx.drawImage(image, 0, 0, image.width, image.height);
    console.log(ctx.getImageData(0,0, canvas.width, canvas.height));
}

// click input button
$('#loadButton').on('change', function (e) {
    var file = e.target.files[0];
    var fileReader = new FileReader();

    fileReader.onload = function (e) {
        var image = new Image();
        image.src = e.target.result;
        image.onload = function () {
            drawImageData(image);
        }
    };

    fileReader.readAsDataURL(file);
});

$('#filterButton').on('click', function () {
    // imageData를 가져온다.
    var pixels = ctx.getImageData(0,0, canvas.width, canvas.height);

    // image processing
    var filteredData = sobel(pixels);

    // Canvas에 다시 그린다.
    ctx.putImageData(filteredData, 0 , 0);
});

function sobel (pixels) {
    return convolution(pixels,
          [ -1,  0,  1,
            -2,  0,  2,
            -1,  0,  1], 1);
}

// convolution
function convolution(pixels, weights, opaque) {
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');

    var side = Math.round(Math.sqrt(weights.length)); // 이미지 필터 가중치
    var halfSide = Math.floor(side/2); // 가중치 절반 값 저징
    var src = pixels.data; // 원본 데이터
    var sw = pixels.width; // 원본 데이터 넓이
    var sh = pixels.height; // 원본 데이터 높이
    var w = sw;
    var h = sh;
    var output = ctx.createImageData(w, h);
    var dst = output.data;
    var alphaFac = opaque ? 1 : 0;
    for (var y=0; y<h; y++) {
        for (var x=0; x<w; x++) {
            var sy = y;
            var sx = x;
            var dstOff = (y*w+x)*4;
            var r=0, g=0, b=0, a=0;
            for (var cy=0; cy<side; cy++) {
                for (var cx=0; cx<side; cx++) {
                    var scy = sy + cy - halfSide;
                    var scx = sx + cx - halfSide;
                    if (scy >= 0 && scy < sh && scx >= 0 && scx < sw) {
                        var srcOff = (scy*sw+scx)*4;
                        var wt = weights[cy*side+cx];
                        r += src[srcOff] * wt;
                        g += src[srcOff+1] * wt;
                        b += src[srcOff+2] * wt;
                        a += src[srcOff+3] * wt;
                    }
                }
            }
            dst[dstOff] = r;
            dst[dstOff+1] = g;
            dst[dstOff+2] = b;
            dst[dstOff+3] = a + alphaFac*(255-a);
        }
    }
    return output;
}