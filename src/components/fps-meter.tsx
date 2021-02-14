import { FC, useState } from 'react';
import { animationFrameScheduler, interval, Observable, range } from 'rxjs';
import { map, scan, tap, throttleTime } from 'rxjs/operators';
import useConstant from 'use-constant';
import { useObservable } from 'react-use';

const everyFrame = range(0, Number.MAX_SAFE_INTEGER, animationFrameScheduler);

function fpsObservable(numFrame: number): Observable<number> {
  return everyFrame.pipe(
    map((frameNo) => Date.now() / 1e3),
    scan((acc, l) => [...acc, l].slice(-numFrame), [] as number[]),
    map((frames) => (frames.length >= numFrame ? numFrame / (frames[frames.length - 1] - frames[0]) : -1)),
    throttleTime(0.5e3),
  );
}

export const FpsMeter: FC = () => {
  return (
    <div className="fixed right-0 bottom-0 p-4 border-black border inline-block w-64">
      <FpsMeterRow samples={15} />
      <FpsMeterRow samples={60} />
    </div>
  );
};

const FpsMeterRow: FC<{ samples: number }> = ({ samples }) => {
  const fps$ = useConstant(() => fpsObservable(samples));
  const fps = useObservable(fps$, 0);

  return (
    <p>
      fps ({samples}frames): {fps.toFixed(3)}
    </p>
  );
};
