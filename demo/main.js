$.getJSON( 'dist/MapkeyIconsList.json', {
    format: "json"
}).done(function( data ) {
    init(data)
});


function init(data){
    var icons = data.icons;

    var span = $('#icon');

    var searchinput = $('#search_input');
    var search = $('#search');
    var types = $('#types');
    var overlay= $('#overlay');
    var overlayContent= $('#overlay_content');

    $('#version').html(data.version)
    $('#count').html(icons.length)

    searchinput.on('focus',function(){
        search.addClass('focus')
    });

    searchinput.on('blur',function(){
        search.removeClass('focus')
    });

    setInterval(function(){

        var index = Math.floor((Math.random() * icons.length-1) + 1);
        var name= icons[index].name
        span.fadeOut(500,function(){
            span.removeClass();
            span.addClass('mki mki-'+name)
            span.fadeIn()
        });
    }, 2000);

    var iconsWrapper = $('#icons-wrapper')

    showAllIcons()

    function showAllIcons(){
        iconsWrapper.empty();
        for (var i=0; i< icons.length;i++ ){
            addIcon(icons[i])
        }
    }

    function addIcon(icondata){
        var iconItem= $('<div>',{class:'icon-item'}).appendTo(iconsWrapper);
        $('<span>',{class:'mki mki-'+icondata.name})
            .on('click',function(){
               // iconSreen(icondata)
                $('#divFrame').remove();

                $('html,body').animate({
                    scrollTop: iconItem.offset().top
                });


               var divFrame = $('<div>',{id:'divFrame'})
                   .html(iconSreen(icondata))
                returnLast(iconItem).after(divFrame)
                divFrame.slideDown(function(){

                });
            })
            .appendTo(iconItem);
    }

    function returnLast(element){

        if (!element.next().length) {
            return element;
        }

        if (element.position().left>element.next().position().left){
            return element
        } else {
            return returnLast(element.next())
        }
    }

    function addTypeButton(type){
        var btn = $('<button>',{class:''})
            .html(type)
            .on('click',function(){
                searchinput.val(type);
                searchQuery(type)
            })
            .appendTo(types);
    }

    for (var i=0; i< data.types.length;i++ ) {
        addTypeButton(data.types[i])
    }

    var btn = $('<button>',{class:''})
        .html('all')
        .on('click',function(){
            searchinput.val(null)
            showAllIcons()
        })
        .appendTo(types);


    var index = lunr(function () {
        this.field('name',{boost: 10})
        this.field('keywords')
        this.field('type',{boost: 5})
        this.field('lang2')
        this.ref('index')
    });


    for (var i=0; i< icons.length;i++ ) {
        var data = icons[i];
        data.lang2 = [data.lang.cs,data.lang.en,data.lang.de].join(';');
        data.keywords = data.keywords.split(',').join(' ')
        data.index= i;
        index.add(data)
    }

    function searchQuery(query){
        var result = index.search(query)
        iconsWrapper.empty();
        if (query == ''){showAllIcons(); return}
        if (result.length ==0) {
            $('<div>',{class:'no-icon'})
                .html('NO ICONS FOUND')
                .appendTo(iconsWrapper);
        };

        $.each(result,function(index,value){
            var icondata = icons[value.ref]
            addIcon(icondata)
        })
    }

    searchinput.on('keyup',function(e){
        searchQuery(e.target.value)
    });

    function iconSreen(icondata){
        var content= $('<div>',{});
        var iconHeader = $('<div>',{class:'icon-header'}).appendTo(content);
        var iconName = $('<div>',{class:'iconName'}).html(icondata.lang.en).appendTo(iconHeader);
        var close = $('<div>',{class:'closebutton'}).html('&times;')
            .on('click',function(){
                $('#divFrame').slideUp(function(){this.remove()})
            })
            .appendTo(iconHeader);

        var icon = $('<div>',{class:'icon-show'}).appendTo(content);
        var iconSpan = $('<span>',{class:'mki mki-'+icondata.name}).appendTo(icon);
        var iconInfo = $('<div>',{class:'icon-info'}).appendTo(content);
        var metadata = $('<div>',{id:'metadata'}).appendTo(iconInfo);
        var id = $('<div>',{class:''}).html("<span>id: </span><span class='value'>"+icondata.name+"</span>").appendTo(metadata);
        var type = $('<div>',{class:''}).html("<span>type: </span> <span class='value'>"+icondata.type+"</span>").appendTo(metadata);
        var metadata2 = $('<div>',{id:'metadata'}).appendTo(iconInfo);
        var unicode = $('<div>',{class:''}).html("<span>unicode: </span> <span class='value'>U+"+icondata.unicode+"</span>").appendTo(metadata2);
        var html = $('<div>',{class:''}).html("<span>html: </span><span class='value' style='font-family: \"Lucida Console\", Monaco, monospace';>&amp;#"+icondata.decimal+";  &amp;#x"+icondata.unicode+";</span>").appendTo(metadata2);
        var sizes = $('<div>',{class:'sizes'}).appendTo(iconInfo);

        var code = "<span style='font-family: \"Lucida Console\", Monaco, monospace'> <span style='color:darkseagreen;'>&lt;span</span> <span style='color:#1e86ab'> class=</span><span style='color:#ffc4b1'>'mki mki-"+icondata.name+"'</span><span style='color:darkseagreen;'>&gt;&lt;/span&gt;</span></span>";
        var codebox = $('<div>',{class:'codebox'}).html(code).appendTo(iconInfo);

        var buttons = $('<div>',{class:'buttons'}).appendTo(iconInfo);
        var buttonSVG = $('<a>',{class:'btn', href:'../dist/svg/'+icondata.name+".svg", download: icondata.name+".svg", target:'_blank'})
            .html( '<span class="mki mki-download"></span>'+" svg")
            .appendTo(buttons);
        var buttonPNG = $('<a>',{class:'btn', href:'../dist/png/'+icondata.name+".png", download: icondata.name+".png", target:'_blank'})
            .html( '<span class="mki mki-download"></span>'+" png")
            .appendTo(buttons);

        for (var i=6;i<38;true){
            var num = 10+i*2
            i+=8;
            $('<span>',{class:'mki mki-'+icondata.name,style:'font-size:'+num+'px'}).appendTo(sizes);
        }

        return content;
    }
}


