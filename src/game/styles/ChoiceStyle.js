var ChoiceStyle = {
	"Base": {
		"display": "inline-block",
		"backgroundColor": "#4081a7",
		"color": "white",
		"width": "150px",
		"height":"60px",
		"textAlign": "center",
		"fontFamily": "sans-serif",
		"cursor": "-webkit-grab",
		"fontSize": "12px",
		"margin": "0 0 15px 0",
		zIndex: 2
	},
	"Clicking": {
		"backgroundColor":"pink",
		"width": "100px",
		"height":"60px",
		"textAlign": "center",
		"fontFamily": "sans-serif",
		"transform": "rotate(-2deg)",
		"cursor": "-webkit-grabbing",
		"position": "absolute"
	},
  "Dropped": {
    "display": "inline-block",
    "backgroundColor": "seagreen",
    "width": "100px",
    "height":"60px",
    "textAlign": "center",
    "fontFamily": "sans-serif",
    "cursor": "-webkit-grab",
    "width": "100%",
    "margin": "0 0 15px 0",
    zIndex: 2
  },
	"Correct": {
    "display": "inline-block",
    "backgroundColor": "#2dca72",
    "width": "100px",
    "textAlign": "center",
    "fontFamily": "sans-serif",
    "fontSize": "13px",
    "width": "100%",
    "margin": "0 0 15px 0",
    "padding": "8px 4px",
    "minHeight": "60px",
    zIndex: 2
  },
	"Incorrect": {
    "display": "inline-block",
    "backgroundColor": "#f95e56",
    "width": "100px",
    "textAlign": "center",
    "fontFamily": "sans-serif",
    "fontSize": "12px",
    "width": "100%",
    "margin": "0 0 15px 0",
    "padding": "8px 4px",
    "minHeight": "60px",
    zIndex: 2
  }
};

module.exports = ChoiceStyle;
