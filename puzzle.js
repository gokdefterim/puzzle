    var classes = {
        body: 'body',
        containerDiv: 'container-div',
        fullImage: 'full-image',
        pieces: 'pieces',
        puzzleBoard: 'puzzle-board',
        div00: 'div00',
        div01: 'div01',
        div02: 'div02',
        div10: 'div10',
        div11: 'div11',
        div12: 'div12',
        div20: 'div20',
        div21: 'div21',
        div22: 'div22',
        congratulations: 'congratulations',
        h1: 'h1',
    }

    var selectors = {};

    Object.keys(classes).forEach(function (key) {
        selectors[key] = '.' + classes[key];
    });

    function setStyle () {
        $(selectors.myCustomStyleClass).remove();

        var css =
        '*{' +
            'margin: 0;' +
            'padding: 0;' +
            'box-sizing: border-box;' +
            'text-decoration: none;' +
            'list-style-type: none;'+
            'font-family: "Nunito Sans", sans-serif;' +
            '}' +
        classes.body + '{' +
            'background: #FFC6D3;' +
            '}' +
        selectors.containerDiv + '{' +
            'width: 1440px;' +
            'height: 600px;' +
            'margin: auto;' +
            'display: flex;' +
            'justify-content: space-around;' +
            'align-items: center;' +
            '}' +
        selectors.fullImage + '{' +
            'background: url("samurai-girl.png");' +
            'border-radius: 5px;' +
            'width: 300px;' +
            'height: 300px;' +
            '}' +
        selectors.pieces + '{' +
            'border-radius: 5px;' +
            'display: flex;' +
            'flex-wrap: wrap;' +
            'width: 315px;' +
            'gap: 5px;' +
            '}' +
        selectors.puzzleBoard + '{' +
            'overflow: hidden;' +
            'width: 315px;' +
            'gap: 5px;' +
            'display: flex;' +
            'flex-wrap: wrap;' +
            '}' +
        selectors.congratulations + ' ' + classes.h1 + ':hover{' +
            'cursor: pointer;' +
            '}' 

            $('<style/>').html(css).addClass(classes.myCustomStyleClass).appendTo('head');

    }

    function setHtml () {
        $(selectors.containerDiv).remove();

        $('<div/>').addClass(classes.containerDiv).appendTo(classes.body);

        var htmlContent =
            '<div class="'+ classes.fullImage +'"></div>' +
            '<div class="'+ classes.pieces +'"></div>' +
            '<div class="'+ classes.puzzleBoard +'"></div>'

        $(selectors.containerDiv).html(htmlContent);

    }
    var currentItem;
    var otherItem;

    function js (){

        var rows = 3;
        var columns = 3;

        let pieces = [];
        for(let i=1; i<=rows*columns; i++){
            pieces.push(i.toString());
        }

        let xPositions = [100, 200, 300];
        for(let i=0; i<3; i++){
            let randomX = Math.floor(Math.random() * xPositions.length);
            let x = xPositions[randomX];
            xPositions.splice(randomX, 1);

            let yPositions = [100, 200, 300];
            for(let j=0; j<3; j++){
                let randomY = Math.floor(Math.random() * yPositions.length);
                let y = yPositions[randomY];
                yPositions.splice(randomY, 1);

                $('<div/>').addClass('div'+x+y).addClass('droppable').css({'background': 'url("samurai-girl.png")', 'backgroundPositionX': x, 'backgroundPositionY': y, 'width': '100px', 'height': '100px', 'border-radius': '5px'}).appendTo(selectors.pieces);

                $('.div'+x+y).mousedown(function(){
                    currentItem = $(this);
                    console.log(currentItem);
                });
                
                $('.div'+x+y).draggable({helper: 'clone', cursor: 'grabbing', opacity: '0.5', snap:'true', snapTolerance: '15px'});
                $('.div'+x+y).droppable({
                    drop: function() {
                        otherItem = $(this);
                        console.log(otherItem);
                        var a = currentItem.css('background');
                        currentItem.css('background', otherItem.css('background'));
                        otherItem.css('background', a);
                    }
                });
            }
        }
        
        for (var r=0; r<rows; r++){
            for (var c=0; c<columns; c++){
                $('<div/>').addClass('div'+r+c).addClass('droppable').css({'width': '99px', 'height': '99px', 'background': '#fae1e7', 'border-radius': '5px'}).appendTo(selectors.puzzleBoard);

                $('.div'+r+c).mousedown(function(){
                    currentItem = $(this);
                    console.log(currentItem);
                });

                $('.div'+r+c).draggable({helper: 'clone', cursor: 'grabbing', opacity: '0.5', snap:'true', snapTolerance: '15px'});
                $('.div'+r+c).droppable({
                    drop: function() {
                        otherItem = $(this);
                        console.log(otherItem);
                        var a = currentItem.css('background');
                        var b = otherItem.css('background');
                        currentItem.css('background', otherItem.css('background'));
                        otherItem.css('background', a);
                        if(
                            $('.div00').css('backgroundPositionX')==='300px' && $('.div00').css('backgroundPositionY')==='300px' &&
                            $('.div01').css('backgroundPositionX')==='200px' && $('.div01').css('backgroundPositionY')==='300px' &&
                            $('.div02').css('backgroundPositionX')==='100px' && $('.div02').css('backgroundPositionY')==='300px' &&
                            $('.div10').css('backgroundPositionX')==='300px' && $('.div10').css('backgroundPositionY')==='200px' &&
                            $('.div11').css('backgroundPositionX')==='200px' && $('.div11').css('backgroundPositionY')==='200px' &&
                            $('.div12').css('backgroundPositionX')==='100px' && $('.div12').css('backgroundPositionY')==='200px' &&
                            $('.div20').css('backgroundPositionX')==='300px' && $('.div20').css('backgroundPositionY')==='100px' &&
                            $('.div21').css('backgroundPositionX')==='200px' && $('.div21').css('backgroundPositionY')==='100px' &&
                            $('.div22').css('backgroundPositionX')==='100px' && $('.div22').css('backgroundPositionY')==='100px'
                        ){
                            $(selectors.fullImage).html('').css({'box-shadow': '0px 10px 20px 2px rgba(0, 0, 0, 0.25)', 'transform': 'rotate(360deg)', 'transition': 'transform 1s ease'})
                            $(selectors.pieces).html('<a href="index.html" style="margin: auto; color: #fae1e7"><h1>Congratulations!</h1></a>').css({'width': '300px', 'height': '100px', 'margin-right': '15px', 'border-radius': '5px', 'background': '#fa89a3', 'position': 'absolute', 'top': '-100px', 'box-shadow': '0px 10px 20px 2px rgba(0, 0, 0, 0.25)', 'transform': 'translateY(325px)', 'transition': 'transform 1s ease'}).addClass(classes.congratulations)
                            $(selectors.puzzleBoard).html('').css({'width': '300px', 'height': '300px', 'margin-right': '15px', 'border-radius': '5px', 'background': 'url("samurai-girl.png")', 'box-shadow': '0px 10px 20px 2px rgba(0, 0, 0, 0.25)', 'transform': 'rotate(360deg)', 'transition': 'transform 1s ease'})
                        }
                    }
                });
            }
        }
    }

    console.log($('.div00').css('backgroundPositionX'));
    (function initialize(){
        setStyle();
        setHtml();
        js();

    })();
