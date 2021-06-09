import axios from "axios";
import moment from "moment";
var dialog = require('dialog');

export const getAlert = async () => {
  try {
    let count = 0;
    const currentDate = moment(new Date()).format('DD-MM-YYYY');
    const districtId = 297;
    const interval: number = 30000;

    setInterval(async () => {
      const url = `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=${districtId}&date=${currentDate}`;

      const response = await axios.get(url);
      console.log(++count);

      const centers: any[] = response.data.centers;
      centers.forEach((center) => {

        if ((center.fee_type as string).toLowerCase() === 'free') {

          const sessions: any[] = center.sessions;
          sessions.forEach((session) => {

            if (session.available_capacity_dose1 as number > 0 &&
              (session.vaccine as string).toLowerCase() === 'covishield' &&
              session.min_age_limit as number === 45) {

              dialog.info(`
            Center: ${center.name}
            Pin: ${center.pincode}
            Vaccine: ${session.vaccine}
            Dose 1 available: ${session.available_capacity_dose1}
            age category: ${session.min_age_limit}
            Date: ${session.date}`, 'VACCINE ALERT', function (exitCode: any) {
                if (exitCode == 0) console.log('User clicked OK');
              });
              return;
            }

          });
        }


      });


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