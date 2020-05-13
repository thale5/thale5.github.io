let u = undefined
let types = zh ? ['建筑物', '道具', '树木', '载具', '拖车', '?', '建筑物sub', '变化', '市民', '道路', '公路立交桥', '公路支柱'] : ['building', 'prop', 'tree', 'vehicle', 'trailer', '?', 'sub-building', 'variation', 'citizen', 'net', 'elevation', 'pillar']
let stats = zh ? ['失败', '好', '丢失', '作者可能更改了名称'] : ['failed', 'available', 'missing', 'name changed']
let city = zh ? ['?', '没有', '是的，间接地', '是的，直接'] : ['?', 'no', 'yes indirectly', 'yes placed']
let styp = zh ? '类型:' : 'Type: '
let ssta = zh ? '状态:' : 'Status: '
let sinc = zh ? '用于城市:' : 'In city: '
let sdat = zh ? '日期:' : 'Date: '
let ssiz = zh ? '大小:' : 'Size: '
let stm = (i, n) => '<a target="_blank" href="https://steamcommunity.com/sharedfiles/filedetails/?id=' + i + '" tabIndex="-1">' + n + '</a>'
let gtype = x => types[x[1]]
let gstat = x => stats[x[2]]
let gitem = x =>
{
    let id = x[6]
    return id > 0 ? stm(id, id) : '?'
}
let gdate = x => x[3] > 0 ? new Date((x[3] + 1350000) * 1048576).toLocaleDateString() : '?'
let gsize = x => x[4] > 0 ? x[4] : '?'
let guses = x => x[2] < 2 ? x[8].length : '?'
let gused = x => u[x[0]].length
let gtyst = x => types[x[1]] + ', ' + stats[x[2]]
let gtysi = x => types[x[1]] + (x[4] > 0 ? ', ' + x[4] : '')
let gtyed = x => types[x[1]] + ', ' + u[x[0]].length
let gsted = x => stats[x[2]] + ', ' + u[x[0]].length
let gussi = x => u[x[0]].length + (x[4] > 0 ? ', ' + x[4] : '')
let gcity = x => city[x[5]]
let gcisi = x => city[x[5]] + (x[4] > 0 ? ', ' + x[4] : '')
let bname = (a, b) => a[0] - b[0]
let btype = (a, b) => a[1] - b[1] || a[0] - b[0]
let bstat = (a, b) => a[2] - b[2] || a[0] - b[0]
let bitem = (a, b) => b[6] - a[6]
let bdate = (a, b) => b[3] - a[3]
let bsize = (a, b) => b[4] - a[4]
let buses = (a, b) =>
{
    let i = a[2] < 2 ? a[8].length : -1, j = b[2] < 2 ? b[8].length : -1
    return j - i || a[0] - b[0]
}
let bused = (a, b) => u[b[0]].length - u[a[0]].length || a[0] - b[0]
let btyst = (a, b) => a[1] - b[1] || bstat(a, b)
let btysi = (a, b) => a[1] - b[1] || b[4] - a[4]
let btyed = (a, b) => a[1] - b[1] || bused(a, b)
let bsted = (a, b) => a[2] - b[2] || bused(a, b)
let bussi = (a, b) => u[b[0]].length - u[a[0]].length || b[4] - a[4]
let bcity = (a, b) => b[5] - a[5] || a[0] - b[0]
let bcisi = (a, b) => b[5] - a[5] || b[4] - a[4]
let bf = [bname, btype, bstat, bitem, bdate, bsize, buses, bused, btyst, btysi, btyed, bsted, bussi, bcity, bcisi]
let gf = [_ => '?', gtype, gstat, gitem, gdate, gsize, guses, gused, gtyst, gtysi, gtyed, gsted, gussi, gcity, gcisi]
let clitem = x =>
{
    let id = x[6]

    if (id > 0)
        return stm(id, zh ? '链接': 'Workshop link')
    else if (id === -1)
        return zh ? '没有可用链接' : 'No link'
    else if (id === -2)
        return zh ? '可能是DLC或Mod内容' : 'Mod or DLC asset'
    else if (x[2] === 3)
        return zh ? '不在工坊' : 'Not on workshop'
    else
        return zh ? '私有资产' : 'Private asset'
}

function cl(s, c='ce')
{
    return '<div class="' + c + '">' + s + '</div>'
}

function ini()
{
    $("#sch").val('')
    $("#sct").prop('selectedIndex', 0)
    let b = $("#top")
    u = new Array(d.length).fill([], 0, d.length)
    let a = ''

    for (let x of d)
    {
        if (x[8].length)
        {
            let i = x[0]

            for (let j of x[8])
                if (u[j].length)
                    u[j].push(i)
                else
                    u[j] = [i]
        }

        a += btn(x)
    }

    b.append(a)
    $("#sct").change(srt)
    $("#sch").on("input",fil)
    $("#sch").focus()
}

function btn(x, s='?')
{
    let m = s === '?' ? x[7] : x[7] + ' <span>[' + s + ']</span>', a = x[2]
    let c = a === 1 ? 'av' : a === 0 ? 'fa' : 'mi'
    return '<div data-i="' + x[0] + '"><div class="tg ' + c + '" onclick="tgl(this,event)" tabIndex="-1">' + m + '</div></div>'
}

function fil()
{
    let s = $("#sch").val().toLowerCase()

    if (!s)
        $("#top > div").show()
    else
        $("#top > div").each(function()
        {
            let p = $(this)
            p.toggle(p.children().first().text().toLowerCase().indexOf(s) > -1)
        })
}

function srt()
{
    let i = $("#sct").prop('selectedIndex'), c = d.slice().sort(bf[i]), f = gf[i], b = $("#top")
    b.empty()
    let a = ''

    for (let x of c)
        a += btn(x, f(x))

    b.append(a)

    if ($("#sch").val())
        fil()
}

function tgl(b,e)
{
    if ($(e.target).is("a"))
        return

    let y = $(window).scrollTop(), t = $(b), c = t.next()
    t.toggleClass("ex")

    if (c.length)
        c.toggle()
    else
    {
        let p = t.parent(), i = Number(p.attr("data-i")), x = d[i]
        let r = $('<div class="ro"></div>')
        .append(cl(styp + gtype(x), 'nr'))
        .append(cl(ssta + gstat(x)))
        .append(cl(clitem(x)))
        .append(cl(sinc + gcity(x)))
        .append(cl(sdat + gdate(x)))
        .append(cl(ssiz + gsize(x) + ' KB', 'nr'))
        let c = $('<div class="cc"></div>').append(r)

        if (x[8].length + u[i].length)
        {
            let g = $('<div class="gr"></div>')

            if (x[8].length)
            {
                const str = zh ? '使用' : 'uses these assets'
                g.append($('<p><b>' + x[7] + '</b> ' + str + ':</p>'))

                for (let j of x[8])
                    g.append(btn(d[j]))
            }

            if (u[i].length)
            {
                const str = zh ? '这些资产使用' : 'These assets use'
                g.append($('<p>' + str + ' <b>' + x[7] + '</b>:</p>'))

                for (let j of u[i])
                    g.append(btn(d[j]))
            }

            c.append(g)
        }

        p.append(c)
    }

    $(window).scrollTop(y)
}
