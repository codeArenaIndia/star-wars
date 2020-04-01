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

  export function updateCounter(){
    let getCounter = JSON.parse(localStorage.getItem('counter')) || {};
    let timeNow = new Date();
    let username= getCounter.username;
    if(Object.keys(getCounter).length === 0 || getCounter.username.toLowerCase() === 'luke skywalker' ){
      localStorage.setItem('counter',JSON.stringify({"count":1,"time": timeNow.getTime(),'username':username}));
      return true;
    }
    else {
      let timeDiff = getMinutesBetweenDates(getCounter.time,timeNow);
      console.log(timeDiff);
      if(timeDiff > 1){
        localStorage.setItem('counter',JSON.stringify({"count":1,"time": timeNow.getTime(),'username':username}));
      }
      else {
        if(getCounter.count < 17){
          localStorage.setItem('counter',JSON.stringify({"count":getCounter.count+1,"time": timeNow.getTime(),'username':username}));
          return true;
        }
        else{
          return false;
        }
      }
    }
    
  }

  function getMinutesBetweenDates(startDate, endDate) {
    console.log(startDate);
    console.log(endDate);
      var diff = endDate - startDate;
      return (diff / 60000);
  }