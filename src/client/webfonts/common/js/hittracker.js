/*
 *  Copyright (c) 2018 Boeing. All Rights Reserved.
 *  Printing, copying, reproducing or electronically transmitting this
 *  software and its associated documentation in whole or in part, in
 *  any form whatever, is subject to the terms of the Software License
 *  Agreement by and between The Boeing Company and LICENSEE.
 */

///	Boeing Helvetica Neue webfonts pageview tracking code v1.0

/// Please do not edit below this line

///	BOEING USAGE AGREEMENT ///

/// To ensure compliance with our Monotype license agreement, 
/// this code must be installed on both intranet and extranet 
/// production servers that use the Helvetica Neue webfonts.  
/// Additionally, external third-party websites not tracked via Cormetrics 
/// (or current analytics app) must also use this tracking script.

/// If your website has not been approved to use these webfonts, please 
/// use the Helvetica Neue 'decision tree' here
/// http://brandcenter.web.boeing.com/_standards/type_helneue_request.cfm

/// MONOTYPE LICENSE AGREEMENT ///

///	You and any third-party web font hosting service are responsible 
///	for ensuring that the font software in the self-hosting kit, in 
///	its original format, can only be used on the Web Sites for which the 
///	self-hosting kit was downloaded and cannot be used or referenced by 
///	any other web site. This includes, but is not limited to installing 
///	adequate technical protection measures that restrict the use and/or 
///	access to the font software, for instance by utilizing JavaScript or 
///	access control mechanism for cross-origin resource sharing and 
///	protecting against use on web sites other than the Web Sites for which 
///	the self-hosting kit was downloaded by restricting domain access only 
///	to such Web Sites. You must also retain the pageview tracking code on 
///	any Web Site that you self-host. In the event this Agreement terminates 
///	for any reason, the font software included with the self-hosting kit 
///	must be deleted from the server and all copies must be destroyed or 
///	returned to Monotype Imaging.

/// TECHNICAL ///

/// Servers must be configured for these mime types; ttf, eot, woff, svg.

///	Font file names have been obfuscated to protect the font software.

/// If this script is installed in an SSL environment then please reference the  
/// cfc file below from https://active.boeing.com/metrics/hittracker.cfc

/// Pageview metrics can be viewed here http://active.boeing.com/metrics/

$(function(){
	$.ajax({
		dataType:"jsonp",
		url:"https://active.boeing.com/metrics/hittracker.cfc"
	});
});