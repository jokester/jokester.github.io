import { Layout } from '../../src/components/layout/layout';
import { HtmlMeta } from '../../src/components/meta/html-meta';
import React from 'react';
import { FpsMeter } from '../../src/components/fps-meter';
import { WaapiDanmaku } from '../../src/components/demo-waapi/demo-waapi-danmaku';
import useConstant from 'use-constant';
import { createTermsObservable } from '../../src/components/demo-waapi/danmaku-resource';

const DemoCss3dTransform = () => {
  const x = useConstant(() => createTermsObservable(0.3e3));
  return (
    <Layout>
      <HtmlMeta title="DEMO: css 3d transform" />
      <FpsMeter />
      <div className="p-4 select-none " style={{ height: 600 }}>
        <WaapiDanmaku source$={x} />
      </div>
    </Layout>
  );
};

export default DemoCss3dTransform;
