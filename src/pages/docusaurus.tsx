import React from 'react';
import Layout from '@theme/Layout';
import { Redirect } from '@docusaurus/router';

export default function DocusaurusPage(): JSX.Element {
  // Redirect to the docs intro page
  return <Redirect to="/docs/intro" />;
}
