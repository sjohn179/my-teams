const express = require('express');

const router = express.Router();

const { ensureAuthenticated, ensureAuthenticatedDark } = require('../config/auth');

const currDate = require('../currDate.js');

const events = require('events');

const postCSS = require('postcss');
const postCSSNested = require('postcss-nested');
const cssVariables = require('postcss-css-variables');
const injectVariables = require('postcss-inject-css-variables');

const fs = require('fs');

const myCSS = fs.readFileSync("public/style.css","utf-8");

const myEmitter = new events.EventEmitter();

let newDate, output;

 const changeLayout = (theme) => { 
     if(theme === 'light') { 
       console.log('theme changed to light') 

       postCSS([
        cssVariables({
            variables: {
                "--bodyBgColor": "rgb(254,254,254)",
                "--bodyFontColor": "rgb(32,32,32)",
                "--cardBgColor": "rgb(254,254,254)",
                "--linkColor": "rgb(0,144,128)",
                "--linkColorHover": "rgb(0,188,188)",
                "--linkBorderColor": "rgb(88,88,88)",
                "--loginBtnBgColor": "rgb(167,167,167)",
                "--loginBtnBorderColor": "rgb(167,167,167)",
                "--loginBtnFontColor": "rgb(254,254,254)",
                "--lsBtnBgColor": "rgb(8,8,8)",
                "--lsBtnBorderColor": "rgb(16,16,16)",
                "--lsBtnFontColor": "rgb(254,254,254)",
                "--teamFontColor": "rgb(254,254,254)",
                "--teamBgColor": "--rgb(16,16,16)",
                "--footerBgColor": "rgb(16,16,16)",
                "--footerFontColor": "rgb(245,245,245)"
            }
        })
    ]).process(myCSS).css;

/*       
const variables = {
    bodyBgColor: 'rgb(254,254,254)',
    bodyFontColor: 'rgb(32,32,32)',
    cardBgColor: 'rgb(254,254,254)',
    linkColor: 'rgb(0,144,128)',
    linkColorHover: 'rgb(0,188,188)',
    linkBorderColor: 'rgb(88,88,88)',
    loginBtnBgColor: 'rgb(167,167,167)',
    loginBtnBorderColor: 'rgb(167,167,167)',
    loginBtnFontColor: 'rgb(254,254,254)',
    lsBtnBgColor: 'rgb(8,8,8)',
    lsBtnBorderColor: 'rgb(16,16,16)',
    lsBtnFontColor: 'rgb(254,254,254)',
    teamFontColor: 'rgb(254,254,254)',
    teamBgColor: 'rgb(16,16,16)',
    footerBgColor: 'rgb(16,16,16)',
    footerFontColor: 'rgb(245,245,245)'    
  }

        output = postCSS([
            injectVariables(variables)
        ]).process(myCSS).css;

       console.log(`output: ${output}`);*/
     } else if(theme === 'dark') { 
     console.log('theme changed to dark')
     
     postCSS([
        cssVariables({
            variables: {
                "--bodyBgColor": "rgb(32,32,32)",
                "--bodyFontColor": "rgb(245,245,245)",
                "--cardBgColor": "rgb(48,48,48)",
                "--linkColor": "rgb(245,245,245)",
                "--linkColorHover": "rgb(254,254,254)",
                "--linkBorderColor": "rgb(212,212,212)",
                "--loginBtnBgColor": "rgb(212,212,212)",
                "--loginBtnBorderColor": "rgb(192,192,192)",
                "--loginBtnFontColor": "rgb(8,8,8)",
                "--lsBtnBgColor": "rgb(72,72,72)",
                "--lsBtnBorderColor": "rgb(84,84,84)",
                "--lsBtnFontColor": "rgb(254,254,254)",
                "--teamFontColor": "rgb(8,8,8)",
                "--teamBgColor": "--rgb(254,254,254)",
                "--footerBgColor": "rgb(54,54,54)",
                "--footerFontColor": "rgb(254,254,254)"
            }
        })
    ]).process(myCSS).css;
   
    /*
     const variables = {
        bodyBgColor: 'rgb(32,32,32)',
        bodyFontColor: 'rgb(245,245,245)',
        cardBgColor: 'rgb(48,48,48)',
        linkColor: 'rgb(245,245,245)',
        linkColorHover: 'rgb(254,254,254)',
        linkBorderColor: 'rgb(212,212,212)',
        loginBtnBgColor: 'rgb(212,212,212)',
        loginBtnBorderColor: 'rgb(192,192,192)',
        loginBtnFontColor: 'rgb(8,8,8)',
        lsBtnBgColor: 'rgb(72,72,72)',
        lsBtnBorderColor: 'rgb(84,84,84)',
        lsBtnFontColor: 'rgb(254,254,254)',
        teamFontColor: 'rgb(8,8,8)',
        teamBgColor: 'rgb(254,254,254)',
        footerBgColor: 'rgb(54,54,54)',
        footerFontColor: 'rgb(254,254,254)'    
      }

     output = postCSS([
        injectVariables(variables)
    ]).process(myCSS).css;

    console.log(`output: ${output}`);*/
     } 
   } 

