
var ImageTools = {

    drawImageScaled: function(ctx, canvas, img, scale, circleMod) {

        if (!scale) {
            scale = 1;
        }
    
        //isso cria um recorte circular com fundo branco
        if (circleMod) {
            ctx.save();
            ctx.beginPath();
            ctx.arc(canvas.width / 2, canvas.height / 2, canvas.width / 2, 0, 2 * Math.PI);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = 'rgb(255,255,255)';
            ctx.fill();
            ctx.closePath();
            ctx.clip();
        }
    
        var sw = img.width;
        var sh = img.height;
        var dw = canvas.width * scale;
        var dh = canvas.height * scale;
        var sx = 0;
        var sy = 0;
    
        img = img.canvas || img;
    
        while (dw < sw / 2 || dh < sh / 2) {
            let tmpDw = Math.ceil(Math.max(dw, sw / 2));
            let tmpDh = Math.ceil(Math.max(dh, sh / 2));
            let tmpCtx = this.virtualCanvas({ w: tmpDw, h: tmpDh });
            tmpCtx.clearRect(0, 0, tmpDw, tmpDh);
            tmpCtx.drawImage(img, sx, sy, sw, sh, 0, 0, tmpDw, tmpDh);
            img = tmpCtx.canvas;
            sx = sy = 0;
            sw = tmpDw;
            sh = tmpDh;
        }
    
        var dx = (canvas.height - dw) / 2;
        var dy = (canvas.height - dh) / 2;
    
        ctx.drawImage(img, sx, sy, img.width, img.width, dx, dy, dw, dh);
    
    },

    virtualCanvas: function(size) {
        var canvas = document.createElement('canvas');
        canvas.width = size.w;
        canvas.height = size.h;
        canvas.style.setProperty('image-rendering', 'optimizeQuality', null);
        return canvas.getContext('2d');
    },

    samplePixelValue: function(imagedata, sampleX, sampleY) {

        //  get pixelArray from imagedata object
        let data = imagedata.data;

        //  image data is array of RGBA values (4 bytes). Pixel sample offset is Y value * width of image, plus X pixels across. 
        let i = ((sampleY * imagedata.width) + sampleX) * 4;

        //  get RGBA values
        let r = data[i];
        let g = data[i + 1];
        let b = data[i + 2];
        let a = data[i + 3];

        let result = {
            r: data[i],
            g: data[i + 1],
            b: data[i + 2],
            a: data[i + 3]
        };
        return result;
    }

};


let iOS = {
    id: 'ios',
    path: '',
    icon: 'fa-apple',
    title: 'iOS',
    instructions: '',
    includeInBundle: true,
    bundleSpecs:
        [
            {
                category: 'icon',
                path: 'icon/ios',
                prefix: '',
                // manifest: 'Contents.json',
                useAlpha: true,
                maintainAspectRatio: false,
                resizeFromCentre: false,
                iconCircle: false,
                imageSet: [
                    new FileSpec('AppIcon20x20~ipad.png', 20, 20, null, 'ipad', 1),
                    new FileSpec('AppIcon29x29.png', 29, 29, null, 'iphone', 1),
                    new FileSpec('AppIcon29x29~ipad.png', 29, 29, null, 'ipad', 1),
                    new FileSpec('icon-small@2x.png', 58, 58, null, 'ipad', 1),
                    new FileSpec('icon-small@3x.png', 87, 87, null, 'ipad', 1),
                    new FileSpec('icon-small-40.png', 40, 40, null, 'ipad', 1),
                    new FileSpec('icon-small-40@2x.png', 80, 80, null, 'ipad', 1),
                    new FileSpec('icon-small-40@3x.png', 120, 120, null, 'ipad', 1),
                    new FileSpec('icon-small-50.png', 50, 50, null, 'ipad', 1),
                    new FileSpec('icon-small-50@2x.png', 100, 100, null, 'ipad', 1),
                    new FileSpec('icon.png', 57, 57, null, 'ipad', 1),
                    new FileSpec('icon@2x.png', 114, 114, null, 'ipad', 1),
                    new FileSpec('icon-60.png', 60, 60, null, 'ipad', 1),
                    new FileSpec('icon-60@2x.png', 120, 120, null, 'ipad', 1),
                    new FileSpec('icon-60@3x.png', 180, 180, null, 'ipad', 1),
                    new FileSpec('icon-72.png', 72, 72, null, 'ipad', 1),
                    new FileSpec('icon-72@2x.png', 144, 144, null, 'ipad', 1),
                    new FileSpec('icon-76.png', 76, 76, null, 'ipad', 1),
                    new FileSpec('icon-76@2x.png', 152, 152, null, 'ipad', 1),
                    new FileSpec('icon-167.png', 167, 167, null, 'ipad', 1),
                    new FileSpec('icon-83.5@2x.png', 167, 167, null, 'ipad', 1),
                    new FileSpec('icon-1024.png', 1024, 1024, null, 'ios-marketing', 1),
                ]
            },
            {
                category: 'splash',
                path: 'screen/ios',
                prefix: '',
                useAlpha: false,
                maintainAspectRatio: true,
                resizeFromCentre: true,
                iconCircle: false,
                imageSet: [

                    new FileSpec('Default@2x~iphone~anyany.png', 1334, 1334, null, 'iphone', 2),
                    new FileSpec('Default@2x~iphone~comany.png', 750, 1334, null, 'iphone', 2),
                    new FileSpec('Default@3x~iphone~anyany.png', 2208, 2208, null, 'iphone', 3),
                    new FileSpec('Default@3x~iphone~comany.png', 1242, 2208, null, 'iphone', 3),
                    new FileSpec('Default@2x~ipad~anyany.png', 2732, 2732, null, 'ipad', 2),
                    new FileSpec('Default@2x~ipad~comany.png', 1278, 2732, null, 'ipad', 2),
                    new FileSpec('Default@2x~iphone~comcom.png', 1334, 750, null, 'iphone', 2),
                    new FileSpec('Default@3x~iphone~anycom.png', 2208, 1242, null, 'iphone', 3),

                    new FileSpec('Default~iphone.png', 320, 480, null, 'iphone', 1),
                    new FileSpec('Default@2x~iphone.png', 640, 960, null, 'iphone', 2),
                    new FileSpec('Default-Portrait~ipad.png', 768, 1024, null, 'iphone', 1),
                    new FileSpec('Default-Portrait@2x~ipad.png', 1536, 2048, null, 'iphone', 2),
                    new FileSpec('Default-568h@2x.png', 640, 1136, null, 'iphone', 1),
                    new FileSpec('Default-667h.png', 750, 1334, null, 'iphone', 1),
                    new FileSpec('Default-736h.png', 1242, 2208, null, 'iphone', 1),
                    new FileSpec('LaunchImage-828@2x~iphoneXr-portrait_828x1792.png', 828, 1792, null, 'iphone', 1),
                    new FileSpec('LaunchImage-1125@3x~iphoneX-portrait_1125x2436.png', 1125, 2436, null, 'iphone', 1),
                    new FileSpec('LaunchImage-1242@3x~iphoneXsMax-portrait_1242x2688.png', 1242, 2688, null, 'iphone', 1),
                    new FileSpec('Default-Landscape~ipad.png', 1024, 768, null, 'iphone', 1),
                    new FileSpec('Default-Landscape@2x~ipad.png', 2048, 1536, null, 'iphone', 1),
                    new FileSpec('LaunchImage-1792@2x~iphoneXr-landscape_1792x828.png', 1792, 828, null, 'iphone', 1),
                    new FileSpec('LaunchImage-800-Landscape-736h@3x.png', 2208, 1242, null, 'iphone', 3),
                    new FileSpec('LaunchImage-2436@3x~iphoneX-landscape_2436x1125.png', 2436, 1125, null, 'iphone', 1),
                    new FileSpec('LaunchImage-2688@3x~iphoneXsMax-landscape_2688x1242.png', 2688, 1242, null, 'iphone', 1),
                ]
            }
        ]
};

