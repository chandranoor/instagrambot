import 'module-alias/register';
import * as dotenv from 'dotenv';

dotenv.config();

import { createBrowser } from 'src/common/browser';
import { auth as authConfig, job as jobConfig } from 'src/config';
import { schedule, jobs } from 'src/common/scheduler';

(async () => {
  try {
    const browser = await createBrowser();
    await browser.authenticate(authConfig);
    const info = await browser.getUserInfo(authConfig.username);

    console.log(info);

    schedule(
      [
        new jobs.FollowJob([[0, 5], [11, 14], [17, 21], [22, 23]]),
        new jobs.UnfollowJob([[6, 10], [13, 18], [21, 24]]),
      ],
      browser,
    );

    // await new UnfollowJob([]).execute();
    // await new FollowJob([]).execute();
  } catch (e) {
    console.log(e);
  }
})();
