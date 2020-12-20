var files = ["f1.mp4", "f2.mp4"];

var emotionWords = ["Interested", 
                    "Distressed", 
                    "Excited", 
                    "Upset", 
                    "Strong", 
                    "Guilty", 
                    "Scared", 
                    "Hostile",
                    "Enthusiastic", 
                    "Proud"]


let loadMe = {"video_ID":"69.mp4",
             "condition":{"sound":0,"viz":1},
             "rating":"420"
            }


for (let i = 0; i < emotionWords.length; i++) {
    console.log("loopin")
    let item = emotionWords[i];
    $('#wordRating').append(item)
       
}
            
            
function getCheckedValue(name) {
    let radios = document.getElementsByName(name);
    for (var i = 0, length = radios.length; i < length; i++) {
        if (radios[i].checked) {
            // do whatever you want with the checked radio
            alert(radios[i].value);
    
            // only one radio can be logically checked, don't check the rest
            break;
        }
    
}
}