const extractPages = (page) =>{
    if(page && page !== null){
        var url = new URL(page);
        return url.searchParams.get('page');
    }else {
        return null;
    }
}

export const generateRandom = () => {
  return Math.floor(Math.random() * 3);
 }


export const handleNavigationHelper = target => {
    var val = extractPages(target.getAttribute("data-nav"));
    if(val && val !== null){
        return val;
    }
  }

export function debounce(func, wait, immediate) {
    var timeout;
    return function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  };
