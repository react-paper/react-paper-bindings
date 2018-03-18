module.exports = {
  'Case01': function(browser) {
    browser
      .compareScreenshotForUrls(
        'http://localhost:3000/1/paper',
        'http://localhost:3000/1/react',
        0.01)
      .compareScreenshotForUrls(
        'http://localhost:3000/2/paper',
        'http://localhost:3000/2/react',
        0.01)
      .end()
  }
};
