# Google-Doc-Auto-Entry
Replaces all "_" with whatever the user wants. Great for reusing forms and thank you letters. 

This Google Apps Script provides functionality to replace a specific word in a Google Document and export the resulting document as a PDF. It adds a custom menu to the Google Docs UI for easy access.

## Features

- **Custom Menu Integration**: Easily accessible through a custom menu in Google Docs.
- **Word Replacement**: Prompts the user to replace all instances of a specific word.
- **PDF Export**: Exports the modified document as a PDF file.

## Usage

1. **Open a Google Document**: This script is intended to be used within Google Docs.
2. **Access Custom Menu**: A new menu item titled 'Custom Menu' will appear in the document's menu bar.
3. **Replace and Export**: Select 'Replace and Export as PDF' from the custom menu and follow the on-screen instructions.

## Functions

- `onOpen()`: Creates the custom menu in the Google Docs UI.
- `replaceAndExportAsPDF()`: Handles the process of replacing text and exporting the document as a PDF.
- `replaceTextInBody(body, searchText, replaceText)`: Utility function to replace all occurrences of a word in the document body.
- `exportAsPDF(doc)`: Converts the modified document into a PDF file and provides a link to the file.

## Installation

To install this script:
1. Open your Google Document.
2. Go to `Extensions > Apps Script`.
3. Copy and paste the provided script into the script editor.
4. Save and close the script editor.
5. Reload your Google Document to see the custom menu.

## Notes

- This script requires permission to access and modify your Google Docs and Drive.
- Ensure that the document does not contain the replacement word before using the export feature to avoid errors.

## Author

- Nathan Brown
