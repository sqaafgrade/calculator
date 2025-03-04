function findGrade() {
    let totalMarksInput = document.getElementById("totalMarks").value;
    let obtainedMarksInput = document.getElementById("obtainedMarks").value;
    let resultElement = document.getElementById("gradeResult");

    // Validate input
    if (totalMarksInput === "" || obtainedMarksInput === "" || totalMarksInput <= 0 || totalMarksInput > 128) {
        alert("कृपया वैध संख्या प्रविष्ट करा (Max 128)");
        return;
    }

    let maxScore = totalMarksInput * 4; // Calculate total max marks
    let obtainedMarks = parseInt(obtainedMarksInput);

    let percentage = (obtainedMarks / maxScore) * 100;

    let grade;
    if (percentage >= 91) {
        grade = "A+";
    } else if (percentage >= 81) {
        grade = "A";
    } else if (percentage >= 71) {
        grade = "B+";
    } else if (percentage >= 61) {
        grade = "B";
    } else if (percentage >= 51) {
        grade = "C+";
    } else {
        grade = "C";
    }

    resultElement.innerHTML = `तुमची श्रेणी: <strong>${grade}</strong>`;
}
