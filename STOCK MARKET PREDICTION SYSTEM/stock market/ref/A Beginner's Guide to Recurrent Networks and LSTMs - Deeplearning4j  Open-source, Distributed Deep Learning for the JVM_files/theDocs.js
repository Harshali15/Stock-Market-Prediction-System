$(function(){"use strict";$('#scroll-up').on('click',function(){$('html, body').animate({scrollTop:0},900);return false;});$('.toc a, .sidenav.nav a').click(function(){$('html, body').animate({scrollTop:$($.attr(this,'href')).offset().top-80},500);return false;});var hash=location.hash.replace('#','');if(hash!=''&&$("#"+hash).length>0){$('html, body').animate({scrollTop:$("#"+hash).offset().top-100},600);}
if($(window).height()>$('body').height()){var min_height=$(window).height()-$('.site-header').height()-$('.site-footer').height()-60;$('body > main').css('min-height',min_height);}
if($('.sidenav.sticky').length>0){var sidenav_max_height=$(window).height()-$('.sidenav.sticky').position().top-100;$('.sidenav.sticky').height(sidenav_max_height);}
if($('.site-header').hasClass('sticky')&&!$('.site-header').hasClass('navbar-sm')){var navbar_lg=false;if($('.site-header').hasClass('navbar-lg')){navbar_lg=true;}
$(window).on('scroll',function(){var offset=$('.site-header').offset().top+$('.site-header').height();if($(window).scrollTop()>offset){if(navbar_lg){$('.site-header').removeClass('navbar-lg');}
$('.site-header').addClass('navbar-sm');}
else{if(navbar_lg){$('.site-header').addClass('navbar-lg');}
$('.site-header').removeClass('navbar-sm');}});}
if($('.site-header').hasClass('navbar-transparent')&&$('.site-header').hasClass('sticky')){if($('.site-header > .banner').length==0){$('.site-header').removeClass('navbar-transparent');}
else{if($('.site-header').hasClass('sticky')){$(window).on('scroll',function(){var offset=$('.site-header .navbar').height();if($(window).scrollTop()>offset){$('.site-header').removeClass('navbar-transparent')}
else{$('.site-header').addClass('navbar-transparent')}});}}}
if($('.site-header').hasClass('sticky')&&$('.site-header > .banner').length==0){$('.site-header').css('padding-top',$('.site-header > .navbar').height()+30);}
if('.navbar-brand > img'){$('.navbar-brand').prepend('<span class="force-middle"></span>');}
$('[data-toggle="offcanvas"]').on('click',function(){$('body').toggleClass('open-sidebar');if($('body').hasClass('open-sidebar')){$('html').css('overflow','hidden');$('.site-header .jumbotron').slideUp(50);}
else{$('html').css('overflow','visible');$('.site-header .jumbotron').slideDown(900);}});$('.sidenav.dropable > li > a').on('click',function(e){if(0<$(this).next("ul").length){e.preventDefault();}
if(0==$(this).next("ul").length){return;}
if($(this).hasClass('open')){$(this).removeClass('open').next("ul").slideUp(300);return;}
$(this).parents(".sidenav").find("> li > a").removeClass('open');$(this).parents(".sidenav").find("ul").not(":hidden").slideUp(300);$(this).addClass('open').next("ul").slideDown(300);});$('.sidenav.dropable > li > a.active').addClass('open');$('.sidenav.dropable > li > ul').prev('a').addClass('has-child');if($(window).width()<768){$('.sidebar-boxed').removeClass('sidebar-dark');}
if($('.sidenav').hasClass('sticky')){$(window).on('scroll',function(){var $sidenav=$('.sidenav'),offset=$('.sidebar').offset();if($(window).scrollTop()>offset.top){$sidenav.css({position:'fixed',top:'120px',width:'215px'});}else{$sidenav.css('position','static');}});}
$('h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]').each(function(index,value){var link='<a href="#'+$(this).attr("id")+'">'+$(this).html()+'</a>';$(this).html(link);});jQuery.expr[':'].icontains=function(a,i,m){return jQuery(a).text().toUpperCase().indexOf(m[3].toUpperCase())>=0;};$('.faq-search').on('keyup',function(e){var s=$(this).val().trim(),result=$(this).parent().find("li");if(s===''){result.show();return true;}
result.not(':icontains('+s+')').hide();result.filter(':icontains('+s+')').show();});$('.faq li > h6').on('click',function(){$(this).toggleClass('open').next('div').slideToggle(300);});if($.fn.mediaelementplayer){$('video').mediaelementplayer();}
if($.fn.fitVids){$('.video').fitVids();}
$('.file-tree li.is-file').on('click',function(e){e.stopPropagation();});$('.file-tree li.is-folder').on('click',function(e){$(this).find('ul:first').slideToggle(400,function(){$(this).parent('li').toggleClass('open');});e.stopPropagation();});$('.grid-view > li, .categorized-view > li, .promo.small-icon').matchHeight();$('.code-tabs').each(function(index,value){var topbar='';if($(this).children().length>1){topbar+='<div class="languages"><div class="btn-group" data-toggle="buttons">';$(this).children().each(function(index,value){var active='',check='',title='';if(index==0){active=' active';check=' checked';}
if($(this).children("code").attr('class')){title=$(this).children("code").attr('class');title=title.replace("language-","");title=title.toLowerCase();if(title=="markup"){title="html";}}
else if($(this).hasClass('code-preview')){title='Example';}
topbar+='<label class="btn'+active+'"><input type="radio" autocomplete="off"'+check+'>'+title+'</label>';});topbar+='</div></div>';}
$(this).children(':not(:first)').hide(0);$(this).children().wrapAll('<div class="window-content"></div>');$(this).prepend(topbar);var window_content=$(this).children('.window-content');$(this).find(".btn-group .btn").on('click',function(){var i=$(this).index();window_content.children(":visible").fadeOut(200,function(){window_content.children(":not(.prism-show-language):eq("+i+")").fadeIn(200);});});});$('pre code').each(function(){$(this).html($.trim($(this).html()));});$('.code-preview .clipboard-copy').remove();$('.clipboard-copy').tooltip({placement:'bottom',trigger:'manual'});$('.clipboard-copy').parent().on('scroll',function(){$(this).find('.clipboard-copy').css('transform','translate('+$(this).scrollLeft()+'px, '+$(this).scrollTop()+'px)');});if($('.clipboard-copy').length>0){var clipboardSnippets=new Clipboard('.clipboard-copy',{target:function(trigger){return trigger.nextElementSibling;}});clipboardSnippets.on('success',function(e){e.clearSelection();$(e.trigger).tooltip('show');setTimeout(function(el){$(el.trigger).tooltip('hide');},1000,e);});}});