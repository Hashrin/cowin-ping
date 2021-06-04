import axios from "axios";
var dialog = require('dialog');

export const getAlert = async () => {
  try {
    let count = 0;
    const dates = ['04-06-2021', '05-06-2021', '06-06-2021'];
    let interval: number = 60000;

    setInterval(async () => {

      for (const date of dates) {
        const url = `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=297&date=${date}`;

        const response = await axios.get(url);
        console.log(++count);

        const centers: any[] = response.data.centers;
        centers.forEach((center) => {

          const sessions: any[] = center.sessions;
          sessions.forEach((session) => {

            if (session.available_capacity_dose1 as number > 0 &&
              session.vaccine === 'COVISHIELD') {

              interval = 180000;

              dialog.info(`
              Center: ${center.name}
              Pin: ${center.pincode}
              Vaccine: ${session.vaccine}
              Dose 1 available: ${session.available_capacity_dose1}
              age category: ${session.min_age_limit}
              Date: ${date}`, 'VACCINE ALERT', function (exitCode: any) {
                if (exitCode == 0) console.log('User clicked OK');
              });
              return;
            }
            else {
              interval = 60000;
            }

          });

        });
      };


    }, interval);



  } catch (err) {
    console.log(err.message);
  }
}

export const generateOtp = async (mobile: number) => {
  try {

    let config = {
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36'
      },
    };

    const url = `https://cdn-api.co-vin.in/api/v2/auth/public/generateOTP`;

    const body = {
      mobile,
      secret: "U2FsdGVkX18ulT0cNLJ/+86LhFpH9rzSLJ41mHt3BFOhyu7HU6mHm6S+MfbdYqFFou+z/ZUkP4VhgCWW6gJi5w=="
    };

    const response = await axios.post(url, body, config);
  } catch (error) {
    console.log(error.message);
  }
}