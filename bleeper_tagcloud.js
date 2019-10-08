/**
 * Bleeper TagCloud System
 * Generates very simple tag clouds
*/
class BleeperTagCloud{
	constructor(target, data, options){
		this.target = target;
		this.data = data;

		this.options = this.configure(options)

		this.prepare();
	}

	configure(overrides){
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

		if(typeof overrides === 'object'){
			for(var i in overrides){
				if(typeof options[i] !== 'undefined'){
					options[i] = overrides[i];
				}
			}
		}

		return options;
	}

	prepare(){
		if(typeof this.data === 'object'){
			var element = document.querySelector(this.target);
			if(element !== null){
				this.element = element;

				var largestCount = 0;
				for(var i in this.data){
					this.data[i] = parseInt(this.data[i]);
					if(this.data[i] > largestCount){
						largestCount = this.data[i];
					}
				}

				this.fontStep = parseInt(this.options.max_font_size / largestCount);
				this.weightStep = parseInt(1000 / largestCount);
				this.opacityStep = 1.0 / largestCount;

				this.populate();
			} else {
				this.error('Could not find element');
			}
		} else {
			this.error('Data must be typeof "object"');
		}
	}

	populate(){
		var html = "";
		var counter = 0;
		for(var i in this.data){
			var styles = this.generateStyles(this.data[i]);
			var tooltip = this.generateTooltip(this.data[i]);
			var custom_class = this.generateCustomClassNames();

			html += "<span class='blp_tagcloud_item" + custom_class + "' style='" + styles + "'>" + i + tooltip + "</span>";
			
			counter++;

			if(this.options.max_words_per_line !== false && counter >= this.options.max_words_per_line){
				html += "<br>";
				counter = 0;
			}
		}

		if(html !== ""){
			this.element.innerHTML = html;
			this.bindEvents();
		} else {
		 	this.error('Could not render cloud');
		}
	}

	generateStyles(count){
		var styleConfig = {
			padding: this.options.tag_padding + "px",
			cursor : 'pointer'
		}

		if(this.options.font_scaling){
			var fontSize = this.fontStep * count;
			if(this.options.min_font_size !== false && fontSize < this.options.min_font_size){
				fontSize = this.options.min_font_size;
			}

			styleConfig.font_size = fontSize + "px";
		}

		if(this.options.weight_scaling){
			styleConfig.font_weight = this.weightStep * count;
		}

		if(this.options.opacity_scaling){
			styleConfig.opacity = this.opacityStep * count;
			if(styleConfig.opacity < this.options.min_opacity){
				styleConfig.opacity = this.options.min_opacity;
			}
		}

		var styles = "";
		for(var i in styleConfig){
			styles += i.replace("_", "-") + ": " + styleConfig[i] + ";";
		}

		return styles;
	}

	generateTooltip(count){
		if(this.options.show_tooltip){
			return "<span class='blp_tagcloud_tooltip'>" + count + "</span>";
		}
		return "";
	}

	generateCustomClassNames(){
		var output = "";
		if(this.options.custom_item_class !== false){
			if(typeof this.options.custom_item_class === 'object'){
				for(var i in this.options.custom_item_class){
					var c = this.options.custom_item_class[i];
					if(typeof c === 'string'){
						output += " " + c.replace('.', '').replace('#', '');
					}
				}
			} else if (typeof this.options.custom_item_class === 'string'){
				if(typeof this.options.custom_item_class === 'string'){
					output += " " + this.options.custom_item_class.replace('.', '').replace('#', '');
				} 
			}
		}
		return output;
	}

	bindEvents(){
		var self = this;
		var items = document.querySelectorAll('.blp_tagcloud_item');
		if(items !== null){
			for(var item of items){
				item.addEventListener('mouseover', function(e){
					self.processHover(e);
				});

				item.addEventListener('mouseenter', function(e){
					self.processHover(e);
				});

				item.addEventListener('mouseout', function(e){
					e.target.style.fontSize = e.target.getAttribute('data-original-font-size');

					if(self.options.full_opacity_on_hover){
						e.target.style.opacity = e.target.getAttribute('data-original-opacity');
					}

					e.target.setAttribute('data-hover', 'false');
				});
			}
		}
	}

	processHover(e){
		if( e.target.getAttribute('data-hover') === 'true'){
			return;
		}

		e.target.setAttribute('data-original-font-size', e.target.style.fontSize);
		
		var multipliedSize = parseInt( parseInt(e.target.style.fontSize) * 2.5 );
		multipliedSize = multipliedSize > this.options.max_font_size ? this.options.max_font_size : multipliedSize;
		e.target.style.fontSize = (this.options.hover_font_size !== false ? this.options.hover_font_size : multipliedSize) + 'px';

		if(this.options.full_opacity_on_hover){
			e.target.setAttribute('data-original-opacity', e.target.style.opacity);
			e.target.style.opacity = 1;
		}

		e.target.setAttribute('data-hover', 'true');
	}

	error(message){
		console.error("Bleeper TagCloud: " + message);
	}
}