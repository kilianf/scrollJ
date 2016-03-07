(function($){
  
  $(document).ready(function(){
  
    // Store all of the data-atts and functions to run in an array
    var items = []
  
    // Push the array to items[]
    function creator(item, funcs) {
      items.push(new Array(item, funcs))
    }
    
    // Create some example of different elements to search for and functions to run
    // TODO: Do this outside of the IIFE
    creator('[data-scrollj]', { in : "consoler", out: "outsoler" });
    creator('[data-scrollk]', { in : "inner", out: "outer" });

    // The meaty part
    function scroller(el, obj){
       var scrollEl = $(el),
           funcin = obj.in ? obj.in : null,  
           funcout = obj.out ? obj.out : null,  
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
  
})(jQuery)


