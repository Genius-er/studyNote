_maxResults_=50;
$(document).ready(function() {
	window.$Historys = {
		ini: function() {
			$Historys.showIni('');
			$Historys.open('');
			$Historys.search('');
			$Historys.delete();
			$('#historyContain').scroll(function(e) {
				var nScrollHight = $(this)[0].scrollHeight;
				var nScrollTop = $(this)[0].scrollTop;
				var nDivHight = $(this).height();
				if ((nScrollTop + nDivHight + 10 >= nScrollHight) && (nScrollHight - nDivHight > 11)) {
					$Historys.showNext();
				}
			});
		},
		showIni: function(v) {
			chrome.history.search({
				"text": v,
				"maxResults": _maxResults_
			}, function(h) {
				$Historys.show(h);
			});
		},
		show: function(h) {
			var div = '';
			for (var i = 0; i < h.length; i++) {
				var hi = h[i];
				hi.url=html2Escape(hi.url);
				div += '<div class="historyItem">';
				div += '<img class="historyIcon" src="chrome://favicon/' + hi.url + '">';
				div += '<div class="historyName" url="' + hi.url + '">' + (hi.title ? hi.title : hi.url) + '</div>';
				div += '<div class="historyDelete" title="' + (hi.title ? hi.title : hi.url) + '" url="' + hi.url + '"></div>';
				div += '</div>';
			};
			$('#historyContain').html(stripscript(div));
		},
		showNext:function(){
			chrome.history.search({
				"text": '',
				"maxResults": _maxResults_+50
			}, function(h) {
				var div = '';
			_maxResults_=_maxResults_+50
			$Historys.show(h);
			});
		},
		delete: function() {
			$('.historyItem').live('mouseover', function(event) {
				$(this).children('.historyDelete').show();
			});
			$('.historyItem').live('mouseleave', function(event) {
				$(this).children('.historyDelete').hide();
			});
			$('.historyDelete').live('click', function(event) {
				var obj = $(this);
				var url = obj.attr('url');
				var text = '"' + obj.attr("title").substring(0, 12) + '..."' + i18n("HasBeenDeleted");
				chrome.history.deleteUrl({
					'url': url
				}, function() {
					obj.parent().fadeOut(100);
					$notification.show(text, 1);
				})
			});
			$('#clearAllHistory').live('click', function(event) {
				$('#waiting').fadeIn(100);
				chrome.history.deleteAll(function() {
					$('#waiting').fadeOut(100);
					$('#historyContain').html('');
					var text = i18n("BrowsingHistoryHasBeenCleared");
					$notification.show(text, 1);
				})
			});
		},
		search: function() {
			$('#searchhistory').live('input', function(event) {
				var v = $(this).val();
				$Historys.showIni(v);
			});
		},
		open: function() {
			$('.historyName').live('mousedown', function(event) {
				if (event.which == 2) {
					var url = $(this).attr('url');
					window.open(url, '_blank');
				}
			});
			$('.historyName').live('click', function(event) {
				var url = $(this).attr('url');
				var target = '';
				var isNewtab = $setting.get('openInNewtab');
				if (isNewtab) {
					target = '_blank';
				} else {
					target = '_self';
				}

				if (window.event.ctrlKey) {
					window.open(url, '_blank');
				} else {
					window.open(url, target);
				}
				return false;
			});
		}
	}
	$Historys.ini();
});