let android = {
    id: 'android',
    path: '',
    icon: 'fa-android',
    title: 'Android',
    instructions: '',
    includeInBundle: true,
    bundleSpecs:
        [
            {
                category: 'icon',
                path: 'icon/android',
                prefix: '',
                useAlpha: true,
                maintainAspectRatio: true,
                resizeFromCentre: false,
                iconCircle: true,
                imageSet: [
                    new FileSpec('ldpi.png', 36, 36, null),
                    new FileSpec('mdpi.png', 48, 48, null),
                    new FileSpec('hdpi.png', 72, 72, null),
                    new FileSpec('xhdpi.png', 96, 96, null),
                    new FileSpec('xxhdpi.png', 144, 144, null),
                    new FileSpec('xxxhdpi.png', 192, 192, null)
                ]
            },
            {
                category: 'splash',
                path: 'screen/android',
                prefix: '',
                useAlpha: false,
                maintainAspectRatio: true,
                resizeFromCentre: true,
                iconCircle: false,
                imageSet: [
                    new FileSpec('splash-land-ldpi.png', 200, 320, null),
                    new FileSpec('splash-port-ldpi.png', 320, 200, null),
                    new FileSpec('splash-land-mdpi.png', 320, 480, null),
                    new FileSpec('splash-port-mdpi.png', 480, 320, null),
                    new FileSpec('splash-land-hdpi.png', 480, 800, null),
                    new FileSpec('splash-port-hdpi.png', 800, 480, null),
                    new FileSpec('splash-land-xhdpi.png', 768, 1024, null),
                    new FileSpec('splash-port-xhdpi.png', 1280, 720, null),
                    new FileSpec('splash-land-xxhdpi.png', 900, 1600, null),
                    new FileSpec('splash-port-xxhdpi.png', 1600, 900, null),
                    new FileSpec('splash-land-xxxhdpi.png', 1080, 1920, null),
                    new FileSpec('splash-port-xxxhdpi.png', 1920, 1080, null)
                ]
            }
        ]
};

let archive = {
    id: 'archive',
    path: 'archive',
    icon: 'fa-archive',
    title: 'Archive',
    instructions: '',
    includeInBundle: true,
    bundleSpecs: [
        {
            category: 'icon',
            path: '',
            prefix: 'icon',
            useAlpha: true,
            maintainAspectRatio: true,
            resizeFromCentre: false,
            iconCircle: false,
            imageSet: [
                new FileSpec('appstoreicon.png', 1024, 1024, null),
                new FileSpec('googleplayfeature.png', 1024, 500, null),
                new FileSpec('googleplayicon.png', 512, 512, null)
            ]
        },
        {
            category: 'splash',
            path: '',
            prefix: 'drawable',
            useAlpha: false,
            maintainAspectRatio: true,
            resizeFromCentre: true,
            iconCircle: false,
            imageSet: []
        }
    ]
};