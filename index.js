document.addEventListener("DOMContentLoaded", function () {
  var form = document.getElementById("form");
  var editBtn = document.getElementById("edit-btn");
  var downloadBtn = document.getElementById("download-pdf");
  var generateUrlBtn = document.getElementById("generate-url");
  var resumeSection = document.getElementById("resume-content");
  var isEditing = false;
  form.addEventListener("submit", function (event) {
    var _a;
    event.preventDefault();
    // Get data from form
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var education = document.getElementById("education").value;
    var experience = document.getElementById("experience").value;
    var skills = document.getElementById("skills").value.split(",");
    var profilePic =
      (_a = document.getElementById("profile-pic").files) === null ||
      _a === void 0
        ? void 0
        : _a[0];
    // Generate resume
    if (resumeSection) {
      var reader_1 = new FileReader();
      reader_1.onloadend = function () {
        resumeSection.innerHTML = '\n                    <img src="'
          .concat(
            reader_1.result,
            '" alt="Profile Picture">\n                    <h2>'
          )
          .concat(
            name,
            '\'s Resume</h2><hr>\n                    <p class="editable" contenteditable="false">Email: '
          )
          .concat(
            email,
            '</p><hr>\n                    <h3>Education</h3>\n                    <p class="editable" contenteditable="false">'
          )
          .concat(
            education,
            '</p><hr>\n                    <h3>Work Experience</h3>\n                    <p class="editable" contenteditable="false">'
          )
          .concat(
            experience,
            "</p><hr>\n                    <h3>Skills</h3>\n                    <ul>\n                        "
          )
          .concat(
            skills
              .map(function (skill) {
                return '<li class="editable" contenteditable="false">'.concat(
                  skill.trim(),
                  "</li>"
                );
              })
              .join(""),
            "\n                    </ul>\n                "
          );
      };
      if (profilePic) {
        reader_1.readAsDataURL(profilePic);
      }
    }
  });
  if (editBtn) {
    editBtn.addEventListener("click", function () {
      var editableElements = document.querySelectorAll(".editable");
      if (isEditing) {
        // Save changes
        editableElements.forEach(function (element) {
          element.setAttribute("contenteditable", "false");
        });
        editBtn.textContent = "Edit";
      } else {
        // Enable editing
        editableElements.forEach(function (element) {
          element.setAttribute("contenteditable", "true");
        });
        editBtn.textContent = "Save";
      }
      isEditing = !isEditing;
    });
  }
  if (downloadBtn) {
    downloadBtn.addEventListener("click", function () {
      if (resumeSection) {
        var opt = {
          margin: 1,
          filename: "resume.pdf",
          html2canvas: { scale: 2 },
          jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
        };
        html2pdf().from(resumeSection).set(opt).save();
      }
    });
  }
  if (generateUrlBtn) {
    generateUrlBtn.addEventListener("click", function () {
      var url = new URL(window.location.href);
      url.searchParams.set(
        "resume",
        JSON.stringify({
          name: document.getElementById("name").value,
          email: document.getElementById("email").value,
          education: document.getElementById("education").value,
          experience: document.getElementById("experience").value,
          skills: document.getElementById("skills").value.split(","),
        })
      );
      prompt("Copy this URL to share:", url.href);
    });
  }
});
