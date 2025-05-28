document.addEventListener("DOMContentLoaded", renderFooter());
function renderFooter() {
    document.getElementById("footer").innerHTML = `
      <div class="row justify-content-center text-sm-center fs-6 p-4 border-bottom text-secondary bg-body-secondary">
        <div class="col-md-12 ps-sm-5 col-lg-3 ">
        <span class="text-black">call us now </span>
        <br>
          <img src="../assets/img/call_28dp_666666_FILL0_wght0_GRAD0_opsz48.png" alt="">
          <a class="link-secondary link-underline link-underline-opacity-0" href="tel:+962786544234">+962 786 544234</a>
        </div>
        <div class="col-md-12 ps-sm-5 col-lg-3 ">
        <span class="text-black">need support?</span>
        <br>
          <img src="../assets/img/mail_28dp_666666_FILL0_wght100_GRAD200_opsz48.png" alt="">
          <a class="link-secondary link-underline link-underline-opacity-0" href="mailto:info@khabirk.com">info@khabirk.com</a>   
        </div>
        <div class="col-md-12 ps-sm-5 col-lg-3 ">
        <span class="text-black">want to join us ?</span>
        <br>
          <img src="../assets/img/mail_28dp_666666_FILL0_wght100_GRAD200_opsz48.png" alt="">
          <a class="link-secondary link-underline link-underline-opacity-0" href="mailto:info@khabirk.com">joinus@khabirk.com</a>   
        </div>
    </div> 
    
    `;
}