import React from 'react';
import { connect } from 'dva';
import styles from './index.css';

function IndexPage() {
  return (
    <div className={styles.normal}>
      hello
    </div>
  );
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);