// display "welcome" file on the default route
router.get('/', (req, res) => res.render('welcome', {
    changeLayout: changeLayout
}));

// display "welcome" file on the default route
router.get('/_d', (req, res) => res.render('welcomeDark', {
    changeLayout: changeLayout
}));



const currentDate = function(currDate) {
    (currDate) => {
        setInterval(() => {
            console.log(currDate);
            return currDate;
        },1000);
}
}




// display "dashboard" file on the dashboard route
router.get('/dashboard', ensureAuthenticated, (req, res) => res.render('dashboard', {
    name: req.user.name,
    nflTeam: req.user.nflTeam,
    nflTeamURL: (nflTeam) => {
        // nflTeam = 'Los Angeles Chargers';

        nflTeam = nflTeam.toLowerCase();

        nflTeam = nflTeam.replace(/ /g, '-');

        return `https://www.nfl.com/teams/${nflTeam}`;
    },
    nflTeamImg: (nflTeam) => {
        return `/wallpapers/nfl/${nflTeam}.png`;
    },
    //nbaTeam: 'Washington Wizards',
    nbaTeam: req.user.nbaTeam,
    nbaTeamURL: (nbaTeam) => {
        // nflTeam = 'Los Angeles Chargers';

        let nbaNickname, nbaLastIndex;

        nbaTeam = nbaTeam.toLowerCase();

        nbaLastIndex = nbaTeam.lastIndexOf(" ");

        console.log(`NBA last index: ${nbaLastIndex}`);

        if(nbaTeam === 'philadelphia 76ers') {
            nbaNickname = 'sixers';
        } else {
            nbaNickname = nbaTeam.substr(nbaLastIndex+1, nbaTeam.length);
        }

        // nbaTeam = nbaTeam.replace(/ /g, '-');

        return `https://www.nba.com/${nbaNickname}`;
    },
    nbaTeamImg: (nbaTeam) => {
        return `/wallpapers/nfl/${nbaTeam}.png`;
    },
    mlbTeam: req.user.mlbTeam,
    // mlbTeam: 'Washington Nationals',
    mlbTeamURL: (mlbTeam) => {
        // mlbTeam = 'Toronto Blue Jays';

        let mlbNickname, mlbLastIndex;

        if(mlbTeam === 'Toronto Blue Jays') {
            mlbNickname = 'bluejays';
        } else if(mlbTeam === 'Chicago White Sox') {
            mlbNickname = 'whitesox';
        } else if(mlbTeam === 'Boston Red Sox') {
            mlbNickname = 'redsox';
        } else {
            mlbTeam = mlbTeam.toLowerCase();

            mlbLastIndex = mlbTeam.lastIndexOf(" ");

            console.log(`MLB last index: ${mlbLastIndex}`);

            mlbNickname = mlbTeam.substr(mlbLastIndex+1, mlbTeam.length);
        }

        return `https://www.mlb.com/${mlbNickname}`;
    },
    mlbTeamImg: (mlbTeam) => {
        return `/wallpapers/nfl/${mlbTeam}.png`;
    },
    // nhlTeam: 'Winnipeg Jets',
    nhlTeam: req.user.nhlTeam,
    nhlTeamURL: (nhlTeam) => {

        let nhlNickname, nhlLastIndex;

        if(nhlTeam === 'Vegas Golden Knights') {
            nhlNickname = 'goldenknights';
        } else if(nhlTeam === 'Columbus Blue Jackets') {
            nhlNickname = 'bluejackets';
        } else if(nhlTeam === 'Detroit Red Wings') {
            nhlNickname = 'redwings';
        } else if(nhlTeam === 'Toronto Maple Leafs') {
            nhlNickname = 'mapleleafs';
        } else {
            nhlTeam = nhlTeam.toLowerCase();

            nhlLastIndex = nhlTeam.lastIndexOf(" ");

            console.log(`NHL last index: ${nhlLastIndex}`);

            nhlNickname = nhlTeam.substr(nhlLastIndex+1, nhlTeam.length);
        }

        return `https://www.nhl.com/${nhlNickname}`;
    },
    nhlTeamImg: (nhlTeam) => {
        return `/wallpapers/nhl/${nhlTeam}.png`;
    },
    dateNow: currDate.getReturnedDate(),
    thisDate: currDate.thisDate
}));



