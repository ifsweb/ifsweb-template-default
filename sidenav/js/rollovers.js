/**
 * Unobtrusive Image Rollovers
 * By: Paul McLanahan <paul dot mclanahan at digital insight>
 * Usage: Include this script in the head of the HTML document with a <script>
 *        and include the class "rollover" on any link tag with an image as its only child.
 */
var Roll = {
    
    imgObjects: [],
    
    initRollovers: function(){
        if(!document.getElementsByTagName)return;
        all_links = document.getElementsByTagName('a');
        for(var i = 0; i < all_links.length; i++){
            var linkObj = all_links[i]; 
            if (linkObj.className && (' ' + linkObj.className + ' ').indexOf(' rollover ') != -1){
                if (linkObj.childNodes && 
                    linkObj.childNodes.length == 1 && 
                    linkObj.childNodes[0].nodeName.toLowerCase() == 'img' &&
                    /_off\.[a-z]{3}$/.test(linkObj.childNodes[0].src)){
                    // preload rollover images
                    Roll.imgObjects[Roll.imgObjects.length] = new Image();
                    Roll.imgObjects[Roll.imgObjects.length-1].src = linkObj.childNodes[0].src.replace(/_off(\.[^.]{3})$/,"_on$1");
                    
                    // add mouseover and mouseout event handlers to links
                    diLib.addEvent(linkObj,'mouseover',Roll.imgOn,false);
                    diLib.addEvent(linkObj,'mouseout',Roll.imgOff,false);
                }
            }
        }
    },
    
    imgOn: function(e){
        linkObj = diLib.getTarget(e,'a');
        if(!linkObj)return;
        linkObj.childNodes[0].src = linkObj.childNodes[0].src.replace(/_off(\.[a-z]{3})$/,"_on$1");
    },
    
    imgOff: function(e){
        linkObj = diLib.getTarget(e,'a');
        if(!linkObj)return;
        linkObj.childNodes[0].src = linkObj.childNodes[0].src.replace(/_on(\.[a-z]{3})$/,"_off$1");
    }
    
}

/**
 * diLib: Object containing helper functions
 * by: Paul McLanahan <paul dot mclanahan at digital insight>
 */
var diLib = {
	getTarget: function(e,tag){
        tag = tag.toLowerCase();
        
        // Get the object that fired the event
	    var t = window.event ? window.event.srcElement : e ? e.target : null;
	    if(!t) return;
        
        // Climb the DOM untill we find the object we're looking for
		while(t != document.body && t.nodeName.toLowerCase() != tag)
			t = t.parentNode;
		
        // Make sure it is the one we're looking for
		if(t.nodeName.toLowerCase() != tag)
			return null;

		return t;
	},
    /**
     * Cross-browser event handling for IE5+ (Win & Mac), NS6+ and Mozilla/Gecko
     * By Scott Andrew
     */
    addEvent: function(obj, evType, fn, useCapture) {
        if (obj.addEventListener) {
            obj.addEventListener(evType, fn, useCapture);
            return true;
        } else if (obj.attachEvent) {
            var r = obj.attachEvent('on' + evType, fn);
            return r;
        } else {
            obj['on' + evType] = fn;
        }
    }
}

// have the rollovers initialize on page load
diLib.addEvent(window,'load',Roll.initRollovers,false);