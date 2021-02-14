import {
  buildFilter,
  SvgFilterEffectDemo,
  SvgFilterEffectGallery,
} from '../../src/components/demo-svg-filters/photon-demo';
import { Layout } from '../../src/components/layout/layout';
import { HtmlMeta } from '../../src/components/meta/html-meta';

const SvgFilterEffectsPage: React.FC = () => {
  return (
    <Layout>
      <HtmlMeta title="Demo: SVG Filter Effects" />
      <SvgFilterEffectGallery>
        <SvgFilterEffectDemo title="orig" filterString="" />
        <SvgFilterEffectDemo title="Inc Red Channel" filterString={buildFilter(`inc-red-channel`)} />
        <SvgFilterEffectDemo title="Swap R+B Channels" filterString={buildFilter('swap-r-g-channels')} />
      </SvgFilterEffectGallery>
      <hr />
      <SvgFilterEffectGallery>
        <SvgFilterEffectDemo title="Monochrome" filterString={buildFilter('monochrome')} />
        <SvgFilterEffectDemo title="Only red" filterString={buildFilter('only-red-channel')} />
        <SvgFilterEffectDemo title="Offset Red" filterString={buildFilter('offset-red')} />
      </SvgFilterEffectGallery>
      <hr />
    </Layout>
  );
};

export default SvgFilterEffectsPage;
