function redirectToReview() {
    window.location.href = "reviewindex.ejs";
  }
  
  document.getElementById("review-button").addEventListener("click", redirectToReview);