// display "dashboard" file on the dashboard route (dark)
router.get('/dashboard_d', ensureAuthenticatedDark, (req, res) => res.render('dashboardDark', {
    name: req.user.name,
    nflTeam: req.user.nflTeam,
    nflTeamURL: (nflTeam) => {
        // nflTeam = 'Los Angeles Chargers';

        nflTeam = nflTeam.toLowerCase();

        nflTeam = nflTeam.replace(/ /g, '-');

        return `https://www.nfl.com/teams/${nflTeam}`;
    },
    nflTeamImg: (nflTeam) => {
        return `/wallpapers/nfl/${nflTeam}.png`;
    },
    //nbaTeam: 'Washington Wizards',
    nbaTeam: req.user.nbaTeam,
    nbaTeamURL: (nbaTeam) => {
        // nflTeam = 'Los Angeles Chargers';

        let nbaNickname, nbaLastIndex;

        nbaTeam = nbaTeam.toLowerCase();

        nbaLastIndex = nbaTeam.lastIndexOf(" ");

        console.log(`NBA last index: ${nbaLastIndex}`);

        if(nbaTeam === 'philadelphia 76ers') {
            nbaNickname = 'sixers';
        } else {
            nbaNickname = nbaTeam.substr(nbaLastIndex+1, nbaTeam.length);
        }

        // nbaTeam = nbaTeam.replace(/ /g, '-');

        return `https://www.nba.com/${nbaNickname}`;
    },
    nbaTeamImg: (nbaTeam) => {
        return `/wallpapers/nfl/${nbaTeam}.png`;
    },
    mlbTeam: req.user.mlbTeam,
    // mlbTeam: 'Washington Nationals',
    mlbTeamURL: (mlbTeam) => {
        // mlbTeam = 'Toronto Blue Jays';

        let mlbNickname, mlbLastIndex;

        if(mlbTeam === 'Toronto Blue Jays') {
            mlbNickname = 'bluejays';
        } else if(mlbTeam === 'Chicago White Sox') {
            mlbNickname = 'whitesox';
        } else if(mlbTeam === 'Boston Red Sox') {
            mlbNickname = 'redsox';
        } else {
            mlbTeam = mlbTeam.toLowerCase();

            mlbLastIndex = mlbTeam.lastIndexOf(" ");

            console.log(`MLB last index: ${mlbLastIndex}`);

            mlbNickname = mlbTeam.substr(mlbLastIndex+1, mlbTeam.length);
        }

        return `https://www.mlb.com/${mlbNickname}`;
    },
    mlbTeamImg: (mlbTeam) => {
        return `/wallpapers/nfl/${mlbTeam}.png`;
    },
    // nhlTeam: 'Winnipeg Jets',
    nhlTeam: req.user.nhlTeam,
    nhlTeamURL: (nhlTeam) => {

        let nhlNickname, nhlLastIndex;

        if(nhlTeam === 'Vegas Golden Knights') {
            nhlNickname = 'goldenknights';
        } else if(nhlTeam === 'Columbus Blue Jackets') {
            nhlNickname = 'bluejackets';
        } else if(nhlTeam === 'Detroit Red Wings') {
            nhlNickname = 'redwings';
        } else if(nhlTeam === 'Toronto Maple Leafs') {
            nhlNickname = 'mapleleafs';
        } else {
            nhlTeam = nhlTeam.toLowerCase();

            nhlLastIndex = nhlTeam.lastIndexOf(" ");

            console.log(`NHL last index: ${nhlLastIndex}`);

            nhlNickname = nhlTeam.substr(nhlLastIndex+1, nhlTeam.length);
        }

        return `https://www.nhl.com/${nhlNickname}`;
    },
    nhlTeamImg: (nhlTeam) => {
        return `/wallpapers/nhl/${nhlTeam}.png`;
    },
    dateNow: currDate.getReturnedDate(),
    thisDate: currDate.thisDate
}));


