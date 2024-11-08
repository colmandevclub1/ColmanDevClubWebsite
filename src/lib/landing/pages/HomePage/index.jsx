import React from 'react';

import EntranceAnimation from '../../../../animation/EntranceAnimation';
import SectionOne from './SectionOne';
import SectionTwo from './SectionTwo';
import SectionThree from './SectionThree';
import SectionFour from './SectionFour';
import SplashAnimation from '../../../../animation/SplashAnimation';
import { getAllUsers } from 'src/config/firebase-admin-config';

const HomePage = () => {
  // React.useEffect(() => {
  //   window.onbeforeunload = function () {
  //     window.scrollTo(0, 0);
  //   };
  // }, []);
  getAllUsers();
  return (
    <>
      {/* <button onClick={fetchAllUsers}>PO PO</button> */}
      <EntranceAnimation>
        <SectionOne />
      </EntranceAnimation>
      <SectionTwo />
      <SplashAnimation>
        <SectionThree />
      </SplashAnimation>
      <SplashAnimation>
        <SectionFour />
      </SplashAnimation>
    </>
  );
};

export default HomePage;
