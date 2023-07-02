import React, { PropsWithChildren } from 'react';

const defaultPhotonDemoImg = 'https://silvia-odwyer.github.io/photon/images/nine_yards.jpg';

export const SvgFilterEffectDemo: React.FC<{ title: string; filterString: string }> = (props) => {
  return (
    <section className="relative inline-block float-left w-1/3">
      <h2>{props.title}</h2>
      <img src={defaultPhotonDemoImg} alt="demo image" style={{ filter: props.filterString }} />
    </section>
  );
};

export const SvgFilterEffectGallery: React.FC<PropsWithChildren> = (props) => (
  <div className="flex flex-wrap">{props.children}</div>
);

const svgFilterUrl = '/assets/demo-svg-filters.svg';
export const buildFilter = (filterId: string): string => `url(${svgFilterUrl}#${filterId})`;
