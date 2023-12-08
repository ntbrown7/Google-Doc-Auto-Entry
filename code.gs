function onOpen() {
  var ui = DocumentApp.getUi();
  ui.createMenu('Custom Menu')
    .addItem('Replace and Export as PDF', 'replaceAndExportAsPDF')
    .addToUi();
}

function replaceAndExportAsPDF() {
  var originalDoc = DocumentApp.getActiveDocument();
  var originalId = originalDoc.getId();

  // Prompt user for input
  var ui = DocumentApp.getUi();
  var response = ui.prompt('Enter the word to replace "_" with:', ui.ButtonSet.OK_CANCEL);

  if (response.getSelectedButton() == ui.Button.OK) {
    var replaceWord = response.getResponseText();

    // Create a temporary copy of the document
    var tempFile = DriveApp.getFileById(originalId).makeCopy();
    var tempDoc = DocumentApp.openById(tempFile.getId());
    var tempBody = tempDoc.getBody();

    // Replace all occurrences of "_" in the temporary document
    replaceTextInBody(tempBody, '_', replaceWord);

    // Save and close the temporary document to ensure changes are applied
    tempDoc.saveAndClose();

    // Reopen the temporary document to check if all replacements are done
    tempDoc = DocumentApp.openById(tempFile.getId());
    tempBody = tempDoc.getBody();

    // Check if there are any "_" left to replace
    if (tempBody.findText("_") === null) {
      // If no "_" left, export the document as PDF
      exportAsPDF(tempDoc, tempFile);
    } else {
      // If there are still "_" to replace, show an error message
      ui.alert('Error: Not all instances of "_" were replaced.');
    }

    // Delete the temporary document
    tempFile.setTrashed(true);
  }
}
function replaceTextInBody(body, searchText, replaceText) {
  var foundElement = body.findText(searchText);
  while (foundElement != null) {
    var startOffset = foundElement.getStartOffset();
    var endOffset = foundElement.getEndOffsetInclusive();
    var text = foundElement.getElement().asText();

    text.deleteText(startOffset, endOffset);
    text.insertText(startOffset, replaceText);

    foundElement = body.findText(searchText, foundElement);
  }
}
function exportAsPDF(doc) {
  var docId = doc.getId();
  var docName = doc.getName();
  var pdfBlob = DriveApp.getFileById(docId).getAs("application/pdf");
  var pdfFile = DriveApp.createFile(pdfBlob).setName(docName + ".pdf");

  // Show a message with the link to the PDF file
  var ui = DocumentApp.getUi();
  ui.alert('PDF created: ' + pdfFile.getUrl());
}
