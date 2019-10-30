const utils = {
  pause: async function(milliseconds) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, milliseconds);
    })
  }
}

export default utils;