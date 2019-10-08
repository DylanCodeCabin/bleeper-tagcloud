# bleeper-tagcloud
Simple Tag Cloud Generator

![alt text](https://user-images.githubusercontent.com/16894783/66382688-f5974b00-e9bb-11e9-932c-753148b0b4e8.png)

Initialized as follows: 

```
<div id='tag_cloud_container'></div>

<link rel="stylesheet" type="text/css" href="bleeper_tagcloud.css">

<script src='bleeper_tagcloud.js'></script>
<script>
	var sample_data = {
		'chat' : 5,
		'support' : 3,
		'help' : 7,
		'documentation' : 2,
		'pricing' : 22,
		'pro' : 5,
		'maps' : 12,
		'regulations' : 5,
		'GDPR' : 2,
		'download' : 8
	}

	var blp_tag_cloud = new BleeperTagCloud('#tag_cloud_container', sample_data);
</script>
```

Default options which can be altered: 
```
var options = {
			font_scaling : true,
			weight_scaling : false,
			opacity_scaling : true,
			show_tooltip : true,
			full_opacity_on_hover : true,
			max_font_size : 70,
			min_font_size : false,
			hover_font_size : false,
			min_opacity : 0.2,
			tag_padding : 5,
			max_words_per_line : 5,
			custom_item_class : false
};
```

As an example, you could disable tooltips as follows:
```
var blp_tag_cloud = new BleeperTagCloud('#tag_cloud_container', sample_data, {show_tooltip : false});
```
