function ini()
{
    let t = Date.now(), b = $("#top");

    for (let n = 0; n < 40; n++)
        $(btn(n%l)).appendTo(b);

    t = Date.now() - t;
    $("h1").text(t);
    $("#search").keyup(fil)
}

function fil()
{
    let s = $(this).val().toLowerCase();

    $("#top > div").each(function()
    {
        let p = $(this), m = d[Number(p.attr("data-i"))][0];
        p.toggle(m.toLowerCase().indexOf(s) > -1)
    });
}

function tgl(b)
{
    let y = $(window).scrollTop(), t = $(b), c = t.next();
    t.toggleClass("ex");

    if (c.length)
        c.toggle(128);
    else
    {
        let p = t.parent(), x = d[Number(p.attr("data-i"))];
        let r = $('<div class="ro"></div>')
        .append(cel('Type: building'))
        .append(cel('Status: ok'))
        .append(cel(lnk(x)))
        .append(cel('Date: Aug 10, 2017'))
        .append(cel('Size: 11344 KB'));
        let c = $('<div class="cc"></div>').append(r);

        if (x[2].length)
        {
            let g = $('<div class="c2"></div>').append('<p><b>' + x[0] + '</b> uses these assets:</p>');

            for (let j of x[2])
                $(btn(j)).appendTo(g);

            c.append(g);
        }

        p.append(c);
    }

    $(window).scrollTop(y);
}

let btn = i => '<div data-i="' + i + '"><button class="tg" onclick="tgl(this)">' + d[i][0] + '</button></div>';

let typ = i =>
{
    switch(i) {case 0:return "building";case 1:return "prop";case 2:return "tree";case 3:return "vehicle";case 8:return "citizen";case 9:return "net";}
}

let lnk = x =>
{
    let r = x[1];
    return r > 1000000 ? '<a target="_blank" href="https://steamcommunity.com/sharedfiles/filedetails/?id=' + r + '">Workshop link</a>' : "Private asset";
}

let cel = s => '<div class="ce">' + s + '</div>';
