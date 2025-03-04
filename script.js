function calculateGrade() {
    let input = document.getElementById("inputValue").value;
    if (input === "" || input < 0 || input > 128) {
        alert("Please enter a valid number (0-128).");
        return;
    }
    
    let maxScore = input * 4;
    let ranges = [
        { min: 91, max: 100, grade: "A+" },
        { min: 81, max: 90, grade: "A" },
        { min: 71, max: 80, grade: "B+" },
        { min: 61, max: 70, grade: "B" },
        { min: 51, max: 60, grade: "C+" },
        { min: 31, max: 50, grade: "C" }
    ];

    let tableBody = document.getElementById("resultTable");
    tableBody.innerHTML = "";

    let prevMax = maxScore;

    ranges.forEach(range => {
        let minMarks = Math.round((range.min / 100) * maxScore);
        let maxMarks = prevMax;

        let newRow = tableBody.insertRow();
        newRow.innerHTML = `
            <td>${range.min}% to ${range.max}%</td>
            <td>${minMarks} to ${maxMarks}</td>
            <td>${range.grade}</td>
        `;

        prevMax = minMarks - 1;
    });

    // Show PDF download button after table is displayed
    document.getElementById("pdfButton").style.display = "block";
}

function generatePDF() {
    const { jsPDF } = window.jspdf;
    let pdf = new jsPDF("p", "mm", "a4"); // Portrait mode

    let element = document.body; // Capture the entire webpage

    html2canvas(element, {
        scale: 2, // Lower scale to reduce size (previously 3)
        useCORS: true,
        scrollX: 0,
        scrollY: 0,
        windowWidth: document.documentElement.scrollWidth,
        windowHeight: document.documentElement.scrollHeight
    }).then(canvas => {
        let imgData = canvas.toDataURL("image/jpeg", 0.6); // Convert to JPEG with 60% quality

        let imgWidth = 210; // A4 width
        let imgHeight = (canvas.height * imgWidth) / canvas.width;

        if (imgHeight > 297) {
            let pageHeight = 297;
            let yPosition = 0;

            while (yPosition < imgHeight) {
                pdf.addImage(imgData, "JPEG", 0, yPosition * -1, imgWidth, imgHeight);
                yPosition += pageHeight;
                if (yPosition < imgHeight) pdf.addPage();
            }
        } else {
            pdf.addImage(imgData, "JPEG", 0, 0, imgWidth, imgHeight);
        }

        // Add watermark at the bottom
        pdf.setFontSize(14);
        pdf.setTextColor(150, 150, 150);
        pdf.text("© Sugandh Bhadane", 105, imgHeight - 10, { align: "center" });

        pdf.save("compressed_page.pdf");
    });
}
