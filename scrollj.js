(function($){
  
  $(document).ready(function(){
  
    // Store all of the data-atts and functions to run in an array
    var items = []
  
    // Push the array to items[]
    function creator(item, funcs) {
      items.push(new Array(item, funcs))
    }
    
    creator('[data-scrollj]', { in : "consoler", out: "outsoler" });
    creator('[data-scrollk]', { in : "inner", out: "outer" });
    
    function consolate(){
      console.log("tim")
    }
    
    
    // The meaty part
    function scroller(el, obj){
       var scrollEl = $(el)   
       var funcin = obj.in ? obj.in : null;   
       var funcout = obj.out ? obj.out : null;  
       var fnin = window[funcin]; 
       var fnout = window[funcout]; 
  
       var scrollIndex = window.pageYOffset; 
       scrollEl.each(function(){
           if( (this.offsetTop + this.clientHeight) > scrollIndex && (scrollIndex + window.innerHeight) > (this.offsetTop) ) {
             if( !$(this).hasClass('active') ) {
               if (typeof fnin === "function") fnin();
             }
             $(this).addClass('active')         
           } else {
             if( $(this).hasClass('active') ) {
               if (typeof fnout === "function") fnout();
             }
             $(this).removeClass('active')
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
  
  })
  
})(jQuery)