// display "settings" file on the dashboard route
router.get('/users/settings', ensureAuthenticated, (req, res) => res.render('settings', {
    name: req.user.name,
    email: req.user.email,
    password: req.user.password,
    password2: req.user.password2,
    nflTeam: req.user.nflTeam,
    nflTeamURL: (nflTeam) => {
        // nflTeam = 'Los Angeles Chargers';

        console.log(`nflIndex: ${req.user.nflTeam.selectedIndex}`);

        nflTeam = nflTeam.toLowerCase();

        nflTeam = nflTeam.replace(/ /g, '-');

        return `https://www.nfl.com/teams/${nflTeam}`;
    },
    nflTeamImg: (nflTeam) => {
        return `/wallpapers/nfl/${nflTeam}.png`;
    },
    //nbaTeam: 'Washington Wizards',
    nbaTeam: req.user.nbaTeam,
    nbaTeamURL: (nbaTeam) => {
        // nflTeam = 'Los Angeles Chargers';

        let nbaNickname, nbaLastIndex;

        nbaTeam = nbaTeam.toLowerCase();

        nbaLastIndex = nbaTeam.lastIndexOf(" ");

        console.log(`NBA last index: ${nbaLastIndex}`);

        if(nbaTeam === 'philadelphia 76ers') {
            nbaNickname = 'sixers';
        } else {
            nbaNickname = nbaTeam.substr(nbaLastIndex+1, nbaTeam.length);
        }

        // nbaTeam = nbaTeam.replace(/ /g, '-');

        return `https://www.nba.com/${nbaNickname}`;
    },
    nbaTeamImg: (nbaTeam) => {
        return `/wallpapers/nfl/${nbaTeam}.png`;
    },
    mlbTeam: req.user.mlbTeam,
    // mlbTeam: 'Washington Nationals',
    mlbTeamURL: (mlbTeam) => {
        // mlbTeam = 'Toronto Blue Jays';

        let mlbNickname, mlbLastIndex;

        if(mlbTeam === 'Toronto Blue Jays') {
            mlbNickname = 'bluejays';
        } else if(mlbTeam === 'Chicago White Sox') {
            mlbNickname = 'whitesox';
        } else if(mlbTeam === 'Boston Red Sox') {
            mlbNickname = 'redsox';
        } else {
            mlbTeam = mlbTeam.toLowerCase();

            mlbLastIndex = mlbTeam.lastIndexOf(" ");

            console.log(`MLB last index: ${mlbLastIndex}`);

            mlbNickname = mlbTeam.substr(mlbLastIndex+1, mlbTeam.length);
        }

        return `https://www.mlb.com/${mlbNickname}`;
    },
    mlbTeamImg: (mlbTeam) => {
        return `/wallpapers/nfl/${mlbTeam}.png`;
    },
    // nhlTeam: 'Winnipeg Jets',
    nhlTeam: req.user.nhlTeam,
    nhlTeamURL: (nhlTeam) => {

        let nhlNickname, nhlLastIndex;

        if(nhlTeam === 'Vegas Golden Knights') {
            nhlNickname = 'goldenknights';
        } else if(nhlTeam === 'Columbus Blue Jackets') {
            nhlNickname = 'bluejackets';
        } else if(nhlTeam === 'Detroit Red Wings') {
            nhlNickname = 'redwings';
        } else if(nhlTeam === 'Toronto Maple Leafs') {
            nhlNickname = 'mapleleafs';
        } else {
            nhlTeam = nhlTeam.toLowerCase();

            nhlLastIndex = nhlTeam.lastIndexOf(" ");

            console.log(`NHL last index: ${nhlLastIndex}`);

            nhlNickname = nhlTeam.substr(nhlLastIndex+1, nhlTeam.length);
        }

        return `https://www.nhl.com/${nhlNickname}`;
    },
    nhlTeamImg: (nhlTeam) => {
        return `/wallpapers/nhl/${nhlTeam}.png`;
    },
    dateNow: currDate.getReturnedDate(),
    thisDate: currDate.thisDate
}));



