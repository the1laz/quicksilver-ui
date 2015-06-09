var React = require('react');
var Bootstrap = require('react-bootstrap');
var Switch = require('react-toggle');
var rd3 = require('react-d3');
var LineChart = rd3.LineChart;
var $ = require('jquery');
var settings = require('../../settings.js');
//var Slider = require("react.bootstrap.slidertest");
//console.log(new Slider());
//var s = new Slider();
//    		<Slider polyfill={false} max={400} handleChange={this.handleUpdate2} onClick={this.handleUpdate}/>
//
var Widget = 
{

	Button: React.createClass({
		handleUpdate:function(value){
			var widgetvalue = (Array.isArray(this.props.widgetvalue)) ? this.props.widgetvalue[0] : this.props.widgetvalue;
			console.log(widgetvalue);
			this.props.handleUpdate(widgetvalue);
		},
		  render:function(){

		    return (<div className='ui-widget'>
		    	<Bootstrap.Button bsStyle='primary' onClick={this.handleUpdate}>{this.props.widgetlabel}</Bootstrap.Button>
		    	</div>);

		  }
		}),
	Text: React.createClass({
		  render:function(){
		  	//console.log(this.props.value);
		    return (<div className='ui-widget'>
		    	<div className='ui-text'>
		    	<h5>{this.props.value.toString()}</h5>
		    	</div></div>);
		  }
		}),
	Link: React.createClass({
		  render:function(){
		    return (<div className='ui-widget'>
		    	<a target="_blank" href={this.props.value}><h5>{this.props.widgetlabel}</h5></a>
		    	</div>);
		  }
		}),
	Slider: React.createClass({
		handleUpdate:function(value){
			if(this.delayuntilrelease){
				this.props.handleUpdate(value.target.value);	
			}
		},
		delayuntilrelease:true,
		
		  render:function(){
		    return (<div className='ui-widget'>
		    	<Bootstrap.ProgressBar>
		    		<Bootstrap.ProgressBar now={this.props.value} />
		    		</Bootstrap.ProgressBar>
					<input type="range" min="0" max="100" onMouseUp={this.handleUpdate} onTouchEnd={this.handleUpdate} defaultValue={this.props.value}/>
		    		
		    	</div>
		    	);
		  }
		}),
	Switch: React.createClass({
		  handleUpdate:function(event){
		  	
				this.props.handleUpdate(event.target.checked);
			//	this.setState({value:event.target.checked});
		},
		// getInitialState:function(){
		// 	return {value:this.props.value};
		// },

		  render:function(){
		  	
		  	
		    return (<div className='ui-widget'>
		    	<Switch onChange={this.handleUpdate} defaultChecked={this.props.value}/>
		    	</div>);
		  }
		}),
	Flag: React.createClass({
		  handleUpdate:function(event){
		  	
				this.props.handleUpdate(event.target.checked);
			//	this.setState({value:event.target.checked});
		},
		// getInitialState:function(){
		// 	return {value:this.props.value};
		// },

		  render:function(){
		  	
		  	if(this.props.value){
				return (<div className='ui-widget'><div className='ui-flag'>
		    		<h5><span className="glyphicon glyphicon-ok-sign text-success" aria-hidden="true"></span></h5>
		    	</div></div>);
		  	} else {
				return (<div className='ui-widget'><div className='ui-flag'>
		    		<h5><span className="glyphicon glyphicon-remove-sign text-danger" aria-hidden="true"></span></h5>
		    	</div></div>);
		  	}

		  }
		}),
		Chart: React.createClass({

			handleUpdate:function(event){
			 	
			},
			lineData:[
			
			],
			componentDidMount: function() {

			    $.get(settings.historyurl+this.props.thing+'/'+this.props.item+'/?interval=15', function(result) { 
			    	
			      result.forEach(function(e,i,a){

			      	e.x = new Date(e.x);
			      })
			      this.lineData = [{name:this.props.label,values:result}];
			      this.forceUpdate();

			    }.bind(this));
			    
			},

			render:function(){
			  	
				return(
					<div className='ui-bigwidget'>
						<LineChart 
							legend={true}
							data={this.lineData}
			  				width={600}
			  				height={300}
			  				title=""
			  				 
						/>
					</div>
				);

		  	}
		})


}

module.exports = Widget;