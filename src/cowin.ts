import axios from "axios";
var dialog = require('dialog');

export const getInfo = async () => {
  try {
    let count = 0;
    const dates = ['04-06-2021', '05-06-2021', '06-06-2021'];
    let interval: number = 60000;
    const mobile = "8547509839";

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
              generateOtp(mobile);

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

          });

        });
      };


    }, interval);



  } catch (err) {
    console.log(err.message);
  }
}

const generateOtp = async (mobile: string) => {
  const url = `https://cdn-api.co-vin.in/api/v2/auth/public/generateOTP`;
  const body = { mobile };
  const response = await axios.post(url, body);
}