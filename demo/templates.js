"use strict"; angular.module("bookingApp").run(["$templateCache", function($templateCache) {$templateCache.put("index.html","<!doctype html>\n<html ng-app=\"bookingApp\" class=\"no-js\" ng-strict-di>\n  <head>\n    <meta charset=\"utf-8\">\n\n    <title>Booking</title>\n\n    <base href=\"/\">\n    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n\n    <meta name=\"mobile-web-app-capable\" content=\"yes\">\n    <meta name=\"apple-mobile-web-app-capable\" content=\"yes\">\n    <meta name=\"apple-mobile-web-app-status-bar-style\" content=\"black\">\n    <meta name=\"apple-mobile-web-app-title\" content=\"Booking\">\n\n    <link rel=\"stylesheet\" href=\"components.css\">\n\n    <script src=\"app.js\"></script>\n    <script src=\"templates.js\"></script>\n  </head>\n\n  <body>\n    \n    <div ng-show=\"loading\" class=\"throbber\">\n      <i class=\"fa fa-spinner fa-spin fa-5x\"></i>\n    </div>\n\n    <div ui-view></div>\n\n  </body>\n</html>\n");
$templateCache.put("booking/index.html","<nav class=\"navbar navbar-default navbar-fixed-top\">\n  <div class=\"container-fluid\">\n		<a href=\"#\" class=\"navbar-brand\">Hotel {{ hotel.name }}</a>		\n    <ul class=\"nav navbar-nav navbar-right\">\n    	<li>\n    		<a href=\"#\">\n    			<i class=\"fa fa-square event-full\"></i> FULL DAY\n    		</a>\n    	</li>\n    	<li>\n    		<a href=\"#\">\n    			<i class=\"fa fa-square event-half\"></i> HALF DAY\n    		</a>\n    	</li>\n    	<li>\n    		<a href=\"#\">\n    			<i class=\"fa fa-square event-hours\"></i> BY HOURS\n    		</a>\n    	</li>\n    	<li>\n    		<a href=\"#\"><i class=\"fa fa-chevron-left\"></i></a>\n    	</li>\n    	<li>\n    		<a href=\"#\"><i class=\"fa fa-chevron-right\"></i></a>\n    	</li>\n    </ul>\n  </div>\n</nav>\n\n<alert type=\"warning\" ng-if=\"error\">{{ error }}</alert>\n\n<div class=\"container-fluid main\">	\n	<div class=\"row\">\n<!-- 		<aside class=\"col-md-2 sidebar\" ng-include=\"\'components/sidebar.html\'\">			\n		</aside> -->	\n	  <!-- <div id=\"wrapper-grid\" class=\"col-md-10 col-md-offset-2\"> -->\n	  	<div class=\"table-wrapper\">\n	  		<table class=\"booking table table-bordered\">\n	  			<thead>\n	  				<tr>\n	  					<th>#</th>\n	  					<th ng-repeat=\"day in gridPeriod\">{{ day.displayDate }}</th>\n	  				</tr>\n	  			</thead>\n	  			<tbody>\n	  				<tr ng-repeat=\"(roomIndex, room) in hotel.rooms\">\n	  					<th>	  						\n	  						<span class=\"title\">{{ room.name }}</span>\n	  						<h5>${{ room.price }}</h5>\n	  					</th>\n	  					<td ng-repeat=\"(index, day) in gridPeriod\" ng-click=\"showBookingForm(roomIndex, day.timestamp);\">\n	  						<div class=\"bk-date\" style=\"position: relative;\" ng-repeat=\"event in room.info\" ng-if=\"helper.compareDate(event.fromDate, day.timestamp)\">\n	  							<a class=\"bk-event-wrapper {{event.bookingType}}\" href=\"#\" style=\"width: {{ helper.calDistance(event.fromDate, event.toDate)*100 }}%;\">\n	  								<div class=\"bk-event\">\n	  									<span class=\"bk-event-name\">{{event.name}}</span><br>\n	  									<span class=\"bk-event-period\">\n	  										{{ helper.formatDate(event.fromDate) }} - {{helper.formatDate(event.toDate)}}</span>\n	  								</div>\n	  							</a>\n	  						</div>\n	  					</td>\n	  				</tr>\n	  			</tbody>\n		  	</table>\n	  	</div>\n	  <!-- </div> -->\n	</div>\n\n	<div class=\"pop-up\" ng-show=\"flagForm\">\n	  <div class=\"box\">\n	    <a href=\"#\" class=\"close-button\" ng-click=\"flagForm = !flagForm;\">&#10006;</a>\n	    <h3>Reservation</h3>\n	    <form class=\"form-horizontal\" name=\"bookingForm\" ng-submit=\"bookingSubmit(bookingForm)\">\n	      <div class=\"form-group\">\n	        <label for=\"fromDate\" class=\"col-sm-3 control-label\">From Date</label>\n	        <div class=\"col-sm-9\">\n	          <p class=\"input-group\">	        		\n              <input type=\"text\" id=\"fromDate\" class=\"form-control\" datepicker-popup=\"yyyy-MM-dd\" ng-model=\"fromDate\" is-open=\"calfromdate\" min-date=\"minDate\" datepicker-options=\"dateOptions\" date-disabled=\"disabled(date, mode)\" ng-required=\"true\" close-text=\"Close\" placeholder=\"YYYY-mm-dd\"/>\n              <span class=\"input-group-btn\">\n                <button type=\"button\" class=\"btn btn-default\" ng-click=\"open($event, \'calfromdate\')\"><i class=\"fa fa-calendar\"></i></button>\n              </span>\n            </p>\n	        </div>\n	      </div>\n	      <div class=\"form-group\">\n	        <label for=\"toDate\" class=\"col-sm-3 control-label\">End Date</label>\n	        <div class=\"col-sm-9\">\n	        	<p class=\"input-group\">	        		\n              <input type=\"text\" id=\"toDate\" class=\"form-control\" datepicker-popup=\"yyyy-MM-dd\" ng-model=\"toDate\" is-open=\"caltodate\" min-date=\"minDate\" datepicker-options=\"dateOptions\" date-disabled=\"disabled(date, mode)\" ng-required=\"true\" close-text=\"Close\" placeholder=\"YYYY-mm-dd\"/>\n              <span class=\"input-group-btn\">\n                <button type=\"button\" class=\"btn btn-default\" ng-click=\"open($event, \'caltodate\')\"><i class=\"fa fa-calendar\"></i></button>\n              </span>\n            </p>\n	        </div>\n	      </div>\n	      <div class=\"form-group\">\n	        <div class=\"col-sm-9 col-sm-offset-3\">\n	        	<button type=\"reset\" class=\"btn btn-warning\">Reset</button>\n	        	<button type=\"submit\" class=\"btn btn-default\">Submit</button>	        	\n	        </div>\n	      </div>\n	    </form>    \n	  </div>\n	</div>\n\n</div>\n	");
$templateCache.put("components/sidebar.html","<div ng-controller=\"datePickerCtrl\" id=\"datePicker\">\n  <datepicker ng-model=\"dt\" min-date=\"minDate\" show-weeks=\"false\" class=\"well well-sm\"></datepicker>  \n</div>");}]);