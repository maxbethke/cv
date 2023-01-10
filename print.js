const fs = require('fs')
const html_to_pdf = require('html-pdf-node');
const options = { format: 'A4' };

fs.readFile('public/index.html', null, (err, data) => {
    const html = {content: data};
    html_to_pdf.generatePdf(html, options).then(pdfBuffer => {
        fs.writeFile('public/index.pdf', pdfBuffer, null, () => {});
    })
});
