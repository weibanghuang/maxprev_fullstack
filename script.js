let workouts = JSON.parse(localStorage.getItem("workouts")) || [];
let maxPrev = [];
let local_name = JSON.parse(localStorage.getItem("local_name")) || "";
let local_rep = JSON.parse(localStorage.getItem("local_rep")) || "";
let local_weight = JSON.parse(localStorage.getItem("local_weight")) || "";
updateWorkout();
document.getElementById("local_name").value = local_name;  
document.getElementById("local_rep").value = local_rep;  
document.getElementById("local_weight").value = local_weight;   

function saveValue(e){
    const name = e.id;  
    const val = e.value; 
    localStorage.setItem(name, JSON.stringify(val));
  }

function saveLocalValue(a,b,c){
  localStorage.setItem("local_name", JSON.stringify(a));
  localStorage.setItem("local_rep", JSON.stringify(b));
  localStorage.setItem("local_weight", JSON.stringify(c));
}
document.querySelector('.workout_button')
  .addEventListener('click', () => {
    addWorkout();
  });

document.querySelector('.clear_button')
.addEventListener('click', () => {
  clearWorkout();
  
  });

function delete_all_data(){
  if (confirm("Delete all local data?")){
    workouts = [];
    maxPrev = [];
    updateWorkout();
  }
}

function double_format(a){
    if (a.toString().length == 1) {
        a = "0" + a;
    }
    return a;
}

