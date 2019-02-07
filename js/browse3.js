﻿let u=void 0,types=["building","prop","tree","vehicle","trailer","?","sub-building","variation","citizen","net","elevation","pillar"],stats=["failed","available","missing","name changed"],city=["?","no","yes indirectly","yes placed"],gtype=t=>types[t[1]],gstat=t=>stats[t[2]],gitem=t=>t[6]>0?'<a target="_blank" href="https://steamcommunity.com/sharedfiles/filedetails/?id='+t[6]+'" tabIndex="-1">Workshop link</a>':"?",gdate=t=>t[3]>0?new Date(1048576*(t[3]+135e4)).toLocaleDateString():"?",gsize=t=>t[4]>0?t[4]:"?",guses=t=>t[2]<2?t[8].length:"?",gused=t=>u[t[0]].length,gtyst=t=>types[t[1]]+", "+stats[t[2]],gtysi=t=>types[t[1]]+(t[4]>0?", "+t[4]:""),gtyed=t=>types[t[1]]+", "+u[t[0]].length,gsted=t=>stats[t[2]]+", "+u[t[0]].length,gussi=t=>u[t[0]].length+(t[4]>0?", "+t[4]:""),gcity=t=>city[t[5]],gcisi=t=>city[t[5]]+(t[4]>0?", "+t[4]:""),bname=(t,e)=>t[0]-e[0],btype=(t,e)=>t[1]-e[1]||t[0]-e[0],bstat=(t,e)=>t[2]-e[2]||t[0]-e[0],bitem=(t,e)=>e[6]-t[6],bdate=(t,e)=>e[3]-t[3],bsize=(t,e)=>e[4]-t[4],buses=(t,e)=>{let s=t[2]<2?t[8].length:-1;return(e[2]<2?e[8].length:-1)-s||t[0]-e[0]},bused=(t,e)=>u[e[0]].length-u[t[0]].length||t[0]-e[0],btyst=(t,e)=>t[1]-e[1]||bstat(t,e),btysi=(t,e)=>t[1]-e[1]||e[4]-t[4],btyed=(t,e)=>t[1]-e[1]||bused(t,e),bsted=(t,e)=>t[2]-e[2]||bused(t,e),bussi=(t,e)=>u[e[0]].length-u[t[0]].length||e[4]-t[4],bcity=(t,e)=>e[5]-t[5]||t[0]-e[0],bcisi=(t,e)=>e[5]-t[5]||e[4]-t[4],bf=[bname,btype,bstat,bitem,bdate,bsize,buses,bused,btyst,btysi,btyed,bsted,bussi,bcity,bcisi],gf=[t=>"?",gtype,gstat,gitem,gdate,gsize,guses,gused,gtyst,gtysi,gtyed,gsted,gussi,gcity,gcisi],clitem=t=>{let e=t[6];return e>0?gitem(t):-1===e?"No link":-2===e?"Mod or DLC asset":3===t[2]?"Not on workshop":"Private asset"};function cl(t,e="ce"){return'<div class="'+e+'">'+t+"</div>"}function ini(){$("#sch").val(""),$("#sct").prop("selectedIndex",0);let t=$("#top");u=new Array(d.length).fill([],0,d.length);let e="";for(let t of d){if(t[8].length){let e=t[0];for(let s of t[8])u[s].length?u[s].push(e):u[s]=[e]}e+=btn(t)}t.append(e),$("#sct").change(srt),$("#sch").on("input",fil),$("#sch").focus()}function btn(t,e="?"){let s="?"===e?t[7]:t[7]+" <span>["+e+"]</span>",i=t[2],n=1===i?"av":0===i?"fa":"mi";return'<div data-i="'+t[0]+'"><div class="tg '+n+'" onclick="tgl(this,event)" tabIndex="-1">'+s+"</div></div>"}function fil(){let t=$("#sch").val().toLowerCase();t?$("#top > div").each(function(){let e=$(this);e.toggle(e.children().first().text().toLowerCase().indexOf(t)>-1)}):$("#top > div").show()}function srt(){let t=$("#sct").prop("selectedIndex"),e=d.slice().sort(bf[t]),s=gf[t],i=$("#top");i.empty();let n="";for(let t of e)n+=btn(t,s(t));i.append(n),$("#sch").val()&&fil()}function tgl(t,e){if($(e.target).is("a"))return;let s=$(window).scrollTop(),i=$(t),n=i.next();if(i.toggleClass("ex"),n.length)n.toggle();else{let t=i.parent(),e=Number(t.attr("data-i")),s=d[e],n=$('<div class="ro"></div>').append(cl("Type: "+gtype(s),"nr")).append(cl("Status: "+gstat(s))).append(cl(clitem(s))).append(cl("In city: "+gcity(s))).append(cl("Date: "+gdate(s))).append(cl("Size: "+gsize(s)+" KB","nr")),l=$('<div class="cc"></div>').append(n);if(s[8].length+u[e].length){let t=$('<div class="gr"></div>');if(s[8].length){t.append($("<p><b>"+s[7]+"</b> uses these assets:</p>"));for(let e of s[8])t.append(btn(d[e]))}if(u[e].length){t.append($("<p>These assets use <b>"+s[7]+"</b>:</p>"));for(let s of u[e])t.append(btn(d[s]))}l.append(t)}t.append(l)}$(window).scrollTop(s)}