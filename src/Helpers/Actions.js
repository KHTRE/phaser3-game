export function moveElementBy(element, moveX, moveY, seconds) {
  return new Promise((res) => {
    let iterations = Math.ceil(seconds * 1000 / 16);
    const xStep = moveX / iterations;
    const xEnd = element.x + moveX;
    const yStep = moveY / iterations;
    const yEnd = element.y + moveY;

    const interval = setInterval(()=>{
      element.x += xStep;
      element.y += yStep;
      iterations--;

      if(iterations === 0) {
        element.x = xEnd;
        element.y = yEnd;
        clearInterval(interval);
        res('moveElementBy finished');
      }
    }, 16);
  }) 
}

export function moveElementTo(element, moveToX, moveToY, seconds) {
  return new Promise((res) => {
    let iterations = Math.ceil(seconds * 1000 / 16);
    const xStep = (moveToX - element.x) / iterations;
    const yStep = (moveToY - element.y) / iterations;


    const interval = setInterval(()=>{
      element.x += xStep;
      element.y += yStep;
      iterations--;

      if(iterations === 0) {
        element.x = moveToX;
        element.y = moveToY;
        clearInterval(interval);
        res('moveElementTo finished');
      }
    }, 16);
  }) 
}

export function scaleElementBy(element, scaleBy, seconds) {
  return new Promise((res) => {
    let iterations = Math.ceil(seconds * 1000 / 16);
    const scaleEnd = element.scale * scaleBy;
    const scaleStep = (scaleEnd - element.scale) / iterations;
    let currentScale = element.scale

    const interval = setInterval(()=>{
      currentScale += scaleStep;
      element.setScale(currentScale)
      iterations--;

      if(iterations === 0) {
        element.setScale(scaleEnd);
        clearInterval(interval);
        res('scaleElementBy finished');
      }
    }, 16);
  }) 
}


export function fadeElementTo(element, fadeTo, seconds) {
  return new Promise((res) => {
    let iterations = Math.ceil(seconds * 1000 / 16);
    const fadeStep = (fadeTo - element.alpha) / iterations;
    let currentFade = element.alpha

    const interval = setInterval(()=>{
      currentFade += fadeStep;
      element.setAlpha(currentFade)
      iterations--;

      if(iterations === 0) {
        element.setAlpha(fadeTo);
        clearInterval(interval);
        res('fadeElementTo finished');
      }
    }, 16);
  }) 
}

