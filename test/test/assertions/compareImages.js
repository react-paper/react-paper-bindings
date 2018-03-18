var resemble = require('node-resemble-js'),
  fs = require('fs');

function getFileName(filePath) {
 return filePath.replace(/^.*[\\\/]/, '')
}

var diffPath

exports.assertion = function(file1, file2, diffDir, expected) {
  this.message = 'Unexpected compareScreenshot error.';
  this.expected = expected || 0;   // misMatchPercentage tolerance default 0%

  diffPath = `${diffDir}/diff-${getFileName(file1)}-${getFileName(file2)}`

  this.command = function(callback) {
    resemble(file1)
      .compareTo(file2)
      .ignoreAntialiasing()
      .onComplete(callback);  // calls this.value with the result

    return this;
  };

  this.value = function(result) {
    // console.log(result);
    result.getDiffImage().pack().pipe(fs.createWriteStream(diffPath))

    return parseFloat(result.misMatchPercentage, 10);  // value this.pass is called with
  };

  this.pass = function(value) {
    let pass = value <= this.expected;
    if (pass) {
      this.message = `${file1} matches to ${file2} with a tolerance of ${this.expected}%.`
    } else {
      this.message = `${file1} does not match to ${file2} with a tolerance of ${this.expected}%\n` +
        `  Screenshots at:\n` +
        `    File-1: ${file1}\n` +
        `    File-2: ${file2}\n` +
        `    Diff: ${diffPath}\n` +
        `  Open ${diffPath} to see how the screenshot has changed.\n`
    }
    return pass;
  };
};
