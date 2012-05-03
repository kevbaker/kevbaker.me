$(document).ready(function() {  

	$.fn.extend({
				
		clearForm: function() {
			return this.each(function() {
				var type = this.type, tag = this.tagName.toLowerCase();
				if (tag == 'form')
					return $(':input',this).clearForm();
					if (type == 'text' || type == 'password' || tag == 'textarea')
						this.value = '';
					else if (type == 'checkbox' || type == 'radio')
						this.checked = false;
					else if (tag == 'select')
						this.selectedIndex = -1;
			});
		},
	
		// Creates the page navigation slide fade animation
		pageNavigation:function(){
			return this.each(function(){
									  
				var $nav = $('#navigation');
				// add current class to home navigation 
				
				$("li:first",$nav).addClass('current');
				
				$nav.find('ul a:not(.hardlink)').each(function(){					
					
					$(this).click(function(){
						
						$(this).navigationClick();
						
						return false;
					});
				});
			})
		},
		
		
		// Creates the intern navigation slide fade animation
		internNavigation:function(){
			return this.each(function(){
									  
				var $nav = $('#navigation');
				// add current class to home navigation 
				
				$("li:first",$nav).addClass('current');
				
				$(this).click(function(){
					
					$(this).navigationClick();
					
   					return false;
				});
			})
		},

		
		navigationClick: function() {
			
			return this.each(function(){
			
					var $a = $(this);
					var $nav = $('#navigation');
					
					// find current visible page
					var visibleId = '#'+$('#content .page:visible').attr('id');
					// find next page to show
					var page =  $( $a.attr('href') );
					// get height of next page to show
					var h = page.outerHeight(true);
					
					if(visibleId!= $a.attr('href')){
						
						// remove class .current on all navigation elements
						$("li",$nav).removeClass("current");
						
						// add .current class to acutal item
						$( 'a[href=' + $a.attr('href') + ']', $nav).parent().addClass('current');						
						
						// start the animation
						$('#content .page').each(function(){
							$(this).stop(true).animate({opacity: 0}, 350, function(){
								$(this).hide(); // hide current visible page
							})
							// start height animation of next page
							$('#content').stop().animate({ height: h }, 600, function(){
								$(this).css({height: 'auto'});
								// fade in next page
								page.show().stop().animate({ opacity: 1 }, 350, "swing", function() { 
									msieFilterRemove(this);
								});
							});
					   });
					};
					

			});
		},

		
		// creates the animation for the social bookmarks page
		socialAnimation:function(){
			return this.each(function(){
				$(this).hover(
					function(){
						$(this).stop(true, false).animate({
							paddingLeft: 13
						},250);
					},
					function(){
						$(this).stop(true, false).animate({
							paddingLeft: 0
						},250);
					}
				);
			})
		},
		
		// Functions for the Skin Changer
		/** Delete this after going live **/
		changeBackground:function(){
			return this.each(function(){
				$(this).click(function(){
					var li = $(this).parent();
					li.siblings().removeClass('current');
					li.addClass('current');
					$("body")
						.removeClass()
						.addClass($(this).attr('rel'));	
					
					return false;
				});
			})
		},
		
		changeCSS:function(){
			return this.each(function(){
				$(this).click(function(){
					var li = $(this).parent();
					li.siblings().removeClass('current');
					li.addClass('current');
					$("#cssColor").attr("href", "css/colors/"+$(this).attr('rel')+".css" );				
					return false;
				});
			})
		}	
		/** Delete ends here **/
		
	})
	
	// Function to remove filter in IE
	function msieFilterRemove(x) { 
		if(jQuery.browser.msie) x.style.removeAttribute('filter'); 
	}	

	// Init Scrolling for gallery items
	$('#gallery .items').cycle({ 
		timeout: 0,  // milliseconds between slide transitions (0 to disable auto advance)
		fx: 'scrollHorz', // choose your transition type, ex: fade, scrollUp, shuffle, etc...
		prev: '#galPrev',
		next: '#galNext',
		pause: 1	  // true to enable "pause on hover"							   
	});	
	
	// Init Navigation scripts
	$('#navigation').pageNavigation();
	
	// Inint intern navigation
	$('a.intern').internNavigation();
	
	// Show first page on load
	$('#content .page:first').show();
	
	// Show thumbnail overlay on hover
	$('#gallery ul li a').hover(
		function(){
			$(this).find('span').stop(true,true).fadeIn();
		},
		function(){
			$(this).find('span').stop(true,true).fadeOut();
		}
	);
	
	// Init Cufon on defined items
	Cufon.replace('h2, h3');
	
	// Init PrettyPhoto
	$("a[rel^='prettyPhoto']").prettyPhoto({theme:'dark_rounded'});	
	
	// Init Tipsy Tooltips on Elements with class .tipsy - They need to have a title tag
	$('.tooltip').tipsy({gravity: 's', offset: 200 });
	
	// Init hover animation on social links
	$('.networks li').socialAnimation();
	
	// Init contact form
	$('#contactForm').ajaxForm({
		target: '#formResult',
		beforeSubmit: function() {
			$('#formResult').addClass('show');
		},
		success: function() {
			$('#formResult').fadeIn('slow');
			$('#contactForm').clearForm();
		}
	});
	
	/** Delete this after going live **/
	$('#chooseBGHandler a[rel]').changeBackground();
	$('#chooseColor a[rel]').changeCSS();
	//end of delete

	
}); // Close javascript