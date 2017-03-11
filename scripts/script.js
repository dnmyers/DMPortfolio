window.addEventListener("hashchange", function() { scrollBy(0, -40) });
$("body").attr("data-spy", "scroll");
$("body").attr("data-target", ".navbar");
$("body").attr("data-offset", "50");

// following is from modern business template
$(function() {
  $("#contactForm input, #contactForm textarea").jqBootstrapValidation({
    preventSubmit: true,
    submitError: function($form, even, errors) {
      
    },
    submitSuccess: function($form, event) {
      event.preventDefault(); // prevent default submit behavior
      
      // get values from form
      var name = $("input#name").val();
      var phone = $("input#phone").val();
      var email = $("input#email").val();
      var message = $("textarea#message").val();
      
      // for success/failure message
      var firstName = name;
      // check for whitespace in name
      if(firstName.indexOf(' ') >= 0) {
        firstName = nae.split(' ').slice(0, -1).join(' ');
      }
      
      $.ajax({
        url: "./bin/contact_me.php",
        type: "POST",
        data: {
          name: name,
          phone: phone,
          email: email,
          message: message
        },
        cache: false,
        success: function() {
          // Success message
          document.getElementById("successMessage").style.display="block";
          
          // Clear all fields
          $("#contactForm").trigger("reset");
        },
        error: function() {
          // Fail message
          document.getElementById("errorMessage").style.display="block";
        },
      })
    },
    filter: function() {
      return $(this).is(":visible");
    },
  });
  
  $("a[data-toggle=\"tab\"]").click(function(e) {
    e.preventDefault();
    $(this).tab("show");
  });
});

// When clicking on Full hide fail/success boxes
$("#name").focus(function() {
  document.getElementById("successMessage").style.display="none";
  document.getElementById("errorMessage").style.display="none";
});