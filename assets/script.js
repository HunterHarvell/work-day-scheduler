console.log("welcome to my scheduler")

// store today's day and date information
// creating event log global object
var event_log;

// creating and formating information on today's date and time
var weekday=new Array(7);
weekday[0]="Sunday";
weekday[1]="Monday";
weekday[2]="Tuesday";
weekday[3]="Wednesday";
weekday[4]="Thursday";
weekday[5]="Friday";
weekday[6]="Saturday";

var d = new Date();
var day = weekday[d.getDay()];

var date_raw = new Date();
var dd = date_raw.getDate(); //yields day
var MM = date_raw.getMonth(); //yields month
var yyyy = date_raw.getFullYear(); //yields year
var date_today=(MM+1)+". "+dd+". "+yyyy;
var day_date='Welcome, Today is '+day+', '+date_today;

// Obtaining the present hour
var present_hour= d.getHours();
console.log("present hr:", present_hour) 


//Displays the current weekday and date on the header

const h2_todays_date=$("<h2 id='p_todays_date'>"+day_date+" </h2>")
h2_todays_date.attr("class", "cover-heading text-dark font-weight-bold  ")

$(".jumbotron").append(h2_todays_date);

// As each event is triggered by clicking the save button, the unique id for each of the buttons can be used as the unique id for event

function match_color_bytime (){
    
    $('textarea').each(function(){
        // Converts the id into an integer and stores it in a variable
        const schedule_hour=parseInt($(this).attr('id'));

        if(schedule_hour===present_hour){
    
            $(this).addClass('present');
        }

        else if(schedule_hour>present_hour) {
        
            $(this).addClass('future');
        }else {
            $(this).addClass('past')
        }
    });
};
    
match_color_bytime();

function local_data(){

    if(localStorage.getItem('event_log') !== null) {

        // Converting local storage back to object form for JS
        event_log=JSON.parse(localStorage.getItem('event_log'));
        $('.textarea').each(function (button_id){

            //Places the text from the local storage into their corresponding time slots
            $(this).val(event_log[button_id]);
        });
    } else {
        // create a new object called event_log
        event_log={};
        // create 9 slots
        for (let i=1;i<=9;i++){
        event_log[i]="";
        }
        console.log(event_log)
    }

} 


local_data();

$('.btn').click(function (e) {
    
    // prevent default saves
    e.preventDefault();
    //gets the value of the text box next to the button that is pressed
    var text_in_box = $(this).parent().prev().val();
    console.dir('dir',$(this).parent().prev())
    console.log('text_in_box:', text_in_box)
    // creates variable for save buttons using their corresponding IDs
    var button_id=$(this).attr('id')
    console.log(button_id, text_in_box)
    
    // ties the event log to the corresponding text using the button ID
    event_log[button_id]=text_in_box
    
    // converts data into a string for JS usage
    localStorage.setItem('event_log', JSON.stringify(event_log));
    console.log( text_in_box, localStorage)
});