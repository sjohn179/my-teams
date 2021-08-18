const moment = require('moment-timezone');

let date, dayOfWeek, dayOfMonth, month, year, hour, minute, second, tod, tzOffset, timeZone;
    
    const daysArray = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    const monthsArray = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
    // const [date, setDate] = useState(new Date());
    
//    const [renderDate, setRenderDate] = useState('');

    
    const getDayOfWeek = (dayOfWeek) => {
        let dayOfWeekTxt = daysArray[dayOfWeek];
        // console.log(dayOfWeek);
        // console.log(dayOfWeekTxt);
        return dayOfWeekTxt;
    }

    const getMonthTxt = (month) => {
        let monthTxt = monthsArray[month];
        // console.log(month);
        // console.log(monthTxt);
        return monthTxt;
    }

    const formatHour = (hour) => {
        let formattedHour;

        if(hour > 12) {
            formattedHour = hour - 12;
        } else if(hour === 0) {
            formattedHour = hour + 12;
        } else {
            formattedHour = hour;
        }

        // console.log(formattedHour);

        return formattedHour;
    }

    const formatMinutes = (minute) => {
        
        if(minute < 10) {
            minute = `0${minute.toString()}`; 
            // console.log(`minute: ${minute}`);
        }

        return minute;
    }

    const formatSeconds = (second) => {

        //second = 9;

        if(second < 10) {
            second = `0${second.toString()}`;
        }

         
          // console.log(`second: ${second}`);

        return second;
    }

    

    const getReturnedDate = () => {
        
            
            date = new Date();
        

            dayOfWeek = date.getDay();
            month = date.getMonth();
            dayOfMonth = date.getDate();
            year = date.getFullYear();
            hour = date.getHours();
            minute = date.getMinutes();
            second = date.getSeconds();
            tzOffset = date.getTimezoneOffset();
            timeZone = moment.tz.guess();

            if(hour >= 12) {
                tod = 'PM';
            } else {
                tod = 'AM';
            }

    
            dayOfWeek = getDayOfWeek(dayOfWeek);
            month = getMonthTxt(month);
            hour = formatHour(hour);
            minute = formatMinutes(minute);
            second = formatSeconds(second);
            tzOffset = moment.tz.zone(timeZone).abbr(tzOffset);
    
            // console.log(`${dayOfWeek} ${month} ${dayOfMonth}, ${year} ${hour}:${minute}:${second} ${tod}`)

             
                 

            // console.log(date);
            // console.log(tzOffset);
        

        

        date = `Local Time: ${dayOfWeek} ${month} ${dayOfMonth}, ${year} ${hour}:${minute} ${tod} (${tzOffset})`;

        // console.log(`newDate: ${date}`);
        //    // console.log(`this.second: ${second}`);

        /*return <p>
        {dayOfWeek} {month} {dayOfMonth}, {year} {hour}:{minute}:{second} {tod}</p>
        */


        return date;
    }

    

    /*useEffect(() => {
        setInterval(() => {
            getReturnedDate();
            setRenderDate(date);
        },1000);
        
    }, [renderDate])*/

    console.log(getReturnedDate());

    const thisDate = () => {
        let newNewDate = getReturnedDate();

        /*setInterval(() => {
            newNewDate = getReturnedDate();
            console.log(`currDate.thisDate: ${newNewDate}`);

            return newNewDate;
        }, 1000)*/


        return newNewDate;
    };

     // console.log(`currDate.thisDate: ${thisDate()}`);

    module.exports = {
        getReturnedDate: getReturnedDate,
        thisDate: thisDate
    };