// display "dashboard" file on the dashboard route (dark)
router.get('/users/settings_d', ensureAuthenticatedDark, (req, res) => res.render('settingsDark', {
    name: req.user.name,
    email: req.user.email,
    password: req.user.password,
    password2: req.user.password2,
    nflTeam: req.user.nflTeam,
    nflTeamURL: (nflTeam) => {
        // nflTeam = 'Los Angeles Chargers';

        nflTeam = nflTeam.toLowerCase();

        nflTeam = nflTeam.replace(/ /g, '-');

        return `https://www.nfl.com/teams/${nflTeam}`;
    },
    nflTeamImg: (nflTeam) => {
        return `/wallpapers/nfl/${nflTeam}.png`;
    },
    //nbaTeam: 'Washington Wizards',
    nbaTeam: req.user.nbaTeam,
    nbaTeamURL: (nbaTeam) => {
        // nflTeam = 'Los Angeles Chargers';

        let nbaNickname, nbaLastIndex;

        nbaTeam = nbaTeam.toLowerCase();

        nbaLastIndex = nbaTeam.lastIndexOf(" ");

        console.log(`NBA last index: ${nbaLastIndex}`);

        if(nbaTeam === 'philadelphia 76ers') {
            nbaNickname = 'sixers';
        } else {
            nbaNickname = nbaTeam.substr(nbaLastIndex+1, nbaTeam.length);
        }

        // nbaTeam = nbaTeam.replace(/ /g, '-');

        return `https://www.nba.com/${nbaNickname}`;
    },
    nbaTeamImg: (nbaTeam) => {
        return `/wallpapers/nfl/${nbaTeam}.png`;
    },
    mlbTeam: req.user.mlbTeam,
    // mlbTeam: 'Washington Nationals',
    mlbTeamURL: (mlbTeam) => {
        // mlbTeam = 'Toronto Blue Jays';

        let mlbNickname, mlbLastIndex;

        if(mlbTeam === 'Toronto Blue Jays') {
            mlbNickname = 'bluejays';
        } else if(mlbTeam === 'Chicago White Sox') {
            mlbNickname = 'whitesox';
        } else if(mlbTeam === 'Boston Red Sox') {
            mlbNickname = 'redsox';
        } else {
            mlbTeam = mlbTeam.toLowerCase();

            mlbLastIndex = mlbTeam.lastIndexOf(" ");

            console.log(`MLB last index: ${mlbLastIndex}`);

            mlbNickname = mlbTeam.substr(mlbLastIndex+1, mlbTeam.length);
        }

        return `https://www.mlb.com/${mlbNickname}`;
    },
    mlbTeamImg: (mlbTeam) => {
        return `/wallpapers/nfl/${mlbTeam}.png`;
    },
    // nhlTeam: 'Winnipeg Jets',
    nhlTeam: req.user.nhlTeam,
    nhlTeamURL: (nhlTeam) => {

        let nhlNickname, nhlLastIndex;

        if(nhlTeam === 'Vegas Golden Knights') {
            nhlNickname = 'goldenknights';
        } else if(nhlTeam === 'Columbus Blue Jackets') {
            nhlNickname = 'bluejackets';
        } else if(nhlTeam === 'Detroit Red Wings') {
            nhlNickname = 'redwings';
        } else if(nhlTeam === 'Toronto Maple Leafs') {
            nhlNickname = 'mapleleafs';
        } else {
            nhlTeam = nhlTeam.toLowerCase();

            nhlLastIndex = nhlTeam.lastIndexOf(" ");

            console.log(`NHL last index: ${nhlLastIndex}`);

            nhlNickname = nhlTeam.substr(nhlLastIndex+1, nhlTeam.length);
        }

        return `https://www.nhl.com/${nhlNickname}`;
    },
    nhlTeamImg: (nhlTeam) => {
        return `/wallpapers/nhl/${nhlTeam}.png`;
    },
    dateNow: currDate.getReturnedDate(),
    thisDate: currDate.thisDate
}));


