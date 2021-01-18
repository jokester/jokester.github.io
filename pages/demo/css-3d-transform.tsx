import { Layout } from '../../src/components/layout/layout';
import { HtmlMeta } from '../../src/components/meta/html-meta';
import React from 'react';
import { PocCssTransform } from '../../src/components/poc-css-transform/poc-css-transform';
import { FpsMeter } from '../../src/components/fps-meter';

const DemoCss3dTransform = () => (
  <Layout>
    <HtmlMeta title="DEMO: css 3d transform" />
    <div>
      <FpsMeter />
    </div>
    <div className="p-4 select-none " style={{ height: 600 }}>
      <PocCssTransform />
    </div>
  </Layout>
);

export default DemoCss3dTransform;
