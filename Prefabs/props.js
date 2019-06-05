const names =
[
    // # Markers
    'Door Marker','Hang Around Marker','Large Hang Around Marker','Enter Only Door Marker','Exit Only Door Marker','Invisible Helipad Marker','Dust Marker 01',
    'Ore Debris Marker 01','Sand Debris Marker 01','Bison Marker','Moose Marker','Dolphin Marker','Reindeer Marker','Whale Marker','Elephant Marker',
    'Antelope Marker','Rhino Marker','Chimpanzee Marker','Flamingo Marker','Giraffe Marker','Gorilla Marker','Lion Marker','Manta Ray Marker','Swan Marker',
    'Cow Marker 01','Highland Cow Marker 01','Pig Marker 01','Sheep Marker 01','Farmer Marker 01','Forestry Worker Marker 01','Oil Industry Worker Marker 01',
    'Ore Industry Worker Marker 01',

    // # Parking spaces
    'Parking Space','Parking Space Electric','Parking Spaces 01','Parking Spaces 02','Invisible Parking Space',

    // # Network Extensions 2 prerequisites
    'Wall Light Orange','StreetLamp02','High Bench','Traffic Light 01','Traffic Light 01 Mirror','Traffic Light 02','Traffic Light 02 Mirror',
    'Traffic Light Pedestrian','New Street Light','New Street Light Highway','New Street Light Small Road','New Street Light Avenue','30 Speed Limit',
    '40 Speed Limit','50 Speed Limit','60 Speed Limit','100 Speed Limit','Motorway Sign',

    // # NEXT 2 European
    'Traffic Light European 01','Traffic Light European 01 Mirror','Traffic Light European 02','Traffic Light European 02 Mirror','Traffic Light Pedestrian European',

    // # Additional infractructure
    'RailwayPowerline','RailwayPowerline Singular'
]

const exs = Object.create(null)
let x,y

const GetAssetName = myCode => myCode.html().split('\n')[0]

const OutputConfig = () => {
	const skips = $('#skips').empty()
    let some = false

    $('.skipped code').each(function()
    {
        const name = GetAssetName($(this))
        const item = $('<p>'+name+'</p>')

        if (name in exs)
        {
            item.addClass('ex')
            some = true
        }

        skips.append(item)
    })

    let head = 'Props:<br><br># You can remove items by clicking with the mouse.<br><br>'

    if (some)
        head += '# The items marked with yellow are important props.<br># They should probably not be skipped.<br># However, you can skip them if you absolutely want.<br><br>'

    skips.prepend(head)
    skips.append('<br>')
    const lines = skips.children('p')
	lines.mousedown(e => [x,y] = [e.pageX,e.pageY])

    lines.mouseup(function(e)
    {
        if (Math.abs(x - e.pageX) < 5 && Math.abs(y - e.pageY) < 5)
        {
            const name = $(this).text()

            $('code').filter(function()
            {
                return GetAssetName($(this)) == name
            }).closest('.my').removeClass('skipped')

            OutputConfig()
        }
	})
}

const Ini = () =>
{
	const nodes=document.querySelectorAll('img')

	for (var i=0;i<nodes.length;i++)
	{
		let img=nodes[i]
		img.setAttribute('src',img.getAttribute('data-s'))
	}

    for (let v of names)
        exs[v]=null

	// heading toggle
	$('h2').click(function()
    {
		const mys = $(this).nextUntil('h2, h3')
        mys.toggleClass('skipped', !mys.first().hasClass('skipped'))
		OutputConfig()
	})

    const codes = $('code')
	codes.mousedown(e => [x,y] = [e.pageX,e.pageY])

	// individual asset toggle
    codes.mouseup(function(e)
    {
        if (Math.abs(x - e.pageX) < 7 && Math.abs(y - e.pageY) < 7)
        {
            $(this).closest('.my').toggleClass('skipped')
		    OutputConfig()
        }
	})
}