// display "settings" file on the dashboard route
router.get('/users/update_password', ensureAuthenticated, (req, res) => res.render('updatePW', {
    name: req.user.name,
    email: req.user.email,
    password: '',
    password2: req.user.password2,
    nflTeam: req.user.nflTeam,
    nflTeamURL: (nflTeam) => {
        // nflTeam = 'Los Angeles Chargers';

        console.log(`nflIndex: ${req.user.nflTeam.selectedIndex}`);

        nflTeam = nflTeam.toLowerCase();

        nflTeam = nflTeam.replace(/ /g, '-');

        return `https://www.nfl.com/teams/${nflTeam}`;
    },
    nflTeamImg: (nflTeam) => {
        return `/wallpapers/nfl/${nflTeam}.png`;
    },
    //nbaTeam: 'Washington Wizards',
    nbaTeam: req.user.nbaTeam,
    nbaTeamURL: (nbaTeam) => {
        // nflTeam = 'Los Angeles Chargers';

        let nbaNickname, nbaLastIndex;

        nbaTeam = nbaTeam.toLowerCase();

        nbaLastIndex = nbaTeam.lastIndexOf(" ");

        console.log(`NBA last index: ${nbaLastIndex}`);

        if(nbaTeam === 'philadelphia 76ers') {
            nbaNickname = 'sixers';
        } else {
            nbaNickname = nbaTeam.substr(nbaLastIndex+1, nbaTeam.length);
        }

        // nbaTeam = nbaTeam.replace(/ /g, '-');

        return `https://www.nba.com/${nbaNickname}`;
    },
    nbaTeamImg: (nbaTeam) => {
        return `/wallpapers/nfl/${nbaTeam}.png`;
    },
    mlbTeam: req.user.mlbTeam,
    // mlbTeam: 'Washington Nationals',
    mlbTeamURL: (mlbTeam) => {
        // mlbTeam = 'Toronto Blue Jays';

        let mlbNickname, mlbLastIndex;

        if(mlbTeam === 'Toronto Blue Jays') {
            mlbNickname = 'bluejays';
        } else if(mlbTeam === 'Chicago White Sox') {
            mlbNickname = 'whitesox';
        } else if(mlbTeam === 'Boston Red Sox') {
            mlbNickname = 'redsox';
        } else {
            mlbTeam = mlbTeam.toLowerCase();

            mlbLastIndex = mlbTeam.lastIndexOf(" ");

            console.log(`MLB last index: ${mlbLastIndex}`);

            mlbNickname = mlbTeam.substr(mlbLastIndex+1, mlbTeam.length);
        }

        return `https://www.mlb.com/${mlbNickname}`;
    },
    mlbTeamImg: (mlbTeam) => {
        return `/wallpapers/nfl/${mlbTeam}.png`;
    },
    // nhlTeam: 'Winnipeg Jets',
    nhlTeam: req.user.nhlTeam,
    nhlTeamURL: (nhlTeam) => {

        let nhlNickname, nhlLastIndex;

        if(nhlTeam === 'Vegas Golden Knights') {
            nhlNickname = 'goldenknights';
        } else if(nhlTeam === 'Columbus Blue Jackets') {
            nhlNickname = 'bluejackets';
        } else if(nhlTeam === 'Detroit Red Wings') {
            nhlNickname = 'redwings';
        } else if(nhlTeam === 'Toronto Maple Leafs') {
            nhlNickname = 'mapleleafs';
        } else {
            nhlTeam = nhlTeam.toLowerCase();

            nhlLastIndex = nhlTeam.lastIndexOf(" ");

            console.log(`NHL last index: ${nhlLastIndex}`);

            nhlNickname = nhlTeam.substr(nhlLastIndex+1, nhlTeam.length);
        }

        return `https://www.nhl.com/${nhlNickname}`;
    },
    nhlTeamImg: (nhlTeam) => {
        return `/wallpapers/nhl/${nhlTeam}.png`;
    },
    dateNow: currDate.getReturnedDate(),
    thisDate: currDate.thisDate
}));



