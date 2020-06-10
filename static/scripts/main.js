//Initiate jQuery on load.
$(function() {
  //Translate text with flask route
  $("#translate").on("click", function(e) {
    e.preventDefault();
    var translateVal = document.getElementById("text-to-translate").value;
    var languageVal = document.getElementById("select-language").value;
    var translateRequest = { 'text': translateVal, 'to': languageVal }

    if (translateVal !== "") {
      $.ajax({
        url: '/translate-text',
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        dataType: 'json',
        data: JSON.stringify(translateRequest),
        success: function(data) {
          for (var i = 0; i < data.length; i++) {
            document.getElementById("translation-result").textContent = data[i].translations[0].text;
            //langue 
            switch (data[i].detectedLanguage.language) {
              case 'ar':
                document.getElementById("detected-language-result").textContent ='Arabe';
                break;
                case 'en':
                  document.getElementById("detected-language-result").textContent ='Anglais';
                  break;
                case 'es':
                document.getElementById("detected-language-result").textContent ='Espagnol';
                  break;
                case 'hi':
                document.getElementById("detected-language-result").textContent ='Hindi';
                  break;
                case 'zh-Hans':
                    document.getElementById("detected-language-result").textContent ='Chinois';
                  break;
                default:
                  document.getElementById("detected-language-result").textContent ='Cette langue ne fait pas partie des cinq langues les plus parler.';
            }
            
           
            if (document.getElementById("detected-language-result").textContent !== ""){
              document.getElementById("detected-language").style.display = "block";
            }
            document.getElementById("confidence").textContent = data[i].detectedLanguage.score;
          }
        }
      });
    };
  });
  // In the following sections, you'll add code for sentiment analysis and
  // speech synthesis here.
})