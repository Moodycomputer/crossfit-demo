var networkTrigger = $("[data-triggers='network-list']"),
		networkList = $("#network-list");

networkTrigger.click(function(){
	if(networkList.attr('data-state') == 'closed'){
		networkList.attr('data-state', 'open');
	}else{
		networkList.attr('data-state', 'closed');
	}
})