// display "dashboard" file on the dashboard route (dark)
router.get('/users/update_password_d', ensureAuthenticatedDark, (req, res) => res.render('updatePWDark', {
    name: req.user.name,
    email: req.user.email,
    password: '',
    password2: req.user.password2,
    nflTeam: req.user.nflTeam,
    nflTeamURL: (nflTeam) => {
        // nflTeam = 'Los Angeles Chargers';

        nflTeam = nflTeam.toLowerCase();

        nflTeam = nflTeam.replace(/ /g, '-');

        return `https://www.nfl.com/teams/${nflTeam}`;
    },
    nflTeamImg: (nflTeam) => {
        return `/wallpapers/nfl/${nflTeam}.png`;
    },
    //nbaTeam: 'Washington Wizards',
    nbaTeam: req.user.nbaTeam,
    nbaTeamURL: (nbaTeam) => {
        // nflTeam = 'Los Angeles Chargers';

        let nbaNickname, nbaLastIndex;

        nbaTeam = nbaTeam.toLowerCase();

        nbaLastIndex = nbaTeam.lastIndexOf(" ");

        console.log(`NBA last index: ${nbaLastIndex}`);

        if(nbaTeam === 'philadelphia 76ers') {
            nbaNickname = 'sixers';
        } else {
            nbaNickname = nbaTeam.substr(nbaLastIndex+1, nbaTeam.length);
        }

        // nbaTeam = nbaTeam.replace(/ /g, '-');

        return `https://www.nba.com/${nbaNickname}`;
    },
    nbaTeamImg: (nbaTeam) => {
        return `/wallpapers/nfl/${nbaTeam}.png`;
    },
    mlbTeam: req.user.mlbTeam,
    // mlbTeam: 'Washington Nationals',
    mlbTeamURL: (mlbTeam) => {
        // mlbTeam = 'Toronto Blue Jays';

        let mlbNickname, mlbLastIndex;

        if(mlbTeam === 'Toronto Blue Jays') {
            mlbNickname = 'bluejays';
        } else if(mlbTeam === 'Chicago White Sox') {
            mlbNickname = 'whitesox';
        } else if(mlbTeam === 'Boston Red Sox') {
            mlbNickname = 'redsox';
        } else {
            mlbTeam = mlbTeam.toLowerCase();

            mlbLastIndex = mlbTeam.lastIndexOf(" ");

            console.log(`MLB last index: ${mlbLastIndex}`);

            mlbNickname = mlbTeam.substr(mlbLastIndex+1, mlbTeam.length);
        }

        return `https://www.mlb.com/${mlbNickname}`;
    },
    mlbTeamImg: (mlbTeam) => {
        return `/wallpapers/nfl/${mlbTeam}.png`;
    },
    // nhlTeam: 'Winnipeg Jets',
    nhlTeam: req.user.nhlTeam,
    nhlTeamURL: (nhlTeam) => {

        let nhlNickname, nhlLastIndex;

        if(nhlTeam === 'Vegas Golden Knights') {
            nhlNickname = 'goldenknights';
        } else if(nhlTeam === 'Columbus Blue Jackets') {
            nhlNickname = 'bluejackets';
        } else if(nhlTeam === 'Detroit Red Wings') {
            nhlNickname = 'redwings';
        } else if(nhlTeam === 'Toronto Maple Leafs') {
            nhlNickname = 'mapleleafs';
        } else {
            nhlTeam = nhlTeam.toLowerCase();

            nhlLastIndex = nhlTeam.lastIndexOf(" ");

            console.log(`NHL last index: ${nhlLastIndex}`);

            nhlNickname = nhlTeam.substr(nhlLastIndex+1, nhlTeam.length);
        }

        return `https://www.nhl.com/${nhlNickname}`;
    },
    nhlTeamImg: (nhlTeam) => {
        return `/wallpapers/nhl/${nhlTeam}.png`;
    },
    dateNow: currDate.getReturnedDate(),
    thisDate: currDate.thisDate
}));



// display "dashboard" file on the dashboard route (dark)
router.get('/users/update_d', ensureAuthenticatedDark, (req, res) => res.render('updateDark', {
    email: req.user.email,
    password: req.user.password,
    dateNow: currDate.getReturnedDate(),
    thisDate: currDate.thisDate
}));


// display "dashboard" file on the dashboard route (dark)
router.get('/users/update', ensureAuthenticatedDark, (req, res) => res.render('update', {
    email: req.user.email,
    password: req.user.password,
    dateNow: currDate.getReturnedDate(),
    thisDate: currDate.thisDate
}));






// Dashboard Handle (Dark)
router.post('/login_d', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/dashboard_d',
        failureRedirect: '/users/settings_d',
        failureFlash: true
    })(req, res, next);
})



// Dashboard Handles
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/users/settings',
        failureFlash: true
    })(req, res, next);
})



console.log(currDate);

// export router from this file so that it can be utilized in other files
module.exports = router;