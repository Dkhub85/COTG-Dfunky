// ==UserScript==
// @name Cotg Dfunky
// @namespace https://github.com/Dkhub85/COTG-Dfunky
// @version 1.0.0
// @description Cotg Dfunky
// @author Dhruv
// @match https://w13.crownofthegods.com
// @match https://w12.crownofthegods.com
// @match https://w11.crownofthegods.com
// @include https://w/*.crownofthegods.com/World*
// @grant none
// @updateURL https://raw.githubusercontent.com/DKhub85/COTG-Dfunky/master/Dfunky.user.js
// @downloadURL https://raw.githubusercontent.com/DKhub85/COTG-Dfunky/master/Dfunky.user.js
// ==/UserScript==

(function() {
	// popup message for players when they open the game.
    $(document).ready(function() {
    var popwin="<div id='HelloWorld' style='width:400px;height:400px;background-color: #E2CBAC;-moz-border-radius: 10px;-webkit-border-radius: 10px;border-radius: 10px;border: 4px ridge #DAA520;position:absolute;right:40%;top:100px; z-index:1000000;'><div class=\"popUpBar\"> <span class=\"ppspan\">Welcome!</span><button id=\"cfunkyX\" onclick=\"$('#HelloWorld').remove();\" class=\"xbutton greenb\"><div id=\"xbuttondiv\"><div><div id=\"centxbuttondiv\"></div></div></div></button></div><div id='hellobody' class=\"popUpWindow\"><span style='margin-left: 5%;'> <h3 style='text-align:center;'>Welcome to Crown Of The Gods!</h3></span><br><br><span style='margin-left: 5%;'> <h4 style='text-align:center;'> DFunky(Cfunky + Dhruv's Raiding helper)</h4></span><br><span style='margin-left: 5%;'> <h4 style='text-align:center;'>Updated 31st August 2018</h4></span><br><br><span style='margin-left: 5%;'><h4>changes:</h4> <ul style='margin-left: 6%;'><li>Added Offensive Troop mailing functionality, Added Shrine zone calculator(was in cfunky) (31 -8-2018)</li></ul></span></div></div>";
        $("body").append(popwin);

        setTimeout(function() {
                            var options = {};
                            $('#HelloWorld').hide( 'drop', options, 2000);
                        }, 5000);


    });
    var ttts=[1,10,1,1,1,1,1,2,2,2,2,2,10,10,100,100,400,1]; //ts per unit
    var citytc;
    var message="Not enough TS to kill this boss!";
    var other_loot=[350,1000,4270,15500,32300,56900,117200,198500,297500,441600]; //forest, hill loot
    var mountain_loot=[350,960,4100,14900,31000,54500,112500,190500,285500,423500];//mountain loot
    var tpicdiv=["guard32 trooptdcm","bally32 trooptdcm","ranger32 trooptdcm","triari32 trooptdcm","priest32 trooptdcm","vanq32 trooptdcm","sorc32 trooptdcm","scout32 trooptdcm","arbal32 trooptdcm","praet32 trooptdcm","horsem32 trooptdcm",
                 "druid32 trooptdcm","ram32 trooptdcm","scorp32 trooptdcm","galley32 trooptdcm","sting32 trooptdcm","wship32 trooptdcm","senat32 trooptdcm"];
    var tpicdiv20=["guard20 trooptdcm","bally20 trooptdcm","ranger20 trooptdcm","triari20 trooptdcm","priest20 trooptdcm","vanq20 trooptdcm","sorc20 trooptdcm","scout20 trooptdcm","arbal20 trooptdcm","praet20 trooptdcm","horsem20 trooptdcm",
                 "druid20 trooptdcm","ram20 trooptdcm","scorp20 trooptdcm","galley20 trooptdcm","sting20 trooptdcm","wship20 trooptdcm","senat20 trooptdcm"];
    var ttspeed=[0,30,20,20,20,20,20,8,10,10,10,10,30,30,5,5,5,40];
    var ttres=[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];
    var ibriafaith=0,ylannafaith=0,naerafaith=0,cyndrosfaith=0,domdisfaith=0,vexifaith=0,meriusfaith=0,evarafaith=0; //alliance faiths
    var ttspeedres=[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];
    var TS_type=[0,0,1,1,1,1,1,0,2,2,2,2,0,0,0,100,400];
    var Total_Combat_Research=[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];
    var naera=0,vexemis=0,cyndros=0,ylanna=0;
    var buildings={name: ["forester","cottage","storehouse","quarry","hideaway","farmhouse","cityguardhouse","barracks","mine","trainingground","marketplace","townhouse","sawmill","stable","stonemason","mage_tower","windmill","temple","smelter","blacksmith",
                       "castle","port","port","port","shipyard","shipyard","shipyard","townhall","castle"],
                   bid: [448,446,464,461,479,447,504,445,465,483,449,481,460,466,462,500,463,482,477,502,"467",488,489,490,491,496,498,455,467]};
    var sum=true;
    var bdcountshow=true;
//    var loot=[0,400,1000,4500,15000,33000,60000,120000,201000,300000,446000]; //cavern loot per lvl
    var bossdef=[625,3750,25000,50000,125000,187500,250000,375000,562500,750000]; //bosses defense value
    var bossdefw=[425,2500,17000,33000,83000,125000,170000,250000,375000,500000]; // bosses defense value for weakness type
    var bossmts=[6,20,100,500,2000,3500,5000,8000,12000,15000]; //minimum TS to send to a boss
    var numbs=[0,0,0];
    var ttloot=[0,0,10,20,10,10,5,0,15,20,15,10,0,0,0,1500,3000];//troop loot
    var ttattack=[10,50,30,10,25,50,70,10,40,60,90,120,50,150,3000,1200,12000]; //troops attack value
    var iscav=[0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0]; //which troop number is cav
    var isinf=[1,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0]; //which troop number is inf
    var ismgc=[0,0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0]; //which troop number is magic
    var isart=[0,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1]; //which troop number is artillery
    var resbonus=[0,0.01,0.03,0.06,0.1,0.15,0.2,0.25,0.3,0.35,0.4,0.45,0.5]; // res bonus to attack power per res rank
    var Res=[0,1,3,6,10,15,20,25,30,35,40,45,50];//research lvl
    var ttname=["Guards","Ballistas","Rangers","Triari","Priestess","Vanquishers","Sorcerers","Scouts","Arbalists","Praetors","Horsemans","Druids","Rams","Scorpions","Galleys","Stingers","Warships","senator"];
    var layoutsl=[""];
    var layoutsw=[""];
    var layoutdf=[""];
    var cdata; //city data return
    var wdata; //world data
    var pldata; //players list on server
    var pdata; //player data
    var poll2; //poll2data
    var clc={};// city lists info
    var oga; //city outgoing attacks info
    var city={cid:0,x:0,y:0,th:[0],cont:0}; //current city data
    var bosses={name:["Cyclops","Andar's Colosseum Challenge","Dragon","Romulus and Remus","Gorgon","GM Gordy","Triton"],
                pic:["cyclops32 mauto bostooltip tooltipstered","andar32 mauto bostooltip tooltipstered","dragon32 mauto bostooltip tooltipstered","romrem32 mauto bostooltip tooltipstered","gorgon32 mauto bostooltip tooltipstered","gmgordy32 mauto bostooltip tooltipstered","triton32 mauto bostooltip tooltipstered"]};
    var bossinfo={x:[],y:[],lvl:[],data:[],name:[],cont:[],distance:[]};
    var key="_`abcdefgh";
    var remarksl=[""];
    var remarksw=[""];
    var remarkdf=[""];
    var troopcounw=[[]];
    var troopcounl=[[]];
    var resw=[[]];
    var resl=[[]];
    var notesl=[""];
    var notesw=[""];
    var notedf=[""];
    var emptyspots=",.;:#-T";
    var beentoworld=false;
    var splayers={name:[],ally:[],cities:[]};
    var shrinec=[[]];
    var buildingdata;
	var coofz;
    var coon;
    //getting city lists
    $(document).ready(function() {
        setTimeout(function() {
            var a=$("#organiser > option");
            var l=a.length;
            for  (var i=0; i<l;i++) {
                var temp=String($(a[i]).attr("value"));
                $("#organiser").val(temp).change();
                clc[temp]=[];
                var tempcl=$("#cityDropdownMenu > option");
                var ll=tempcl.length;
                if (cdata.cg.indexOf(temp)>-1) {
                    clc[temp].push($(tempcl[0]).attr("value"));
                }
                if (ll>1) {
                    for (var j=1;j<ll;j++) {
                        clc[temp].push($(tempcl[j]).attr("value"));
                    }
                }
            }
            $("#organiser").val("all").change();
        },4000);
    });
    setTimeout(function() {
        (function(open) {
        XMLHttpRequest.prototype.open = function() {
            this.addEventListener("readystatechange", function() {
                if(this.readyState==4) {
                    var url=this.responseURL;
                    if (url.indexOf('gC.php')!=-1) {
                        cdata=JSON.parse(this.response);
                        city.cid=cdata.cid;
                        city.th=cdata.th;
                        citytc=cdata.th;
			buildingdata=cdata.bd;
                        city.x=Number(city.cid % 65536);
                        city.y=Number((city.cid-city.x)/65536);
                        city.cont=Number(Math.floor(city.x/100)+10*Math.floor(city.y/100));
                        city.mo=cdata.mo;
                        setTimeout(function(){
                            updateattack();
                            updatedef();
                        }, 2000);
                        makebuildcount();
			    coonvalue();
                    }
                     if (url.indexOf('gWrd.php')!=-1) {
                        wdata=JSON.parse(this.response);
                        beentoworld=true;
                        wdata=decwdata(wdata.a);
                        getbossinfo();
                    }
                    if (url.indexOf('gPlA.php')!=-1) {
                        pldata=JSON.parse(this.response);
                    }
                    if (url.indexOf('poll2.php')!=-1) {
                        if(poll2) {
                        var saveclc=poll2.player.clc;
                        var saveoga=poll2.OGA;
                        }
                        poll2=JSON.parse(this.response);
                        city.x=Number(poll2.city.cid % 65536);
                        city.y=Number((poll2.city.cid-city.x)/65536);
                        city.cont=Number(Math.floor(city.x/100)+10*Math.floor(city.y/100));
                        if ('OGA' in poll2) {

                        } else {
                            poll2.OGA=saveoga;
                        }
                        if ('bd' in poll2.city) {
                            makebuildcount();
                        }
                        if ('clc' in poll2.player) {

                        } else {
                            poll2.player.clc=saveclc;
                        }
                        if ($( "#warcouncTabs" ).tabs( "option", "active" )==2) {
                            var idle="<table id='idleunits' class='beigetablescrollp'><tbody><tr><td style='text-align: center;'><span>Idle troops:</span></td>";
                            for (var i in poll2.city.th) {
                                var notallow=[0,1,7,12,13];
                                if (notallow.indexOf(i)==-1) {
                                    if (poll2.city.th[i]>0) {
                                        idle+="<td><div class='"+tpicdiv[i]+"' style='text-align: right;'></div></td><td style='text-align: left;'><span id='thbr"+i+"' style='text-align: left;'>"+poll2.city.th[i]+"</span></td>";
                                    }
                                }
                            }
                            idle+="</tbody></table>";
                            $("#idletroops").html(idle);
                        }
                    }
                }
            }, false);
            open.apply(this, arguments);
        };
    })(XMLHttpRequest.prototype.open);
    },4000);
    //decoding world data in the new format
    function decwdata(data) {
        var DecData = {bosses:[],cities:[],ll:[],cavern:[],portals:[],shrines:[]},
            temp = data.split("|"),
            keys = temp[1].split("l"),
            ckey = keys[0],
            skey = keys[1],
            bkey = keys[2],
            lkey = keys[3],
            cavkey = keys[4],
            pkey = keys[5],
            cities = temp[0].split("l"),
            shrines = temp[2].split("l"),
            bosses = temp[3].split("l"),
            lawless = temp[4].split("l"),
            caverns = temp[5].split("l"),
            portals = temp[6].split("l"),
            dat = 0;
        for (var i in bosses) {
            dat = (Number(bosses[i]) + Number(bkey)) + "";
            bkey=dat;
            DecData.bosses.push("1" + dat);
        }
        for (var i in cities) {
            dat = (Number(cities[i]) + Number(ckey)) + "";
            ckey=dat;
            DecData.cities.push("2" + dat);
        }
        for (var i in lawless) {
            dat = (Number(lawless[i]) + Number(lkey)) + "";
            lkey=dat;
            DecData.ll.push("3" + dat);
        }
        for (var i in caverns) {
            dat = (Number(caverns[i]) + Number(cavkey)) + "";
            cavkey=dat;
            DecData.cavern.push("7" + dat);
        }
        for (var i in portals) {
            dat = (Number(portals[i]) + Number(pkey)) + "";
            pkey=dat;
            DecData.portals.push("8" + dat);
        }
        for (var i in shrines) {
            dat = (Number(shrines[i]) + Number(skey))+ "";
            skey=dat;
            DecData.shrines.push("9" + dat);
        }
        return DecData;
    }
    //getting date
    function getFormattedDate(date) {
        var year = date.getFullYear();
        var month = (1 + date.getMonth()).toString();
        month = month.length > 1 ? month : '0' + month;
        var day = date.getDate().toString();
        day = day.length > 1 ? day : '0' + day;
        return month + '/' + day + '/' + year;
    }
        //rounds nubers to second digit after decimal
    function roundToTwo(num) {
        return +(Math.round(num + "e+2")  + "e-2");
    }
/*    function errormsgBR(a, b) {
        $(a).show();
        $(b).animate({ opacity: 1, bottom: "+10px" }, 'slow');
        errormsgBRhide(a, b);
    }
    function errormsgBRhide(a, b) {
        setTimeout(function(){
            $(b).animate({ opacity: 0, bottom: "-10px" }, 'slow');
            $(a).fadeOut("slow");
        }, 5000);
        setTimeout(function(){
            $(a).remove();
        }, 6000);
    }
    var errmBR=0;
    var message="Error, you need at least ";*/

    var errz=0;
    function errorgo(j) {
        var errormsgs;
        errz = errz+1;
        var b = 'errBR' +errz;
        var c = '#' +b;
        var d = '#' +b+ ' div';
        errormsgs = '<tr ID = "' +b+ '"><td><div class = "errBR">' +j+ '<div></td></tr>';
        $("#errorBRpopup").append(errormsgs);
        $(c).show();
        $(d).animate({ opacity: 1, bottom: "+10px" }, 'slow');
        setTimeout(function(){
            $(d).animate({ opacity: 0, bottom: "-10px" }, 'slow');
            $(c).fadeOut("slow");
        }, 5000);
        setTimeout(function(){
            $(c).remove();
        }, 6000);
    }
 /*   function errorgo(j) {
        var errormsgs;
        errmBR = errmBR+1;
        var b = 'errBR' +errmBR;
        var c = '#' +b;
        var d = '#' +b+ ' div';
        errormsgs = '<tr ID = "' +b+ '"><td><div class = "errBR">' +j+ '<div></td></tr>';
        $("#errorBRpopup").append(errormsgs);
        errormsgBR(c, d);
    }
    */
    String.prototype.replaceAt=function(index, char) {
        var a = this.split("");
        a[index] = char;
        return a.join("");
    };
    String.prototype.decrypt=function() {
    var a=this;
    for (var i in a) {
        for (var j in key) {
            if (a.charAt(i)==key.charAt(j)) {
                a=a.replaceAt(i,j);
            }
        }
    }
    return a;
    };
    //getting faith and research bonuses, attack,defence,boss tabs
    $(document).ready(function() {
        jQuery.ajax({url: 'includes/gaLoy.php',type: 'POST',aysnc:false,
                         success: function(data) {
                             var ldata=JSON.parse(data);
                             setloyal(ldata);
                         }
                        });
        var reslvl;
        function setloyal(ldata) {
            var faith=0;
            //domdis
            $.each(ldata.t, function(key, value) {
                if (key==1) {
                    $.each(this, function(key, value) {
                        evarafaith+=this.f;
                    });
                }
                if (key==2) {
                    $.each(this, function(key, value) {
                        vexifaith+=this.f;
                    });
                }
                if (key==3) {
                    $.each(this, function(key, value) {
                        domdisfaith+=this.f;
                    });
                }
                if (key==4) {
                    $.each(this, function(key, value) {
                        cyndrosfaith+=this.f;
                    });
                }
                if (key==5) {
                    $.each(this, function(key, value) {
                        meriusfaith+=this.f;
                    });
                }
                if (key==6) {
                    $.each(this, function(key, value) {
                        ylannafaith+=this.f;
                    });
                }
                if (key==7) {
                    $.each(this, function(key, value) {
                        ibriafaith+=this.f;
                    });
                }
                if (key==8) {
                    $.each(this, function(key, value) {
                        naerafaith+=this.f;
                    });
                }
            });
            ylannafaith=Math.min(ylannafaith,100);
            naerafaith=Math.min(naerafaith,100);
            vexifaith=Math.min(vexifaith,100);
            cyndrosfaith=Math.min(cyndrosfaith,100);
            domdisfaith=Math.min(domdisfaith,100);
            ibriafaith=Math.min(ibriafaith,100);
            evarafaith=Math.min(evarafaith,100);
            meriusfaith=Math.min(meriusfaith,100);
             var research= cotg.player.research();
           //attack power faith bonuses      
             setTimeout(function() {
             ttres[0]+=((Number(naerafaith)*0.5)/100)+(Number(Res[research[29]])/100);//guards
             ttres[1]+=((Number(naerafaith)*0.5)/100)+(Number(Res[research[42]])/100);//ballista
             ttres[2]+=((Number(naerafaith)*0.5)/100)+(Number(Res[research[30]])/100);//ranger
             ttres[3]+=((Number(naerafaith)*0.5)/100)+(Number(Res[research[31]])/100);//triari
             ttres[4]+=((Number(naerafaith)*0.5)/100)+(Number(Res[research[32]])/100);//priestess
             ttres[5]+=((Number(vexifaith)*0.5)/100)+(Number(Res[research[33]])/100);//vanq
             ttres[6]+=((Number(vexifaith)*0.5)/100)+(Number(Res[research[34]])/100);//sorc
             ttres[7]+=((Number(vexifaith)*0.5)/100)+(Number(Res[research[46]])/100);//scout
             ttres[8]+=((Number(naerafaith)*0.5)/100)+(Number(Res[research[35]])/100);//arb
             ttres[9]+=((Number(naerafaith)*0.5)/100)+(Number(Res[research[36]])/100);//pra
             ttres[10]+=((Number(vexifaith)*0.5)/100)+(Number(Res[research[37]])/100);//horse
             ttres[11]+=((Number(vexifaith)*0.5)/100)+(Number(Res[research[38]])/100);//druid
             ttres[12]+=((Number(cyndrosfaith)*0.5)/100)+(Number(Res[research[39]])/100);//ram
             ttres[13]+=((Number(cyndrosfaith)*0.5)/100)+(Number(Res[research[41]])/100);//scorp
             ttres[14]+=((Number(ylannafaith)*0.5)/100)+(Number(Res[research[44]])/100);//galley
             ttres[15]+=((Number(ylannafaith)*0.5)/100)+(Number(Res[research[43]])/100);//stinger
             ttres[16]+=((Number(cyndrosfaith)*0.5)/100)+(Number(Res[research[45]])/100);//warship
             //faith travel speed bonuses
             ttspeedres[1]+=((Number(domdisfaith)*0.5)/100)+(Number(Res[research[12]])/100);
             ttspeedres[2]+=((Number(ibriafaith)*0.5)/100)+(Number(Res[research[8]])/100);
             ttspeedres[3]+=((Number(ibriafaith)*0.5)/100)+(Number(Res[research[8]])/100);
             ttspeedres[4]+=((Number(ibriafaith)*0.5)/100)+(Number(Res[research[8]])/100);
             ttspeedres[5]+=((Number(ibriafaith)*0.5)/100)+(Number(Res[research[8]])/100);
             ttspeedres[6]+=((Number(ibriafaith)*0.5)/100)+(Number(Res[research[8]])/100);
             ttspeedres[7]+=((Number(ibriafaith)*0.5)/100)+(Number(Res[research[11]])/100);
             ttspeedres[8]+=((Number(ibriafaith)*0.5)/100)+(Number(Res[research[9]])/100);
             ttspeedres[9]+=((Number(ibriafaith)*0.5)/100)+(Number(Res[research[9]])/100);
             ttspeedres[10]+=((Number(ibriafaith)*0.5)/100)+(Number(Res[research[9]])/100);
             ttspeedres[11]+=((Number(ibriafaith)*0.5)/100)+(Number(Res[research[9]])/100);
             ttspeedres[12]+=((Number(domdisfaith)*0.5)/100)+(Number(Res[research[12]])/100);
             ttspeedres[13]+=((Number(domdisfaith)*0.5)/100)+(Number(Res[research[12]])/100);
             ttspeedres[14]+=((Number(domdisfaith)*0.5)/100)+(Number(Res[research[13]])/100);
             ttspeedres[15]+=((Number(domdisfaith)*0.5)/100)+(Number(Res[research[13]])/100);
             ttspeedres[16]+=((Number(domdisfaith)*0.5)/100)+(Number(Res[research[13]])/100);
             ttspeedres[17]+=((Number(domdisfaith)*0.5)/100)+(Number(Res[research[14]])/100);
             },2000);
         }
        jQuery.ajax({url: 'includes/pD.php',type: 'POST',aysnc:false,
                      success: function(data) {
                          pdata=JSON.parse(data);
                      }
                     });
         setTimeout(function(){
             var cid=$("#cityDropdownMenu").val();
             var dat={a:cid};
             jQuery.ajax({url: 'includes/gC.php',type: 'POST',aysnc:false, data: dat});
         },5000);
        //buttons
        var returnAllbut="<button id='returnAllb' style='right: 35.6%; margin-top: 55px;width: 150px;height: 30px !important; font-size: 12px !important; position: absolute;' class='regButton greenb'>Return All</button>";
        var raidbossbut="<button id='raidbossGo' style='left: 65%;margin-left: 10px;margin-top: 15px;width: 150px;height: 30px !important; font-size: 12px !important; position: absolute;' class='regButton greenb'>Locate Bosses</button>";
        var attackbut="<button id='attackGo' style='margin-left: 25px;margin-top: 55px;width: 150px;height: 30px !important; font-size: 12px !important; position: absolute;' class='regButton greenb'>Attack Sender</button>";
        var defbut="<button id='defGo' style='left: 65%;margin-left: 10px;margin-top: 55px;width: 150px;height: 30px !important; font-size: 12px !important; position: absolute;' class='regButton greenb'>Defense Sender</button>";
        var quickdefbut="<button id='quickdefCityGo' style='width:96%; margin-top:2%; margin-left:2%;' class='regButton greenbuttonGo greenb'>@ Quick Reinforcements @</button>";
        var neardefbut="<button id='ndefGo' style='left: 4%;margin-left: 3px;margin-top: 95px;width: 150px;height: 30px !important; font-size: 12px !important; position: absolute;' class='regButton greenb'> Nearest Defense</button>";
        var nearoffbut="<button id='noffGo' style='right: 35.6%; margin-top: 95px;width: 150px;height: 30px !important; font-size: 12px !important; position: absolute;' class='regButton greenb'> Offensive list</button>";
        var addtoatt="<button id='addtoAtt' style='margin-left: 7%;margin-top: -5%;width: 40%;height: 26px !important; font-size: 9px !important;' class='regButton greenb'>Add to Attack Sender</button>";
        var addtodef="<button id='addtoDef' style='margin-left: 7%;width: 40%;height: 26px !important; font-size: 9px !important;' class='regButton greenb'>Add to Defense Sender</button>";
	//bosstab
        var bosstab="<li id='bosshuntab' class='ui-state-default ui-corner-top' role='tab' tabindex='-1' aria-controls='warBossmanager'";
        bosstab+="aria-labeledby='ui-id-20' aria-selected='false' aria-expanded='false'>";
        bosstab+="<a href='#warBossmanager' class='ui-tabs-anchor' role='presentation' tabindex='-1' id='ui-id-20'>Find Bosses</a></li>";
        var bosstabbody="<div id='warBossmanager' aria-labeledby='ui-id-20' class='ui-tabs-panel ui-widget-content ui-corner-bottom' ";
        bosstabbody+=" role='tabpanel' aria-hidden='true' style='display: none;'><div id='fpdcdiv3' class='redheading' style='margin-left: 2%;' >CFunky's Boss Raiding tool:</div>";
        bosstabbody+="<div id='bossbox' class='beigemenutable scroll-pane' style='width: 96%; height: 85%; margin-left: 2%;'></div>";
        bosstabbody+="<div id='idletroops'></div></div>";
        //attack tab
        var attacktab="<li id='attacktab' class='ui-state-default ui-corner-top' role='tab' tabindex='-1' aria-controls='warAttackmanager'";
        attacktab+="aria-labeledby='ui-id-21' aria-selected='false' aria-expanded='false'>";
        attacktab+="<a href='#warAttackmanager' class='ui-tabs-anchor' role='presentation' tabindex='-1' id='ui-id-21'>Attack</a></li>";
        //attack body
        var attacktabbody="<div id='warAttackmanager' aria-labeledby='ui-id-21' class='ui-tabs-panel ui-widget-content ui-corner-bottom' ";
        attacktabbody+=" role='tabpanel' aria-hidden='true' style='display: none;'><div id='fpdcdiv3' class='redheading' style='margin-left: 2%;' >Attack Sender:</div>";
        attacktabbody+="<div id='attackbox' class='beigemenutable scroll-pane' style='width: 53%; height: 50%; float:left; margin-left: 1%; margin-right: 1%;'>";
        attacktabbody+="<table><thead><th></th><th>X</th><th>Y</th><th>Type</th></thead><tbody>";
        for (var i=1;i<16;i++) {
            attacktabbody+="<tr><td>Target "+i+" </td><td><input id='t"+i+"x' type='number' style='width: 85%'></td><td><input id='t"+i+"y' type='number' style='width: 85%'></td>";
            attacktabbody+="<td><select id='type"+i+"' class='greensel' style='font-size: 15px !important;width:95%;height:30px;'><option value='0'>Fake</option><option value='1'>Real</option></select></td></tr>";
        }
        attacktabbody+="</tbody></table></div>";
        attacktabbody+="<div id='picktype' class='beigemenutable scroll-pane' style='width: 43%; height: 50%;'></div>";
        attacktabbody+="<table><tr><td><span>Use percentage of troops:</span></td><td><input id='perc' type='number' style='width: 30px'>%</td><td></td></tr>";
        attacktabbody+="<tr><td><span>Send real as:</span></td><td><select id='realtype' class='greensel' style='font-size: 15px !important;width:95%;height:30px;'>";
        attacktabbody+="<option value='0'>Assault</option><option value='1'>Siege</option><option value='2'>Plunder</option><option value='3'>Scout</option></select></td><td></td></tr>";
        attacktabbody+="<tr><td><span>Send fake as:</span></td><td><select id='faketype' class='greensel' style='font-size: 15px !important;width:95%;height:30px;'>";
        attacktabbody+="<option value='0'>Assault</option><option value='1'>Siege</option><option value='2'>Plunder</option><option value='3'>Scout</option></select></td><td></td></tr>";
        attacktabbody+="<tr><td><input id='retcheck' class='clsubopti' type='checkbox' checked> Return all Troops</td><td colspan=2><input id='retHr' type='number' style='width: 20px' value='2'> Hours before attack</td></tr>";
        attacktabbody+="<tr><td><input id='scoutick' class='clsubopti' type='checkbox' checked>30galleys/1scout fake</td></tr></table>";
        attacktabbody+="<table style='width:96%;margin-left:2%'><thead><tr style='text-align:center;'><th></th><th>Hr</th><th>Min</th><th>Sec</th><th colspan='2'>Date</th></tr>";
        attacktabbody+="<tr><td>Set Time: </td><td><input id='attackHr' type='number' style='width: 35px;height: 22px;font-size: 10px;' value='10'></td><td><input id='attackMin' style='width: 35px;height: 22px;font-size: 10px;' type='number' value='00'></td>";
        attacktabbody+="<td><input style='width: 35px;height: 22px;font-size: 10px;' id='attackSec' type='number' value='00'></td><td colspan='2'><input style='width:90px;' id='attackDat' type='text' value='00/00/0000'></td></tr></tbody></table>";
        attacktabbody+="<table style='margin-left: 10%; margin-top:20px;'><tbody><tr><td style='width: 20%'><button id='Attack' style='width: 95%;height: 30px !important; font-size: 12px !important;' class='regButton greenb'>Attack!</button></td>";
        attacktabbody+="<td style='width: 20%'><button id='Aexport' style='width: 95%;height: 30px !important; font-size: 12px !important;' class='regButton greenb'>Export Order</button></td>";
        attacktabbody+="<td style='width: 20%'><button id='Aimport' style='width: 95%;height: 30px !important; font-size: 12px !important;' class='regButton greenb'>Import Order</button></td></tr></tbody></table>";
        // defend tab
        var deftab="<li id='deftab' class='ui-state-default ui-corner-top' role='tab' tabindex='-1' aria-controls='warDefmanager'";
        deftab+="aria-labeledby='ui-id-22' aria-selected='false' aria-expanded='false'>";
        deftab+="<a href='#warDefmanager' class='ui-tabs-anchor' role='presentation' tabindex='-1' id='ui-id-22'>Defend</a></li>";
        //defense body
        var deftabbbody="<div id='warDefmanager' aria-labeledby='ui-id-21' class='ui-tabs-panel ui-widget-content ui-corner-bottom' ";
        deftabbbody+=" role='tabpanel' aria-hidden='true' style='display: none;'><div id='fpdcdiv3' class='redheading' style='margin-left: 2%;' >Defense Sender:</div>";
        deftabbbody+="<div><p style='font-size: 10px;'>Defense sender will split all the troops you choose to send according to the number of targets you input.</p></div>";
        deftabbbody+="<div id='defbox' class='beigemenutable scroll-pane' style='width: 53%; height: 50%; float:left; margin-left: 1%; margin-right: 1%;'>";
        deftabbbody+="<table><thead><th></th><th>X</th><th>Y</th></thead><tbody>";
        for (var i=1;i<15;i++) {
            deftabbbody+="<tr><td>Target "+i+" </td><td><input id='d"+i+"x' type='number' style='width: 85%'></td><td><input id='d"+i+"y' type='number' style='width: 85%'></td></tr>";
        }
        deftabbbody+="</tbody></table></div>";
        deftabbbody+="<div id='dpicktype' class='beigemenutable scroll-pane' style='width: 43%; height: 50%;'></div>";
        deftabbbody+="<table><tr><td><span>Use percentage of troops:</span></td><td><input id='defperc' type='number' style='width: 30px'>%</td><td></td></tr>";
        deftabbbody+="<tr><td><span>Select Departure:</span></td><td><select id='defdeparture' class='greensel' style='font-size: 15px !important;width:95%;height:30px;'>";
        deftabbbody+="<option value='0'>Now</option><option value='1'>Departure time</option><option value='2'>Arrival time</option></select></td><td></td></tr>";
        deftabbbody+="<tr id='dret'><td><input id='dretcheck' class='clsubopti' type='checkbox' checked> Return all Troops</td><td colspan=2><input id='dretHr' type='number' style='width: 20px' value='2'> Hours before departure</td></tr></table>";
        deftabbbody+="<table id='deftime' style='width:96%;margin-left:2%'><thead><tr style='text-align:center;'><th></th><th>Hr</th><th>Min</th><th>Sec</th><th colspan='2'>Date</th></tr>";
        deftabbbody+="<tr><td>Set Time: </td><td><input id='defHr' type='number' style='width: 35px;height: 22px;font-size: 10px;' value='10'></td><td><input id='defMin' style='width: 35px;height: 22px;font-size: 10px;' type='number' value='00'></td>";
        deftabbbody+="<td><input style='width: 35px;height: 22px;font-size: 10px;' id='defSec' type='number' value='00'></td><td colspan='2'><input style='width:90px;' id='defDat' type='text' value='00/00/0000'></td></tr></tbody></table>";
        deftabbbody+="<button id='Defend' style='width: 35%;height: 30px; font-size: 12px; margin:10px;' class='regButton greenb'>Send Defense</button>";
        //deftabbbody+="<table style='margin-left: 10%; margin-top:20px;'><tbody><tr><td style='width: 20%'><button id='Defend' style='width: 95%;height: 30px !important; font-size: 12px !important;' class='regButton greenb'>Send Defense</button></td>";
        //deftabbbody+="</tr></tbody></table>";
	    var ndeftab="<li id='neardeftab' class='ui-state-default ui-corner-top' role='tab'>";
        ndeftab+="<a href='#warNdefmanager' class='ui-tabs-anchor' role='presentation'>Near Def</a></li>";
        var ndeftabbody="<div id='warNdefmanager' class='ui-tabs-panel ui-widget-content ui-corner-bottom' ";
        ndeftabbody+=" role='tabpanel' style='display: none;'><div id='fpdcdiv3' class='redheading' style='margin-left: 2%;' >Nearest defense:</div>";
        ndeftabbody+="<table><td>Choose city:</td><td><input style='width: 30px;height: 22px;font-size: 10px;' id='ndefx' type='number'> : <input style='width: 30px;height: 22px;font-size: 10px;' id='ndefy' type='number'></td>";
        ndeftabbody+="<td>Showing For:</td><td id='asdfgh' class='coordblink shcitt'></td>";        
        ndeftabbody+="<td><button class='regButton greenb' id='ndefup' style='height:30px; width:70px;'>Update</button></td></table>";
        ndeftabbody+="<div id='Ndefbox' class='beigemenutable scroll-pane' style='width: 96%; height: 85%; margin-left: 2%;'></div>";
        var nofftab="<li id='nearofftab' class='ui-state-default ui-corner-top' role='tab'>";
        nofftab+="<a href='#warNoffmanager' class='ui-tabs-anchor' role='presentation'>Offensive TS</a></li>";
        var nofftabbody="<div id='warNoffmanager' class='ui-tabs-panel ui-widget-content ui-corner-bottom' ";
        nofftabbody+=" role='tabpanel' style='display: none;'><div id='fpdcdiv3' class='redheading' style='margin-left: 2%;' >ALL Offensive TS:</div>";
        nofftabbody+="<table><td colspan='2'> Continent(99 for navy):</td><td><input style='width: 30px;height: 22px;font-size: 10px;' id='noffx' type='number' value='0'>";
        nofftabbody+="<td><button class='regButton greenb' id='noffup' style='height:30px; width:70px;'>Update</button></td>";
        nofftabbody+="<td id='asdfg' style='width:10% !important;'></td><td><button class='regButton greenb' id='mailoff' style='height:30px; width:50px;'>Mail</button></td><td><input style='width: 100px;height: 22px;font-size: 10px;' id='mailname' type='text' value='Name_here;'></table>"
        nofftabbody+="<div id='Noffbox' class='beigemenutable scroll-pane' style='width: 96%; height: 85%; margin-left: 2%;'></div>";
        var expwin="<div id='ExpImp' style='width:250px;height:200px;' class='popUpBox ui-draggable'><div class=\"popUpBar\"><span class=\"ppspan\">Import/Export attack orders</span>";
        expwin+="<button id=\"cfunkyX\" onclick=\"$('#ExpImp').remove();\" class=\"xbutton greenb\"><div id=\"xbuttondiv\"><div><div id=\"centxbuttondiv\"></div></div></div></button></div><div id='expbody' class=\"popUpWindow\">";
        expwin+="<textarea style='font-size:11px;width:97%;margin-left:1%;height:17%;' id='expstring' maxlength='200'></textarea><button id='applyExp' style='margin-left: 15px; width: 100px;height: 30px !important; font-size: 12px !important;' class='regButton greenb'>Apply</button></div></div>";

        var tabs = $( "#warcouncTabs" ).tabs();
        var ul = tabs.find( "ul" );
        $( bosstab ).appendTo( ul );
        $( attacktab ).appendTo( ul );
        $( deftab ).appendTo( ul );
        $( ndeftab ).appendTo( ul );
        $( nofftab ).appendTo( ul );
        tabs.tabs( "refresh" );
        $('#warCidlemanager').after(bosstabbody);
        $('#warCidlemanager').after(attacktabbody);
        $('#warAttackmanager').after(deftabbbody);
        $('#warDefmanager').after(ndeftabbody);
        $('#warNdefmanager').after(nofftabbody);
	    $("#senddefCityGo").after(quickdefbut);
        $("#deftime").hide();
        $("#dret").hide();
        
        $("#warCounc").append(returnAllbut);
        $("#warCounc").append(attackbut);
        $("#warCounc").append(defbut);
        $("#warCounc").append(neardefbut);
        $("#warCounc").append(nearoffbut);
        $("#coordstochatGo1").after(addtoatt);
        $("#addtoAtt").after(addtodef);
        $("#loccavwarconGo").css("right","65%");
        $("#idluniwarconGo").css("left","34%");
        $("#idluniwarconGo").after(raidbossbut);
        
        $("#defdeparture").change(function() {
           if ($("#defdeparture").val()==0) {
               $("#deftime").hide();
               $("#dret").hide();
           } else {
               $("#deftime").show();
               $("#dret").show();
           }
        });

        if (localStorage.getItem('attperc')) {
            $("#perc").val(localStorage.getItem('attperc'));
        } else {$("#perc").val(99);}
        if (localStorage.getItem('defperc')) {
            $("#defperc").val(localStorage.getItem('defperc'));
        } else {$("#defperc").val(99);}
        if (localStorage.getItem('retcheck')) {
            if (localStorage.getItem('retcheck')==1) {
                $("#retcheck").prop( "checked", true );
            }
            if (localStorage.getItem('retcheck')==0) {
                $("#retcheck").prop( "checked", false );
            }
        }
        if (localStorage.getItem('dretcheck')) {
            if (localStorage.getItem('rdetcheck')==1) {
                $("#dretcheck").prop( "checked", true );
            }
            if (localStorage.getItem('dretcheck')==0) {
                $("#dretcheck").prop( "checked", false );
            }
        }
        if (localStorage.getItem('retHr')) {
            $("#retHr").val(localStorage.getItem('retHr'));
        }
        if (localStorage.getItem('dretHr')) {
            $("#dretHr").val(localStorage.getItem('dretHr'));
        }
        $( "#attackDat" ).datepicker();
        $( "#defDat" ).datepicker();
         $('#bosshuntab').click(function() {
            if (beentoworld)
            {
                openbosswin();
            } else {
                alert("Press World Button");
            }
        });
        $('#returnAllb').click(function() {
            jQuery.ajax({url: 'includes/gIDl.php',type: 'POST',aysnc:false,
                         success: function(data) {
                             var thdata=JSON.parse(data);
                             $("#returnAll").remove();
                             openreturnwin(thdata);
                         }
                        });
        });
        $('#raidbossGo').click(function() {
            if (beentoworld)
            {
                $("#warcouncbox").show();
                tabs.tabs( "option", "active", 2 );
                $("#bosshuntab").click();
            } else {
                alert("Press World Button");
            }
        });
        $("#Attack").click(function() {
            localStorage.setItem('attperc',$("#perc").val());
            localStorage.setItem('retHr',$("#retHr").val());
            if ($("#retcheck").prop( "checked")==true) {
                localStorage.setItem('retcheck',1);
            }
            if ($("#retcheck").prop( "checked")==false) {
                localStorage.setItem('retcheck',0);
            }
            SendAttack();
        });
        $("#Defend").click(function() {
            localStorage.setItem('defperc',$("#defperc").val());
            localStorage.setItem('dretHr',$("#dretHr").val());
            var defobj={targets:{x:[],y:[],dist:[],numb:0,cstr:[]},t:{tot:[],home:[],type:[],use:[],speed:[],amount:[]},perc:$("#defperc").val(),dep:$("#defdeparture").val(),ret:1,rettime:$("#dretHr").val(),hr:$("#defHr").val(),min:$("#defMin").val(),sec:$("#defSec").val(),date:$("#defDat").val(),dat:$("#defDat").datepicker('getDate')};
            if ($("#dretcheck").prop( "checked")==true) {
                localStorage.setItem('dretcheck',1);
                defobj.ret=1;
            }
            if ($("#dretcheck").prop( "checked")==false) {
                localStorage.setItem('dretcheck',0);
                defobj.ret=0;
            }
            var tempx;
            var tempy;
            for (var i=1;i<15;i++) {
                if ($("#d"+i+"x").val()) {
                    tempx=$("#d"+i+"x").val();
                    tempy=$("#d"+i+"y").val();
                    //console.log(tempx,tempy);
                    defobj.targets.x.push(tempx);
                    defobj.targets.y.push(tempy);
                    defobj.targets.cstr.push(tempx+":"+tempy);
                    defobj.targets.dist.push(Math.sqrt((tempx-city.x)*(tempx-city.x)+(tempy-city.y)*(tempy-city.y)));
                    defobj.targets.numb++;
                }
            }
            for (var i in poll2.city.tc) {
                if (poll2.city.tc[i]) {
                    defobj.t.tot.push(Math.ceil(poll2.city.tc[i]*Number($("#defperc").val())/100));
                    defobj.t.home.push(Math.ceil(poll2.city.th[i]*Number($("#defperc").val())/100));
                    defobj.t.type.push(Number(i));
                    if ($("#usedef"+i).prop( "checked")==true) {
                        defobj.t.speed.push(ttspeed[i]/ttspeedres[i]);
                        defobj.t.use.push(1);
                    } else {
                        defobj.t.speed.push(0)
                        defobj.t.use.push(0);
                    }
                    defobj.t.amount.push(0);
                }
            }
            SendDef(defobj);
        });
        $('#attackGo').click(function() {
            $("#warcouncbox").show();
            tabs.tabs( "option", "active", 3 );
            jQuery("#attacktab")[0].click();
        });
        $('#defGo').click(function() {
            $("#warcouncbox").show();
            tabs.tabs( "option", "active", 4 );
            $("#deftab").click();
        });
	    $('#ndefGo').click(function() {
            cotgsubscribe.subscribe( "regional", function( data ) {
                //do something with chat
                var x=data.x;
                var y=data.y;
                var info=data.info;
                $("#ndefx").val(x);
                $("#ndefy").val(y);
            });
            $("#warcouncbox").show();
            tabs.tabs( "option", "active", 5 );
            $("#neardeftab").trigger({type:"click",originalEvent:"1"});
        });
        $('#neardeftab').click(function() {
            cotgsubscribe.subscribe( "regional", function( data ) {
                //do something with chat
                var x=data.x;
                var y=data.y;
                var info=data.info;
                $("#ndefx").val(x);
                $("#ndefy").val(y);
            });
        });
        $('#ui-id-115').click(function() {
            cotgsubscribe.subscribe( "regional", function( data ) {
                //do something with chat
                var x=data.x;
                var y=data.y;
                var info=data.info;
                $("#ndefx").val(x);
                $("#ndefy").val(y);
            });
        });
        $('#noffGo').click(function() {
            $("#warcouncbox").show();
            tabs.tabs( "option", "active", 6 );
            $("#nearofftab").trigger({type:"click",originalEvent:"1"});
        });
        $("#addtoAtt").click(function() {
            for (var i=1;i<8;i++) {
                if (!$("#t"+i+"x").val()) {
                    var tid=Number($("#showReportsGo").attr("data"));
                    var tempx;
                    var tempy;
                    tempx=Number(tid % 65536);
                    tempy=Number((tid-tempx)/65536);
                    $("#t"+i+"x").val(tempx);
                    $("#t"+i+"y").val(tempy);
                    break;
                }
            }
        });
        $("#addtoDef").click(function() {
            for (var i=1;i<15;i++) {
                if (!$("#d"+i+"x").val()) {
                    var tid=Number($("#showReportsGo").attr("data"));
                    var tempx;
                    var tempy;
                    tempx=Number(tid % 65536);
                    tempy=Number((tid-tempx)/65536);
                    $("#d"+i+"x").val(tempx);
                    $("#d"+i+"y").val(tempy);
                    break;
                }
            }
        });
		$("#quickdefCityGo").click(function() {
            var tid=Number($("#showReportsGo").attr("data"));
            var tempx;
            var tempy;
            tempx=Number(tid % 65536);
            tempy=Number((tid-tempx)/65536);
            var defobj={targets:{x:[tempx],y:[tempy],dist:[],numb:1},t:{home:[],type:[],use:[],speed:[],amount:[]},perc:100,dep:0,ret:0,rettime:0,hr:0,min:0,sec:0,dat:0};
            defobj.targets.dist.push(Math.sqrt((tempx-city.x)*(tempx-city.x)+(tempy-city.y)*(tempy-city.y)));
            for (var i in city.th) {
                if (city.th[i]) {
                    defobj.t.home.push(Math.ceil(city.th[i]*Number($("#defperc").val())/100));
                    defobj.t.type.push(Number(i));
                    defobj.t.speed.push(ttspeed[i]/ttspeedres[i]);
                    defobj.t.use.push(1);
                    defobj.t.amount.push(0);
                }
            }
            SendDef(defobj);
        });
        $("#ndefup").click(function() {
            var tempxs=Number($("#ndefx").val());
            var tempys=Number($("#ndefy").val());
            var tids = tempxs + (tempys*65536);
            $("#asdfgh").data(tids);
            $("#asdfgh").text(tempxs+":"+tempys);
            jQuery.ajax({url: 'overview/trpover.php',type: 'POST',aysnc:false,
                         success: function(data) {
                             var t=JSON.parse(data);
                             neardeftable(t);
                         }
                        });
        });
        $("#noffup").click(function() {
            jQuery.ajax({url: 'overview/trpover.php',type: 'POST',aysnc:false,
                         success: function(data) {
                             var t=JSON.parse(data);
                             nearofftable(t);
                         }
                        });
                    
        });
        $("#Aexport").click(function() {
            var Aexp={x:[],y:[],type:[],time:[]};
            for (var i=1;i<16;i++) {
                if ($("#t"+i+"x").val()) {
                    Aexp.x.push($("#t"+i+"x").val());
                    Aexp.y.push($("#t"+i+"y").val());
                    Aexp.type.push($("#type"+i).val());
                }
            }
            Aexp.time[0]=$("#attackHr").val();
            Aexp.time[1]=$("#attackMin").val();
            Aexp.time[2]=$("#attackSec").val();
            Aexp.time[3]=$("#attackDat").val();
            var aa=prompt("Attack Orders Expot", JSON.stringify(Aexp));
        });
        $("#Aimport").click(function() {
            $("body").append(expwin);
            $("#ExpImp").draggable({ handle: ".popUpBar" , containment: "window", scroll: false});
            document.addEventListener('paste', function (evt) {
                $("#expstring").val(evt.clipboardData.getData('text/plain'));
            });
            $("#applyExp").click(function() {
                Aimp($("#expstring").val());
                $("#ExpImp").remove();
              });
        });
    });
    //import attack orders
  	function Aimp(str) {
        var Aexp=JSON.parse(str);
        for (var i=1; i<=Aexp.x.length; i++) {
            $("#t"+i+"x").val(Aexp.x[i-1]);
            $("#t"+i+"y").val(Aexp.y[i-1]);
            $("#type"+i).val(Aexp.type[i-1]).change();
        }
        $("#attackHr").val(Aexp.time[0]);
        $("#attackMin").val(Aexp.time[1]);
        $("#attackSec").val(Aexp.time[2]);
        $("#attackDat").val(Aexp.time[3]);
        }	
    
	function neardeftable(t) {
        var cx=$("#ndefx").val();
        var cy=$("#ndefy").val();
        var cont=Number(Math.floor(cx/100)+10*Math.floor(cy/100));
        var cit=[[]];
        for (var i in t) {
            var tid=t[i].id;
            var tempx=Number(tid % 65536);
            var tempy=Number((tid-tempx)/65536);
            var tcont=Number(Math.floor(tempx/100)+10*Math.floor(tempy/100));
            var ttspd=0;
            if (cont==tcont) {
                if (t[i].Ballista_total>0 || t[i].Ranger_total>0 || t[i].Triari_total>0 || t[i].Priestess_total || t[i].Arbalist_total>0 || t[i].Praetor_total>0 ) {
                    var tdist=(Math.sqrt((tempx-cx)*(tempx-cx)+(tempy-cy)*(tempy-cy)));
                    var tempt=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
                    tempt[1]=t[i].Ballista_total;
                    tempt[2]=t[i].Ranger_total;
                    tempt[3]=t[i].Triari_total;
                    tempt[4]=t[i].Priestess_total;
                    tempt[8]=t[i].Arbalist_total;
                    tempt[9]=t[i].Praetor_total;
                    var temph=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
                    temph[1]=t[i].Ballista_home;
                    temph[2]=t[i].Ranger_home;
                    temph[3]=t[i].Triari_home;
                    temph[4]=t[i].Priestess_home;
                    temph[8]=t[i].Arbalist_home;
                    temph[9]=t[i].Praetor_home;
                    var tempts=0; //TS total
                    for (var j in tempt) {
                        tempts+=tempt[j]*ttts[j];
                    }
                    var tempth=0; //TS Home
                    for (var h in temph) {
                        tempth+=temph[h]*ttts[h];
                    }
                    var tspeed=0;
                    for (var j in tempt) {
                        if (tempt[j]>0) {
                            if (Number((ttspeed[j]/ttspeedres[j]).toFixed(2))>tspeed) {
                                tspeed=Number((ttspeed[j]/ttspeedres[j]).toFixed(2));
                            }
                        }
                    }
                    cit.push([tempx,tempy,tdist,t[i].c,tempt,tempts,tempth,tid,tdist*tspeed]);
                }
            }
            if (cont!=tcont || t[i].Galley_total>0 || t[i].Stinger_total>0) {
                if (t[i].Stinger_total>0 || t[i].Galley_total>0) {
                    var tdist=roundToTwo(Math.sqrt((tempx-cx)*(tempx-cx)+(tempy-cy)*(tempy-cy)));
                    var tempt=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
                    tempt[1]=t[i].Ballista_total;
                    tempt[2]=t[i].Ranger_total;
                    tempt[3]=t[i].Triari_total;
                    tempt[4]=t[i].Priestess_total;
                    tempt[8]=t[i].Arbalist_total;
                    tempt[9]=t[i].Praetor_total;
                    tempt[14]=t[i].Galley_total;
                    tempt[15]=t[i].Stinger_total;
                    var temph=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
                    temph[1]=t[i].Ballista_home;
                    temph[2]=t[i].Ranger_home;
                    temph[3]=t[i].Triari_home;
                    temph[4]=t[i].Priestess_home;
                    temph[8]=t[i].Arbalist_home;
                    temph[9]=t[i].Praetor_home;
                    temph[14]=t[i].Galley_home;
                    temph[15]=t[i].Stinger_home;
                    var tempts=0;
                    for (var j in tempt) {
                        tempts+=tempt[j]*ttts[j];
                    }
                    var tempth=0; //TS Home
                    for (var h in temph) {
                        tempth+=temph[h]*ttts[h];
                    }
                    var tspeed=0;
                    for (var j in tempt) {
                        if (tempt[j]>0) {
                            if (Number((ttspeed[j]/ttspeedres[j]).toFixed(2))>tspeed) {
                                tspeed=Number((ttspeed[j]/ttspeedres[j]).toFixed(2));
                            }
                        }
                    }
                    var timetssp=(tdist*tspeed)+60;
                    cit.push([tempx,tempy,tdist,t[i].c,tempt,tempts,tempth,tid,timetssp]);
                }
            }
        }
        cit.sort(function(a,b) {return a[8]-b[8];});
        var neardeftab="<table id='ndeftable'><thead><th></th><th>City</th><th>Coords</th><th>TS Total</th><th>TS Home</th><th id='ndefdist'>Travel Time</th><th>type</th></thead><tbody>";
        for (var i in cit) {
            if(i>0){
            neardeftab+="<tr><td><button class='greenb chcity' id='cityGoTowm' a='"+cit[i][7]+"'>Go To</button></td><td>"+cit[i][3]+"</td><td class='coordblink shcitt' data='"+cit[i][7]+"'>"+cit[i][0]+":"+cit[i][1]+"</td>";
            //style='font-size: 9px;border-radius: 10px;width: 85%;height: 22px;padding: 1;white-space: nowrap;'
            neardeftab+="<td>"+cit[i][5]+"</td><td>"+cit[i][6]+"</td><td>"+Math.floor(cit[i][8]/60)+"h "+Math.floor(cit[i][8]%60)+"m</td><td><table>";
            for (var j in cit[i][4]) {
                if (cit[i][4][j]>0) {
                    neardeftab+="<td><div class='"+tpicdiv20[j]+"'></div></td>";
                }
            }
            neardeftab+="</table></td></tr>";
            }
        }
        neardeftab+="</tbody></table>";
        $("#Ndefbox").html(neardeftab);
        $("#ndeftable td").css("text-align","center");
        $("#ndeftable td").css("height","25px");
        var newTableObject = document.getElementById('ndeftable');
        sorttable.makeSortable(newTableObject);
        $("#ndefdist").trigger({type:"click",originalEvent:"1"});
        $("#ndefdist").trigger({type:"click",originalEvent:"1"});
    }

    function nearofftable(t) {
        var contoff=Number($("#noffx").val());
 //       var cit={x:[],y:[],dist:[],cn:[],thome:[],ts:[],id:[],time:[]};
        var cit=[[]];
        var troopmail=[[]];
        var counteroff=0;
        for (var i in t) {
            var tid=t[i].id;
            var tempx=Number(tid % 65536);
            var tempy=Number((tid-tempx)/65536);
            var tcont=Number(Math.floor(tempx/100)+10*Math.floor(tempy/100));
            //console.log(cont,tcont);
            if (contoff==tcont) {
                if (t[i].Druid_total>0 || t[i].Horseman_total>0 || t[i].Sorcerer_total>0 || t[i].Vanquisher_total>0 || t[i].Scorpion_total>0 || t[i].Ram_total>0) {
  //                  cit.x.push(tempx);
  //                  cit.y.push(tempy);
                    counteroff+=1;
                    var tempt=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
                    tempt[5]=t[i].Vanquisher_total;
                    tempt[6]=t[i].Sorcerer_total;
                    tempt[10]=t[i].Horseman_total;
                    tempt[11]=t[i].Druid_total;
                    tempt[12]=t[i].Ram_total;
                    tempt[13]=t[i].Scorpion_total;
                    var tempts=0;
                    for (var j in tempt) {
                        tempts+=tempt[j]*ttts[j];
                    }
                    troopmail.push([tempt,tempts]);
                    cit.push([tempx,tempy,tempts,tempt,t[i].c,tid]);
                }
            }
            if(contoff=="99"){
                if (t[i].Warship_total>0  || t[i].Galley_total>0) {
  //                  cit.x.push(tempx);
  //                  cit.y.push(tempy);
                    counteroff+=1;
                    var tempt=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
                    tempt[5]=t[i].Vanquisher_total;
                    tempt[6]=t[i].Sorcerer_total;
                    tempt[10]=t[i].Horseman_total;
                    tempt[11]=t[i].Druid_total;
                    tempt[12]=t[i].Ram_total;
                    tempt[13]=t[i].Scorpion_total;
                    tempt[14]=t[i].Galley_total;
                    tempt[16]=t[i].Warship_total;
                    var tempts=0;
                    for (var j in tempt) {
                        tempts+=tempt[j]*ttts[j];
                    }
                    troopmail.push([tempt,tempts]);
  //                  cit.ts.push(tempts);
  //                  cit.thome.push(tempt);
  //                  cit.cn.push(t[i].c);
  //                  cit.id.push(tid);
                    cit.push([tempx,tempy,tempts,tempt,t[i].c,tid]);
                }
            }
        }
        cit.sort(function(a,b) {return b[2]-a[2];});
        $("#asdfg").text("Total:"+counteroff);
        var nearofftab="<table id='nofftable'><thead><th></th><th>City</th><th>Coords</th><th>TS</th><th>type</th></thead><tbody>";
        for (var i in cit) {
            if(i>0){
                nearofftab+="<tr><td><button class='greenb chcity' id='cityGoTowm' a='"+cit[i][5]+"'>Go To</button></td><td>"+cit[i][4]+"</td><td class='coordblink shcitt' data='"+cit[i][5]+"'>"+cit[i][0]+":"+cit[i][1]+"</td>";
                //style='font-size: 9px;border-radius: 6px;width: 80%;height: 22px;padding: 0;white-space: nowrap;'
                nearofftab+="<td>"+cit[i][2]+"</td><td><table>";
                for (var j in cit[i][3]) {
                    if (cit[i][3][j]>0) {
                        nearofftab+="<td><div class='"+tpicdiv20[j]+"'></div></td>";
                    }
                }   
                nearofftab+="</table></td></tr>";
            }
        }
        nearofftab+="</tbody></table>";
        $("#Noffbox").html(nearofftab);
        $("#nofftable td").css("text-align","center");
        $("#nofftable td").css("height","26px");
        var newTableObject = document.getElementById('nofftable');
        sorttable.makeSortable(newTableObject);
        troopmail.sort(function(a,b) {return b[1]-a[1];});
        $("#mailoff").click(function() {
            console.log(troopmail);
            //$("#mailComposeBox").show();
            var conttemp=$("#noffx").val();
            var dhruv="<p>Number of offensive castles is '"+counteroff+"'</p>";
            dhruv+='</p><table class="mce-item-table" style="width: 266.273px; "data-mce-style="width: 266.273px; "border="1" data-mce-selected="1"><thead><th>Number</th><th>Troop</th><th>TS Amount</th></thead><tbody>';
            for (var i in troopmail) {
                if(i>0){
                    dhruv+='<tr><td style="text-align: center;" data-mce-style="text-align: center;">'+i+'</td>';
                    dhruv+='<td style="text-align: center;" data-mce-style="text-align: center;"><table>';
                    for (var j in troopmail) {
                        if (troopmail[i][0][j]>0) {
                            dhruv+='<td>'+ttname[j]+'</td>';
                        }
                    }
                    dhruv+='</table></td>';
                    dhruv+='<td style="text-align: center;" data-mce-style="text-align: center;">'+troopmail[i][1]+'</td></tr>';
                }
            }
            dhruv+="</tbody></table>";
            if(conttemp==99){conttemp="Navy";}
            jQuery("#mnlsp")[0].click();
            jQuery("#composeButton")[0].click();
            var temppo=$("#mailname").val();
            console.log(temppo);
            $("#mailToto").val(temppo);
            $("#mailToSub").val(conttemp+" Offensive TS");
            var $iframe = $('#mailBody_ifr');
            $iframe.ready(function() {
                $iframe.contents().find("body").append(dhruv);
            });
     /*       setTimeout(function() {
                jQuery("#mailSButton")[0].click();
            },1000);*/
        });
    }

    function clickevent(element) {
        var event = jQuery.Event("click");
            event.user = "foo";
    }
    function SendDef(defobj) {
        $("#commandsPopUpBox").show();
        //setTimeout(function() {
        //    $("#commandsPopUpBox").hide();
        //},300);
        var commandtabs=$("#commandsdiv").tabs();
        commandtabs.tabs( "option", "active", 2 );
        $("#reintabb").trigger({type:"click",originalEvent:"1"});
        var targets=defobj.targets;
        var tarnumb=defobj.targets.numb;
        var t=defobj.t;
        var maxdist=Math.max.apply(Math, targets.dist);
        var time;
        //console.log(targets,tarnumb);
        //galley defend
        if (t.type.indexOf(14)>-1) {
            if (t.use[t.type.indexOf(14)]==1) {
                time=ttspeed[14]/ttspeedres[14]*maxdist;
                //console.log(time);
                var gali=t.type.indexOf(14);
                if (defobj.dep==0) {
                    var galnumb=Math.floor(t.home[gali]/tarnumb);
                } else {
                    var galnumb=Math.floor(t.tot[gali]/tarnumb);
                }
                var maxts=0;
                for (var i in t.home) {
                    if (i!=gali) {
                        if (t.use[i]==1) {
                            if (t.type[i]!=15) {
                                if (defobj.dep==0) {
                                    maxts+=Math.floor(t.home[i]*ttts[t.type[i]]/tarnumb);
                                } else {
                                    maxts+=Math.floor(t.tot[i]*ttts[t.type[i]]/tarnumb);
                                }
                            }
                        }
                    }
                }
                if (maxts<=galnumb*500) {
                    t.amount[gali]=Math.ceil(maxts/500);
                    for (var i in t.home) {
                        if (i!=gali) {
                            if (t.use[i]==1) {
                                if (defobj.dep==0) {
                                    t.amount[i]=Math.floor(t.home[i]/tarnumb);
                                } else {
                                    t.amount[i]=Math.floor(t.tot[i]/tarnumb);
                                }
                            }
                        }
                    }
                } else {
                    var rat=galnumb*500/maxts;
                    t.amount[gali]=galnumb;
                    for (var i in t.home) {
                        if (i!=gali) {
                            if (t.use[i]==1) {
                                if (t.type[i]!=15) {
                                    if (defobj.dep==0) {
                                        t.amount[i]=Math.floor(rat*t.home[i]/tarnumb);
                                    } else {
                                        t.amount[i]=Math.floor(rat*t.tot[i]/tarnumb);
                                    }
                                } else {
                                     if (defobj.dep==0) {
                                        t.amount[i]=Math.floor(t.home[i]/tarnumb);
                                    } else {
                                        t.amount[i]=Math.floor(t.tot[i]/tarnumb);
                                    }
                                }
                            }
                        }
                    }
                }
            }
            // normal def
        } else {
            time=Math.max.apply(Math, t.speed)*maxdist;
            for (var i in t.home) {
                if (t.use[i]==1) {
                    if (defobj.dep==0) {
                        t.amount[i]=Math.floor(t.home[i]/tarnumb);
                    } else {
                        t.amount[i]=Math.floor(t.tot[i]/tarnumb);
                    }
                }
            }
        }
        // sending def
        //console.log(t);
        var l=0; var end=targets.x.length;
        function dloop() {
            for (var i in t.home) {
                if (t.use[i]==1) {
                    $("#reiIP"+t.type[i]).val(t.amount[i]);
                }
            }
            $("#reinxcoord").val(targets.x[l]);
            $("#reinycoord").val(targets.y[l]);
            setTimeout(function(){
                $("#reinfcoordgo").trigger({type:"click",originalEvent:"1"});
            },100);
            $("#reinforcetimingselect").val(Number(defobj.dep)+1).change();
            if ($("#defdeparture").val()>0) {
                //console.log(defobj.min,defobj.hr,defobj.sec);
                var date=defobj.date+" "+defobj.hr+":"+defobj.min+":"+defobj.sec;
                $("#reinfotimeinp").val(date);
            }

            var event = jQuery.Event( "logged" );
            event.user = "foo";
            //$("#reinforceGo").trigger({type:"click",originalEvent:"1"});
            $("#reinforceGo").trigger({
                  type:"click",
                  originalEvent:"1"
                });
            l++;
            if (l<end) {
                setTimeout( dloop, 1500 );
            } else {
                $("#commandsPopUpBox").hide();
                setTimeout( function() {
                    art();
                }, 4000 );
            }
        }
        dloop();
        function art() { //setting return time for raids according to city view outgoing list
            //console.log(poll2.OGA);
            $("#commandsPopUpBox").hide();
            if (defobj.ret==1) {
                jQuery(".toptdinncommtbl1:first")[0].click();
                setTimeout(function() {
                    $("#outgoingPopUpBox").hide();
                },500);
                var minddate = new Date();
                var first=true;
                for (var i in poll2.OGA) {
                    //console.log(targets.cstr,poll2.OGA[i][5]);
                    if (targets.cstr.indexOf(poll2.OGA[i][5])>-1) {
                        if (first) {
                            first=false;
                            var a=poll2.OGA[i][6].substr(30);
                            var b=a.substr(0,a.indexOf('<'));
                            var time=b.split(" ");
                            var ttime=time[2].split(":");
                            minddate.setHours(Number(ttime[0]));
                            minddate.setMinutes(Number(ttime[1]));
                            minddate.setSeconds(Number(ttime[2]));
                            //console.log(time[1]);
                            if (time[1]=="Tomorrow") {
                                minddate.setDate(minddate.getDate() + 1);
                                //console.log("tmrw");
                            } else if (time[1]!="Today") {
                                var ddate=time[1].split("/");
                                //console.log(ddate);
                                minddate.setDate(Number(ddate[1]));
                                minddate.setMonth(Number(ddate[0]));
                            }
                        } else {
                            var a=poll2.OGA[i][6].substr(30);
                            var b=a.substr(0,a.indexOf('<'));
                            var time=b.split(" ");
                            var ttime=time[2].split(":");
                            var d=new Date();
                            d.setHours(ttime[0]);
                            d.setMinutes(ttime[1]);
                            d.setSeconds(ttime[2]);
                            if (time[1]=="Tomorrow") {
                                //console.log("tmrw");
                                d.setDate(minddate.getDate() + 1);
                            } else if (time[1]!="Today") {
                                var ddate=time[1].split("/");
                                //console.log(ddate);
                                d.setDate(ddate[1]);
                                d.setMonth(ddate[0]);
                            }
                            //console.log(d,minddate);
                            if (d<minddate) {
                                minddate=d;
                            }
                        }
                    }
                }
                minddate.setHours(minddate.getHours()-defobj.rettime);
                //console.log(minddate);
                var hour=minddate.getHours();
                if (hour<10) {
                    hour="0"+hour;
                }
                var min=minddate.getMinutes();
                if (min<10) {
                    min="0"+min;
                }
                var sec=minddate.getSeconds();
                if (sec<10) {
                    sec="0"+sec;
                }
                var retdate=getFormattedDate(minddate)+" "+hour+":"+min+":"+sec;
                //console.log(retdate);
                $("#raidrettimesela").val(3).change();
                $("#raidrettimeselinp").val(retdate);
                jQuery("#doneOGAll")[0].click();
                alert("Defense set and troops returned");
            } else {
                alert("Defense set");
            }
        }
 /*       if ($("#dretcheck").prop( "checked")==true) {
            jQuery(".toptdinncommtbl1:first")[0].click();
            setTimeout(function() {
                $("#outgoingPopUpBox").hide();
            },500);
            if ($("#defdeparture").val()==2) {
                var rh=Number($("#dretHr").val());
                var hr=Number($("#defHr").val())-(Math.floor(time/60)+rh);
                var returndate=$('#defDat').datepicker('getDate');
                var min=$("#defMin").val()-Math.floor(time%60);
                if (min<0) {
                    min+=60;
                    hr-=1;
                }
                if (hr<0 && hr>=-24) {
                    hr+=24;
                    returndate.setDate(returndate.getDate() - 1);
                }
                if (hr<-24 && hr>= -48) {
                    hr+=48;
                    returndate.setDate(returndate.getDate() - 2);
                }
                if (hr<-48) {
                    hr+=72;
                    returndate.setDate(returndate.getDate() - 3);
                }
                if (hr<10) {hr="0"+hr;}
                var retdate=getFormattedDate(returndate)+" "+hr+":"+min+":"+$("#defSec").val();
                $("#raidrettimesela").val(3).change();
            }
            if ($("#defdeparture").val()==1) {
                var rh=Number($("#dretHr").val());
                var hr=Number($("#defHr").val())-rh;
                var returndate=$('#defDat').datepicker('getDate');
                if (hr<0) {
                    hr+=24;
                    returndate.setDate(returndate.getDate() - 1);
                }
                var retdate=getFormattedDate(returndate)+" "+hr+":"+$("#defMin").val()+":"+$("#defSec").val();
                $("#raidrettimesela").val(2).change();
            }
            $("#raidrettimeselinp").val(retdate);
            jQuery("#doneOGAll")[0].click();
        }*/
    }
    function updateattack() {
        var t={home:[],type:[]};
        var scouttts;
        for (var i in cdata.tc) {
            if (cdata.tc[i]){
                if(i==7){
                    scouttts=cdata.tc[7];
                }
                else{
                    t.home.push(cdata.tc[i]);
                    t.type.push(i);
                }
            }}
        var ttseltab="<table><thead><th>Troop Type</th><th>Use for real</th><th>Use for fake</th></thead><tbody>";
        for (var i in t.home) {
            ttseltab+="<tr><td style='height:40px;'><div class='"+tpicdiv[t.type[i]]+"'></div></td><td style='text-align: center;'><input id='usereal"+t.type[i]+"' class='clsubopti' type='checkbox' checked></td>";
            ttseltab+="<td style='text-align: center;'><input id='usefake"+t.type[i]+"' class='clsubopti' type='checkbox' checked></td></tr>";
        }
        ttseltab+="</tbody></table>";
        $("#picktype").html(ttseltab);
    }
    function updatedef() {
        var t={home:[],type:[]};
        for (var i in cdata.tc) {
            if (cdata.tc[i]) {
                t.home.push(cdata.tc[i]);
                t.type.push(i);
            }
        }
        var ttseltab="<table><thead><th>Troop Type</th><th>Use</th></thead><tbody>";
        for (var i in t.home) {
            //ttseltab+="<tr><td>"+ttname[t.type[i]]+"</td><td><input id='usereal"+t.type[i]+"' class='clsubopti' type='checkbox' checked></td>";
            ttseltab+="<tr><td style='height:40px;'><div class='"+tpicdiv[t.type[i]]+"'></div></td><td style='text-align: center;'><input id='usedef"+t.type[i]+"' class='clsubopti' type='checkbox' checked></td></tr>";
        }
        ttseltab+="</tbody></table>";
        $("#dpicktype").html(ttseltab);
    }
    function SendAttack() {
        $("#commandsPopUpBox").show();
        var commandtabs=$("#commandsdiv").tabs();
        var pvptabs=$("#pvpTab").tabs();
        jQuery("#pvptabb")[0].click();
        commandtabs.tabs( "option", "active", 1 );
        var targets={x:[],y:[],real:[],dist:[],cstr:[]};
        var fakenumb=0;
        var realnumb=0;
        var tempx;
        var tempy;
        for (var i=1;i<16;i++) {
            if ($("#t"+i+"x").val()) {
                tempx=$("#t"+i+"x").val();
                tempy=$("#t"+i+"y").val();
                targets.x.push(tempx);
                targets.y.push(tempy);
                targets.cstr.push(tempx+":"+tempy);
                targets.real.push($("#type"+i).val());
                if ($("#type"+i).val()==1) {realnumb+=1;}
                else {fakenumb+=1;}
                targets.dist.push(Math.sqrt((tempx-city.x)*(tempx-city.x)+(tempy-city.y)*(tempy-city.y)));
            }
        }
        var scouttts;
        var t={home:[],type:[],real:[],fake:[],speed:[],scoutfake:[],scoutreal:[]};
        for (var i in cdata.tc) {
            if (cdata.tc[i]) {
                if(i==7){scouttts=cdata.tc[7];}
                else{
                    t.home.push(Math.ceil(cdata.tc[i]*Number($("#perc").val())/100));
                    t.type.push(Number(i));
                    if ($("#usereal"+i).prop( "checked")===true) {
                        t.speed.push(ttspeed[i]/ttspeedres[i]);
                    } else {t.speed.push(0);}
                }
            }}
        var maxdist=Math.max.apply(Math, targets.dist);
        var time;
        var faketss;
        var fakeg;
        var tscbr=cdata.tt;
    /*    if(tscbr<20000){faketss=200;fakeg=1;}
        else if(tscbr<40000){faketss=500;fakeg=1;}
        else if(tscbr<60000){faketss=800;fakeg=2;}
        else if(tscbr<80000){faketss=1000;fakeg=2;}
        else if(tscbr<100000){faketss=1200;fakeg=3;}
        else if(tscbr<120000){faketss=1600;fakeg=4;}
        else if(tscbr<160000){faketss=2000;fakeg=4;}
        else if(tscbr<200000){faketss=2500;fakeg=5;}
        else if(tscbr<240000){faketss=3000;fakeg=6;}
        else{faketss=3000;fakeg=6;}*/
        if(tscbr<20000){faketss=1;fakeg=1;}
        else if(tscbr<40000){faketss=200;fakeg=1;}//1 600, 2 1200, 3 1800, 4 2400, 5 3000
        else if(tscbr<60000){faketss=500;fakeg=1;}
        else if(tscbr<80000){faketss=800;fakeg=2;}
        else if(tscbr<100000){faketss=1000;fakeg=2;}
        else if(tscbr<120000){faketss=1200;fakeg=2;}
        else if(tscbr<160000){faketss=1600;fakeg=3;}
        else if(tscbr<200000){faketss=2000;fakeg=4;}
        else if(tscbr<240000){faketss=2500;fakeg=5;}
        else{faketss=3000;fakeg=5;}
        if (scouttts>0){
            if($("#realtype").val()==3 && $("#faketype").val()==3) {
                if($("#usereal14").prop( "checked")===true){
                    if($("#usefake14").prop( "checked")===true){
                        t.scoutfake[0]=fakeg*250;
                        t.scoutreal[0]=Math.floor((scouttts-((fakeg*250)*fakenumb))/realnumb);
                    }else{
                        t.scoutfake[0]=faketss/2;
                        t.scoutreal[0]=Math.floor((scouttts-((faketss/2)*fakenumb))/realnumb);
                    }}else if($("#usereal14").prop( "checked")!==true){
                        if($("#usefake14").prop( "checked")===true){
                            t.scoutfake[0]=fakeg*250;
                            t.scoutreal[0]=Math.floor((scouttts-((fakeg*250)*fakenumb))/realnumb);
                        }else{
                            t.scoutfake[0]=faketss/2;
                            t.scoutreal[0]=Math.floor((scouttts-((faketss/2)*fakenumb))/realnumb);
                        }}
            }
            if($("#realtype").val()==3 && $("#faketype").val()!=3) {
                if($("#usereal14").prop( "checked")===true){
                    if($("#usefake14").prop( "checked")===true){
                        t.scoutreal[0]=Math.floor(scouttts/realnumb);
                        }else{
                            t.scoutreal[0]=Math.floor(scouttts/realnumb);
                    }}else{
                        t.scoutreal[0]=Math.floor(scouttts/realnumb);
                    }
            }
            if($("#realtype").val()!=3 && $("#faketype").val()==3){
                if($("#usereal14").prop( "checked")===true){
                    if($("#usefake14").prop( "checked")===true){
                        t.scoutfake[0]=fakeg*250;
                        }else{
                            t.scoutfake[0]=faketss/2;
                     }
                }else if($("#usereal14").prop( "checked")!==true){
                    if($("#usefake14").prop( "checked")===true){
                    t.scoutfak[0]=fakeg*250;
                    }else{
                        t.scoutfake[0]=faketss/2;
            }}}
        }
                //galley attack
        if (t.type.indexOf(14)>-1 && $("#usereal14").prop( "checked")===true) {
            time=ttspeed[14]/ttspeedres[14]*maxdist;
            var gali=t.type.indexOf(14);
            var galnumb=Math.floor((t.home[gali]-fakeg*fakenumb)/realnumb);
            t.real[gali]=galnumb;
            t.fake[gali]=fakeg;
            var galcap=500*galnumb;
            var nongalts=0;
            for (var i in t.home) {
                if (i!=gali && t.type[i]!=17) {
                    if ($("#usereal"+t.type[i]).prop( "checked")===true) {
                        if ($("#usefake"+t.type[i]).prop( "checked")===true) {
                            nongalts+=ttts[t.type[i]]*(t.home[i]-Math.ceil((fakeg*500)/ttts[t.type[i]])*fakenumb)/realnumb;
                        } else {nongalts+=ttts[t.type[i]]*(t.home[i])/realnumb;}
                    }
                }
                if (t.type[i]==17) {
                    if ($("#usereal"+t.type[i]).prop( "checked")===true) {
                        if ($("#usefake"+t.type[i]).prop( "checked")===true) {
                            if (t.home[i]>=fakenumb+realnumb) {
                                nongalts+=1;
                            } else {
                                nongalts+=1;
                            }
                        } else {
                            nongalts+=1;
                        }
                    }
                }
            }
            var fakerat=0;
            for (var i in t.home) {
                if (i!=gali) {
                    if ($("#usefake"+t.type[i]).prop( "checked")===true) {
                        fakerat+=ttts[t.type[i]]*t.home[i];
                    }
                }
            }
            for (var i in t.home) {
                if (i!=gali && t.type[i]!=17) {
                    if ($("#usefake"+t.type[i]).prop( "checked")===true) {
                            t.fake[i]=Math.ceil((fakeg*500)*t.home[i]/fakerat);
                        }
                    }
                // number of senators to send on each fake/reak attack
                    if (t.type[i]==17) {
                        if ($("#usereal"+t.type[i]).prop( "checked")===true) {
                            if ($("#usefake"+t.type[i]).prop( "checked")===true) {
                                if (t.home[i]>=fakenumb+realnumb) {
                                    t.fake[i]=1;
                                    t.real[i]=1;
                                } else {
                                    t.fake[i]=0;
                                    t.real[i]=1;
                                }
                            } else {
                                t.fake[i]=0;
                                t.real[i]=1;
                            }
                        } else if ($("#usefake"+t.type[i]).prop( "checked")===true) {
                            t.real[i]=0;
                            t.fake[i]=1;
                        } else {
                            t.real[i]=0;
                        t.fake[i]=0;
                        }
                    }
                }
            for (var i in t.home) {
                if (i!=gali && t.type[i]!=17) {
                    if ($("#usereal"+t.type[i]).prop( "checked")===true) {
                        if ($("#usefake"+t.type[i]).prop( "checked")===true) {
                            if (nongalts>galcap) {
                                t.real[i]=Math.floor(galcap/nongalts*(t.home[i]-t.fake[i]*fakenumb)/realnumb);
                            } else {
                                t.real[i]=Math.floor((t.home[i]-t.fake[i]*fakenumb)/realnumb);
                            }
                        } else {
                            if (nongalts>galcap) {
                                t.real[i]=Math.floor(galcap/nongalts*(t.home[i])/realnumb);
                            } else {
                                t.real[i]=Math.floor((t.home[i])/realnumb);
                            }
                            t.fake[i]=0;
                        }
                    }
                }
            }
        }
        else {
                var fakerat=0;
            time=Math.max.apply(Math, t.speed)*maxdist;
                //Adding all the TS standing home with fake ticked into fakerat
                for (var i in t.home) {
                if (t.type[i]!==17) {
                    if ($("#usefake"+t.type[i]).prop( "checked")===true) {
                        fakerat+=ttts[t.type[i]]*t.home[i];
                    }
                }
                }
                //getting fake TS proportions of each troop type in a fake attack and moving them into t.fake[i]
                for (var i in t.home) {
                if (t.type[i]!=17) {
                    if ($("#usefake"+t.type[i]).prop( "checked")===true) {
                        t.fake[i]=Math.ceil(faketss*t.home[i]/fakerat);
                    }
                }
                }
                //subracting fake numbers to get real numbers and distributing senator too
                for (var i in t.home) {
                    if (t.type[i]!=17) {
                        if ($("#usereal"+t.type[i]).prop( "checked")===true) {
                            if ($("#usefake"+t.type[i]).prop( "checked")===true) {
                                t.real[i]=Math.floor((t.home[i]-t.fake[i]*fakenumb)/realnumb);
                            } else {
                                t.real[i]=Math.floor((t.home[i])/realnumb);
                            }
                        } else {t.real[i]=0;}
                    }
                    //senator numbers
                if (t.type[i]==17) {
                    if ($("#usereal"+t.type[i]).prop( "checked")===true) {
                        if ($("#usefake"+t.type[i]).prop( "checked")===true) {
                            if (t.home[i]>=fakenumb+realnumb) {
                                t.fake[i]=1;
                                t.real[i]=1;
                            } else {
                                t.fake[i]=0;
                                t.real[i]=1;
                            }
                        } else {
                            t.fake[i]=0;
                            t.real[i]=1;
                        }
                    } else if ($("#usefake"+t.type[i]).prop( "checked")===true) {
                        t.real[i]=0;
                        t.fake[i]=1;
                    } else {
                        t.real[i]=0;
                        t.fake[i]=0;
                    }
                }
                }
        }
        var alltimes={a:[],b:[],c:[],d:[]};
        var l=0; var end=targets.x.length;
        function loop() {
            if (targets.real[l]==1) {
                if ($("#realtype").val()==0) {
                    pvptabs.tabs( "option", "active", 0 );
                    for (var i in t.real) {
                        $("#assIP"+t.type[i]).val(t.real[i]);
                    }
                    $("#assaultxcoord").val(targets.x[l]);
                    $("#assaultycoord").val(targets.y[l]);
                    setTimeout(function(){
                        jQuery("#assaultcoordgo")[0].click();
                    },100);
                    $("#assaulttimingselect").val(3).change();
                    var date=$("#attackDat").val()+" "+$("#attackHr").val()+":"+$("#attackMin").val()+":"+$("#attackSec").val();
                    $("#assaulttimeinp").val(date);
                    alltimes.a.push($("#assaulttraveltime").text());
                    jQuery("#assaultGo")[0].click();
                }
                if ($("#realtype").val()==1) {
                    pvptabs.tabs( "option", "active", 1 );
                    for (var i in t.real) {
                        $("#sieIP"+t.type[i]).val(t.real[i]);
                    }
                    $("#siexcoord").val(targets.x[l]);
                    $("#sieycoord").val(targets.y[l]);
                    setTimeout(function(){
                        jQuery("#siegecoordgo")[0].click();
                    },100);
                    $("#siegetimingselect").val(3).change();
                    var date=$("#attackDat").val()+" "+$("#attackHr").val()+":"+$("#attackMin").val()+":"+$("#attackSec").val();
                    $("#siegetimeinp").val(date);
                    alltimes.a.push($("#siegetraveltime").text());
                    jQuery("#siegeGo")[0].click();
                }
                if ($("#realtype").val()==2) {
                    pvptabs.tabs( "option", "active", 2 );
                    for (var i in t.real) {
                        $("#pluIP"+t.type[i]).val(t.real[i]);
                    }
                    $("#pluxcoord").val(targets.x[l]);
                    $("#pluycoord").val(targets.y[l]);
                    setTimeout(function(){
                         jQuery("#plundercoordgo")[0].click();
                    },100);
                    $("#plundertimingselect").val(3).change();
                    var date=$("#attackDat").val()+" "+$("#attackHr").val()+":"+$("#attackMin").val()+":"+$("#attackSec").val();
                    $("#plundtimeinp").val(date);
                    alltimes.a.push($("#plundtraveltime").text());
                     $("#plunderGo").prop('disabled', false);
                    jQuery("#plunderGo")[0].click();
                }
                    if ($("#realtype").val()==3) {
                        pvptabs.tabs( "option", "active", 3 );
                        for (var i in t.real) {
                            $("#scoIP"+t.type[i]).val(t.real[i]);
                        }
                        $("#scoIP7").val(t.scoutreal[0]);
                        $("#scoxcoord").val(targets.x[l]);
                        $("#scoycoord").val(targets.y[l]);
                        setTimeout(function(){
                            jQuery("#scoutcoordgo")[0].click();
                        },100);
                        $("#scouttimingselect").val(3).change();
                        var date=$("#attackDat").val()+" "+$("#attackHr").val()+":"+$("#attackMin").val()+":"+$("#attackSec").val();
                        $("#scouttimeinp").val(date);
                        jQuery("#scoutGo")[0].click();
                    }
            }
            if (targets.real[l]==0) {
                if ($("#faketype").val()==0) {
                        pvptabs.tabs( "option", "active", 0 );
                    for (var i in t.real) {
                        $("#assIP"+t.type[i]).val(t.fake[i]);
                    }
                    $("#assaultxcoord").val(targets.x[l]);
                    $("#assaultycoord").val(targets.y[l]);
                    setTimeout(function(){
                         jQuery("#assaultcoordgo")[0].click();
                    },100);
                        $("#assaulttimingselect").val(3).change();
                    var date=$("#attackDat").val()+" "+$("#attackHr").val()+":"+$("#attackMin").val()+":"+$("#attackSec").val();
                    $("#assaulttimeinp").val(date);
                    alltimes.a.push($("#assaulttraveltime").text());
                    jQuery("#assaultGo")[0].click();
                }
                    if ($("#faketype").val()==1) {
                        pvptabs.tabs( "option", "active", 1 );
                        for (var i in t.real) {
                            $("#sieIP"+t.type[i]).val(t.fake[i]);
                        }
                        $("#siexcoord").val(targets.x[l]);
                        $("#sieycoord").val(targets.y[l]);
                        setTimeout(function(){
                             jQuery("#siegecoordgo")[0].click();
                        },100);
                        $("#siegetimingselect").val(3).change();
                        var date=$("#attackDat").val()+" "+$("#attackHr").val()+":"+$("#attackMin").val()+":"+$("#attackSec").val();
                        $("#siegetimeinp").val(date);
                        alltimes.a.push($("#siegetraveltime").text());
                        jQuery("#siegeGo")[0].click();
                    }
                if ($("#faketype").val()==2) {
                    pvptabs.tabs( "option", "active", 2 );
                    for (var i in t.real) {
                        $("#pluIP"+t.type[i]).val(t.fake[i]);
                    }
                    $("#pluxcoord").val(targets.x[l]);
                    $("#pluycoord").val(targets.y[l]);
                    setTimeout(function(){
                         jQuery("#plundercoordgo")[0].click();
                    },100);
                    $("#plundertimingselect").val(3).change();
                    var date=$("#attackDat").val()+" "+$("#attackHr").val()+":"+$("#attackMin").val()+":"+$("#attackSec").val();
                    $("#plundtimeinp").val(date);
                    alltimes.a.push($("#plundtraveltime").text());
                    $("#plunderGo").prop('disabled', false);
                    jQuery("#plunderGo")[0].click();
                }
                if ($("#faketype").val()==3) {
                        if($("#scoutick").prop( "checked")===true){
                            pvptabs.tabs( "option", "active", 3 );
                            $("#scoIP7").val(1);
                            $("#scoIP14").val(30);
                            $("#scoxcoord").val(targets.x[l]);
                            $("#scoycoord").val(targets.y[l]);
                            setTimeout(function(){
                                 jQuery("#scoutcoordgo")[0].click();
                            },100);
                            $("#scouttimingselect").val(3).change();
                            var date=$("#attackDat").val()+" "+$("#attackHr").val()+":"+$("#attackMin").val()+":"+$("#attackSec").val();
                            $("#scouttimeinp").val(date);
                            jQuery("#scoutGo")[0].click();
                        }
                    else{
                        pvptabs.tabs( "option", "active", 3 );
                        for (var i in t.real) {
                            $("#scoIP"+t.type[i]).val(t.fake[i]);
                        }
                        $("#scoIP7").val(t.scoutfake[0]);
                        $("#scoxcoord").val(targets.x[l]);
                            $("#scoycoord").val(targets.y[l]);
                        setTimeout(function(){
                             jQuery("#scoutcoordgo")[0].click();
                        },100);
                        $("#scouttimingselect").val(3).change();
                        var date=$("#attackDat").val()+" "+$("#attackHr").val()+":"+$("#attackMin").val()+":"+$("#attackSec").val();
                        $("#scouttimeinp").val(date);
                        jQuery("#scoutGo")[0].click();
                    }
                }
            }
            l++;
            if (l<end) {
                setTimeout( loop, 1000 );
            } else {
                setTimeout( function() {
                    art();
                }, 4000 );
             }       
        }
        loop();
        function art() { //setting return time for raids according to city view attacks list
            //console.log(poll2.OGA);
            $("#commandsPopUpBox").hide();
            if ($("#retcheck").prop( "checked")==true) {
                jQuery(".toptdinncommtbl1:first")[0].click();
                setTimeout(function() {
                    $("#outgoingPopUpBox").hide();
                },500);
                var minddate = new Date();
                var first=true;
                for (var i in poll2.OGA) {
                    //console.log(targets.cstr,poll2.OGA[i][5]);
                    if (targets.cstr.indexOf(poll2.OGA[i][5])>-1) {
                        if (first) {
                            first=false;
                            var a=poll2.OGA[i][6].substr(30);
                            var b=a.substr(0,a.indexOf('<'));
                            var time=b.split(" ");
                            var ttime=time[2].split(":");
                            minddate.setHours(Number(ttime[0]));
                            minddate.setMinutes(Number(ttime[1]));
                            minddate.setSeconds(Number(ttime[2]));
                            //console.log(time[1]);
                            if (time[1]=="Tomorrow") {
                                minddate.setDate(minddate.getDate() + 1);
                                //console.log("tmrw");
                            } else if (time[1]!="Today") {
                                var ddate=time[1].split("/");
                                console.log(ddate);
                                minddate.setDate(Number(ddate[1]));
                                minddate.setMonth(Number(ddate[0]-1));
                                //console.log(minddate);
                            }
                        } else {
                            var a=poll2.OGA[i][6].substr(30);
                            var b=a.substr(0,a.indexOf('<'));
                            var time=b.split(" ");
                            var ttime=time[2].split(":");
                            var d=new Date();
                            d.setHours(ttime[0]);
                            d.setMinutes(ttime[1]);
                            d.setSeconds(ttime[2]);
                            if (time[1]=="Tomorrow") {
                                //console.log("tmrw");
                                d.setDate(minddate.getDate() + 1);
                            } else if (time[1]!="Today") {
                                var ddate=time[1].split("/");
                                //console.log(ddate);
                                d.setDate(ddate[1]);
                                d.setMonth(ddate[0]-1);
                                //console.log(minddate);
                            }
                            //console.log(d,minddate);
                            if (d<minddate) {
                                minddate=d;
                            }
                        }
                    }
                }
                minddate.setHours(minddate.getHours()-Number($("#retHr").val()));
                //console.log(minddate);
                var hour=minddate.getHours();
                if (hour<10) {
                    hour="0"+hour;
                }
                var min=minddate.getMinutes();
                if (min<10) {
                    min="0"+min;
                }
                var sec=minddate.getSeconds();
                if (sec<10) {
                    sec="0"+sec;
                }
                var retdate=getFormattedDate(minddate)+" "+hour+":"+min+":"+sec;
                //console.log(retdate);
                $("#raidrettimesela").val(3).change();
                $("#raidrettimeselinp").val(retdate);
                jQuery("#doneOGAll")[0].click();
                alert("Attack set and troops returned");
            } else {
                alert("Attack set");
            }
        }
   /*     if ($("#retcheck").prop( "checked")==true) {
            jQuery(".toptdinncommtbl1:first")[0].click();
            setTimeout(function() {
                $("#outgoingPopUpBox").hide();
            },500);
            var rh=Number($("#retHr").val());
            var hr=Number($("#attackHr").val())-(Math.floor(time/60)+rh);
            var returndate=$('#attackDat').datepicker('getDate');
            var min=$("#attackMin").val()-Math.floor(time%60);
            if (min<0) {
                min+=60;
                hr-=1;
            }
            if (hr<0 && hr>=-24) {
                hr+=24;
                returndate.setDate(returndate.getDate() - 1);
            }
            if (hr<-24 && hr>= -48) {
                hr+=48;
                returndate.setDate(returndate.getDate() - 2);
            }
            if (hr<-48) {
                hr+=72;
                returndate.setDate(returndate.getDate() - 3);
            }
            if (hr<10) {hr="0"+hr;}
            var retdate=getFormattedDate(returndate)+" "+hr+":"+min+":"+$("#attackSec").val();
            $("#raidrettimesela").val(3).change();
            $("#raidrettimeselinp").val(retdate);
            jQuery("#doneOGAll")[0].click();
        } */
    }
	//for on/off councilor
	function coonvalue() {
        if(coofz==1)
        {
         coon=0
         $("#fb1").removeClass('redb').addClass('greenb');}
        if(coofz==0)
        {
		coon=1
        $("#fb1").removeClass('greenb').addClass('redb');
	}
        return coon;
    }
    //Buttons convert,fill,demolish,building count
    $(document).ready(function() {
        var fourbutton="<div id='fourbuttons' class='commandinndiv'><div><button id='fb1' style='height:28px; width:65px; margin-left:7px; margin-bottom:5px ; border-radius:4px ; font-size: 10px !important; padding: 0px;' class='regButton greenb'>ON/OFF</button><button id='fb2' style='height:28px; width:65px; margin-left:7px; margin-bottom:5px ; border-radius:4px ; font-size: 10px !important; padding: 0px;' class='regButton greenb'>Refine</button><button id='fb3' style='height:28px; width:65px; margin-left:7px; margin-bottom:5px ; border-radius:4px ; font-size: 10px !important; padding: 0px;' class='regButton greenb'>Raid</button><button id='fb4' style='height:28px; width:65px; margin-left:7px; margin-bottom:5px ; border-radius:4px ; font-size: 10px !important; padding: 0px;' class='regButton greenb'>Demolish</button></div></div>";
        var bdcountbox="<div id='currentBd'><div id='bdcountbar' class='queueBar'>";
        bdcountbox+="<div id='bdcountbut' class='tradeqarr2'><div></div></div><span class='qbspan'>Current Buildings</span>";
        bdcountbox+="<div id='numbdleft' class='barRightFloat tooltipstered'>0</div>";
        bdcountbox+="</div><div id='bdcountwin' class='queueWindow' style='display: block;'></div></div>";
        $("#buildQueue").before(fourbutton);
        var fillbut='<button id="fillque" class="greenb tooltipstered" style="height:18px; width:40px; margin-left:7px; margin-top:5px ; border-radius:4px ; font-size: 10px !important; padding: 0px;">Fill</button>';
        $('#sortbut').after(fillbut);
        $('#fillque').click(function() {
            var dfs=poll2.city.cid;
            console.log(dfs);
            event.stopPropagation();
            var bB = $.post('/overview/fillq.php', { a: dfs });
        });
        var convbut='<button id="convque" class="greenb tooltipstered" style="height:18px; width:60px; margin-left:7px; margin-top:5px ; border-radius:4px ; font-size: 10px !important; padding: 0px;">Convert</button>';
        $('#sortbut').after(convbut);
        $('#convque').click(function() {
            var cfd=poll2.city.cid;
            console.log(cfd);
            event.stopPropagation();
            var cB = $.post('/overview/mconv.php', { a: cfd });
        });

        $("#fb1").click(function(){
            $('#councillorPopUpBox').show();
            jQuery("#ui-id-11")[0].click();
            jQuery("#couonoffdv")[0].click();
            setTimeout(function(){
                jQuery("#councillorXbutton")[0].click();
            },100);
            if (coon==0) {
                coon=1;
                $(this).removeClass('greenb');
                $(this).addClass('redb');
            } else {
                coon=0;
                $(this).removeClass('redb');
                $(this).addClass('greenb');
            }
        });
        $("#fb2").click(function() {
            $('#tradePopUpBox').show();
            setTimeout(function(){
                jQuery("#ui-id-27")[0].click();
            },100);
        });
        $("#fb3").click(function() {
            $('#warcouncbox').show();
            jQuery("#ui-id-19")[0].click();
        });  
        var autodemoon=0;
        $("#fb4").click(function() {
            if (autodemoon==0) {
                autodemoon=1;
                $(this).removeClass('greenb');
                $(this).addClass('redb');
            } else {
                autodemoon=0;
                $(this).removeClass('redb');
                $(this).addClass('greenb');
            }
        });
        $("#centarrowNextDiv").click(function() {
            autodemoon=0;
            $("#fb4").removeClass('redb').addClass('greenb');
        });
        $("#centarrowPrevDiv").click(function() {
            autodemoon=0;
            $("#fb4").removeClass('redb').addClass('greenb');
        });
        $("#ddctd").click(function() {
            autodemoon=0;
            $("#fb4").removeClass('redb').addClass('greenb');
        });
        $("#qbuildtbButton").click(function() {
            autodemoon=0;
            $("#fb4").removeClass('redb').addClass('greenb');
        });
        $("#city_map").click(function() {
            if (autodemoon==1) {
                $("#buildingDemolishButton").trigger({type:"click",originalEvent:"1"});
            }
        });

        var sumbut="<button class='tabButton' id='Sum'>Summary</button>";
        $("#items").after(sumbut);
        $("#Sum").click(function() {
            if(sum) {
                opensumwin();
            } else {
                $('#sumWin').show();
            }
        });
        $("#sumWin").click(function() {
            console.log("popsum");
        });

        $("#recruitmentQueue").before(bdcountbox);
        $("#bdcountbut").click(function() {
            if (bdcountshow) {
                //console.log(1);
                $("#bdcountwin").hide();
                $("#bdcountbut").removeClass('tradeqarr2').addClass('tradeqarr1');
                bdcountshow=false;
            } else {
                $("#bdcountwin").show();
                $("#bdcountbut").removeClass('tradeqarr1').addClass('tradeqarr2');
                bdcountshow=true;
            }
        });
        var wood50="<td><button class='brownb' id='wood50'>Add 50%</button></td>";
        $("#woodmaxbutton").parent().after(wood50);
        $("#wood50").click(function() {
            var res=Number($("#maxwoodsend").text().replace(/,/g,""));
            if ($("#landseasendres").val()=="1") {
                var carts=Math.floor(Number($("#availcartscity").text())/2)*1000;
            } else {
                var carts=Math.floor(Number($("#availshipscity").text())/2)*10000;
            }
            if (res>carts) {
                res=carts;
            }
            $("#woodsendamt").val(res);
        });
        var stone50="<td><button class='brownb' id='stone50'>Add 50%</button></td>";
        $("#stonemaxbutton").parent().after(stone50);
        $("#stone50").click(function() {
            if ($("#landseasendres").val()=="1") {
                var carts=Math.floor(Number($("#availcartscity").text())/2)*1000;
            } else {
                var carts=Math.floor(Number($("#availshipscity").text())/2)*10000;
            }
            var res=Number($("#maxstonesend").text().replace(/,/g,""));
            if (res>carts) {
                res=carts;
            }
            $("#stonesendamt").val(res);
        });
        var iron50="<td><button class='brownb' id='iron50'>Add 50%</button></td>";
        $("#ironmaxbutton").parent().after(iron50);
        $("#iron50").click(function() {
            var res=Number($("#maxironsend").text().replace(/,/g,""));
            if ($("#landseasendres").val()=="1") {
                var carts=Math.floor(Number($("#availcartscity").text())/2)*1000;
            } else {
                var carts=Math.floor(Number($("#availshipscity").text())/2)*10000;
            }
            if (res>carts) {
                res=carts;
            }
            $("#ironsendamt").val(res);
        });
        var food50="<td><button class='brownb' id='food50'>Add 50%</button></td>";
        $("#foodmaxbutton").parent().after(food50);
        $("#food50").click(function() {
            var res=Number($("#maxfoodsend").text().replace(/,/g,""));
            if ($("#landseasendres").val()=="1") {
                var carts=Math.floor(Number($("#availcartscity").text())/2)*1000;
            } else {
                var carts=Math.floor(Number($("#availshipscity").text())/2)*10000;
            }
            if (res>carts) {
                res=carts;
            }
            $("#foodsendamt").val(res);
        });
        //shrine planer part
        var shrinebut="<button class='regButton greenb' id='shrineP' style='width: 98%;margins: 1%;'>Shrine Planner</button>";
        $("#inactiveshrineInfo").before(shrinebut);
        $("#shrineP").click(function() {
            if (beentoworld) {
                shrinec=[[]];
                splayers={name:[],ally:[],cities:[]};
                var players=[];
                var coords=$("#coordstochatGo3").attr("data");
                var shrinex=parseInt(coords);
                var shriney=Number(coords.match(/\d+$/)[0]);
                var shrinecont=Number(Math.floor(shrinex/100)+10*Math.floor(shriney/100));
                for (var i in wdata.cities) {
                    var tempx=Number(wdata.cities[i].substr(8,3))-100;
                    var tempy=Number(wdata.cities[i].substr(5,3))-100;
                    var cont=Number(Math.floor(tempx/100)+10*Math.floor(tempy/100));
                    if (cont==shrinecont) {
                        var dist=Math.sqrt((tempx-shrinex)*(tempx-shrinex)+(tempy-shriney)*(tempy-shriney));
                        //console.log("dist");
                        if (dist<10) {
                            var l=Number(wdata.cities[i].substr(11,1));
                            var pid=Number(wdata.cities[i].substr(12,l));
                            var pname=pldata[pid];
                            //console.log(pname);
                            //console.log(splayers.name.indexOf(pname),pname,splayers.name);
                            var csn=[3,4,7,8];
                            if (csn.indexOf(Number(wdata.cities[i].charAt(4)))>-1) {
                                shrinec.push(["castle",pname,0,tempx,tempy,dist,"0",0,0,0]);
                            } else {
                                shrinec.push(["city",pname,0,tempx,tempy,dist,"0",0,0,0]);
                            }
                        }
                    }
                }
                shrinec.sort(function(a,b) {return a[5]-b[5];});
                var planwin="<div id='shrinePopup' style='width:40%;height:50%;left: 360px; z-index: 3000;' class='popUpBox'><div class='popUpBar'><span class=\"ppspan\">Shrine Planner</span><button id='hidec' class='greenb' style='margin-left:10px;border-radius: 7px;margin-top: 2px;height: 28px;'>Hide Cities</button>";
                planwin+="<button id='addcity' class='greenb' style='margin-left:10px;border-radius: 7px;margin-top: 2px;height: 28px;'>Add City</button><button id=\"sumX\" onclick=\"$('#shrinePopup').remove();\" class=\"xbutton greenb\"><div id=\"xbuttondiv\"><div><div id=\"centxbuttondiv\"></div></div></div></button></div><div class=\"popUpWindow\" style='height:100%'>";
                planwin+="<div id='shrinediv' class='beigemenutable scroll-pane' style='background:none;border: none;padding: 0px;height:90%;'></div></div>";
                for (var i in shrinec) {
                    if (i<101) {
                        var pname=shrinec[i][1];
                        if (players.indexOf(pname)==-1) {
                            players.push(pname);
                            jQuery.ajax({url: 'includes/gPi.php',type: 'POST',aysnc:false,data: {a: pname},
                                         success: function(data) {
                                             var pinfo=JSON.parse(data);
                                             splayers.name.push(pinfo.player);
                                             splayers.ally.push(pinfo.a);
                                             splayers.cities.push(pinfo.h);
                                             //console.log(pinfo.a,pinfo.h,pinfo.player);
                                        }  
                                         });
                        }
                    }
                }      
                setTimeout(function() {
                $("#reportsViewBox").after(planwin);
                $( "#shrinePopup" ).draggable({ handle: ".popUpBar" , containment: "window", scroll: false});
                $( "#shrinePopup" ).resizable();
                if (localStorage.getItem("hidecities")) {
                    1==1;
                } else {
                    //console.log("hideciies nonexists");
                    localStorage.setItem("hidecities","0");
                }
                if (localStorage.getItem("hidecities")=="1") {
                    $("#hidec").html("Show Cities");
                }
                $("#hidec").click(function() {
                    if (localStorage.getItem("hidecities")=="0") {
                        hidecities();
                        localStorage.setItem("hidecities","1");
                        $("#hidec").html("Show Cities");
                    } else if (localStorage.getItem("hidecities")=="1") {
                        showcities();
                        localStorage.setItem("hidecities","0");
                        $("#hidec").html("Hide Cities");
                    }
                });
                updateshrine();
                var addcitypop="<div id='addcityPopup' style='width:500px;height:100px;left: 360px; z-index: 3000;' class='popUpBox'><div class='popUpBar'><span class=\"ppspan\">Add City</span>";
                addcitypop+="<button id=\"sumX\" onclick=\"$('#addcityPopup').remove();\" class=\"xbutton greenb\"><div id=\"xbuttondiv\"><div><div id=\"centxbuttondiv\"></div></div></div></button></div><div class=\"popUpWindow\" style='height:100%'>";
                addcitypop+="<div><table><td>X: <input id='addx' type='number' style='width: 35px;height: 22px;font-size: 10px;'></td><td>y: <input id='addy' type='number' style='width: 35px;height: 22px;font-size: 10px;'></td>";
                addcitypop+="<td>score: <input id='addscore' type='number' style='width: 45px;height: 22px;font-size: 10px;'></td><td>Type: <select id='addtype' class='greensel' style='font-size: 15px !important;width:55%;height:30px;'>";
                addcitypop+="<option value='city'>City</option><option value='castle'>Castle</option></select></td><td><button id='addadd' class='greenb'>Add</button></td></table></div></div>";
                $("#addcity").click(function() {
                    $("body").append(addcitypop);
                    $( "#addcityPopup" ).draggable({ handle: ".popUpBar" , containment: "window", scroll: false});
                    $("#addadd").click(function() {
                        tempx=$("#addx").val();
                        tempy=$("#addy").val();
                        dist=Math.sqrt((tempx-shrinex)*(tempx-shrinex)+(tempy-shriney)*(tempy-shriney));
                        var temp=[$("#addtype").val(),"Poseidon","Atlantis",tempx,tempy,dist,"1",$("#addscore").val(),"Hellas","1"];
                        shrinec.push(temp);
                        shrinec.sort(function(a,b) {return a[5]-b[5];});
                        updateshrine();
                        $("#addcityPopup").remove();
                    });
                });
                },2000);
            } else {
                alert("Press World Button");
            }
        });
    });
    //Building count
    function makebuildcount() {
    $("#bdtable").remove();
    var currentbd={name:[],bid:[],count:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]};
    var j;
    var bdtypecount=-1;
    var bdNumber=-1;

    for (var i in buildingdata) {
        if (buildings.bid.indexOf(buildingdata[i].bid)>-1) {
            if (currentbd.bid.indexOf(buildingdata[i].bid)>-1) {
                j=currentbd.bid.indexOf(buildingdata[i].bid);
                currentbd.count[j]+=1;
                bdNumber+=1;
            } else {
                bdtypecount+=1;
                j=buildings.bid.indexOf(buildingdata[i].bid);
                currentbd.name[bdtypecount]=buildings.name[j];
                currentbd.bid[bdtypecount]=buildings.bid[j];
                currentbd.count[bdtypecount]+=1;
                bdNumber+=1;
            }
        }
    }
    var bdtable="<table id='bdtable'><tbody><tr>";
    for (var i in currentbd.bid) {
        if (i<9 || ((i>9 && i<19) || (i>19 && i<29))) {
            bdtable+="<td style='text-align:center; width:30px; height:30px;'><div style='background-image: url(/images/city/buildings/icons/"+currentbd.name[i]+".png); background-size:contain;background-repeat:no-repeat;width:30px; height:30px;'></div>"+Number(currentbd.count[i])+"</td>";
        }
        if (i==9 || i==19) {
            bdtable+="</tr><tr>";
            bdtable+="<td style='text-align:center; width:30px; height:30px;'><div style='background-image: url(/images/city/buildings/icons/"+currentbd.name[i]+".png); background-size:contain;background-repeat:no-repeat;width:30px; height:30px;'></div>"+Number(currentbd.count[i])+"</td>";
        }
    }
    bdtable+="</tr></tbody></table>";
    $("#bdcountwin").html(bdtable);
    $("#numbdleft").html(bdNumber);
}
//troop predictor part
	$(document).ready(function() {
        //adding 2 elements into the html
        var incomingtabledata = $("#incomingsAttacksTable").children().children().children();
        $("#incomingsAttacksTable table thead tr th:nth-child(2)").width(140);
            var Addth ="<th>Lock time</th>";
            incomingtabledata.append(Addth);
            var Addth1 ="<th>Travel time</th>";
            incomingtabledata.append(Addth1);
        $("#allianceIncomings").parent().click(function() {
            setTimeout(function(){incomings();}, 5000);
        });
        $("#incomingsPic").click(function() {
            setTimeout(function(){incomings();}, 5000);
        });
    });
	function roundingto2(num) {
        return +(Math.round(num + "e+2")  + "e-2");
    }
    function twodigitnum(n){
    return n > 9 ? "" + n: "0" + n;
    }
    function incomings() {
        //  below will give u a variable called speeeed which contains all the possible speed bonuses that can be in game
        var speeeed=[];
        speeeed[0]=0;
        for (var i=1; i<201; i++){
            speeeed[i]=speeeed[i-1]+0.5;
        }
        //  separating all possible speeds for troop types
        var navyspeed = [];
        var scoutspeed = [];
        var cavspeed = [];
        var infspeed = [];
        var artspeed = [];
        var senspeed = [];
        var temp;
        for (i in speeeed) {
            temp=5/(1+speeeed[i]*1.0/100);
            navyspeed[i]= roundingto2(temp);
            temp=8/(1+speeeed[i]*1.0/100);
            scoutspeed[i]= roundingto2(temp);
            temp=10/(1+speeeed[i]*1.0/100);
            cavspeed[i]= roundingto2(temp);
            temp=20/(1+speeeed[i]*1.0/100);
            infspeed[i]= roundingto2(temp);
            temp=30/(1+speeeed[i]*1.0/100);
            artspeed[i]= roundingto2(temp);
            temp=40/(1+speeeed[i]*1.0/100);
            senspeed[i]= roundingto2(temp);
        }
        $("#iaBody tr").each(function() {
            var tid=$(':nth-child(5)',this).children().children().attr("data");
            var sid=$(':nth-child(10)',this).children().attr("data");
            var tx=tid%65536;
            var sx=sid%65536;
            var ty=(tid-tx)/65536;
            var sy=(sid-sx)/65536;
            var tcont=Math.floor(tx/100)+Math.floor(ty/100)*10;
            var scont=Math.floor(sx/100)+Math.floor(sy/100)*10;
            var dist=Math.sqrt((ty-sy)*(ty-sy)+(tx-sx)*(tx-sx));
            var atime=$(':nth-child(6)',this).text();
            var stime=$(':nth-child(11)',this).text();
            var hdiff=atime.substring(0,2)-stime.substring(0,2);
            var mdiff=atime.substring(3,5)-stime.substring(3,5);
            var sdiff=atime.substring(6,8)-stime.substring(6,8);
            var d = new Date();
            var x = new Date();
            var arrivaltimemonth;
            var arrivaltimedate;
            if(atime.length===14){
                arrivaltimemonth=Number(atime.substring(9,11));//month
                arrivaltimedate=Number(atime.substring(12,14));//date
            }else{
                arrivaltimemonth=d.getMonth() +1;
                arrivaltimedate=d.getDate();
            }
            var time;
            if (hdiff>=0) {time=60*hdiff;}
            else {time=(24+hdiff)*60;}
            if((atime.length===14 || stime.length===14) && hdiff>0){
                time+=+1440;
                hdiff+=24;
            }
            time+=mdiff;
            time+=sdiff/60;
            var ispeed=roundingto2(time/dist);
            var nspeed=roundingto2((time-60)/dist);
            //adds time taken by troops to return home to arrival time and changed formats
            var locks;
            var lockm;
            var lockh;
            if(sdiff>=0){locks=sdiff;}
            else{locks=60+sdiff;
                 mdiff=mdiff-1;}
            if(mdiff>=0){lockm=mdiff;}
            else{lockm=60+mdiff;
                 hdiff=hdiff-1;}
            if(hdiff>=0){lockh=hdiff;}
            else{lockh=hdiff+24;}
            var travelingts=twodigitnum(locks);
            var travelingtm=twodigitnum(lockm);
            var travelingth=twodigitnum(lockh);
            var locktimeh= Number(lockh)+Number(atime.substring(0,2));
            var locktimem=Number(lockm)+Number(atime.substring(3,5));
            var locktimes=Number(locks)+Number(atime.substring(6,8));
            if(locktimes>59){locktimes=locktimes-60;
                             locktimem=locktimem+1;}
            if(locktimem>59){locktimem=locktimem-60;
                             locktimeh=locktimeh+1;}
            if(locktimeh>23){locktimeh=locktimeh-24;
                             arrivaltimedate=arrivaltimedate+1;}
            var atm1=[1,3,5,7,8,10,12];
            var atm2=[4,6,9,11];
            if(atm1.indexOf(arrivaltimemonth) >0){
                if(arrivaltimedate>31){arrivaltimedate=1;}}
            if(atm2.indexOf(arrivaltimemonth) >0){
                if(arrivaltimedate>30){arrivaltimedate=1;}}
            if(arrivaltimemonth===02){
                if(arrivaltimedate>28){arrivaltimedate=1;}}
            var addt=$(this);
            locktimeh=twodigitnum(locktimeh);
            locktimem=twodigitnum(locktimem);
            locktimes=twodigitnum(locktimes);
            arrivaltimemonth=twodigitnum(arrivaltimemonth);
            arrivaltimedate=twodigitnum(arrivaltimedate);
            //output of results
            var newtd="<td></td>";
            if (addt.children().length === 14) {
                $(this).append(newtd);
                $(':nth-child(15)',this).text(locktimeh+":"+locktimem+":"+locktimes+" "+arrivaltimemonth+"/"+arrivaltimedate);
                if($(':nth-child(2)',this).text()=="Sieging"){
                    $(':nth-child(15)',this).css("color", "red");
                }
            }
            if (addt.children().length === 15) {
                $(this).append(newtd);
                $(':nth-child(16)',this).text(travelingth+":"+travelingtm+":"+travelingts);
                if($(':nth-child(2)',this).text()=="Sieging"){
                    $(':nth-child(16)',this).css("color", "red");
                }
            }
            if ($(':nth-child(2)',this).text()=="-") {
                // below will return -1 if calculated speed is not found inside the speed arrays and the correct index if it is found within the speed arrays
                var zns = navyspeed.indexOf(nspeed);
                var zss = scoutspeed.indexOf(ispeed);
                var zcs = cavspeed.indexOf(ispeed);
                var zis = infspeed.indexOf(ispeed);
                var zas = artspeed.indexOf(ispeed);
                var zsn = senspeed.indexOf(ispeed);
                // below use ispeed and above return values to get the correct incoming troop type
                if (tcont==scont) {
                    if (ispeed>30) {
                        if(zsn == -1){$(':nth-child(2)',this).text("Tower?/Sen");}
                        else
                        {$(':nth-child(2)',this).text("senator "+speeeed[zsn]+"%");}
                    }
                    if (ispeed>20 && ispeed<=30) {
                        if(zsn == -1 && zas == -1){$(':nth-child(2)',this).text("Tower?/Art/Sen");}
                        if(zsn == -1 && zas != -1){$(':nth-child(2)',this).text("Artillery "+speeeed[zas]+"%");}
                        if(zsn != -1 && zas == -1){$(':nth-child(2)',this).text("Senator "+speeeed[zsn]+"%");}
                        if(zsn != -1 && zas != -1){$(':nth-child(2)',this).text("Art "+speeeed[zas]+"%"+"/"+"Sen "+speeeed[zsn]+"%");}
                    }
                    if (ispeed==20){$(':nth-child(2)',this).text("Inf 0%/Art 50%/Sen 100%");}
                    if (ispeed>=15 && ispeed<20) {
                        if(zis == -1 && zas == -1){$(':nth-child(2)',this).text("Tower?/Inf &above");}
                        if(zis == -1 && zas != -1){$(':nth-child(2)',this).text("Artillery "+speeeed[zas]+"%");}
                        if(zis != -1 && zas == -1){$(':nth-child(2)',this).text("Infantry "+speeeed[zis]+"%");}
                        if(zis != -1 && zas != -1){$(':nth-child(2)',this).text("Inf "+speeeed[zis]+"%"+"/"+"Art "+speeeed[zas]+"%");}
                    }
                    if (ispeed>=10 && ispeed<15) {
                        if(zis == -1 && zcs == -1){$(':nth-child(2)',this).text("Tower?/Cav &above");}
                        if(zis == -1 && zcs != -1){$(':nth-child(2)',this).text("Cav "+speeeed[zcs]+"%");}
                        if(zis != -1 && zcs == -1){$(':nth-child(2)',this).text("Inf "+speeeed[zis]+"%");}
                        if(zis != -1 && zcs != -1){$(':nth-child(2)',this).text("Cav "+speeeed[zcs]+"%"+"/"+"Inf "+speeeed[zis]+"%");}
                    }
                    if (ispeed>8 && ispeed<10) {
                        if(zcs == -1){$(':nth-child(2)',this).text("Tower?/Cav &above");}
                        else
                        {$(':nth-child(2)',this).text("Cav "+speeeed[zcs]+"%");}
                    }
                    if (ispeed>5 && ispeed<=8){
                        if(zss == -1 && zcs == -1){$(':nth-child(2)',this).text("Tower?/Scout &above");}
                        if(zss == -1 && zcs != -1){$(':nth-child(2)',this).text("Cav "+speeeed[zcs]+"%");}
                        if(zss != -1 && zcs == -1){$(':nth-child(2)',this).text("Scout "+speeeed[zss]+"%");}
                        if(zss != -1 && zcs != -1){$(':nth-child(2)',this).text("Scout "+speeeed[zss]+"%"+"/"+"Cav "+speeeed[zcs]+"%");}
                    }
                    if (ispeed==5){$(':nth-child(2)',this).text("Navy 0%/Scout 60%/Cav 100%");}
                    if (ispeed>=4 && ispeed<5) {
                        if(zss == -1 && zns == -1){$(':nth-child(2)',this).text("Tower?/scout &above");}
                        if(zss == -1 && zns != -1){$(':nth-child(2)',this).text("Navy "+speeeed[zns]+"%");}
                        if(zss != -1 && zns == -1){$(':nth-child(2)',this).text("Scout "+speeeed[zss]+"%");}
                        if(zss != -1 && zns != -1){$(':nth-child(2)',this).text("Navy "+speeeed[zns]+"%"+"/"+"Scout "+speeeed[zss]+"%");}
                    }
                    if (ispeed<4){
                        if(zns == -1){$(':nth-child(2)',this).text("Tower?/Navy &above");}
                        else
                        {$(':nth-child(2)',this).text("Navy "+speeeed[zns]+"%");}
                    }
                } else if ($(':nth-child(1)',this).html()) {$(':nth-child(2)',this).text("Portal");}
                else {
                    if(zns != -1){$(':nth-child(2)',this).text("Navy "+speeeed[zns]+"%");}
                    else{$(':nth-child(2)',this).text("Tower?/Navy");}
                }
            }
        });
    }
    //layout part,raid return part
    function openreturnwin(data) {
        $(".toptdinncommtbl1:first").click();
        setTimeout(function() {
            $("#outgoingPopUpBox").hide();
        },300);
        var selectcont=$("#idleCsel").clone(false).attr({id:"selcr",style:"width:40%;height:28px;font-size:11;border-radius:6px;margin:7px"});
        var returnwin="<div id='returnAll' style='width:300px;height:320px;background-color: #E2CBAC;-moz-border-radius: 10px;-webkit-border-radius: 10px;border-radius: 10px;border: 4px ridge #DAA520;position:absolute;right:100px;top:100px; z-index:1000000;'><div class=\"popUpBar\"> <span class=\"ppspan\">Return all troops in all cities</span>";
        returnwin+="<button id=\"cfunkyX\" onclick=\"$('#returnAll').remove();\" class=\"xbutton greenb\"><div id=\"xbuttondiv\"><div><div id=\"centxbuttondiv\"></div></div></div></button></div><div id='returnbody' class=\"popUpWindow\">";
        returnwin+="</div></div>";
        var selecttype="<select id='selType' class='greensel' style='width:50%;height:28px;font-size:11;border-radius:6px;margin:7px'><option value='1'>Offence and Defense</option><option value='2'>Offence</option><option value='3'>Defense</option></select><br>";
        var selectret=$("#raidrettimesela").clone(false).attr({id:"returnSel",style:"width:40%;height:28px;font-size:11;border-radius:6px;margin:7px"});
        var selecttime="<br><div id='timeblock' style='height:100px; width 95%'><div id='timesel' style='display: none;'><span style='text-align:left;font-weight:800;margin-left:2%;'>Input latest return time:</span><br><table style='width:80%;margin-left:10px'><thead><tr style='text-align:center;'><td>Hr</td><td>Min</td><td>Sec</td><td colspan='2'>Date</td></tr></thead><tbody>";
        selecttime+="<tr><td><input id='returnHr' type='number' style='width: 35px;height: 22px;font-size: 10px;padding: none !important;color: #000;' value='00'></td><td><input id='returnMin' style='width: 35px;height: 22px;font-size: 10px;padding: none !important;color: #000;' type='number' value='00'></td>";
        selecttime+="<td><input style='width: 35px;height: 22px;font-size: 10px;padding: none !important;color: #000;' id='returnSec' type='number' value='00'></td><td colspan='2'><input style='width:90px;' id='returnDat' type='text' value='00/00/0000'></td></tr></tbody></table></div></div>";
        var returnAllgo="<button id='returnAllGo' style='margin-left:30%; width: 35%;height: 30px !important; font-size: 12px !important; position: static !important;' class='regButton greenb'>Start Return All</button><br>";
        var nextcity="<button id='nextCity' style='display: none;margin-left:10%; width: 35%;height: 30px !important; font-size: 12px !important; position: static !important;' class='regButton greenb'>Next City</button>";
        var returntroops="<button id='returnTroops' style='display: none;margin-left:10%; width: 35%;height: 30px !important; font-size: 12px !important; position: static !important;' class='regButton greenb'>Return troops</button>";
        var selectlist=$("#organiser").clone(false).attr({id:"selClist",style:"width:40%;height:28px;font-size:11;border-radius:6px;margin:7px"});
        $("body").append(returnwin);
        $("#returnAll").draggable({ handle: ".popUpBar" , containment: "window", scroll: false});
        $("#returnbody").html(selectcont);
        //$("#selcr").attr("style","width:40%;height:28px;font-size:11;border-radius:6px;margin:7px");
        $("#selcr").after(selecttype);
        $("#selType").after(selectret);
        $("#returnSel").after(selectlist);
        $("#selClist").after(selecttime);
        $(function() {
        $( "#returnDat" ).datepicker();
        });
        //$("#timesel").hide();
        $("#returnbody").append(returnAllgo);
        $("#returnAllGo").after(nextcity);
        $("#nextCity").after(returntroops);
        //$("#nextCity").hide();
        $("#returnSel").change(function() {
            if ($("#returnSel").val()==3) {
                $("#timesel").show();
            } else {
                $("#timesel").hide();
            }
        });
        var j,end,bb,cc,aa;
         var returncities={cid:[],cont:[]};
        $("#returnAllGo").click(function() {
            if ($("#selClist").val()=="all") {
                for (var i in data) {
                    var cont=data[i].c.co;
                    if ($("#selcr").val()==56) {
                        if($("#selType").val()==1) {
                            returncities.cid.push(data[i].i);
                            returncities.cont.push(cont);
                        }
                        if($("#selType").val()==2) {
                            if (data[i].tr.indexOf(5)>-1 || data[i].tr.indexOf(6)>-1 || data[i].tr.indexOf(10)>-1 || data[i].tr.indexOf(11)>-1 || data[i].tr.indexOf(12)>-1 || data[i].tr.indexOf(13)>-1 || data[i].tr.indexOf(14)>-1 || data[i].tr.indexOf(16)>-1) {
                                returncities.cid.push(data[i].i);
                                returncities.cont.push(cont);
                            }
                        }
                        if($("#selType").val()==3) {
                            if (data[i].tr.indexOf(1)>-1 || data[i].tr.indexOf(2)>-1 || data[i].tr.indexOf(3)>-1 || data[i].tr.indexOf(4)>-1 || data[i].tr.indexOf(8)>-1 || data[i].tr.indexOf(9)>-1 || data[i].tr.indexOf(15)>-1) {
                                returncities.cid.push(data[i].i);
                                returncities.cont.push(cont);
                            }
                        }
                    }
                    if (cont==Number($("#selcr").val())) {
                        if($("#selType").val()==1) {
                            returncities.cid.push(data[i].i);
                            returncities.cont.push(cont);
                        }
                        if($("#selType").val()==2) {
                            if (data[i].tr.indexOf(5)>-1 || data[i].tr.indexOf(6)>-1 || data[i].tr.indexOf(10)>-1 || data[i].tr.indexOf(11)>-1 || data[i].tr.indexOf(12)>-1 || data[i].tr.indexOf(13)>-1 || data[i].tr.indexOf(14)>-1 || data[i].tr.indexOf(16)>-1) {
                                returncities.cid.push(data[i].i);
                                returncities.cont.push(cont);
                            }
                        }
                        if($("#selType").val()==3) {
                            if (data[i].tr.indexOf(1)>-1 || data[i].tr.indexOf(2)>-1 || data[i].tr.indexOf(3)>-1 || data[i].tr.indexOf(4)>-1 || data[i].tr.indexOf(8)>-1 || data[i].tr.indexOf(9)>-1 || data[i].tr.indexOf(15)>-1) {
                                returncities.cid.push(data[i].i);
                                returncities.cont.push(cont);
                            }
                        }
                    }
                }
                //}
            } else {
                $.each(clc, function(key, value) {
                    if (key==$("#selClist").val()) {
                        returncities.cid=value;
                    }
                });
            }
            $("#organiser").val("all").change();
            //$("#outgoingPopUpBox").open();
            bb=$("#returnSel").val();
            if (bb==3) {
                cc=$("#returnDat").val()+" "+$("#returnHr").val()+":"+$("#returnMin").val()+":"+$("#returnSec").val();
            } else {cc=0;}
            j=0; end=returncities.cid.length;
            aa=returncities.cid[j];
            $("#cityDropdownMenu").val(aa).change();
            $("#returnTroops").show();
            $("#nextCity").show();
            //$("#returnAllGo").attr("id","nextCity").html("Next City");
            $("#returnAllGo").hide();
        });
        $("#returnTroops").click(function() {
            $("#raidrettimesela").val(bb).change();
            $("#raidrettimeselinp").val(cc);
            jQuery("#doneOGAll")[0].click();
        });
        $("#nextCity").click(function() {
            j++;
            if (j==end)  {
                alert("Return all complete");
                $("#returnAll").remove();
                         }
            else {
                aa=returncities.cid[j];
                $("#cityDropdownMenu").val(aa).change();
            }
        });
    }
    //Boss script
    function getbossinfo() {
        var temp;
        bossinfo={x:[],y:[],lvl:[],data:[],name:[],cont:[],distance:[],cid:[]};
        for (var i in wdata.bosses) {
                var templvl=Number(wdata.bosses[i].substr(1,2))-10;
                var tempy=Number(wdata.bosses[i].substr(4,3))-100;
                var tempx=Number(wdata.bosses[i].substr(7,3))-100;
                var cid=tempy*65536+tempx;
                bossinfo.x.push(tempx);
                bossinfo.y.push(tempy);
                bossinfo.lvl.push(templvl);
                bossinfo.cont.push(Number(Math.floor(tempx/100)+10*Math.floor(tempy/100)));
                //bossinfo.distance.push(distance);
                bossinfo.data.push(wdata.bosses[i]);
                bossinfo.cid.push(cid);
            }
    }
    function openbosswin() {
        var bosslist={name:[],x:[],y:[],lvl:[],distance:[],cid:[],time:[],cont:[]};
        for (var i in bossinfo.cont) {
            var distance=(Math.sqrt((bossinfo.x[i]-city.x)*(bossinfo.x[i]-city.x)+(bossinfo.y[i]-city.y)*(bossinfo.y[i]-city.y)));
            //if ((bossinfo.cont[i]==city.cont) && ((bossinfo.name[i]!="Triton")) && (bossinfo.data[i].charAt(0,1)==1)) {
            if ((city.th[2] || city.th[3] || city.th[4]|| city.th[5]|| city.th[6]|| city.th[8]|| city.th[9]|| city.th[10]|| city.th[11]) && city.th[14]==0) {
                if (bossinfo.cont[i]==city.cont) {
                    if (city.th[2] || city.th[3] || city.th[4]|| city.th[5]|| city.th[6]) {
                        var minutes=distance*ttspeed[2]/ttspeedres[2];
                        var time=Math.floor(minutes/60)+"h "+Math.floor(minutes % 60)+"m";
                    }
                    if (city.th[8] || city.th[9] || city.th[10]|| city.th[11]) {
                        var minutes=distance*ttspeed[8]/ttspeedres[8];
                        var time=Math.floor(minutes/60)+"h "+Math.floor(minutes % 60)+"m";
                    }
                    //bosslist.name.push(bossinfo.name[i]);
                    bosslist.x.push(bossinfo.x[i]);
                    bosslist.y.push(bossinfo.y[i]);
                    bosslist.cid.push(Number(bossinfo.y[i]*65536+bossinfo.x[i]));
                    bosslist.lvl.push(bossinfo.lvl[i]);
                    bosslist.distance.push(roundToTwo(distance));
                    bosslist.time.push(time);
                    bosslist.cont.push(bossinfo.cont[i]);
                }
            }
            if (distance<180) {
                if (city.th[14] || city.th[15] || city.th[16]) {
                    var minutes=distance*ttspeed[14]/ttspeedres[14];
                    var time=Math.floor(minutes/60)+"h "+Math.floor(minutes % 60)+"m";
                    //bosslist.name.push(bossinfo.name[i]);
                    bosslist.x.push(bossinfo.x[i]);
                    bosslist.y.push(bossinfo.y[i]);
                    bosslist.cid.push(Number(bossinfo.y[i]*65536+bossinfo.x[i]));
                    bosslist.lvl.push(bossinfo.lvl[i]);
                    bosslist.distance.push(roundToTwo(distance));
                    bosslist.time.push(time);
                    bosslist.cont.push(bossinfo.cont[i]);
                }
            }
        }
        //var bosswin="<table id='bosstable' class='beigetablescrollp sortable'><thead><tr><th></th><th>Type</th><th>Level</th><th>Coordinates</th><th>Travel Time</th><th id='hdistance'>Distance</th></tr></thead>";
        var bosswin="<table id='bosstable' class='beigetablescrollp sortable'><thead><tr><th>Coordinates</th><th>Level</th><th>Continent</th><th>Travel Time</th><th id='hdistance'>Distance</th></tr></thead>";
        bosswin+="<tbody>";
        for (var i in bosslist.x) {
            var j=bosses.name.indexOf(bosslist.name[i]);
            /*bosswin+="<tr id='bossline"+bosslist.cid[i]+"' class='dunginf'><td><button id='"+bosslist.cid[i]+"' class='greenb'>Hit Boss</button></td>";
            bosswin+="<td style='text-align: center;'><div class='"+bosses.pic[j]+"'></div></td><td style='text-align: center;'>"+bosslist.lvl[i]+"</td>";
            bosswin+="<td id='cl"+bosslist.cid[i]+"' class='coordblink shcitt' data='"+bosslist.cid[i]+"' style='text-align: center;'>"+bosslist.x[i]+":"+bosslist.y[i]+"</td><td style='text-align: center;'>"+bosslist.time[i]+"</td><td style='text-align: center;'>"+bosslist.distance[i]+"</td></tr>";*/
            bosswin+="<tr id='bossline"+bosslist.cid[i]+"' class='dunginf'><td id='cl"+bosslist.cid[i]+"' class='coordblink shcitt' data='"+bosslist.cid[i]+"' style='text-align: center;'>"+bosslist.x[i]+":"+bosslist.y[i]+"</td>";
            bosswin+="<td style='text-align: center;font-weight: bold;'>"+bosslist.lvl[i]+"</td><td style='text-align: center;'>"+bosslist.cont[i]+"</td>";
            bosswin+="<td style='text-align: center;'>"+bosslist.time[i]+"</td><td style='text-align: center;'>"+bosslist.distance[i]+"</td></tr>";
        }
        bosswin+="</tbody></table></div>";
        var idle="<table id='idleunits' class='beigetablescrollp'><tbody><tr><td style='text-align: center;'><span>Idle troops:</span></td>";
        for (var i in city.th) {
            var notallow=[0,1,7,12,13];
            if (notallow.indexOf(i)==-1) {
                if (city.th[i]>0) {
                    idle+="<td><div class='"+tpicdiv[i]+"' style='text-align: right;'></div></td><td style='text-align: left;'><span id='thbr"+i+"' style='text-align: left;'>"+city.th[i]+"</span></td>";
                }
            }
        }
        idle+="</tbody></table>";
        $("#bossbox").html(bosswin);
        $("#idletroops").html(idle);
        var newTableObject = document.getElementById('bosstable');
        sorttable.makeSortable(newTableObject);
        setTimeout(function(){
            $("#hdistance").trigger("click");
            setTimeout(function(){$("#hdistance").trigger("click");},100);
        },100);
        for (var i in bosslist.x) {
            $("#cl"+bosslist.cid[i]).click(function() {
                setTimeout(function(){
                    $("#raidDungGo").trigger("click");
                },500);
            });
        }
    }
    //region view left side troop panel list
    function bossele(){
        var bopti =$("#cityplayerInfo div table tbody");
        var bzTS ="<tr><td>Vanq:</td><td></td></tr><tr><td>R/T:</td><td></td></tr><tr><td>Ranger:</td><td></td></tr><tr><td>Triari:</td><td></td></tr><tr><td>Arb:</td><td></td></tr><tr><td>horse:</td><td></td></tr><tr><td>Sorc:</td><td></td></tr><tr><td>Druid:</td><td></td></tr>";
        bzTS+="<tr><td>Prietess:</td><td></td></tr><tr><td>Praetor:</td><td></td></tr><tr><td>Scout:</td><td></td></tr><tr><td>Galley:</td><td></td></tr><tr><td>Stinger:</td><td></td></tr><tr><td>Warships:</td><td></td></tr>";
        bopti.append(bzTS);
    }
    //auto fill boss and raid numbers
    cotgsubscribe.subscribe( "regional", function( data ) {
            var x=data.x;
            var y=data.y;
            var dtype=data.type;
            var type =data.info.type;
            var lvl =data.info.lvl;
            var prog =data.info.prog;
            var bossname=data.info.name;
            var bossactive=data.info.active;
     //       var troops = cotg.city.troops();
            var home;
            var optimalTS= Math.ceil((other_loot[lvl-1]/10 * ((1-prog/100)+1))*1.02);
            if(dtype==="dungeon"){
                if($("#cityplayerInfo div table tbody tr").length===11){
                    bossele();
                }
                var i=0;
                var home_loot=0;
                var km=[];
                for(var x in citytc) {
                    home=Number(citytc[x]);
                    home_loot+=home*ttloot[i];
                    km.push(home);
                    i+=1;
                    if (i === 17) { break; }
                }
                if(type==="Siren's Cove"){
                    var galleyTS= Math.ceil(optimalTS/100);
                    var stingerTS= Math.ceil(optimalTS/150);
                    var warshipTS= Math.ceil(optimalTS/300);
                    document.getElementById('raidDungGo').onclick = function() {
                        setTimeout(function(){
                            for(var i in km){
                                if(km[14] || km[15] || km[16]){
                                if(km[16]>warshipTS){$('#raidIP16').val(warshipTS);}
                                else if(km[15]>stingerTS){$('#raidIP15').val(stingerTS);}
                                else if(km[14]>galleyTS){$('#raidIP14').val(galleyTS);}
                                else {errorgo(message);}
                                }
                            }
                        }, 1500);
                    };
                    $("#cityplayerInfo div table tbody tr:nth-child(5) td:nth-child(2)").text("0");
                    $("#cityplayerInfo div table tbody tr:nth-child(6) td:nth-child(2)").text("0");
                    $("#cityplayerInfo div table tbody tr:nth-child(7) td:nth-child(2)").text("0");
                    $("#cityplayerInfo div table tbody tr:nth-child(8) td:nth-child(2)").text("0");
                    $("#cityplayerInfo div table tbody tr:nth-child(9) td:nth-child(2)").text("0");
                    $("#cityplayerInfo div table tbody tr:nth-child(10) td:nth-child(2)").text("0");
                    $("#cityplayerInfo div table tbody tr:nth-child(11) td:nth-child(2)").text("0");
                    $("#cityplayerInfo div table tbody tr:nth-child(12) td:nth-child(2)").text("0");
                    $("#cityplayerInfo div table tbody tr:nth-child(13) td:nth-child(2)").text("0");
                    $("#cityplayerInfo div table tbody tr:nth-child(14) td:nth-child(2)").text("0");
                    $("#cityplayerInfo div table tbody tr:nth-child(15) td:nth-child(2)").text("0");//scout

                    $("#cityplayerInfo div table tbody tr:nth-child(16) td:nth-child(2)").text(galleyTS);
                    $("#cityplayerInfo div table tbody tr:nth-child(17) td:nth-child(2)").text(stingerTS);
                    $("#cityplayerInfo div table tbody tr:nth-child(18) td:nth-child(2)").text(warshipTS);
                }
                if(type==="Mountain Cavern"){
                    document.getElementById('raidDungGo').onclick = function() {
                        setTimeout(function(){
                            var total_lootm= Math.ceil((mountain_loot[Number(lvl)-1] * ((1-Number(prog)/100)+1))*1.02);
                            if(home_loot>total_lootm){
                                var option_numbersm=Math.floor(home_loot/total_lootm);
                                var templ1m=((home_loot/total_lootm)*100)/option_numbersm;
                                var templ2m=((templ1m-100)/templ1m)*100;
                                for(var i=0; i<14; i++){
                                    if(km[i]!==0){
                                        var templ3m=km[i]/option_numbersm;
                                        km[i]=Math.floor(templ3m*(1-(templ2m/100)));
                                        $("#raidIP"+i).val(km[i]);
                                    }
                                }
                            }
                        }, 1500);
                    };
                    var optimalTSM= Math.ceil((mountain_loot[lvl-1]/10 * ((1-prog/100)+1))*1.02);
                    var cavoptim=Math.ceil((optimalTSM *2)/3);
                    var praoptim=Math.ceil(optimalTSM/2);
                    var sorcoptim=Math.ceil(optimalTSM *2);
                    var RToptim=Math.ceil(optimalTSM/3);
                    $("#cityplayerInfo div table tbody tr:nth-child(5) td:nth-child(2)").text(optimalTSM);//vanq
                    $("#cityplayerInfo div table tbody tr:nth-child(6) td:nth-child(2)").text(RToptim+"/"+RToptim);//RT
                    $("#cityplayerInfo div table tbody tr:nth-child(7) td:nth-child(2)").text(optimalTSM);//ranger
                    $("#cityplayerInfo div table tbody tr:nth-child(8) td:nth-child(2)").text(praoptim);//triari
                    $("#cityplayerInfo div table tbody tr:nth-child(9) td:nth-child(2)").text(cavoptim);//arb
                    $("#cityplayerInfo div table tbody tr:nth-child(10) td:nth-child(2)").text(cavoptim);//horse
                    $("#cityplayerInfo div table tbody tr:nth-child(11) td:nth-child(2)").text(sorcoptim);//sorc
                    $("#cityplayerInfo div table tbody tr:nth-child(12) td:nth-child(2)").text(optimalTSM);//druid
                    $("#cityplayerInfo div table tbody tr:nth-child(13) td:nth-child(2)").text(optimalTSM);//priestess
                    $("#cityplayerInfo div table tbody tr:nth-child(14) td:nth-child(2)").text(praoptim);//pra
                    $("#cityplayerInfo div table tbody tr:nth-child(15) td:nth-child(2)").text("0");//scout

                    $("#cityplayerInfo div table tbody tr:nth-child(16) td:nth-child(2)").text("0");
                    $("#cityplayerInfo div table tbody tr:nth-child(17) td:nth-child(2)").text("0");
                    $("#cityplayerInfo div table tbody tr:nth-child(18) td:nth-child(2)").text("0");
                }
                if(type==="Hill Cavern" || type==="Forest Cavern"){
                    document.getElementById('raidDungGo').onclick = function() {
                        setTimeout(function(){
                            var total_looto= Math.ceil((other_loot[Number(lvl)-1] * ((1-Number(prog)/100)+1))*1.02);
                            if(home_loot>total_looto){
                                var option_numbers=Math.floor(home_loot/total_looto);
                                var templ1=((home_loot/total_looto)*100)/option_numbers;
                                var templ2=((templ1-100)/templ1)*100;
                                for(var i=0; i<14; i++){
                                    if(km[i]!==0){
                                        var templ3=km[i]/option_numbers;
                                        km[i]=Math.floor(templ3*(1-(templ2/100)));
                                        $("#raidIP"+i).val(km[i]);
                                    }
                                }
                            }
                        }, 1500);
                    };
                    var cavopti=Math.ceil((optimalTS *2)/3);
                    var praopti=Math.ceil(optimalTS/2);
                    var sorcopti=Math.ceil(optimalTS *2);
                    var RTopti=Math.ceil(optimalTS/3);
                    $("#cityplayerInfo div table tbody tr:nth-child(5) td:nth-child(2)").text(optimalTS);//vanq
                    $("#cityplayerInfo div table tbody tr:nth-child(6) td:nth-child(2)").text(RTopti+"/"+RTopti);//RT
                    $("#cityplayerInfo div table tbody tr:nth-child(7) td:nth-child(2)").text(optimalTS);//ranger
                    $("#cityplayerInfo div table tbody tr:nth-child(8) td:nth-child(2)").text(praopti);//triari
                    $("#cityplayerInfo div table tbody tr:nth-child(9) td:nth-child(2)").text(cavopti);//arb
                    $("#cityplayerInfo div table tbody tr:nth-child(10) td:nth-child(2)").text(cavopti);//horse
                    $("#cityplayerInfo div table tbody tr:nth-child(11) td:nth-child(2)").text(sorcopti);//sorc
                    $("#cityplayerInfo div table tbody tr:nth-child(12) td:nth-child(2)").text(optimalTS);//druid
                    $("#cityplayerInfo div table tbody tr:nth-child(13) td:nth-child(2)").text(optimalTS);//priestess
                    $("#cityplayerInfo div table tbody tr:nth-child(14) td:nth-child(2)").text(praopti);//pra
                    $("#cityplayerInfo div table tbody tr:nth-child(15) td:nth-child(2)").text("0");//scout

                    $("#cityplayerInfo div table tbody tr:nth-child(16) td:nth-child(2)").text("0");
                    $("#cityplayerInfo div table tbody tr:nth-child(17) td:nth-child(2)").text("0");
                    $("#cityplayerInfo div table tbody tr:nth-child(18) td:nth-child(2)").text("0");
                }
            }
            if(dtype==="boss"){
                if($("#cityplayerInfo div table tbody tr").length===11){
                    bossele();
                }
                if(data.info.active){
                    message="Inactive Boss";
                    errorgo(message);
                    }
                message="Not enough TS to kill this boss!";
                var attackres=[];
                var attackwres=[];
                for(var i in ttattack){
                    var bossTS= Math.ceil((Number(bossdef[lvl-1])*4)/(Number(ttattack[i])*Number(Total_Combat_Research[i])));
                    attackres.push(bossTS);
                     var bosswTS= Math.ceil((Number(bossdefw[lvl-1])*4)/(Number(ttattack[i])*Number(Total_Combat_Research[i])));
                    attackwres.push(bosswTS);
                }
                var home_strength=0;
                var home_loot=0;
                var km=[];
                var bm=[];
                var bmw=[];
                var kg=[];
                var home_TSw=0;
                var boss_strength= Math.ceil(Number(bossdef[lvl-1])*4);
                var boss_strengthw= Math.ceil(Number(bossdefw[lvl-1])*4);
                var i=0;
                for(var x in citytc) {
                    home=Number(citytc[x]);
                    if(i===0 || i===1 || i===7 || i===12 || i===13){home=0;}
                    kg.push(home);
                    if(i===14 || i===15 || i===16){home=0;}
                    home_strength+=Number(ttattack[i])*Number(home)*Number(Total_Combat_Research[i]);//for land bosses
                    home_TSw+=home*TS_type[i];
                    km.push(home);
                    i+=1;
                    if (i === 17) { break; }
                }
                if(home_strength>boss_strength){//land strong bosses
                    var proportion=home_strength/boss_strength;
                    for(var i in km){
                        bm[i]=Math.ceil(Number(km[i])/proportion);
                    }
                }
                if(home_strength>boss_strengthw){//land weak bosses
                    var proportionw=home_strength/boss_strengthw;
                    for(var i in km){
                        bmw[i]=Math.ceil(Number(km[i])/proportionw);
                    }
                }
                if(bossname==="Triton"){
                    var bmz=[];
                    var home_strengthw=0;
                    var galleytroops=0;
                    var tempgalley=0;
                    var galley_TSneeded=Math.ceil(home_TSw/500);//imaginary
                    if(kg[14]){
                        home_strengthw=home_strength+(Number(galley_TSneeded)*(3000)*Number(Total_Combat_Research[14]));//with imaginary galley
                        if(home_strengthw>boss_strength){//galley+TS for triton
                            var proportionz=home_strengthw/boss_strength;
                            for(var i in km){
                                bmz[i]=Math.ceil(Number(km[i])/proportionz);
                                tempgalley+=bmz[i]*TS_type[i];
                            }
                        }
                        galleytroops=Math.ceil(tempgalley/500);
                    }
                    document.getElementById('raidDungGo').onclick = function() {
                        setTimeout(function(){
                            if((kg[14] || kg[15] || kg[16]) && !kg[5] && !kg[6] && !kg[8] && !kg[9] && !kg[10] && !kg[11] && !kg[2] && !kg[3] && !kg[4]){
                                if(kg[16]>attackwres[16]){$('#raidIP16').val(attackwres[16]);}
                                else if(kg[15]>attackwres[15]){$('#raidIP15').val(attackwres[15]);}
                                else if(kg[14]>attackwres[14]){$('#raidIP14').val(attackwres[14]);}
                                else {errorgo(message);}
                            }else if(kg[14] && (kg[5] || kg[6] || kg[8] || kg[9] || kg[10] || kg[11] || kg[2] || kg[3] || kg[4])){
                                if(kg[14]>galleytroops && bmz.length>0){
                                    for(var i in km){
                                        $('#raidIP'+[i]).val(bmz[i]);
                                    }
                                    $('#raidIP14').val(galleytroops);
                                }else if(kg[14]>attackwres[14]){
                                    $('#raidIP14').val(attackwres[14]);
                                }else {errorgo(message);}
                            }
                            else {errorgo(message);}
                        }, 1500);
                    };
                    $("#cityplayerInfo div table tbody tr:nth-child(5) td:nth-child(2)").text(attackres[5]);//vanq  weak 14,15,16
                    $("#cityplayerInfo div table tbody tr:nth-child(6) td:nth-child(2)").text("0");
                    $("#cityplayerInfo div table tbody tr:nth-child(7) td:nth-child(2)").text("0");//ranger
                    $("#cityplayerInfo div table tbody tr:nth-child(8) td:nth-child(2)").text("0");//triari
                    $("#cityplayerInfo div table tbody tr:nth-child(9) td:nth-child(2)").text("0");//arb
                    $("#cityplayerInfo div table tbody tr:nth-child(10) td:nth-child(2)").text(attackres[10]);//horse
                    $("#cityplayerInfo div table tbody tr:nth-child(11) td:nth-child(2)").text(attackres[6]);//sorc
                    $("#cityplayerInfo div table tbody tr:nth-child(12) td:nth-child(2)").text(attackres[11]);//druid
                    $("#cityplayerInfo div table tbody tr:nth-child(13) td:nth-child(2)").text("0");//priestess
                    $("#cityplayerInfo div table tbody tr:nth-child(14) td:nth-child(2)").text("0");//pra
                    $("#cityplayerInfo div table tbody tr:nth-child(15) td:nth-child(2)").text("0");//scout

                    $("#cityplayerInfo div table tbody tr:nth-child(16) td:nth-child(2)").text(attackwres[14]);
                    $("#cityplayerInfo div table tbody tr:nth-child(17) td:nth-child(2)").text(attackwres[15]);
                    $("#cityplayerInfo div table tbody tr:nth-child(18) td:nth-child(2)").text(attackwres[16]);
                }
                if(bossname=="Cyclops"){
                    document.getElementById('raidDungGo').onclick = function() {
                        setTimeout(function(){
                            for(var i in km){
                                if((km[8] || km[9] || km[10]) && !km[5] && !km[6] && !km[2] && !km[3] && !km[4] && !km[11]){
                                    $('#raidIP'+[i]).val(bmw[i]);
                                    if(bmw.length===0){errorgo(message);
                                                       break;}
                                }else{$('#raidIP'+[i]).val(bm[i]);
                                      if(bm.length===0){errorgo(message);
                                                        break;}}
                            }
                        }, 1500);
                    };
                    $("#cityplayerInfo div table tbody tr:nth-child(5) td:nth-child(2)").text(attackres[5]);//vanq weak 8,9,10
                    $("#cityplayerInfo div table tbody tr:nth-child(6) td:nth-child(2)").text("0");
                    $("#cityplayerInfo div table tbody tr:nth-child(7) td:nth-child(2)").text(attackres[2]);//ranger
                    $("#cityplayerInfo div table tbody tr:nth-child(8) td:nth-child(2)").text(attackres[3]);//triari
                    $("#cityplayerInfo div table tbody tr:nth-child(9) td:nth-child(2)").text(attackwres[8]);//arb
                    $("#cityplayerInfo div table tbody tr:nth-child(10) td:nth-child(2)").text(attackwres[10]);//horse
                    $("#cityplayerInfo div table tbody tr:nth-child(11) td:nth-child(2)").text(attackres[6]);//sorc
                    $("#cityplayerInfo div table tbody tr:nth-child(12) td:nth-child(2)").text(attackres[11]);//druid
                    $("#cityplayerInfo div table tbody tr:nth-child(13) td:nth-child(2)").text(attackres[4]);//priestess
                    $("#cityplayerInfo div table tbody tr:nth-child(14) td:nth-child(2)").text(attackwres[9]);//pra
                    $("#cityplayerInfo div table tbody tr:nth-child(15) td:nth-child(2)").text(attackwres[7]);//scout

                    $("#cityplayerInfo div table tbody tr:nth-child(16) td:nth-child(2)").text("0");
                    $("#cityplayerInfo div table tbody tr:nth-child(17) td:nth-child(2)").text("0");
                    $("#cityplayerInfo div table tbody tr:nth-child(18) td:nth-child(2)").text("0");
                }
                if(bossname=="Andar's Colosseum Challenge"){
                    document.getElementById('raidDungGo').onclick = function() {
                        setTimeout(function(){
                            for(var i in km){
                                if((km[8] || km[9] || km[10]) && !km[5] && !km[6] && !km[2] && !km[3] && !km[4] && !km[11]){
                                    $('#raidIP'+[i]).val(bmw[i]);
                                    if(bmw.length===0){errorgo(message);
                                                      break;}
                                }else{$('#raidIP'+[i]).val(bm[i]);}
                                if(bm.length===0){errorgo(message);
                                                 break;}
                            }
                        }, 1500);
                    };
                    $("#cityplayerInfo div table tbody tr:nth-child(5) td:nth-child(2)").text(attackres[5]);//vanq 8,9,10
                    $("#cityplayerInfo div table tbody tr:nth-child(6) td:nth-child(2)").text("0");
                    $("#cityplayerInfo div table tbody tr:nth-child(7) td:nth-child(2)").text(attackres[2]);//ranger
                    $("#cityplayerInfo div table tbody tr:nth-child(8) td:nth-child(2)").text(attackres[3]);//triari
                    $("#cityplayerInfo div table tbody tr:nth-child(9) td:nth-child(2)").text(attackwres[8]);//arb
                    $("#cityplayerInfo div table tbody tr:nth-child(10) td:nth-child(2)").text(attackwres[10]);//horse
                    $("#cityplayerInfo div table tbody tr:nth-child(11) td:nth-child(2)").text(attackres[6]);//sorc
                    $("#cityplayerInfo div table tbody tr:nth-child(12) td:nth-child(2)").text(attackres[11]);//druid
                    $("#cityplayerInfo div table tbody tr:nth-child(13) td:nth-child(2)").text(attackres[4]);//priestess
                    $("#cityplayerInfo div table tbody tr:nth-child(14) td:nth-child(2)").text(attackwres[9]);//pra
                    $("#cityplayerInfo div table tbody tr:nth-child(15) td:nth-child(2)").text(attackwres[7]);//scout

                    $("#cityplayerInfo div table tbody tr:nth-child(16) td:nth-child(2)").text("0");
                    $("#cityplayerInfo div table tbody tr:nth-child(17) td:nth-child(2)").text("0");
                    $("#cityplayerInfo div table tbody tr:nth-child(18) td:nth-child(2)").text("0");
                }
                if(bossname=="Romulus and Remus"){
                    document.getElementById('raidDungGo').onclick = function() {
                        setTimeout(function(){
                            for(var i in km){
                                if((km[2] || km[3] || km[4] || km[5]) && !km[6] && !km[8] && !km[9] && !km[10] && !km[11]){
                                    $('#raidIP'+[i]).val(bmw[i]);
                                    if(bmw.length===0){errorgo(message);
                                                      break;}
                                }else{$('#raidIP'+[i]).val(bm[i]);}
                                if(bm.length===0){errorgo(message);
                                                 break;}
                            }
                        }, 1500);
                    };
                    $("#cityplayerInfo div table tbody tr:nth-child(5) td:nth-child(2)").text(attackwres[5]);//vanq 2,3,4,5
                    $("#cityplayerInfo div table tbody tr:nth-child(6) td:nth-child(2)").text("0");
                    $("#cityplayerInfo div table tbody tr:nth-child(7) td:nth-child(2)").text(attackwres[2]);//ranger
                    $("#cityplayerInfo div table tbody tr:nth-child(8) td:nth-child(2)").text(attackwres[3]);//triari
                    $("#cityplayerInfo div table tbody tr:nth-child(9) td:nth-child(2)").text(attackres[8]);//arb
                    $("#cityplayerInfo div table tbody tr:nth-child(10) td:nth-child(2)").text(attackres[10]);//horse
                    $("#cityplayerInfo div table tbody tr:nth-child(11) td:nth-child(2)").text(attackres[6]);//sorc
                    $("#cityplayerInfo div table tbody tr:nth-child(12) td:nth-child(2)").text(attackres[11]);//druid
                    $("#cityplayerInfo div table tbody tr:nth-child(13) td:nth-child(2)").text(attackwres[4]);//priestess
                    $("#cityplayerInfo div table tbody tr:nth-child(14) td:nth-child(2)").text(attackres[9]);//pra
                    $("#cityplayerInfo div table tbody tr:nth-child(15) td:nth-child(2)").text(attackres[7]);//scout

                    $("#cityplayerInfo div table tbody tr:nth-child(16) td:nth-child(2)").text("0");
                    $("#cityplayerInfo div table tbody tr:nth-child(17) td:nth-child(2)").text("0");
                    $("#cityplayerInfo div table tbody tr:nth-child(18) td:nth-child(2)").text("0");
                }
                if(bossname=="Dragon"){
                   document.getElementById('raidDungGo').onclick = function() {
                        setTimeout(function(){
                            for(var i in km){
                                if((km[2] || km[3] || km[4] || km[5]) && !km[6] && !km[8] && !km[9] && !km[10] && !km[11]){
                                    $('#raidIP'+[i]).val(bmw[i]);
                                    if(bmw.length===0){errorgo(message);
                                                      break;}
                                }else{$('#raidIP'+[i]).val(bm[i]);}
                                if(bm.length===0){errorgo(message);
                                                 break;}
                            }
                        }, 1500);
                    };
                    $("#cityplayerInfo div table tbody tr:nth-child(5) td:nth-child(2)").text(attackwres[5]);//vanq 2,3,4,5
                    $("#cityplayerInfo div table tbody tr:nth-child(6) td:nth-child(2)").text("0");
                    $("#cityplayerInfo div table tbody tr:nth-child(7) td:nth-child(2)").text(attackwres[2]);//ranger
                    $("#cityplayerInfo div table tbody tr:nth-child(8) td:nth-child(2)").text(attackwres[3]);//triari
                    $("#cityplayerInfo div table tbody tr:nth-child(9) td:nth-child(2)").text(attackres[8]);//arb
                    $("#cityplayerInfo div table tbody tr:nth-child(10) td:nth-child(2)").text(attackres[10]);//horse
                    $("#cityplayerInfo div table tbody tr:nth-child(11) td:nth-child(2)").text(attackres[6]);//sorc
                    $("#cityplayerInfo div table tbody tr:nth-child(12) td:nth-child(2)").text(attackres[11]);//druid
                    $("#cityplayerInfo div table tbody tr:nth-child(13) td:nth-child(2)").text(attackwres[4]);//priestess
                    $("#cityplayerInfo div table tbody tr:nth-child(14) td:nth-child(2)").text(attackres[9]);//pra
                    $("#cityplayerInfo div table tbody tr:nth-child(15) td:nth-child(2)").text(attackres[7]);//scout

                    $("#cityplayerInfo div table tbody tr:nth-child(16) td:nth-child(2)").text("0");
                    $("#cityplayerInfo div table tbody tr:nth-child(17) td:nth-child(2)").text("0");
                    $("#cityplayerInfo div table tbody tr:nth-child(18) td:nth-child(2)").text("0");
                }
                if(bossname=="Gorgon"){
                     document.getElementById('raidDungGo').onclick = function() {
                        setTimeout(function(){
                            for(var i in km){
                                if((km[6] || km[11]) && !km[4] && !km[5] && !km[3] && !km[8] && !km[9] && !km[10] && !km[2]){
                                    $('#raidIP'+[i]).val(bmw[i]);
                                    if(bmw.length===0){errorgo(message);
                                                      break;}
                                }else{$('#raidIP'+[i]).val(bm[i]);}
                                if(bm.length===0){errorgo(message);
                                                 break;}
                            }
                        }, 1500);
                    };
                    $("#cityplayerInfo div table tbody tr:nth-child(5) td:nth-child(2)").text(attackres[5]);//vanq 6,11
                    $("#cityplayerInfo div table tbody tr:nth-child(6) td:nth-child(2)").text("0");
                    $("#cityplayerInfo div table tbody tr:nth-child(7) td:nth-child(2)").text(attackres[2]);//ranger
                    $("#cityplayerInfo div table tbody tr:nth-child(8) td:nth-child(2)").text(attackres[3]);//triari
                    $("#cityplayerInfo div table tbody tr:nth-child(9) td:nth-child(2)").text(attackres[8]);//arb
                    $("#cityplayerInfo div table tbody tr:nth-child(10) td:nth-child(2)").text(attackres[10]);//horse
                    $("#cityplayerInfo div table tbody tr:nth-child(11) td:nth-child(2)").text(attackwres[6]);//sorc
                    $("#cityplayerInfo div table tbody tr:nth-child(12) td:nth-child(2)").text(attackwres[11]);//druid
                    $("#cityplayerInfo div table tbody tr:nth-child(13) td:nth-child(2)").text(attackres[4]);//priestess
                    $("#cityplayerInfo div table tbody tr:nth-child(14) td:nth-child(2)").text(attackres[9]);//pra
                    $("#cityplayerInfo div table tbody tr:nth-child(15) td:nth-child(2)").text(attackres[7]);//scout

                    $("#cityplayerInfo div table tbody tr:nth-child(16) td:nth-child(2)").text("0");
                    $("#cityplayerInfo div table tbody tr:nth-child(17) td:nth-child(2)").text("0");
                    $("#cityplayerInfo div table tbody tr:nth-child(18) td:nth-child(2)").text("0");
                }
                if(bossname=="Gladiator"){
                    document.getElementById('raidDungGo').onclick = function() {
                        setTimeout(function(){
                            for(var i in km){
                                if((km[6] || km[11]) && !km[4] && !km[5] && !km[3] && !km[8] && !km[9] && !km[10] && !km[2]){
                                    $('#raidIP'+[i]).val(bmw[i]);
                                    if(bmw.length===0){errorgo(message);
                                                      break;}
                                }else{$('#raidIP'+[i]).val(bm[i]);}
                                if(bm.length===0){errorgo(message);
                                                 break;}
                            }
                        }, 1500);
                    };
                    $("#cityplayerInfo div table tbody tr:nth-child(5) td:nth-child(2)").text(attackres[5]);//vanq 6,11
                    $("#cityplayerInfo div table tbody tr:nth-child(6) td:nth-child(2)").text("0");
                    $("#cityplayerInfo div table tbody tr:nth-child(7) td:nth-child(2)").text(attackres[2]);//ranger
                    $("#cityplayerInfo div table tbody tr:nth-child(8) td:nth-child(2)").text(attackres[3]);//triari
                    $("#cityplayerInfo div table tbody tr:nth-child(9) td:nth-child(2)").text(attackres[8]);//arb
                    $("#cityplayerInfo div table tbody tr:nth-child(10) td:nth-child(2)").text(attackres[10]);//horse
                    $("#cityplayerInfo div table tbody tr:nth-child(11) td:nth-child(2)").text(attackwres[6]);//sorc
                    $("#cityplayerInfo div table tbody tr:nth-child(12) td:nth-child(2)").text(attackwres[11]);//druid
                    $("#cityplayerInfo div table tbody tr:nth-child(13) td:nth-child(2)").text(attackres[4]);//priestess
                    $("#cityplayerInfo div table tbody tr:nth-child(14) td:nth-child(2)").text(attackres[9]);//pra
                    $("#cityplayerInfo div table tbody tr:nth-child(15) td:nth-child(2)").text(attackres[7]);//scout

                    $("#cityplayerInfo div table tbody tr:nth-child(16) td:nth-child(2)").text("0");
                    $("#cityplayerInfo div table tbody tr:nth-child(17) td:nth-child(2)").text("0");
                    $("#cityplayerInfo div table tbody tr:nth-child(18) td:nth-child(2)").text("0");
                }
            }
        if(dtype==="city"){
            $("#cityplayerInfo div table tbody tr:gt(6)").remove();
        }
        });
 /*   document.getElementById('raidDungGo').onclick = function() {
        //createTable();
        setTimeout(function(){setbossloot();}, 1000);
        };*/
  /*  function createTable() {
        $('#cfunkydiv').remove();
        var ptworow=$("#Progress").html();
        if (ptworow==0)
        {ptworow=100;}
	var plevorow=$("#dunglevelregion").html();
	var ptropneed = Math.ceil(loot[plevorow]*((100-ptworow)*0.008+1)/10);
        var outtable="<div id='cfunkydiv' style='width:500px;height:330px;background-color: #E2CBAC;-moz-border-radius: 10px;-webkit-border-radius: 10px;border-radius: 10px;border: 4px ridge #DAA520;position:absolute;right:10px;top:100px; z-index:1000000;'><div class=\"popUpBar\"> <span class=\"ppspan\">Suggested Raiding Numbers - Caver progress "+ptworow+"%</span> <button id=\"cfunkyX\" onclick=\"$('#cfunkydiv').remove();\" class=\"xbutton greenb\"><div id=\"xbuttondiv\"><div><div id=\"centxbuttondiv\"></div></div></div></button></div><div class=\"popUpWindow\">";
        outtable+="<table><thead><th>Lvl</th><th>Estimated Loot</th><th>Vanqs/Rangers<br>druids</th><th>Sorcs</th><th>Praetors</th><th>Arbs/Horses</th></thead>";
        outtable+="<tbody><tr><td>1</td><td>400</td><td>"+Math.ceil(loot[1]*((100-ptworow)*0.008+1)/10)+"</td><td>"+Math.ceil(loot[1]*((100-ptworow)*0.008+1)/5)+"</td><td>"+Math.ceil(loot[1]*((100-ptworow)*0.008+1)/20)+"</td><td>"+Math.ceil(loot[1]*((100-ptworow)*0.008+1)/15)+"</td></tr>";
        outtable+="<tr><td>2</td><td>1000</td><td>"+Math.ceil(loot[2]*((100-ptworow)*0.008+1)/10)+"</td><td>"+Math.ceil(loot[2]*((100-ptworow)*0.008+1)/5)+"</td><td>"+Math.ceil(loot[2]*((100-ptworow)*0.008+1)/20)+"</td><td>"+Math.ceil(loot[2]*((100-ptworow)*0.008+1)/15)+"</td></tr>";
        outtable+="<tr><td>3</td><td>4500</td><td>"+Math.ceil(loot[3]*((100-ptworow)*0.008+1)/10)+"</td><td>"+Math.ceil(loot[3]*((100-ptworow)*0.008+1)/5)+"</td><td>"+Math.ceil(loot[3]*((100-ptworow)*0.008+1)/20)+"</td><td>"+Math.ceil(loot[3]*((100-ptworow)*0.008+1)/15)+"</td></tr>";
        outtable+="<tr><td>4</td><td>15000</td><td>"+Math.ceil(loot[4]*((100-ptworow)*0.008+1)/10)+"</td><td>"+Math.ceil(loot[4]*((100-ptworow)*0.008+1)/5)+"</td><td>"+Math.ceil(loot[4]*((100-ptworow)*0.008+1)/20)+"</td><td>"+Math.ceil(loot[4]*((100-ptworow)*0.008+1)/15)+"</td></tr>";
        outtable+="<tr><td>5</td><td>33000</td><td>"+Math.ceil(loot[5]*((100-ptworow)*0.008+1)/10)+"</td><td>"+Math.ceil(loot[5]*((100-ptworow)*0.008+1)/5)+"</td><td>"+Math.ceil(loot[5]*((100-ptworow)*0.008+1)/20)+"</td><td>"+Math.ceil(loot[5]*((100-ptworow)*0.008+1)/15)+"</td></tr>";
        outtable+="<tr><td>6</td><td>60000</td><td>"+Math.ceil(loot[6]*((100-ptworow)*0.008+1)/10)+"</td><td>"+Math.ceil(loot[6]*((100-ptworow)*0.008+1)/5)+"</td><td>"+Math.ceil(loot[6]*((100-ptworow)*0.008+1)/20)+"</td><td>"+Math.ceil(loot[6]*((100-ptworow)*0.008+1)/15)+"</td></tr>";
        outtable+="<tr><td>7</td><td>120000</td><td>"+Math.ceil(loot[7]*((100-ptworow)*0.008+1)/10)+"</td><td>"+Math.ceil(loot[7]*((100-ptworow)*0.008+1)/5)+"</td><td>"+Math.ceil(loot[7]*((100-ptworow)*0.008+1)/20)+"</td><td>"+Math.ceil(loot[7]*((100-ptworow)*0.008+1)/15)+"</td></tr>";
        outtable+="<tr><td>8</td><td>201000</td><td>"+Math.ceil(loot[8]*((100-ptworow)*0.008+1)/10)+"</td><td>"+Math.ceil(loot[8]*((100-ptworow)*0.008+1)/5)+"</td><td>"+Math.ceil(loot[8]*((100-ptworow)*0.008+1)/20)+"</td><td>"+Math.ceil(loot[8]*((100-ptworow)*0.008+1)/15)+"</td></tr>";
        outtable+="<tr><td>9</td><td>300000</td><td>"+Math.ceil(loot[9]*((100-ptworow)*0.008+1)/10)+"</td><td>"+Math.ceil(loot[9]*((100-ptworow)*0.008+1)/5)+"</td><td>"+Math.ceil(loot[9]*((100-ptworow)*0.008+1)/20)+"</td><td>"+Math.ceil(loot[9]*((100-ptworow)*0.008+1)/15)+"</td></tr>";
        outtable+="<tr><td>10</td><td>446000</td><td>"+Math.ceil(loot[10]*((100-ptworow)*0.008+1)/10)+"</td><td>"+Math.ceil(loot[10]*((100-ptworow)*0.008+1)/5)+"</td><td>"+Math.ceil(loot[10]*((100-ptworow)*0.008+1)/20)+"</td><td>"+Math.ceil(loot[10]*((100-ptworow)*0.008+1)/15)+"</td></tr>";
        outtable+="</tbody></table><div><button id='raidboxopt' class='regButton greenb' style='width:160px; margin: 1%;' >Dont show this again </button></div>";
        outtable+="</div></div>";
        $( "body" ).append(outtable);
        $( "#cfunkydiv" ).draggable({ handle: ".popUpBar" , containment: "window", scroll: false});
        $("#raidboxopt").click(function() {
            localStorage.setItem("raidbox","1");
            var raidboxback="<button class='regButton greenb' id='raidboxb' style='width:120px; margin-left: 2%;'>Return Raiding Box</button>";
            $("#squaredung td").find(".squarePlayerInfo").before(raidboxback);
            $("#raidboxb").click(function() {
                localStorage.setItem("raidbox","0");
                $("#raidboxb").remove();
            });
        });
        if (localStorage.getItem("raidbox")==1) {
            $('#cfunkydiv').remove();
        }
    }
    function setbossloot() {
        var ttm=[0];
        var ttc=0;
        var bosslvl=$("#dunglevelregion").html();
        var bosstype=$("#dungtypespot").html();
        var tnumb=[0];
        $("#raidingTable tr").each(function() {
            var temp=$(this).find("td:nth-child(3)").text();
            var n = temp.search("/");
            temp=temp.substring(0,n);
            temp=temp.replace(",","");
            var troops=Number(temp);
            var temp1=$(this).attr('id');
            var tt=Number(temp1.match(/\d+/gi));
            if (tt!==7) {
                if (troops>0) {
                    ttc+=1;
                    ttm[ttc-1]=tt;
                    tnumb[ttc-1]=troops;
                }
            }
        });
        
            if (bosstype=="Triton") {
                for (i=0; i<ttc+1; i++) {
                    $('#cfunkydiv').remove();
                    if (ttm[i]>13) {
                        if (isart[ttm[i]]) {
                            var amount=Math.ceil(bossdefw[bosslvl-1]*4/(ttres[ttm[i]]*ttattack[ttm[i]]));
                            amount=Math.max(amount,bossmts[bosslvl-1]/ttts[ttm[i]]);
                            if (amount<=tnumb[i]) {
                                $('#raidIP'+ttm[i]).val(amount);
                            } else {
                                message="Error, you need at least " + amount + " " + ttname[ttm[i]]+"!";
                                errorgo(message);
                            }
                        } else {
                            var amount=Math.ceil(bossdef[bosslvl-1]*4/(ttres[ttm[i]]*ttattack[ttm[i]]));
                            amount=Math.max(amount,bossmts[bosslvl-1]/ttts[ttm[i]]);
                            if (amount<=tnumb[i]) {
                                $('#raidIP'+ttm[i]).val(amount);
                            } else {
                                message="Error, you need at least " + amount + " " + ttname[ttm[i]]+"!";
                                errorgo(message);
                            }
                        }
                    }
                }
            }
                    else if (bosstype=="Cyclops") {
                        for (i=0; i<ttc+1; i++) {
                            $('#cfunkydiv').remove();
                            if (ttm[i]<13) {
                                if (iscav[ttm[i]]) {
                                    var amount=Math.ceil(bossdefw[bosslvl-1]*4/(ttres[ttm[i]]*ttattack[ttm[i]]));
                                    amount=Math.max(amount,bossmts[bosslvl-1]/ttts[ttm[i]]);
                                    if (amount<=tnumb[i]) {
                                        $('#raidIP'+ttm[i]).val(amount);
                                    } else {
                                        message="Error, you need at least " + amount + " " + ttname[ttm[i]]+"!";
                                        errorgo(message);
                                    }
                                } else {
                                    var amount=Math.ceil(bossdef[bosslvl-1]*4/(ttres[ttm[i]]*ttattack[ttm[i]]));
                                    amount=Math.max(amount,bossmts[bosslvl-1]/ttts[ttm[i]]);
                                    if (amount<=tnumb[i]) {
                                        $('#raidIP'+ttm[i]).val(amount);
                                    } else {
                                        message="Error, you need at least " + amount + " " + ttname[ttm[i]]+"!";
                                        errorgo(message);
                                    }
                                }
                            }
                        }
                    }
                    else if (bosstype=="Andar's Colosseum Challenge") {
                        for (i=0; i<ttc+1; i++) {
                            $('#cfunkydiv').remove();
                            if (ttm[i]<13) {
                                if (iscav[ttm[i]]) {
                                    var amount=Math.ceil(bossdefw[bosslvl-1]*4/(ttres[ttm[i]]*ttattack[ttm[i]]));
                                    amount=Math.max(amount,bossmts[bosslvl-1]/ttts[ttm[i]]);
                                    if (amount<=tnumb[i]) {
                                        $('#raidIP'+ttm[i]).val(amount);
                                    } else {
                                        message="Error, you need at least " + amount + " " + ttname[ttm[i]]+"!";
                                        errorgo(message);
                                    }
                                } else {
                                    var amount=Math.ceil(bossdef[bosslvl-1]*4/(ttres[ttm[i]]*ttattack[ttm[i]]));
                                    amount=Math.max(amount,bossmts[bosslvl-1]/ttts[ttm[i]]);
                                    if (amount<=tnumb[i]) {
                                        $('#raidIP'+ttm[i]).val(amount);
                                    } else {
                                        message="Error, you need at least " + amount + " " + ttname[ttm[i]]+"!";
                                        errorgo(message);
                                    }
                                }
                            }
                        }
                    }
                    else if (bosstype=="Dragon") {
                        for (i=0; i<ttc+1; i++) {
                            $('#cfunkydiv').remove();
                            if (ttm[i]<13) {
                                if (isinf[ttm[i]]) {
                                    var amount=Math.ceil(bossdefw[bosslvl-1]*4/(ttres[ttm[i]]*ttattack[ttm[i]]));
                                    amount=Math.max(amount,bossmts[bosslvl-1]/ttts[ttm[i]]);
                                    if (amount<=tnumb[i]) {
                                        $('#raidIP'+ttm[i]).val(amount);
                                    } else {
                                        message="Error, you need at least " + amount + " " + ttname[ttm[i]]+"!";
                                        errorgo(message);
                                    }
                                } else {
                                    var amount=Math.ceil(bossdef[bosslvl-1]*4/(ttres[ttm[i]]*ttattack[ttm[i]]));
                                    amount=Math.max(amount,bossmts[bosslvl-1]/ttts[ttm[i]]);
                                    if (amount<=tnumb[i]) {
                                        $('#raidIP'+ttm[i]).val(amount);
                                    } else {
                                        message="Error, you need at least " + amount + " " + ttname[ttm[i]]+"!";
                                        errorgo(message);
                                    }
                                }
                            }
                        }
                    }
                    else if (bosstype=="Romulus and Remus") {
                        for (i=0; i<ttc+1; i++) {
                            $('#cfunkydiv').remove();
                            if (ttm[i]<13) {
                                if (isinf[ttm[i]]) {
                                    var amount=Math.ceil(bossdefw[bosslvl-1]*4/(ttres[ttm[i]]*ttattack[ttm[i]]));
                                    amount=Math.max(amount,bossmts[bosslvl-1]/ttts[ttm[i]]);
                                    if (amount<=tnumb[i]) {
                                        $('#raidIP'+ttm[i]).val(amount);
                                    } else {
                                        message="Error, you need at least " + amount + " " + ttname[ttm[i]]+"!";
                                        errorgo(message);
                                    }
                                } else {
                                    var amount=Math.ceil(bossdef[bosslvl-1]*4/(ttres[ttm[i]]*ttattack[ttm[i]]));
                                    amount=Math.max(amount,bossmts[bosslvl-1]/ttts[ttm[i]]);
                                    if (amount<=tnumb[i]) {
                                        $('#raidIP'+ttm[i]).val(amount);
                                    } else {
                                        message="Error, you need at least " + amount + " " + ttname[ttm[i]]+"!";
                                        errorgo(message);
                                    }
                                }
                            }
                        }
                    }
                    else if (bosstype=="Gorgon") {
                        for (i=0; i<ttc+1; i++) {
                            $('#cfunkydiv').remove();
                            if (ttm[i]<13) {
                                if (ismgc[ttm[i]]) {
                                    var amount=Math.ceil(bossdefw[bosslvl-1]*4/(ttres[ttm[i]]*ttattack[ttm[i]]));
                                    amount=Math.max(amount,bossmts[bosslvl-1]/ttts[ttm[i]]);
                                    if (amount<=tnumb[i]) {
                                        $('#raidIP'+ttm[i]).val(amount);
                                    } else {
                                        message="Error, you need at least " + amount + " " + ttname[ttm[i]]+"!";
                                        errorgo(message);
                                    }
                                } else {
                                    var amount=Math.ceil(bossdef[bosslvl-1]*4/(ttres[ttm[i]]*ttattack[ttm[i]]));
                                    amount=Math.max(amount,bossmts[bosslvl-1]/ttts[ttm[i]]);
                                    if (amount<=tnumb[i]) {
                                        $('#raidIP'+ttm[i]).val(amount);
                                    } else {
                                        message="Error, you need at least " + amount + " " + ttname[ttm[i]]+"!";
                                        errorgo(message);
                                    }
                                }
                            }
                        }
                    }
                    else if (bosstype=="GM Gordy") {
                        for (i=0; i<ttc+1; i++) {
                            $('#cfunkydiv').remove();
                            if (ttm[i]<13) {
                                if (ismgc[ttm[i]]) {
                                    var amount=Math.ceil(bossdefw[bosslvl-1]*4/(ttres[ttm[i]]*ttattack[ttm[i]]));
                                    amount=Math.max(amount,bossmts[bosslvl-1]/ttts[ttm[i]]);
                                    if (amount<tnumb[i]) {
                                        $('#raidIP'+ttm[i]).val(amount);
                                    } else {
                                        message="Error, you need at least " + amount + " " + ttname[ttm[i]]+"!";
                                        errorgo(message);
                                    }
                                } else {
                                    var amount=Math.ceil(bossdef[bosslvl-1]*4/(ttres[ttm[i]]*ttattack[ttm[i]]));
                                    amount=Math.max(amount,bossmts[bosslvl-1]/ttts[ttm[i]]);
                                    if (amount<=tnumb[i]) {
                                        $('#raidIP'+ttm[i]).val(amount);
                                    } else {
                                        message="Error, you need at least " + amount + " " + ttname[ttm[i]]+"!";
                                        errorgo(message);
                                    }
                                }
                            }
                        }
                    }
                    else { createTable();}
    } */
    // recall button in command window
    function recallraidl100(){
//        var troops = cotg.city.troops();
        var loot;
        var total;
        var total_number=0;
        var total_lootz=0;
        var i=0;

        for(var x in citytc) {
            total=Number(citytc[x]);
            total_number+=total*Number(TS_type[i]);
            total_lootz+=total*Number(ttloot[i]);
            i+=1;
            if (i === 17) { break; }
        }
        var lootpertroop=total_lootz/total_number;
        var l=1;
        var m=Number($("#commandtable tbody").length);
        function loop(){
            var trlist = $("#commandtable tbody tr:nth-child("+l+")");
            var lvlprog=$(trlist).find(".commandinntabl tbody tr:nth-child(3) td:nth-child(1) span:nth-child(1)").text();//td:nth-child(1) span:nth-child(1)
            var splitlp=lvlprog.split("(");
            var Dungeon_lvl=Number(splitlp[0].match(/\d+/gi));
            var Dungeion_prog=Number(splitlp[1].match(/\d+/gi));
            var dungeon=splitlp[0].substring(0,splitlp[0].indexOf(','));
            if(dungeon==="Mountain Cavern"){loot=mountain_loot;}
            else{loot=other_loot;}
            var total_loot_c= Math.ceil(loot[Number(Dungeon_lvl)-1] * ((1-Number(Dungeion_prog)/100)+1));
            var Unitno=$(trlist).find(".commandinntabl tbody tr:nth-child(1) td:nth-child(2) span").text();//td:nth-child(1) span:nth-child(1)
            var temp7=Unitno.match(/[\d,]+/g);
            var Units_raiding=Number(temp7[0].replace(',', ''));
            var lootperraid=lootpertroop*Units_raiding;
            var percentage_ofloot=Math.ceil((lootperraid/total_loot_c)*100);
            if(Number(percentage_ofloot)<90){
                jQuery(trlist).find(".commandinntabl tbody tr:nth-child(2) td:nth-child(1) table tbody tr td:nth-child(2)")[0].click(); // table tbody tr td:nth-child(2)
                $("#raidrettimesela").val(1).change();
                setTimeout(function() {
                jQuery("#doneOG")[0].click();
                    },300);
                setTimeout(function() {
                    $("#outgoingPopUpBox").hide();
                },500);
            }
            l++;
            if(l<m){
                setTimeout(loop,1000);
            }
        }
        loop();
    }
    //carry check in command window
    function carrycheck(){
 //       var troops = cotg.city.troops();
        var loot;
        var total;
        var total_number=0;
        var total_lootx=0;
        var i=0;
        for(var x in citytc) {
            total=Number(citytc[x]);
            total_number+=total*Number(TS_type[i]);
            total_lootx+=total*Number(ttloot[i]);
            i+=1;
            if (i === 17) { break; }
        }
        var lootpertroop=total_lootx/total_number;
        for (var i = 1; i < $("#commandtable tbody").length; i++) {
            var trlist = $("#commandtable tbody tr:nth-child("+i+")");
            var lvlprog=$(trlist).find(".commandinntabl tbody tr:nth-child(3) td:nth-child(1) span:nth-child(1)").text();//td:nth-child(1) span:nth-child(1)
            var splitlp=lvlprog.split("(");
            if (splitlp.length === 1) { continue; }
            var Dungeon_lvl=Number(splitlp[0].match(/\d+/gi));
            var Dungeion_prog=Number(splitlp[1].match(/\d+/gi));
            var dungeon=splitlp[0].substring(0,splitlp[0].indexOf(','));
            if(dungeon==="Mountain Cavern"){loot=mountain_loot;}
            else{loot=other_loot;}
            var total_loot_c= Math.ceil(loot[Number(Dungeon_lvl)-1] * ((1-Number(Dungeion_prog)/100)+1));
            var Unitno=$(trlist).find(".commandinntabl tbody tr:nth-child(1) td:nth-child(2) span").text();//td:nth-child(1) span:nth-child(1)
            var temp7=Unitno.match(/[\d,]+/g);
            var Units_raiding=Number(temp7[0].replace(',', ''));
            var lootperraid=lootpertroop*Units_raiding;
            var percentage_ofloot=Math.ceil((lootperraid/total_loot_c)*100);
            $(trlist).find(".commandinntabl tbody tr:nth-child(3) td:nth-child(2)").attr('rowspan',1);
            $(trlist).find(".commandinntabl tbody tr:nth-child(4) td:nth-child(1)").attr('colspan',1);
            $(trlist).find(".commandinntabl tbody tr:nth-child(4)").append('<td colspan="1" class="bottdinncommtb3" style="text-align:right"></td>');
            $(trlist).find(".commandinntabl tbody tr:nth-child(4) td:nth-child(2)").text("Carry:"+percentage_ofloot+"%");//td:nth-child(1) span:nth-child(1)
        }
    }
    //Raiding script // carry percentage part in war councilor raider
     function carry_percentage(total_loot){
        var troop_loot=0;
        $(".tninput").each(function() {
            var trpinpid =$(this).attr('id');
            var TSnum =$(this).val();
            var ttttt=Number(trpinpid.match(/\d+/gi));
            troop_loot+=TSnum*ttloot[ttttt];//total loot
        });
        var percentage_loot_takable=Math.ceil((troop_loot/total_loot)*100);
        $("#dungloctab").find(".addraiwc td:nth-child(3)").text("carry:"+percentage_loot_takable+"%");
    }
    function getDugRows(){
        $('#dungloctab th:contains("Distance")').click();
        $('#dungloctab th:contains("Distance")').click();
        $("#dungloctab tr").each(function() {
            var buttont=$(this).find("button");
            var buttonid=buttont.attr('id');
            var temp3=$(this).find("td:nth-child(2)").text();//lvl
            var temp4=$(this).find("td:nth-child(3)").text();//progress
            var tempz2=temp3.split(' ');
            var temp1=tempz2[1];
            var temp2=temp4.match(/\d+/gi);
            var tempz1=tempz2[2];
            if(buttonid) {
                buttont.attr('lvl',temp1);
                buttont.attr('prog',temp2);
                buttont.attr('type',tempz1);
            }
            $(buttont).click(function() {
                var count;
                var loot1;
                var countz=Number($('.splitRaid').children('option').length);//getting empty command slots
                if(countz>1){
                    count=countz-1;
                }else{count =countz;}
                var dunglvl=$(this).attr('lvl');
                var progress=$(this).attr('prog');
                var type_dung=$(this).attr('type');
                if(type_dung==="Mountain"){loot1=mountain_loot;}
                else{loot1=other_loot;}
                var total_loot= Math.ceil((loot1[Number(dunglvl)-1] * ((1-Number(progress)/100)+1))*1.02);
                $("#dungloctab").find(".addraiwc td:nth-child(4)").html("<button id='raid115' style='padding: 4px; border-radius: 8px;' class='greenb shRnTr'>115%</button>");
                $("#dungloctab").find(".addraiwc td:nth-child(2)").html("<button id='raidAll' style='padding: 4px; border-radius: 8px;' class='greenb shRnTr'>Use All TS</button>");
  //              var troops = cotg.city.troops();
                var home;
                $("#raid115").click(function(){
                    var i=0;
                    var home_loot=0;
                    var km=[];
                    for(var x in citytc) {
                        home=Number(citytc[x]);
                        home_loot+=home*ttloot[i];
                        km.push(home);
                        i+=1;
                        if (i === 17) { break; }
                    }
                    var loot_115=Math.ceil(total_loot*1.15);
                    if(home_loot>loot_115){
                        var option_numbers=Math.floor(home_loot/loot_115);
                        if(option_numbers<count){
                            $("#WCcomcount").val(option_numbers);
                        }else{$("#WCcomcount").val(count);}
                        var templ1=((home_loot/loot_115)*100)/option_numbers;
                        var templ2=((templ1-100)/templ1)*100;
                        for(var i in km){
                            if(km[i]!==0){
                                var templ3=km[i]/option_numbers;
                                km[i]=Math.floor(templ3*(1-(templ2/100)));
                                $("#rval"+i).val(km[i]);
                                if(km[14]){$("#rval14").val("0");}
                            }
                        }
                        carry_percentage(total_loot);
                    }
                });
                $("#raidAll").click(function(){
                    var i=0;
                    var home_loot=0;
                    var km=[];
                    for(var x in citytc) {
                        home=Number(citytc[x]);
                        home_loot+=home*ttloot[i];
                        km.push(home);
                        i+=1;
                        if (i === 17) { break; }
                    }
                    var loot_95=Math.ceil(total_loot*0.95);
                    if(home_loot>loot_95){
                        var option_numbers=Math.floor(home_loot/loot_95);
                        if(option_numbers<count){
                            $("#WCcomcount").val(option_numbers);
                        }else{$("#WCcomcount").val(count);}
                         for(var i in km){
                            if(count===1){
                                if(km[i]!==0){
                                    $("#rval"+i).val(km[i]);
                                }
                            }else{
                                if(km[i]!==0){
                                    if(option_numbers<count){
                                        km[i]=Math.floor(km[i]/option_numbers);
                                        $("#rval"+i).val(km[i]);
                                        if(km[14]){$("#rval14").val("0");}
                                    }else{
                                        km[i]=Math.floor(km[i]/count);
                                        $("#rval"+i).val(km[i]);
                                        if(km[14]){$("#rval14").val("0");}
                                    }
                                }}
                        }
                        carry_percentage(total_loot);
                    }
                });
                setTimeout(function(){
                    jQuery("#raidAll")[0].click();
                },100);
                setTimeout(function(){
                    carry_percentage(total_loot);
                }, 500);
                $(".tninput").change(function() {
                    carry_percentage(total_loot);
                });
                $("#WCcomcount").on('change', function() {
                    if($("#rval14").val()){$("#rval14").val("0");}
                    carry_percentage(total_loot);
                    $(".tninput").change(function() {
                        carry_percentage(total_loot);
                    });
                });
            });
        });
    }
    //raiding part, cancel allt attack part
    $(document).ready(function() {
        var newbutz="<div style='float: left; margin-left: 2%;'><button id='newbuttonu' style='font-size:8px; padding: 4px; border-radius: 8px;' class='greenb shRnTr'>Recall(<90%)</button></div>";
        $("#totalTS").before(newbutz);
        $("#newbuttonu").click(function() {
            setTimeout(function(){recallraidl100();}, 500);
        });
        $("#totalTS").click(function() {
            setTimeout(function(){carrycheck();}, 500);
        });
        $("#loccavwarconGo").click(function() {
            //createTable();
            setTimeout(function(){getDugRows();}, 1000);
        });
        $("#raidmantab").click(function() {
            setTimeout(function(){getDugRows();}, 1000);
        });
        $("#allianceIncomings").parent().click(function() {
            setTimeout(function(){incomings();}, 4000);
        });
        $("#ui-id-37").click(function() {
            setTimeout(function(){incomings();}, 1000);
        });
        setTimeout(function(){Total_Research();}, 20000);
        if (localStorage.getItem("raidbox")==1) {
            var raidboxback="<button class='regButton greenb' id='raidboxb' style='width:120px; margin-left: 2%;'>Return Raiding Box</button>";
            $("#squaredung td").find(".squarePlayerInfo").before(raidboxback);
            $("#raidboxb").click(function() {
                localStorage.setItem("raidbox","0");
                $("#raidboxb").remove();
            });
        }
        var cancelallya="<input id='cancelAllya' type='checkbox' checked='checked'> Cancel attack if same alliance";
        var cancelallys="<input id='cancelAllys' type='checkbox' checked='checked'> Cancel attack if same alliance";
        var cancelallyp="<input id='cancelAllyp' type='checkbox' checked='checked'> Cancel attack if same alliance";
        var cancelallyc="<input id='cancelAllyc' type='checkbox' checked='checked'> Cancel attack if same alliance";
        $("#assaulttraveltime").parent().next().html(cancelallya);
        $("#siegetraveltime").parent().next().html(cancelallys);
        $("#plundtraveltime").parent().next().html(cancelallyp);
        $("#scouttraveltime").parent().next().html(cancelallyc);
        $("#assaultGo").click(function() {
            if ($("#cancelAllya").prop("checked")==false) {
                setTimeout(function() {
                    $(".shAinf").each(function() {
                        var tid=$(this).parent().next().find(".cityblink").attr("data");
                        var tx=tid%65536;
                        var ty=(tid-tx)/65536;
                        if (tx==$("#assaultxcoord").val() && ty==$("#assaultycoord").val()) {
                            var aid=$(this).attr("data");
                            var dat={a: aid,b:1};
                            jQuery.ajax({url: 'includes/UaO.php',type: 'POST',aysnc:false, data:dat});
                        }
                    });
                    $(".shPinf").each(function() {
                        var tid=$(this).parent().next().find(".cityblink").attr("data");
                        var tx=tid%65536;
                        var ty=(tid-tx)/65536;
                        if (tx==$("#assaultxcoord").val() && ty==$("#assaultycoord").val()) {
                            var aid=$(this).attr("data");
                            var dat={a: aid,b:1};
                            jQuery.ajax({url: 'includes/UpO.php',type: 'POST',aysnc:false, data:dat});
                        }
                    });
                },4000);
            }
        });
        $("#plunderGo").click(function() {
            if ($("#cancelAllyp").prop("checked")==false) {
                setTimeout(function() {
                    $(".shAinf").each(function() {
                        var tid=$(this).parent().next().find(".cityblink").attr("data");
                        var tx=tid%65536;
                        var ty=(tid-tx)/65536;
                        if (tx==$("#pluxcoord").val() && ty==$("#pluycoord").val()) {
                            var aid=$(this).attr("data");
                            var dat={a: aid,b:1};
                            jQuery.ajax({url: 'includes/UaO.php',type: 'POST',aysnc:false, data:dat});
                        }
                    });
                    $(".shPinf").each(function() {
                        var tid=$(this).parent().next().find(".cityblink").attr("data");
                        var tx=tid%65536;
                        var ty=(tid-tx)/65536;
                        if (tx==$("#pluxcoord").val() && ty==$("#pluycoord").val()) {
                            var aid=$(this).attr("data");
                            var dat={a: aid,b:1};
                            jQuery.ajax({url: 'includes/UpO.php',type: 'POST',aysnc:false, data:dat});
                        }
                    });
                },4000);
            }
        });
        $("#scoutGo").click(function() {
            if ($("#cancelAllyc").prop("checked")==false) {
                setTimeout(function() {
                    $(".shAinf").each(function() {
                        var tid=$(this).parent().next().find(".cityblink").attr("data");
                        var tx=tid%65536;
                        var ty=(tid-tx)/65536;
                        if (tx==$("#scoxcoord").val() && ty==$("#scoycoord").val()) {
                            var aid=$(this).attr("data");
                            var dat={a: aid,b:1};
                            jQuery.ajax({url: 'includes/UaO.php',type: 'POST',aysnc:false, data:dat});
                        }
                    });
                    $(".shPinf").each(function() {
                        var tid=$(this).parent().next().find(".cityblink").attr("data");
                        var tx=tid%65536;
                        var ty=(tid-tx)/65536;
                        if (tx==$("#scoxcoord").val() && ty==$("#scoycoord").val()) {
                            var aid=$(this).attr("data");
                            var dat={a: aid,b:1};
                            jQuery.ajax({url: 'includes/UpO.php',type: 'POST',aysnc:false, data:dat});
                        }
                    });
                },4000);
            }
        });
        $("#siegeGo").click(function() {
            if ($("#cancelAllys").prop("checked")==false) {
                setTimeout(function() {
                    $(".shAinf").each(function() {
                        var tid=$(this).parent().next().find(".cityblink").attr("data");
                        var tx=tid%65536;
                        var ty=(tid-tx)/65536;
                        if (tx==$("#siexcoord").val() && ty==$("#sieycoord").val()) {
                            var aid=$(this).attr("data");
                            var dat={a: aid,b:1};
                            jQuery.ajax({url: 'includes/UaO.php',type: 'POST',aysnc:false, data:dat});
                        }
                    });
                    $(".shPinf").each(function() {
                        var tid=$(this).parent().next().find(".cityblink").attr("data");
                        var tx=tid%65536;
                        var ty=(tid-tx)/65536;
                        if (tx==$("#siexcoord").val() && ty==$("#sieycoord").val()) {
                            var aid=$(this).attr("data");
                            var dat={a: aid,b:1};
                            jQuery.ajax({url: 'includes/UpO.php',type: 'POST',aysnc:false, data:dat});
                        }
                    });
                },4000);
            }
        });
    });
    //total research
    function Total_Research() {
        jQuery.ajax({url: 'includes/gaLoy.php',type: 'POST',aysnc:false,
                     success: function(data) {
                         var ldata=JSON.parse(data);
                         setloyal(ldata);
                     }
                    });
        function setloyal(ldata) {
            $.each(ldata.t, function(key, value) {
                if (key==2) {
                    $.each(this, function(key, value) {
                        vexemis+=this.f;
                    });
                }
                if (key==4) {
                    $.each(this, function(key, value) {
                        cyndros+=this.f;
                    });
                }
                if (key==6) {
                    $.each(this, function(key, value) {
                        ylanna+=this.f;
                    });
                }
                if (key==8) {
                    $.each(this, function(key, value) {
                        naera+=this.f;
                    });
                }
            });
            ylanna=Math.min(ylanna,100);
            naera=Math.min(naera,100);
            vexemis=Math.min(vexemis,100);
            cyndros=Math.min(cyndros,100);
            var research= cotg.player.research();
            Total_Combat_Research[2]+=((Number(naera)*0.5)/100)+(Number(Res[research[30]])/100);//ranger
            Total_Combat_Research[3]+=((Number(naera)*0.5)/100)+(Number(Res[research[31]])/100);//triari
            Total_Combat_Research[4]+=((Number(naera)*0.5)/100)+(Number(Res[research[32]])/100);//priestess
            Total_Combat_Research[5]+=((Number(vexemis)*0.5)/100)+(Number(Res[research[33]])/100);//vanq
            Total_Combat_Research[6]+=((Number(vexemis)*0.5)/100)+(Number(Res[research[34]])/100);//sorc
            Total_Combat_Research[7]+=((Number(vexemis)*0.5)/100)+(Number(Res[research[46]])/100);//scout
            Total_Combat_Research[8]+=((Number(naera)*0.5)/100)+(Number(Res[research[35]])/100);//arb
            Total_Combat_Research[9]+=((Number(naera)*0.5)/100)+(Number(Res[research[36]])/100);//pra
            Total_Combat_Research[10]+=((Number(vexemis)*0.5)/100)+(Number(Res[research[37]])/100);//horse
            Total_Combat_Research[11]+=((Number(vexemis)*0.5)/100)+(Number(Res[research[38]])/100);//druid
            Total_Combat_Research[14]+=((Number(ylanna)*0.5)/100)+(Number(Res[research[44]])/100);//galley
            Total_Combat_Research[15]+=((Number(ylanna)*0.5)/100)+(Number(Res[research[43]])/100);//stinger
            Total_Combat_Research[16]+=((Number(cyndros)*0.5)/100)+(Number(Res[research[45]])/100);//warship
        }
    }
    // setting layouts
    $(document).ready(function() {
        $("#citynotes").draggable({ handle: ".popUpBar" , containment: "window", scroll: false});
        $('#citynotes').height('310px');
        $('#citynotes').width('495px');
        var layoutopttab="<li id='layoutopt' class='ui-state-default ui-corner-top' role='tab' tabindex='-1' aria-controls='layoutoptBody'";
        layoutopttab+="aria-labeledby='ui-id-60' aria-selected='false' aria-expanded='false'>";
        layoutopttab+="<a href='#layoutoptBody' class='ui-tabs-anchor' role='presentation' tabindex='-1' id='ui-id-60'>Layout Options</a></li>";
        var layoutoptbody="<div id='layoutoptBody' aria-labeledby='ui-id-60' class='ui-tabs-panel ui-widget-content ui-corner-bottom' ";
        layoutoptbody+=" role='tabpanel' aria-hidden='true' style='display: none;'><table><tbody><tr><td><input id='addnotes' class='clsubopti' type='checkbox'> Add Notes</td>";
        layoutoptbody+="<td><input id='addtroops' class='clsubopti' type='checkbox'> Add Troops</td></tr><tr><td><input id='addtowers' class='clsubopti' type='checkbox'> Add Towers</td><td><input id='addbuildings' class='clsubopti' type='checkbox'> Upgrade Cabins</td>";
        layoutoptbody+="<td> Cabin Lvl: <input id='cablev' type='number' style='width:22px;' value='7'></td></tr><tr><td><input id='addwalls' class='clsubopti' type='checkbox'> Add Walls</td>";
        layoutoptbody+="<td><input id='addhub' class='clsubopti' type='checkbox'> Set Nearest Hub With layout</td></tr><tr><td>Select Hubs list: </td><td id='selhublist'></td><td>";
        layoutoptbody+="<button id='nearhubAp' class='regButton greenb' style='width:130px; margin-left: 10%'>Set Nearest Hub</button></td></tr></tbody></table>";
        layoutoptbody+="<table><tbody><tr><td colspan='2'><input id='addres' class='clsubopti' type='checkbox'> Add Resources:</td><td id='buttd' colspan='2'></td></tr><tr><td>wood<input id='woodin' type='number' style='width:100px;' value='200000'></td><td>stones<input id='stonein' type='number' style='width:100px;' value='220000'></td>";
        layoutoptbody+="<td>iron<input id='ironin' type='number' style='width:100px;' value='200000'></td><td>food<input id='foodin' type='number' style='width:100px;' value='350000'></td></tr>";
        layoutoptbody+="</tbody></table></div>";
        var layoptbut="<button id='layoptBut' class='regButton greenb' style='width:150px;'>Save Res Settings</button>";
        var tabs = $( "#CNtabs" ).tabs();
        var ul = tabs.find( "ul" );
        $( layoutopttab ).appendTo( ul );
        tabs.tabs( "refresh" );
        $("#CNtabs").append(layoutoptbody);
        $("#buttd").append(layoptbut);
        $("#nearhubAp").click(function() {
            setnearhub();
        });
        $("#layoptBut").click(function() {
            localStorage.setItem('woodin',$("#woodin").val());
            localStorage.setItem('foodin',$("#foodin").val());
            localStorage.setItem('ironin',$("#ironin").val());
            localStorage.setItem('stonein',$("#stonein").val());
            localStorage.setItem('cablev',$("#cablev").val());
        });
        if (localStorage.getItem('cablev')) {
            $("#cablev").val(localStorage.getItem('cablev'));
        }
        if (localStorage.getItem('woodin')) {
            $("#woodin").val(localStorage.getItem('woodin'));
        }
        if (localStorage.getItem('stonein')) {
            $("#stonein").val(localStorage.getItem('stonein'));
        }
        if (localStorage.getItem('ironin')) {
            $("#ironin").val(localStorage.getItem('ironin'));
        }
        if (localStorage.getItem('foodin')) {
            $("#foodin").val(localStorage.getItem('foodin'));
        }
        if (localStorage.getItem('atroops')) {
            if (localStorage.getItem('atroops')==1) {
                $("#addtroops").prop( "checked", true );
            }
        }
        if (localStorage.getItem('ares')) {
            if (localStorage.getItem('ares')==1) {
                $("#addres").prop( "checked", true );
            }
        }
        if (localStorage.getItem('abuildings')) {
            if (localStorage.getItem('abuildings')==1) {
                $("#addbuildings").prop( "checked", true );
            }
        }
        if (localStorage.getItem('anotes')) {
            if (localStorage.getItem('anotes')==1) {
                $("#addnotes").prop( "checked", true );
            }
        }
        if (localStorage.getItem('awalls')) {
            if (localStorage.getItem('awalls')==1) {
                $("#addwalls").prop( "checked", true );
            }
        }if (localStorage.getItem('atowers')) {
            if (localStorage.getItem('atowers')==1) {
                $("#addtowers").prop( "checked", true );
            }
        }
        if (localStorage.getItem('ahub')) {
            if (localStorage.getItem('ahub')==1) {
                $("#addhub").prop( "checked", true );
            }
        }
        $("#addnotes").change(function() {
            if ($("#addnotes").prop( "checked")==true) {
                localStorage.setItem('anotes',1);
            } else {localStorage.setItem('anotes',0);}
        });
        $("#addres").change(function() {
            if ($("#addres").prop( "checked")==true) {
                localStorage.setItem('ares',1);
            } else {localStorage.setItem('ares',0);}
        });
        $("#addtroops").change(function() {
            if ($("#addtroops").prop( "checked")==true) {
                localStorage.setItem('atroops',1);
            } else {localStorage.setItem('atroops',0);}
        });
        $("#addbuildings").change(function() {
            if ($("#addbuildings").prop( "checked")==true) {
                localStorage.setItem('abuildings',1);
            } else {localStorage.setItem('abuildings',0);}
        });
        $("#addwalls").change(function() {
            if ($("#addwalls").prop( "checked")==true) {
                localStorage.setItem('awalls',1);
            } else {localStorage.setItem('awalls',0);}
        });
        $("#addtowers").change(function() {
            if ($("#addtowers").prop( "checked")==true) {
                localStorage.setItem('atowers',1);
            } else {localStorage.setItem('atowers',0);}
        });
        $("#addhub").change(function() {
            if ($("#addhub").prop( "checked")==true) {
                localStorage.setItem('ahub',1);
            } else {localStorage.setItem('ahub',0);}
        });
        
        $("#editspncn").click(function() {
            $("#selHub").remove();
            var selhub=$("#organiser").clone(false).attr({id:"selHub",style:"width:100%;height:28px;font-size:11;border-radius:6px;margin:7px"});
            $("#selhublist").append(selhub);
            if (localStorage.getItem('hublist')) {
                $("#selHub").val(localStorage.getItem('hublist')).change();
            }
            $("#selHub").change(function() {
                localStorage.setItem('hublist',$("#selHub").val());
            });
            $('#dfunkylayout').remove();
            $('#funkylayoutl').remove();
            $('#funkylayoutw').remove();
            setTimeout(function(){
                var currentlayout=$('#currentLOtextarea').text();
                for (var i=20; i<currentlayout.length-20;i++) {
                    var tmpchar=currentlayout.charAt(i);
                    var cmp=new RegExp(tmpchar);
                    if (!(cmp.test(emptyspots))) {
                        currentlayout=currentlayout.replaceAt(i,"-");
                    }
                }
                var selectbuttsdf='<select id="dfunkylayout" style="font-size: 10px !important;margin-top:1%;margin-left:2%;width:30%;" class="regButton greenb"><option value="0">Fast build layout</option>';
                var ww=1;
                selectbuttsdf+='<option value="'+ww+'">2 sec vanq</option>';
                layoutdf.push("[ShareString.1.3]:########################-------#-------#####--------#--------###---------#---------##---------#---------##------#######------##-----##BGBGB##-----##----##BBGBGBB##----##----#BGBGBGBGB#----##----#BGBGBGBGB#----#######BGBGTGBGB#######S-PP#BGBGBGBGB#----##S--P#BGBGBGBGB#----##----##BBGBGBB##----##-----##BGBGB##-----##-BBBBB#######------##-BBBBBXJZ#---------##-BBBBB---#---------###BBBBB---#--------#####BBBB---#-------########################");
                remarkdf.push("vanq"); notedf.push("256k @6 days");
                troopcounw.push([0,0,0,0,0,300000,0,0,0,0,0,0,0,0,0,0,0]);
                resw.push([0,0,0,0,1,150000,220000,150000,350000,0,0,0,0,1,0,0,0,0,0,150000,220000,150000,350000]);
                ww++;
                selectbuttsdf+='<option value="'+ww+'">3 sec R/T</option>';
                layoutdf.push("[ShareString.1.3]:########################-------#-------#####--------#--------###---------#---------##---------#---------##------#######------##-----##BGBGB##-----##----##BBGBGBB##----##----#BGBGBGBGB#----##----#BGBGBGBGB#----#######BGBGTGBGB#######S-PP#BGBGBGBGB#----##S--P#BGBGBGBGB#----##----##GBGBGBG##----##-----##BGBGB##-----##-BBBBB#######------##-BBBBBXJZ#---------##-BBBBB---#---------###BBBBB---#--------#####BBBB---#-------########################");
                remarkdf.push("R/T"); notedf.push("240k R/T");
                troopcounw.push([0,0,0,0,0,0,0,0,88300,0,0,0,0,0,354,0,0]);
                resw.push([0,0,0,0,1,150000,220000,150000,350000,0,0,0,0,1,0,0,0,0,0,150000,220000,150000,350000]);
                ww++;
                selectbuttsdf+='<option value="'+ww+'">4 sec horse</option>';
                layoutdf.push("[ShareString.1.3]:########################-------#-------#####--------#--------###---------#---------##---------#---------##------#######------##-----##BEBEB##-----##----##EBEBEBE##----##----#BEBEBEBEB#----##----#BEBEBEBEB#----#######BEBETEBEB#######----#BEBEBEBEB#----##----#BEBEBEBEB#----##----##EBEBEBE##----##-----##BEBEB##-----##BBBBB-#######------##BEEEEB--J#---------##BBBBBB--X#---------###BEEEB-PP#--------#####BBBB-SS#-------########################");
                remarkdf.push("R/T"); notedf.push("112k horses @ 5 days");
                troopcounw.push([0,0,0,0,0,0,0,0,88300,0,0,0,0,0,354,0,0]);
                resw.push([0,0,0,0,1,150000,220000,150000,350000,0,0,0,0,1,0,0,0,0,0,150000,220000,150000,350000]);
                ww++;
                selectbuttsdf+='<option value="'+ww+'">5 sec sorc</option>';
                layoutdf.push("[ShareString.1.3]:########################-------#-------#####--------#--------###---------#---------##---------#---------##------#######------##-----##JBJBJ##-----##----##BJBJBJB##----##----#JBJBJBJBJ#----##----#JBJBJBJBJ#SS-X#######JBJBTBJBJ#######----#JBJBJBJBJ#----##----#JBJBJBJBJ#----##----##BJBJBJB##----##-----##JBJBJ##BB---##------#######BBB---##---------#JBBBBB---##---------#JBJBBB---###--------#JBJBBB--#####-------#JBZBBB-########################");
                remarkdf.push("R/T"); notedf.push("216k sorc");
                troopcounw.push([0,0,0,0,0,0,0,0,88300,0,0,0,0,0,354,0,0]);
                resw.push([0,0,0,0,1,150000,220000,150000,350000,0,0,0,0,1,0,0,0,0,0,150000,220000,150000,350000]);
                ww++;
                selectbuttsdf+='<option value="'+ww+'">7 sec pra</option>';
                layoutdf.push("[ShareString.1.3]:########################-------#-------#####--------#--------###---------#---------##---------#---------##------#######------##-----##BZBZB##-----##----##ZBZBZBZ##----##----#BZBZBZBZB#----##----#BZBZBZBZB#SS-X#######BZBZTZBZB#######----#BZBZBZBZB#J---##----#BZBZBZBZB#----##----##ZBZBZBZ##----##-----##BZBZB##-----##BBBBBB#######------##BBZBBB---#PP-------##BBBBBB---#P--------###BBBB----#--------#####BBB----#-------########################");
                remarkdf.push("R/T"); notedf.push("120k pra @ 10 days");
                troopcounw.push([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
                resw.push([0,0,0,0,1,150000,220000,150000,350000,0,0,0,0,1,0,0,0,0,0,150000,220000,150000,350000]);
                ww++;
                selectbuttsdf+='<option value="'+ww+'">6 sec arb</option>';
                layoutdf.push("[ShareString.1.3]:########################-------#-------#####--------#--------###---------#---------##---------#---------##------#######------##-----##BEBEB##-----##----##EBEBEBE##----##----#BEBEBEBEB#----##----#BEBEBEBEB#----#######BEBETEBEB#######----#BEBEBEBEB#----##----#BEBEBEBEB#----##----##EBEBEBE##----##-----##BEBEB##-----##BBBBB-#######------##BBEBBB--J#---------##BBBBBB-PX#---------###BBBBB-PP#--------#####BBB--SS#-------########################");
                remarkdf.push("R/T"); notedf.push("120k arb @ 8days");
                troopcounw.push([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
                resw.push([0,0,0,0,1,150000,220000,150000,350000,0,0,0,0,1,0,0,0,0,0,150000,220000,150000,350000]);                
                selectbuttsdf+='</select>';
                
                var selectbuttsw='<select id="funkylayoutw" style="font-size: 10px !important;margin-top:1%;margin-left:2%;width:45%;" class="regButton greenb"><option value="0">Select water layout</option>';               
                var cww=1;
                selectbuttsw+='<option value="'+cww+'">2 sec rang/galley</option>';
                layoutsw.push("[ShareString.1.3];########################-------#-------#####--------#--------###---------#---------##---------#---------##------#######------##-----##BGBGB##-----##----##GBGBGBG##----##----#BGBGBGBGB#----##----#BGBGBGBGB#---H#######BGBGTGBGB#######----#BGBGBGBGB#JSPX##----#BGBGBGBGB#----##----##GBGBGBG##G---##-----##BGGGB##BBBBG##------#######BBVVBB##---------#--GBV##VB##---------#--GBV###V###--------#---BBV#######-------#----BBV########################");
                remarksw.push("rangers/triari/galley"); notesw.push("166600 inf and 334 galley @ 10 days");
                troopcounw.push([0,0,83300,83300,0,0,0,0,0,0,0,0,0,0,334,0,0]);
                resw.push([0,0,0,0,1,150000,220000,150000,350000,0,0,0,0,1,0,0,0,0,0,150000,220000,150000,350000]);
                cww++;
                selectbuttsw+='<option value="'+cww+'">6 sec arbs/galley</option>';
                layoutsw.push("[ShareString.1.3];########################-------#-------#####--------#--------###---------#---------##---------#---------##------#######------##-----##BEBEB##-----##----##EBEBEBE##----##----#BEBEBEBEB#----##----#BEBEBEBEB#----#######BEBETEBEB#######----#BEBEBEBEB#SPJX##----#BEBEBEBEB#MH--##----##EBEBEBE##----##-----##BEBEB##BBBB-##------#######BBVVBB##---------#---BVTTVB##---------#---BVTTTV###--------#--BBBVTT#####-------#--BEBBV########################");
                remarksw.push("arbs/galley"); notesw.push("88300 inf and 354 galley @ 11.5 days");
                troopcounw.push([0,0,0,0,0,0,0,0,88300,0,0,0,0,0,354,0,0]);
                resw.push([0,0,0,0,1,150000,220000,150000,350000,0,0,0,0,1,0,0,0,0,0,150000,220000,150000,350000]);
                cww++;
                selectbuttsw+='<option value="'+cww+'">3 sec priestess/galley</option>';
                layoutsw.push("[ShareString.1.3];########################-------#-------#####--------#--------###---------#---------##---------#---------##------#######------##-----##BZBZB##-----##----##ZBZBZBZ##----##----#BZBZBZBZB#----##----#BZBZBZBZB#---H#######BZBZTZBZB#######----#BZBZBZBZB#JSPX##----#BZBZBZBZB#----##----##ZBZBZBZ##-Z--##-----##BZZZB##BBBBZ##------#######BBVVBB##---------#---BV##VB##---------#--ZBV###V###--------#---BBV#######-------#---ZBBV########################");
                remarksw.push("priestess/galley"); notesw.push("166600 inf and 334 galley @ 11 days");
                troopcounw.push([0,0,0,0,166600,0,0,0,0,0,0,0,0,0,334,0,0]);
                resw.push([0,0,0,0,1,150000,220000,150000,350000,0,0,0,0,1,0,0,0,0,0,150000,220000,150000,350000]);
                cww++;
                selectbuttsw+='<option value="'+cww+'">7 sec praetor/galley</option>';
                layoutsw.push("[ShareString.1.3];########################-------#-------#####--------#--------###---------#---------##---------#---------##------#######------##-----##BZBZB##-----##----##ZBZBZBZ##----##----#BZBZBZBZB#----##----#BZBZBZBZB#----#######BZBZTZBZB#######----#BZBZBZBZB#SPJX##----#BZBZBZBZB#MH--##----##ZBZBZBZ##----##-----##BZBZB##BBBBZ##------#######BBVVBB##---------#---BVTTVB##---------#---BVTTTV###--------#---BBVTT#####-------#--BZBBV########################");
                remarksw.push("praetors/galley"); notesw.push("86650 praetors and 347 galley @ 12 days");
                troopcounw.push([0,0,0,0,0,0,0,0,0,86650,0,0,0,0,347,0,0]);
                resw.push([0,0,0,0,1,150000,220000,150000,350000,0,0,0,0,1,0,0,0,0,0,150000,220000,150000,350000]);
                cww++;
                selectbuttsw+='<option value="'+cww+'">2 sec vanq/galley+senator</option>';
                layoutsw.push("[ShareString.1.3];########################-------#-------#####--------#--------###---------#---------##---------#---------##------#######------##-----##BGBGB##-----##----##BBGBGBB##----##----#BGBGBGBGB#----##----#BGBGBGBGB#---H#######BGBGTGBGB#######----#BGBGBGBGB#JSPX##----#BGBGBGBGB#----##----##BBGBGBB##---B##-----##BGBGB##BBBBZ##------#######BBVVBB##---------#---BV##VB##---------#---BV###V###--------#---BBV#######-------#--BBBBV########################");
                remarksw.push("vanq/galley+senator"); notesw.push("193300 inf and 387 galley @ 10 days");
                troopcounw.push([0,0,0,0,0,193300,0,0,0,0,0,0,0,0,387,0,0]);
                resw.push([0,0,0,0,1,150000,220000,150000,350000,0,0,0,0,1,0,0,0,0,0,150000,220000,150000,350000]);
                cww++;
                selectbuttsw+='<option value="'+cww+'">5 sec horses/galley</option>';
                layoutsw.push("[ShareString.1.3];########################-------#-------#####--------#--------###---------#---------##---------#---------##------#######------##-----##BEBEB##-----##----##EBEBEBE##----##----#BEBEBEBEB#----##----#BEBEBEBEB#---H#######BEBETEBEB#######----#BEBEBEBEB#JSPX##----#BEBEBEBEB#-M--##----##EBEBEBB##----##-----##BEBEB##BBBB-##------#######BBVVBB##---------#---BV##VB##---------#---BV###V###--------#--BBBV#######-------#--BEBBV########################");
                remarksw.push("horses/galley"); notesw.push("90000 cav and 360 galley @ 10.5 days");
                troopcounw.push([0,0,0,0,0,0,0,0,0,0,90000,0,0,0,360,0,0]);
                resw.push([0,0,0,0,1,150000,220000,150000,350000,0,0,0,0,1,0,0,0,0,0,150000,220000,150000,350000]);
                cww++;
                selectbuttsw+='<option value="'+cww+'">5 sec sorc/galley</option>';
                layoutsw.push("[ShareString.1.3];########################-------#-------#####--------#--------###---------#---------##---------#---------##------#######------##-----##JBJBJ##-----##----##BJBJBJB##----##----#JBJBJBJBJ#----##----#JBJBJBJBJ#---H#######JBJBTBJBJ#######----#JBJBJBJBJ#-S-X##----#JBJBJBJBJ#----##----##BJBJBJB##JJ--##-----##JBJBJ##BBBBJ##------#######BBVVBB##---------#--JBV##VB##---------#--JBV###V###--------#---BBV#######-------#---JBBV########################");
                remarksw.push("sorc/galley"); notesw.push("156600 sorc and 314 galley @ 13.5 days");
                troopcounw.push([0,0,0,0,0,0,156600,0,0,0,0,0,0,0,314,0,0]);
                resw.push([0,0,0,0,1,150000,220000,150000,350000,0,0,0,0,1,0,0,0,0,0,150000,220000,150000,350000]);
                cww++;
                selectbuttsw+='<option value="'+cww+'">vanqs+ports+senator</option>';
                layoutsw.push("[ShareString.1.3];########################-------#-------#####--------#--------###---------#---------##---------#---------##------#######------##-----##BBBBB##-----##----##BBGBGBB##----##----#BGBGBGBGB#----##----#BGBBBBBGB#----#######BBBGTGBBB#######----#BGBBBBBGB#PPJX##----#BGBGBGBGB#BBBB##----##BBGBGBB##BBBB##-----##BBBBB##BBBBB##------#######-BRRBB##---------#----R##RZ##---------#----R###R###--------#----SR#######-------#----MSR########################");
                remarksw.push("vanqs+senator+ports"); notesw.push("264k infantry @ 10 days");
                troopcounw.push([0,0,0,100000,0,164000,0,0,0,0,0,0,0,0,0,0,0]);
                resw.push([0,0,0,0,1,150000,220000,150000,350000,0,0,0,0,1,0,0,0,0,0,150000,220000,150000,350000]);
                cww++;
                selectbuttsw+='<option value="'+cww+'">main hub</option>';
                layoutsw.push("[ShareString.1.3];########################-------#-------#####--------#---PPPPP###---------#---PPPPPP##---------#---PPPPPP##------#######PPPPPP##-----##-----##PPPPP##----##SLSDSAS##PPPP##----#-SDSMSDS-#PPPP##----#-SLSMSAS-#PPPP#######-SDSTSDS-#######----#-SLSMSAS-#----##----#-SDSMSDS-#----##----##SLSDSAS##----##-----##-----##-----##------#######--RR--##---------#ZB--RTTR-##---------#PJ--RTTTR###--------#-----RTT#####-------#------R########################");
                remarksw.push("main hub"); notesw.push("14 mil w/s 23 mil iron 15 mil food 8200 carts 240 boats");
                troopcounw.push([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
                resw.push([0,0,0,0,1,500000,500000,500000,500000,0,0,0,0,1,0,0,0,0,0,500000,500000,500000,500000]);
                cww++;
                selectbuttsw+='<option value="'+cww+'">palace storage</option>';
                layoutsw.push("[ShareString.1.3]:########################-------#-----PP#####--------#-----PPP###---------#-----PPPP##---------#-----PPPP##------#######--PPPP##-----##SASLS##-PPPP##----##ASASLSL##PPPP##----#SASASLSLS#-PPP##----#SASASLSLS#JPPP#######SASA#LSLS#######----#SASASLSLS#----##----#SASASLSLS#----##----##ASASLSL##----##-----##SASLS##-----##------#######------##---------#---------##---------#---------###--------#--------#####-------#-------########################");
                remarksw.push("palace storage"); notesw.push("40 mil w/s 6200 carts");
                troopcounw.push([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
                resw.push([0,0,0,0,1,500000,500000,500000,500000,0,0,0,0,1,0,0,0,0,0,500000,500000,500000,500000]);
                cww++;
                selectbuttsw+='<option value="'+cww+'">palace feeder</option>';
                layoutsw.push("[ShareString.1.3];########################-PPPPPP#PPPPPPP#####--PPPPPP#PPPPPPPP###---PPPPPP#PPPPPPPPP##---PPPPPP#PPPPPPPPP##----PP#######PPPPPP##-----##----J##PPPPP##----##-A-----##PPPP##----#-SSS-----#PPPP##----#-AAA-----#PPPP#######-SSST----#######----#-LLL-----#----##----#-SSS-----#----##----##-L-----##----##-----##-----##-----##------#######--__--##---------#----_##_-##---------#----_###_###--------#-----_#######-------#------_########################");
                remarksw.push("palace feeder"); notesw.push("8.75 mil w/s 16400 carts");
                troopcounw.push([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
                resw.push([0,0,0,0,1,500000,500000,500000,500000,0,0,0,0,1,0,0,0,0,0,500000,500000,500000,500000]);
                cww++;
                selectbuttsw+='<option value="'+cww+'">palace Hub mixed</option>';
                layoutsw.push("[ShareString.1.3];########################-------#PPPPPPP#####--------#PPPPPPPP###---------#PPPPPPPPP##---------#PPPPPPPPP##------#######PPPPPP##-----##-----##PPPPP##----##-------##PPPP##----#SLSASLSAS#PPPP##----#SASLSASLS#JPPP#######SLSATLSAS#######----#SASLSASLS#----##----#SLSASLSAS#----##----##-------##----##-----##-----##-----##------#######--__--##---------#----_TT_-##---------#----_TTT_###--------#-----_TT#####-------#------_########################");
                remarksw.push("palace Hub mixed"); notesw.push("24.57 mil w/s 11000 carts");
                troopcounw.push([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
                resw.push([0,0,0,0,1,500000,500000,500000,500000,0,0,0,0,1,0,0,0,0,0,500000,500000,500000,500000]);
                cww++;
                selectbuttsw+='<option value="'+cww+'">Stingers</option>';
                layoutsw.push("[ShareString.1.3];########################-------#-------#####--------#--------###---------#---------##---------#---------##------#######------##-----##-----##-----##----##-------##----##----#---------#----##----#---------#----#######----T----#######----#---------#SPHX##----#---------#-M--##----##-------##----##-----##-----##BBBB-##------#######BBVVBB##---------#---BVTTVB##---------#---BVTTTV###--------#---BBVTT#####-------#----BBV########################");
                remarksw.push("stingers"); notesw.push("3480 stingers @ 84 days");
                troopcounw.push([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3480,0]);
                resw.push([0,0,0,0,1,500000,500000,500000,500000,0,0,0,0,1,0,0,0,0,0,500000,500000,500000,500000]);
                cww++;
                selectbuttsw+='<option value="'+cww+'">Warships</option>';
                layoutsw.push("[ShareString.1.3];########################-------#-------#####--------#--------###---------#---------##---------#---------##------#######------##-----##-----##-----##----##-------##----##----#---------#----##----#---------#----#######----T----#######----#---------#SPHX##----#---------#-M--##----##-------##----##-----##-----##BBBB-##------#######BBVVBB##---------#---BVTTVB##---------#---BVTTTV###--------#---BBVTT#####-------#----BBV########################");
                remarksw.push("warships"); notesw.push("870 warships @ 42 days");
                troopcounw.push([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,870]);
                resw.push([0,0,0,0,1,500000,500000,500000,500000,0,0,0,0,1,0,0,0,0,0,500000,500000,500000,500000]);
                selectbuttsw+='</select>';
                
                var selectbuttsl='<select id="funkylayoutl" style="font-size: 10px !important;margin-top:1%;margin-left:2%;width:45%;" class="regButton greenb"><option value="0">Select land layout</option>';
                var ll=1;
                selectbuttsl+='<option value="'+ll+'">1 sec vanqs</option>';
                layoutsl.push("[ShareString.1.3]:########################-------#-------#####--------#--------###---------#---------##---------#---------##------#######------##-----##GBGBG##-----##----##BGBGBGB##----##----#GBGBGBGBG#----##----#GBGBGBGBG#----#######GBGBTBGBG#######----#GBGBGBGBG#----##----#GBGBGBGBG#----##----##BGBGBGB##----##GGGGG##GBGBG##-----##BBBBB-#######------##GGGGGG--H#---------##BBBBBB--J#---------###GGGG---X#--------#####BB----S#-------########################");
                remarksl.push("vanqs"); notesl.push("180000 vanqs @ 2 days");
                troopcounl.push([0,0,0,0,0,180000,0,0,0,0,0,0,0,0,0,0,0]);
                resl.push([0,0,0,0,1,150000,220000,150000,350000,0,0,0,0,1,0,0,0,0,0,150000,220000,150000,350000]);
                ll++;
                selectbuttsl+='<option value="'+ll+'">2 sec vanqs</option>';
                layoutsl.push("[ShareString.1.3]:########################BBB--JX#-------#####BGBG--PP#--------###-BBBBB-MS#---------##-BGBGB--H#---------##-BGBGB#######------##-ZBB-##BBBBB##-----##----##BBGBGBB##----##----#BGBGBGBGB#----##----#BGBBBBBGB#----#######BGBGTGBGB#######----#BGBBBBBGB#----##----#BGBGBGBGB#----##----##BBGBGBB##----##-----##BBBBB##-----##------#######------##---------#---------##---------#---------###--------#--------#####-------#-------########################");
                remarksl.push("vanqs"); notesl.push("264000 vanqs @ 6 days");
                troopcounl.push([0,0,0,0,0,264000,0,0,0,0,0,0,0,0,0,0,0]);
                resl.push([0,0,0,0,1,150000,220000,150000,350000,0,0,0,0,1,0,0,0,0,0,150000,220000,150000,350000]);
                ll++;
                selectbuttsl+='<option value="'+ll+'">3 sec vanqs raiding</option>';
                layoutsl.push("[ShareString.1.3];########################----PJX#-------#####BB----PP#--------###BGBGB--SS#---------##BBBBB--MP#---------##BGBGB-#######------##BBBBB##BBBBB##-----##--G-##BBGBGBB##----##----#BBBBBBBBB#----##----#BGBGBGBGB#----#######BBBBTBBBB#######----#BGBGBGBGB#----##----#BBBBBBBBB#----##----##BBGBGBB##----##-----##BBBBB##-----##------#######--__--##---------#----_##_-##---------#----_###_###--------#-----_#######-------#------_########################");
                remarksl.push("vanqs"); notesl.push("296000 vanqs @ 10 days");
                troopcounl.push([0,0,0,0,0,296000,0,0,0,0,0,0,0,0,0,0,0]);
                resl.push([0,0,0,0,1,150000,220000,150000,350000,0,0,0,0,1,0,0,0,0,0,150000,220000,150000,350000]);
                ll++;
                selectbuttsl+='<option value="'+ll+'">2 sec rangers</option>';
                layoutsl.push("[ShareString.1.3]:########################BB---JX#-------#####BGBGB-PP#--------###-BGBGB-MS#---------##-BGBGB--H#---------##-BGBGB#######------##--BBB##BGBGB##-----##----##BBGBGBB##----##----#BGBGBGBGB#----##----#BGBGBGBGB#----#######BGBGTGBGB#######----#BGBGBGBGB#----##----#BGBGBGBGB#----##----##BBGBGBB##----##-----##BBBBB##-----##------#######------##---------#---------##---------#---------###--------#--------#####-------#-------########################");
                remarksl.push("rangers/triari"); notesl.push("236000 inf @ 6.5 days");
                troopcounl.push([0,0,186000,50000,0,0,0,0,0,0,0,0,0,0,0,0,0]);
                resl.push([0,0,0,0,1,150000,220000,150000,350000,0,0,0,0,1,0,0,0,0,0,150000,220000,150000,350000]);
                ll++;
                selectbuttsl+='<option value="'+ll+'">6 sec praetors</option>';
                layoutsl.push("[ShareString.1.3]:########################BB---JX#-------#####BZBZB-PP#--------###-BZBZB-MS#---------##-BZBZB--H#---------##-BZBZB#######------##--BBB##BZBZB##-----##----##ZBZBZBZ##----##----#BZBZBZBZB#----##----#BZBZBZBZB#----#######BZBZTZBZB#######----#BZBZBZBZB#----##----#BZBZBZBZB#----##----##BBZBZBB##----##-----##BZBZB##-----##------#######------##---------#---------##---------#---------###--------#--------#####-------#-------########################");
                remarksl.push("praetors"); notesl.push("110000 praetors @ 7.5 days");
                troopcounl.push([0,0,0,0,0,0,0,0,0,110000,0,0,0,0,0,0,0]);
                resl.push([0,0,0,0,1,150000,220000,150000,350000,0,0,0,0,1,0,0,0,0,0,150000,220000,150000,350000]);
                ll++;
                selectbuttsl+='<option value="'+ll+'">4 sec horses</option>';
                layoutsl.push("[ShareString.1.3]:########################BB---JX#-------#####BEBEB-PP#--------###-BEBEB-MS#---------##-BEBEB--H#---------##-BEBEB#######------##--ZBB##BEBEB##-----##----##EBEBEBE##----##----#BEBEBEBEB#----##----#BEBEBEBEB#----#######BEBETEBEB#######----#BEBEBEBEB#----##----#BEBEBEBEB#----##----##BBEBEBE##----##-----##BEBEB##-----##------#######------##---------#---------##---------#---------###--------#--------#####-------#-------########################");
                remarksl.push("horses"); notesl.push("106000 horses @ 5 days");
                troopcounl.push([0,0,0,0,0,0,0,0,0,0,106000,0,0,0,0,0,0]);
                resl.push([0,0,0,0,1,150000,220000,150000,350000,0,0,0,0,1,0,0,0,0,0,150000,220000,150000,350000]);
                ll++;
                selectbuttsl+='<option value="'+ll+'">5 sec horses</option>';
                layoutsl.push("[ShareString.1.3]:########################-B---JX#-------#####BEBEB-PP#--------###-BEBEB-MS#---------##-BEBEB-PH#---------##-BEBEB#######------##--BBB##BBBBB##-----##----##BBEBEBB##----##----#BEBEBEBEB#----##----#BEBEBEBEB#----#######BEBBTBBEB#######----#BEBEBEBEB#----##----#BEBEBEBEB#----##----##BBEBEBB##----##-----##BBBBB##-----##------#######------##---------#---------##---------#---------###--------#--------#####-------#-------########################");
                remarksl.push("horses"); notesl.push("124000 horses @ 7 days");
                troopcounl.push([0,0,0,0,0,0,0,0,0,0,124000,0,0,0,0,0,0]);
                resl.push([0,0,0,0,1,150000,220000,150000,350000,0,0,0,0,1,0,0,0,0,0,150000,220000,150000,350000]);
                ll++;
                selectbuttsl+='<option value="'+ll+'">5 sec arbs</option>';
                layoutsl.push("[ShareString.1.3]:########################BB---JX#-------#####BEBEB-PP#--------###-BEBEB-MS#---------##-BEBEB--H#---------##-BEBEB#######------##--BBB##BEBEB##-----##----##EBEBEBE##----##----#BEBEBEBEB#----##----#BEBEBEBEB#----#######BEBETEBEB#######----#BEBEBEBEB#----##----#BEBEBEBEB#----##----##BBEBEBB##----##-----##BEBEB##-----##------#######------##---------#---------##---------#---------###--------#--------#####-------#-------########################");
                remarksl.push("arbs"); notesl.push("110000 arbs @ 6.5 days");
                troopcounl.push([0,0,0,0,0,0,0,0,110000,0,0,0,0,0,0,0,0]);
                resl.push([0,0,0,0,1,150000,220000,150000,350000,0,0,0,0,1,0,0,0,0,0,150000,220000,150000,350000]);
                ll++;
                selectbuttsl+='<option value="'+ll+'">6 sec arbs</option>';
                layoutsl.push("[ShareString.1.3]:########################BB---JX#-------#####BEBEB-PP#--------###-BBBEB-MS#---------##-BEBEB--H#---------##-BEBEB#######------##--BBB##BBBBB##-----##----##BBEBEBB##----##----#BEBEBEBEB#----##----#BEBEBEBEB#----#######BEBETEBEB#######----#BEBEBEBEB#----##----#BEBEBEBEB#----##----##BBEBEBB##----##-----##BBBBB##-----##------#######------##---------#---------##---------#---------###--------#--------#####-------#-------########################");
                remarksl.push("arbs"); notesl.push("124000 arbs @ 8.5 days");
                troopcounl.push([0,0,0,0,0,0,0,0,124000,0,0,0,0,0,0,0,0]);
                resl.push([0,0,0,0,1,150000,220000,150000,350000,0,0,0,0,1,0,0,0,0,0,150000,220000,150000,350000]);
                ll++;
                selectbuttsl+='<option value="'+ll+'">4 sec sorc</option>';
                layoutsl.push("[ShareString.1.3]:########################BJBJ--X#-------#####JBJBJ--S#--------###-JBJBJ--M#---------##-JBJBJ--H#---------##-JBJBJ#######------##-ZBJB##JBJBJ##-----##----##BJBJBJB##----##----#JBJBJBJBJ#----##----#JBJBJBJBJ#----#######JBJBTBJBJ#######----#JBJBJBJBJ#----##----#JBJBJBJBJ#----##----##BJBJBJB##----##-----##JBJBJ##-----##------#######------##---------#---------##---------#---------###--------#--------#####-------#-------########################");
                remarksl.push("sorc"); notesl.push("176000 sorc @ 8 days");
                troopcounl.push([0,0,0,0,0,0,176000,0,0,0,0,0,0,0,0,0,0]);
                resl.push([0,0,0,0,1,150000,220000,150000,350000,0,0,0,0,1,0,0,0,0,0,150000,220000,150000,350000]);
                ll++;
                selectbuttsl+='<option value="'+ll+'">5 sec sorc</option>';
                layoutsl.push("[ShareString.1.3]:########################BBB---X#-------#####BJBJB--P#--------###-BJBJB-MS#---------##-BJBJB--H#---------##-BJBJB#######------##-ZBBB##BJBJB##-----##----##JBJBJBJ##----##----#BJBJBJBJB#----##----#BJBJBJBJB#----#######BJBJTJBJB#######----#BJBJBJBJB#----##----#BJBJBJBJB#----##----##BBJBJBB##----##-----##BJBJB##-----##------#######------##---------#---------##---------#---------###--------#--------#####-------#-------########################");
                remarksl.push("sorc"); notesl.push("224000 sorc @ 13 days");
                troopcounl.push([0,0,0,0,0,0,224000,0,0,0,0,0,0,0,0,0,0]);
                resl.push([0,0,0,0,1,150000,220000,150000,350000,0,0,0,0,1,0,0,0,0,0,150000,220000,150000,350000]);
                ll++;
                selectbuttsl+='<option value="'+ll+'">10 sec druids</option>';
                layoutsl.push("[ShareString.1.3]:########################-J----X#-------#####JBJB--MS#--------###BJBJB---H#---------##BJBJB----#---------##BJBJB-#######------##BJBJB##BJBJB##-----##-JBJ##JBJBJBJ##----##----#BJBJBJBJB#----##----#BJBJBJBJB#----#######BJBJTJBJB#######----#BJBJBJBJB#----##----#BJBJBJBJB#----##----##JBJBJBJ##----##-----##BJBJB##-----##------#######------##---------#---------##---------#---------###--------#--------#####-------#-------########################");
                remarksl.push("druids"); notesl.push("102000 druids @ 12 days");
                troopcounl.push([0,0,0,0,0,0,0,0,0,0,0,102000,0,0,0,0,0]);
                resl.push([0,0,0,0,1,150000,220000,150000,350000,0,0,0,0,1,0,0,0,0,0,150000,220000,150000,350000]);
                ll++;
                selectbuttsl+='<option value="'+ll+'">scorp/rams</option>';
                layoutsl.push("[ShareString.1.3]:########################BBYB--X#-------#####BYBYB---#--------###-BYBYB-MS#---------##-BYBYB--H#---------##-BYBYB#######------##-BYBB##BYBYB##-----##----##YBYBYBY##----##----#BYBYBYBYB#----##----#BYBYBYBYB#----#######BYBYTYBYB#######----#BYBYBYBYB#----##----#BYBYBYBYB#----##----##YBYBYBY##----##-----##BYBYB##-----##------#######------##---------#---------##---------#---------###--------#--------#####-------#-------########################");
                remarksl.push("scorp/rams"); notesl.push("21600 siege engines @ 7.5 days");
                troopcounl.push([0,0,0,0,0,0,0,0,0,0,0,0,5500,16100,0,0,0]);
                resl.push([0,0,0,0,1,150000,220000,150000,350000,0,0,0,0,1,0,0,0,0,0,150000,220000,150000,350000]);
                ll++;
                selectbuttsl+='<option value="'+ll+'">ballista</option>';
                layoutsl.push("[ShareString.1.3]:########################BBBB--X#-------#####BYBYB---#--------###-BYBYB-MS#---------##-BYBYB--H#---------##-BYBYB#######------##-BBBB##BBBBB##-----##----##BBYBYBB##----##----#BYBYBYBYB#----##----#BYBYBYBYB#----#######BYBYTYBYB#######----#BYBYBYBYB#----##----#BYBYBYBYB#----##----##BBYBYBB##----##-----##BBBBB##-----##------#######------##---------#---------##---------#---------###--------#--------#####-------#-------########################");
                remarksl.push("ballista"); notesl.push("25600 siege engines @ 10.5 days");
                troopcounl.push([0,25600,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
                resl.push([0,0,0,0,1,150000,220000,150000,350000,0,0,0,0,1,0,0,0,0,0,150000,220000,150000,350000]);
                selectbuttsl+='</select>';

                $('#removeoverlayGo').after(selectbuttsdf);
                $('#dfunkylayout').after(selectbuttsl);
                $('#funkylayoutl').after(selectbuttsw);
                $('#funkylayoutl').change(function() {
                    var newlayout=currentlayout;
                    for (var j=1; j<layoutsl.length; j++) {
                        if ($('#funkylayoutl').val()==j) {
                            for (var i=20; i<currentlayout.length;i++) {
                                var tmpchar=layoutsl[j].charAt(i);
                                var cmp=new RegExp(tmpchar);
                                if (!(cmp.test(emptyspots))) {
                                    newlayout=newlayout.replaceAt(i,tmpchar);
                                    //currentlayout=currentlayout.replaceAt(i,tmpchar);
                                }
                            }
                            //$('#removeoverlayGo').click();
                            $('#overlaytextarea').val(newlayout);
                            setTimeout(function(){jQuery("#applyoverlayGo")[0].click();},300);
                            if ($("#addnotes").prop("checked")==true) {
                                $('#CNremarks').val(remarksl[j]);
                                $('#citynotestextarea').val(notesl[j]);
                                setTimeout(function(){jQuery("#citnotesaveb")[0].click(); },100);
                            }
                            var aa=city.mo;
                            if ($("#addtroops").prop("checked")==true) {
                                for (var k in troopcounl[j]) {
                                    aa[9+Number(k)]=troopcounl[j][k];
                                }
                            }
                            if ($("#addwalls").prop("checked")==true) {
                                aa[26]=1;
                            }
                            if ($("#addtowers").prop("checked")==true) {
                                aa[27]=1;
                            }
                            if ($("#addhub").prop("checked")==true) {
                                var hubs={cid:[],distance:[]};
                                $.each(clc, function(key, value) {
                                    if (key==$("#selHub").val()) {
                                        hubs.cid=value;
                                    }
                                });
                                for (var i in hubs.cid) {
                                    var tempx=Number(hubs.cid[i] % 65536);
                                    var tempy=Number((hubs.cid[i]-tempx)/65536);
                                    hubs.distance.push(Math.sqrt((tempx-city.x)*(tempx-city.x)+(tempy-city.y)*(tempy-city.y)));
                                }
                                var mindist = Math.min.apply(Math, hubs.distance);
                                var nearesthub=hubs.cid[hubs.distance.indexOf(mindist)];
                                resl[j][14]=nearesthub;
                                resl[j][15]=nearesthub;
                            } else {
                                resl[j][14]=0;
                                resl[j][15]=0;
                            }
                            if ($("#addres").prop("checked")==true) {
                                resl[j][5]=$("#woodin").val();
                                resl[j][6]=$("#stonein").val();
                                resl[j][7]=$("#ironin").val();
                                resl[j][8]=$("#foodin").val();
                                resl[j][19]=$("#woodin").val();
                                resl[j][20]=$("#stonein").val();
                                resl[j][21]=$("#ironin").val();
                                resl[j][22]=$("#foodin").val();
                                for (var k in resl[j]) {
                                    aa[28+Number(k)]=resl[j][k];
                                }
                            }
                            if ($("#addbuildings").prop("checked")==true) {
                                aa[51]=[1,$("#cablev").val()];
                                aa[1]=1;
                            }
                            
                           //var aaa=JSON.stringify(aa);
                            var dat={a:JSON.stringify(aa),b:cdata.cid};
                            jQuery.ajax({url: 'includes/mnio.php',type: 'POST',aysnc:false,data: dat});
                            
                        }
                    }
                });
                $('#funkylayoutw').change(function() {
                    var newlayout=currentlayout;
                    for (var j=1; j<layoutsw.length; j++) {
                        if ($('#funkylayoutw').val()==j) {
                            for (var i=20; i<currentlayout.length;i++) {
                                var tmpchar=layoutsw[j].charAt(i);
                                var cmp=new RegExp(tmpchar);
                                if (!(cmp.test(emptyspots))) {
                                    newlayout=newlayout.replaceAt(i,tmpchar);
                                }
                            }
                            $('#overlaytextarea').val(newlayout);
                            setTimeout(function(){jQuery("#applyoverlayGo")[0].click();},300);
                            if ($("#addnotes").prop("checked")==true) {
                                $('#CNremarks').val(remarksw[j]);
                                $('#citynotestextarea').val(notesw[j]);
                                setTimeout(function(){jQuery("#citnotesaveb")[0].click(); },100);
                            }
                            var aa=city.mo;
                            if ($("#addtroops").prop("checked")==true) {
                                for (var k in troopcounw[j]) {
                                    aa[9+Number(k)]=troopcounw[j][k];
                                }
                            }
                            if ($("#addwalls").prop("checked")==true) {
                                aa[26]=1;
                            }
                            if ($("#addtowers").prop("checked")==true) {
                                aa[27]=1;
                            }
                            if ($("#addhub").prop("checked")==true) {
                                var hubs={cid:[],distance:[]};
                                $.each(clc, function(key, value) {
                                    if (key==$("#selHub").val()) {
                                        hubs.cid=value;
                                    }
                                });
                                for (var i in hubs.cid) {
                                    var tempx=Number(hubs.cid[i] % 65536);
                                    var tempy=Number((hubs.cid[i]-tempx)/65536);
                                    hubs.distance.push(Math.sqrt((tempx-city.x)*(tempx-city.x)+(tempy-city.y)*(tempy-city.y)));
                                }
                                var mindist = Math.min.apply(Math, hubs.distance);
                                var nearesthub=hubs.cid[hubs.distance.indexOf(mindist)];
                                resw[j][14]=nearesthub;
                                resw[j][15]=nearesthub;
                            } else {
                                resw[j][14]=0;
                                resw[j][15]=0;
                            }
                            if ($("#addres").prop("checked")==true) {
                                resw[j][5]=$("#woodin").val();
                                resw[j][6]=$("#stonein").val();
                                resw[j][7]=$("#ironin").val();
                                resw[j][8]=$("#foodin").val();
                                resw[j][19]=$("#woodin").val();
                                resw[j][20]=$("#stonein").val();
                                resw[j][21]=$("#ironin").val();
                                resw[j][22]=$("#foodin").val();
                                for (var k in resw[j]) {
                                    aa[28+Number(k)]=resw[j][k];
                                }
                            }
                            if ($("#addbuildings").prop("checked")==true) {
                                aa[51]=[1,$("#cablev").val()];
                                aa[1]=1;
                            }
                           //var aaa=JSON.stringify(aa);
                            var dat={a:JSON.stringify(aa),b:cdata.cid};
                            jQuery.ajax({url: 'includes/mnio.php',type: 'POST',aysnc:false,data: dat});
                        }
                    }
                });
                $('#dfunkylayout').change(function() {
                    var newlayout=currentlayout;
                    for (var j=1; j<layoutdf.length; j++) {
                        if ($('#dfunkylayout').val()==j) {
                            for (var i=20; i<currentlayout.length;i++) {
                                var tmpchar=layoutdf[j].charAt(i);
                                var cmp=new RegExp(tmpchar);
                                if (!(cmp.test(emptyspots))) {
                                    newlayout=newlayout.replaceAt(i,tmpchar);
                                }
                            }
                            //$('#removeoverlayGo').click();
                            $('#overlaytextarea').val(newlayout);
                            setTimeout(function(){jQuery("#applyoverlayGo")[0].click();},300);
                            if ($("#addnotes").prop("checked")==true) {
                                $('#CNremarks').val(remarkdf[j]);
                                $('#citynotestextarea').val(notedf[j]);
                                setTimeout(function(){jQuery("#citnotesaveb")[0].click(); },100);
                            }
                            var aa=city.mo;
                            if ($("#addtroops").prop("checked")==true) {
                                for (var k in troopcounw[j]) {
                                    aa[9+Number(k)]=troopcounw[j][k];
                                }
                            }
                            if ($("#addwalls").prop("checked")==true) {
                                aa[26]=1;
                            }
                            if ($("#addtowers").prop("checked")==true) {
                                aa[27]=1;
                            }
                            if ($("#addhub").prop("checked")==true) {
                                var hubs={cid:[],distance:[]};
                                $.each(clc, function(key, value) {
                                    if (key==$("#selHub").val()) {
                                        hubs.cid=value;
                                    }
                                });
                                for (var i in hubs.cid) {
                                    var tempx=Number(hubs.cid[i] % 65536);
                                    var tempy=Number((hubs.cid[i]-tempx)/65536);
                                    hubs.distance.push(Math.sqrt((tempx-city.x)*(tempx-city.x)+(tempy-city.y)*(tempy-city.y)));
                                }
                                var mindist = Math.min.apply(Math, hubs.distance);
                                var nearesthub=hubs.cid[hubs.distance.indexOf(mindist)];
                                resw[j][14]=nearesthub;
                                resw[j][15]=nearesthub;
                            } else {
                                resw[j][14]=0;
                                resw[j][15]=0;
                            }
                            if ($("#addres").prop("checked")==true) {
                                resw[j][5]=$("#woodin").val();
                                resw[j][6]=$("#stonein").val();
                                resw[j][7]=$("#ironin").val();
                                resw[j][8]=$("#foodin").val();
                                resw[j][19]=$("#woodin").val();
                                resw[j][20]=$("#stonein").val();
                                resw[j][21]=$("#ironin").val();
                                resw[j][22]=$("#foodin").val();
                                for (var k in resw[j]) {
                                    aa[28+Number(k)]=resw[j][k];
                                }
                            }
                            if ($("#addbuildings").prop("checked")==true) {
                                aa[51]=[1,$("#cablev").val()];
                                aa[1]=1;
                            }
                           //var aaa=JSON.stringify(aa);
                            var dat={a:JSON.stringify(aa),b:cdata.cid};
                            jQuery.ajax({url: 'includes/mnio.php',type: 'POST',aysnc:false,data: dat});
                        }
                    }
                });
            },500);
        });
    });
    //setting nearest hub to a city
    function setnearhub() {
        var res=[0,0,0,0,1,150000,220000,150000,350000,0,0,0,0,1,0,0,0,0,0,150000,220000,150000,350000];
        var aa=city.mo;
        var hubs={cid:[],distance:[]};
        $.each(clc, function(key, value) {
            if (key==$("#selHub").val()) {
                hubs.cid=value;
            }
        });
        for (var i in hubs.cid) {
            var tempx=Number(hubs.cid[i] % 65536);
            var tempy=Number((hubs.cid[i]-tempx)/65536);
            hubs.distance.push(Math.sqrt((tempx-city.x)*(tempx-city.x)+(tempy-city.y)*(tempy-city.y)));
        }
        var mindist = Math.min.apply(Math, hubs.distance);
        var nearesthub=hubs.cid[hubs.distance.indexOf(mindist)];
        //aa[42]=nearesthub;
        //aa[43]=nearesthub;
        res[14]=nearesthub;
        res[15]=nearesthub;
        res[5]=$("#woodin").val();
        res[6]=$("#stonein").val();
        res[7]=$("#ironin").val();
        res[8]=$("#foodin").val();
        res[19]=$("#woodin").val();
        res[20]=$("#stonein").val();
        res[21]=$("#ironin").val();
        res[22]=$("#foodin").val();
        for (var k in res) {
            aa[28+Number(k)]=res[k];
        }
        var dat={a:JSON.stringify(aa),b:cdata.cid};
        jQuery.ajax({url: 'includes/mnio.php',type: 'POST',aysnc:false,data: dat});
    }
    //Summary
     function opensumwin() {
         sum=false;
         var sumwin="<div id='sumWin' style='width:60%;height:50%;left: 360px; z-index: 2000;' class='popUpBox'><div id='popsum' class='popUpBar'><span class=\"ppspan\">Cities Summaries</span> <button id=\"sumX\" onclick=\"$('#sumWin').hide();\" class=\"xbutton greenb\"><div id=\"xbuttondiv\"><div><div id=\"centxbuttondiv\"></div></div></div></button></div><div class=\"popUpWindow\" style='height:100%'>";
         sumwin+="<div id='sumdiv' class='beigetabspopup' style='background:none;border: none;padding: 0px;height:74%;'><ul id='sumtabs' role='tablist'><li role='tab'><a href='#resTab' role='presentation'>Resources</a></li>";
         sumwin+="<li role='tab'><a href='#troopsTab' role='presentation'>Troops</a></li><li role='tab'><a href='#raidTab' role='presentation'>Raids</a></li><li role='tab'><a href='#raidoverTab' role='presentation'>Raids Overview</a></li>";
         sumwin+="<li role='tab'><a href='#supportTab' role='presentation'>Support</a></li></ul>";
         sumwin+="<div id='resTab'><button id='resup' class='greenb' style='font-size:14px;border-radius:6px; margin:4px;'>Update</button><span style='margin-left:50px;'>Show cities from: </span>";
         sumwin+="<div class='beigemenutable scroll-pane' style='width:99%;height:100%;margin-left:4px;' ><table id='restable'>";
         sumwin+="<thead><th>Name</th><th colspan='2'>Notes</th><th>Coords</th><th>Wood</th><th>(Storage)</th><th>Stones</th><th>(Storage)</th><th>Iron</th><th>(Storage)</th><th>Food</th><th>(Storage)</th><th>Carts</th><th>(Total)</th><th>Ships</th><th>(Total)</th><th>Score</th></thead></table></div></div>";
         sumwin+="<div id='troopsTab'><button id='troopsup' class='greenb' style='font-size:14px;border-radius:6px;margin:4px;'>Update</button><span style='margin-left:50px;'>Show cities from: </span>";
         sumwin+="<div  class='beigemenutable scroll-pane' style='width:99%;height:95%;margin-left:4px;'><table id='troopstable' style='width:250%'>";
         sumwin+="<thead><tr data='0'><th>Name</th><th style='width:150px;'>Notes</th><th>Coords</th><th><div class='"+tpicdiv[8]+"'></div>(home)</th><th>(Total)</th><th><div class='"+tpicdiv[1]+"'></div>(home)</th><th>(Total)</th><th><div class='"+tpicdiv[11]+"'></div>(home)</th><th>(Total)</th></th>";
         sumwin+="<th><div class='"+tpicdiv[14]+"'></div>(home)</th><th>(Total)</th><th><div class='"+tpicdiv[0]+"'></div>(home)</th><th>(Total)</th><th><div class='"+tpicdiv[10]+"'></div>(home)</th><th>(Total)</th><th><div class='"+tpicdiv[9]+"'></div>(home)</th><th>(Total)</th><th><div class='"+tpicdiv[4]+"'></div>(home)</th><th>(Total)</th><th><div class='"+tpicdiv[12]+"'></div>(home)</th><th>(Total)</th>";
         sumwin+="<th><div class='"+tpicdiv[2]+"'></div>(home)</th><th>(Total)</th><th><div class='"+tpicdiv[13]+"'></div>(home)</th><th>(Total)</th><th><div class='"+tpicdiv[7]+"'></div>(home)</th><th>(Total)</th><th><div class='"+tpicdiv[17]+"'></div>(home)</th><th>(Total)</th><th><div class='"+tpicdiv[6]+"'></div>(home)</th><th>(Total)</th><th><div class='"+tpicdiv[15]+"'></div>(home)</th><th>(Total)</th>";
         sumwin+="<th><div class='"+tpicdiv[3]+"'></div>(home)</th><th>(Total)</th><th><div class='"+tpicdiv[5]+"'></div>(home)</th><th>(Total)</th><th><div class='"+tpicdiv[16]+"'></div>(home)</th><th>(Total)</th><th>TS(home)</th><th>(Total)</th>";
         sumwin+="</tr></thead></table></div></div>";
         sumwin+="<div id='raidTab'><button id='raidup' class='greenb' style='font-size:14px;border-radius:6px; margin:4px;'>Update</button><span style='margin-left:50px;'>Number of reports to show:</span><select id='raidsturnc' class='greensel'><option value='100'>100</option><option value='500'>500</option><option value='1000'>1000</option><option value='10000'>10000</option></select>";
         sumwin+="<div class='beigemenutable scroll-pane' style='width:99%;height:110%;margin-left:4px;' ><table id='raidtable'>";
         sumwin+="<thead><th>Report</th><th>Type</th><th>Cavern progress</th><th>losses</th><th>Carry</th><th>Date</th><th>Origin</th></thead></table></div></div>";
         sumwin+="<div id='raidoverTab'><button id='raidoverup' class='greenb' style='font-size:14px;border-radius:6px; margin:4px;'>Update</button><span style='margin-left:50px;'>Show cities from: </span>";
         sumwin+="<div class='beigemenutable scroll-pane' style='width:99%;height:100%;margin-left:4px;' ><table id='raidovertable'>";
         sumwin+="<thead><th></th><th>Name</th><th colspan='2'>Notes</th><th>Coords</th><th>Raids</th><th>Out</th><th>In</th><th>Raiding TS</th><th>Resources</th></thead></table></div></div>";
         sumwin+="<div id='supportTab'><button id='supportup' class='greenb' style='font-size:14px;border-radius:6px; margin:4px;'>Update</button>";
         sumwin+="<div class='beigemenutable scroll-pane' style='width:99%;height:110%;margin-left:4px;' ><table id='supporttable'>";
         sumwin+="<thead><th></th><th>Player</th><th>City</th><th>Coords</th><th>Alliance</th><th>TS supporting</th><th>TS sending</th><th>TS returning</th></thead></table></div></div>";
         sumwin+="</div></div>";
         $("#reportsViewBox").after(sumwin);
         $( "#sumWin" ).draggable({ handle: ".popUpBar" , containment: "window", scroll: false});
         $( "#sumWin" ).resizable();
         $(".popUpBar").click(function() {
             if ($(this).parent().attr("id")=="sumWin") {
                 setTimeout(function() {
                     $("#sumWin").css("z-index",4001);
                 },200);
             } else {
                 setTimeout(function() {
                     $("#sumWin").css("z-index",3000);
                },200);
             }
        });
         $( "#sumdiv" ).tabs();
         var selres=$("#organiser").clone(false).attr({id:"selRes",style:"height: 30px;width:150px;font-size:14px;border-radius:6px;margin:7px"});
         var seltroops=$("#organiser").clone(false).attr({id:"selTroops",style:"height: 30px;width:150px;font-size:14px;border-radius:6px;margin:7px"});
         var selraids=$("#organiser").clone(false).attr({id:"selRaids",style:"height: 30px;width:150px;font-size:14px;border-radius:6px;margin:7px"});
         $("#resup").next().after(selres);
         $("#troopsup").next().after(seltroops);
         $("#raidoverup").next().after(selraids);
         $("#selTroops").val("all").change();
         $("#selRes").val("all").change();
         $("#selRaids").val("all").change();
         //tabs.tabs( "refresh" );
         $("#resup").click(function() {
             $("#selRes").val("all").change();
             jQuery.ajax({url: 'overview/citover.php',type: 'POST',aysnc:false,
                          success: function(data) {
                              var sumres=JSON.parse(data);
                              updateres(sumres);
                         }
                         });
         });
         $("#troopsup").click(function() {
             $("#selTroops").val("all").change();
             var notes={id:[],notes:[]};
             jQuery.ajax({url: 'overview/citover.php',type: 'POST',aysnc:false,
                          success: function(data) {
                             var sumres=JSON.parse(data);
                              $.each(sumres, function() {
                                  notes.id.push(this.id);
                                  notes.notes.push(this.reference);
                              });
                              jQuery.ajax({url: 'overview/trpover.php',type: 'POST',aysnc:false,
                                          success: function(data) {
                                              var troopsres=JSON.parse(data);
                                              updatetroops(troopsres,notes);
                                          }
                                          });
                          }
                         });
         });
         $("#raidup").click(function() {
            jQuery.ajax({url: 'overview/rreps.php',type: 'POST',aysnc:false,
                         success: function(data) {
                             var raids=JSON.parse(data);
                             updateraids(raids,$("#raidsturnc").val());
                         }
                        });
        });
         $("#raidoverup").click(function() {
             var notes={id:[],notes:[]};
             jQuery.ajax({url: 'overview/citover.php',type: 'POST',aysnc:false,
                          success: function(data) {
                              var sumres=JSON.parse(data);
                              $.each(sumres, function() {
                                  notes.id.push(this.id);
                                  notes.notes.push(this.reference);
                              });
                              jQuery.ajax({url: 'overview/graid.php',type: 'POST',aysnc:false,
                                           success: function(data) {
                                              var raids=JSON.parse(data);
                                              updateraidover(raids,notes);
                                           }
                                          });
                          }
                         });
         });
        $("#supportup").click(function() {
            jQuery.ajax({url: 'overview/reinover.php',type: 'POST',aysnc:false,
                         success: function(data) {
                             var support=JSON.parse(data);
                             updatesupport(support);
                         }
                        });
        });
         var citylist=[];
         $("#selTroops").change(function() {
             if ( $("#selTroops").val()=="all") {
                 $("#troopstable tr").each(function() {
                    $(this).show();
                });
             } else {
                 $.each(pdata.clc, function(key, value) {
                     if (key==$("#selTroops").val()) {
                         citylist=value;
                     }
                 });
                 $("#troopstable tr").each(function() {
                    if (citylist.indexOf(Number($(this).attr("data")))>-1) {
                        $(this).show();
                    } else if (Number($(this).attr("data"))!=0) {
                        $(this).hide();
                    }
                });
             }
         });
         $("#selRes").change(function() {
             if ( $("#selRes").val()=="all") {
                $("#restable tr").each(function() {
                    $(this).show();
                });
             } else {
                 $.each(pdata.clc, function(key, value) {
                    if (key==$("#selRes").val()) {
                        citylist=value;
                    }
                 });
                 $("#restable tr").each(function() {
                    if (citylist.indexOf(Number($(this).attr("data")))>-1) {
                        $(this).show();
                    } else if (Number($(this).attr("data"))!=0) {
                        $(this).hide();
                    }
                });
             }
         });
         $("#selRaids").change(function() {
             if ( $("#selRsaids").val()=="all") {
                 $("#raidovertable tr").each(function() {
                     $(this).show();
                 });
            } else {
                $.each(pdata.clc, function(key, value) {
                    if (key==$("#selRaids").val()) {
                        citylist=value;
                    }
                });
                $("#raidovertable tr").each(function() {
                    if (citylist.indexOf(Number($(this).attr("data")))>-1) {
                        $(this).show();
                    } else if (Number($(this).attr("data"))!=0) {
                        $(this).hide();
                    }
                });
            }
         });
     }
    //update raid overview
    function updateraidover(data,notes) {
        var raidovertab="<thead><tr data='0'><th></th><th>Name</th><th colspan='2'>Notes</th><th>Coords</th><th>Raids</th><th>Out</th><th>In</th><th>Raiding TS</th><th>Resources</th></tr></thead><tbody>";
        $.each(data.a, function() {
            var cid=this[0];
            var not=notes.notes[notes.id.indexOf(cid)];
            var x=Number(cid%65536);
            var y=Number((cid-x)/65536);
            raidovertab+="<tr data='"+cid+"'><td><button style='height: 20px;padding-top: 3px;border-radius:6px;' class='greenb recraid' data='"+cid+"'>Recall Raids</button></td>";
            raidovertab+="<td data='"+cid+"' class='coordblink raidclink'>"+this[1]+"</td><td colspan='2'>"+not+"</td><td class='coordblink shcitt' data='"+cid+"'>"+x+":"+y+"</td><td>"+this[3]+"</td><td>"+this[6]+"</td><td>"+this[5]+"</td><td>"+this[4].toLocaleString()+"</td>";
            raidovertab+="<td>"+(this[7]+this[8]+this[9]+this[10]+this[11]).toLocaleString()+"</td></tr>";
        });
        raidovertab+="</tbody>";
        $("#raidovertable").html(raidovertab);
        $("#raidovertable td").css("text-align","center");
        var newTableObject = document.getElementById('raidovertable');
        sorttable.makeSortable(newTableObject);
        $(".raidclink").click(function() {
            var aa=$(this).attr("data");
            $("#organiser").val("all").change();
            $("#cityDropdownMenu").val(aa).change();
        });
        $(".recraid").click(function() {
            var id=$(this).attr("data");
            var dat={a: id};
            jQuery.ajax({url: 'overview/rcallall.php',type: 'POST',aysnc:false, data: dat});
            $(this).remove();
        });
    }
    //update support summary
    function updatesupport(data) {
        var supporttab="<thead><th></th><th>Player</th><th>City</th><th>Coords</th><th>Alliance</th><th>TS supporting</th><th>TS sending</th><th>TS returning</th></thead><tbody>";
        $.each(data, function() {
            var tid=this[9][0][1];
            supporttab+="<tr><td><button class='greenb expsup' style='height: 20px;padding-top: 3px;border-radius:6px;'>Expand</button><button data='"+tid+"' class='greenb recasup' style='height: 20px;padding-top: 3px;border-radius:6px;'>Recall all</button>";
            supporttab+="</td><td class='playerblink'>"+this[0]+"</td><td>"+this[2]+"</td><td class='coordblink shcitt' data='"+tid+"'>"+this[3]+":"+this[4]+"</td><td class='allyblink'>"+this[1]+"</td><td>"+this[6]+"</td><td>"+this[7]+"</td><td>"+this[8]+"</td></tr>";
            supporttab+="<tr class='expsuptab'><td colspan='8'><div class='beigemenutable' style='width:98%;'><table><thead><th></th><th>City</th><th>Coords</th><th colspan='2'>Troops</th><th>Status</th><th>Arrival</th></thead><tbody>";
            for (var i in this[9]) {
                var sid=this[9][i][15];
                var status;
                var id=this[9][i][10];
                switch (this[9][i][0]) {
                    case 1:
                        supporttab+="<tr style='color: purple;'><td></td>";
                        status="Sending";
                        break;
                    case 2:
                        supporttab+="<tr style='color: green;'><td><button class='greenb recsup' data='"+id+"' style='height: 20px;padding-top: 3px;border-radius:6px;'>Recall</button></td>";
                        status="Reinforcing";
                        break;
                    case 0:
                        supporttab+="<tr style='color: #00858E;'><td></td>";
                        status="returning";
                        break;
                }
                supporttab+="<td data='"+sid+"' class='coordblink suplink'>"+this[9][i][11]+"</td><td class='coordblink shcitt' data='"+sid+"'>"+this[9][i][12]+":"+this[9][i][13]+"</td>";
                supporttab+="<td colspan='2'>";
                for (var j in this[9][i][8]) {
                    supporttab+=this[9][i][8][j]+",";
                }
                supporttab+="</td><td>"+status+"</td><td>"+this[9][i][9]+"</td></tr>";
            }
            supporttab+="</tbody></table></div></td></tr><tr class='usles'></tr>";
        });
        $("#supporttable").html(supporttab);
        $("#supporttable td").css("text-align","center");
        $(".expsuptab").toggle();
        $(".usles").hide();
        var newTableObject = document.getElementById('supporttable');
        sorttable.makeSortable(newTableObject);
        $(".suplink").click(function() {
            var cid=$(this).attr("data");
            $("#organiser").val("all").change();
            $("#cityDropdownMenu").val(cid).change();
        });
        $(".recsup").click(function() {
            var id=$(this).attr("data");
            var dat={a: id};
            jQuery.ajax({url: 'overview/reinreca.php',type: 'POST',aysnc:false, data: dat});
            $(this).remove();
        });
        $(".expsup").click(function() {
            $(this).parent().parent().next().toggle();
        });
        $(".recasup").click(function() {
            var id=$(this).attr("data");
            var dat={a: id};
            jQuery.ajax({url: 'overview/reinrecall.php',type: 'POST',aysnc:false, data: dat});
            $(this).remove();
        });
    }
    //update raids summary
    function updateraids(data,turnc) {
        var raidtab="<thead><th>Report</th><th>Type</th><th>Cavern progress</th><th>losses</th><th>Carry</th><th>Date</th><th>Origin</th></thead><tbody>";
        var i=0;
        $.each(data.b, function() {
            if (i<turnc) {
                if (this[2]<=2) {
                    raidtab+="<tr style='color:green;'>";
                }
                else if (2<this[2] && this[2]<=5) {
                    raidtab+="<tr style='color:#CF6A00;'>";
                }
                else if (this[2]>5 ) {
                    raidtab+="<tr style='color:red;'>";
                }
                raidtab+="<td class='gFrep' data='"+this[6]+"'><span class='unread'>Share report</td><td>"+this[0]+"</span></td><td>"+this[8]+"%"+"</td><td>"+this[2]+"%"+"</td><td>"+this[3]+"%"+"</td><td>"+this[4]+"</td><td>"+this[1]+"</td></tr>";
            }
            i++;
        });
        raidtab+="</tbody>";
        $("#raidtable").html(raidtab);
        $("#raidtable td").css("text-align","center");
        var newTableObject = document.getElementById('raidtable');
        sorttable.makeSortable(newTableObject);
    }
    //update res summary
    function updateres(data) {
        var restabb="<thead><tr data='0'><th>Name</th><th colspan='2'>Notes</th><th>Coords</th><th>Wood</th><th>(Storage)</th><th>Stones</th><th>(Storage)</th><th>Iron</th><th>(Storage)</th><th>Food</th><th>(Storage)</th><th>Carts</th><th>(Total)</th><th>Ships</th><th>(Total)</th><th>Score</th></tr></thead><tbody>";
        var woodtot=0;
        var irontot=0;
        var stonetot=0;
        var foodtot=0;
        var cartstot=0;
        var shipstot=0;
        $.each(data, function() {
            var cid=this.id;
            var x=Number(cid%65536);
            var y=Number((cid-x)/65536);
            restabb+="<tr data='"+cid+"'><td id='cn"+cid+"' class='coordblink'>"+this.city+"</td><td colspan='2'>"+this.reference+"</td><td class='coordblink shcitt' data='"+cid+"'>"+x+":"+y+"</td>";
            var res;
            var sto;
            cartstot+=this.carts_total;
            shipstot+=this.ships_total;
            for (var i=0; i<4; i++)
            {
                switch(i) {
                    case 0:
                        res=this.wood;
                        woodtot+=res;
                        sto=this.wood_storage;
                        break;
                    case 1:
                        res=this.stone;
                        stonetot+=res;
                        sto=this.stone_storage;
                        break;
                    case 2:
                        res=this.iron;
                        irontot+=res;
                        sto=this.iron_storage;
                        break;
                    case 3:
                        res=this.food;
                        foodtot+=res;
                        sto=this.food_storage;
                        break;
                }
                if (res/sto<0.9) {
                    restabb+="<td style='color:green;'>"+res.toLocaleString()+"</td><td>"+sto.toLocaleString()+"</td>";
                } else if ((res/sto<1) && (res/sto>=0.9)) {
                    restabb+="<td style='color:#CF6A00;'>"+res.toLocaleString()+"</td><td>"+sto.toLocaleString()+"</td>";
                } else if (res==sto) {
                    restabb+="<td style='color:red;'>"+res.toLocaleString()+"</td><td>"+sto.toLocaleString()+"</td>";
                }
            }
            restabb+="<td>"+this.carts_home.toLocaleString()+"</td><td>"+this.carts_total.toLocaleString()+"</td><td>"+this.ships_home+"</td><td>"+this.ships_total+"</td><td>"+this.score.toLocaleString()+"</td></tr>";
        });
        restabb+="</tbody>";
        $("#restable").html(restabb);
        $("#restable td").css("text-align","center");
        var newTableObject = document.getElementById('restable');
        sorttable.makeSortable(newTableObject);
        var tottab="<div id='rsum' class='beigemenutable scroll-pane' style='width: 99%;margin-left: 4px;'><table><td>Total wood: </td><td>"+woodtot.toLocaleString()+"</td><td>Total stones: </td><td>"+stonetot.toLocaleString()+"</td><td>Total iron: </td><td>"+irontot.toLocaleString()+"</td><td>Total food: </td><td>"+foodtot.toLocaleString()+"</td>";
        tottab+="<td>Total carts: </td><td>"+cartstot.toLocaleString()+"</td><td>Total ships: </td><td>"+shipstot.toLocaleString()+"</td></table></div>";
        $("#rsum").remove();
        $("#resTab").append(tottab);
        $("#rsum td").css("text-align","center");
        $.each(data, function() {
            var aa=this.id;
            $("#cn"+aa).click(function() {
                $("#organiser").val("all").change();
                $("#cityDropdownMenu").val(aa).change();
            });
        });
    }
    //update trops summary
    function updatetroops(data,notes) {
        var troopstab="<thead><tr data='0'><th>Name</th><th style='width:150px;'>Notes</th><th>Coords</th><th><div class='"+tpicdiv[8]+"'></div>(home)</th><th>(Total)</th><th><div class='"+tpicdiv[1]+"'></div>(home)</th><th>(Total)</th><th><div class='"+tpicdiv[11]+"'></div>(home)</th><th>(Total)</th></th>";
        troopstab+="<th><div class='"+tpicdiv[14]+"'></div>(home)</th><th>(Total)</th><th><div class='"+tpicdiv[0]+"'></div>(home)</th><th>(Total)</th><th><div class='"+tpicdiv[10]+"'></div>(home)</th><th>(Total)</th><th><div class='"+tpicdiv[9]+"'></div>(home)</th><th>(Total)</th><th><div class='"+tpicdiv[4]+"'></div>(home)</th><th>(Total)</th><th><div class='"+tpicdiv[12]+"'></div>(home)</th><th>(Total)</th>";
        troopstab+="<th><div class='"+tpicdiv[2]+"'></div>(home)</th><th>(Total)</th><th><div class='"+tpicdiv[13]+"'></div>(home)</th><th>(Total)</th><th><div class='"+tpicdiv[7]+"'></div>(home)</th><th>(Total)</th><th><div class='"+tpicdiv[17]+"'></div>(home)</th><th>(Total)</th><th><div class='"+tpicdiv[6]+"'></div>(home)</th><th>(Total)</th><th><div class='"+tpicdiv[15]+"'></div>(home)</th><th>(Total)</th>";
        troopstab+="<th><div class='"+tpicdiv[3]+"'></div>(home)</th><th>(Total)</th><th><div class='"+tpicdiv[5]+"'></div>(home)</th><th>(Total)</th><th><div class='"+tpicdiv[16]+"'></div>(home)</th><th>(Total)</th><th>TS(home)</th><th>(Total)</th>";
        troopstab+="</tr></thead><tbody>";
        var arbstot=0;
        var balltot=0;
        var druidstot=0;
        var galltot=0;
        var guardstot=0;
        var horsetot=0;
        var praetorstot=0;
        var priesttot=0;
        var ramstot=0;
        var rangerstot=0;
        var scorptot=0;
        var scoutstot=0;
        var senatortot=0;
        var sorctot=0;
        var stingerstot=0;
        var triaritot=0;
        var vanqstot=0;
        var warshipstot=0;
        var tshome;
        var tstot;
        var thome;
        var ttot;
        $.each(data, function() {
            tshome=0;
            tstot=0;
            var cid=this.id;
            var not=notes.notes[notes.id.indexOf(cid)];
            var x=Number(cid%65536);
            var y=Number((cid-x)/65536);
            troopstab+="<tr data='"+cid+"'><td id='cnt"+cid+"' class='coordblink'>"+this.c+"</td><td style='width:150px;'>"+not+"</td><td class='coordblink shcitt' data='"+cid+"'>"+x+":"+y+"</td>";
            thome=this.Arbalist_home;
            ttot=this.Arbalist_total;
            arbstot+=ttot;
            tshome+=2*thome;
            tstot+=2*ttot;
            troopstab+="<td>"+thome.toLocaleString()+"</td><td>"+ttot.toLocaleString()+"</td>";
            
            thome=this.Ballista_home;
            ttot=this.Ballista_total;
            balltot+=ttot;
            tshome+=10*thome;
            tstot+=10*ttot;
            troopstab+="<td>"+thome.toLocaleString()+"</td><td>"+ttot.toLocaleString()+"</td>";
            
            thome=this.Druid_home;
            ttot=this.Druid_total;
            druidstot+=ttot;
            tshome+=2*thome;
            tstot+=2*ttot;
            troopstab+="<td>"+thome.toLocaleString()+"</td><td>"+ttot.toLocaleString()+"</td>";
            
            thome=this.Galley_home;
            ttot=this.Galley_total;
            galltot+=ttot;
            tshome+=100*thome;
            tstot+=100*ttot;
            troopstab+="<td>"+thome.toLocaleString()+"</td><td>"+ttot.toLocaleString()+"</td>";
            
            thome=this.Guard_home;
            ttot=this.Guard_total;
            guardstot+=ttot;
            tshome+=thome;
            tstot+=ttot;
            troopstab+="<td>"+thome.toLocaleString()+"</td><td>"+ttot.toLocaleString()+"</td>";
            
            thome=this.Horseman_home;
            ttot=this.Horseman_total;
            horsetot+=ttot;
            tshome+=2*thome;
            tstot+=2*ttot;
            troopstab+="<td>"+thome.toLocaleString()+"</td><td>"+ttot.toLocaleString()+"</td>";
            
            thome=this.Praetor_home;
            ttot=this.Praetor_total;
            praetorstot+=ttot;
            tshome+=2*thome;
            tstot+=2*ttot;
            troopstab+="<td>"+thome.toLocaleString()+"</td><td>"+ttot.toLocaleString()+"</td>";
            
            thome=this.Priestess_home;
            ttot=this.Priestess_total;
            priesttot+=ttot;
            tshome+=thome;
            tstot+=ttot;
            troopstab+="<td>"+thome.toLocaleString()+"</td><td>"+ttot.toLocaleString()+"</td>";
            
            thome=this.Ram_home;
            ttot=this.Ram_total;
            ramstot+=ttot;
            tshome+=10*thome;
            tstot+=10*ttot;
            troopstab+="<td>"+thome.toLocaleString()+"</td><td>"+ttot.toLocaleString()+"</td>";
            
            thome=this.Ranger_home;
            ttot=this.Ranger_total;
            rangerstot+=ttot;
            tshome+=thome;
            tstot+=ttot;
            troopstab+="<td>"+thome.toLocaleString()+"</td><td>"+ttot.toLocaleString()+"</td>";
            
            thome=this.Scorpion_home;
            ttot=this.Scorpion_total;
            scorptot+=ttot;
            tshome+=10*thome;
            tstot+=10*ttot;
            troopstab+="<td>"+thome.toLocaleString()+"</td><td>"+ttot.toLocaleString()+"</td>";
            
            thome=this.Scout_home;
            ttot=this.Scout_total;
            scoutstot+=ttot;
            tshome+=2*thome;
            tstot+=2*ttot;
            troopstab+="<td>"+thome.toLocaleString()+"</td><td>"+ttot.toLocaleString()+"</td>";
            
            thome=this.Senator_home;
            ttot=this.Senator_total;
            senatortot+=ttot;
            tshome+=thome;
            tstot+=ttot;
            troopstab+="<td>"+thome.toLocaleString()+"</td><td>"+ttot.toLocaleString()+"</td>";
            
            thome=this.Sorcerer_home;
            ttot=this.Sorcerer_total;
            sorctot+=ttot;
            tshome+=thome;
            tstot+=ttot;
            troopstab+="<td>"+thome.toLocaleString()+"</td><td>"+ttot.toLocaleString()+"</td>";
            
            thome=this.Stinger_home;
            ttot=this.Stinger_total;
            stingerstot+=ttot;
            tshome+=100*thome;
            tstot+=100*ttot;
            troopstab+="<td>"+thome.toLocaleString()+"</td><td>"+ttot.toLocaleString()+"</td>";
            
            thome=this.Triari_home;
            ttot=this.Triari_total;
            triaritot+=ttot;
            tshome+=thome;
            tstot+=ttot;
            troopstab+="<td>"+thome.toLocaleString()+"</td><td>"+ttot.toLocaleString()+"</td>";
            
            thome=this.Vanquisher_home;
            ttot=this.Vanquisher_total;
            vanqstot+=ttot;
            tshome+=thome;
            tstot+=ttot;
            troopstab+="<td>"+thome.toLocaleString()+"</td><td>"+ttot.toLocaleString()+"</td>";
            
            thome=this.Warship_home;
            ttot=this.Warship_total;
            warshipstot+=ttot;
            tshome+=400*thome;
            tstot+=400*ttot;
            troopstab+="<td>"+thome.toLocaleString()+"</td><td>"+ttot.toLocaleString()+"</td>";
            
            troopstab+="<td>"+tshome.toLocaleString()+"</td><td>"+tstot.toLocaleString()+"</td></tr>";
        });
        troopstab+="</tbody>";
        $("#troopstable").html(troopstab);
        $("#troopstable td").css("text-align","center");
        $("#troopstable td").css("padding-left","0%");
        var newTableObject = document.getElementById('troopstable');
        sorttable.makeSortable(newTableObject);
        var tottab="<div id='tsum' class='beigemenutable scroll-pane' style='width: 99%;margin-left: 4px;'><table style='font-size: 14px;width: 120%;'><tr><td>Total arbs: </td><td>Total balli: </td><td>Total druids: </td><td>Total galley: </td><td>Total guards: </td><td>Total horses: </td><td>Total praetor: </td><td>Total priest: </td><td>Total rams: </td><td>Total rangers: </td>";
        tottab+="<td>Total scorp: </td><td>Total scouts: </td><td>Total senator: </td><td>Total sorc: </td><td>Total stingers: </td><td>Total triari: </td><td>Total vanqs: </td><td>Total warship: </td></tr>";
        tottab+="<tr><td>"+arbstot.toLocaleString()+"</td><td>"+balltot.toLocaleString()+"</td>";
        tottab+="<td>"+druidstot.toLocaleString()+"</td>";
        tottab+="<td>"+galltot.toLocaleString()+"</td>";
        tottab+="<td>"+guardstot.toLocaleString()+"</td>";
        tottab+="<td>"+horsetot.toLocaleString()+"</td>";
        tottab+="<td>"+praetorstot.toLocaleString()+"</td>";
        tottab+="<td>"+priesttot.toLocaleString()+"</td>";
        tottab+="<td>"+ramstot.toLocaleString()+"</td>";
        tottab+="<td>"+rangerstot.toLocaleString()+"</td>";
        tottab+="<td>"+scorptot.toLocaleString()+"</td>";
        tottab+="<td>"+scoutstot.toLocaleString()+"</td>";
        tottab+="<td>"+senatortot.toLocaleString()+"</td>";
        tottab+="<td>"+sorctot.toLocaleString()+"</td>";
        tottab+="<td>"+stingerstot.toLocaleString()+"</td>";
        tottab+="<td>"+triaritot.toLocaleString()+"</td>";
        tottab+="<td>"+vanqstot.toLocaleString()+"</td>";
        tottab+="<td>"+warshipstot.toLocaleString()+"</td></tr></table></div>";
        $("#tsum").remove();
        $("#troopsTab").append(tottab);
        //$("#tsum td").css("text-align","center");
        $.each(data, function() {
            var aa=this.id;
            $("#cnt"+aa).click(function() {
                $("#organiser").val("all").change();
                $("#cityDropdownMenu").val(aa).change();
            });
        });
    }
    //hiding cities in shrine planner
    function hidecities() {
        $("#shrineTab tr").each(function () {
            if($(this).attr("data")=="city") {
                $(this).hide();
            }
        });
    }
    //showing cities in shrine planner
    function showcities() {
        $("#shrineTab tr").each(function () {
            if($(this).attr("data")=="city") {
                $(this).show();
            }
        });
    }
    //updating shrine enlightment list
    function updateshrine() {
        var shrinetab="<table id='shrineTab'><thead><th style='width:115px'>Change</th><th style='width:50px'>Chances</th><th>Distance</th><th>Player</th><th>City</th><th>Coords</th><th style='width:100px'>Alliance</th><th>score</th><th>Type</th></thead><tbody>";
        var ccounter=0;
        var w=[];
        var wtot=0;
        for (var i in shrinec) {
            if (i>0) {
                var k=splayers.name.indexOf(shrinec[i][1]);
                //console.log(k,splayers);
                for (var j in splayers.cities[k]) {
                    if (shrinec[i][3]==splayers.cities[k][j].b && shrinec[i][4]==splayers.cities[k][j].c) {
                        shrinec[i][2]=splayers.cities[k][j].h;
                        if (shrinec[i][9]==0) {
                            shrinec[i][7]=splayers.cities[k][j].a;
                        }
                        shrinec[i][8]=splayers.ally[k];
                    }
                }
                if (shrinec[i][0]=="castle") {
                    ccounter++;
                    if (ccounter<17) {
                        w[ccounter]=shrinec[i][7]/shrinec[i][5];
                        wtot+=shrinec[i][7]/(shrinec[i][5]);
                    }
                }
            }
        }
        for (var i in w) {
            w[i]=Math.round(w[i]/wtot*100);
        }
        //console.log(shrinec);
        var ccounter=0;
        for (var i in shrinec) {
            if (i>0) {
                var cid=shrinec[i][4]*65536+Number(shrinec[i][3]);
                if (shrinec[i][0]=="castle") {
                    ccounter++;
                    if (ccounter<17) {
                        if (shrinec[i][6]=="0") {
                            shrinetab+="<tr style='color:purple;'><td><button data='"+i+"' class='greenb shrineremove' style='font-size: 10px;height: 20px;padding: 3px;width: 15px;border-radius: 4px;'>x</button>";
                            shrinetab+="<button id='"+i+"' data='castle' class='greenb shrinechange' style='font-size: 10px;height: 20px;padding-top: 3px;border-radius: 4px;'>City</button>";
                            shrinetab+="<button data='"+i+"' class='greenb shrine10k' style='font-size: 10px;height: 20px;padding: 3px;width: 25px;border-radius: 4px;'>10k</button>";
                            shrinetab+="<button data='"+i+"' class='greenb shrine7pt' style='font-size: 10px;height: 20px;padding: 3px;width: 25px;border-radius: 4px;'>7pt</button></td><td>"+ccounter+" - "+w[ccounter]+"% "+"</td>";
                        } else {
                            shrinetab+="<tr style='color:green;'><td><button data='"+i+"' class='greenb shrineremove' style='font-size: 10px;height: 20px;padding: 3px;width: 15px;border-radius: 4px;'>x</button>";
                            shrinetab+="<button id='"+i+"' data='castle' class='greenb shrinechange' style='font-size: 10px;height: 20px;padding-top: 3px;border-radius: 4px;'>City</button>";
                            shrinetab+="<button data='"+i+"' class='greenb shrine10k' style='font-size: 10px;height: 20px;padding: 3px;width: 25px;border-radius: 4px;'>10k</button>";
                            shrinetab+="<button data='"+i+"' class='greenb shrine7pt' style='font-size: 10px;height: 20px;padding: 3px;width: 25px;border-radius: 4px;'>7pt</button></td><td>"+ccounter+" - "+w[ccounter]+"% "+"</td>";
                        }
                    } else if (ccounter>=17 && ccounter<21) {
                        shrinetab+="<tr><td><button data='"+i+"' class='greenb shrineremove' style='font-size: 10px;height: 20px;padding: 3px;width: 15px;border-radius: 4px;'>x</button>";
                        shrinetab+="<button id='"+i+"' data='castle' class='greenb shrinechange' style='font-size: 10px;height: 20px;padding-top: 3px;border-radius: 4px;'>City</button>";
                        shrinetab+="<button data='"+i+"' class='greenb shrine10k' style='font-size: 10px;height: 20px;padding: 3px;width: 25px;border-radius: 4px;'>10k</button>";
                        shrinetab+="<button data='"+i+"' class='greenb shrine7pt' style='font-size: 10px;height: 20px;padding: 3px;width: 25px;border-radius: 4px;'>7pt</button></td><td>"+ccounter+"</td>";
                    }
                } else {
                    if (shrinec[i][6]=="0") {
                        shrinetab+="<tr style='color:grey;' data='city'><td><button data='"+i+"' class='greenb shrineremove' style='font-size: 10px;height: 20px;padding: 3px;width: 15px;border-radius: 4px;'>x</button>";
                        shrinetab+="<button id='"+i+"' data='city' class='greenb shrinechange' style='font-size: 10px;height: 20px;padding: 3px;border-radius: 4px;width:37px;'>Castle</button>";
                        shrinetab+="<button data='"+i+"' class='greenb shrine10k' style='font-size: 10px;height: 20px;padding: 3px;width: 25px;border-radius: 4px;'>10k</button>";                            
                        shrinetab+="<button data='"+i+"' class='greenb shrine7pt' style='font-size: 10px;height: 20px;padding: 3px;width: 25px;border-radius: 4px;'>7pt</button></td><td></td>";
                    } else {
                        shrinetab+="<tr style='color:#74A274;'><td><button data='"+i+"' class='greenb shrineremove' style='font-size: 10px;height: 20px;padding: 3px;width: 15px;border-radius: 4px;'>x</button>";
                        shrinetab+="<button id='"+i+"' data='city' class='greenb shrinechange' style='font-size: 10px;height: 20px;padding: 3px;border-radius: 4px;width:37px;'>Castle</button>";
                        shrinetab+="<button data='"+i+"' class='greenb shrine10k' style='font-size: 10px;height: 20px;padding: 3px;width: 25px;border-radius: 4px;'>10k</button>";
                        shrinetab+="<button data='"+i+"' class='greenb shrine7pt' style='font-size: 10px;height: 20px;padding: 3px;width: 25px;border-radius: 4px;'>7pt</button></td><td></td>";
                    }
                }
                shrinetab+="<td>"+roundToTwo(shrinec[i][5])+"</td><td class='playerblink'>"+shrinec[i][1]+"</td><td>"+shrinec[i][2]+"</td><td class='coordblink shcitt' data='"+cid+"'>"+shrinec[i][3]+":"+shrinec[i][4]+"</td><td class='allyblink'>"+shrinec[i][8]+"</td><td>"+shrinec[i][7]+"</td><td>"+shrinec[i][0]+"</td></tr>";
                if (ccounter==20) {
                    break;
                }
            }
        }
        shrinetab+="</tbody></table>";
        $("#shrinediv").html(shrinetab);
        $("#shrineTab td").css("text-align","center");
        if (localStorage.getItem("hidecities")=="1") {
            hidecities();
            //console.log("hiding");
        }
        $(".shrinechange").click(function() {
            if ($(this).attr("data")=="castle") {
                shrinec[$(this).attr("id")][0]="city";
            } else {
                shrinec[$(this).attr("id")][0]="castle";
            }
            if (shrinec[$(this).attr("id")][6]=="0") {
                shrinec[$(this).attr("id")][6]=1;
            } else {
                shrinec[$(this).attr("id")][6]=0;
            }
            updateshrine();
        });
        $(".shrineremove").click(function() {
            shrinec.splice($(this).attr("data"),1);
            updateshrine();
        });
        $(".shrine7pt").click(function() {
            if (shrinec[$(this).attr("data")][7]!=7) {
                shrinec[$(this).attr("data")][7]=7;
                shrinec[$(this).attr("data")][9]=1;
                shrinec[$(this).attr("data")][6]=1;
            } else {
                shrinec[$(this).attr("data")][9]=0;
                shrinec[$(this).attr("data")][6]=0;
            }
            updateshrine();
        });
        $(".shrine10k").click(function() {
            if (shrinec[$(this).attr("data")][7]!=10000) {
                shrinec[$(this).attr("data")][7]=10000;
                shrinec[$(this).attr("data")][9]=1;
                shrinec[$(this).attr("data")][6]=1;
            } else {
                shrinec[$(this).attr("data")][9]=0;
                shrinec[$(this).attr("data")][6]=0;
            }
            updateshrine();
        });
    }
    // exporting table to csv file taken from https://gist.github.com/adilapapaya/9787842
    function exportTableToCSV($table, filename) {
        var $headers = $table.find('tr:has(th)')
        ,$rows = $table.find('tr:has(td)')
        // Temporary delimiter characters unlikely to be typed by keyboard
        // This is to avoid accidentally splitting the actual contents
        ,tmpColDelim = String.fromCharCode(11) // vertical tab character
        ,tmpRowDelim = String.fromCharCode(0) // null character
        // actual delimiter characters for CSV format
        ,colDelim = '","'
        ,rowDelim = '"\r\n"';
        // Grab text from table into CSV formatted string
        var csv = '"';
        csv += formatRows($headers.map(grabRow));
        csv += rowDelim;
        csv += formatRows($rows.map(grabRow)) + '"';
        // Data URI
        var csvData = 'data:application/csv;charset=utf-8,' + encodeURIComponent(csv);
        $(this).attr({'download': filename,'href': csvData}); //,'target' : '_blank' //if you want it to open in a new window          
        //------------------------------------------------------------
        // Helper Functions
        //------------------------------------------------------------
        // Format the output so it has the appropriate delimiters
        function formatRows(rows){return rows.get().join(tmpRowDelim).split(tmpRowDelim).join(rowDelim).split(tmpColDelim).join(colDelim);}
        // Grab and format a row from the table
        function grabRow(i,row){
            var $row = $(row);
            //for some reason $cols = $row.find('td') || $row.find('th') won't work...
            var $cols = $row.find('td');
            if(!$cols.length) $cols = $row.find('th');
                return $cols.map(grabCol)
                    .get().join(tmpColDelim);
        }
        // Grab and format a column from the table
        function grabCol(j,col){
                var $col = $(col),
                $text = $col.text();
                return $text.replace('"', '""'); // escape double quotes
        }
    }
})();
