// Create some example of different elements to search for and functions to run
// Examples:
// ScrollJ.creator('[data-scrollj]', { enter : "consoler", exit: "outsoler" });
// ScrollJ.creator('[data-scrollk]', { enter : "inner", exit: "outer" });


var ScrollJ = (function($){
  
  // Store all of the data-atts and functions to run in an array
  var items = []
  
  // Push the array to items[]
  function creator(item, funcs) {
    items.push(new Array(item, funcs))
  }

  $(document).ready(function(){

    // The meaty part
    function scroller(el, obj){
       var scrollEl = $(el),
           funcin = obj.enter ? obj.enter : null,  
           funcout = obj.exit ? obj.exit : null,  
           fnin = window[funcin], 
           fnout = window[funcout], 
           funcIsTrue = typeof fnin === "function" ? true : false,
           scrollIndex = window.pageYOffset; 

       scrollEl.each(function(){
           var hasTheClass = $(this).hasClass('active'),
               $this = $(this);

           if( (this.offsetTop + this.clientHeight) > scrollIndex && (scrollIndex + window.innerHeight) > (this.offsetTop)) {
             if( !hasTheClass && funcIsTrue ) {
              fnin();
             }
             $this.addClass('active')         
           } else {
             if( hasTheClass && funcIsTrue ) {
               fnout();
             }
             $this.removeClass('active')
           }
       });
    }
    
    // Run on scroll
    window.addEventListener('scroll', function(){
      window.requestAnimationFrame(function(){
        for(var i in items) {
          scroller(items[i][0], items[i][1])
        }
      })
    });
    
    // Rerun on resize
    window.addEventListener('resize', function(){
      window.requestAnimationFrame(function(){
        for(var i in items) {
          scroller(items[i][0], items[i][1])
        }
      })
    });
    
    // On load run through everything once
    for(var i in items) {
      scroller(items[i][0], items[i][1])
    }
  
  });

  return {
    creator: creator
  }

  
})(jQuery)