function toTitleCase(str) {
  return str.replace(/\w\S*/g, function(txt){
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

function addWorkout(){
    const name = document.querySelector('.name').value.trim();
    const rep = document.querySelector('.rep').value.trim();
    const weight = document.querySelector('.weight').value.trim();
    const today = new Date();

    //yyyymmdd complete
    const year = double_format(today.getFullYear());
    const month = double_format(today.getMonth()+1);
    const day = double_format(today.getDate());

    const date = year+''+month+''+day;

    //hhmmss 24 hr complete
    const hour = double_format(today.getHours());
    const minute = double_format(today.getMinutes());
    const second = double_format(today.getSeconds());

    const time = hour + "" + minute + "" + second;

    workouts.push([date,time,name,rep,weight]);
    updateWorkout();
}

function clearWorkout(){
  document.querySelector('.name').value =  '';
  document.querySelector('.rep').value = '';
  document.querySelector('.weight').value = '';
  saveLocalValue("","","");
}

function updateWorkout(){
    let workoutHTML = '';
    for (i in workouts) {
      workouts[i][2] = toTitleCase(workouts[i][2].toString());
    } 
    for (let i = workouts.length-1; i >=0; i--) {
      const workoutObject = workouts[i];
      const date = workoutObject[0];
      const year = date.substr(0,4);
      const month = date.substr(4,2);
      const day = date.substr(6,2);
      const today = new Date();
      const year1 = double_format(today.getFullYear());
      const month1 = double_format(today.getMonth()+1);
      const day1 = double_format(today.getDate());
      if (month == month1 && year == year1 && day == day1){
        const time = workoutObject[1];
        let hour = time.substr(0,2);
        let minute = time.substr(2,2);
        let second = time.substr(4,2);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        if (hour >=13){
          hour = hour - 12;
        }else if (hour == 0){
          hour = 12
        }
        const html = `
          <div class="wrap"> 
            <div class="wrap_list">${year+'/'+month+'/'+day}</div>
            <div class="wrap_list">${hour+':'+minute+':'+second+' '+ampm}</div>
            <div class="wrap_list">${workoutObject[2]}</div>
            <div class="wrap_list">${workoutObject[3]} reps</div>
            <div class="wrap_list">${workoutObject[4]} pounds</div>
            <button class="delete_button">X</button>
          </div>
        `;
        workoutHTML += html;
      }
    }

    document.querySelector('.workout_list')
    .innerHTML = workoutHTML;

    localStorage.setItem('workouts',JSON.stringify(workouts));
    
    //static waiting for listen. didnt work before because it was outside of updateWorkout
    document.querySelectorAll('.delete_button')
      .forEach((deleteButton, index) => {
        deleteButton.addEventListener('click', () => {
          workouts.splice(workouts.length-1-index, 1);
          updateWorkout();
        });
    });
}

function export_data(){
  let csvContent = "data:text/csv;charset=utf-8," + workouts.map(e => e.join(",")).join("\n");
  var encodedUri = encodeURI(csvContent);
  window.open(encodedUri);
}

// function read_csv_array(){
// //   var input_file = fileInput.files[0];
// //   console.log(input_file);
//     console.log(document.querySelector('.fileInput').files);
// }

function calculate_maxPrev(){
  maxPrev = [];
  let workouts_copy = [...workouts];
  //change from a[4]-b[4]. from sort by weight to sort by date. 
  workouts_copy.sort((a, b) => ((b[0]+''+b[1])-(a[0]+''+a[1])));
  for (let i = 0; i <workouts_copy.length; i++) {
    if (!exists(maxPrev,workouts_copy[i][2])){
      maxPrev.push([workouts_copy[i][2],workouts_copy[i][3],workouts_copy[i][4]]);
    }
  }
  maxPrev.sort((a, b) => (a[0].localeCompare(b[0])));
}

function exists(arr, search) {
  return arr.some(row => row.includes(search));
}

function view_stats(){
  if (document.querySelector('.render_stats').innerHTML==""){
    let maxPrevHTML = "";
    if (maxPrev.length==0){
      maxPrevHTML = '<div style="margin-bottom:5px; font-size: 16px;">No Data Yet</div>';
      document.querySelector('.render_stats').innerHTML="<div class=\"wtf2\">"+maxPrevHTML+"</div>";
    }else{
      for (i in maxPrev) {
        const maxPrevHTMLpart = `
          <div id ="wrap${i}" class = "wrap">
            <div>${maxPrev[i][0]}</div>
            <div>${maxPrev[i][1]+" Reps"}</div>
            <div>${maxPrev[i][2]+" Pounds"}</div>
            <button class="duplicate_button">D</button>
          </div>

        `;
        maxPrevHTML += maxPrevHTMLpart+"";
      }
      document.querySelector('.render_stats').innerHTML="<div class=\"wtf2\">"+maxPrevHTML+"</div>";
      document.querySelectorAll('.duplicate_button')
      .forEach((duplicateButton, index) => {
        duplicateButton.addEventListener('click', () => {
          const dup_name = document.getElementById("wrap"+index).children[0].innerHTML;
          const dup_rep = document.getElementById("wrap"+index).children[1].innerHTML;
          const dup_weight = document.getElementById("wrap"+index).children[2].innerHTML;
          document.querySelector('.name').value = dup_name;
          document.querySelector('.rep').value = dup_rep.substring(0,dup_rep.length-5);
          document.querySelector('.weight').value = dup_weight.substring(0,dup_weight.length-7);
          saveLocalValue(
            dup_name,
            dup_rep.substring(0,dup_rep.length-5),
            dup_weight.substring(0,dup_weight.length-7)
          );
        });
      }); 
    }
    
    
  }else{
    document.querySelector('.render_stats').innerHTML='';
  }
}

function toggle_data(){
  if (document.querySelector('.hamburger_button').innerHTML== 'X'){
    document.querySelector('.hamburger_button').innerHTML = 'H';
    document.querySelector('.pop_up').innerHTML = "";
  }else{
    //<label for="fileInput" class="input_button">Import Data</label>
    const popup = `
      <div class="button_wrap">
        <input type="file" name="uploadfile" id="fileInput" accept=".csv" class = "input_button"/>
        <label for="fileInput" class="import_button">Import Data</label>
        <div class="export_button">Export Data</div>
        <div class="stats_button">View Max Prev</div>
        <div class="danger_button">Delete</div>
      </div>
    `;
    document.querySelector('.pop_up').innerHTML = popup;
    document.querySelector('.hamburger_button').innerHTML = 'X';
    
    document.querySelector('input')
      .addEventListener('change', () => {
        // this confuses the fuck out of me... so i readAsText, and use an eventlisten to catch the data while reading?
        // this shit is async???
        var reader = new FileReader();
        reader.addEventListener('load', function() {
            // this.result.split("\n").forEach(element=>workouts.push(element.split(",")));
            // this.result.split("\n").forEach(element=>console.log(element.split(",")));
            //2d import array
            let import_array = [];
            this.result.split("\n").forEach(e=>import_array.push([e]));
            // workouts = merge_array(workouts, import_array);
            console.log(import_array);
            workouts.sort((a, b) => (a[0] - b[0]) || (a[1] - b[1]));
            updateWorkout();
          });
        reader.readAsText(document.querySelector('input').files[0]);
        
      });
    
    document.querySelector('.export_button')
      .addEventListener('click', () => {
        export_data();
      });
    document.querySelector('.stats_button')
    .addEventListener('click', () => {
      calculate_maxPrev();
      view_stats();
      });
    document.querySelector('.danger_button')
      .addEventListener('click', () => {
        delete_all_data();
      });
  }
}
document.querySelector('.hamburger_button')
  .addEventListener('click', () => {
    toggle_data();
  });


// DATABASE CONNECTION 

let database_url = "";
function readTextFile(file, callback) {
  var rawFile = new XMLHttpRequest();
  rawFile.overrideMimeType("application/json");
  rawFile.open("GET", file, true);
  rawFile.onreadystatechange = function() {
      if (rawFile.readyState === 4 && rawFile.status == "200") {
          callback(rawFile.responseText);
      }
  }
  rawFile.send(null);
}

function merge_array(a,b){
  if (a==[] && b ==[]){
    return []
  }
  if (a == []){
    return b;
  }
  if (b ==[]){
    return a;
  }
  const
    customSlice = b => b.slice(0,2),
    splice_array = b.map(customSlice);
  let checker = true;
  // splice_array.forEach((splice_element, splice_index) => 
  //   a.forEach((a_element)=>
  //     if (a_element.includes(splice_element[0])&&a_element.includes(splice_element[1])){
  //       checker = false;
  //       break;
  //     }
  //   );
  //   if (checker==true){
  //     a.push(b[splice_index]);
  //   }

  // );
  for (let splice_i = 0; splice_i < splice_array.length; splice_i++){
    for (let a_i = 0; a_i < a.length ; a_i ++){
      if (a[a_i].includes(splice_array[splice_i][0])&&a[a_i].includes(splice_array[splice_i][1])){
        checker = false;
        break;
      }
    }
    if (checker == true){
      a.push(b[splice_i]);
    }else{
      checker = true; 
    }
  }
  return a;
}
//usage:
readTextFile("../url.json", function(text){
  var data = JSON.parse(text);
  database_url = data[0].url;

  async function getResponse() {
    try{
      const response = await fetch(database_url);
      const data = await response.json();
      return await data;
    }catch(error){
      return {};
    }
  }
  
  (async () => {
    const result = await getResponse();
    console.log(result);
  })()
});



