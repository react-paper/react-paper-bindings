const SAVED_DIR = 'screenshots'

exports.command = function(url1, url2, expected, callback) {
  const self = this
  const urls = [url1, url2]
  let resultPaths = []
  let count = 0
  urls.forEach(url => {
    const filename = url.split('//')[1].replace(/\//g, '-') + '.png'
    const resultPath = `${SAVED_DIR}/${filename}`

    self.url(url)
      .saveScreenshot(resultPath, function(response) {
        count += 1
        if (count === urls.length) {
          self.assert.compareImages(resultPaths[0], resultPaths[1], SAVED_DIR, expected, function (result) {
            if (typeof callback === 'function') {
              callback.call(self, result);
            }
          })
        }
      })

    resultPaths.push(resultPath)
  })

  return this; // allows the command to be chained.
};
