import { memo } from 'react';
import { FC } from 'react';

import classes from './Profile.module.css';

export const Profile = memo(function Profile(props = {}) {
  return (
    <div className={`${classes.root}`}>
      <div className={classes.avatar}>
        <svg preserveAspectRatio='none' viewBox='0 0 80 80' fill='none' xmlns='http://www.w3.org/2000/svg' className={classes.icon}>
          <circle cx={40} cy={40} r={40} fill='#D9D9D9' />
        </svg>
      </div>
      <div className={classes.name}>name</div>
      <div className={classes.memberSince1262021}>membeer since 12.06.2021</div>
    </div>
  );
});
